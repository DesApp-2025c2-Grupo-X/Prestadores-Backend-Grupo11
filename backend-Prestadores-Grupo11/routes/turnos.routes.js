const express = require("express");
const router = express.Router();
const {Turno} = require('../db/models')
const {turnosController, genericController} = require('../controllers')

router.get('/:id',
  turnosController.getAllTurnosById
);

router.get('/:id/Afiliado/:afiliadoId',
  turnosController.getTurnoByAfiliadoId
);

router.get('/:id/Integrante/:integranteId',
  turnosController.getTurnoByIntegranteId
)

router.post('/',
  genericController.createNewModel(Turno)
);

module.exports = router;