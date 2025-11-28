const { Autorizacion, Receta, Reintegro, Integrante } = require('../db/models');

const getPendientesPorPrestador = async (req, res) => {
  const prestadorId = req.params.id; 
  console.log('Entró al endpoint con ID:', req.params.id);

  const [autorizaciones, recetas, reintegros] = await Promise.all([
      Autorizacion.findAll({
        where: { estado: 'en analisis', usuarioUltimoCambio: prestadorId },
        include: [
          {
            model: Afiliado,
            as: 'afiliado',
            attributes:  ['id', 'nombre', 'apellido', 'edad', 'dni', 'telefono']
          },
          {
            model: Integrante,
            as: 'integrante',
            attributes: ['id', 'nombre', 'dni', 'edad', 'afiliadoId']
          }
        ]
      }),

      Receta.findAll({
        where: { estado: 'en analisis', usuarioUltimoCambio: prestadorId },
        include: [
          {
            model: Afiliado,
            as: 'afiliado',
            attributes:  ['id', 'nombre', 'apellido', 'edad', 'dni', 'telefono']
          },
          {
            model: Integrante,
            as: 'integrante',
            attributes: ['id', 'nombre', 'dni', 'edad', 'afiliadoId']
          }
        ]
      }),

      Reintegro.findAll({
        where: { estado: 'en analisis', usuarioUltimoCambio: prestadorId },
        include: [
          {
            model: Afiliado,
            as: 'afiliado',
            attributes:  ['id', 'nombre', 'apellido', 'edad', 'dni', 'telefono']
          },
          {
            model: Integrante,
            as: 'integrante',
            attributes: ['id', 'nombre', 'dni', 'edad', 'afiliadoId']
          }
        ]
      }),
    ]);

  res.status(200).json({ autorizaciones, recetas, reintegros });

  res.status(200).json({ autorizaciones, recetas, reintegros });
};

module.exports = { getPendientesPorPrestador };
