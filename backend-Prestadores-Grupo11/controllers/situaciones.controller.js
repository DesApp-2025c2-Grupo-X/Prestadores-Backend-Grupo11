const {Situacion,Afiliado, Integrante} = require('../db/models');
const {Op} = require('sequelize');

const getAllSituacionesByNroOApellidoAfliliado = async (req,res) => {
  const idPrestador = req.params.prestadorId;
  const nroOApellido = req.params.nroOApellido;
  const situaciones = await Afiliado.findOne({where: {[Op.or]:[
      {numero_afiliado: nroOApellido},
      {apellido: nroOApellido}
    ]}, include: [
      {model: Situacion, attributes: ['fecha_inicio', 'observaciones', 'estado', 'fecha_final'], as: 'situaciones', where: {prestadorId: idPrestador}},
      {model: Integrante, as: 'integrantes', include: [
        {model: Situacion, attributes: ['fecha_inicio', 'observaciones', 'estado', 'fecha_final'], as: 'situaciones'}
      ]}
    ]});
  res.status(200).json(situaciones);
}

const getAllSituaciones = async (req,res) => {
  const situaciones = await Afiliado.findAll({include: [
    {model: Situacion, as: 'situaciones'}
  ],include: [
      {model: Integrante, as: 'integrantes', include: [
        {model: Situacion, as: 'situaciones'}
      ]}
    ]})
  res.status(200).json(situaciones);
}

const getSituacionesByAfiliadoId = async (req,res) => {
  const id = req.params.id;
  const situacion = await Afiliado.findByPk(id, {include: [
    {model: Situacion, as: 'situaciones'}
  ]});
  res.status(200).json(situacion);
}

const getSituacionesByIntegranteId = async (req,res) => {
  const id = req.params.id;
  const situacion = await Integrante.findByPk(id, {include: [
    {model: Situacion, as: 'situaciones'}
  ]});
  res.status(200).json(situacion);
}

const darDeBajaSituacionById = async (req, res) => {
  const {estado} = req.body;
  const id = req.params.id;
  const situacion = await Situacion.findByPk(id)
  situacion.estado = estado;
  await situacion.save();
  res.status(200).json(situacion);
};

const darDeAltaSituacion = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  await Situacion.create({
    ...data,
    prestadorId: id
  })
  res.status(201).json({message: "Modelo creado correctamente"});
}


module.exports = {getAllSituacionesByNroOApellidoAfliliado, darDeAltaSituacion, darDeBajaSituacionById, getAllSituaciones, getSituacionesByAfiliadoId, getSituacionesByIntegranteId}