'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    static associate(models) {
      Solicitud.belongsTo(models.Prestador, {
        foreignKey: 'prestadorId',
        as: 'prestador'
      });
    }
  }

  Solicitud.init({
    descripcion: {
      type: DataTypes.ENUM('reintegro', 'autorización', 'receta'),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en análisis', 'aprobada', 'rechazada', 'observada'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    fechaSolicitud: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fechaProcesada: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prestadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Prestadors', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Solicitud',
    tableName: 'Solicitudes',
    timestamps: true 
  });

  return Solicitud;
};