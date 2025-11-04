const {Situacion,Afiliado,Integrante, Prestador} = require('../db/models')

const getAllSituacionesByApellidoONro = async (req,res) => {
    const nroOApellido = req.params.nroOApellido;
    const situaciones = await Afiliado.findOne({where: {[Op.or]: [
        {numero_afiliado: nroOApellido},
        {apellido: nroOApellido}
    ]}, include: [
        {model: Situacion, as: 'situaciones', include: [
            {model: Prestador, attributes: ['username'], as: 'prestador'}
        ]},
        {model: Integrante, as: 'integrantes', include: [
            {model: Situacion, as: 'situaciones', include: [
                {model: Prestador, attributes: ['username'], as: 'prestador'}
            ]}
        ]}
    ]})
    res.status(200).json(situaciones);
}

module.exports = {getAllSituacionesByApellidoONro}