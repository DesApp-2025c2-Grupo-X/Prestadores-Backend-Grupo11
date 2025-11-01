const {Turno, Afiliado, Integrante, Prestador} = require('../db/models');

const getAllTurnosByPrestadorId = async (req,res) => {
    const id = req.params.id;
    const turnos = await Turno.findAll({where: {prestadorId: id},
    include: [
        {model: Prestador, attributes: ['username'], as: 'prestador'},
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', include: [{model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes'}]}
    ]});
    res.status(200).json(turnos);
}

const getAllTurnos = async (req,res) => {
    const turnos = await Turno.findAll({
    include: [
        {model: Prestador, attributes: ['username', 'especialidad'], as: 'prestador'},
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', include: [{model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes'}]},
    ]});
    res.status(200).json(turnos);
}

const getAllTurnosByEspecialidad = async (req,res) => {
    const e = req.params.especialidad;
    const turnos = await Turno.findAll({
    include: [
        {model: Prestador, attributes: ['username', 'especialidad'], as: 'prestador', where: {especialidad: e}},
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', include: [{model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes'}]}
    ]});
    res.status(200).json(turnos);
}

const getAllTurnosByMedico = async (req,res) => {
    const m = req.params.medico;
    const turnos = await Turno.findAll({
    include: [
        {model: Prestador, attributes: ['username', 'especialidad'], as: 'prestador', where: {username: m, role: "medico"}},
        {model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado', include: [{model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrantes'}]}
    ]});
    res.status(200).json(turnos);
}

const getTurnoByAfiliadoId = async (req,res) => {
    const prestadorId = req.params.idPrestador;
    const afiliadoId = req.params.id
    const turnoAfiliado = await Turno.findOne({where: {prestadorId, afiliadoId}, 
        include: [{model: Afiliado, attributes: ['nombre', 'apellido', 'edad', 'dni', 'numero_afiliado', 'telefono'], as: 'afiliado'}]})
    res.status(200).json(turnoAfiliado);
}

const getTurnoByIntegranteId = async (req,res) => {
    const prestadorId = req.params.idPrestador;
    const integranteId = req.params.id
    const turnoIntegrante = await Turno.findOne({where: {prestadorId, integranteId}, 
        include: [{model: Integrante, attributes: ['nombre', 'edad', 'dni'], as: 'integrante'}]})
    res.status(200).json(turnoIntegrante);
}

const updateNotesById = async (req,res) => {
    const id = req.params.id;
    const {notes} = req.body;
    const turno = await Turno.findByPk(id);
    turno.notes = notes;
    await turno.save()
    res.status(200).json(turno);
}

module.exports = {getAllTurnosByPrestadorId, getTurnoByAfiliadoId, getTurnoByIntegranteId, updateNotesById, getAllTurnos, getAllTurnosByEspecialidad, getAllTurnos, getAllTurnosByMedico};