const db = require('../db/models');
const { Autorizacion, Integrante, Prestador } = db;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const { Op } = Sequelize;

const listar = async (req, res) => {
  const autorizaciones = await Autorizacion.findAll({
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(autorizaciones);
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
  const autorizaciones = await Autorizacion.findAll({
    where: { estado },
    include: [{ model: Integrante, as: 'integrante' }]
  });
  res.status(200).json(autorizaciones);
};


const dashboard = async (req, res) => {
  const resumenDiario = await Autorizacion.findAll({
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

  const resumenSemanal = await Autorizacion.findAll({
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
  const autorizacion = req.autorizacion;
  res.status(200).json({ estado: autorizacion.estado, autorizacion });
};

const getPendientesPrestador = async (req, res) => {
  try {

    const prestadorId = req.params.prestadorId;
    const prestador = await Prestador.findByPk(prestadorId);

    if (!prestador) {
      return res.status(404).json({ message: "Prestador no encontrado" });
    }

    const autorizaciones = await Autorizacion.findAll({
      where: {
        medico: prestador.username,
        estado: {
          [Op.in]: ['recibido', 'en analisis']
        },
        [Op.or]: [
          { usuarioUltimoCambio: null },
          { usuarioUltimoCambio: prestadorId }
        ]
      },
      include: [
        {
          model: Integrante,
          as: "integrante",
          attributes: ["nombre"]
        }
      ]
    });

    autorizaciones.sort((a, b) => {
      return new Date(b.fecha_prevista) - new Date(a.fecha_prevista);
    });
    return res.status(200).json(autorizaciones);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo autorizaciones del prestador" });
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
      order: [['username', 'ASC']],
    });

    if (!medicos) {
      res.status(404).json({ message: "No se encontraron medicos" })
    }

    //Autorizaciones en analisis del centro
    let autorizaciones = await Autorizacion.findAll({
      where: {
        usuarioUltimoCambio: centroId,
        estado: "en analisis"
      },
      include: [
        {
          model: Integrante,
          as: "integrante",
          attributes: ["nombre"]
        }
      ]
    });

    //Recorro por cada medico guardando las autorizaciones
    //Uso for, y no map, para poder usar el await dentro
    for (const medico of medicos) {
      const auths = await Autorizacion.findAll({
        where: {
          medico: medico.username,
          estado: "recibido"
        },
        include: [
          {
            model: Integrante,
            as: "integrante",
            attributes: ["nombre"]
          }
        ]
      });

      autorizaciones = [...autorizaciones, ...auths];
    }

    autorizaciones.sort((a, b) => {
      return new Date(b.fecha_prevista) - new Date(a.fecha_prevista);
    });
    return res.status(200).json(autorizaciones);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo autorizaciones del centro" });
  }
}

const getCompletadosById = async (req, res) => {
  try {
    const prestadorId = req.params.prestadorId
    const prestador = await Prestador.findByPk(prestadorId)

    if (!prestador) {
      return res.status(404).json({ message: "Prestador no encontrado" });
    }

    const autorizaciones = await Autorizacion.findAll({
      where: {
        usuarioUltimoCambio: prestadorId,
        estado: {
          [Op.in]: ['aprobado', 'rechazado', 'observado']
        }
      },
      include: [
        {
          model: Integrante,
          as: "integrante",
          attributes: ["nombre"]
        }
      ]
    });

    autorizaciones.sort((a, b) => {
      return new Date(b.fecha_prevista) - new Date(a.fecha_prevista);
    });
    return res.status(200).json(autorizaciones);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo autorizaciones completadas del prestador" });
  }
}

module.exports = { listar, cambiarEstado, listarPorEstado, dashboard, obtenerPorId,
 getPendientesPrestador, getPendientesCentro, getCompletadosById };