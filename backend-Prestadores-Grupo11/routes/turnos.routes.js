const express = require("express");
const router = express.Router();
const {Turno} = require('../db/models');
const {turnosController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');

router.get('/:id',
  turnosController.getAllTurnosByPrestadorId
);

router.get('/centro/:id',
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnos
);

router.get('/centro/:id/especialidad/:especialidad',
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByEspecialidad
)

router.get('/centro/:id/medico/:medico',
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByMedico
)

router.get('/:id/afiliado/:afiliadoId',
  turnosController.getTurnoByAfiliadoId
);

router.get('/:id/integrante/:integranteId',
  turnosController.getTurnoByIntegranteId
);

router.patch('/:id',
  genericMiddleware.validateModelById(Turno),
  genericMiddleware.validateRolById("medico"),
  turnosController.updateNotesById
);

module.exports = router;