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
  const fechaActual = new Date()
  try {
    const modelo = tipoPaciente === 'integrante' ? Integrante : Afiliado;

    const paciente = await modelo.findByPk(id, {
      include: [
        {
          model: Situacion,
          as: 'situaciones',
          //where: { estado: 'baja' },
          //separate: true,
          include: [{ model: Prestador, attributes: ['username'], as: 'prestador' }],
          order: [['fecha_de_inicio', 'DESC']]
        },
        /*{
          model: Situacion,
          as: 'situaciones en proceso',
          where: { estado: 'en proceso' },
          separate: true,
          include: [{ model: Prestador, attributes: ['username'], as: 'prestador' }],
          order: [['fecha_de_inicio', 'DESC']]
        },*/
        {
          model: Turno,
          as: 'turnos',
          where: { notes: { [Op.not]: null }, archivedAt: { [Op.lte]: fechaActual } },
          required: false,
          order: [['archivedAt', 'DESC']]
        }
      ]
    });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    const pacientesJSON = paciente.toJSON();
    
    const situacionesEnProceso = pacientesJSON.situaciones.filter( s => s.estado === "en proceso")
    const situaciones = pacientesJSON.situaciones.filter(s=> s.estado === "baja")
    pacientesJSON.situaciones = situaciones
    pacientesJSON["situaciones en proceso"] = situacionesEnProceso

    pacientesJSON.situaciones = pacientesJSON.situaciones.map(i => ({ tipo: "situacion terapeutica finalizada", ...i }))
    pacientesJSON['situaciones en proceso'] = (pacientesJSON["situaciones en proceso"]).map(i => ({ tipo: "situacion terapeutica activa", ...i }))
    pacientesJSON.turnos = pacientesJSON.turnos.map(i => ({ tipo: "turno", ...i }))
    const historial = [...pacientesJSON.situaciones, ...pacientesJSON['situaciones en proceso'], ...pacientesJSON.turnos]

    historial.sort((a, b) => {
      let fechaA;
      let fechaB;

      if (a.archivedAt) {
        fechaA = new Date(a.archivedAt)
      } else if (a.fecha_final) {
        fechaA = new Date(a.fecha_final)
      }
      else {
        fechaA = new Date(a.fecha_inicio)
      }
      if (b.archivedAt) {
        fechaB = new Date(b.date)
      } else if (b.fecha_final) {
        fechaB = new Date(b.fecha_final)  
      }
      else {
        fechaB = new Date(b.fecha_inicio)
      }
      return fechaB - fechaA
    })
    //delete pacienteJSON.situaciones;
    //delete pacienteJSON['situaciones en proceso'];
    //delete pacienteJSON.turnos;
    pacientesJSON.historial = historial;
    res.status(200).json(pacientesJSON);
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