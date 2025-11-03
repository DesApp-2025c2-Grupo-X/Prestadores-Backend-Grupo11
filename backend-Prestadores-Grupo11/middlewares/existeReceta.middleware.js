const { Receta } = require('../db/models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const receta = await Receta.findByPk(id);

  if (!receta) {
    return res.status(404).json({ error: 'Reintegro no encontrado' });
  }

  req.receta = receta;
  next();
};