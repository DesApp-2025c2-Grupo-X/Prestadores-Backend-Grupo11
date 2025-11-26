const db = require('../db/models');
const { Reintegro, Integrante, Prestador } = db;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const { Op } = Sequelize;


const listar = async (req, res) => {
  const reintegros = await Reintegro.findAll({
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(reintegros);
};

const cambiarEstado = async (req, res) => {
  const solicitud = req.solicitud;
  const { nuevoEstado, motivo, prestadorAnalisisId } = req.body;
  const usuarioId = req.usuarioId;

  solicitud.estado = nuevoEstado;
  solicitud.usuarioUltimoCambio = usuarioId;
  solicitud.prestadorAnalisisId = prestadorAnalisisId;

  if (['observado', 'rechazado'].includes(nuevoEstado)) {
    solicitud.motivo = motivo;
  }

  if (['aprobado', 'rechazado'].includes(nuevoEstado)) {
    solicitud.fecha_finalizacion = new Date();
  }
  await solicitud.save();
  res.status(200).json(solicitud);
};

const listarPorEstado = async (req, res) => {
  const { estado } = req.query;
  const reintegros = await Reintegro.findAll({
    where: { estado },
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(reintegros);
};

const dashboard = async (req, res) => {
  const resumenDiario = await Reintegro.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('updatedAt')), 'fecha'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
    ],
    where: {
      estado: { [Op.in]: ['aprobado', 'rechazado', 'observado'] }
    },
    group: ['fecha'],
    order: [['fecha', 'ASC']]
  });

  const resumenSemanal = await Reintegro.findAll({
    attributes: [
      [sequelize.fn('DATE_TRUNC', 'week', sequelize.col('updatedAt')), 'semana'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
    ],
    where: {
      estado: { [Op.in]: ['aprobado', 'rechazado', 'observado'] }
    },
    group: ['semana'],
    order: [['semana', 'ASC']]
  });

  res.status(200).json({ diario: resumenDiario, semanal: resumenSemanal });
};

const obtenerPorId = async (req, res) => {
  const reintegro = req.reintegro;
  res.status(200).json({ estado: reintegro.estado, reintegro });
};

const getPendientesPrestador = async (req, res) => {
  try {

    const prestadorId = req.params.prestadorId;
    const prestador = await Prestador.findByPk(prestadorId);

    if (!prestador) {
      return res.status(404).json({ message: "Prestador no encontrado" });
    }

    const reintegros = await Reintegro.findAll({
      where: {
        medico: prestador.username,
        estado: ["recibido", "en analisis"]
      }
    });

    reintegros.sort((a, b) => {
      return new Date(b.fecha_prestacion) - new Date(a.fecha_prestacion);
    });
    return res.status(200).json(reintegros);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo reintegros del prestador" });
  }
}

const getPendientesCentro = async (req, res) => {
  try {

    const centroId = req.params.prestadorId;
    const prestador = await Prestador.findByPk(centroId);

    if (!prestador) {
      return res.status(404).json({ message: "Centro no encontrado" });
    }

    const medicos = await Prestador.findAll({
      where: {
        centroId: centroId,
        role: 'medico'
      },
      order: [['username', 'ASC']]
    });

    if (!medicos) {
      res.status(404).json({ message: "No se encontraron medicos" })
    }

    let reintegros = []

    //Recorro por cada medico guardando las autorizaciones
    //Uso for, y no map, para poder usar el await dentro
    for (const medico of medicos) {
      const reint = await Reintegro.findAll({
        where: {
          medico: medico.username,
          estado: ["recibido", "en analisis"]
        }
      });

      reintegros = [...reintegros, ...reint];
    }

    reintegros.sort((a, b) => {
      return new Date(b.fecha_prestacion) - new Date(a.fecha_prestacion);
    });
    return res.status(200).json(reintegros);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo reintegros del centro" });
  }
}

module.exports = {
  listar,
  cambiarEstado,
  listarPorEstado,
  dashboard,
  obtenerPorId,
  getPendientesPrestador,
  getPendientesCentro
};