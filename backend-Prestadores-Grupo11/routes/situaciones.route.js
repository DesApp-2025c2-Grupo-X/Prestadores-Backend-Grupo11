const express = require('express');
const router = express.Router();
const validarSituacion = require('../middlewares/validarSituacion');
const {buscarAfiliado, getSituacionesPorAfiliado, modificarFechaFinal, darDeBajaSituacion, crearSituacion,getAllSituacionesByPrestadorId} = require('../controllers/situaciones.controller');

router.get('/prestador/:id', getAllSituacionesByPrestadorId);
router.get('/buscar-afiliado', buscarAfiliado);
router.get('/grupo-familiar/:id', getSituacionesPorAfiliado);
router.put('/modificar-fecha/:id', validarSituacion, modificarFechaFinal);
router.put('/baja/:id', validarSituacion, darDeBajaSituacion);
router.post('/', crearSituacion);

module.exports = router;