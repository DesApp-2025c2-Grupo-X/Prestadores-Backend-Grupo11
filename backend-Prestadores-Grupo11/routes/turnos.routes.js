const express = require("express");
const router = express.Router();
const {Turno, Prestador, Afiliado, Integrante} = require('../db/models');
const {turnosController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');

//Se trae todos los turnos en los que el prestadorId este asociado junto con los afiliados y los integrantes
router.get('/:id',
  genericMiddleware.existModelById(Prestador),
  turnosController.getAllTurnosByPrestadorId
);

//Se trae todos los turnos con los prestadores afiliados e integrantes asociados a estos (solo para centro)
router.get('/centro/:id',
  genericMiddleware.existModelById(Prestador),
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnos
);

//Se trae todos los turnos filtrados por especialidad (solo para centro)
router.get('/centro/:id/especialidad/:especialidad',
  genericMiddleware.existModelById(Prestador),
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByEspecialidad
)

//Se trae todos los turnos filtrados por medico (solo para centro)
router.get('/centro/:id/medico/:medico',
  genericMiddleware.existModelById(Prestador),
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByMedico
);

//Actualiza el campo notas
router.patch('/:id',
  genericMiddleware.existModelById(Turno),
  genericMiddleware.validateRolById("medico"),
  turnosController.updateNotesById
);

module.exports = router;