const { Afiliado, Prestador, Integrante, Situacion, Turno, Autorizacion, Reintegro, Receta } = require('./db/models');

async function crearAfiliados() {
    await Afiliado.bulkCreate([
        {
            nombre: "Roberto",
            apellido: "Perez",
            numero_afiliado: "IOMA-00111222",
            dni: "30456789",
            edad: 50,
            telefono: "+54 9 11 2345-6789",
            situaciones: [
                {
                    fecha_inicio: "2024-03-05", especialidad: "Cardiologia",
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
                        d.setHours(9, 0, 0, 0);
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
            dni: '30456790',
            telefono: '+54 9 11 2345-6789',
            edad: 35,
            situaciones: [
                {
                    fecha_inicio: "2023-09-10", especialidad: "Clínica Médica",
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
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setHours(11, 0, 0, 0);
                        return d;
                    })(),
                    duration: 30,
                    prestadorId: 2
                }
            ],
        }
    ], {
        include: [
            { model: Situacion, as: 'situaciones' },
            { model: Turno, as: 'turnos' }
        ]
    })
}

async function crearAfiliadosExtra() {
  await Afiliado.bulkCreate([
    {
      nombre: "Carlos",
      apellido: "Gonzalez",
      numero_afiliado: "OSDE-00055678",
      dni: "28999888",
      edad: 45,
      telefono: "+54 9 11 3311-4455",
      situaciones: [
        {
          fecha_inicio: "2025-03-15",
          especialidad: "Traumatología",
          fecha_final: "2025-04-15",
          observaciones: "Luxación de hombro derecho. Se realizó reducción y fisioterapia.",
          estado: "en proceso",
          prestadorId: 3
        },
      ],
      turnos: [
        {
          date: new Date("2025-11-10"),
          start: (() => {
            const d = new Date("2025-11-10T10:30:00");
            return d;
          })(),
          duration: 45,
          prestadorId: 3,
        }
      ],
    },
    {
      nombre: "Luciana",
      apellido: "Martinez",
      numero_afiliado: "IOMA-00222555",
      dni: "33222444",
      edad: 39,
      telefono: "+54 9 11 5566-7788",
      situaciones: [
        {
          fecha_inicio: "2025-07-02",
          fecha_final: "2025-08-10",
          especialidad: "Ginecología",
          observaciones: "Chequeo anual con papanicolau y ecografía transvaginal.",
          estado: "alta",
          fecha_final: "2025-07-03",
          prestadorId: 2,
        },
      ],
    },
    {
      nombre: "Javier",
      apellido: "Sosa",
      numero_afiliado: "OSDE-00077799",
      dni: "27444555",
      edad: 58,
      telefono: "+54 9 11 4444-9911",
      situaciones: [
        {
          fecha_inicio: "2025-04-20",
          fecha_final: "2025-08-16",
          especialidad: "Endocrinología",
          observaciones: "Control de diabetes tipo II. Ajuste de dosis de insulina.",
          estado: "en proceso",
          prestadorId: 1,
        },
      ],
      turnos: [
        {
          date: new Date("2025-11-15"),
          start: (() => {
            const d = new Date("2025-11-15T09:00:00");
            return d;
          })(),
          duration: 30,
          prestadorId: 1,
        }
      ]
    },
  ], {
    include: [
      { model: Situacion, as: 'situaciones' },
      { model: Turno, as: 'turnos' }
    ]
  });
}


async function crearIntegrantes() {
    await Integrante.bulkCreate([
        {
            nombre: 'Juan Perez', edad: 62, dni: '20114587', afiliadoId: 1,
            situaciones: [
                {
                    fecha_inicio: "2024-06-12",
                    especialidad: "Neurología",
                    observaciones: "Accidente cerebrovascular isquémico. Se inició tratamiento anticoagulante y rehabilitación motora. Paciente estable.",
                    estado: "en proceso",
                    fecha_final: "2024-07-01",
                    prestadorId: 1
                },
                {
                    fecha_inicio: "2023-08-10",
                    especialidad: "Cirugia plastica",
                    observaciones: "Transplante de piel.",
                    estado: "baja",
                    fecha_final: "2024-07-11",
                    prestadorId: 1
                }
            ],
            turnos: [
                {
                    date: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() - 10); // diez dias antes
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() - 20)
                        d.setHours(9, 30, 0, 0);
                        return d;
                    })(),
                    duration: 45,
                    descripción: "El paciente viene a hacerse un control luego de su cirugia",
                    prestadorId: 2,
                    notes: "El paciente esta teniendo una buena recuperacion."
                },
                {
                    date: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() - 2); // dos dias antes
                        d.setHours(24, 0, 0, 0);
                        return d;
                    })(),
                    start: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() - 20)
                        d.setHours(9, 30, 0, 0);
                        return d;
                    })(),
                    duration: 60,
                    descripción: "El paciente viene a hacerse una revisacion medica",
                    prestadorId: 2,
                    notes: "Me ha indicado que le esta empezando a doler donde tuvo la cirugia."
                }
            ]
        },
        { nombre: 'Maria Perez', edad: 48, dni: '25500991', afiliadoId: 1 },
        {
            nombre: 'Luciano Perez', edad: 34, dni: '33012455', afiliadoId: 1,
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
        {
            nombre: 'Sofia Perez', edad: 28, dni: '40221543', afiliadoId: 1,
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
        { nombre: 'Carlos Perez', edad: 53, dni: '26099123', afiliadoId: 1 },
        {
            nombre: 'Ana Lopez', edad: 40, dni: '29544100', afiliadoId: 2,
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
        {
            nombre: 'Matias Lopez', edad: 18, dni: '46001122', afiliadoId: 2,
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
        {
            nombre: 'Pedro Lopez', edad: 67, dni: '19007458', afiliadoId: 2,
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
        { nombre: 'Lucía Lopez', edad: 23, dni: '44112090', afiliadoId: 2 },
        { nombre: 'Tomas Lopez', edad: 9, dni: '52344912', afiliadoId: 2 },
    ], { include: [{ model: Situacion, as: 'situaciones' }, { model: Turno, as: 'turnos' }] })
}

async function crearIntegrantesExtra() {
  await Integrante.bulkCreate([
    {
      nombre: "Paula Gonzalez",
      edad: 19,
      dni: "45322199",
      afiliadoId: 3,
      situaciones: [
        {
          fecha_inicio: "2025-02-11",
          especialidad: "Otorrinolaringología",
          observaciones: "Amigdalitis bacteriana. Tratamiento antibiótico.",
          estado: "alta",
          fecha_final: "2025-02-20",
          prestadorId: 3
        }
      ]
    },
    {
      nombre: "Martín Sosa",
      edad: 30,
      dni: "39221133",
      afiliadoId: 5,
      turnos: [
        {
          date: new Date("2025-11-18"),
          start: new Date("2025-11-18T15:00:00"),
          duration: 30,
          prestadorId: 1
        }
      ]
    },
    {
      nombre: "Laura Martinez",
      edad: 41,
      dni: "31555599",
      afiliadoId: 4,
      situaciones: [
        {
          fecha_inicio: "2025-06-10",
          especialidad: "Clínica Médica",
          observaciones: "Resfrío común tratado con reposo e hidratación.",
          estado: "alta",
          fecha_final: "2025-06-15",
          prestadorId: 2
        }
      ]
    },
  ], { include: [{ model: Situacion, as: 'situaciones' }, { model: Turno, as: 'turnos' }] });
}


async function crearPrestadores() {
    await Prestador.bulkCreate([
        { username: "dr alejandro ruiz", password: "12345", role: "medico", especialidad: "cardiologia" },
        { username: "dr cecilia lopez", password: "6789", role: "medico", especialidad: "dermatologia" },
        { username: "clinica santa maria", password: "5555", role: "centro_medico" }
    ])
}

async function crearPrestadoresExtra() {
  await Prestador.bulkCreate([
    { username: "dr lucas fernandez", password: "9999", role: "medico", especialidad: "traumatología" },
    { username: "centro diagnostico belgrano", password: "2222", role: "centro_medico" },
  ]);
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

async function crearAutorizacionesExtra() {
  await Autorizacion.bulkCreate([
    {
      fecha_prevista: new Date("2025-11-13"),
      integranteId: 2,
      medico: "dr lucas fernandez",
      especialidad: "traumatología",
      lugar: "Centro Diagnóstico Belgrano",
      dias_internacion: 1,
      observaciones: "Radiografía y control post operatorio",
    },
    {
      fecha_prevista: new Date("2025-11-14"),
      integranteId: 3,
      medico: "dr alejandro ruiz",
      especialidad: "cardiología",
      lugar: "Hospital Central",
      dias_internacion: 0,
      observaciones: "Electrocardiograma de rutina",
    },
  ]);
}


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

async function crearReintegrosExtra() {
  await Reintegro.bulkCreate([
    {
      fecha_prestacion: "2025-10-28",
      integranteId: 6,
      medico: "dr lucas fernandez",
      especialidad: "traumatología",
      lugar: "Hospital Central",
      factura_fecha: "2025-10-29",
      factura_cuit: "20-11223344-8",
      factura_valor: 72000.00,
      factura_persona: "Carlos Gonzalez",
      forma_pago: "transferencia",
      observaciones: "Tratamiento de fisioterapia",
      estado: "en analisis",
      usuarioUltimoCambio: 4
    },
    {
      fecha_prestacion: "2025-10-30",
      integranteId: 7,
      medico: "dr cecilia lopez",
      especialidad: "dermatología",
      lugar: "Consultorio Norte",
      factura_fecha: "2025-10-30",
      factura_cuit: "27-55443322-9",
      factura_valor: 32000.00,
      factura_persona: "Luciana Martinez",
      forma_pago: "efectivo",
      observaciones: "Tratamiento de acné",
      estado: "aprobado",
      fecha_finalizacion: new Date(),
      usuarioUltimoCambio: 2
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

async function crearRecetasExtra() {
  await Receta.bulkCreate([
    {
      integranteId: 8,
      medicamento: "Metformina",
      cantidad: 30,
      presentacion: "tabletas",
      observaciones: "Una cada 12 horas",
      estado: "recibido"
    },
    {
      integranteId: 9,
      medicamento: "Loratadina",
      cantidad: 10,
      presentacion: "blister",
      observaciones: "1 por día durante 10 días",
      estado: "en analisis",
      usuarioUltimoCambio: 2,
      prestadorAnalisisId: 1
    },
    {
      integranteId: 10,
      medicamento: "Omeprazol",
      cantidad: 14,
      presentacion: "cápsulas",
      observaciones: "Tomar en ayunas",
      estado: "rechazado",
      motivo: "Prescripción duplicada",
      fecha_finalizacion: new Date(),
      usuarioUltimoCambio: 3
    }
  ]);
}


module.exports = { crearAfiliados, crearAfiliadosExtra, crearPrestadores, crearPrestadoresExtra, crearAutorizaciones,
    crearAutorizacionesExtra, crearReintegros, crearReintegrosExtra, crearRecetas, crearRecetasExtra, crearIntegrantesExtra,
     crearIntegrantes };
