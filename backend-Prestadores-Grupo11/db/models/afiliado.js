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
    }
  }
  Afiliado.init({
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    sexo: { type: DataTypes.ENUM('masculino', 'femenino') },
    fecha_nacimiento: { type: DataTypes.DATE, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false },
    numero_afiliado: { type: DataTypes.STRING, allowNull: false, unique: true },
    sufijo: { type: DataTypes.STRING, allowNull: false, unique: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    fecha_alta: { type: DataTypes.DATE, allowNull: false }
  }, {
    sequelize,
    modelName: 'Afiliado',
    timestamps: false
  });
  return Afiliado;
};