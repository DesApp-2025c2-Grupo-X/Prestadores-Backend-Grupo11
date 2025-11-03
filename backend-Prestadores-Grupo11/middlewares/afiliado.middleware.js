const {Afiliado} = require('../db/models');
const {Op} = require('sequelize');

const validateAfiliadoByApellidoONumero = async (req,res,next) => {
    const nroOApellido = req.params.nroOApellido;
    const afiliado = await Afiliado.findOne({where: {[Op.or]: [
        {numero_afiliado: nroOApellido},
        {apellido: nroOApellido}
    ]}});
    if (!afiliado) {
        return res.status(404).json({error: `el afiliado con nombre o numero ${nroOApellido} no existe`});
    }
    next()
}

module.exports = {validateAfiliadoByApellidoONumero};