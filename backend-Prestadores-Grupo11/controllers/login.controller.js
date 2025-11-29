const { Prestador } = require('../db/models')

const accessLogin = async (req, res) => {
  const { username, password } = req.body;
  const prestador = await Prestador.findOne({
    where: { username },
    attributes: ["id", "username", "role", "centroId"],
    //separated: true,
    include: [
     
      {
        model: Prestador,
        as: "centro",
        required: false,
        attributes: ["nombre"]
      }
    ]
  });
  res.status(200).json({ message: "Acceso exitoso", prestador: prestador });
};

module.exports = { accessLogin }