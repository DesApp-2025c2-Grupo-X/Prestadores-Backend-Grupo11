const {Turno, Afiliado, Integrante} = require('../db/models');

const getAllTurnosById = async (req,res) => {
    const id = req.params.id;
    const turnos = await Turno.findAll({where: {prestadorId: id},
    include: [
        {model: Afiliado, attributes: ['apellido'], as: 'afiliado'},
        {model: Integrante, attributes: ['nombre'], as: 'integrante'}
    ]});
    res.status(200).json(turnos);
}

const getTurnoByAfiliadoId = async (req,res) => {
    const id = req.params.id;
    const idAfiliado = req.params.afiliadoId
    const turnoAfiliado = await Turno.findOne({where: {prestadorId: id, afiliadoId: idAfiliado}, 
        include: [{model: Afiliado, attributes: ['apellido'], as: 'afiliado'}]})
    res.status(200).json(turnoAfiliado);
}

const getTurnoByIntegranteId = async (req,res) => {
    const id = req.params.id;
    const idIntegrante = req.params.integranteId
    const turnoIntegrante = await Turno.findOne({where: {prestadorId: id, integranteId: idIntegrante}, 
        include: [{model: Integrante, attributes: ['nombre'], as: 'integrante'}]})
    res.status(200).json(turnoIntegrante);
}

const updateNotesById = async (req,res) => {
    const id = req.params.id;
    const notes = req.body;
    const turno = await Turno.findByPk(id);
    await turno.update(notes);
    res.status(200).json(turno);
}

module.exports = {getAllTurnosById, getTurnoByAfiliadoId, getTurnoByIntegranteId, updateNotesById}