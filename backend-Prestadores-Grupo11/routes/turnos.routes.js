const express = require("express");
const router = express.Router();
const {Turno, Prestador, Afiliado, Integrante} = require('../db/models');
const {turnosController} = require('../controllers');
const {genericMiddleware} = require('../middlewares');

router.get('/:id',
  genericMiddleware.existModelById(Prestador),
  turnosController.getAllTurnosByPrestadorId
);

router.get('/centro/:id',
  genericMiddleware.existModelById(Prestador),
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnos
);

router.get('/centro/:id/especialidad/:especialidad',
  genericMiddleware.existModelById(Prestador),
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByEspecialidad
)

router.get('/centro/:id/medico/:medico',
  genericMiddleware.existModelById(Prestador),
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByMedico
)

router.get('/:idPrestador/afiliado/:id',
  genericMiddleware.existModelById(Afiliado),
  turnosController.getTurnoByAfiliadoId
);

router.get('/:idPrestador/integrante/:id',
  genericMiddleware.existModelById(Integrante),
  turnosController.getTurnoByIntegranteId
);

router.patch('/:id',
  genericMiddleware.existModelById(Turno),
  genericMiddleware.validateRolById("medico"),
  turnosController.updateNotesById
);

module.exports = router;