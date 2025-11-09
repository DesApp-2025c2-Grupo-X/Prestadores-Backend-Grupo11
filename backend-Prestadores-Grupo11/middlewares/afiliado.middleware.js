const { Afiliado } = require("../db/models");
const { Op } = require("sequelize");

const validateAfiliadoByApellidoONumero = async (req, res, next) => {
  try {
    const nroOApellido = decodeURIComponent(req.params.nroOApellido || "").trim();

    // Si está vacío, error directo
    if (!nroOApellido) {
      return res.status(400).json({ error: "Debe ingresar un nombre o número de afiliado" });
    }

    let afiliado;

    // Si tiene un espacio, probablemente sea nombre y apellido juntos
    if (nroOApellido.includes(" ")) {
      const parts = nroOApellido.split(" ");
      const apellido = parts.pop();          // última palabra como apellido
      const nombre = parts.join(" ");        // resto como nombre

      console.log("Buscando afiliado con nombre:", nombre, "apellido:", apellido);

      afiliado = await Afiliado.findOne({
        where: {
          [Op.and]: [
            { nombre: { [Op.iLike]: `%${nombre}%` } },
            { apellido: { [Op.iLike]: `%${apellido}%` } },
          ],
        },
      });
    } else {
      // Si no tiene espacio, buscar por número o por apellido
      afiliado = await Afiliado.findOne({
        where: {
          [Op.or]: [
            { numero_afiliado: { [Op.iLike]: `%${nroOApellido}%` } },
            { apellido: { [Op.iLike]: `%${nroOApellido}%` } },
          ],
        },
      });
    }

    console.log("Afiliado encontrado:", afiliado);

    if (!afiliado) {
      return res.status(404).json({
        error: `No se encontró afiliado con nombre o número "${nroOApellido}"`,
      });
    }

    // Guardamos el afiliado encontrado en req para usarlo en el controlador
    req.afiliado = afiliado;

    next();
  } catch (error) {
    console.error("Error en validateAfiliadoByApellidoONumero:", error);
    return res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};

module.exports = { validateAfiliadoByApellidoONumero };
