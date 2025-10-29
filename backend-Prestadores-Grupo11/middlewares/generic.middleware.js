const {Prestador} = require('../db/models');

const validateModelById = (Model) => {
    return async (req,res,next) => {
        const id = req.params.id;
        const model = await Model.findByPk(id);
        if (!model) {
            return res.status(404).json({error: "El elemento no existe"});
        }
        next();
    }
}

const validateRolById = (rol) => {
    return async (req,res,next) => {
        const id = req.params.id;
        const prestador = await Prestador.findByPk(id);
        if (prestador.role != rol) {
            return res.status(401).json({error: `El prestador debe ser rol ${rol} para esta consulta`});
        }
        next();
    }
}


module.exports = {validateModelById, validateRolById};