const {Situacion, Afiliado, Integrante} = require('../db/models');

const getAllSituacionesByAfliliadoId = async (req,res) => {
    const idPrestador = req.params.id
    const idAfiliado = req.params.afiliadoId;
    const situaciones = await Afiliado.findByPk(idAfiliado, {
        include: [{model: Situacion, as: 'situaciones', where: {prestadorId: idPrestador}}, {model: Integrante, as: 'integrantes', include: [{
            model: Situacion, as: 'situaciones'
        }]}],
    })
    res.status(200).json(situaciones);
}

module.exports = {getAllSituacionesByAfliliadoId};