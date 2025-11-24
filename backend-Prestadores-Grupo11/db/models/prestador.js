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
      });

      Prestador.hasMany(models.Prestador, {
        foreignKey: 'centroId',
        as: 'medicos'
      });

      Prestador.belongsTo(models.Prestador, {
        foreignKey: 'centroId', 
        as: 'centro'
      })
    }
  }
  Prestador.init({
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    centroId: {type: DataTypes.INTEGER},
    password: {type: DataTypes.STRING, allowNull: false},
    especialidades: {type: DataTypes.ARRAY(DataTypes.STRING)},
    role: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Prestador',
    timestamps: false
  });
  return Prestador;
};