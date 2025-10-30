const express = require('express');
const router = express.Router();
const controller = require('../controllers/autorizacion.controller');
const validarCambioEstado = require('../middlewares/validarCambioEstado');
const existeAutorizacion = require('../middlewares/existeAutorizacion.middleware');
const { Autorizacion } = require('../db/models');

router.post('/', controller.crear);

router.get('/', controller.listar);

router.put('/estado/:id', validarCambioEstado(Autorizacion, 'autorizacion'), controller.cambiarEstado);

router.get('/bandeja', controller.listarPorEstado);

router.get('/dashboard', controller.dashboard);

router.get('/:id', existeAutorizacion, controller.obtenerPorId);


module.exports = router;

