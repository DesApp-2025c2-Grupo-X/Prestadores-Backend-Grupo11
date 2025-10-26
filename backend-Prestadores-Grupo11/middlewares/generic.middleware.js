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

module.exports = {validateModelById};