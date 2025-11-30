const express = require("express");
const router = express.Router();

const {
  getKpis,
  getSemanal,
  getMensual,
  getAnual,
  getRegistros,
  getFiltrado,
} = require("../controllers/dashboard.controller");

// Rutas del dashboard
router.get("/kpis", getKpis);
router.get("/semanal", getSemanal);
router.get("/mensual", getMensual);
router.get("/anual", getAnual);
router.get("/registros", getRegistros);
router.get("/filtrado", getFiltrado);

module.exports = router;
