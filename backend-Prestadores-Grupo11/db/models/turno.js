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

      Turno.belongsTo(models.Prestador, {
        foreignKey: 'centroId',
        as: 'centro'
      });
    }
  }
  Turno.init({
    date: {type: DataTypes.DATE, allowNull: false},
    start: {type: DataTypes.DATE, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false},
    archivedAt: {type: DataTypes.DATE, allowNull: true},
    modifiedAt: {type: DataTypes.DATE, allowNull: true},
    notes: {type: DataTypes.TEXT},
    descripcion: {type: DataTypes.TEXT},
    afiliadoId: {type: DataTypes.INTEGER,allowNull:true},
    prestadorId: {type: DataTypes.INTEGER, allowNull: false},
    integranteId: {type: DataTypes.INTEGER,allowNull:true}
  }, {
    sequelize,
    modelName: 'Turno',
    timestamps: true
  });
  return Turno;
};