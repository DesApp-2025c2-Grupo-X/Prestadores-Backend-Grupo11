const { Solicitud, Prestador } = require('../db/models');
const { Sequelize } = require('../db/models');


const getAllSolicitudes = async (req, res) => {
  const solicitudes = await Solicitud.findAll({
    include: [{ model: Prestador, attributes: ['username'], as: 'prestador' }]
  });
  res.status(200).json(solicitudes);
};


const getAllSolicitudesByPrestadorId = async (req, res) => {
  const id = req.params.id;
  const solicitudes = await Solicitud.findAll({
    where: { prestadorId: id },
    include: [
      { model: Prestador, attributes: ['username'], as: 'prestador' }
    ]
  });
  res.status(200).json(solicitudes);
};

const getSolicitudById = async (req, res) => {
  const id = req.params.id;
  const solicitud = await Solicitud.findByPk(id, {
    include: [
      { model: Prestador, attributes: ['username'], as: 'prestador' }
    ]
  });
  if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
  res.status(200).json(solicitud);
};

const getAllSolicitudesPendientesEnAnalisis = async (req, res) => {
  const solicitudes = await Solicitud.findAll({
    where: {
      estado: ['pendiente', 'en análisis']
    },
    include: [
      { model: Prestador, attributes: ['username'], as: 'prestador' }
    ]
  });
  res.status(200).json(solicitudes);
};


const getSolicitudesPendientesOAnalisisByPrestadorId = async (req, res) => {
  const id = req.params.id;
  const solicitudes = await Solicitud.findAll({
    where: {
      prestadorId: id,
      estado: ['pendiente', 'en análisis']
    },
    include: [
      { model: Prestador, attributes: ['username'], as: 'prestador' }
    ]
  });
  res.status(200).json(solicitudes);
};

const getCantidadPorDescripcion = async (req, res) => {
  const resultados = await Solicitud.findAll({
    attributes: [
      'descripcion',
      [Sequelize.fn('COUNT', Sequelize.col('descripcion')), 'cantidad']
    ],
    group: ['descripcion'],
    order: [['descripcion', 'ASC']]
  });

  res.status(200).json(resultados);
};



module.exports = {
  getAllSolicitudes,
  getAllSolicitudesByPrestadorId,
  getSolicitudById,
  getAllSolicitudesPendientesEnAnalisis,
  getSolicitudesPendientesOAnalisisByPrestadorId,
  getCantidadPorDescripcion
};