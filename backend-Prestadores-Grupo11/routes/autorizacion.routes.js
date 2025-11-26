const express = require('express');
const router = express.Router();
const controller = require('../controllers/autorizacion.controller');
const validarId = require('../middlewares/validarId.middleware');
const validarCambioEstado = require('../middlewares/validarCambioEstado');
const existeAutorizacion = require('../middlewares/existeAutorizacion.middleware');
const { genericMiddleware } = require('../middlewares');
const { Autorizacion } = require('../db/models');

router.get('/', controller.listar);

router.put('/estado/:id', validarId, validarCambioEstado(Autorizacion, 'autorizacion'), controller.cambiarEstado);

router.get('/bandeja', controller.listarPorEstado);

router.get('/dashboard', controller.dashboard);

router.get('/:id', existeAutorizacion, controller.obtenerPorId);

router.get('/pendientes/prestadorId/:prestadorId', genericMiddleware.validateRolById("medico"), controller.getPendientesPrestador)

router.get('/pendientes/centroId/:prestadorId', genericMiddleware.validateRolById("centro_medico"), controller.getPendientesCentro)


module.exports = router;

