const db = require("../db/models");
const { Reintegro, Autorizacion, Receta, sequelize } = db;
const { Op } = require("sequelize");

// Función para formatear nombre del mes (si la necesitás en otros endpoints)
const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

module.exports = {
  // KPIs (sin filtros globales)
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

  // Semanal (últimos 7 días) - lo dejo igual que antes
  getSemanal: async (req, res) => {
    try {
      const hoy = new Date();
      const hace7 = new Date();
      hace7.setDate(hoy.getDate() - 6);

      const buildQuery = (Model, table) => ({
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
        reintegros: await Reintegro.findAll(buildQuery(Reintegro, "Reintegro")),
        recetas: await Receta.findAll(buildQuery(Receta, "Receta")),
        autorizaciones: await Autorizacion.findAll(buildQuery(Autorizacion, "Autorizacion")),
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

  // Mensual (totales del año) - lo dejo igual que antes
  getMensual: async (req, res) => {
    try {
      const añoActual = new Date().getFullYear();

      const buildQueryMensual = (Model, table) => ({
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
        Reintegro.findAll(buildQueryMensual(Reintegro, "Reintegro")),
        Receta.findAll(buildQueryMensual(Receta, "Receta")),
        Autorizacion.findAll(buildQueryMensual(Autorizacion, "Autorizacion")),
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

  // Anual (igual)
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

  // Registros recientes (igual)
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



getFiltrado: async (req, res) => {
try {
const { periodo = "semana", estado = "todos" } = req.query;


const hoy = new Date();
let fechaInicio = new Date();

if (periodo === "hoy") {
  fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
} else if (periodo === "semana") {
  fechaInicio.setDate(hoy.getDate() - 6);
} else if (periodo === "mes") {
  fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
} else if (periodo === "anio") {
  fechaInicio = new Date(hoy.getFullYear(), 0, 1);
}




// FILTRO POR ESTADO (especial para ENUM de Reintegro)
// Para Receta y Autorizacion (texto normal)
const filtroEstadoString =
  estado === "todos"
    ? {}
    : {
        estado: {
          [Op.iLike]: estado, // OK porque NO son ENUM
        },
      };

// Para Reintegro (ENUM → convertir a texto para que iLike funcione)
const filtroEstadoReintegro =
  estado === "todos"
    ? {}
    : {
        estado: Sequelize.where(
          Sequelize.cast(Sequelize.col("Reintegro.estado"), "text"),
          {
            [Op.iLike]: estado,
          }
        ),
      };

// Rango fecha
const rangoFecha = {
  createdAt: { [Op.between]: [fechaInicio, hoy] },
};

// Consultas
const [reintegros, recetas, autorizaciones] = await Promise.all([
  Reintegro.findAll({
    where: { ...rangoFecha, ...filtroEstadoReintegro },
    raw: true,
  }),
  Receta.findAll({
    where: { ...rangoFecha, ...filtroEstadoString },
    raw: true,
  }),
  Autorizacion.findAll({
    where: { ...rangoFecha, ...filtroEstadoString },
    raw: true,
  }),
]);


// KPIs

const kpis = {
  reintegros: reintegros.length,
  recetas: recetas.length,
  autorizaciones: autorizaciones.length,
};


// GRÁFICO: distribuir por fecha

const map = {};
const addToMap = (lista, key) => {
  lista.forEach((item) => {
    const rawDate = item.createdAt ? item.createdAt : item.fecha;
    const fecha = new Date(rawDate).toISOString().split("T")[0];

    if (!map[fecha])
      map[fecha] = { fecha, reintegros: 0, recetas: 0, autorizaciones: 0 };

    map[fecha][key] += 1;
  });
};

addToMap(reintegros, "reintegros");
addToMap(recetas, "recetas");
addToMap(autorizaciones, "autorizaciones");

const graficoDates = [];
let cursor = new Date(fechaInicio);
const end = new Date(hoy);

while (cursor <= end) {
  graficoDates.push(cursor.toISOString().split("T")[0]);
  cursor.setDate(cursor.getDate() + 1);
}

const grafico = graficoDates.map((d) =>
  map[d] ? map[d] : { fecha: d, reintegros: 0, recetas: 0, autorizaciones: 0 }
);


// TORTA: distribución por estado

const estadosCount = {};
const addEstado = (lista) => {
  lista.forEach((item) => {
    const e = item.estado ? item.estado.toLowerCase() : "sin_estado";
    estadosCount[e] = (estadosCount[e] || 0) + 1;
  });
};

addEstado(reintegros);
addEstado(recetas);
addEstado(autorizaciones);

const distribucion = Object.entries(estadosCount).map(([key, total]) => {
  let label = key;
  if (key === "analisis" || key === "en análisis") label = "En análisis";
  if (key === "recibido") label = "Recibido";
  if (key === "aprobado") label = "Aprobado";
  if (key === "rechazado") label = "Rechazado";
  if (key === "observado") label = "Observado";
  return { estado: label, total };
});


// TABLA: registros combinados

const registros = [
  ...reintegros.map((r) => ({
    fecha: r.createdAt,
    tipo: "Reintegro",
    estado: r.estado || null,
    descripcion: `${r.especialidad || ""} ${r.medico ? "- " + r.medico : ""}`.trim(),
  })),
  ...recetas.map((r) => ({
    fecha: r.createdAt,
    tipo: "Receta",
    estado: r.estado || null,
    descripcion: r.medicamento || "",
  })),
  ...autorizaciones.map((a) => ({
    fecha: a.createdAt,
    tipo: "Autorización",
    estado: a.estado || null,
    descripcion: a.especialidad || "",
  })),
].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

res.json({ kpis, grafico, distribucion, registros });


} catch (error) {
console.error("ERROR getFiltrado:", error);
res.status(500).json({ error: "Error aplicando filtros" });
}
},
};
