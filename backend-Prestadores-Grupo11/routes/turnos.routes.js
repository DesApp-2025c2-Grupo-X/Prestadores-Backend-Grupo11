const express = require("express");
const router = express.Router();
const {Turno} = require('../db/models');
const {turnosController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');

router.get('/:id',
  turnosController.getAllTurnosById
);

router.get('/:id/Afiliado/:afiliadoId',
  turnosController.getTurnoByAfiliadoId
);

router.get('/:id/Integrante/:integranteId',
  turnosController.getTurnoByIntegranteId
);

router.patch('/:id',
  genericMiddleware.validateModelById(Turno),
  turnosController.updateNotesById
);

module.exports = router;