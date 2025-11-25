const db = require('../db/models');
const { Prestador } = require("../db/models");
const sequelize = db.sequelize;

const getPrestadoresByCentroId = async (req, res) => {
  const centroId = req.params.prestadorId;
  const medicos = await Prestador.findAll({
    where: {
      centroId: centroId,
      role: 'medico'
      //as: 'medicos'
    },
    order: [['username', 'ASC']]
  });


  if (!medicos) {
    res.status(404).json({ message: "No se encontraron medicos" })
  }

  res.status(200).json(medicos);
}

module.exports = { getPrestadoresByCentroId }