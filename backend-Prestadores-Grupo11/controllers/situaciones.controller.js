const {Situacion} = require('../db/models');

const getAllSituacionesByPrestadorId = async (req,res) => {
    const id = req.params.id;
    const situaciones = await Situacion.findAll({where:{prestadorId: id}});
    res.status(200).json(situaciones);
}

module.exports = {getAllSituacionesByPrestadorId}