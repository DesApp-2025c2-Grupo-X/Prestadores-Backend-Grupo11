const express = require("express");
const router = express.Router();
const {Turno} = require('../db/models');
const {turnosController, historialController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');

//Se trae todos los turnos filtrados por especialidad (solo para centro)
router.get('/centro/:prestadorId/especialidad/:especialidad',
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByEspecialidad
)

//Se trae todos los turnos filtrados por medico (solo para centro)
router.get('/centro/:prestadorId/medico/:medico',
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByMedico
);


//Se trae todos los turnos con los prestadores afiliados e integrantes asociados a estos (solo para centro)
router.get('/centro/:prestadorId',
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnos
);

//Se trae todos los turnos en los que el prestadorId este asociado junto con los afiliados y los integrantes
router.get('/:prestadorId',
  genericMiddleware.existPrestadorByPrestadorId,
  turnosController.getAllTurnosByPrestadorId
);


//Actualiza el campo notas
router.patch('/:prestadorId/turno/:id',
  genericMiddleware.existModelById(Turno),
  genericMiddleware.validateRolById("medico"),
  turnosController.updateNotesById
);

//Se trae la historia clinica del paciente
router.get('/historial/:tipoPaciente/:id',
  historialController.getHistoriaClinica
)

module.exports = router;