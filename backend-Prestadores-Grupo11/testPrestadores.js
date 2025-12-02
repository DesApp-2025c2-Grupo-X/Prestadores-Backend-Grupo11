const { Prestador } = require('./db/models');
const { notify } = require('./routes/auth.route');


async function crearPrestadores() {
    await Prestador.bulkCreate([
        { username: "dr alejandro ruiz", password: "12345", role: "medico", especialidades: ["cardiologia"], centroId: 5 },
        { username: "dr cecilia lopez", password: "6789", role: "medico", especialidades: ["clinica"], centroId: 5 },
        { username: "Centro Médico Los Robles", password: "2222", role: "centro_medico", especialidades: [], centroId: null },
        { username: "Clínica Nuestra Señora del Pilar", password: "3333", role: "centro_medico", especialidades: [], centroId: null },
        { username: "clinica santa maria", password: "5555", role: "centro_medico", especialidades: [], centroId: null },
        { username: "dr marcelo aguirre", password: "1111", role: "medico", especialidades: ["clinica"], centroId: 3 },
        { username: "dra veronica salinas", password: "1112", role: "medico", especialidades: ["pediatria"], centroId: 3 },
        { username: "dr julio romero", password: "1113", role: "medico", especialidades: ["traumatologia"], centroId: 3 },
        { username: "dra lorena torres", password: "1114", role: "medico", especialidades: ["cardiologia"], centroId: 3 },
        { username: "dr adrian castro", password: "1115", role: "medico", especialidades: ["clinica"], centroId: 3 },
        { username: "dr nicolas sosa", password: "1116", role: "medico", especialidades: ["dermatologia"], centroId: 3 },
        { username: "dra monica vera", password: "1117", role: "medico", especialidades: ["ginecologia"], centroId: 3 },
        { username: "dr leonel quiroga", password: "1118", role: "medico", especialidades: ["neurologia"], centroId: 3 },
        { username: "dra paula mendes", password: "1119", role: "medico", especialidades: ["clinica"], centroId: 3 },
        { username: "dr gustavo rios", password: "1120", role: "medico", especialidades: ["pediatria"], centroId: 3 },
        { username: "dr enrique godoy", password: "1211", role: "medico", especialidades: ["pediatria"], centroId: 4 },
        { username: "dra natalia peralta", password: "1212", role: "medico", especialidades: ["clinica"], centroId: 4 },
        { username: "dr walter morales", password: "1213", role: "medico", especialidades: ["cardiologia"], centroId: 4 },
        { username: "dra jimena farías", password: "1214", role: "medico", especialidades: ["dermatologia"], centroId: 4 },
        { username: "dr sergio mendieta", password: "1215", role: "medico", especialidades: ["traumatologia"], centroId: 4 },
        { username: "dr federico luna", password: "1216", role: "medico", especialidades: ["neurologia"], centroId: 4 },
        { username: "dra sofia garay", password: "1217", role: "medico", especialidades: ["ginecologia"], centroId: 4 },
        { username: "dr martin saavedra", password: "1218", role: "medico", especialidades: ["clinica"], centroId: 4 },
        { username: "dra clara montiel", password: "1219", role: "medico", especialidades: ["cardiologia"], centroId: 4 },
        { username: "dr diego paz", password: "1220", role: "medico", especialidades: ["pediatria"], centroId: 4 },
        { username: "dr omar villalba", password: "1311", role: "medico", especialidades: ["traumatologia"], centroId: 5 },
        { username: "dra micaela jara", password: "1314", role: "medico", especialidades: ["dermatologia"], centroId: 5 },
        { username: "dr bruno esteban", password: "1315", role: "medico", especialidades: ["cardiologia"], centroId: 5 },
        { username: "dra mariana perez", password: "1316", role: "medico", especialidades: ["pediatria"], centroId: 5 },
        { username: "dr alexis luna", password: "1317", role: "medico", especialidades: ["clinica"], centroId: 5 },
        { username: "dra daniela correa", password: "1318", role: "medico", especialidades: ["ginecologia"], centroId: 5 },
        { username: "dr leandro bustos", password: "1319", role: "medico", especialidades: ["traumatologia"], centroId: 5 },
        { username: "dra florencia diaz", password: "1320", role: "medico", especialidades: ["cardiologia"], centroId: 5 },

    ]);

    const centros = await Prestador.findAll({ where: { role: "centro_medico" } });
    //Para cada centro, juntar especialidades de sus médicos
    for (const centro of centros) {
        const medicos = await Prestador.findAll({
            where: { centroId: centro.id }
        });

        const especialidadesCentro = [
            ...new Set(
                medicos.flatMap(m => m.especialidades || [])
            )
        ];

        await centro.update({ especialidades: especialidadesCentro });
    }
}

module.exports = { crearPrestadores };