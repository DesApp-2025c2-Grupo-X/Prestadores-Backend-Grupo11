'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Integrante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Integrante.belongsTo(models.Afiliado, { 
        foreignKey: 'afiliadoId',
        as: 'afiliado'
      });

      Integrante.hasMany(models.Situacion, {
        foreignKey: 'integranteId',
        as: 'situaciones'
      });

      Integrante.hasMany(models.Turno, {
        foreignKey: 'integranteId',
        as: 'turnos'
      })

      Integrante.hasMany(models.Receta, {
        foreignKey: 'integranteId',
        as: 'recetas'
      });

      Integrante.hasMany(models.Reintegro, {
        foreignKey: 'integranteId',
        as: 'reintegros'
      });

      Integrante.hasMany(models.Autorizacion, {
        foreignKey: 'integranteId',
        as: 'autorizaciones'
      });
      
    }
  }
  Integrante.init({
    nombre: {type: DataTypes.STRING, allowNull: false},
    edad: {type: DataTypes.INTEGER, allowNull: false},
    dni: {type: DataTypes.STRING, allowNull: false},
    afiliadoId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Integrante',
    timestamps: false
  });
  return Integrante;
};