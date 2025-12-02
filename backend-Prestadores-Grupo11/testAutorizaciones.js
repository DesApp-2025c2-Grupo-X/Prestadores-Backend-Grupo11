const {Autorizacion} = require('./db/models');
const { notify } = require('./routes/auth.route');

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
            estado: 'en analisis',
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
        {
            fecha_prevista: "2025-12-10",
            integranteId: 3, // Luciano Perez
            medico: "dr marcelo aguirre",
            especialidad: "clinica",
            lugar: "Centro Médico San Martín",
            dias_internacion: null,
            observaciones: "Control general",
            estado: "recibido",
            motivo: "Chequeo anual",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2025-12-12",
            integranteId: 14, // Julieta Gómez
            medico: "dra monica vera",
            especialidad: "ginecologia",
            lugar: "Clínica del Oeste",
            dias_internacion: null,
            observaciones: "Dolor pélvico",
            estado: "recibido",
            motivo: "Eco ginecológica",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2025-12-15",
            integranteId: 22, // Lucas Suárez
            medico: "dr leonel quiroga",
            especialidad: "neurologia",
            lugar: "Instituto Neurológico Central",
            dias_internacion: null,
            observaciones: "Cefaleas recurrentes",
            estado: "en analisis",
            motivo: "Resonancia cerebral",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2025-12-18",
            integranteId: 36, // Pablo Rossi
            medico: "dr sergio mendieta",
            especialidad: "traumatologia",
            lugar: "Sanatorio Modelo",
            dias_internacion: 2,
            observaciones: "Fractura de muñeca",
            estado: "recibido",
            motivo: "Cirugía menor",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2025-12-20",
            integranteId: 5, // Carlos Perez
            medico: "dr julio romero",
            especialidad: "traumatologia",
            lugar: "Clínica del Sol",
            dias_internacion: null,
            observaciones: "Dolor lumbar",
            estado: "observado",
            motivo: "Solicitud de RX columna",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 4
        },
        {
            fecha_prevista: "2025-12-22",
            integranteId: 40, // Brenda Dominguez
            medico: "dra florencia diaz",
            especialidad: "cardiologia",
            lugar: "Instituto Cardiológico Norte",
            dias_internacion: null,
            observaciones: "Taquicardia",
            estado: "recibido",
            motivo: "Holter 24h",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2025-12-27",
            integranteId: 19, // Marta Martínez
            medico: "dra paula mendes",
            especialidad: "clinica",
            lugar: "Hospital Central",
            dias_internacion: 1,
            observaciones: "Deshidratación",
            estado: "aprobado",
            motivo: "Internación corta",
            fecha_finalizacion: "2025-12-29",
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2025-12-28",
            integranteId: 31, // Mauro Bianchi
            medico: "dr gustavo rios",
            especialidad: "pediatria",
            lugar: "Pediátrico Santa Ana",
            dias_internacion: null,
            observaciones: "Controles respiratorios",
            estado: "recibido",
            motivo: "Placa torácica",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2025-12-30",
            integranteId: 47, // Julián Cabrera
            medico: "dra veronica salinas",
            especialidad: "pediatria",
            lugar: "Centro Pediátrico Norte",
            dias_internacion: null,
            observaciones: "Fiebre prolongada",
            estado: "en analisis",
            motivo: "Laboratorio completo",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 5
        },
        {
            fecha_prevista: "2026-01-03",
            integranteId: 12, // Martín Gómez
            medico: "dr nicolas sosa",
            especialidad: "dermatologia",
            lugar: "Dermacenter",
            dias_internacion: null,
            observaciones: "Brotes recurrentes",
            estado: "recibido",
            motivo: "Biopsia de piel",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2025-12-11",
            integranteId: 1,
            medico: "dr alejandro ruiz",
            especialidad: "cardiologia",
            lugar: "Instituto Cardiológico Norte",
            dias_internacion: null,
            observaciones: "Control hipertensión",
            estado: "recibido",
            motivo: "Ecocardiograma",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2025-12-13",
            integranteId: 7,
            medico: "dr leonel quiroga",
            especialidad: "neurologia",
            lugar: "Centro Neurológico del Oeste",
            dias_internacion: null,
            observaciones: "Migrañas persistentes",
            estado: "en analisis",
            motivo: "TAC de cráneo",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 4
        },
        {
            fecha_prevista: "2025-12-14",
            integranteId: 10,
            medico: "dr gustavo rios",
            especialidad: "pediatria",
            lugar: "Hospital Pediátrico Norte",
            dias_internacion: null,
            observaciones: "Fiebre sin foco",
            estado: "recibido",
            motivo: "Laboratorio",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2025-12-16",
            integranteId: 16,
            medico: "dra natalia peralta",
            especialidad: "clinica",
            lugar: "Clínica Buenos Aires",
            dias_internacion: null,
            observaciones: "Control anual",
            estado: "recibido",
            motivo: "Laboratorio general",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2025-12-19",
            integranteId: 18,
            medico: "dr federico luna",
            especialidad: "neurologia",
            lugar: "Instituto Neurológico Central",
            dias_internacion: null,
            observaciones: "Adormecimiento en manos",
            estado: "observado",
            motivo: "Electromiografía",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 5
        },
        {
            fecha_prevista: "2025-12-21",
            integranteId: 25,
            medico: "dr nicolas sosa",
            especialidad: "dermatologia",
            lugar: "Dermacenter",
            dias_internacion: null,
            observaciones: "Irritación persistente",
            estado: "recibido",
            motivo: "Biopsia piel",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 6
        },
        {
            fecha_prevista: "2025-12-23",
            integranteId: 29,
            medico: "dr julio romero",
            especialidad: "traumatologia",
            lugar: "Sanatorio Oeste",
            dias_internacion: 1,
            observaciones: "Dolor rodilla",
            estado: "en analisis",
            motivo: "Artroscopía diagnóstica",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2025-12-24",
            integranteId: 32,
            medico: "dra sofia garay",
            especialidad: "ginecologia",
            lugar: "Clínica Santa María",
            dias_internacion: null,
            observaciones: "Dolores menstruales",
            estado: "recibido",
            motivo: "Eco transvaginal",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2025-12-26",
            integranteId: 41,
            medico: "dr enrique godoy",
            especialidad: "pediatria",
            lugar: "Hospital de Niños",
            dias_internacion: null,
            observaciones: "Tos persistente",
            estado: "recibido",
            motivo: "Radiografía",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2026-01-05",
            integranteId: 4,
            medico: "dr adrian castro",
            especialidad: "clinica",
            lugar: "Clínica del Sol",
            dias_internacion: null,
            observaciones: "Mareos",
            estado: "recibido",
            motivo: "Análisis hormonas",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 4
        },
        {
            fecha_prevista: "2026-01-07",
            integranteId: 8,
            medico: "dr martin saavedra",
            especialidad: "clinica",
            lugar: "Hospital Central",
            dias_internacion: null,
            observaciones: "Dolor abdominal",
            estado: "en analisis",
            motivo: "Eco abdominal",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2026-01-09",
            integranteId: 11,
            medico: "dra jimena farías",
            especialidad: "dermatologia",
            lugar: "Dermacenter",
            dias_internacion: null,
            observaciones: "Lesiones en manos",
            estado: "recibido",
            motivo: "Cultivo",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2026-01-10",
            integranteId: 13,
            medico: "dr bruno esteban",
            especialidad: "cardiologia",
            lugar: "Instituto del Corazón",
            dias_internacion: 1,
            observaciones: "Dolor precordial",
            estado: "aprobado",
            motivo: "Internación observación",
            fecha_finalizacion: "2026-01-11",
            usuarioUltimoCambio: 6
        },
        {
            fecha_prevista: "2026-01-11",
            integranteId: 15,
            medico: "dra paula mendes",
            especialidad: "clinica",
            lugar: "Hospital Municipal",
            dias_internacion: null,
            observaciones: "Hipotiroidismo",
            estado: "recibido",
            motivo: "TSH + T4",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2026-01-12",
            integranteId: 17,
            medico: "dra veronica salinas",
            especialidad: "pediatria",
            lugar: "Centro Pediátrico Norte",
            dias_internacion: null,
            observaciones: "Control adolescente",
            estado: "recibido",
            motivo: "Laboratorio anual",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2026-01-13",
            integranteId: 21,
            medico: "dra monica vera",
            especialidad: "ginecologia",
            lugar: "Clínica del Oeste",
            dias_internacion: null,
            observaciones: "Chequeo ginecológico",
            estado: "recibido",
            motivo: "PAP + colpo",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 4
        },
        {
            fecha_prevista: "2026-01-14",
            integranteId: 23,
            medico: "dr leandro bustos",
            especialidad: "traumatologia",
            lugar: "Sanatorio Modelo",
            dias_internacion: 2,
            observaciones: "Golpe en cadera",
            estado: "en analisis",
            motivo: "RMN de cadera",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 5
        },
        {
            fecha_prevista: "2026-01-15",
            integranteId: 24,
            medico: "dr diego paz",
            especialidad: "pediatria",
            lugar: "Hospital de Niños",
            dias_internacion: null,
            observaciones: "Alergia respiratoria",
            estado: "recibido",
            motivo: "Espirometría",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2026-01-16",
            integranteId: 26,
            medico: "dra clara montiel",
            especialidad: "cardiologia",
            lugar: "Instituto Cardiológico Norte",
            dias_internacion: null,
            observaciones: "Palpitaciones",
            estado: "recibido",
            motivo: "Prueba de esfuerzo",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2026-01-17",
            integranteId: 27,
            medico: "dr sergio mendieta",
            especialidad: "traumatologia",
            lugar: "Clínica del Sur",
            dias_internacion: null,
            observaciones: "Dolor cervical",
            estado: "observado",
            motivo: "RX columna cervical",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2026-01-18",
            integranteId: 28,
            medico: "dra florencia diaz",
            especialidad: "cardiologia",
            lugar: "Instituto del Corazón",
            dias_internacion: null,
            observaciones: "Arritmias",
            estado: "recibido",
            motivo: "Holter 48h",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 4
        },
        {
            fecha_prevista: "2026-01-19",
            integranteId: 30,
            medico: "dr adrian castro",
            especialidad: "clinica",
            lugar: "Hospital San Martín",
            dias_internacion: null,
            observaciones: "Fatiga crónica",
            estado: "en analisis",
            motivo: "Perfil hepático",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2026-01-20",
            integranteId: 33,
            medico: "dr omar villalba",
            especialidad: "traumatologia",
            lugar: "Centro Traumatológico Oeste",
            dias_internacion: 1,
            observaciones: "Caída reciente",
            estado: "aprobado",
            motivo: "Internación corta",
            fecha_finalizacion: "2026-01-21",
            usuarioUltimoCambio: 5
        },
        {
            fecha_prevista: "2026-01-21",
            integranteId: 34,
            medico: "dr alexis luna",
            especialidad: "clinica",
            lugar: "Clínica Santa Fe",
            dias_internacion: null,
            observaciones: "Dolor torácico",
            estado: "recibido",
            motivo: "Troponinas + ECG",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 6
        },
        {
            fecha_prevista: "2026-01-22",
            integranteId: 35,
            medico: "dra daniela correa",
            especialidad: "ginecologia",
            lugar: "Hospital de la Mujer",
            dias_internacion: null,
            observaciones: "Controles de rutina",
            estado: "recibido",
            motivo: "PAP",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: "2026-01-23",
            integranteId: 37,
            medico: "dr leonel quiroga",
            especialidad: "neurologia",
            lugar: "Instituto Neurológico Central",
            dias_internacion: null,
            observaciones: "Parestesias",
            estado: "en analisis",
            motivo: "RMN columna cervical",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: "2026-01-24",
            integranteId: 38,
            medico: "dr nicolas sosa",
            especialidad: "dermatologia",
            lugar: "Dermacenter",
            dias_internacion: null,
            observaciones: "Dermatitis atópica",
            estado: "recibido",
            motivo: "Tratamiento tópico",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: "2026-01-25",
            integranteId: 39,
            medico: "dra mariana perez",
            especialidad: "pediatria",
            lugar: "Hospital de Niños",
            dias_internacion: null,
            observaciones: "Control anual",
            estado: "recibido",
            motivo: "Vacunas",
            fecha_finalizacion: null,
            usuarioUltimoCambio: 5
        },

    ]);
};

module.exports = {crearAutorizaciones};