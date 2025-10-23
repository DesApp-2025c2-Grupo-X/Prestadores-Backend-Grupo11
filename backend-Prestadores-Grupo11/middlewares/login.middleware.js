const {Prestador} = require ('../db/models')

const validateLogin = async (req,res,next) => {
    const {username, password} = req.body;
    const prestador = await Prestador.findOne({where: {username, password}});
    if (!prestador) {
        return res.status(401).json({error: "Usuario o contraseña incorrecta/s"})
    }
    next();
}

module.exports = {validateLogin};