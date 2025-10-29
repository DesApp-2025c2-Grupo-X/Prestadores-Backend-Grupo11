const {Situacion,Afiliado} = require('../db/models');

const getAllSituacionesByAfliliadoId = async (req,res) => {
    const idPrestador = req.params.id
    const idAfiliado = req.params.afiliadoId;
    const situaciones = await Afiliado.findByPk(idAfiliado, {
        include: [{model: Situacion, as: 'situaciones', where: {prestadorId: idPrestador}}, {model: Integrante, as: 'integrantes', include: [{
            model: Situacion, as: 'situaciones'
        }]}],
    })
    res.status(200).json(situaciones);
}

const getAllSituaciones = async (req,res) => {
    const situaciones = await Afiliado.findAll({
        include: [{model: Situacion, as: 'situaciones'}, {model: Integrante, as: 'integrantes', include: [{
            model: Situacion, as: 'situaciones'
        }]}],
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

const darDeAltaSituacionById = async (req, res) => {
  const data = req.body;
  await Situacion.create(data);
  res.status(201).json({message: "Modelo creado correctamente"});
}


module.exports = {getAllSituacionesByAfliliadoId, darDeAltaSituacionById, darDeBajaSituacionById, getAllSituaciones}