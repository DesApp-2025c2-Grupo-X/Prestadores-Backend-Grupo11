const getModelById = (Model) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const model = await Model.findByPk(id);
        res.status(200).json(model);
    }
}

module.exports = {getModelById};