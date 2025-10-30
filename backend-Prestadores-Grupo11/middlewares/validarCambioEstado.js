const { HistorialSolicitud } = require('../db/models');

module.exports = (Model, tipoSolicitud) => async (req, res, next) => {
  const { id } = req.params;
  const { nuevoEstado, motivo } = req.body;
  const usuarioId = req.user.id;

  const solicitud = await Model.findByPk(id);
  if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

  if (solicitud.estado === 'en análisis' && solicitud.usuarioUltimoCambio !== usuarioId) {
    return res.status(403).json({ error: 'Solo el usuario que inició el análisis puede continuar el flujo' });
  }

  if (['observado', 'rechazado'].includes(nuevoEstado) && !motivo) {
    return res.status(400).json({ error: 'Debe indicar el motivo para este cambio de estado' });
  }

  await HistorialSolicitud.create({
    tipoSolicitud,
    solicitudId: solicitud.id,
    estadoAnterior: solicitud.estado,
    estadoNuevo: nuevoEstado,
    usuarioId,
    motivo
  });

  req.solicitud = solicitud;
  req.usuarioId = usuarioId;
  next();
};