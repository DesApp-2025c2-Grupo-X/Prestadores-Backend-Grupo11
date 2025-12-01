const { Prestador } = require('../db/models');

const existModelById = (Model) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const model = await Model.findByPk(id);
        if (!model) {
            return res.status(404).json({ error: "El elemento no existe" });
        }
        next();
    }
}

const existPrestadorByPrestadorId = async (req, res, next) => {
    const id = req.params.prestadorId;
    const prestador = await Prestador.findByPk(id);
    if (!prestador) {
        return res.status(401).json({ error: `El prestador con id ${id} no existe` });
    }
    next();
}

const validateRolById = (rol) => {
    return async (req, res, next) => {
        const id = req.params.prestadorId;
        const prestador = await Prestador.findByPk(id);
        if (prestador.role != rol) {
            return res.status(401).json({ error: `El prestador debe ser rol ${rol} para esta consulta` });
        }
        next();
    }
}

const existeEspecialidadByPrestadorId = async (req, res, next) => {
    const especialidad = req.params.especialidad;
    const id = req.params.prestadorId;
    const prestador = await Prestador.findByPk(id);
    if (!(prestador.especialidades).includes(especialidad)) {
        return res.status(401).json({ error: `La especialidad no pertenece a este centro` });
    }
    next();
}


module.exports = { existModelById, validateRolById, existPrestadorByPrestadorId, existeEspecialidadByPrestadorId };