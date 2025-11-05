const express = require('express');
const router = express.Router();
const { getPendientesPorPrestador } = require('../controllers/pendientesPorPrestador.controller');
const validarId = require('../middlewares/validarId.middleware');

router.get('/:id', validarId, getPendientesPorPrestador);

module.exports = router;
