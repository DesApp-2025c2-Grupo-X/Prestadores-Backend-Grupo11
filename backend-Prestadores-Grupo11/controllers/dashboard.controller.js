const dashboard = async (req, res) => {
  const resumen = await Autorizacion.findAll({
    attributes: [
      [Sequelize.fn('DATE', Sequelize.col('updatedAt')), 'fecha'],
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'cantidad']
    ],
    where: {
      estado: { [Op.in]: ['aprobado', 'rechazado'] }
    },
    group: ['fecha'],
    order: [['fecha', 'ASC']]
  });

  res.status(200).json(resumen);
};


module.exports = {dashboard};