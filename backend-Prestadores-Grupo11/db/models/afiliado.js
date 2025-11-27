'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Afiliado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Afiliado.hasMany(models.Integrante, {
        foreignKey: 'afiliadoId',
        as: 'integrantes'                  
      });

      Afiliado.hasMany(models.Turno, {
        foreignKey: 'afiliadoId',
        as: 'turnos'
      })

      Afiliado.hasMany(models.Situacion, {
        foreignKey: 'afiliadoId',
        as: 'situaciones'
      })

      Afiliado.hasMany(models.Receta, {
        foreignKey: 'afiliadoId',
        as: 'recetas'
      });

      Afiliado.hasMany(models.Reintegro, {
        foreignKey: 'afiliadoId',
        as: 'reintegros'
      });

      Afiliado.hasMany(models.Autorizacion, {
        foreignKey: 'afiliadoId',
        as: 'autorizaciones'
      });
    }
  }
  Afiliado.init({
    nombre: {type: DataTypes.STRING , allowNull: false},
    apellido: {type: DataTypes.STRING, allowNull: false},
    edad: {type: DataTypes.INTEGER, allowNull: false},
    dni: {type: DataTypes.STRING, allowNull: false},
    numero_afiliado: {type: DataTypes.STRING, allowNull: false, unique: true},
    telefono: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Afiliado',
    timestamps: false
  });
  return Afiliado;
};