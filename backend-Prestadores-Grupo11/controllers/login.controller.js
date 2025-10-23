const { Prestador } = require('../db/models')

const accessLogin = async (req, res) => {
  const {username, password} = req.body;
  const prestador = await Prestador.findOne({where:{username, password}});
  res.status(200).json({message: "Acceso exitoso", prestador: prestador});
};

module.exports = {accessLogin }