const { Afiliado, Prestador, Integrante, Situacion, Turno, Autorizacion, Reintegro, Receta } = require('./db/models');
const { notify } = require('./routes/auth.route');

async function crearAfiliados() {
    await Afiliado.bulkCreate([
        {nombre: "Roberto", apellido: "Perez", numero_afiliado: "IOMA-00111222", dni: "30456789", telefono: "+54 9 11 2345-6789", edad: 50},
        {nombre: "María", apellido: "Lopez", numero_afiliado: 'OSDE-00012345',dni: '30456790',telefono: '+54 9 11 2345-6789', edad: 35}
    ])
}

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

async function crearPrestadores() {
    await Prestador.bulkCreate([
        { username: "dr alejandro ruiz", password: "12345", role: "medico", especialidades: ["cardiologia"], centroId: 5 },
        { username: "dr cecilia lopez", password: "6789", role: "medico", especialidades: ["clinica"], centroId: 5 },
        { username: "dr pablo martinez", password: "2222", role: "medico" ,especialidades: ["pediatria"] , centroId: 5 },
        { username: "dr julia fernandez", password: "3333", role: "medico" ,especialidades: ["traumatologia"] , centroId: 5 },
        { username: "clinica santa maria", password: "5555", role: "centro_medico", especialidades: ["cardiologia", "clinica"], centroId: null }
    ]);
}

const crearTurnos = async () => {
    await Turno.bulkCreate([

        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1); 
            d.setHours(16, 15, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 4); 
            d.setHours(9, 0, 0, 0);
            return d;
            })(),
            duration: 45,
            notes: 
            `Paciente concurre a consulta de control postoperatorio luego de cirugía cardíaca. 
            Refiere evolución clínica favorable, sin síntomas relevantes al momento. 
            Se realiza evaluación física completa, sin hallazgos patológicos
            Se indica chequeo general con estudios complementarios para seguimiento postquirúrgico y control del estado general.
            Se solicita laboratorio completo, ecocardiograma de control y electrocardiograma."
            Se coordina próxima consulta según resultados`,
            integranteId:1,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1); 
            d.setHours(9, 45, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 5); 
            d.setHours(18, 57, 0, 0);
            return d;
            })(),
            duration: 45,
            notes: 
            `Paciente acude a control por hipertensión arterial. Se constata buena adherencia al tratamiento farmacológico. 
            TA en consulta: 128/82 mmHg. Sin síntomas asociados.
            Se indica continuar con medicación actual, mantener dieta hiposódica y realizar control en 30 días. 
            Se solicita laboratorio de rutina y perfil lipídico`,
            integranteId:2,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 2); 
            d.setHours(10, 30, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate()- 5);
            d.setHours(10, 30, 0, 0);
            return d;
            })(),
            duration: 45,
            notes: 
            `Consulta de seguimiento post infección por SARS-CoV-2. Paciente sin síntomas respiratorios ni secuelas aparentes.
             Saturación 98%, auscultación pulmonar normal.
             Se indica espirometría de control y radiografía de tórax. Se sugiere actividad física progresiva y reevaluación en 15 días.`,
            integranteId:3,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 2); 
            d.setHours(9, 30, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 5); 
            d.setHours(10, 30, 0, 0);
            return d;
            })(),
            duration: 60,
            notes:`Paciente refiere dolor abdominal difuso de 48 hs de evolución, sin fiebre ni vómitos. 
            Abdomen blando, no doloroso a la palpación profunda.
            Se solicita ecografía abdominal y laboratorio con hepatograma, amilasas y PCR. 
            Se indica dieta liviana y analgesia. Control según resultados.`,
            integranteId:1,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 2);
            d.setHours(14, 0, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate());
            d.setHours(10, 0, 0, 0);
            return d;
            })(),
           duration: 20,
           integranteId:3,
           prestadorId: 1,
           centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 2);
            d.setHours(15, 20, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate());
            d.setHours(9, 20, 0, 0);
            return d;
            })(),
           duration: 20,
           integranteId:1,
           prestadorId: 1,
           centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 2);
            d.setHours(15, 0, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate());
            d.setHours(11, 51, 0, 0);
            return d;
            })(),
           duration: 20,
           integranteId:2,
           prestadorId: 1,
           centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            d.setHours(8, 0, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 2);
            d.setHours(10, 31, 0, 0);
            return d;
            })(),
           duration: 20,
           integranteId:2,
           prestadorId: 1,
           centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            d.setHours(16, 55, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 3);
            d.setHours(16, 22, 0, 0);
            return d;
            })(),
            duration: 30,
            integranteId:8,
            prestadorId: 2,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            d.setHours(7, 45, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            d.setHours(7, 30, 0, 0);
            return d;
            })(),
            duration: 45,
            integranteId:8,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            d.setHours(17, 45, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 4);
            d.setHours(9, 29, 0, 0);
            return d;
            })(),
            duration: 30,
            notes: `Paciente concurre para evaluación prequirúrgica por intervención programada. 
            Se revisa historia clínica, comorbilidades y medicación actual.
            Se solicita laboratorio preoperatorio, ECG y evaluación cardiológica. 
            Se entrega indicaciones prequirúrgicas y se coordina fecha de cirugía.`,
            integranteId: 8,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            d.setHours(10, 30, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 8);
            d.setHours(10, 36, 0, 0);
            return d;
            })(),
            duration: 60,
            notes: `Paciente consulta por cefaleas tensionales recurrentes. No signos de alarma. Neurológico normal.
             Se indica control con neurología, iniciar registro de episodios y evitar factores desencadenantes. 
             Se prescribe analgesia de rescate y técnicas de relajación.`,
            integranteId: 1,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            d.setHours(15, 35, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 6);
            d.setHours(13, 58, 0, 0);
            return d;
            })(),
            duration: 15,
            notes: `Paciente concurre a control post traumatismo de muñeca izquierda. Radiografía previa sin signos de fractura. 
            Refiere dolor leve y movilidad conservada.
            Se indica continuar con inmovilización parcial y aplicación de frío local. Se prescribe antiinflamatorio por 5 días.
            Control clínico en 7 días para evaluar evolución funcional.`,
            integranteId: 3,
            prestadorId: 3,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 2);
            d.setHours(19, 20, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 6);
            d.setHours(15, 55, 0, 0);
            return d;
            })(),
            duration: 60,
            notes: `Paciente concurre a control por diabetes tipo 2. 
            Refiere buena adherencia a dieta y medicación. Glucemia capilar en consulta: 112 mg/dL.
            Se revisa tratamiento actual y se indica continuar con metformina. 
            Se solicita laboratorio con HbA1c, perfil lipídico y función renal.
            Se coordina próxima consulta en 30 días para seguimiento metabólico.`,
            integranteId: 2,
            prestadorId: 3,
            centroId: 3
        },
        {
            date: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            d.setHours(14, 30, 0, 0);
            return d;
            })(),
            start: (() => {
            const d = new Date();
            d.setDate(d.getDate() - 4);
            d.setHours(16, 37, 0, 0);
            return d;
            })(),
            duration: 20,
            notes: `Paciente consulta por disnea leve al realizar actividades cotidianas. 
            No refiere dolor torácico ni palpitaciones. Saturación 96%, auscultación pulmonar sin rales.
            Se solicita radiografía de tórax, ECG y laboratorio con hemograma y función tiroidea.
            Se indica evitar esfuerzos intensos hasta completar estudios. Reevaluación según resultados.`,
            integranteId: 7,
            prestadorId: 3,
            centroId: 3
        }
   
    ])
}
const crearSituaciones = async () => {
    await Situacion.bulkCreate([
        { 
            fecha_inicio: "2025-11-05", 
            especialidad: "Cardiologia",
            observaciones: "Infarto agudo de miocardio. Se realizó angioplastia con colocación de stent en arteria coronaria izquierda. Evolución favorable con control posterior.",
            estado: "baja",
            fecha_final: "2025-11-10",
            integranteId:1, 
            prestadorId: 1
        },
        {
            fecha_inicio: "2025-7-10", 
            especialidad: "Cardiologia",
            observaciones: "Pico de hipertensión arterial con mareos y cefalea intensa. Se ajustó medicación antihipertensiva y se indicó dieta baja en sodio.",
            estado: "baja",
            fecha_final: "2025-7-20",
            integranteId: 1,
            prestadorId: 1
        },
        {
            fecha_inicio: "2025-11-12",
            especialidad: "Neurología",
            observaciones: "Accidente cerebrovascular isquémico. Se inició tratamiento anticoagulante y rehabilitación motora. Paciente estable.",
            estado: "en proceso",
            fecha_final: "2025-11-18",
            integranteId: 3,
            prestadorId: 3
        },

        {
            fecha_inicio: "2025-08-20",
            especialidad: "Traumatología",
            observaciones: "Fractura de fémur derecho. Se realizó reducción quirúrgica con colocación de clavo intramedular. Evolución favorable.",
            estado: "baja",
            fecha_final: "2024-09-05",
            integranteId: 2,
            prestadorId: 3
        },
        {
            fecha_inicio: "2025-11-10",
            especialidad: "Medica Clinica",
            observaciones: "Infección respiratoria aguda. Se indicó antibiótico y seguimiento ambulatorio. Paciente presenta buena recuperación.",
            estado: "en proceso",
            fecha_final: "2024-11-25",
            afiliadoId: 1,
            prestadorId: 2
        },
        {
            fecha_inicio: "2025-10-15",
            especialidad: "Gastroenterología",
            observaciones: "Úlcera gástrica tratada con medicación y seguimiento endoscópico. Evolución favorable, sin complicaciones.",
            estado: "en proceso",
            fecha_final: "2025-11-29",
            integranteId: 2,
            prestadorId: 3
        },
        {
            fecha_inicio: "2025-10-15",
            especialidad: "Medica Clinica",
            observaciones: "Infección aguda en brazo derecho, por quemadura de 4to grado. Se pide injerto de piel",
            estado: "en proceso",
            fecha_final: "2025-12-01",
            integranteId:6,
            prestadorId: 2
        },
        {
            fecha_inicio: "2025-11-11",
            especialidad: "Medica Clinica",
            observaciones: "Quemadura por exploción en laboratorio, se necesitan curaciones todos los días",
            estado: "en proceso",
            fecha_final: "2025-12-11",
            integranteId:1,
            prestadorId: 2
        },
        
        {
            fecha_inicio: "2025-11-12",
            especialidad: "Cardiología",
            observaciones: "Paciente con diagnóstico reciente de epilepsia. Se inicia tratamiento con anticonvulsivantes y seguimiento clínico semanal.",
            estado: "en proceso",
            fecha_final: "2026-01-15",
            integranteId: 8,
            prestadorId: 1
        },
        {
            fecha_inicio: "2025-11-01",
            especialidad: "Medica Clinico",
            observaciones: "Control y ajuste de tratamiento por hipertensión arterial. Se solicita monitoreo domiciliario de TA y laboratorio de control.",
            estado: "en proceso",
            fecha_final: "2025-11-30",
            integranteId: 9,
            prestadorId: 2
        },
        {
            fecha_inicio: "2025-02-20",
            especialidad: "Psiquiatría",
            observaciones: "Seguimiento por trastorno de ansiedad generalizada. Se ajusta medicación y se indica psicoterapia semanal.",
            estado: "en proceso",
            fecha_final: "2026-03-25",
            integranteId: 10,
            prestadorId: 3
        },
        {
            fecha_inicio: "2025-05-05",
            especialidad: "Traumatología",
            observaciones: "Rehabilitación post fractura de fémur derecho. Se indica fisioterapia tres veces por semana y control funcional.",
            estado: "baja",
            fecha_final: "2025-09-25",
            integranteId: 1,
            prestadorId: 3
        },
        {
            fecha_inicio: "2025-11-03",
            especialidad: "Medica Clinica",
            observaciones: "Tratamiento de psoriasis en placas. Se inicia terapia tópica con seguimiento quincenal para evaluar respuesta. Si la evaluacion no es favorable, consultar con un dermatólogo.",
            estado: "en proceso",
            fecha_final: "2026-02-28",
            integranteId: 2,
            prestadorId: 2
        }

    ])
}
const crearAutorizaciones = async () => {
    await Autorizacion.bulkCreate([
        {
            fecha_prevista: new Date('2025-11-01'),
            integranteId: 1,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Chequeo prequirúrgico',
            estado:'en analisis',
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: new Date('2025-11-03'),
            integranteId: 2,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones: 'Control de lunares'
        },

        {
            fecha_prevista: new Date('2025-01-03'),
            integranteId: 2,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones:'Biopsia de lesión cutánea sospechosa en antebrazo izquierdo'
        },

        {
            fecha_prevista: new Date('2025-11-05'),
            integranteId: 3,
            medico: 'dr cecilia lopez',
            especialidad: 'Neurología',
            lugar: 'Clínica Santa María',
            dias_internacion: 1,
            observaciones: 'Fiebre persistente, acompañado de una cefalea intensa',
            estado:'observado',
            fecha_finalizacion: '2025-11-09', //Fecha de cuando se cambio el estado
            motivo:'Falta resultado de análisis de sangre',
            usuarioUltimoCambio:2
        },

        {
            fecha_prevista: new Date('2025-11-06'),
            integranteId: 4,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 3,
            observaciones: 'Infarto agudo de miocardio con necesidad de colocación de stent coronario izquierdo',
            estado: 'aprobado',    
            fecha_finalizacion: '2025-11-10', //Fecha de cuando se cambio el estado
            usuarioUltimoCambio: 3           
        },
        {
            fecha_prevista: new Date('2025-11-07'),
            integranteId: 5,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones: 'Controles anuales',
            estado: 'rechazado',
            fecha_finalizacion: '2025-11-11', //Fecha de cuando se cambio el estado
            motivo: 'No paso un año desde el último control',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: new Date('2025-11-08'),
            integranteId: 6,
            medico: 'dr alejandro ruiz',
            especialidad: 'Psiquiatría',
            lugar: 'Clínica Santa María',
            dias_internacion: 0,
            observaciones: 'Evaluación pre asignación del profesional adecuado para el caso',
            estado:'observado',
            fecha_finalizacion: '2025-11-13', //Fecha de cuando se cambio el estado
            motivo: 'No abonó el copago obligatorio',
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
            fecha_finalizacion: '2025-11-16', //Fecha de cuando se cambio el estado
            usuarioUltimoCambio:1
        },
        {
            fecha_prevista: new Date('2025-11-10'),
            integranteId: 8,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 1,
            observaciones: 'Reacción a alimentos',
            estado: 'rechazado',
            fecha_finalizacion: '2025-11-20', //Fecha de cuando se cambio el estado
            motivo: 'Se aplicó corticoide y luego 2hs de reposo ya se puede dar el alta',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: new Date('2025-11-11'),
            integranteId: 9,
            medico: 'dr alejandro ruiz',
            especialidad: 'Psiquiatría',
            lugar: 'Clínica Santa María',
            dias_internacion: 1,
            observaciones: 'Ataque de panico severo',
            estado: 'rechazado',
            fecha_finalizacion: '2025-11-12', //Fecha de cuando se cambio el estado
            motivo: 'Se aplicó calmante y luego de 2hs de control en guardia, ya se puede dar el alta',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: new Date('2025-11-12'),
            integranteId: 10,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Hipertensión arterial severa'
        },
        {
            fecha_prevista: new Date('2025-11-26'),
            integranteId: 10,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
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
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 1,
            observaciones: 'Nuevo melanocítico con bordes irregulares en espalda',
            estado: 'observado',
            fecha_finalizacion: '2025-11-15', //Fecha de cuando se cambio el estado
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
            medico: 'dr alejandro ruiz',
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
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
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
            medico: 'clinica santa maria',
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
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
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
            medico: 'dr alejandro ruiz',
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
            fecha_finalizacion: '2025-11-05', //Fecha de cuando se cambio el estado
            motivo: 'Falta radiografía',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prestacion: '2025-10-24',
            integranteId: 5,
            medico: 'clinica santa maria',
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
            fecha_finalizacion: '2025-10-26', //Fecha de cuando se cambio el estado
            motivo: 'Falta firma del profesional',
            usuarioUltimoCambio: 3
        },
        {
            fecha_prestacion: '2025-10-26',
            integranteId: 6,
            medico: 'dr cecilia lopez ',
            especialidad: 'Medica Clinica',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-27',
            factura_cuit: '20-12345678-9',
            factura_valor: 61000.00,
            factura_persona: 'Ana Perez',
            forma_pago: 'transferencia',
            cbu: '0000003100011122233344',
            observaciones: 'Prueba de alergia por sospecha de urticaria grave',
            estado: 'observado',
            fecha_finalizacion: '2025-10-31', //Fecha de cuando se cambio el estado
            motivo: 'Estudios adjuntos ilegibles',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prestacion: '2025-10-28',
            integranteId: 7,
            medico: 'dr alejandro ruiz',
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
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Hospital Central',
            factura_fecha: '2025-10-31',
            factura_cuit: '20-12345678-9',
            factura_valor: 70000.00,
            factura_persona: 'Pedro Lopez',
            forma_pago: 'transferencia',
            cbu: '0000003100099999888877',
            observaciones: 'Consulta medica por asma leve',
            estado: 'rechazado',
            motivo: 'Falta autorización previa',
            fecha_finalizacion: new Date(),
            usuarioUltimoCambio: 3
        },

        {
            fecha_prestacion: '2025-11-01',
            integranteId: 9,
            medico: 'clinica santa maria',
            especialidad: 'Neurología',
            lugar: 'Clínica Santa María',
            factura_fecha: '2025-11-02',
            factura_cuit: '27-98765432-1',
            factura_valor: 56000.00,
            factura_persona: 'Lucía Lopez',
            forma_pago: 'efectivo',
            cbu: null,
            observaciones: 'Estudio de tomografía computada con contraste ',
        },
        {
            fecha_prestacion: '2025-11-03',
            integranteId: 10,
            medico: 'clinica santa maria',
            especialidad: 'Gastroenterología',
            lugar: 'clinica santa maria',
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
            medico: 'dr alejandro ruiz',
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
            medico: 'clinica santa maria',
            especialidad: 'Neurología',
            lugar: 'clinica santa maria',
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
            medico: 'dr alejandro ruiz',
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
                fecha_finalizacion: '2025-09-11', //Fecha de cuando se cambio el estado
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
                fecha_finalizacion: '2025-02-21', //Fecha de cuando se cambio el estado
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
                fecha_finalizacion: '2025-08-05', //Fecha de cuando se cambio el estado
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

module.exports = { crearAfiliados, crearPrestadores, crearAutorizaciones, crearReintegros, crearRecetas, crearIntegrantes, crearSituaciones, crearTurnos };
