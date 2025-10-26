const express = require('express');
const router = express.Router();
const {getAllSolicitudes, getAllSolicitudesByPrestadorId, getSolicitudById,getAllSolicitudesPendientesEnAnalisis, getSolicitudesPendientesOAnalisisByPrestadorId,getCantidadPorDescripcion} = require('../controllers/solicitudes.controller')
router.get('/', getAllSolicitudes);
router.get('/prestador/:id', getAllSolicitudesByPrestadorId);
router.get('/detalle/:id', getSolicitudById);
router.get('/pendientes-en-analisis', getAllSolicitudesPendientesEnAnalisis);
router.get('/:id/pendientes-en-analisis', getSolicitudesPendientesOAnalisisByPrestadorId);
router.get('/dashboard/por-descripcion', getCantidadPorDescripcion);


module.exports = router;