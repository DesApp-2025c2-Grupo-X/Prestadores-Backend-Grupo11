'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reintegro extends Model {
    static associate(models) {

       Reintegro.belongsTo(models.Afiliado, {
        foreignKey: 'afiliadoId',
        as: 'afiliado'
      });
      Reintegro.belongsTo(models.Integrante, {
        foreignKey: 'integranteId',
        as: 'integrante'
      });

      Reintegro.belongsTo(models.Prestador, {
        foreignKey: 'usuarioUltimoCambio',
        as: 'prestador'
      });
    }
  }

  Reintegro.init({
    fecha_prestacion: {
      type: DataTypes.DATE,
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
    // Datos de factura
    factura_fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    factura_cuit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    factura_valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    factura_persona: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Forma de pago
    forma_pago: {
      type: DataTypes.ENUM('cheque', 'efectivo', 'transferencia'),
      allowNull: false
    },
    cbu: {
      type: DataTypes.STRING,
      allowNull: true
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    
    estado: {
      type: DataTypes.ENUM('recibido', 'en analisis', 'observado', 'aprobado', 'rechazado'),
      defaultValue: 'recibido'
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_finalizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    usuarioUltimoCambio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Reintegro'
  });

  return Reintegro;
};
