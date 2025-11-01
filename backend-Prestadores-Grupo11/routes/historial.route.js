const express = require('express');
const router = express.Router();
const {situacionesController, historialController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');
const {Afiliado} = require('../db/models');

router.get('/', 
    situacionesController.getAllSituaciones
);

router.get('/:id', 
    genericMiddleware.existModelById(Afiliado),
    historialController.getAllSituacionesByAfliliadoId
);

module.exports = router;