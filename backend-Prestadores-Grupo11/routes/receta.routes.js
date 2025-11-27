const express = require('express');
const router = express.Router();

const recetaController = require('../controllers/receta.controller');
const existeReceta = require('../middlewares/existeReceta.middleware');
const validarId = require('../middlewares/validarId.middleware');
const validarCambioEstado = require('../middlewares/validarCambioEstado');
const { Receta } = require('../db/models');

router.get('/', recetaController.listar);

router.get('/estado', recetaController.listarPorEstado);

router.get('/dashboard', recetaController.dashboard);

router.get('/:id', validarId, existeReceta, recetaController.obtenerPorId);

router.put('/:id/estado', validarId, validarCambioEstado(Receta, 'receta'), recetaController.cambiarEstado);

router.get('/completados/prestadorId/:prestadorId', recetaController.getCompletadosById)

module.exports = router;


