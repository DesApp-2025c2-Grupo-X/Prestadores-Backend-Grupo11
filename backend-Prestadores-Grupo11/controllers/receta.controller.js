const db = require('../db/models');
const { Receta, Integrante, Prestador } = db;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const { Op } = Sequelize;

const listar = async (req, res) => {
  const recetas = await Receta.findAll({
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(recetas);
};

const cambiarEstado = async (req, res) => {
  const solicitud = req.solicitud;
  const { nuevoEstado, motivo, prestadorAnalisisId  } = req.body;
  const usuarioId = req.usuarioId;

  solicitud.estado = nuevoEstado;
  solicitud.usuarioUltimoCambio = usuarioId;
  solicitud.prestadorAnalisisId = prestadorAnalisisId;

  if (['observado', 'rechazado'].includes(nuevoEstado)) {
    solicitud.motivo = motivo;
  }

  if (['aprobado', 'rechazado'].includes(nuevoEstado)) {
  solicitud.fecha_finalizacion = new Date();
}
  await solicitud.save();
  res.status(200).json(solicitud);
};

const listarPorEstado = async (req, res) => {
  const { estado } = req.query;
  const recetas = await Receta.findAll({
    where: { estado },
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(recetas);
};

const dashboard = async (req, res) => {
  const resumenDiario = await Receta.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('updatedAt')), 'fecha'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
    ],
    where: {
      estado: { [Op.in]: ['aprobado', 'rechazado', 'observado'] }
    },
    group: ['fecha'],
    order: [['fecha', 'ASC']]
  });

  const resumenSemanal = await Receta.findAll({
    attributes: [
      [sequelize.fn('DATE_TRUNC', 'week', sequelize.col('updatedAt')), 'semana'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
    ],
    where: {
      estado: { [Op.in]: ['aprobado', 'rechazado', 'observado'] }
    },
    group: ['semana'],
    order: [['semana', 'ASC']]
  });

  res.status(200).json({ diario: resumenDiario, semanal: resumenSemanal });
};

const obtenerPorId = async (req, res) => {
  const receta = req.receta;
  res.status(200).json({ estado: receta.estado, receta });
};

const getCompletadosById = async (req, res) => {
  try {
    const prestadorId = req.params.prestadorId
    const prestador = await Prestador.findByPk(prestadorId)

    if (!prestador) {
      return res.status(404).json({ message: "Prestador no encontrado" });
    }

    const recetas = await Receta.findAll({
      where: {
        usuarioUltimoCambio: prestadorId,
        estado: {
          [Op.in]: ['aprobado', 'rechazado', 'observado']
        }
      },
      include: [
        {
          model: Integrante,
          as: "integrante",
          attributes: ["nombre"]
        }
      ]
    });

    return res.status(200).json(recetas);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo recetas completadas del prestador" });
  }
}

module.exports = {
  listar,
  cambiarEstado,
  listarPorEstado,
  dashboard,
  obtenerPorId,
  getCompletadosById
};