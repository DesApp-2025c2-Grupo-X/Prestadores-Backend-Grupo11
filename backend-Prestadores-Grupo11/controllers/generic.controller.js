const getModelById = (Model) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const model = await Model.findByPk(id);
        res.status(200).json(model);
    }
}

const createNewModel = (Model) => {
    return async (req, res) => {
        const newModel = await Model.create(req.body);
        res.status(201).json(newModel);
    }
}

module.exports = {getModelById, createNewModel};