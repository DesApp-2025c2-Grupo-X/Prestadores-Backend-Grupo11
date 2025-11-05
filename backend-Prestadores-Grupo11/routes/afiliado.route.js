const express = require('express');
const router = express.Router();
const controller = require('../controllers/afiliado.controller');
const validarId = require('../middlewares/validarId.middleware');

// Traer todos los afiliados
router.get('/', controller.getAfiliados);

// Buscar por ID con validación
router.get('/:id', validarId, controller.getAfiliadoById);

module.exports = router;