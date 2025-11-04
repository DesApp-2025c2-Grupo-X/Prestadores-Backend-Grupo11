const {Turno, Afiliado, Integrante, Prestador} = require('../db/models');

const getAllTurnosByPrestadorId = async (req,res) => {
    const id = req.params.id;
    const turnos = await Turno.findAll({where: {prestadorId: id},
    include: [
        {model: Prestador, attributes: {exclude: ['especialidad', 'password']}, as: 'prestador'},
        {model: Afiliado, as: 'afiliado', include: [{model: Integrante, as: 'integrantes'}]}
    ]});
    res.status(200).json(turnos);
}

const getAllTurnos = async (req,res) => {
    const turnos = await Turno.findAll({
    include: [
        {model: Prestador, attributes: {exclude: ['password']}, as: 'prestador'},
        {model: Afiliado, as: 'afiliado', include: [{model: Integrante, as: 'integrantes'}]},
    ]});
    res.status(200).json(turnos);
}

const getAllTurnosByEspecialidad = async (req,res) => {
    const e = req.params.especialidad;
    const turnos = await Turno.findAll({
    include: [
        {model: Prestador, attributes: {exclude: ['password']}, as: 'prestador', where: {especialidad: e}},
        {model: Afiliado, as: 'afiliado', include: [{model: Integrante, as: 'integrantes'}]}
    ]});
    res.status(200).json(turnos);
}

const getAllTurnosByMedico = async (req,res) => {
    const m = req.params.medico;
    const turnos = await Turno.findAll({
    include: [
        {model: Prestador, attributes: {exclude: ['password']}, as: 'prestador', where: {username: m, role: "medico"}},
        {model: Afiliado, as: 'afiliado', include: [{model: Integrante, as: 'integrantes'}]}
    ]});
    res.status(200).json(turnos);
}

const updateNotesById = async (req,res) => {
    const id = req.params.id;
    const {notes} = req.body;
    const turno = await Turno.findByPk(id);
    turno.notes = notes;
    await turno.save()
    res.status(200).json(turno);
}

module.exports = {getAllTurnosByPrestadorId, updateNotesById, getAllTurnos, getAllTurnosByEspecialidad, getAllTurnos, getAllTurnosByMedico};