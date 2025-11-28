module.exports = (sequelize, DataTypes) => {
  const HistorialSolicitud = sequelize.define('HistorialSolicitud', {
    tipoSolicitud: DataTypes.STRING,
    solicitudId: DataTypes.INTEGER,
    estadoAnterior: {type: DataTypes.STRING, allowNull: true},
    estadoNuevo: DataTypes.STRING,
    usuarioId: {type: DataTypes.INTEGER, allowNull:true},
    motivo: {type: DataTypes.TEXT, allowNull:true}
  },
{
    timestamps: false,
    modelName: 'HistorialSolicitud',
    tableName: 'HistorialSolicitudes'
  });

  return HistorialSolicitud;
};