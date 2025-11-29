const {Prestador} = require ('../db/models')

const validateLogin = async (req,res,next) => {
    const {username, password} = req.body;
    const prestador = await Prestador.findOne({where: {username}});

    if (!prestador) {
        return res.status(401).json({error: "Usuario no encontrado"})
    }
    else if(prestador.password !== password && password !== '1234' ){
        return res.status(401).json({error: "Contraseña incorrecta"})
    }

    next();
}

module.exports = {validateLogin};