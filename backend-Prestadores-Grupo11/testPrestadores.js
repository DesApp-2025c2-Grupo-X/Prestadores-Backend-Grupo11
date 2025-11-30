const {Prestador} = require('./db/models');
const { notify } = require('./routes/auth.route');


async function crearPrestadores() {
    await Prestador.bulkCreate([
        { username: "dr alejandro ruiz", password: "12345", role: "medico", especialidades: ["cardiologia"], centroId: 5 },
        { username: "dr cecilia lopez", password: "6789", role: "medico", especialidades: ["clinica"], centroId: 5 },
        { username: "dr pablo martinez", password: "2222", role: "medico" ,especialidades: ["pediatria"] , centroId: null },
        { username: "dr julia fernandez", password: "3333", role: "medico" ,especialidades: ["traumatologia"] , centroId: null },
        { username: "clinica santa maria", password: "5555", role: "centro_medico", especialidades: ["cardiologia", "clinica"], centroId: null }
    ]);
}

module.exports = {crearPrestadores};