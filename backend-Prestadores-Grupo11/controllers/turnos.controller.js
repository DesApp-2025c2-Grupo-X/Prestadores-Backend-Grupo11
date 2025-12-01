const db = require("../db/models");
const Sequelize = db.Sequelize;
const { Op } = Sequelize;

const { Turno, Prestador, Afiliado, Integrante } = db;


// MÉDICO INDIVIDUAL 
const getAllTurnosByPrestadorId = async (req, res) => {
  const { prestadorId } = req.params;

  const turnos = await Turno.findAll({
    where: { centroId: prestadorId },
    include: [
      { model: Prestador, as: "prestador", attributes: { exclude: ["password"] } },
      {
        model: Afiliado,
        as: "afiliado",
        include: [{ model: Integrante, as: "integrantes" }],
      },
      { model: Integrante, as: "integrante" },
    ],
  });

  res.status(200).json(turnos);
};



// CENTRO MÉDICO – TODOS LOS TURNOS
const getAllTurnosByCentro = async (req, res) => {
  const { prestadorId } = req.params;

  const turnos = await Turno.findAll({
    where: { centroId: prestadorId },
    include: [
      { model: Prestador, as: "prestador" },
      {
        model: Afiliado,
        as: "afiliado",
        include: [{ model: Integrante, as: "integrantes" }],
      },
      { model: Integrante, as: "integrante" },
    ],
  });

  res.status(200).json(turnos);
};



// CENTRO – FILTRAR POR ESPECIALIDAD
const getAllTurnosByEspecialidad = async (req, res) => {
  const { prestadorId, especialidadId } = req.params;

  const turnos = await Turno.findAll({
    where: { centroId: prestadorId },
    include: [
      {
        model: Prestador,
        as: "prestador",
        where: {
          role: "medico",
          especialidades: { [Op.contains]: [parseInt(especialidadId)] },
        },
      },
      {
        model: Afiliado,
        as: "afiliado",
        include: [{ model: Integrante, as: "integrantes" }],
      },
    ],
  });

  res.status(200).json(turnos);
};


// CENTRO – FILTRAR POR MÉDICO
const getAllTurnosByMedico = async (req, res) => {
  const { prestadorId, medicoId } = req.params;

  const turnos = await Turno.findAll({
    where: { centroId: prestadorId, prestadorId: medicoId },
    include: [
      { model: Prestador, as: "prestador" },
      {
        model: Afiliado,
        as: "afiliado",
        include: [{ model: Integrante, as: "integrantes" }],
      },
    ],
  });

  res.status(200).json(turnos);
};


// ACTUALIZAR NOTAS
const updateNotesById = async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  const turno = await Turno.findByPk(id);

  if (!turno) return res.status(404).json({ msg: "Turno no encontrado" });

  turno.notes = notes;
  await turno.save();

  res.status(200).json(turno);
};


const getAllTurnos = async (req, res, next) => {
  try {
    const turnos = await Turno.findAll({
      include: [{ model: Prestador, as: 'prestador' }]
    });

    req.turnos = turnos;  
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
};

const filtrarNotasPropias = async (req,res) => {
  const {prestadorId, pacienteId} = req.params;
  const turnos = await Turno.findAll({where: 
    {
      prestadorId,
      [Op.or]: [
        {afiliadoId: pacienteId},
        {integranteId: pacienteId}
      ]
    },
    attributes: ['date', 'notes'],
    include: [
      {model: Prestador, as: 'prestador', attributes: ['username', 'especialidades']}
    ]
  })
  res.status(200).json(turnos)
}

module.exports = {
  getAllTurnos,
  getAllTurnosByPrestadorId,
  getAllTurnosByCentro,
  getAllTurnosByEspecialidad,
  getAllTurnosByMedico,
  updateNotesById,
  filtrarNotasPropias
};
