'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Autorizacion extends Model {
    static associate(models) {
      Autorizacion.belongsTo(models.Integrante, {
        foreignKey: 'integranteId',
        as: 'integrante'
      });

      Autorizacion.belongsTo(models.Afiliado, {
        foreignKey: 'afiliadoId',
        as: 'afiliado'
      });

      Autorizacion.belongsTo(models.Prestador, {
        foreignKey: 'usuarioUltimoCambio',
        as: 'prestadorAnalisis'
      });
    }
  }

  Autorizacion.init({
    fecha_prevista: {
      type: DataTypes.DATE,
      allowNull: false
    },
    integranteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // lugar: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    dias_internacion: {
      type: DataTypes.INTEGER
    },
    observaciones: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.ENUM('recibido', 'en analisis', 'observado', 'aprobado', 'rechazado'),
      defaultValue: 'recibido'
    },
    motivo: {
      type: DataTypes.STRING
    },
    fecha_finalizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    usuarioUltimoCambio: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Autorizacion'
  });

  return Autorizacion;
};