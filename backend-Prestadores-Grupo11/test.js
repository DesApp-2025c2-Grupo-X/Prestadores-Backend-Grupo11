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
                }
            ],
            turnos: [
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
                    duration: 45,
                    descripción: "El paciente viene a hacerse un control luego de su cirujia de corazon",
                    prestadorId: 1
                },
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
                    duration: 60,
                    descripción: "El paciente viene a hacerse una revisacion medica",
                    prestadorId: 2
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

async function crearPrestadores() {
    await Prestador.bulkCreate([
        { username: "dr alejandro ruiz", password: "12345", role: "medico", especialidad: "cardiologia" },
        { username: "dr cecilia lopez", password: "6789", role: "medico", especialidad: "dermatologia" },
        { username: "clinica santa maria", password: "5555", role: "centro_medico" }
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
            observaciones: 'Chequeo prequirúrgico',
            estado:'en analisis',
            usuarioUltimoCambio: 3
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
            fecha_prevista: new Date('2025-01-03'),
            integranteId: 2,
            medico: 'dr cecilia lopez',
            especialidad: 'dermatología',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones:'Biopsia de lesión cutánea sospechosa en antebrazo izquierdo'
        },

        {
            fecha_prevista: new Date('2025-11-05'),
            integranteId: 3,
            medico: 'clinica santa maria',
            especialidad: 'Medico Clinico',
            lugar: 'Clínica Santa María',
            dias_internacion: 1,
            observaciones: 'Fiebre persistente',
            estado:'observado',
            motivo:'Falta resultado de análisis de sangre',
            usuarioUltimoCambio:2
        },

        {
            fecha_prevista: new Date('2025-11-06'),
            integranteId: 4,
            medico: 'dr alejandro ruiz',
            especialidad: 'cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 3,
            observaciones: 'Infarto agudo de miocardio con necesidad de colocación de stent coronario izquierdo',
            estado: 'aprobado',    
            usuarioUltimoCambio: 3           
        },
        {
            fecha_prevista: new Date('2025-11-07'),
            integranteId: 5,
            medico: 'dr cecilia lopez',
            especialidad: 'dermatología',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones: 'Controles anuales',
            estado: 'rechazado',
            motivo: 'No paso un año desde el último control',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: new Date('2025-11-08'),
            integranteId: 6,
            medico: 'clinica santa maria',
            especialidad: 'oftalmología',
            lugar: 'Clínica Santa María',
            dias_internacion: 0,
            observaciones: 'Estudio de agudeza visual',
            estado:'observado',
            motivo: 'Se aplicó corticoide y luego 2hs de reposo ya se puede dar el alta',
            usuarioUltimoCambio: 1,    
        },
        {
            fecha_prevista: new Date('2025-11-09'),
            integranteId: 7,
            medico: 'dr alejandro ruiz',
            especialidad: 'cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 2,
            observaciones: 'Insuficencia cardiaca',
            estado:'aprobado',
            usuarioUltimoCambio:1
        },
        {
            fecha_prevista: new Date('2025-11-10'),
            integranteId: 8,
            medico: 'dr cecilia lopez',
            especialidad: 'dermatología',
            lugar: 'Consultorio Norte',
            dias_internacion: 1,
            observaciones: 'Reacción a alimentos',
            estado: 'rechazado',
            motivo: 'Se aplicó corticoide y luego 2hs de reposo ya se puede dar el alta',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: new Date('2025-11-11'),
            integranteId: 9,
            medico: 'clinica santa maria',
            especialidad: 'neumonología',
            lugar: 'Clínica Santa María',
            dias_internacion: 1,
            observaciones: 'Asma leve',
            estado: 'rechazado',
            motivo: 'Se aplicó inyección y luego de 2hs de control en guardia, ya se puede dar el alta',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: new Date('2025-11-12'),
            integranteId: 10,
            medico: 'dr alejandro ruiz',
            especialidad: 'cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Hipertensión arterial severa'
        },
        {
            fecha_prevista: new Date('2025-12-28'),
            integranteId: 10,
            medico: 'dr alejandro ruiz',
            especialidad: 'cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Arritmia ventricular con necesidad de Holter',
            estado:'en analisis',
            usuarioUltimoCambio:1
        },
        {
            fecha_prevista: new Date('2025-11-10'),
            integranteId: 9,
            medico: 'dr cecilia lopez',
            especialidad: 'dermatología',
            lugar: 'Consultorio Norte',
            dias_internacion: 1,
            observaciones: 'Nuevo melanocítico con bordes irregulares en espalda',
            estado: 'observado',
            motivo: 'Falta biopsia',
            usuarioUltimoCambio: 2
        },

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
            factura_persona: 'María Perez',
            forma_pago: 'efectivo',
            observaciones: 'Control post biopsia',
            estado: 'en analisis',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prestacion: '2025-10-25',
            integranteId: 3,
            medico: 'Clinica Santa Maria',
            especialidad: 'Gastroenterología',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-26',
            factura_cuit: '23-11223344-5',
            factura_valor: 60000.00,
            factura_persona: 'Luciano Perez',
            forma_pago: 'cheque',
            observaciones: 'Evaluación postoperatoria',
            estado: 'rechazado',
            motivo: 'Factura incompleta',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 1
        },
        {   fecha_prestacion: '2025-10-18',
            integranteId: 2,
            medico: 'Dra. Cecilia López',
            especialidad: 'Dermatología',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-19',
            factura_cuit: '20-12345678-9',
            factura_valor: 72000.00,
            factura_persona: 'Maria Perez',
            forma_pago: 'efectivo',
            cbu: null,
            observaciones: 'Crioterapia por verrugas',
            estado: 'en analisis',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prestacion: '2025-10-20',
            integranteId: 3,
            medico: 'Dr. Alejandro Ruiz',
            especialidad: 'Cardiología',
            lugar: 'Clínica del Corazón',
            factura_fecha: '2025-10-21',
            factura_cuit: '23-11223344-5',
            factura_valor: 95000.00,
            factura_persona: 'Luciano Perez',
            forma_pago: 'cheque',
            cbu: null,
            observaciones: 'Holter 24 hs por arritmia ventricular',
            estado: 'en analisis',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prestacion: '2025-10-22',
            integranteId: 4,
            medico: 'clinica santa maria',
            especialidad: 'Traumatología',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-23',
            factura_cuit: '20-12345678-9',
            factura_valor: 68000.00,
            factura_persona: 'Sofia Perez',
            forma_pago: 'transferencia',
            cbu: '0000003100098765432101',
            observaciones: 'Colocación de yeso en muñeca izquierda por fractura ',
            estado: 'observado',
            motivo: 'Falta radiografía',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prestacion: '2025-10-24',
            integranteId: 5,
            medico: 'Clinica Santa Maria',
            especialidad: 'Traumatología',
            lugar: 'Clínica Santa María',
            factura_fecha: '2025-10-25',
            factura_cuit: '27-98765432-1',
            factura_valor: 54000.00,
            factura_persona: 'Carlos Perez',
            forma_pago: 'efectivo',
            cbu: null,
            observaciones: 'Resonancia magnética de rodilla derecha',
            estado: 'observado',
            motivo: 'Falta firma del profesional',
            usuarioUltimoCambio: 3
        },
        {
            fecha_prestacion: '2025-10-26',
            integranteId: 6,
            medico: 'Dra. Cecilia López ',
            especialidad: 'Dermatología',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-27',
            factura_cuit: '20-12345678-9',
            factura_valor: 61000.00,
            factura_persona: 'Ana Perez',
            forma_pago: 'transferencia',
            cbu: '0000003100011122233344',
            observaciones: 'Prueba de alergia por sospecha de urticaria grave',
            estado: 'observado',
            motivo: 'Estudios adjuntos ilegibles',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prestacion: '2025-10-28',
            integranteId: 7,
            medico: 'Dr. Alejandro Ruiz',
            especialidad: 'Cardiología',
            lugar: 'Clínica del Corazón',
            factura_fecha: '2025-10-29',
            factura_cuit: '23-11223344-5',
            factura_valor: 88000.00,
            factura_persona: 'Matias Lopez',
            forma_pago: 'cheque',
            cbu: null,
            observaciones: 'Consulta por palpitaciones frecuentes',
            estado: 'rechazado',
            motivo: 'Factura vencida',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 2
        },
        {
            fecha_prestacion: '2025-10-30',
            integranteId: 8,
            medico: 'Dra. Cecilia López',
            especialidad: 'Dermatología',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-31',
            factura_cuit: '20-12345678-9',
            factura_valor: 70000.00,
            factura_persona: 'Pedro Lopez',
            forma_pago: 'transferencia',
            cbu: '0000003100099999888877',
            observaciones: 'Consulta dermatológica por acné inflamatorio',
            estado: 'rechazado',
            motivo: 'Falta autorización previa',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 3
        },

        {
            fecha_prestacion: '2025-11-01',
            integranteId: 9,
            medico: 'Clinica Santa Maria',
            especialidad: 'Neumonólogo',
            lugar: 'Clínica Santa María',
            factura_fecha: '2025-11-02',
            factura_cuit: '27-98765432-1',
            factura_valor: 56000.00,
            factura_persona: 'Lucía Lopez',
            forma_pago: 'efectivo',
            cbu: null,
            observaciones: 'Espirometría basal y post broncodilatador por sospecha de asma',
        },
        {
            fecha_prestacion: '2025-11-03',
            integranteId: 10,
            medico: 'Clinica Santa Maria',
            especialidad: 'Diabetóloga',
            lugar: 'Clinica Santa Maria',
            factura_fecha: '2025-11-04',
            factura_cuit: '20-12345678-9',
            factura_valor: 60000.00,
            factura_persona: 'Tomas Lopez',
            forma_pago: 'transferencia',
            cbu: '0000003100012345678901',
            observaciones: 'Prueba de tolerancia oral a la glucosa por sospecha de diabetes'
        },
        {
            fecha_prestacion: '2025-11-04',
            integranteId: 3,
            medico: 'Dr. Alejandro Ruiz',
            especialidad: 'Cardiología',
            lugar: 'Clínica del Corazón',
            factura_fecha: '2025-11-05',
            factura_cuit: '23-11223344-5',
            factura_valor: 92000.00,
            factura_persona: 'Luciano Perez',
            forma_pago: 'cheque',
            cbu: null,
            observaciones: 'Ecocardiograma de control post cirugía valvular',
            estado: 'aprobado',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 1
        },
        {
            fecha_prestacion: '2025-11-06',
            integranteId: 4,
            medico: 'Clinica Santa Maria',
            especialidad: 'Neurología',
            lugar: 'Clinica Santa Maria',
            factura_fecha: '2025-11-07',
            factura_cuit: '20-12345678-9',
            factura_valor: 81000.00,
            factura_persona: 'Sofia Perez',
            forma_pago: 'transferencia',
            cbu: '0000003100044444555566',
            observaciones: '- Electroencefalograma por episodios de pérdida de conciencia',
            estado: 'aprobado',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 2
        },
        {
            fecha_prestacion: '2025-11-08',
            integranteId: 6,
            medico: 'Dr. Alejandro Ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            factura_fecha: '2025-11-09',
            factura_cuit: '27-98765432-1',
            factura_valor: 73000.00,
            factura_persona: 'Ana Lopez ',
            forma_pago: 'efectivo',
            cbu: null,
            observaciones: 'Control post angioplastia con buena evolución',
            estado: 'aprobado',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 3
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
            },  
            {
                integranteId: 4,
                medicamento: 'Omeprazol',
                cantidad: 30,
                presentacion: 'comprimidos',
                observaciones: 'Tomar en ayunas durante 15 días',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2,
            },
            {
                integranteId: 5,
                medicamento: 'Salbutamol',
                cantidad: 1,
                presentacion: 'aerosol',
                observaciones: 'Usar en caso de crisis asmática',
                estado: 'observado',
                motivo: 'Falta de estudios complementarios',
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 3
            },
            {
                integranteId: 6,
                medicamento: 'Bisoprolol',
                cantidad: 30,
                presentacion: 'comprimidos',
                observaciones: 'Tratamiento de hipertensión arterial',
                estado: 'en analisis',
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 7,
                medicamento: 'Furosemida',
                cantidad: 20,
                presentacion: 'ampollas',
                observaciones: 'Uso en caso de edema agudo de pulmón',
                estado: 'en analisis',
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 8,
                medicamento: 'Clopidogrel',
                cantidad: 28,
                presentacion: 'blister',
                observaciones: 'Prevención secundaria post infarto',
                estado: 'observado',
                motivo: 'Falta de informe de laboratorio',
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 9,
                medicamento: 'Atorvastatina',
                cantidad: 30,
                presentacion: 'pastillas',
                observaciones: 'Control de dislipemia',
                estado: 'observado',
                motivo: 'Estudios complementarios no adjuntos',
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 3
            },
            {
                integranteId: 10,
                medicamento: 'Enalapril',
                cantidad: 20,
                presentacion: 'comprimidos',
                observaciones: 'Tratamiento de insuficiencia cardíaca',
                estado: 'rechazado',
                motivo: 'Diagnóstico no justificado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 2,
                medicamento: 'Amiodarona',
                cantidad: 10,
                presentacion: 'blister',
                observaciones: 'Control de arritmia ventricular',
                estado: 'rechazado',
                motivo: 'Receta vencida',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 6,
                medicamento: 'Losartán',
                cantidad: 30,
                presentacion: 'pastillas',
                observaciones: 'Control de presión arterial',
                estado: 'recibido'
            },
            {
                integranteId: 7,
                medicamento: 'Aspirina',
                cantidad: 20,
                presentacion: 'blister',
                observaciones: 'Prevención cardiovascular en paciente de riesgo',
                estado: 'recibido'
            },
            {
                integranteId: 8,
                medicamento: 'Nitroglicerina',
                cantidad: 5,
                presentacion: 'spray sublingual',
                observaciones: 'Uso en caso de angina de pecho',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 3
            },
            {
                integranteId: 5,
                medicamento: 'Carvedilol',
                cantidad: 30,
                presentacion: 'comprimidos',
                observaciones: 'Tratamiento de insuficiencia cardíaca con FE reducida',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            }

    ]);
};


module.exports = { crearAfiliados, crearPrestadores, crearAutorizaciones, crearReintegros, crearRecetas, crearIntegrantes };
