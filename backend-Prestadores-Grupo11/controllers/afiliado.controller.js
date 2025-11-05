const { Afiliado } = require('../db/models');
const { Op } = require('sequelize');

const getAfiliados = async (req, res) => {

  try {

    const q = (req.query.q ?? '').trim();

    const afiliados = await Afiliado.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${q}%` } },
          { dni: { [Op.iLike]: `%${q}%` } }
        ]
      }
    });

    res.status(200).json(afiliados);
  } catch (error) {
    console.error('Error al obtener afiliados:', error);
    res.status(500).json({ error: 'Error al obtener afiliados' });
  }
};

const getAfiliadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const afiliado = await Afiliado.findByPk(id);
    res.status(200).json(afiliado);

  } catch (error) {

    console.error('Error al obtener afiliado por ID:', error);
    res.status(500).json({ error: 'Error al obtener afiliado por ID' });
  }
};

module.exports = { getAfiliados, getAfiliadoById }