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

    }
  }
  Integrante.init({
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    sexo: {type: DataTypes.ENUM('masculino', 'femenino')},
    fecha_nacimiento: { type: DataTypes.DATE, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false },
    sufijo: {type: DataTypes.STRING, allowNull: false, unique: false},
    afiliadoId: { type: DataTypes.INTEGER, allowNull: false },
    parentesco: { type: DataTypes.ENUM("conyugue", "hijo", "familiar_a_cargo"), allowNull: false }
  }, {
    sequelize,
    modelName: 'Integrante',
    timestamps: false
  });
  return Integrante;
};