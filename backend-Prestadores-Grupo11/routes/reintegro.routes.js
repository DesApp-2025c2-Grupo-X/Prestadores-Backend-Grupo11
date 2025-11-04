const express = require('express');
const router = express.Router();

const reintegroController = require('../controllers/reintegro.controller');
const validarId = require('../middlewares/validarId.middleware');
const existeReintegro = require('../middlewares/existeReintegro.middleware');
const validarCambioEstado = require('../middlewares/validarCambioEstado');

const db = require('../db/models');
const { Reintegro } = db;

router.get('/', reintegroController.listar);


router.get('/estado', reintegroController.listarPorEstado);


router.get('/dashboard', reintegroController.dashboard);


router.get('/:id', validarId, existeReintegro, reintegroController.obtenerPorId);

router.put('/:id/estado', validarId, validarCambioEstado(Reintegro, 'reintegro'), reintegroController.cambiarEstado);

module.exports = router;