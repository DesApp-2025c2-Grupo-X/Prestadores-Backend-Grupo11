const { HistorialSolicitud } = require('../db/models');

module.exports = (Model, tipoSolicitud) => async (req, res, next) => {
  console.log('🛡️ Middleware validarCambioEstado ejecutado');
  console.log('Modelo recibido:', Model?.name);
  console.log('Tipo de solicitud:', tipoSolicitud);
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  console.log('Usuario:', req.user?.id);

  const { id } = req.params;
  const { nuevoEstado, motivo } = req.body;
  const usuarioId = null;

  const solicitud = await Model.findByPk(id);
  if (!solicitud) {
    console.log('❌ Solicitud no encontrada');
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }

  console.log('✅ Solicitud encontrada:', solicitud.id, 'Estado actual:', solicitud.estado);

  if (solicitud.estado === 'en análisis' && solicitud.usuarioUltimoCambio !== usuarioId) {
    console.log('⛔ Usuario no autorizado para continuar el flujo');
    return res.status(403).json({ error: 'Solo el usuario que inició el análisis puede continuar el flujo' });
  }

  if (['observado', 'rechazado'].includes(nuevoEstado) && !motivo) {
    console.log('⚠️ Motivo requerido pero no enviado');
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

  console.log('📜 Historial registrado correctamente');

  req.solicitud = solicitud;
  req.usuarioId = usuarioId;
  next();
};