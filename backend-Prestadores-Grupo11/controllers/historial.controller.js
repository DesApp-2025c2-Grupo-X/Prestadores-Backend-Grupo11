const {Situacion,Afiliado,Integrante} = require('../db/models')

const getAllSituacionesByAfliliadoId = async (req,res) => {
    const id = req.params.id;
    const situaciones = await Situacion.findAll({include: [
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', where: {id}, include: [
            {model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes'}
        ]}
    ]});
    res.status(200).json(situaciones);
}

module.exports = {getAllSituacionesByAfliliadoId}