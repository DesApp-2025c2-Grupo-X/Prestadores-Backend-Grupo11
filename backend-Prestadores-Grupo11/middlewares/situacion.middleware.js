const validarEstadoAlta = async (req,res,next) => {
  const {estado} = req.body;
  if (estado != "alta") {
    return res.status(400).json({error: "el estado debe ser alta"});
  }
  next();
}

const validarEstadoBaja = async (req,res,next) => {
  const {estado} = req.body;
  if (estado != "baja") {
    return res.status(400).json({error: "el estado debe ser baja"});
  }
  next();
}

module.exports = {validarEstadoAlta, validarEstadoBaja};