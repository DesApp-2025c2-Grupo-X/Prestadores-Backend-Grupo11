const express = require('express');
const router = express.Router();
const controller = require('../controllers/integrante.controller');
const validarId = require('../middlewares/validarId.middleware');

// Buscar por nombre o DNI
router.get('/', controller.getIntegrantes);

// Buscar por ID con validación
router.get('/:id', validarId, controller.getIntegranteById);

module.exports = router;

