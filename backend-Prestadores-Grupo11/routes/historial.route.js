const express = require('express');
const router = express.Router();
const {situacionesController, historialController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');
const {Afiliado, Integrante} = require('../db/models');

//Se trae todas las situaciones
router.get('/', 
    situacionesController.getAllSituaciones
);

//
router.get('/:nroOApellido', 
    genericMiddleware.existModelById(Afiliado),
    historialController.getAllSituacionesByApellidoONro
);

//Se trae un afiliado con sus situaciones
router.get('/Afiliado/:id',
    genericMiddleware.existModelById(Afiliado),
    situacionesController.getSituacionesByAfiliadoId
);

//Se trae un integrante con sus situaciones
router.get('/Integrante/:id',
    genericMiddleware.existModelById(Integrante),
    situacionesController.getSituacionesByIntegranteId
);

module.exports = router;