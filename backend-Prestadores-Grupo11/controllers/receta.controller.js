const db = require('../db/models');
const { Receta, Integrante } = db;
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
  const resumen = await Receta.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('updatedAt')), 'fecha'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
    ],
    where: {
      estado: { [Op.in]: ['aprobado', 'rechazado'] }
    },
    group: ['fecha'],
    order: [['fecha', 'ASC']]
  });
  res.status(200).json(resumen);
};

const obtenerPorId = async (req, res) => {
  const receta = req.receta;
  res.status(200).json({ estado: receta.estado, receta });
};

module.exports = {
  listar,
  cambiarEstado,
  listarPorEstado,
  dashboard,
  obtenerPorId
};