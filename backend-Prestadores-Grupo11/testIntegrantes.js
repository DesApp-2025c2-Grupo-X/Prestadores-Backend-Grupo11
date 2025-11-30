const {Integrante} = require('./db/models');
const { notify } = require('./routes/auth.route');


async function crearIntegrantes() {
    await Integrante.bulkCreate([
        {nombre: 'Juan Perez', edad: 62, dni: '20114587', afiliadoId: 1},
        {nombre: 'Maria Perez', edad: 48, dni: '25500991', afiliadoId: 1},
        {nombre: 'Luciano Perez', edad: 34, dni: '33012455', afiliadoId: 1},
        {nombre: 'Sofia Perez', edad: 28, dni: '40221543', afiliadoId: 1},
        {nombre: 'Carlos Perez', edad: 53, dni: '26099123', afiliadoId: 1},
        {nombre: 'Ana Lopez', edad: 40, dni: '29544100', afiliadoId: 2},
        {nombre: 'Matias Lopez', edad: 18, dni: '46001122', afiliadoId: 2},
        {nombre: 'Pedro Lopez', edad: 67, dni: '19007458', afiliadoId: 2},
        {nombre: 'Lucía Lopez', edad: 23, dni: '44112090', afiliadoId: 2},
        {nombre: 'Tomas Lopez', edad: 9, dni: '52344912', afiliadoId: 2},
    ])
}

module.exports = {crearIntegrantes};
