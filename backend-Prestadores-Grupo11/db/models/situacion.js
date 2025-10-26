'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Situacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Situacion.belongsTo(models.Integrante, {
        foreignKey: 'integranteId',
        as: 'integrante'
      });
      Situacion.belongsTo(models.Prestador, {
        foreignKey: 'prestadorId',
        as: 'prestador'
      });
      Situacion.belongsTo(models.Afiliado, {
        foreignKey: 'afiliadoId',
        as: 'afiliado'
      })
    }
  }
  Situacion.init({
    fecha_inicio: {type: DataTypes.DATE, allowNull:false},
    especialidad: {type: DataTypes.STRING, allowNull: false},
    observaciones: {type: DataTypes.STRING, allowNull: false},
    estado: {type: DataTypes.ENUM('en proceso', 'finalizada', 'baja',), defaultValue: 'en proceso' },
    fecha_final : {type: DataTypes.DATE, allowNull: false},
    afiliadoId: {type: DataTypes.INTEGER},
    integranteId: {type: DataTypes.INTEGER},
    prestadorId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Situacion',
  });
  return Situacion;
};