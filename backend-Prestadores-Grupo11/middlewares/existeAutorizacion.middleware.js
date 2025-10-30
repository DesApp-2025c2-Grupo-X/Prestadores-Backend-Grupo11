const { Autorizacion } = require('../db/models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const autorizacion = await Autorizacion.findByPk(id);

  if (!autorizacion) {
    return res.status(404).json({ error: 'Autorización no encontrada' });
  }

  req.autorizacion = autorizacion;
  next();
};
