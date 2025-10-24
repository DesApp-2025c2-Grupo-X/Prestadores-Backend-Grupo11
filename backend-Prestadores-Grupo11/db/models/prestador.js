'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prestador.hasMany(models.Situacion, {
        foreignKey: 'prestadorId',
        as: 'situaciones'
      });

      Prestador.hasMany(models.Turno, {
        foreignKey: 'prestadorId',
        as: 'turnos'
      })
    }
  }
  Prestador.init({
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Prestador',
  });
  return Prestador;
};