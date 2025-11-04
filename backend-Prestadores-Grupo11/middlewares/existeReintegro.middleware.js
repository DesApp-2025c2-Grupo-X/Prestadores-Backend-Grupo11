const { Reintegro } = require('../db/models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const reintegro = await Reintegro.findByPk(id);

  if (!reintegro) {
    return res.status(404).json({ error: 'Reintegro no encontrado' });
  }

  req.reintegro = reintegro;
  next();
};