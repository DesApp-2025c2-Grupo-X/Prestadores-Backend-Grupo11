const express = require("express");
const router = express.Router();

const {
  getKpis,
  getSemanal,
  getMensual,
  getFiltrado,
} = require("../controllers/dashboard.controller");

// Rutas del dashboard
router.get("/kpis", getKpis);
router.get("/semanal", getSemanal);
router.get("/mensual", getMensual);
router.get("/filtrado", getFiltrado);

module.exports = router;