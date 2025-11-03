const {Afiliado, Prestador, Integrante, Situacion, Turno, Autorizacion, Reintegro} = require('./db/models');

async function crearAfiliados () {
    await Afiliado.bulkCreate([
        {
            nombre: "Roberto",
            apellido: "Perez",
            numero_afiliado: "IOMA-00111222",
            dni: "30456789",
            edad: 50,
            telefono: "+54 9 11 2345-6789",
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
            nombre: "María",
            apellido: "Lopez",
            numero_afiliado: 'OSDE-00012345',
            dni: '30456789',
            telefono: '+54 9 11 2345-6789',
            edad: 35,
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
        {username: "dr alejandro ruiz", password: "12345", role: "medico", especialidad: "cardiologia"},
        {username: "dr cecilia lopez", password: "6789", role: "medico", especialidad: "dermatologia"},
        {username: "clinica santa maria", password: "5555", role: "centro_medico"}
    ])
}

const crearAutorizaciones = async () => {
  await Autorizacion.bulkCreate([
    {
      fecha_prevista: new Date('2025-11-01'),
      integranteId: 1,
      medico: 'dr alejandro ruiz',
      especialidad: 'cardiología',
      lugar: 'Hospital Central',
      dias_internacion: 2,
      observaciones: 'Chequeo prequirúrgico'
    },
    {
      fecha_prevista: new Date('2025-11-03'),
      integranteId: 2,
      medico: 'dr cecilia lopez',
      especialidad: 'dermatología',
      lugar: 'Consultorio Norte',
      dias_internacion: 0,
      observaciones: 'Control de lunares'
    },
    {
      fecha_prevista: new Date('2025-11-05'),
      integranteId: 3,
      medico: 'clinica santa maria',
      especialidad: 'pediatría',
      lugar: 'Clínica Santa María',
      dias_internacion: 1,
      observaciones: 'Fiebre persistente'
    },
    {
      fecha_prevista: new Date('2025-11-06'),
      integranteId: 4,
      medico: 'dr alejandro ruiz',
      especialidad: 'cardiología',
      lugar: 'Hospital Central',
      dias_internacion: 3,
      observaciones: 'Lesión de rodilla'
    },
    {
      fecha_prevista: new Date('2025-11-07'),
      integranteId: 5,
      medico: 'dr cecilia lopez',
      especialidad: 'dermatología',
      lugar: 'Consultorio Norte',
      dias_internacion: 0,
      observaciones: 'Controles anuales'
    },
    {
      fecha_prevista: new Date('2025-11-08'),
      integranteId: 6,
      medico: 'clinica santa maria',
      especialidad: 'oftalmología',
      lugar: 'Clínica Santa María',
      dias_internacion: 0,
      observaciones: 'Estudio de agudeza visual'
    },
    {
      fecha_prevista: new Date('2025-11-09'),
      integranteId: 7,
      medico: 'dr alejandro ruiz',
      especialidad: 'cardiología',
      lugar: 'Hospital Central',
      dias_internacion: 2,
      observaciones: 'Migrañas frecuentes'
    },
    {
      fecha_prevista: new Date('2025-11-10'),
      integranteId: 8,
      medico: 'dr cecilia lopez',
      especialidad: 'dermatología',
      lugar: 'Consultorio Norte',
      dias_internacion: 0,
      observaciones: 'Reacción a alimentos'
    },
    {
      fecha_prevista: new Date('2025-11-11'),
      integranteId: 9,
      medico: 'clinica santa maria',
      especialidad: 'neumonología',
      lugar: 'Clínica Santa María',
      dias_internacion: 1,
      observaciones: 'Asma leve'
    },
    {
      fecha_prevista: new Date('2025-11-12'),
      integranteId: 10,
      medico: 'dr alejandro ruiz',
      especialidad: 'cardiología',
      lugar: 'Hospital Central',
      dias_internacion: 1,
      observaciones: 'Estudio de próstata'
    }
  ]);
};

const crearReintegros = async () => {
  await Reintegro.bulkCreate([
    {
      fecha_prestacion: '2025-10-15',
      integranteId: 1,
      medico: 'Dr. Alejandro Ruiz',
      especialidad: 'Cardiología',
      lugar: 'Hospital Central',
      factura_fecha: '2025-10-16',
      factura_cuit: '20-12345678-9',
      factura_valor: 85000.00,
      factura_persona: 'Juan Pérez',
      forma_pago: 'transferencia',
      cbu: '0000003100012345678901',
      observaciones: 'Angioplastia con stent coronario',
      estado: 'recibido',
    },
    {
      fecha_prestacion: '2025-10-20',
      integranteId: 2,
      medico: 'Dra. Cecilia López',
      especialidad: 'Dermatología',
      lugar: 'Clínica Santa María',
      factura_fecha: '2025-10-21',
      factura_cuit: '27-98765432-1',
      factura_valor: 45000.00,
      factura_persona: 'María Gómez',
      forma_pago: 'efectivo',
      observaciones: 'Control post hipertensión',
      estado: 'en analisis',
      usuarioUltimoCambio: 2
    },
    {
      fecha_prestacion: '2025-10-25',
      integranteId: 3,
      medico: 'Dr. Alejandro Ruiz',
      especialidad: 'Cardiología',
      lugar: 'Hospital Central',
      factura_fecha: '2025-10-26',
      factura_cuit: '23-11223344-5',
      factura_valor: 60000.00,
      factura_persona: 'Carlos Díaz',
      forma_pago: 'cheque',
      observaciones: 'Evaluación postoperatoria',
      estado: 'rechazado',
      motivo: 'Factura incompleta',
      fecha_finalizacion: new Date(),
      usuarioUltimoCambio: 1
    }
  ]);
}

module.exports = {crearAfiliados, crearPrestadores, crearAutorizaciones, crearReintegros};