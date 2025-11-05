const { Autorizacion, Receta, Reintegro } = require('../db/models');

const getPendientesPorPrestador = async (req, res) => {
  const prestadorId = req.params.id; 
  console.log('Entró al endpoint con ID:', req.params.id);

  const [autorizaciones, recetas, reintegros] = await Promise.all([
    Autorizacion.findAll({ where: { estado: 'en analisis', usuarioUltimoCambio: prestadorId } }),

    Receta.findAll({ where: { estado: 'en analisis', usuarioUltimoCambio: prestadorId } }),

    Reintegro.findAll({ where: { estado: 'en analisis', usuarioUltimoCambio: prestadorId } })
  ]);

  res.status(200).json({ autorizaciones, recetas, reintegros });

  res.status(200).json({ autorizaciones, recetas, reintegros });
};

module.exports = { getPendientesPorPrestador };
