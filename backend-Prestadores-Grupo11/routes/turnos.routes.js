const express = require("express");
const router = express.Router();
const { Turno } = require("../db/models");
const { turnosController, historialController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");


// RUTAS CENTRO MÉDICO
router.get(
  "/centro/:centroId",
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByCentro
);

// Turnos por especialidad dentro del centro
router.get(
  "/centro/:centroId/especialidad/:especialidadId",
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByEspecialidad
);

// Turnos por médico dentro del centro
router.get(
  "/centro/:centroId/medico/:medicoId",
  genericMiddleware.existPrestadorByPrestadorId,
  genericMiddleware.validateRolById("centro_medico"),
  turnosController.getAllTurnosByMedico
);



// RUTA PARA EL MÉDICO INDIVIDUAL
router.get(
  "/:prestadorId",
  genericMiddleware.existPrestadorByPrestadorId,
  turnosController.getAllTurnosByPrestadorId
);

//filtrar turnos por propios
router.get(
  '/prestador/:prestadorId/:pacienteId',
  genericMiddleware.validateRolById('medico'),
  turnosController.filtrarNotasPropias
);

// ACTUALIZAR NOTAS DEL TURNO
router.patch(
  "/prestador/:prestadorId/turno/:id",
  genericMiddleware.existModelById(Turno),
  genericMiddleware.validateRolById("medico"),
  turnosController.updateNotesById
);


// HISTORIAL CLÍNICO
router.get("/historial/:tipoPaciente/:id", historialController.getHistoriaClinica);

module.exports = router;
