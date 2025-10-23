const {Afiliado, Prestador, Integrante, Situacion} = require('./db/models');

async function crearAfiliados () {
    await Afiliado.bulkCreate([
        {
            apellido: "Perez",
            integrantes: [
                {nombre: "Juan Perez", edad: 62, dni: "20114587"},
                {nombre: "Maria Perez", edad: 48, dni: "25500991"},
                {nombre: "Luciano Perez", edad: 34, dni: "33012455"},
                {nombre: "Sofia Perez", edad: 28, dni: "40221543"},
                {nombre: "Carlos Perez", edad: 53, dni: "26099123"}
            ]
        },
        {
            apellido: "Lopez",
            integrantes: [
                {nombre: "Ana Lopez", edad: 40, dni: "29544100"},
                {nombre: "Matias Lopez", edad: 18, dni: "46001122"},
                {nombre: "Pedro Lopez", edad: 67, dni: "19007458"},
                {nombre: "Lucía Lopez", edad: 23, dni: "44112090"},
                {nombre: "Tomas Lopez", edad: 9, dni: "52344912"}
            ]
        }
    ], { include: [{ model: Integrante, as: 'integrantes' }]});
}

async function crearPrestadores() {
    await Prestador.bulkCreate([
        {username: "Dr Alejandro Ruiz", password: 12345, role: "Medico",
            situaciones: [
                {fecha_inicio: "2024-03-05", especialidad: "Cardiologia",
                    observaciones: "Infarto agudo de miocardio. Se realizó angioplastia con colocación de stent en arteria coronaria izquierda. Evolución favorable con control posterior.",
                    estado: "finalizada",
                    fecha_final: "2024-03-18",
                    integranteId: 1
                },
                {fecha_inicio: "2025-10-21", especialidad: "Cardiologia",
                    observaciones: "Control postoperatorio tras angioplastia. Corazón compensado, sin signos de insuficiencia cardíaca.",
                    estado: "en proceso",
                    fecha_final: "2025-11-05",
                    integranteId: 2
                },
            ]
        },
        {username: "Dr Cecilia Lopez", password: 6789, role: "Medico",
            situaciones: [
                {fecha_inicio: "2023-09-10", especialidad: "Clínica Médica",
                    observaciones: "Pico de hipertensión arterial con mareos y cefalea intensa. Se ajustó medicación antihipertensiva y se indicó dieta baja en sodio.",
                    estado: "finalizada",
                    fecha_final: "2023-09-20",
                    integranteId: 3
                }
            ]
        }
    ],{ include: [{ model: Situacion, as: 'situaciones' }]})
}

module.exports = {crearAfiliados, crearPrestadores};