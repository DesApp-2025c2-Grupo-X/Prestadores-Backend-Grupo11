const { Autorizacion, Integrante } = require('../db/models');
const { Op, sequelize } = require('sequelize');

const crear = async (req, res) => {
  const nueva = await Autorizacion.create(req.body);
  res.status(201).json(nueva);
};

const listar = async (req, res) => {
  const autorizaciones = await Autorizacion.findAll({
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(autorizaciones);
};

const cambiarEstado = async (req, res) => {
  const solicitud = req.solicitud;
  const { nuevoEstado, motivo } = req.body;
  const usuarioId = req.usuarioId;

  solicitud.estado = nuevoEstado;
  solicitud.usuarioUltimoCambio = usuarioId;
  if (['observado', 'rechazado'].includes(nuevoEstado)) {
    solicitud.motivo = motivo;
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
  const resumen = await Autorizacion.findAll({
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

module.exports = { crear, listar, cambiarEstado, listarPorEstado, dashboard };