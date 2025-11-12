'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turno.belongsTo(models.Afiliado, {
        foreignKey: 'afiliadoId',
        as: 'afiliado'
      });

      Turno.belongsTo(models.Integrante, {
        foreignKey: 'integranteId',
        as: 'integrante'
      });

      Turno.belongsTo(models.Prestador, {
        foreignKey: 'prestadorId',
        as: 'prestador'
      });
    }
  }
  Turno.init({
    date: {type: DataTypes.DATE, allowNull: false},
    start: {type: DataTypes.DATE, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false},
    notes: {type: DataTypes.TEXT},
    descripción: {type: DataTypes.TEXT},
    afiliadoId: {type: DataTypes.INTEGER},
    prestadorId: {type: DataTypes.INTEGER, allowNull: false},
    integranteId: {type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Turno',
    timestamps: false
  });
  return Turno;
};