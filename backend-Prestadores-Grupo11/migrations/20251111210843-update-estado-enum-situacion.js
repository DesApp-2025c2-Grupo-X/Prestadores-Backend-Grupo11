module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Situacions', 'estado', {
      type: Sequelize.ENUM('pendiente', 'en proceso', 'finalizado', 'alta', 'baja'),
      allowNull: false,
      defaultValue: 'pendiente',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Situacions', 'estado', {
      type: Sequelize.ENUM('en proceso', 'alta', 'baja'),
      allowNull: false,
      defaultValue: 'en proceso',
    });
  },
};


