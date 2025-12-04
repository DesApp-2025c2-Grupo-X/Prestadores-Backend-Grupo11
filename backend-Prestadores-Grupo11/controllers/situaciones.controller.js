const {
  Situacion,
  Afiliado,
  Integrante,
  Prestador,
  Sequelize,
} = require("../db/models");
const { Op } = require("sequelize");

/**
 * Función utilitaria para normalizar cadenas (trim + lowercase)
 */
const normalizeString = (str) => str?.trim().toLowerCase();

/**
 * Obtiene todas las situaciones de un afiliado por nombre, apellido o número de afiliado
 * asociadas a un prestador, incluyendo a sus integrantes y sus situaciones.
 */
const getAllSituacionesByNroOApellidoAfliliado = async (req, res) => {
  try {
    const { prestadorId } = req.params;

    // Tomamos el afiliado que ya fue validado por el middleware
    const afiliado = req.afiliado;

    if (!afiliado) {
      return res.status(404).json({ error: "Afiliado no encontrado" });
    }

    const afiliadoData = afiliado.get({ plain: true });

    // Situaciones del afiliado para ese prestador
    const situacionesAfiliado = await Situacion.findAll({
      where: { afiliadoId: afiliadoData.id, prestadorId },
      include: [
        { model: Prestador, as: "prestador", attributes: ["username"] },
      ],
    });

    // Integrantes del afiliado con sus situaciones para ese prestador
    const integrantes = await Integrante.findAll({
      where: { afiliadoId: afiliadoData.id },
      include: [
        {
          model: Situacion,
          as: "situaciones",
          where: { prestadorId },
          required: false,
          include: [
            { model: Prestador, as: "prestador", attributes: ["username"] },
          ],
        },
      ],
    });

    return res.status(200).json({
      id: afiliadoData.id,
      nombre: afiliadoData.nombre,
      apellido: afiliadoData.apellido,
      dni: afiliadoData.dni,
      edad: afiliadoData.edad,
      numero_afiliado: afiliadoData.numero_afiliado,
      situaciones: situacionesAfiliado,
      integrantes: integrantes.map((i) => ({
        id: i.id,
        nombre: i.nombre,
        edad: i.edad,
        dni: i.dni,
        situaciones: i.situaciones,
      })),
    });
  } catch (error) {
    console.error("Error en getAllSituacionesByNroOApellidoAfliliado:", error);
    return res.status(500).json({
      error: "Error al obtener situaciones del afiliado",
      detalle: error.message,
    });
  }
};

/**
 * Obtiene todas las situaciones de todos los afiliados (solo para centro médico)
 */
const getAllSituaciones = async (req, res) => {
  try {
    const situaciones = await Afiliado.findAll({
      include: [
        {
          model: Situacion,
          as: "situaciones",
          include: [
            { model: Prestador, attributes: ["username"], as: "prestador" },
          ],
        },
        {
          model: Integrante,
          as: "integrantes",
          include: [
            {
              model: Situacion,
              as: "situaciones",
              include: [
                { model: Prestador, attributes: ["username"], as: "prestador" },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json(situaciones);
  } catch (error) {
    console.error("Error en getAllSituaciones:", error);
    res.status(500).json({
      error: "Error al obtener todas las situaciones",
      detalle: error.message,
    });
  }
};

/**
 * Obtiene todas las situaciones de un afiliado por ID
 */
const getSituacionesByAfiliadoId = async (req, res) => {
  try {
    const { id } = req.params;

    const afiliado = await Afiliado.findByPk(id, {
      include: [
        {
          model: Situacion,
          as: "situaciones",
          include: [
            { model: Prestador, attributes: ["username"], as: "prestador" },
          ],
        },
        {
          model: Integrante,
          as: "integrantes",
          include: [
            {
              model: Situacion,
              as: "situaciones",
              include: [
                { model: Prestador, attributes: ["username"], as: "prestador" },
              ],
            },
          ],
        },
      ],
    });

    if (!afiliado) {
      return res.status(404).json({ error: "Afiliado no encontrado" });
    }

    res.status(200).json(afiliado);
  } catch (error) {
    console.error(
      `Error en getSituacionesByAfiliadoId ${req.params.id}:`,
      error
    );
    res.status(500).json({
      error: "Error al obtener situaciones del afiliado",
      detalle: error.message,
    });
  }
};

/**
 * Obtiene todas las situaciones de un integrante por ID
 */
const getSituacionesByIntegranteId = async (req, res) => {
  try {
    const { id } = req.params;

    const integrante = await Integrante.findByPk(id, {
      include: [
        {
          model: Situacion,
          as: "situaciones",
          include: [
            { model: Prestador, attributes: ["username"], as: "prestador" },
          ],
        },
      ],
    });

    if (!integrante) {
      return res.status(404).json({ error: "Integrante no encontrado" });
    }

    res.status(200).json(integrante);
  } catch (error) {
    console.error(
      `Error en getSituacionesByIntegranteId ${req.params.id}:`,
      error
    );
    res.status(500).json({
      error: "Error al obtener situaciones del integrante",
      detalle: error.message,
    });
  }
};

/**
 * Da de baja una situación
 */
const darDeBajaSituacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const situacion = await Situacion.findByPk(id);

    if (!situacion) {
      return res.status(404).json({ error: "Situación no encontrada" });
    }

    situacion.estado = estado;
    await situacion.save();

    res.status(200).json(situacion);
  } catch (error) {
    console.error("Error en darDeBajaSituacionById:", error);
    res.status(500).json({
      error: "Error al dar de baja la situación",
      detalle: error.message,
    });
  }
};


/**
 * Da de alta una situación
 */
const darDeAltaSituacion = async (req, res) => {
  try {
    const { prestadorId } = req.params;
    const data = req.body;

    console.log(" Datos recibidos en backend:", data);

    
    // 1) VALIDAR PRESTADOR
    if (!prestadorId) {
      return res.status(400).json({ error: "Falta el prestadorId en la URL" });
    }

    // 2) MANEJO DE AFILIADO / INTEGRANTE
    if (data.afiliadoId === undefined && data.integranteId) {
      const integrante = await Integrante.findByPk(data.integranteId);
      if (integrante) {
        data.afiliadoId = integrante.afiliadoId;
        console.log("afiliadoId derivado desde integrante:", data.afiliadoId);
      }
    }

    // Si no hay ni afiliadoId ni integranteId → NO se puede crear
    if (!data.afiliadoId && !data.integranteId) {
      return res.status(400).json({
        error: "Debes enviar afiliadoId o integranteId para crear la situación",
      });
    }
    // 3) VALIDAR CAMPOS OBLIGATORIOS
  
    if (!data.especialidad || !data.especialidad.trim()) {
      return res.status(400).json({ error: "Falta la especialidad" });
    }

    if (!data.situacion || !data.situacion.trim()) {
      return res.status(400).json({ error: "Falta la situación terapéutica" });
    }

    // Fecha válida
    const fecha = data.fecha_inicio || data.fecha;
    if (!fecha) {
      return res.status(400).json({ error: "Falta la fecha de inicio" });
    }

  
    // 4) CREAR SITUACIÓN
  
    const nuevaSituacion = await Situacion.create({
      afiliadoId: data.afiliadoId || null,
      integranteId: data.integranteId || null,
      prestadorId,
      especialidad: data.especialidad.trim(),
      situacion: data.situacion.trim(),
      observaciones: data.observaciones || "",
      fecha_inicio: fecha,
      fecha_final: data.fecha_final ?? null, // si no la mandan → igual que inicio
      estado: data.estado || "alta",
    });

    console.log(" Situación creada:", nuevaSituacion.id);

    return res.status(201).json({
      message: "Situación creada correctamente",
      situacion: nuevaSituacion,
    });

  } catch (error) {
    console.error(" Error en darDeAltaSituacion:", error);
    res.status(500).json({
      error: "Error al dar de alta la situación",
      detalle: error.message,
    });
  }
};


/**
 * Actualiza una situación (estado u otros campos)
 */
const actualizarSituacion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const situacion = await Situacion.findByPk(id);
    if (!situacion) {
      return res.status(404).json({ error: "Situación no encontrada" });
    }

    // Validar estado permitido
    const estadosValidos = [
      "en proceso",
      "alta",
      "baja",
      "finalizado",
    ];
    if (data.estado && !estadosValidos.includes(data.estado.toLowerCase())) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    // Actualizar los campos recibidos (solo los que vienen en data)
    await situacion.update(data);

    res.status(200).json({
      message: "Situación actualizada correctamente",
      situacion,
    });
  } catch (error) {
    console.error("Error en actualizarSituacion:", error);
    res.status(500).json({
      error: "Error al actualizar situación",
      detalle: error.message,
    });
  }
};

module.exports = {
  getAllSituacionesByNroOApellidoAfliliado,
  getAllSituaciones,
  getSituacionesByAfiliadoId,
  getSituacionesByIntegranteId,
  darDeBajaSituacionById,
  darDeAltaSituacion,
  actualizarSituacion,
  normalizeString,
};
