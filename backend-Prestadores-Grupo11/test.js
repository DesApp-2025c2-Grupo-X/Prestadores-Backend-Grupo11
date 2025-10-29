const {Afiliado, Prestador, Integrante, Situacion, Turno, Solicitud} = require('./db/models');

async function crearAfiliados () {
    await Afiliado.bulkCreate([
        {
            apellido: "Perez",
            situaciones: [
                {fecha_inicio: "2024-03-05", especialidad: "Cardiologia",
                    observaciones: "Infarto agudo de miocardio. Se realizó angioplastia con colocación de stent en arteria coronaria izquierda. Evolución favorable con control posterior.",
                    estado: "alta",
                    fecha_final: "2024-03-18",
                    prestadorId: 1
                },
            ],
            turnos: [
                {
                    date: new Date(),
                    start: (() => {
                        const d = new Date();
                        d.setHours(9,0,0,0);
                        return d;
                    })(),
                    duration: 30,
                    especialidad: "cardiologia",
                    prestadorId: 1
                }
            ],
            integrantes: [
                {nombre: "Juan Perez", edad: 62, dni: "20114587",
                    situaciones: [
                        {fecha_inicio: "2025-10-21", especialidad: "Cardiologia",
                            observaciones: "Control postoperatorio tras angioplastia. Corazón compensado, sin signos de insuficiencia cardíaca.",
                            estado: "en proceso",
                            fecha_final: "2025-11-05",
                            prestadorId: 1
                        },
                    ],
                    turnos: [
                        {
                            date: new Date(),
                            start: (() => {
                                const d = new Date();
                                d.setHours(9,30,0,0);
                                return d;
                            })(),
                            duration: 60,
                            notes: "traer estudios previos",
                            especialidad: "dermatologia",
                            prestadorId: 1
                        }
                    ],
                },
                {nombre: "Maria Perez", edad: 48, dni: "25500991"},
                {nombre: "Luciano Perez", edad: 34, dni: "33012455"},
                {nombre: "Sofia Perez", edad: 28, dni: "40221543"},
                {nombre: "Carlos Perez", edad: 53, dni: "26099123"}
            ]
        },
        {
            apellido: "Lopez",
            situaciones: [
                {fecha_inicio: "2023-09-10", especialidad: "Clínica Médica",
                    observaciones: "Pico de hipertensión arterial con mareos y cefalea intensa. Se ajustó medicación antihipertensiva y se indicó dieta baja en sodio.",
                    estado: "alta",
                    fecha_final: "2023-09-20",
                    prestadorId: 2
                }
            ],
            turnos: [
                {
                    date: (() => {
                        const d = new Date();
                        d.setHours(24,0,0,0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setHours(11,0,0,0);
                        return d;
                    })(),
                    duration: 30,
                    especialidad: "neurologia",
                    prestadorId: 2
                }
            ],
            integrantes: [
                {nombre: "Ana Lopez", edad: 40, dni: "29544100"},
                {nombre: "Matias Lopez", edad: 18, dni: "46001122"},
                {nombre: "Pedro Lopez", edad: 67, dni: "19007458",
                    situaciones: [
                        {fecha_inicio: "2024-03-06", especialidad: "Clínica Médica",
                            observaciones: "Evaluación inicial realizada por el equipo de Clínica Santa María. Plan de ejercicios asignado.",
                            estado: "en proceso",
                            fecha_final: "2024-04-20",
                            prestadorId: 2
                        }
                    ]
                },
                {nombre: "Lucía Lopez", edad: 23, dni: "44112090"},
                {nombre: "Tomas Lopez", edad: 9, dni: "52344912"}
            ]
        }
    ],{
        include: [
            { model: Situacion, as: 'situaciones' },
            { model: Integrante, as: 'integrantes', include: [{ model: Situacion, as: 'situaciones' }], 
            include: [{model: Turno, as: 'turnos'}] },
            { model: Turno, as: 'turnos'}
        ]
})
}

async function crearPrestadores() {
    await Prestador.bulkCreate([
        {username: "dr alejandro ruiz", password: "12345", role: "medico",},
        {username: "dr cecilia lopez", password: "6789", role: "medico"},
        {username: "clinica santa maria", password: "5555", role: "centro_medico"}
    ])
}

async function crearSolicitudes() {
    await Solicitud.bulkCreate([
{
      descripcion: 'reintegro',
      estado: 'pendiente',
      fechaSolicitud: '2025-10-25',
      prestadorId: 1
    },
    {
      descripcion: 'autorización',
      estado: 'observada',
      fechaSolicitud: '2025-10-24',
      prestadorId: 1
    },
    {
      descripcion: 'receta',
      estado: 'en análisis',
      fechaSolicitud: '2025-10-23',
      prestadorId: 2
    },
    {
      descripcion: 'reintegro',
      estado: 'aprobada',
      fechaSolicitud: '2025-10-22',
      fechaProcesada: '2025-10-24',
      prestadorId: 2
    },
    {
      descripcion: 'autorización',
      estado: 'rechazada',
      fechaSolicitud: '2025-10-21',
      fechaProcesada: '2025-10-23',
      prestadorId: 1
    }
  ]);
}

module.exports = {crearAfiliados, crearPrestadores, crearSolicitudes};