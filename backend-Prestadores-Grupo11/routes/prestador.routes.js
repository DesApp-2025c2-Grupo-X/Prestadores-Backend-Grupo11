const express = require('express');
const router = express.Router();
const {genericMiddleware} = require('../middlewares');
const { prestadorController } = require('../controllers');
//const validarId = require('../middlewares/validarId.middleware');
//const {turnosController, historialController} = require('../controllers');

//Get prestadores by centro id
router.get('/centro/:prestadorId', 
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  prestadorController.getPrestadoresByCentroId
)

module.exports = router;
