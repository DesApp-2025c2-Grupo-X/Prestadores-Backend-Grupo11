const { Integrante } = require('../db/models');
const { Op } = require('sequelize');

const getIntegrantes = async (req, res) => {
  const q = (req.query.q ?? '').trim();

  const integrantes = await Integrante.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.iLike]: `%${q}%` } },
        { dni: { [Op.iLike]: `%${q}%` } }
      ]
    }
  });

  res.status(200).json(integrantes);
};

const getIntegranteById = async (req, res) => {
  const { id } = req.params;

  const integrante = await Integrante.findByPk(id);

  res.status(200).json(integrante);
};

module.exports = {getIntegrantes,getIntegranteById}