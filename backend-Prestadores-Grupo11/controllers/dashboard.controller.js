const db = require("../db/models");
const { Reintegro, Autorizacion, Receta, sequelize } = db;
const { Op, Sequelize } = require("sequelize");

module.exports = {
  // ---------------- KPIs ----------------
  getKpis: async (_, res) => {
    try {
      const [reintegros, recetas, autorizaciones] = await Promise.all([
        Reintegro.count(),
        Receta.count(),
        Autizacion.count(),
      ]);

      res.json({ reintegros, recetas, autorizaciones });
    } catch (error) {
      console.error("ERROR getKpis:", error);
      res.status(500).json({ error: "Error obteniendo KPIs" });
    }
  },

  // ---------------- Semanal ----------------
  getSemanal: async (_, res) => {
    try {
      const hoy = new Date();
      const hace7 = new Date();
      hace7.setDate(hoy.getDate() - 6);

      const query = async (model, campoFecha) => {
        return model.findAll({
          where: {
            [campoFecha]: { [Op.between]: [hace7, hoy] },
          },
          attributes: [
            [sequelize.literal(`DATE("${campoFecha}")`), "dia"],
            [sequelize.fn("COUNT", sequelize.col("id")), "total"],
          ],
          group: [sequelize.literal(`DATE("${campoFecha}")`)],
          order: [sequelize.literal("dia ASC")],
          raw: true,
        });
      };

      const datos = {
        reintegros: await query(Reintegro, "fecha_prestacion"),
        recetas: await query(Receta, "createdAt"),
        autorizaciones: await query(Autorizacion, "fecha_prevista"),
      };

      const dias = {};

      Object.entries(datos).forEach(([tipo, items]) => {
        items.forEach(({ dia, total }) => {
          if (!dias[dia])
            dias[dia] = { dia, reintegros: 0, recetas: 0, autorizaciones: 0 };

          dias[dia][tipo] = parseInt(total);
        });
      });

      res.json(Object.values(dias));
    } catch (error) {
      console.error("ERROR getSemanal:", error);
      res.status(500).json({ error: "Error obteniendo datos semanales" });
    }
  },

  // ---------------- Mensual ----------------
  getMensual: async (_, res) => {
    try {
      const añoActual = new Date().getFullYear();

      const query = (model, campoFecha) => ({
        attributes: [
          [sequelize.literal(`EXTRACT(MONTH FROM "${campoFecha}")`), "mes"],
          [sequelize.fn("COUNT", sequelize.col("id")), "total"],
        ],
        where: sequelize.literal(
          `EXTRACT(YEAR FROM "${campoFecha}") = ${añoActual}`
        ),
        group: [sequelize.literal("mes")],
        order: [sequelize.literal("mes ASC")],
        raw: true,
      });

      const datos = await Promise.all([
        Reintegro.findAll(query(Reintegro, "fecha_prestacion")),
        Receta.findAll(query(Receta, "createdAt")),
        Autorizacion.findAll(query(Autorizacion, "fecha_prevista")),
      ]);

      const meses = {};

      datos.flat().forEach(({ mes, total }) => {
        if (!meses[mes]) meses[mes] = 0;
        meses[mes] += parseInt(total);
      });

      const MESES = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const result = Object.entries(meses).map(([mes, total]) => ({
        mes: MESES[parseInt(mes) - 1],
        total,
      }));

      res.json(result);
    } catch (error) {
      console.error("ERROR getMensual:", error);
      res.status(500).json({ error: "Error obteniendo datos mensuales" });
    }
  },

  // ---------------- Filtrado ----------------
  getFiltrado: async (req, res) => {
    try {
      const { estado = "todos", desde, hasta } = req.query;
      const idPrestador = req.user?.idPrestador || null;

      // ---------------- Fechas por defecto ----------------
      const fechaInicio = desde ? new Date(desde) : new Date();
      const fechaFin = hasta ? new Date(hasta) : new Date();
      fechaFin.setHours(23, 59, 59, 999);

      // ---------------- Filtro de estado ----------------
      const filtroEstado = {};
      if (estado && estado !== "todos") {
        filtroEstado.estado = estado; // Para ENUM, compara exacto
      }

      // ---------------- Query a la DB ----------------
      const [reintegros, recetas, autorizaciones] = await Promise.all([
        Reintegro.findAll({
          where: {
            fecha_prestacion: { [Op.between]: [fechaInicio, fechaFin] },
            ...filtroEstado,
            ...(idPrestador ? { prestadorAnalisisId: idPrestador } : {}),
          },
          raw: true,
        }),
        Receta.findAll({
          where: {
            createdAt: { [Op.between]: [fechaInicio, fechaFin] },
            ...filtroEstado,
          },
          raw: true,
        }),
        Autorizacion.findAll({
          where: {
            fecha_prevista: { [Op.between]: [fechaInicio, fechaFin] },
            ...filtroEstado,
            ...(idPrestador ? { idPrestador } : {}),
          },
          raw: true,
        }),
      ]);

      // ---------------- KPIs ----------------
      const kpis = {
        reintegros: reintegros.length,
        recetas: recetas.length,
        autorizaciones: autorizaciones.length,
      };

      // ---------------- GRÁFICO ----------------
      const map = {};
      const addToMap = (lista, tipo, campoFecha) => {
        lista.forEach((item) => {
          const fecha = new Date(item[campoFecha]).toISOString().split("T")[0];
          if (!map[fecha]) map[fecha] = { fecha, reintegros: 0, recetas: 0, autorizaciones: 0 };
          map[fecha][tipo]++;
        });
      };

      addToMap(reintegros, "reintegros", "fecha_prestacion");
      addToMap(recetas, "recetas", "createdAt");
      addToMap(autorizaciones, "autorizaciones", "fecha_prevista");

      const grafico = [];
      let cursor = new Date(fechaInicio);
      while (cursor <= fechaFin) {
        const d = cursor.toISOString().split("T")[0];
        grafico.push(map[d] || { fecha: d, reintegros: 0, recetas: 0, autorizaciones: 0 });
        cursor.setDate(cursor.getDate() + 1);
      }

      // ---------------- DISTRIBUCIÓN ----------------
      const estadosCount = {};
      [reintegros, recetas, autorizaciones].forEach((lista) =>
        lista.forEach((item) => {
          const key = (item.estado || "sin_estado").toLowerCase();
          estadosCount[key] = (estadosCount[key] || 0) + 1;
        })
      );

      const distribucion = Object.entries(estadosCount).map(([estado, total]) => ({
        estado: estado.charAt(0).toUpperCase() + estado.slice(1),
        total,
      }));

      // ---------------- TABLA ----------------
      const registros = [
        ...reintegros.map((r) => ({
          fecha: r.fecha_prestacion,
          tipo: "Reintegro",
          estado: r.estado,
          descripcion: `${r.especialidad || ""}${r.medico ? " - " + r.medico : ""}`.trim(),
        })),
        ...recetas.map((r) => ({
          fecha: r.createdAt,
          tipo: "Receta",
          estado: r.estado,
          descripcion: r.medicamento || "",
        })),
        ...autorizaciones.map((a) => ({
          fecha: a.fecha_prevista,
          tipo: "Autorización",
          estado: a.estado,
          descripcion: a.especialidad || "",
        })),
      ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      // ---------------- RESPUESTA ----------------
      res.json({ kpis, grafico, distribucion, registros });

    } catch (error) {
      console.error("ERROR DASHBOARD:", error);
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  },
};