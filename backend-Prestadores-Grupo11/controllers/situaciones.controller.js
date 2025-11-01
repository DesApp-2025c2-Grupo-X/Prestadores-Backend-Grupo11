const {Situacion,Afiliado, Integrante} = require('../db/models');

const getAllSituacionesByAfliliadoId = async (req,res) => {
    const idPrestador = req.params.prestadorId;
    const idAfiliado = req.params.id;
    const situaciones = await Situacion.findAll({where: {prestadorId: idPrestador}, include: [
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', where: {id: idAfiliado}, include: [
            {model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes'}
        ]}
    ]});
    res.status(200).json(situaciones);
}

const getAllSituaciones = async (req,res) => {
    const situaciones = await Situacion.findAll({ include: [
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', include: [
            {model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes' }
        ]}
    ]
    })
    res.status(200).json(situaciones);
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


module.exports = {getAllSituacionesByAfliliadoId, darDeAltaSituacion, darDeBajaSituacionById, getAllSituaciones}