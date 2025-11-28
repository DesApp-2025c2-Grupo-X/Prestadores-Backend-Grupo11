module.exports = (sequelize, DataTypes) => {
  const Receta = sequelize.define('Receta', {
    medicamento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    presentacion: {
      type: DataTypes.STRING,
      allowNull: false
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
    timestamps: true
  });

  Receta.associate = models => {
    Receta.belongsTo(models.Integrante, {
      foreignKey: 'integranteId',
      as: 'integrante'
    });

    Receta.belongsTo(models.Afiliado, {
      foreignKey: 'afiliadoId',
      as: 'afiliado'
    });

    Receta.hasMany(models.HistorialSolicitud, {
      foreignKey: 'solicitudId',
      constraints: false,
      scope: {
        tipoSolicitud: 'receta'
      },
      as: 'historial'
    });
  };

  return Receta;
};