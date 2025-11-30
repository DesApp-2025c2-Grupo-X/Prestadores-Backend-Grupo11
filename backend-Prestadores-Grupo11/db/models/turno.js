"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
      Turno.belongsTo(models.Afiliado, {
        foreignKey: "afiliadoId",
        as: "afiliado",
      });

      Turno.belongsTo(models.Integrante, {
        foreignKey: "integranteId",
        as: "integrante",
      });

      Turno.belongsTo(models.Prestador, {
        foreignKey: "prestadorId",
        as: "prestador",
      });

      Turno.belongsTo(models.Prestador, {
        foreignKey: "centroId",
        as: "centro",
      });
    }
  }

  Turno.init(
    {
      date: { type: DataTypes.DATE, allowNull: false },
      start: { type: DataTypes.DATE, allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: false },
      notes: DataTypes.TEXT,
      descripcion: DataTypes.TEXT,

      afiliadoId: DataTypes.INTEGER,
      integranteId: DataTypes.INTEGER,
      prestadorId: { type: DataTypes.INTEGER, allowNull: false },
      centroId: { type: DataTypes.INTEGER, allowNull: true}, 
    },
    {
      sequelize,
      modelName: "Turno",
      timestamps: false,
    }
  );
  return Turno;
};
