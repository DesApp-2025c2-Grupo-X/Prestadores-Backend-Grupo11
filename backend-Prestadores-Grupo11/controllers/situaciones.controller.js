const {Situacion,Afiliado} = require('../db/models');
const { Op } = require('sequelize');

const getAllSituacionesByPrestadorId = async (req,res) => {
    const id = req.params.id;
    const situaciones = await Situacion.findAll({where:{prestadorId: id}});
    res.status(200).json(situaciones);
}

const buscarAfiliado = async (req, res) => {
  const { query } = req.query;

  const afiliados = await Afiliado.findAll({
    where: {
      [Op.or]: [
       // { numero_afiliado: query },
        { apellido: { [Op.iLike]: `%${query}%` } },
       // { telefono: { [Op.iLike]: `%${query}%` } }
      ]
    }
  });

  res.status(200).json(afiliados);
};

const getSituacionesPorAfiliado = async (req, res) => {
  const afiliadoId = req.params.id;

  const situaciones = await Situacion.findAll({
    include: [
      {
        model: Integrante,
        as: 'integrante',
        where: { afiliadoId },
        attributes: ['id', 'nombre', 'apellido']
      }
    ]
  });

  res.status(200).json(situaciones);
};
const modificarFechaFinal = async (req, res) => {
  const { fecha_final } = req.body;
  const situacion = req.situacion;

  situacion.fecha_final = fecha_final;
  await situacion.save();

  res.status(200).json({ mensaje: 'Fecha modificada', situacion });
};
const darDeBajaSituacion = async (req, res) => {
  const situacion = req.situacion;

  situacion.estado = 'baja';
  await situacion.save();

  res.status(200).json({ mensaje: 'Situación dada de baja', situacion });
};

const crearSituacion = async (req, res) => {
  const {
    fecha_inicio,
    especialidad,
    observaciones,
    fecha_final,
    integranteId,
    prestadorId
  } = req.body;

  const nueva = await Situacion.create({
    fecha_inicio,
    especialidad,
    observaciones,
    fecha_final,
    integranteId,
    prestadorId
  });

  res.status(201).json(nueva);
};


module.exports = {getAllSituacionesByPrestadorId,buscarAfiliado,getSituacionesPorAfiliado,modificarFechaFinal,darDeBajaSituacion,crearSituacion}