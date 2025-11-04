const {Situacion,Afiliado,Integrante} = require('../db/models')

const getAllSituacionesByApellidoONro = async (req,res) => {
    const nroOApellido = req.params.nroOApellido;
    const situaciones = await Afiliado.findOne({where: {[Op.or]: [
        {numero_afiliado: nroOApellido},
        {apellido: nroOApellido}
    ]}, include: [
        {model: Situacion, as: 'situaciones'},
        {model: Integrante, as: 'integrantes', include: [
            {model: Situacion, as: 'situaciones'}
        ]}
    ]})
    res.status(200).json(situaciones);
}

module.exports = {getAllSituacionesByApellidoONro}