const { Situacion, Afiliado, Integrante, Prestador, Turno } = require('../db/models');
const { Op } = require('sequelize');

const getAllSituacionesByApellidoONro = async (req, res) => {
  const nroOApellido = req.params.nroOApellido;
  const situaciones = await Afiliado.findOne({
    where: {
      [Op.or]: [
        { numero_afiliado: nroOApellido },
        { apellido: nroOApellido }
      ]
    }, include: [
      {
        model: Situacion, as: 'situaciones', include: [
          { model: Prestador, attributes: ['username'], as: 'prestador' }
        ]
      },
      {
        model: Integrante, as: 'integrantes', include: [
          {
            model: Situacion, as: 'situaciones', include: [
              { model: Prestador, attributes: ['username'], as: 'prestador' }
            ]
          }
        ]
      }
    ]
  })
  res.status(200).json(situaciones);
}

// Obtener historia clínica completa (por tipoPaciente e id)
const getHistoriaClinica = async (req, res) => {
  const { tipoPaciente, id } = req.params;
  const fechaActual = new DATE()
  try {
    const modelo = tipoPaciente === 'integrante' ? Integrante : Afiliado;

    const paciente = await modelo.findByPk(id, {
      include: [
        {
          model: Situacion,
          as: 'situaciones',
          where: { estado: 'baja' },
          separate: true,
          include: [{ model: Prestador, attributes: ['username'], as: 'prestador' }],
          order: [['fecha_de_fin', 'DESC']]
        },
        {
          model: Situacion,
          as: 'situaciones en proceso',
          where: { estado: 'en proceso' },
          separate: true,
          include: [{ model: Prestador, attributes: ['username'], as: 'prestador' }],
          order: [['fecha_de_inicio', 'DESC']]
        },
        {
          model: Turno,
          as: 'turnos',
          where: { notes: { [Op.not]: null }, archivedAt: { [Op.lte]: fechaActual } },
          required: false,
          order: [['date', 'DESC']]
        }
      ]
    });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    const pacientesJSON = paciente.toJSON();

    pacientesJSON.situaciones = pacientesJSON.situaciones.map(i => ({ tipo: "situacion terapeutica finalizada", ...i }))
    pacientesJSON['situaciones en proceso'] = pacientesJSON.situaciones.map(i => ({ tipo: "situacion terapeutica actiiva", ...i }))
    pacientesJSON.turnos = pacientesJSON.situaciones.map(i => ({ tipo: "turno", ...i }))
    const historial = [...pacienteJSON.situaciones, ...pacienteJSON['situaciones en proceso'], ...pacienteJSON.turnos]

    historial.sort((a, b) => {
      let fechaA;
      let fechaB;

      if (a.archivedAt) {
        fechaA = new Date(a.archivedAt)
      } else if (a.fecha_de_fin) {
        fechaA = new Date(a.fecha_de_fin)
      }
      else {
        fechaA = new Date(a.fecha_de_inicio)
      }
      if (b.archivedAt) {
        fechaB = new Date(b.date)
      } else if (b.fecha_de_fin) {
        fechaB = new Date(b.fecha_de_fin)  
      }
      else {
        fechaB = new Date(b.fecha_de_inicio)
      }
      return fechaB - fechaA
    })
    //delete pacienteJSON.situaciones;
    //delete pacienteJSON['situaciones en proceso'];
    //delete pacienteJSON.turnos;
    pacienteJSON.historial = historial;
    res.status(200).json(pacienteJSON);
  } catch (error) {
    console.error('Error al obtener historia clínica:', error);
    res.status(500).json({ error: 'Error al obtener historia clínica' });
  }
};


//  Agregar nota a la historia clínica (como nueva Situacion)
const addNotaAHistoriaClinica = async (req, res) => {
  const { tipoPaciente, id } = req.params;
  const { nota } = req.body;
  const prestadorId = req.user?.id || req.body.prestadorId; // según autenticación

  if (!nota) return res.status(400).json({ error: 'Falta el texto de la nota' });

  try {
    let nuevaSituacion;

    if (tipoPaciente === 'integrante') {
      const integrante = await Integrante.findByPk(id);
      if (!integrante) return res.status(404).json({ error: 'Integrante no encontrado' });

      nuevaSituacion = await Situacion.create({
        descripcion: nota,
        integranteId: id,
        prestadorId,
        fecha: new Date(),
      });
    } else {
      const afiliado = await Afiliado.findByPk(id);
      if (!afiliado) return res.status(404).json({ error: 'Afiliado no encontrado' });

      nuevaSituacion = await Situacion.create({
        descripcion: nota,
        afiliadoId: id,
        prestadorId,
        fecha: new Date(),
      });
    }

    res.status(201).json({
      message: 'Nota agregada correctamente al historial clínico',
      situacion: nuevaSituacion,
    });
  } catch (error) {
    console.error('Error al agregar nota al historial:', error);
    res.status(500).json({ error: 'Error al agregar nota al historial clínico' });
  }
};

module.exports = {
  getAllSituacionesByApellidoONro,
  getHistoriaClinica,
  addNotaAHistoriaClinica,
};