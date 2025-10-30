module.exports = (sequelize, DataTypes) => {
  const HistorialSolicitud = sequelize.define('HistorialSolicitud', {
    tipoSolicitud: DataTypes.STRING,
    solicitudId: DataTypes.INTEGER,
    estadoAnterior: DataTypes.STRING,
    estadoNuevo: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    motivo: DataTypes.STRING
  });

  return HistorialSolicitud;
};