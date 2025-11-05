const db = require('../db/models');
const { Autorizacion, Integrante } = db;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const { Op } = Sequelize;

const listar = async (req, res) => {
  const autorizaciones = await Autorizacion.findAll({
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(autorizaciones);
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
  const autorizaciones = await Autorizacion.findAll({
    where: { estado },
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(autorizaciones);
};


const dashboard = async (req, res) => {
  const resumenDiario = await Autorizacion.findAll({
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

  const resumenSemanal = await Autorizacion.findAll({
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
  const autorizacion = req.autorizacion;
  res.status(200).json({ estado: autorizacion.estado, autorizacion });
};

module.exports = {listar, cambiarEstado, listarPorEstado, dashboard, obtenerPorId };