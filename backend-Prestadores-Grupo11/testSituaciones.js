const {Situacion} = require('./db/models');
const { notify } = require('./routes/auth.route');


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

module.exports = {crearSituaciones};