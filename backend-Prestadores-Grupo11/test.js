const {Afiliado, Prestador, Integrante, Situacion, Turno, Autorizacion, Reintegro, Receta} = require('./db/models');

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
        }
    ],{
        include: [
            { model: Situacion, as: 'situaciones' },
            { model: Turno, as: 'turnos'}
        ]
})
}

async function crearIntegrantes() {
    await Integrante.bulkCreate([
        {nombre: 'Juan Perez', edad: 62, dni: '20114587', afiliadoId: 1,
            situaciones: [
                {
                    fecha_inicio: "2024-06-12",
                    especialidad: "Neurología",
                    observaciones: "Accidente cerebrovascular isquémico. Se inició tratamiento anticoagulante y rehabilitación motora. Paciente estable.",
                    estado: "en proceso",
                    fecha_final: "2024-07-01",
                    prestadorId: 1
                }
            ],
            turnos: [
                {
                    date: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 2); // pasado mañana
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setHours(9, 30, 0, 0);
                        return d;
                    })(),
                    duration: 45,
                    prestadorId: 1
  }
            ]
        },
        {nombre: 'Maria Perez', edad: 48, dni: '25500991', afiliadoId: 1},
        {nombre: 'Luciano Perez', edad: 34, dni: '33012455', afiliadoId: 1,
            turnos: [
                {
                    date: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setHours(14, 0, 0, 0);
                        return d;
                    })(),
                    duration: 60,
                    prestadorId: 1
                }
            ]
        },
        {nombre: 'Sofia Perez', edad: 28, dni: '40221543', afiliadoId: 1, 
            situaciones: [
                {
                    fecha_inicio: "2024-08-20",
                    especialidad: "Ortopedia",
                    observaciones: "Fractura de fémur derecho. Se realizó reducción quirúrgica con colocación de clavo intramedular. Evolución favorable.",
                    estado: "alta",
                    fecha_final: "2024-09-05",
                    prestadorId: 1
                }
            ]
        },
        {nombre: 'Carlos Perez', edad: 53, dni: '26099123', afiliadoId: 1},
        {nombre: 'Ana Lopez', edad: 40, dni: '29544100', afiliadoId: 2, 
            situaciones: [
                {
                    fecha_inicio: "2024-11-10",
                    especialidad: "Pediatría",
                    observaciones: "Infección respiratoria aguda. Se indicó antibiótico y seguimiento ambulatorio. Paciente presenta buena recuperación.",
                    estado: "en proceso",
                    fecha_final: "2024-11-20",
                    prestadorId: 2
                }
            ],
            turnos: [
                {
                    date: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 5);
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setHours(16, 30, 0, 0);
                        return d;
                    })(),
                    duration: 30,
                    prestadorId: 2
                }
            ]
        },
        {nombre: 'Matias Lopez', edad: 18, dni: '46001122', afiliadoId: 2, 
            turnos: [
                {
                    date: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        d.setHours(16, 30, 0, 0);
                        return d;
                    })(),
                    duration: 45,
                    prestadorId: 2
                }
            ]
        },
        {nombre: 'Pedro Lopez', edad: 67, dni: '19007458', afiliadoId: 2,
            situaciones: [
                {
                    fecha_inicio: "2025-01-15",
                    especialidad: "Gastroenterología",
                    observaciones: "Úlcera gástrica tratada con medicación y seguimiento endoscópico. Evolución favorable, sin complicaciones.",
                    estado: "en proceso",
                    fecha_final: "2025-02-01",
                    prestadorId: 2
                }
            ]
        },
        {nombre: 'Lucía Lopez', edad: 23, dni: '44112090', afiliadoId: 2},
        {nombre: 'Tomas Lopez', edad: 9, dni: '52344912', afiliadoId: 2},
    ], {include: [{ model: Situacion, as: 'situaciones' }, {model: Turno, as: 'turnos'}]})
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

const crearRecetas = async () => {
  await Receta.bulkCreate([
    {
      integranteId: 1,
      medicamento: 'Ibuprofeno',
      cantidad: 20,
      presentacion: 'capsulas',
      observaciones: 'Tomar cada 8 horas después de las comidas',
      estado: 'recibido'
    },
    {
      integranteId: 2,
      medicamento: 'Amoxicilina',
      cantidad: 10,
      presentacion: 'blister',
      observaciones: 'Completar tratamiento por 7 días',
      estado: 'en analisis',
      usuarioUltimoCambio: 2,
      prestadorAnalisisId: 2
    },
    {
      integranteId: 3,
      medicamento: 'Paracetamol',
      cantidad: 15,
      presentacion: 'pastillas',
      observaciones: 'Solo en caso de fiebre mayor a 38°C',
      estado: 'rechazado',
      motivo: 'Dosis no justificada por diagnóstico',
      fecha_finalizacion: new Date(),
      usuarioUltimoCambio: 1,
      prestadorAnalisisId: 1
    }
  ]);
};


module.exports = {crearAfiliados, crearPrestadores, crearAutorizaciones, crearReintegros, crearRecetas, crearIntegrantes};
