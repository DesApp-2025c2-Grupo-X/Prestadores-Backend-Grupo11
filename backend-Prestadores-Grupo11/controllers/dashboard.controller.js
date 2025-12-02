const db = require("../db/models");
const { Reintegro, Autorizacion, Receta, sequelize } = db;
const { Op } = require("sequelize");

const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

module.exports = {


  // KPIs

  getKpis: async (req, res) => {
    try {
      const [reintegros, recetas, autorizaciones] = await Promise.all([
        Reintegro.count(),
        Receta.count(),
        Autorizacion.count(),
      ]);

      res.json({ reintegros, recetas, autorizaciones });

    } catch (error) {
      console.error("ERROR getKpis:", error);
      res.status(500).json({ error: "Error obteniendo KPIs" });
    }
  },


  // SEMANAL
  getSemanal: async (req, res) => {
    try {
      const hoy = new Date();
      const hace7 = new Date();
      hace7.setDate(hoy.getDate() - 6);

      const buildQuery = (table) => ({
        where: {
          createdAt: { [Op.between]: [hace7, hoy] }
        },
        attributes: [
          [sequelize.literal(`DATE("${table}"."createdAt")`), "dia"],
          [sequelize.fn("COUNT", sequelize.col("id")), "total"]
        ],
        group: [sequelize.literal(`DATE("${table}"."createdAt")`)],
        order: [sequelize.literal("dia ASC")],
        raw: true
      });

      const datos = {
        reintegros: await Reintegro.findAll(buildQuery("Reintegro")),
        recetas: await Receta.findAll(buildQuery("Receta")),
        autorizaciones: await Autorizacion.findAll(buildQuery("Autorizacion")),
      };

      const dias = {};

      Object.entries(datos).forEach(([tipo, items]) => {
        items.forEach((item) => {
          const key = item.dia;
          if (!dias[key])
            dias[key] = { dia: key, reintegros: 0, recetas: 0, autorizaciones: 0 };

          dias[key][tipo] = parseInt(item.total);
        });
      });

      res.json(Object.values(dias));

    } catch (error) {
      console.error("ERROR getSemanal:", error);
      res.status(500).json({ error: "Error obteniendo datos semanales" });
    }
  },


  // MENSUAL

  getMensual: async (req, res) => {
    try {
      const añoActual = new Date().getFullYear();

      const buildQueryMensual = (table) => ({
        attributes: [
          [sequelize.literal(`EXTRACT(MONTH FROM "${table}"."createdAt")`), "mes"],
          [sequelize.fn("COUNT", sequelize.col("id")), "total"]
        ],
        where: sequelize.literal(`EXTRACT(YEAR FROM "${table}"."createdAt") = ${añoActual}`),
        group: [sequelize.literal("mes")],
        order: [sequelize.literal("mes ASC")],
        raw: true
      });

      const datos = await Promise.all([
        Reintegro.findAll(buildQueryMensual("Reintegro")),
        Receta.findAll(buildQueryMensual("Receta")),
        Autorizacion.findAll(buildQueryMensual("Autorizacion")),
      ]);

      const respuesta = {};
      datos.flat().forEach(({ mes, total }) => {
        if (!respuesta[mes]) respuesta[mes] = 0;
        respuesta[mes] += parseInt(total);
      });

      const result = Object.entries(respuesta).map(([mes, total]) => ({
        mes: MESES[parseInt(mes) - 1],
        total,
      }));

      res.json(result);

    } catch (error) {
      console.error("ERROR getMensual:", error);
      res.status(500).json({ error: "Error obteniendo datos mensuales" });
    }
  },


  // ANUAL

  getAnual: async (req, res) => {
    try {
      const [rein, rec, aut] = await Promise.all([
        Reintegro.count(),
        Receta.count(),
        Autorizacion.count(),
      ]);

      res.json([
        { categoria: "Reintegros", total: rein },
        { categoria: "Recetas", total: rec },
        { categoria: "Autorizaciones", total: aut },
      ]);

    } catch (error) {
      console.error("ERROR getAnual:", error);
      res.status(500).json({ error: "Error obteniendo datos anuales" });
    }
  },

 
  // REGISTROS RECIENTES

  getRegistros: async (req, res) => {
    try {
      const limit = 50;
      const registros = [];

      const reintegros = await Reintegro.findAll({ limit, order: [["createdAt", "DESC"]] });
      const recetas = await Receta.findAll({ limit, order: [["createdAt", "DESC"]] });
      const autorizaciones = await Autorizacion.findAll({ limit, order: [["createdAt", "DESC"]] });

      reintegros.forEach((r) =>
        registros.push({
          id: `R-${r.id}`,
          fecha: r.createdAt,
          tipo: "Reintegro",
          descripcion: `${r.especialidad} - ${r.medico}`,
        })
      );

      recetas.forEach((r) =>
        registros.push({
          id: `RC-${r.id}`,
          fecha: r.createdAt,
          tipo: "Receta",
          descripcion: r.medicamento,
        })
      );

      autorizaciones.forEach((a) =>
        registros.push({
          id: `A-${a.id}`,
          fecha: a.createdAt,
          tipo: "Autorización",
          descripcion: a.especialidad,
        })
      );

      registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      res.json(registros);

    } catch (error) {
      console.error("ERROR getRegistros:", error);
      res.status(500).json({ error: "Error obteniendo registros" });
    }
  },

 
  // FILTRADO GLOBAL
  
  getFiltrado: async (req, res) => {
    try {
      const { periodo = "semana" } = req.query;
      let { estado = "todos" } = req.query;

      // Normalización de estado para coincidir con ENUM
      const mapaEstados = {
        todos: "todos",
        recibido: "recibido",
        analisis: "en analisis",
        observado: "observado",
        aprobado: "aprobado",
        rechazado: "rechazado",
      };

      estado = mapaEstados[estado] ?? "todos";

      const hoy = new Date();
      let fechaInicio = new Date();

      switch (periodo) {
        case "hoy":
          fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
          break;
        case "semana":
          fechaInicio.setDate(hoy.getDate() - 6);
          break;
        case "mes":
          fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
          break;
        case "anio":
          fechaInicio = new Date(hoy.getFullYear(), 0, 1);
          break;
      }

      const filtroFecha = { createdAt: { [Op.between]: [fechaInicio, hoy] } };
      const filtroEstado = estado !== "todos" ? { estado } : {};

      const q = (Model) => ({
        where: { ...filtroFecha, ...filtroEstado },
        order: [["createdAt", "ASC"]],
        raw: true
      });

      const [rein, rec, aut] = await Promise.all([
        Reintegro.findAll(q(Reintegro)),
        Receta.findAll(q(Receta)),
        Autorizacion.findAll(q(Autorizacion))
      ]);

      // KPIs
      const kpis = {
        reintegros: rein.length,
        recetas: rec.length,
        autorizaciones: aut.length
      };

      // GRAFICO
      const agruparPorFecha = {};
      const push = (arr, key) => {
        arr.forEach((item) => {
          const f = item.createdAt.toISOString().split("T")[0];
          if (!agruparPorFecha[f])
            agruparPorFecha[f] = {
              fecha: f,
              reintegros: 0,
              recetas: 0,
              autorizaciones: 0
            };
          agruparPorFecha[f][key]++;
        });
      };

      push(rein, "reintegros");
      push(rec, "recetas");
      push(aut, "autorizaciones");

      const grafico = Object.values(agruparPorFecha);

      // TORTA
      const distribucion = [
        { estado: "Reintegros", total: rein.length },
        { estado: "Recetas", total: rec.length },
        { estado: "Autorizaciones", total: aut.length }
      ];

      // TABLA
      const registros = [
        ...rein.map(r => ({
          fecha: r.createdAt,
          tipo: "Reintegro",
          estado: r.estado || "",
          descripcion: r.descripcion || ""
        })),
        ...rec.map(r => ({
          fecha: r.createdAt,
          tipo: "Receta",
          estado: r.estado || "",
          descripcion: r.medicamento || ""
        })),
        ...aut.map(a => ({
          fecha: a.createdAt,
          tipo: "Autorización",
          estado: a.estado || "",
          descripcion: a.especialidad || ""
        })),
      ].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));

      res.json({
        periodo,
        estado,
        kpis,
        grafico,
        distribucion,
        registros
      });

    } catch (error) {
      console.error("ERROR getFiltrado:", error);
      res.status(500).json({ error: "Error obteniendo datos filtrados" });
    }
  }

};
