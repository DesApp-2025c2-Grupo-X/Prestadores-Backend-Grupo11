const { Situacion } = require('../db/models');

const validarSituacion = async (req, res, next) => {
  const { id } = req.params;

  const situacion = await Situacion.findByPk(id);
  if (!situacion) {
    return res.status(404).json({ error: 'Situación no encontrada' });
  }

  req.situacion = situacion;
  next();
};

module.exports = validarSituacion;