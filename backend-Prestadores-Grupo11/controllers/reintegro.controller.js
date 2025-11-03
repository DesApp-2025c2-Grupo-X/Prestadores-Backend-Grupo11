const db = require('../db/models');
const { Reintegro, Integrante } = db;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const { Op } = Sequelize;


const listar = async (req, res) => {
  const reintegros = await Reintegro.findAll({
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(reintegros);
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
  const reintegros = await Reintegro.findAll({
    where: { estado },
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(reintegros);
};

const dashboard = async (req, res) => {
  const resumen = await Reintegro.findAll({
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
  const reintegro = req.reintegro;
  res.status(200).json({ estado: reintegro.estado, reintegro });
};

module.exports = {
  listar,
  cambiarEstado,
  listarPorEstado,
  dashboard,
  obtenerPorId
};