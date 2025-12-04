'use strict';

const { Faker, es } = require('@faker-js/faker');
const faker = new Faker({ locale: [es] });

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const HOY = new Date();
        const NUM_DIAS_FUTUROS = 60;
        const BATCH_SIZE = 500;
        const DEFAULT_DAILY_RANGE = [6, 12];

        const PERFIL_COEF = {
            sano: [0, 1],
            agudo: [1, 3],
            cronico: [4, 10],
            oncologico: [10, 25],
            femenino: [6, 20],
            masculino: [0, 3],
            pediatrico: [2, 10]
        };

        const ESPECIALIDADES = [
            'Clínica Médica',
            'Cardiología',
            'Nutrición',
            'Kinesiología',
            'Fisiatría',
            'Traumatología',
            'Oftalmología',
            'Optometría',
            'Pediatría',
            'Ginecología',
            'Obstetricia',
            'Neonatología',
            'Diagnóstico por Imágenes',
            'Endocrinología',
            'Neumonología',
            'Gastroenterología',
            'Dermatología',
            'Nefrología',
            'Urología',
            'Cirugía General',
            'Neurología',
            'Oncología',
            'Otorrinolaringología',
            'Psiquiatría',
            'Oncología Pediátrica',
            'Cardiología Infantil',
            'Nefrología Infantil',
            'Cirugía Pediátrica',
            'Neurología Infantil',
            'Hematología Infantil',
            'Infectología'
        ]

        const ESPECIALIDADES_POR_PERFIL = {
            sano: ESPECIALIDADES,//['Clínica Médica', 'Nutrición', 'Dermatología', 'Oftalmología'],
            agudo: ['Clínica Médica', 'Traumatología', 'Infectología'],
            cronico: ['Clínica Médica', 'Cardiología', 'Endocrinología'],
            oncologico: ['Oncología'],
            femenino: ['Obstetricia', 'Ginecología'],
            masculino: ['Urología'],
            pediatrico: ['Pediatría', 'Cardiología Infantil', 'Oncología Pediátrica', 'Nefrología Infantil', 'Cirugía Pediátrica', 'Neurología Infantil', 'Hematología Infantil']
        };


        // Rangos específicos por especialidad
        const dailyRangePorEspecialidad = {
            'Clínica Médica': [10, 18],
            'Pediatría': [10, 16],
            'Traumatología': [8, 12],
            'Cardiología': [6, 12],
            'Endocrinología': [6, 10],
            'Ginecología': [8, 14],
            'Obstetricia': [8, 14],
            'Oncología': [6, 12],
            'Nutrición': [6, 10],
            'Kinesiología': [12, 20],
            'Fisiatría': [8, 12],
            'Oftalmología': [6, 10],
            'Optometría': [6, 10],
            'Neonatología': [6, 12],
            'Diagnóstico por Imágenes': [20, 40],
            'Neumonología': [6, 10],
            'Gastroenterología': [6, 10],
            'Dermatología': [6, 10],
            'Nefrología': [6, 10],
            'Urología': [6, 10],
            'Cirugía General': [6, 12],
            'Neurología': [6, 9],
            'Otorrinolaringología': [6, 10],
            'Psiquiatría': [6, 10],
            'Oncología Pediátrica': [6, 12],
            'Cardiología Infantil': [6, 12],
            'Nefrología Infantil': [6, 10],
            'Cirugía Pediátrica': [6, 12],
            'Neurología Infantil': [6, 10],
            'Hematología Infantil': [6, 10],
            'Infectología': [6, 10],
        };


        const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
        function addMinutes(d, mins) { return new Date(d.getTime() + mins * 60000); }
        function addDays(d, days) { return new Date(d.getTime() + days * 24 * 60 * 60 * 1000); }
        function yearsBetween(d1, d2) {
            return Math.max(0.0001, (d2.getTime() - new Date(d1).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        }

        const casosPorEspecialidad = {
            "Clínica Médica": [
                {
                    motivo: ["tos seca y fatiga", "cefalea intermitente", "dolor muscular leve"],
                    anamnesis: [
                        "Paciente refiere malestar general desde hace ${duracionSintoma} días, sin antecedentes relevantes.",
                        "Paciente con hipertensión controlada, presenta cefalea ocasional.",
                        "Paciente refiere cansancio y dolores musculares después de esfuerzo moderado."
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 78 lpm, Temp 37.5°C",
                        "Signos vitales normales, dolor muscular leve"
                    ],
                    diagnostico: ["Resfriado común", "Hipertensión leve", "Gripe estacional"],
                    plan: [
                        "Reposo relativo y control de signos vitales",
                        "Hidratación abundante, analgésico según necesidad",
                        "Control ambulatorio en 48 horas"
                    ],
                    evolucion: [
                        "Mejoría significativa con tratamiento indicado",
                        "Síntomas persisten, se ajusta medicación y se indica nuevo control"
                    ]
                },
                {
                    motivo: ["mareo ocasional y visión borrosa", "palpitaciones con fatiga"],
                    anamnesis: [
                        "Paciente refiere mareos intermitentes al cambiar de posición, sin antecedentes cardíacos.",
                        "Paciente con palpitaciones ocasionales, refiere cansancio intenso durante actividades diarias."
                    ],
                    examenFisico: [
                        "TA 135/85 mmHg, FC 88 lpm, saturación 97%",
                        "Signos vitales normales, palpación cardíaca sin hallazgos"
                    ],
                    diagnostico: ["Hipotensión ortostática", "Arritmia leve"],
                    plan: [
                        "Control de signos vitales y monitoreo ambulatorio",
                        "Electrocardiograma y seguimiento en 7 días"
                    ],
                    evolucion: [
                        "Síntomas desaparecen tras ajustes de hábitos",
                        "Palpitaciones leves persisten, seguimiento indicado"
                    ]
                },
                {
                    motivo: ["dolor lumbar intermitente", "fatiga y malestar general"],
                    anamnesis: [
                        "Paciente refiere dolor lumbar ocasional al estar sentado mucho tiempo.",
                        "Paciente con cansancio persistente tras jornadas laborales intensas."
                    ],
                    examenFisico: [
                        "Palpación lumbar normal, movilidad conservada",
                        "Signos vitales normales, leve tensión muscular"
                    ],
                    diagnostico: ["Lumbalgia mecánica leve", "Fatiga postural"],
                    plan: [
                        "Ejercicios de estiramiento y analgesia según necesidad",
                        "Recomendaciones ergonómicas y seguimiento ambulatorio"
                    ],
                    evolucion: [
                        "Dolor disminuye con reposo y ejercicios",
                        "Leve molestia persiste, paciente estable"
                    ]
                },
                {
                    motivo: ["tos productiva y fiebre baja", "malestar general con cefalea"],
                    anamnesis: [
                        "Paciente con tos desde hace ${duracionSintoma} días, sin antecedentes pulmonares.",
                        "Paciente refiere cefalea intermitente y cansancio desde hace 3 días."
                    ],
                    examenFisico: [
                        "TA 125/78 mmHg, FC 80 lpm, Temp 37.8°C, auscultación pulmonar con sibilancias leves",
                        "Signos vitales normales, dolor muscular leve"
                    ],
                    diagnostico: ["Bronquitis viral", "Resfriado común"],
                    plan: [
                        "Hidratación, reposo y control de fiebre",
                        "Broncodilatador en caso de dificultad respiratoria leve"
                    ],
                    evolucion: [
                        "Mejoría progresiva, tos disminuye",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["palpitaciones intermitentes", "mareos al esfuerzo"],
                    anamnesis: [
                        "Paciente refiere palpitaciones ocasionales durante ejercicio moderado.",
                        "Paciente con mareos transitorios al levantarse rápido de la cama."
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 90 lpm, auscultación cardíaca normal",
                        "Signos vitales dentro de parámetros normales"
                    ],
                    diagnostico: ["Arritmia sin complicaciones", "Hipotensión ortostática leve"],
                    plan: [
                        "Electrocardiograma y seguimiento ambulatorio",
                        "Medidas posturales y control en 1 semana"
                    ],
                    evolucion: [
                        "Palpitaciones ceden tras ajustes de hábitos",
                        "Síntomas leves persisten, seguimiento indicado"
                    ]
                },
                {
                    motivo: ["dolor torácico leve", "fatiga general persistente"],
                    anamnesis: [
                        "Paciente refiere dolor torácico al esfuerzo, sin antecedentes cardiovasculares.",
                        "Paciente con cansancio general, dificultad leve para subir escaleras"
                    ],
                    examenFisico: [
                        "TA 125/80 mmHg, FC 82 lpm, auscultación cardíaca sin hallazgos",
                        "Signos vitales normales, examen pulmonar sin alteraciones"
                    ],
                    diagnostico: ["Angina leve sospechada", "Fatiga general post-viral"],
                    plan: [
                        "Electrocardiograma y control en consultorio",
                        "Reposo relativo y seguimiento de síntomas"
                    ],
                    evolucion: [
                        "Síntomas ceden progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["tos seca persistente", "malestar general con cefalea"],
                    anamnesis: [
                        "Paciente con tos desde hace 7 días, sin fiebre alta.",
                        "Paciente refiere cefalea leve durante últimos 3 días"
                    ],
                    examenFisico: [
                        "TA 128/82 mmHg, FC 80 lpm, auscultación pulmonar con ruidos normales",
                        "Signos vitales normales, dolor muscular leve"
                    ],
                    diagnostico: ["Resfriado común", "Gripe leve"],
                    plan: [
                        "Hidratación y reposo",
                        "Antitérmico si persiste dolor o fiebre"
                    ],
                    evolucion: [
                        "Paciente refiere mejora progresiva",
                        "Síntomas resueltos en 3 días"
                    ]
                },
                {
                    motivo: ["mareos frecuentes", "palpitaciones al estrés"],
                    anamnesis: [
                        "Paciente refiere mareos durante jornadas laborales intensas.",
                        "Palpitaciones intermitentes al esfuerzo físico, sin antecedentes patológicos"
                    ],
                    examenFisico: [
                        "TA 132/84 mmHg, FC 86 lpm, auscultación cardíaca normal",
                        "Signos vitales normales, examen neurológico sin hallazgos"
                    ],
                    diagnostico: ["Hipotensión postural", "Arritmia leve sin complicaciones"],
                    plan: [
                        "Control ambulatorio y seguimiento ECG",
                        "Recomendaciones de hidratación y postura"
                    ],
                    evolucion: [
                        "Mareos ceden tras medidas posturales",
                        "Palpitaciones leves persisten, seguimiento en consultorio"
                    ]
                },
                {
                    motivo: ["fatiga general persistente", "dolor articular leve"],
                    anamnesis: [
                        "Paciente refiere cansancio prolongado tras esfuerzo físico moderado.",
                        "Dolor articular leve en manos y rodillas sin inflamación evidente"
                    ],
                    examenFisico: [
                        "Signos vitales normales, palpación articular sin hallazgos",
                        "TA 126/82 mmHg, FC 80 lpm"
                    ],
                    diagnostico: ["Fatiga post-viral", "Dolor articular leve inespecífico"],
                    plan: [
                        "Reposo y seguimiento ambulatorio",
                        "Analgésico si persiste el dolor articular"
                    ],
                    evolucion: [
                        "Síntomas mejoran progresivamente",
                        "Paciente estable, dolor leve desaparece"
                    ]
                },
                {
                    motivo: ["dolor torácico intermitente", "disnea leve al esfuerzo"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere dolor torácico intermitente desde ${duracionSintoma} y disnea leve al esfuerzo",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm, FR ${frecuenciaRespiratoria} rpm",
                        "Auscultación cardiopulmonar normal, sin soplos ni crepitantes"
                    ],
                    diagnostico: ["Angina estable leve"],
                    plan: [
                        "Control de factores de riesgo, fármacos antianginosos según protocolo",
                        "Educación sobre signos de alarma y seguimiento ambulatorio"
                    ],
                    evolucion: [
                        "Dolor torácico disminuye con medicación",
                        "Paciente estable, sin eventos agudos"
                    ]
                },
                {
                    motivo: ["cefalea pulsátil recurrente", "mareos ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere cefalea pulsátil recurrente desde ${duracionSintoma}, asociada a mareos ocasionales",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "Presión arterial ${tensionArterial} mmHg, frecuencia cardiaca ${frecuenciaCardiaca} lpm",
                        "Examen neurológico sin déficit focal"
                    ],
                    diagnostico: ["Migraña sin aura"],
                    plan: [
                        "Tratamiento sintomático con analgésicos, identificación de factores desencadenantes",
                        "Seguimiento ambulatorio en 4–6 semanas"
                    ],
                    evolucion: [
                        "Episodios de cefalea disminuyen en frecuencia e intensidad",
                        "Paciente mantiene funcionalidad habitual"
                    ]
                },
                {
                    motivo: ["fatiga persistente", "palpitaciones ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere fatiga persistente y palpitaciones ocasionales desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm",
                        "Ausencia de soplos, pulsos periféricos normales"
                    ],
                    diagnostico: ["Anemia leve por deficiencia de hierro"],
                    plan: [
                        "Suplementación con hierro, control de hemoglobina en 4 semanas",
                        "Educación sobre dieta y adherencia"
                    ],
                    evolucion: [
                        "Fatiga disminuye progresivamente",
                        "Palpitaciones esporádicas y sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor abdominal difuso", "náuseas"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere dolor abdominal difuso y náuseas desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve a palpación generalizada",
                        "Ruidos intestinales presentes, sin signos de irritación peritoneal"
                    ],
                    diagnostico: ["Gastritis leve"],
                    plan: [
                        "Inhibidores de bomba de protones, dieta blanda y control de estrés",
                        "Seguimiento ambulatorio en 2–3 semanas"
                    ],
                    evolucion: [
                        "Dolor abdominal y náuseas disminuyen progresivamente",
                        "Paciente tolera dieta normal sin complicaciones"
                    ]
                },
                {
                    motivo: ["tos crónica", "disnea leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere tos crónica y disnea leve desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación O2 ${saturacionO2}%",
                        "Auscultación pulmonar: sibilancias dispersas, sin crepitantes"
                    ],
                    diagnostico: ["Asma leve intermitente"],
                    plan: [
                        "Broncodilatador inhalado a demanda, control de factores desencadenantes",
                        "Seguimiento en 4 semanas"
                    ],
                    evolucion: [
                        "Tos y disnea disminuyen con tratamiento",
                        "Paciente estable y adherente a medicación"
                    ]
                },
                {
                    motivo: ["edema periférico leve", "fatiga matutina"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere edema periférico leve y fatiga matutina desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm",
                        "Edema leve en miembros inferiores, resto del examen normal"
                    ],
                    diagnostico: ["Insuficiencia cardíaca leve compensada"],
                    plan: [
                        "Control de sal y líquidos, ajuste de medicación diurética",
                        "Control clínico en 2–3 semanas"
                    ],
                    evolucion: [
                        "Edema disminuye, fatiga mejora",
                        "Paciente estable y adherente a tratamiento"
                    ]
                },
                {
                    motivo: ["mareos recurrentes", "cefalea leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere mareos recurrentes y cefalea leve desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm",
                        "Examen neurológico sin déficit focal"
                    ],
                    diagnostico: ["Hipotensión postural leve"],
                    plan: [
                        "Educación sobre hidratación y cambios posturales, seguimiento ambulatorio",
                        "Control clínico en 2–3 semanas"
                    ],
                    evolucion: [
                        "Mareos disminuyen con medidas posturales",
                        "Paciente estable, sin eventos importantes"
                    ]
                },
                {
                    motivo: ["dolor lumbar intermitente", "rigidez matutina"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere dolor lumbar intermitente y rigidez matutina desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "Movilidad lumbar levemente limitada, dolor a palpación de músculos paravertebrales",
                        "Reflejos normales, fuerza conservada"
                    ],
                    diagnostico: ["Lumbalgia mecánica leve"],
                    plan: [
                        "Fisioterapia y analgesia según necesidad, educación postural",
                        "Control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor y rigidez disminuyen progresivamente",
                        "Paciente mantiene actividad funcional normal"
                    ]
                },
                {
                    motivo: ["palpitaciones ocasionales", "fatiga leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere palpitaciones ocasionales y fatiga leve desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm, auscultación cardiaca normal",
                        "Sin soplos ni arritmias detectables"
                    ],
                    diagnostico: ["Arritmia supraventricular leve"],
                    plan: [
                        "Monitorización ambulatoria y control de factores desencadenantes",
                        "Seguimiento cardiológico en 4–6 semanas"
                    ],
                    evolucion: [
                        "Palpitaciones disminuyen con medidas y control",
                        "Paciente estable, adherente a indicaciones"
                    ]
                },
                {
                    motivo: ["mareos y cefalea ocasional", "alteraciones digestivas leves"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere mareos, cefalea ocasional y alteraciones digestivas leves desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm, abdomen blando y depresible",
                        "Auscultación cardiopulmonar normal"
                    ],
                    diagnostico: ["Síndrome vegetativo leve"],
                    plan: [
                        "Educación sobre manejo del estrés, dieta equilibrada y seguimiento ambulatorio",
                        "Control en 4 semanas"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas generales",
                        "Paciente estable y funcional"
                    ]
                },
                {
                    motivo: ["tos seca y fatiga", "cefalea intermitente", "dolor muscular leve"],
                    anamnesis: [
                        "Paciente refiere malestar general desde hace ${duracionSintoma} días, ${antecedenteMedico ? antecedenteMedico : 'sin antecedentes relevantes.'}",
                        "Paciente con hipertensión controlada, presenta cefalea ocasional, ${antecedenteMedico ? antecedenteMedico : 'Niega antecedentes patológicos relevantes.'}",
                        "Paciente refiere cansancio y dolores musculares después de esfuerzo moderado, ${antecedenteMedico ? antecedenteMedico : 'No refiere antecedentes médicos significativos.'}"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 78 lpm, Temp 37.5°C",
                        "Signos vitales normales, dolor muscular leve"
                    ],
                    diagnostico: ["Resfriado común", "Hipertensión leve", "Gripe estacional"],
                    plan: [
                        "Reposo relativo y control de signos vitales",
                        "Hidratación abundante, analgésico según necesidad",
                        "Control ambulatorio en 48 horas"
                    ],
                    evolucion: [
                        "Mejoría significativa con tratamiento indicado",
                        "Síntomas persisten, se ajusta medicación y se indica nuevo control"
                    ]
                },
                {
                    motivo: ["mareo ocasional y visión borrosa", "palpitaciones con fatiga"],
                    anamnesis: [
                        "Paciente refiere mareos intermitentes al cambiar de posición, ${antecedenteMedico ? antecedenteMedico : 'sin antecedentes cardíacos.'}",
                        "Paciente con palpitaciones ocasionales, refiere cansancio intenso durante actividades diarias, ${antecedenteMedico ? antecedenteMedico : 'Niega antecedentes cardiacos relevantes'}"
                    ],
                    examenFisico: [
                        "TA 135/85 mmHg, FC 88 lpm, saturación 97%",
                        "Signos vitales normales, palpación cardíaca sin hallazgos"
                    ],
                    diagnostico: ["Hipotensión ortostática", "Arritmia leve"],
                    plan: [
                        "Control de signos vitales y monitoreo ambulatorio",
                        "Electrocardiograma y seguimiento en 7 días"
                    ],
                    evolucion: [
                        "Síntomas desaparecen tras ajustes de hábitos",
                        "Palpitaciones leves persisten, seguimiento indicado"
                    ]
                },
                {
                    motivo: ["dolor lumbar intermitente", "fatiga y malestar general"],
                    anamnesis: [
                        "Paciente refiere dolor lumbar ocasional al estar sentado mucho tiempo, ${antecedenteMedico ? antecedenteMedico : 'Niega antecedentes ortopédicos importantes.'}",
                        "Paciente con cansancio persistente tras jornadas laborales intensas, ${antecedenteMedico ? antecedenteMedico : 'No refiere antecedentes médicos significativos.'}"
                    ],
                    examenFisico: [
                        "Palpación lumbar normal, movilidad conservada",
                        "Signos vitales normales, leve tensión muscular"
                    ],
                    diagnostico: ["Lumbalgia mecánica leve", "Fatiga postural"],
                    plan: [
                        "Ejercicios de estiramiento y analgesia según necesidad",
                        "Recomendaciones ergonómicas y seguimiento ambulatorio"
                    ],
                    evolucion: [
                        "Dolor disminuye con reposo y ejercicios",
                        "Leve molestia persiste, paciente estable"
                    ]
                },
                {
                    motivo: ["tos productiva y fiebre baja", "malestar general con cefalea"],
                    anamnesis: [
                        "Paciente con tos desde hace ${duracionSintoma} días, ${antecedenteMedico ? antecedenteMedico : 'sin antecedentes pulmonares.'}",
                        "Paciente refiere cefalea intermitente y cansancio desde hace 3 días, ${antecedenteMedico ? antecedenteMedico : 'Niega antecedentes patológicos relevantes.'}"
                    ],
                    examenFisico: [
                        "TA 125/78 mmHg, FC 80 lpm, Temp 37.8°C, auscultación pulmonar con sibilancias leves",
                        "Signos vitales normales, dolor muscular leve"
                    ],
                    diagnostico: ["Bronquitis viral", "Resfriado común"],
                    plan: [
                        "Hidratación, reposo y control de fiebre",
                        "Broncodilatador en caso de dificultad respiratoria leve"
                    ],
                    evolucion: [
                        "Mejoría progresiva, tos disminuye",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["palpitaciones intermitentes", "mareos al esfuerzo"],
                    anamnesis: [
                        "Paciente refiere palpitaciones ocasionales durante ejercicio moderado, ${antecedenteMedico ? antecedenteMedico : 'Niega antecedentes cardíacos relevantes.'}",
                        "Paciente con mareos transitorios al levantarse rápido de la cama, ${antecedenteMedico ? antecedenteMedico : 'No refiere antecedentes médicos significativos.'}"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 90 lpm, auscultación cardíaca normal",
                        "Signos vitales dentro de parámetros normales"
                    ],
                    diagnostico: ["Arritmia sin complicaciones", "Hipotensión ortostática leve"],
                    plan: [
                        "Electrocardiograma y seguimiento ambulatorio",
                        "Medidas posturales y control en 1 semana"
                    ],
                    evolucion: [
                        "Palpitaciones ceden tras ajustes de hábitos",
                        "Síntomas leves persisten, seguimiento indicado"
                    ]
                },
                {
                    motivo: ["dolor torácico leve", "fatiga general persistente"],
                    anamnesis: [
                        "Paciente refiere dolor torácico al esfuerzo, ${antecedenteMedico ? antecedenteMedico : 'sin antecedentes cardiovasculares.'}",
                        "Paciente con cansancio general, dificultad leve para subir escaleras, ${antecedenteMedico ? antecedenteMedico : 'Niega antecedentes médicos significativos.'}"
                    ],
                    examenFisico: [
                        "TA 125/80 mmHg, FC 82 lpm, auscultación cardíaca sin hallazgos",
                        "Signos vitales normales, examen pulmonar sin alteraciones"
                    ],
                    diagnostico: ["Angina leve sospechada", "Fatiga general post-viral"],
                    plan: [
                        "Electrocardiograma y control en consultorio",
                        "Reposo relativo y seguimiento de síntomas"
                    ],
                    evolucion: [
                        "Síntomas ceden progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                }],
            "Pediatría": [
                {
                    motivo: ["fiebre alta y vómitos", "diarrea y decaimiento"],
                    anamnesis: [
                        "Niño de ${edad} años, vacunación completa, fiebre desde hace ${duracionSintoma} días acompañada de vómitos ocasionales.",
                        "Paciente refiere diarrea líquida 4 veces al día, decaimiento y rechazo parcial de la comida."
                    ],
                    examenFisico: [
                        "T 38.9°C, pulso 110 lpm, abdomen blando, dolor leve a la palpación",
                        "Signos vitales normales, abdomen blando, sin deshidratación grave"
                    ],
                    diagnostico: ["Gastroenteritis viral leve", "Deshidratación leve secundaria a gastroenteritis"],
                    plan: [
                        "Hidratación oral abundante, control de fiebre, control ambulatorio en 48h",
                        "Recomendaciones de dieta blanda, observación de signos de alarma"
                    ],
                    evolucion: [
                        "Mejoría progresiva, fiebre desaparece en 2 días",
                        "Paciente estable, diarrea cede en 3 días"
                    ]
                },
                {
                    motivo: ["tos persistente", "malestar general con fiebre baja"],
                    anamnesis: [
                        "Niño de ${edad} años con tos seca de ${duracionSintoma} días, sin dificultad respiratoria.",
                        "Paciente refiere fiebre leve intermitente, cansancio y rechazo parcial de alimentos."
                    ],
                    examenFisico: [
                        "FR 26, auscultación pulmonar con sibilancias leves",
                        "Signos vitales normales, abdomen blando, sin hallazgos adicionales"
                    ],
                    diagnostico: ["Bronquitis viral", "Infección respiratoria alta leve"],
                    plan: [
                        "Hidratación y control ambulatorio, antitérmico según necesidad",
                        "Reposo relativo y seguimiento clínico en 48h"
                    ],
                    evolucion: [
                        "Tos disminuye progresivamente, paciente estable",
                        "Fiebre desaparece, mejoría general"
                    ]
                },
                {
                    motivo: ["erupción cutánea generalizada", "prurito leve"],
                    anamnesis: [
                        "Niño de 4 años con lesiones maculopapulares en tronco y extremidades, sin fiebre.",
                        "Paciente refiere picazón leve, sin contacto conocido con varicela."
                    ],
                    examenFisico: [
                        "Lesiones maculopapulares dispersas, sin exudado ni inflamación",
                        "Signos vitales normales, mucosas íntegras"
                    ],
                    diagnostico: ["Exantema viral leve", "Reacción alérgica leve"],
                    plan: [
                        "Antihistamínico oral si prurito molesta, control ambulatorio en 48h",
                        "Observación de evolución de lesiones, higiene y cuidado de piel"
                    ],
                    evolucion: [
                        "Lesiones ceden progresivamente, paciente estable",
                        "Prurito controlado, sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor abdominal intermitente", "náuseas ocasionales"],
                    anamnesis: [
                        "Niño de 6 años refiere dolor abdominal difuso desde ayer, sin vómitos ni diarrea.",
                        "Paciente con antecedentes de estreñimiento ocasional."
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve difuso, sin masas ni defensa",
                        "Signos vitales normales, peristaltismo presente"
                    ],
                    diagnostico: ["Dolor abdominal funcional", "Gastroenteritis leve"],
                    plan: [
                        "Hidratación, dieta blanda, observación ambulatoria",
                        "Control clínico en 48h si persiste dolor"
                    ],
                    evolucion: [
                        "Dolor cede progresivamente, paciente estable",
                        "Síntomas resueltos en 2 días"
                    ]
                },
                {
                    motivo: ["dolor de garganta", "fiebre leve", "malestar general"],
                    anamnesis: [
                        "Niño de 7 años con odinofagia desde ayer, sin tos ni secreciones nasales.",
                        "Paciente refiere cansancio y ligero rechazo a la comida."
                    ],
                    examenFisico: [
                        "Faringe eritematosa sin exudados, ganglios cervicales no aumentados",
                        "Signos vitales normales, abdomen blando"
                    ],
                    diagnostico: ["Faringitis viral leve", "Infección respiratoria alta"],
                    plan: [
                        "Hidratación, antitérmico según necesidad, control ambulatorio",
                        "Reposo relativo y seguimiento clínico en 48h"
                    ],
                    evolucion: [
                        "Dolor de garganta cede progresivamente",
                        "Fiebre desaparece, paciente estable"
                    ]
                },
                {
                    motivo: ["conjuntivitis", "secreción ocular", "picazón leve"],
                    anamnesis: [
                        "Niño de 5 años con ojo derecho enrojecido y secreción amarillenta desde ayer.",
                        "Paciente refiere picazón leve, sin dolor intenso."
                    ],
                    examenFisico: [
                        "Conjuntiva hiperémica, secreción mucopurulenta escasa",
                        "Ojo izquierdo sin alteraciones, visión conservada"
                    ],
                    diagnostico: ["Conjuntivitis bacteriana leve", "Conjuntivitis viral leve"],
                    plan: [
                        "Colirio antibiótico según indicación, higiene ocular",
                        "Control en 48–72h para evaluar evolución"
                    ],
                    evolucion: [
                        "Secreción disminuye, ojo menos enrojecido",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor de oído", "fiebre intermitente"],
                    anamnesis: [
                        "Niño de ${edad} años con dolor en oído derecho desde 24h, fiebre de 38°C.",
                        "Paciente refiere irritabilidad y dificultad para dormir."
                    ],
                    examenFisico: [
                        "Oído externo y canal auditivo sin alteraciones, tímpano hiperémico",
                        "Signos vitales normales, abdomen blando"
                    ],
                    diagnostico: ["Otitis media aguda leve"],
                    plan: [
                        "Analgesia, control de fiebre, observación ambulatoria",
                        "Antibiótico solo si síntomas persisten o empeoran"
                    ],
                    evolucion: [
                        "Dolor disminuye, fiebre desaparece en 2 días",
                        "Paciente estable, audición conservada"
                    ]
                },
                {
                    motivo: ["tos productiva con expectoración", "fiebre baja"],
                    anamnesis: [
                        "Niño de ${edad} años con tos productiva desde ${duracionSintoma} días, fiebre leve intermitente.",
                        "Paciente con antecedentes de resfriados recurrentes en invierno."
                    ],
                    examenFisico: [
                        "FR 28, auscultación pulmonar con roncus leves",
                        "Signos vitales normales, abdomen blando"
                    ],
                    diagnostico: ["Bronquitis viral leve"],
                    plan: [
                        "Hidratación, control de fiebre, seguimiento ambulatorio",
                        "Reposo relativo y observación de signos de alarma"
                    ],
                    evolucion: [
                        "Tos disminuye progresivamente",
                        "Paciente estable, síntomas resueltos en 4 días"
                    ]
                },
                {
                    motivo: ["dolor abdominal bajo y vómitos", "decaimiento"],
                    anamnesis: [
                        "Niño de ${edad} años refiere dolor abdominal bajo y vómitos intermitentes desde ayer.",
                        "Paciente con antecedentes de estreñimiento ocasional"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor difuso leve, peristaltismo presente",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Gastroenteritis viral leve"],
                    plan: [
                        "Hidratación oral abundante, dieta blanda, control ambulatorio en 48h",
                        "Observación de signos de alarma y seguimiento"
                    ],
                    evolucion: [
                        "Dolor y vómitos ceden progresivamente",
                        "Paciente estable, dieta tolerada"
                    ]
                },
                {
                    motivo: ["erupción cutánea con fiebre leve", "malestar general"],
                    anamnesis: [
                        "Niño de 5 años con exantema maculopapular en tronco y extremidades desde ayer.",
                        "Paciente con fiebre de 38°C intermitente, apetito conservado."
                    ],
                    examenFisico: [
                        "Lesiones maculopapulares dispersas, sin exudado ni inflamación",
                        "Signos vitales normales, mucosas íntegras"
                    ],
                    diagnostico: ["Exantema viral leve"],
                    plan: [
                        "Hidratación, control de fiebre, observación ambulatoria",
                        "Higiene y cuidado de piel, seguimiento en 48h"
                    ],
                    evolucion: [
                        "Exantema desaparece progresivamente",
                        "Paciente estable, fiebre cede"
                    ]
                }],

            "Ginecología": [
                // Casos originales preservados
                {
                    motivo: ["Dolor pélvico y flujo anormal", "Amenorrea de 2 meses", "Dolor durante la menstruación"],
                    anamnesis: [
                        "Paciente refiere flujo vaginal amarillento desde hace 3 días",
                        "Ausente menstruación desde hace 2 meses, sin antecedentes patológicos",
                        "Dismenorrea marcada en últimos 3 ciclos"
                    ],
                    examenFisico: [
                        "Examen pélvico normal, dolor leve fondo de saco",
                        "Útero y anexos sin alteraciones palpables",
                        "Dolor leve a palpación en región pélvica"
                    ],
                    diagnostico: ["Vaginosis bacteriana", "Amenorrea secundaria", "Dismenorrea primaria"],
                    plan: [
                        "Tratamiento antibiótico según cultivo",
                        "Solicitar hormonograma, control en 1 mes",
                        "Analgesia y control ambulatorio"
                    ],
                    evolucion: [
                        "Síntomas resueltos tras tratamiento",
                        "Leve mejoría, seguimiento próximo"
                    ]
                },
                {
                    motivo: ["flujo vaginal anormal", "dolor pélvico intermitente"],
                    anamnesis: [
                        "Flujo blanquecino y prurito, sin fiebre",
                        "Dolor pélvico intermitente, relación con ciclo menstrual"
                    ],
                    examenFisico: [
                        "Examen pélvico: secreción blanca, mucosa ligeramente enrojecida",
                        "Dolor leve a palpación de fondo de saco"
                    ],
                    diagnostico: ["Candidiasis vaginal", "Dolor pélvico benigno"],
                    plan: [
                        "Tratamiento antifúngico tópico",
                        "Control ambulatorio en 1 semana"
                    ],
                    evolucion: [
                        "Se resuelve flujo y prurito",
                        "Dolor cede progresivamente, paciente estable"
                    ]
                },

                // Casos adicionales
                {
                    motivo: ["menstruación irregular", "dolor abdominal bajo leve"],
                    anamnesis: [
                        "Paciente con ciclos irregulares desde hace 6 meses, dolor abdominal leve antes del periodo",
                        "No antecedentes de patología ginecológica significativa"
                    ],
                    examenFisico: [
                        "Útero de tamaño normal, anexos sin alteraciones",
                        "Dolor leve a palpación en fosa iliaca derecha"
                    ],
                    diagnostico: ["Disfunción menstrual", "Dismenorrea leve"],
                    plan: [
                        "Control hormonal y seguimiento en 2 meses",
                        "Analgesia según necesidad, registro de ciclos"
                    ],
                    evolucion: [
                        "Ciclos se regularizan parcialmente",
                        "Dolor disminuye, paciente estable"
                    ]
                },
                {
                    motivo: ["flujo sanguinolento fuera de periodo", "molestia pélvica"],
                    anamnesis: [
                        "Paciente refiere sangrado intermenstrual leve desde hace 2 días",
                        "No toma anticonceptivos hormonales"
                    ],
                    examenFisico: [
                        "Útero normal, ligera sensibilidad anexial izquierda",
                        "No masas palpables"
                    ],
                    diagnostico: ["Sangrado disfuncional", "Cisto de ovario pequeño"]
                    ,
                    plan: [
                        "Control ecográfico en 1 semana",
                        "Observación ambulatoria y registro de sangrado"
                    ],
                    evolucion: [
                        "Sangrado cede espontáneamente",
                        "Paciente estable, cisto sin crecimiento significativo"
                    ]
                },
                {
                    motivo: ["prurito vaginal intenso", "flujo blanquecino espeso"],
                    anamnesis: [
                        "Paciente refiere prurito intenso desde hace 3 días",
                        "No fiebre ni dolor abdominal asociado"
                    ],
                    examenFisico: [
                        "Secreción blanquecina espesa, mucosa vulvar eritematosa",
                        "Examen pélvico sin otras alteraciones"
                    ],
                    diagnostico: ["Candidiasis vulvovaginal aguda"],
                    plan: [
                        "Tratamiento antifúngico oral y tópico",
                        "Higiene genital, evitar irritantes"
                    ],
                    evolucion: [
                        "Prurito disminuye tras 3 días de tratamiento",
                        "Secreción cede completamente, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor lumbar asociado a menstruación", "disuria ocasional"],
                    anamnesis: [
                        "Paciente refiere dolor lumbar durante menstruación, leve disuria ocasional",
                        "No antecedentes de infecciones urinarias frecuentes"
                    ],
                    examenFisico: [
                        "Útero y anexos normales, dolor lumbar leve a palpación",
                        "Sin signos de infección urinaria al examen físico"
                    ],
                    diagnostico: ["Dismenorrea secundaria leve", "Infección urinaria descartada"]
                    ,
                    plan: [
                        "Analgesia durante menstruación, seguimiento ambulatorio",
                        "Educación sobre hábitos de hidratación y micción"
                    ],
                    evolucion: [
                        "Dolor disminuye con analgésicos",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["menstruación abundante", "fatiga y mareos ocasionales"],
                    anamnesis: [
                        "Paciente refiere sangrado abundante durante 3 ciclos consecutivos",
                        "Mareos leves al final del periodo menstrual"
                    ],
                    examenFisico: [
                        "Útero de tamaño normal, sin masas",
                        "Signos vitales normales, leve palidez"
                    ],
                    diagnostico: ["Menorragia funcional", "Anemia leve secundaria a sangrado"]
                    ,
                    plan: [
                        "Control hemograma, suplementación de hierro",
                        "Registro de cantidad de sangrado y seguimiento mensual"
                    ],
                    evolucion: [
                        "Fatiga mejora tras suplementación",
                        "Sangrado disminuye gradualmente"
                    ]
                },
                {
                    motivo: ["dolor pélvico crónico", "molestia durante relaciones sexuales"],
                    anamnesis: [
                        "Paciente refiere dolor pélvico crónico desde hace 6 meses",
                        "Molestia ocasional durante coito, sin sangrado"
                    ],
                    examenFisico: [
                        "Útero y anexos normales, dolor leve a palpación profunda",
                        "Sin masas ni nódulos palpables"
                    ],
                    diagnostico: ["Dolor pélvico crónico inespecífico"],
                    plan: [
                        "Fisioterapia pélvica y seguimiento ambulatorio",
                        "Analgesia si necesario, evaluación psicosexual opcional"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente",
                        "Paciente estable, mejora funcional"
                    ]
                },
                {
                    motivo: ["flujo marrón post-menstrual", "dolor abdominal leve"],
                    anamnesis: [
                        "Paciente refiere flujo marrón durante 2 días después del periodo",
                        "Dolor abdominal leve intermitente"
                    ],
                    examenFisico: [
                        "Útero y anexos normales, dolor leve a palpación baja",
                        "No masas ni signos de infección"
                    ],
                    diagnostico: ["Flujo post-menstrual fisiológico", "Dolor abdominal funcional leve"]
                    ,
                    plan: [
                        "Observación, registro de síntomas",
                        "Control en próximo ciclo si persiste"
                    ],
                    evolucion: [
                        "Flujo desaparece espontáneamente",
                        "Paciente estable, dolor leve cede"
                    ]
                },
                {
                    motivo: ["flujo vaginal amarillo y mal olor", "prurito leve"],
                    anamnesis: [
                        "Paciente refiere flujo con mal olor desde hace 3 días",
                        "Sin fiebre ni dolor abdominal"
                    ],
                    examenFisico: [
                        "Secreción amarilla, mucosa vulvar ligeramente eritematosa",
                        "Examen pélvico sin alteraciones adicionales"
                    ],
                    diagnostico: ["Vaginosis bacteriana leve"],
                    plan: [
                        "Tratamiento antibiótico local, higiene genital",
                        "Control ambulatorio en 1 semana"
                    ],
                    evolucion: [
                        "Síntomas desaparecen tras tratamiento",
                        "Paciente estable, flujo normalizado"
                    ]
                }
            ],
            "Obstetricia": [
                {
                    motivo: ["control prenatal rutinario", "embarazo de 24 semanas sin complicaciones"],
                    anamnesis: [
                        "Paciente embarazada de ${duracionSintoma} semanas, sin antecedentes médicos relevantes, refiere buen estado general.",
                        "Primigesta, controles previos normales, sin síntomas de alarma."
                    ],
                    examenFisico: [
                        "TA 120/80 mmHg, FC 80 lpm, altura uterina acorde a semanas de gestación",
                        "Auscultación fetal: frecuencia cardíaca 140 lpm, sin alteraciones"
                    ],
                    diagnostico: ["Embarazo normal a término medio"],
                    plan: [
                        "Continuar controles prenatales según protocolo",
                        "Reforzar educación sobre signos de alarma y hábitos saludables"
                    ],
                    evolucion: [
                        "Paciente estable, sin complicaciones",
                        "Frecuencia fetal normal en controles sucesivos"
                    ]
                },
                {
                    motivo: ["contracciones leves", "embarazo de 32 semanas"],
                    anamnesis: [
                        "Paciente refiere contracciones intermitentes leves desde ayer, sin dolor intenso",
                        "No sangrado vaginal ni pérdida de líquido"
                    ],
                    examenFisico: [
                        "TA 115/75 mmHg, FC 78 lpm, altura uterina normal",
                        "Actividad uterina leve, frecuencia fetal 142 lpm"
                    ],
                    diagnostico: ["Contracciones uterinas leves, embarazo de 32 semanas"],
                    plan: [
                        "Reposo relativo, control diario de contracciones",
                        "Educación sobre signos de parto prematuro"
                    ],
                    evolucion: [
                        "Contracciones ceden con reposo",
                        "Paciente estable, seguimiento ambulatorio indicado"
                    ]
                },
                {
                    motivo: ["sangrado vaginal leve", "embarazo de 20 semanas"],
                    anamnesis: [
                        "Paciente refiere sangrado escaso desde hace 24 horas, sin dolor abdominal",
                        "No antecedentes de abortos previos"
                    ],
                    examenFisico: [
                        "TA 118/76 mmHg, FC 82 lpm, sin sangrado activo visible",
                        "Útero y anexos sin alteraciones palpables"
                    ],
                    diagnostico: ["Sangrado leve en segundo trimestre, probable sangrado de implantación tardío"],
                    plan: [
                        "Reposo relativo, control en 48 horas",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Sangrado cede espontáneamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor lumbar y edema leve", "embarazo de 28 semanas"],
                    anamnesis: [
                        "Paciente refiere dolor lumbar leve y edema en extremidades inferiores",
                        "No antecedentes de hipertensión ni proteinuria"
                    ],
                    examenFisico: [
                        "TA 122/78 mmHg, FC 80 lpm, edema leve en tobillos",
                        "Altura uterina y FCF normal"
                    ],
                    diagnostico: ["Edema fisiológico y dolor lumbar leve en embarazo"],
                    plan: [
                        "Educación postural, ejercicios leves, seguimiento en control prenatal",
                        "Control signos vitales y peso semanal"
                    ],
                    evolucion: [
                        "Dolor lumbar cede con ejercicios posturales",
                        "Edema disminuye, paciente estable"
                    ]
                },
                {
                    motivo: ["náuseas y vómitos matutinos", "embarazo de 10 semanas"],
                    anamnesis: [
                        "Paciente refiere vómitos intermitentes desde hace 1 semana, náuseas persistentes",
                        "Sin deshidratación evidente, apetito disminuido"
                    ],
                    examenFisico: [
                        "TA 110/70 mmHg, FC 78 lpm, abdomen blando",
                        "Signos de deshidratación ausentes"
                    ],
                    diagnostico: ["Náuseas y vómitos leves en primer trimestre"],
                    plan: [
                        "Recomendaciones dietéticas, hidratación frecuente, seguimiento ambulatorio",
                        "Control de peso y signos de alarma"
                    ],
                    evolucion: [
                        "Síntomas disminuyen progresivamente",
                        "Paciente estable, tolera ingesta oral normal"
                    ]
                },
                {
                    motivo: ["sangrado vaginal escaso postcoital", "embarazo de 14 semanas"],
                    anamnesis: [
                        "Paciente refiere manchado leve tras relaciones sexuales, sin dolor ni fiebre",
                        "Embarazo controlado, sin antecedentes de abortos"
                    ],
                    examenFisico: [
                        "TA 115/75 mmHg, FC 78 lpm, útero normal, sangrado escaso",
                        "FCF normal, sin alteraciones"
                    ],
                    diagnostico: ["Sangrado postcoital leve, embarazo estable"],
                    plan: [
                        "Observación ambulatoria, control en 48h",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Sangrado cede espontáneamente",
                        "Paciente estable, embarazo sin complicaciones"
                    ]
                },
                {
                    motivo: ["hipertensión leve en control prenatal", "embarazo de 34 semanas"],
                    anamnesis: [
                        "Paciente refiere cefalea leve, sin visión borrosa ni edema marcado",
                        "Control prenatal previo normal"
                    ],
                    examenFisico: [
                        "TA 140/85 mmHg, FC 82 lpm, edema leve",
                        "Altura uterina y FCF normales"
                    ],
                    diagnostico: ["Hipertensión gestacional leve"],
                    plan: [
                        "Control diario de TA, dieta baja en sal, seguimiento semanal",
                        "Evaluación de proteinuria si síntomas persisten"
                    ],
                    evolucion: [
                        "TA normaliza con medidas conservadoras",
                        "Paciente estable, sin complicaciones maternas o fetales"
                    ]
                },
                {
                    motivo: ["contracciones intensas pre-término", "embarazo de 32 semanas"],
                    anamnesis: [
                        "Paciente refiere contracciones frecuentes y dolor abdominal leve",
                        "No sangrado ni pérdida de líquido"
                    ],
                    examenFisico: [
                        "TA 120/80 mmHg, FC 80 lpm, altura uterina acorde",
                        "Contracciones frecuentes, FCF 140 lpm, sin signos de sufrimiento fetal"
                    ],
                    diagnostico: ["Contracciones uterinas frecuentes pre-término, embarazo de 32 semanas"],
                    plan: [
                        "Reposo absoluto, control hospitalario, medicación tocolítica según indicación",
                        "Monitoreo FCF y signos vitales"
                    ],
                    evolucion: [
                        "Contracciones disminuyen con reposo y medicación",
                        "Paciente estable, seguimiento hospitalario"
                    ]
                },
                {
                    motivo: ["dolor abdominal bajo y sangrado leve", "embarazo de 18 semanas"],
                    anamnesis: [
                        "Paciente refiere dolor abdominal intermitente y sangrado escaso",
                        "Sin fiebre ni secreción vaginal"
                    ],
                    examenFisico: [
                        "TA 118/76 mmHg, FC 80 lpm, útero y anexos normales",
                        "Sangrado escaso, sin alteraciones adicionales"
                    ],
                    diagnostico: ["Amenaza de aborto leve, embarazo estable"],
                    plan: [
                        "Reposo relativo, seguimiento ambulatorio, control ecográfico",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Sangrado cede, dolor leve desaparece",
                        "Paciente estable, embarazo continúa normalmente"
                    ]
                },
                {
                    motivo: ["fiebre leve y malestar general en embarazo", "embarazo de 26 semanas"],
                    anamnesis: [
                        "Paciente refiere fiebre de 38°C intermitente y malestar general desde ayer",
                        "No antecedentes de enfermedades infecciosas recientes"
                    ],
                    examenFisico: [
                        "TA 120/80 mmHg, FC 80 lpm, altura uterina acorde",
                        "Ausculatación fetal normal, abdomen blando"
                    ],
                    diagnostico: ["Infección viral leve durante embarazo"],
                    plan: [
                        "Hidratación, antitérmico seguro en embarazo, seguimiento ambulatorio",
                        "Control de signos de alarma y frecuencia fetal"
                    ],
                    evolucion: [
                        "Fiebre cede en 24–48h",
                        "Paciente estable, embarazo sin complicaciones"
                    ]
                }
            ],
            "Neonatología": [
                {
                    motivo: ["revisión postnatal rutinaria", "recién nacido de 2 días"],
                    anamnesis: [
                        "Recién nacido a término, parto vaginal sin complicaciones, APGAR 9/10",
                        "Madre refiere buena succión y eliminación normal"
                    ],
                    examenFisico: [
                        "Peso 3.200 g, T 36.8°C, FR 40, FC 140 lpm",
                        "Recién nacido alerta, tono y reflejos normales, piel íntegra"
                    ],
                    diagnostico: ["Recién nacido sano a término"],
                    plan: [
                        "Control de rutina y seguimiento en 7 días",
                        "Orientación sobre lactancia y cuidado neonatal"
                    ],
                    evolucion: [
                        "Recién nacido con buena succión y ganancia de peso adecuada",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["ictericia leve", "recién nacido de 3 días"],
                    anamnesis: [
                        "Recién nacido a término, madre con Rh negativo, ictericia visible en cara y tronco",
                        "Alimentación exclusiva con lactancia materna"
                    ],
                    examenFisico: [
                        "Peso 3.100 g, T 36.7°C, piel amarillenta leve",
                        "No signos de deshidratación, tono y reflejos normales"
                    ],
                    diagnostico: ["Ictericia fisiológica leve en recién nacido a término"],
                    plan: [
                        "Control clínico diario, fototerapia solo si niveles de bilirrubina elevados",
                        "Orientación a madre sobre alimentación frecuente"
                    ],
                    evolucion: [
                        "Ictericia disminuye progresivamente sin complicaciones",
                        "Recién nacido estable, ganancia de peso adecuada"
                    ]
                },
                {
                    motivo: ["dificultad respiratoria leve", "recién nacido de 1 día"],
                    anamnesis: [
                        "Recién nacido con leve taquipnea al nacimiento, parto vaginal sin complicaciones",
                        "Saturación inicial 92%, mejora espontánea"
                    ],
                    examenFisico: [
                        "T 36.8°C, FC 140 lpm, FR 60",
                        "Auscultación pulmonar con murmullo normal, sin sibilancias"
                    ],
                    diagnostico: ["Taquipnea transitoria del recién nacido"],
                    plan: [
                        "Monitorización de signos vitales, soporte con oxígeno si necesario",
                        "Observación en unidad neonatal por 24–48h"
                    ],
                    evolucion: [
                        "Frecuencia respiratoria normaliza en 24h",
                        "Paciente estable, sin complicaciones respiratorias"
                    ]
                },
                {
                    motivo: ["peso bajo al nacer", "recién nacido de 37 semanas"],
                    anamnesis: [
                        "Recién nacido prematuro tardío, parto eutócico, madre con hipertensión controlada",
                        "Alimentación inicial con lactancia materna y suplemento"
                    ],
                    examenFisico: [
                        "Peso 2.400 g, T 36.5°C, FC 138 lpm, FR 42",
                        "Tono y reflejos adecuados, piel íntegra"
                    ],
                    diagnostico: ["Prematuridad tardía, peso bajo para la edad gestacional"],
                    plan: [
                        "Suplementación nutricional y seguimiento estrecho de peso",
                        "Control ambulatorio en 3–5 días"
                    ],
                    evolucion: [
                        "Ganancia de peso progresiva",
                        "Paciente estable, buena tolerancia a alimentación"
                    ]
                },
                {
                    motivo: ["ictericia intensa", "recién nacido de 4 días"],
                    anamnesis: [
                        "Recién nacido a término, madre O+, aparición de ictericia intensa desde día 3",
                        "Alimentación exclusiva con lactancia materna"
                    ],
                    examenFisico: [
                        "Peso 3.200 g, T 36.7°C, piel amarilla intensa",
                        "Reflejos normales, sin letargo ni apnea"
                    ],
                    diagnostico: ["Ictericia neonatal moderada"],
                    plan: [
                        "Fototerapia según niveles de bilirrubina, monitorización de signos vitales",
                        "Control estricto de hidratación y alimentación"
                    ],
                    evolucion: [
                        "Ictericia disminuye tras fototerapia",
                        "Paciente estable, buena tolerancia a lactancia"
                    ]
                },
                {
                    motivo: ["sospecha de infección neonatal leve", "recién nacido de 5 días"],
                    anamnesis: [
                        "Recién nacido febril leve (38°C), madre con infección urinaria en último trimestre",
                        "Alimentación con lactancia materna exclusiva, actividad conservada"
                    ],
                    examenFisico: [
                        "T 38°C, FC 140 lpm, FR 44",
                        "Abdomen blando, sin distensión, reflejos normales"
                    ],
                    diagnostico: ["Sospecha de infección neonatal leve"],
                    plan: [
                        "Hemocultivo, antibioterapia empírica si evolución positiva",
                        "Observación estricta en unidad neonatal"
                    ],
                    evolucion: [
                        "Fiebre cede tras antibioterapia",
                        "Paciente estable, signos vitales normales"
                    ]
                },
                {
                    motivo: ["revisión de lactancia", "recién nacido de 2 semanas"],
                    anamnesis: [
                        "Recién nacido a término, madre refiere dificultad para agarre y succión",
                        "Peso inicial 3.200 g, pérdida ponderal del 5%"
                    ],
                    examenFisico: [
                        "Peso actual 3.040 g, T 36.8°C, reflejos normales",
                        "Buena tonicidad, mucosas íntegras"
                    ],
                    diagnostico: ["Dificultad en lactancia, pérdida de peso fisiológica"],
                    plan: [
                        "Orientación a madre sobre técnicas de lactancia",
                        "Control de peso en 48–72h"
                    ],
                    evolucion: [
                        "Succión mejora con orientación",
                        "Ganancia ponderal adecuada en control"
                    ]
                },
                {
                    motivo: ["episodio de apnea leve", "recién nacido de 3 días"],
                    anamnesis: [
                        "Recién nacido prematuro tardío, episodio de apnea transitoria de 10 segundos",
                        "No cianosis ni alteración de conciencia"
                    ],
                    examenFisico: [
                        "T 36.5°C, FC 140 lpm, FR 40",
                        "Auscultación normal, tono conservado"
                    ],
                    diagnostico: ["Apnea transitoria leve del prematuro tardío"],
                    plan: [
                        "Monitorización continua, estimulación leve si se repite",
                        "Observación en unidad neonatal 24h"
                    ],
                    evolucion: [
                        "No nuevos episodios, paciente estable",
                        "Signos vitales normales, buena tolerancia oral"
                    ]
                },
                {
                    motivo: ["erupción cutánea leve", "recién nacido de 1 semana"],
                    anamnesis: [
                        "Recién nacido a término, aparición de pápulas eritematosas en tronco y cara",
                        "Sin fiebre ni malestar general"
                    ],
                    examenFisico: [
                        "Piel con pápulas eritematosas dispersas, sin exudado",
                        "Signos vitales normales, reflejos conservados"
                    ],
                    diagnostico: ["Exantema neonatal benigno (eritema tóxico)"],
                    plan: [
                        "No requiere tratamiento, observación ambulatoria",
                        "Orientación a padres sobre evolución"
                    ],
                    evolucion: [
                        "Exantema desaparece en 3–5 días",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["bilirrubina elevada", "recién nacido de 5 días con ictericia progresiva"],
                    anamnesis: [
                        "Recién nacido a término, alimentación mixta, ictericia progresiva desde día 2",
                        "No letargo, succión adecuada"
                    ],
                    examenFisico: [
                        "T 36.7°C, FC 138 lpm, piel amarilla intensa en cara y tronco",
                        "Reflejos normales, abdomen blando"
                    ],
                    diagnostico: ["Ictericia neonatal moderada a severa"],
                    plan: [
                        "Fototerapia intensiva según bilirrubina sérica, hidratación frecuente",
                        "Control estricto de signos vitales y seguimiento ambulatorio"
                    ],
                    evolucion: [
                        "Ictericia cede progresivamente tras fototerapia",
                        "Paciente estable, buena tolerancia a alimentación"
                    ]
                }
            ]
            ,
            "Diagnóstico por Imágenes": [
                {
                    motivo: ["dolor abdominal persistente", "evaluación de masa palpable"],
                    anamnesis: [
                        "Paciente de ${edad} años con dolor abdominal difuso desde 1 semana, sensación de masa en cuadrante inferior derecho",
                        "No antecedentes quirúrgicos previos"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve a palpación profunda, masa palpable de 3 cm",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Ecografía abdominal: masa sólida compatible con adenoma"],
                    plan: [
                        "Solicitar ecografía abdominal completa, seguimiento según hallazgo",
                        "Control clínico en 1 semana"
                    ],
                    evolucion: [
                        "Masa estable, paciente asintomático",
                        "Plan quirúrgico evaluado según tamaño y características de la lesión"
                    ]
                },
                {
                    motivo: ["dolor torácico", "disnea leve"],
                    anamnesis: [
                        "Paciente de ${edad} años con dolor torácico intermitente y disnea leve al esfuerzo",
                        "Antecedentes de hipertensión controlada"
                    ],
                    examenFisico: [
                        "TA 130/85 mmHg, FC 78 lpm, FR 18, saturación 96%",
                        "Auscultación pulmonar sin hallazgos relevantes"
                    ],
                    diagnostico: ["Radiografía de tórax: leve congestión pulmonar, sin consolidación"],
                    plan: [
                        "Control ambulatorio, seguimiento clínico y repetir radiografía en 2 semanas",
                        "Evaluación cardiológica si síntomas persisten"
                    ],
                    evolucion: [
                        "Congestión leve resuelta, paciente asintomático",
                        "Radiografía de control sin cambios significativos"
                    ]
                },
                {
                    motivo: ["trauma de rodilla", "edema e inflamación local"],
                    anamnesis: [
                        "Paciente de ${edad} años con torcedura de rodilla derecha durante deporte, inflamación progresiva",
                        "No antecedentes de cirugías ni fracturas previas"
                    ],
                    examenFisico: [
                        "Rodilla derecha edematosa, movilidad limitada por dolor, estabilidad ligamentaria conservada",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Resonancia magnética: distensión del ligamento colateral medial leve"],
                    plan: [
                        "Reposo relativo, fisioterapia inicial, analgesia según necesidad",
                        "Seguimiento clínico y control por imagen en 1 mes"
                    ],
                    evolucion: [
                        "Dolor disminuye, movilidad mejora",
                        "Distensión leve sin complicaciones, paciente estable"
                    ]
                },
                {
                    motivo: ["trauma de muñeca", "dolor e inflamación local"],
                    anamnesis: [
                        "Paciente de ${edad} años con torcedura de muñeca izquierda durante partido de fútbol hace 6 horas",
                        "Niega antecedentes de fracturas o luxaciones previas en la muñeca"
                    ],
                    examenFisico: [
                        "Muñeca izquierda edematosa, dolor a la palpación, movilidad limitada principalmente en flexo-extensión",
                        "Signos vitales normales, sin déficit neurovascular distal"
                    ],
                    diagnostico: ["Radiografía: esguince leve de ligamento colateral cubital de la muñeca"],
                    plan: [
                        "Reposo relativo, inmovilización con férula blanda, analgesia según necesidad",
                        "Aplicación de hielo local y elevación, control clínico en 1 semana"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente con reposo e inmovilización",
                        "Inflamación leve persistente, paciente estable y con movilidad funcional conservada"
                    ]
                },
                {
                    motivo: ["cefalea intensa", "mareos ocasionales"],
                    anamnesis: [
                        "Paciente de ${€dad} años con cefalea intensa de inicio súbito y mareos leves",
                        "No antecedentes neurológicos previos"
                    ],
                    examenFisico: [
                        "TA 125/80 mmHg, FC 76 lpm, FR 16, examen neurológico normal",
                        "Sin déficit motor ni sensitivo"
                    ],
                    diagnostico: ["Tomografía cerebral: sin hemorragia ni masa, hallazgos normales"],
                    plan: [
                        "Observación ambulatoria, analgesia según necesidad",
                        "Control clínico en 48h o ante empeoramiento de síntomas"
                    ],
                    evolucion: [
                        "Cefalea disminuye progresivamente",
                        "Paciente estable, sin hallazgos patológicos en imagen"
                    ]
                },
                {
                    motivo: ["dolor lumbar crónico", "rigidez matinal"],
                    anamnesis: [
                        "Paciente de ${edad} años con dolor lumbar crónico desde hace 6 meses, rigidez matinal de 15 minutos",
                        "No antecedentes traumáticos recientes"
                    ],
                    examenFisico: [
                        "Signos vitales normales, palpación lumbar sin masa ni dolor intenso",
                        "Movilidad conservada, reflejos normales"
                    ],
                    diagnostico: ["Radiografía lumbar: cambios degenerativos leves en L4-L5"],
                    plan: [
                        "Fisioterapia, analgésicos según necesidad, control en 1 mes",
                        "Educación sobre ergonomía y postura"
                    ],
                    evolucion: [
                        "Dolor lumbar controlado con medidas conservadoras",
                        "Cambios degenerativos sin progresión en control radiológico"
                    ]
                },
                {
                    motivo: ["dolor abdominal y vómitos", "evaluación de apendicitis sospechosa"],
                    anamnesis: [
                        "Paciente de ${edad} años con dolor en fosa iliaca derecha, náuseas y vómitos intermitentes desde 12 horas",
                        "No antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor intenso en fosa iliaca derecha, rebote positivo",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Tomografía abdominal: apéndice inflamado, compatible con apendicitis aguda"],
                    plan: [
                        "Derivación a cirugía general para apendicectomía",
                        "Antibióticos preoperatorios según protocolo"
                    ],
                    evolucion: [
                        "Paciente intervenido, evolución postoperatoria sin complicaciones",
                        "Alta hospitalaria estable"
                    ]
                },
                {
                    motivo: ["tos persistente y fiebre baja", "evaluación pulmonar"],
                    anamnesis: [
                        "Paciente de ${edad} años con tos seca persistente y fiebre de 38°C desde 5 días",
                        "No antecedentes respiratorios crónicos"
                    ],
                    examenFisico: [
                        "TA 118/75 mmHg, FC 80 lpm, FR 20, auscultación pulmonar con crepitantes leves",
                        "Saturación 95%"
                    ],
                    diagnostico: ["Radiografía de tórax: infiltrado pulmonar derecho compatible con neumonía leve"],
                    plan: [
                        "Antibiótico oral según sensibilidad, control clínico en 48h",
                        "Seguimiento radiográfico si no hay mejoría"
                    ],
                    evolucion: [
                        "Paciente mejora clínicamente en 3 días",
                        "Radiografía de control muestra resolución parcial del infiltrado"
                    ]
                },
                {
                    motivo: ["dolor de cadera post-trauma", "edema leve"],
                    anamnesis: [
                        "Paciente de ${edad} años con caída durante deporte, dolor en cadera derecha y movilidad limitada",
                        "No antecedentes de fracturas previas"
                    ],
                    examenFisico: [
                        "Dolor a palpación y movilidad limitada, edema leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Resonancia magnética: contusión ósea sin fractura"],
                    plan: [
                        "Reposo relativo, fisioterapia y analgesia según necesidad",
                        "Control clínico y evaluación de movilidad en 2 semanas"
                    ],
                    evolucion: [
                        "Dolor y edema disminuyen progresivamente",
                        "Paciente recupera movilidad completa sin complicaciones"
                    ]
                },
                {
                    motivo: ["cefalea crónica", "mareos episódicos"],
                    anamnesis: [
                        "Paciente de ${edad} años con cefalea crónica desde 6 meses, mareos intermitentes",
                        "No antecedentes neurológicos significativos"
                    ],
                    examenFisico: [
                        "Examen neurológico normal, signos vitales estables",
                        "Sin déficit motor ni sensitivo"
                    ],
                    diagnostico: ["Resonancia cerebral: hallazgos normales"],
                    plan: [
                        "Manejo conservador con analgesia según necesidad",
                        "Control clínico periódico"
                    ],
                    evolucion: [
                        "Paciente estable, cefalea controlada con medidas conservadoras",
                        "No cambios en imagen en control sucesivo"
                    ]
                }
            ],
            "Oftalmología": [
                {
                    motivo: ["visión borrosa unilateral", "irritación ocular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere visión borrosa en ojo derecho desde 3 días, sin dolor intenso",
                        "Antecedentes de hipertensión controlada, no diabético"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 0.6, OI 1.0, pupilas reactivas",
                        "Conjuntiva y córnea sin alteraciones, fondo de ojo normal"
                    ],
                    diagnostico: ["Queratitis leve por irritación ocular"],
                    plan: [
                        "Lágrimas artificiales según necesidad, higiene ocular",
                        "Control en 48h para evaluación de evolución"
                    ],
                    evolucion: [
                        "Síntomas disminuyen progresivamente",
                        "Visión normalizada, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor ocular y enrojecimiento", "secreción mucosa leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere ojo izquierdo rojo con secreción desde 2 días",
                        "No antecedentes de alergias ni trauma ocular"
                    ],
                    examenFisico: [
                        "Conjuntiva hiperémica, secreción mucosa escasa",
                        "Agudeza visual 1.0 en ambos ojos, fondo de ojo normal"
                    ],
                    diagnostico: ["Conjuntivitis viral leve"],
                    plan: [
                        "Higiene ocular, compresas frías, seguimiento ambulatorio en 48h",
                        "Evitar contacto con otras personas para prevenir contagio"
                    ],
                    evolucion: [
                        "Enrojecimiento y secreción disminuyen",
                        "Paciente estable, agudeza visual preservada"
                    ]
                },
                {
                    motivo: ["dolor ocular súbito", "visión borrosa transitoria"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor súbito en ojo derecho y visión borrosa intermitente",
                        "Antecedentes de glaucoma en familiar cercano"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 0.7, OI 1.0, pupilas normales",
                        "Presión intraocular 22 mmHg, sin alteraciones visibles en fondo de ojo"
                    ],
                    diagnostico: ["Glaucoma incipiente sospechado"],
                    plan: [
                        "Derivación a especialista para tonometría repetida y seguimiento",
                        "Educación sobre síntomas de alarma y cuidado ocular"
                    ],
                    evolucion: [
                        "Paciente estable, seguimiento programado",
                        "Presión intraocular controlada, agudeza visual estable"
                    ]
                },
                {
                    motivo: ["molestia ocular con luz intensa", "visión borrosa transitoria"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere fotofobia y visión borrosa al exponerse a luz intensa",
                        "Uso prolongado de pantallas, sin antecedentes patológicos"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, pupilas reactivas",
                        "Examen de córnea y cristalino normal, fondo de ojo normal"
                    ],
                    diagnostico: ["Fatiga ocular por sobreuso"],
                    plan: [
                        "Recomendaciones de higiene visual, pausas en uso de pantallas",
                        "Seguimiento ambulatorio si persisten síntomas"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas de higiene visual",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["secreción ocular amarilla", "prurito leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere secreción amarilla y picazón leve en ojo derecho desde 1 día",
                        "No antecedentes de alergias o trauma ocular"
                    ],
                    examenFisico: [
                        "Conjuntiva hiperémica, secreción amarilla escasa",
                        "Agudeza visual 1.0 ambos ojos"
                    ],
                    diagnostico: ["Conjuntivitis bacteriana leve"],
                    plan: [
                        "Colirio antibiótico tópico según indicación, higiene ocular",
                        "Control ambulatorio en 48–72h"
                    ],
                    evolucion: [
                        "Secreción disminuye tras 3 días de tratamiento",
                        "Paciente estable, agudeza visual conservada"
                    ]
                },
                {
                    motivo: ["visión borrosa progresiva", "ceguera nocturna leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere disminución progresiva de visión y dificultad para ver de noche",
                        "Antecedentes de diabetes tipo 2 controlada"
                    ],
                    examenFisico: [
                        "Agudeza visual 0.6 OD, 0.7 OI",
                        "Fondo de ojo: microaneurismas y cambios retinianos leves"
                    ],
                    diagnostico: ["Retinopatía diabética leve"],
                    plan: [
                        "Control endocrinológico estricto, seguimiento oftalmológico trimestral",
                        "Educación sobre autocuidado y control glicémico"
                    ],
                    evolucion: [
                        "Visión estable, sin progresión de lesiones",
                        "Paciente adherente a control glucémico"
                    ]
                },
                {
                    motivo: ["dolor ocular post-trauma", "lagrimeo y edema leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere golpe en ojo derecho durante deporte, lagrimeo y edema leve",
                        "No pérdida visual significativa"
                    ],
                    examenFisico: [
                        "Edema leve palpebral, conjuntiva hiperémica, córnea intacta",
                        "Agudeza visual 0.9 OD, 1.0 OI"
                    ],
                    diagnostico: ["Contusión ocular leve"],
                    plan: [
                        "Compresas frías, analgésico si necesario, seguimiento ambulatorio en 48h",
                        "Evitar traumatismos adicionales"
                    ],
                    evolucion: [
                        "Edema y dolor disminuyen",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["visión doble ocasional", "cefalea leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere diplopía intermitente y cefalea leve",
                        "No antecedentes neurológicos relevantes"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, movimientos oculares normales",
                        "Fondo de ojo normal, pupilas reactivas"
                    ],
                    diagnostico: ["Diplopía funcional leve, sin causa estructural aparente"],
                    plan: [
                        "Seguimiento ambulatorio, ejercicios de enfoque ocular",
                        "Derivación a neurología si síntomas persisten"
                    ],
                    evolucion: [
                        "Diplopía disminuye con ejercicios y reposo",
                        "Paciente estable, sin hallazgos estructurales"
                    ]
                },
                {
                    motivo: ["ojos secos y ardor", "irritación leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere sequedad ocular y sensación de arenilla",
                        "Uso prolongado de pantallas y ambientes secos"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, lagrimeo disminuido",
                        "Conjuntiva ligeramente hiperémica"
                    ],
                    diagnostico: ["Síndrome de ojo seco leve"],
                    plan: [
                        "Lágrimas artificiales varias veces al día, pausas en uso de pantallas",
                        "Control ambulatorio si persiste irritación"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas de lubricación",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["pérdida súbita de visión periférica", "ceguera parcial temporal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere pérdida súbita de visión periférica temporal en ojo izquierdo",
                        "Antecedentes de hipertensión y hipercolesterolemia"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 1.0, OI 0.8, pupilas normales",
                        "Fondo de ojo: microinfartos retinianos compatibles con oclusión arterial"
                    ],
                    diagnostico: ["Oclusión arterial retiniana"],
                    plan: [
                        "Derivación urgente a oftalmología, tratamiento según protocolo",
                        "Control de factores de riesgo cardiovascular"
                    ],
                    evolucion: [
                        "Visión periférica parcialmente recuperada tras intervención temprana",
                        "Paciente estable, seguimiento oftalmológico estrecho"
                    ]
                }
            ]
            ,
            "Oftalmología": [
                {
                    motivo: ["visión borrosa unilateral", "irritación ocular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere visión borrosa en ojo derecho desde 3 días, sin dolor intenso",
                        "Antecedentes de hipertensión controlada, no diabético"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 0.6, OI 1.0, pupilas reactivas",
                        "Conjuntiva y córnea sin alteraciones, fondo de ojo normal"
                    ],
                    diagnostico: ["Queratitis leve por irritación ocular"],
                    plan: [
                        "Lágrimas artificiales según necesidad, higiene ocular",
                        "Control en 48h para evaluación de evolución"
                    ],
                    evolucion: [
                        "Síntomas disminuyen progresivamente",
                        "Visión normalizada, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor ocular y enrojecimiento", "secreción mucosa leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere ojo izquierdo rojo con secreción desde 2 días",
                        "No antecedentes de alergias ni trauma ocular"
                    ],
                    examenFisico: [
                        "Conjuntiva hiperémica, secreción mucosa escasa",
                        "Agudeza visual 1.0 en ambos ojos, fondo de ojo normal"
                    ],
                    diagnostico: ["Conjuntivitis viral leve"],
                    plan: [
                        "Higiene ocular, compresas frías, seguimiento ambulatorio en 48h",
                        "Evitar contacto con otras personas para prevenir contagio"
                    ],
                    evolucion: [
                        "Enrojecimiento y secreción disminuyen",
                        "Paciente estable, agudeza visual preservada"
                    ]
                },
                {
                    motivo: ["dolor ocular súbito", "visión borrosa transitoria"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor súbito en ojo derecho y visión borrosa intermitente",
                        "Antecedentes de glaucoma en familiar cercano"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 0.7, OI 1.0, pupilas normales",
                        "Presión intraocular 22 mmHg, sin alteraciones visibles en fondo de ojo"
                    ],
                    diagnostico: ["Glaucoma incipiente sospechado"],
                    plan: [
                        "Derivación a especialista para tonometría repetida y seguimiento",
                        "Educación sobre síntomas de alarma y cuidado ocular"
                    ],
                    evolucion: [
                        "Paciente estable, seguimiento programado",
                        "Presión intraocular controlada, agudeza visual estable"
                    ]
                },
                {
                    motivo: ["molestia ocular con luz intensa", "visión borrosa transitoria"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere fotofobia y visión borrosa al exponerse a luz intensa",
                        "Uso prolongado de pantallas, sin antecedentes patológicos"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, pupilas reactivas",
                        "Examen de córnea y cristalino normal, fondo de ojo normal"
                    ],
                    diagnostico: ["Fatiga ocular por sobreuso"],
                    plan: [
                        "Recomendaciones de higiene visual, pausas en uso de pantallas",
                        "Seguimiento ambulatorio si persisten síntomas"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas de higiene visual",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["secreción ocular amarilla", "prurito leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere secreción amarilla y picazón leve en ojo derecho desde 1 día",
                        "No antecedentes de alergias o trauma ocular"
                    ],
                    examenFisico: [
                        "Conjuntiva hiperémica, secreción amarilla escasa",
                        "Agudeza visual 1.0 ambos ojos"
                    ],
                    diagnostico: ["Conjuntivitis bacteriana leve"],
                    plan: [
                        "Colirio antibiótico tópico según indicación, higiene ocular",
                        "Control ambulatorio en 48–72h"
                    ],
                    evolucion: [
                        "Secreción disminuye tras 3 días de tratamiento",
                        "Paciente estable, agudeza visual conservada"
                    ]
                },
                {
                    motivo: ["visión borrosa progresiva", "ceguera nocturna leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere disminución progresiva de visión y dificultad para ver de noche",
                        "Antecedentes de diabetes tipo 2 controlada"
                    ],
                    examenFisico: [
                        "Agudeza visual 0.6 OD, 0.7 OI",
                        "Fondo de ojo: microaneurismas y cambios retinianos leves"
                    ],
                    diagnostico: ["Retinopatía diabética leve"],
                    plan: [
                        "Control endocrinológico estricto, seguimiento oftalmológico trimestral",
                        "Educación sobre autocuidado y control glicémico"
                    ],
                    evolucion: [
                        "Visión estable, sin progresión de lesiones",
                        "Paciente adherente a control glucémico"
                    ]
                },
                {
                    motivo: ["dolor ocular post-trauma", "lagrimeo y edema leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere golpe en ojo derecho durante deporte, lagrimeo y edema leve",
                        "No pérdida visual significativa"
                    ],
                    examenFisico: [
                        "Edema leve palpebral, conjuntiva hiperémica, córnea intacta",
                        "Agudeza visual 0.9 OD, 1.0 OI"
                    ],
                    diagnostico: ["Contusión ocular leve"],
                    plan: [
                        "Compresas frías, analgésico si necesario, seguimiento ambulatorio en 48h",
                        "Evitar traumatismos adicionales"
                    ],
                    evolucion: [
                        "Edema y dolor disminuyen",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["visión doble ocasional", "cefalea leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere diplopía intermitente y cefalea leve",
                        "No antecedentes neurológicos relevantes"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, movimientos oculares normales",
                        "Fondo de ojo normal, pupilas reactivas"
                    ],
                    diagnostico: ["Diplopía funcional leve, sin causa estructural aparente"],
                    plan: [
                        "Seguimiento ambulatorio, ejercicios de enfoque ocular",
                        "Derivación a neurología si síntomas persisten"
                    ],
                    evolucion: [
                        "Diplopía disminuye con ejercicios y reposo",
                        "Paciente estable, sin hallazgos estructurales"
                    ]
                },
                {
                    motivo: ["ojos secos y ardor", "irritación leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere sequedad ocular y sensación de arenilla",
                        "Uso prolongado de pantallas y ambientes secos"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, lagrimeo disminuido",
                        "Conjuntiva ligeramente hiperémica"
                    ],
                    diagnostico: ["Síndrome de ojo seco leve"],
                    plan: [
                        "Lágrimas artificiales varias veces al día, pausas en uso de pantallas",
                        "Control ambulatorio si persiste irritación"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas de lubricación",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["pérdida súbita de visión periférica", "ceguera parcial temporal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere pérdida súbita de visión periférica temporal en ojo izquierdo",
                        "Antecedentes de hipertensión y hipercolesterolemia"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 1.0, OI 0.8, pupilas normales",
                        "Fondo de ojo: microinfartos retinianos compatibles con oclusión arterial"
                    ],
                    diagnostico: ["Oclusión arterial retiniana"],
                    plan: [
                        "Derivación urgente a oftalmología, tratamiento según protocolo",
                        "Control de factores de riesgo cardiovascular"
                    ],
                    evolucion: [
                        "Visión periférica parcialmente recuperada tras intervención temprana",
                        "Paciente estable, seguimiento oftalmológico estrecho"
                    ]
                }
            ]
            ,
            "Optometría": [
                {
                    motivo: ["visión borrosa a distancia", "fatiga ocular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para ver de lejos desde hace 6 meses, molestias visuales al usar computadora",
                        "No antecedentes de enfermedades oculares"
                    ],
                    examenFisico: [
                        "Agudeza visual sin corrección: OD 0.6, OI 0.7",
                        "Refracción: OD -1.50, OI -1.25, pupilas normales"
                    ],
                    diagnostico: ["Miopía leve bilateral"],
                    plan: [
                        "Corrección óptica con lentes según refracción",
                        "Revisión optométrica en 12 meses"
                    ],
                    evolucion: [
                        "Visión corregida completamente con lentes",
                        "Paciente estable, sin progresión significativa"
                    ]
                },
                {
                    motivo: ["dificultad para enfocar de cerca", "fatiga ocular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para leer textos pequeños y sensación de cansancio ocular al final del día",
                        "Antecedentes de presbicia inicial"
                    ],
                    examenFisico: [
                        "Agudeza visual con corrección de lejos: OD 1.0, OI 1.0",
                        "Refracción cercana: necesidad de +1.00 dioptrías, pupilas normales"
                    ],
                    diagnostico: ["Presbicia incipiente"],
                    plan: [
                        "Corrección óptica para visión cercana, ejercicios de enfoque ocular",
                        "Revisión anual de agudeza visual"
                    ],
                    evolucion: [
                        "Paciente adapta correctamente lentes de lectura",
                        "Fatiga ocular disminuye con corrección"
                    ]
                },
                {
                    motivo: ["dolor ocular y enrojecimiento", "lagrimeo"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere enrojecimiento ocular y lagrimeo desde 2 días",
                        "No antecedentes de alergias, exposición reciente a polvo"
                    ],
                    examenFisico: [
                        "Conjuntiva hiperémica, córnea clara, agudeza visual 1.0 ambos ojos",
                        "Lagrimeo discreto, pupilas normales"
                    ],
                    diagnostico: ["Conjuntivitis alérgica leve"],
                    plan: [
                        "Lágrimas artificiales, evitar alérgenos conocidos",
                        "Control ambulatorio en 48–72h"
                    ],
                    evolucion: [
                        "Enrojecimiento y lagrimeo disminuyen",
                        "Paciente estable, visión conservada"
                    ]
                },
                {
                    motivo: ["visión doble ocasional", "fatiga visual"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere diplopía intermitente tras jornadas largas frente a pantalla",
                        "No antecedentes neurológicos"
                    ],
                    examenFisico: [
                        "Motilidad ocular normal, agudeza visual 1.0 ambos ojos",
                        "Pruebas de convergencia normales"
                    ],
                    diagnostico: ["Fatiga visual por esfuerzo acomodativo"],
                    plan: [
                        "Recomendaciones ergonómicas y pausas visuales",
                        "Ejercicios de enfoque ocular, revisión en 1 mes"
                    ],
                    evolucion: [
                        "Diplopía desaparece con medidas de higiene visual",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["dificultad visual nocturna", "ceguera parcial en penumbra"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para conducir de noche",
                        "Antecedentes familiares de catarata"
                    ],
                    examenFisico: [
                        "Agudeza visual: OD 0.8, OI 0.7, lente transparente con opacidades iniciales",
                        "Reflex pupilar normal, fondo de ojo normal"
                    ],
                    diagnostico: ["Catarata incipiente bilateral"],
                    plan: [
                        "Seguimiento optométrico y oftalmológico cada 6 meses",
                        "Educación sobre signos de progresión y seguridad al conducir"
                    ],
                    evolucion: [
                        "Síntomas leves estables, paciente adaptado con gafas",
                        "No progresión significativa en controles sucesivos"
                    ]
                },
                {
                    motivo: ["dolor ocular leve y visión borrosa", "uso prolongado de lentes de contacto"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere incomodidad ocular y visión borrosa transitoria",
                        "Uso de lentes de contacto diarios más de 10h"
                    ],
                    examenFisico: [
                        "Conjuntiva ligeramente hiperémica, córnea intacta",
                        "Agudeza visual 1.0 con corrección, pupilas normales"
                    ],
                    diagnostico: ["Irritación por lentes de contacto"],
                    plan: [
                        "Suspender uso prolongado, higiene y lubricación ocular",
                        "Revisión ambulatoria en 1 semana"
                    ],
                    evolucion: [
                        "Síntomas desaparecen tras reposo y lubricación",
                        "Paciente estable, tolerancia ocular adecuada"
                    ]
                },
                {
                    motivo: ["visión borrosa unilateral", "dolor ocular intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere visión borrosa en ojo izquierdo desde 1 semana",
                        "No antecedentes oculares significativos"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 1.0, OI 0.6",
                        "Fondo de ojo normal, pupilas reactivas"
                    ],
                    diagnostico: ["Astigmatismo leve unilateral"],
                    plan: [
                        "Corrección óptica con lentes, seguimiento optométrico en 6 meses",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Visión corregida satisfactoriamente",
                        "Paciente estable, sin progresión"
                    ]
                },
                {
                    motivo: ["ojo seco crónico", "sensación de arenilla"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere ojo seco crónico, sensación de arenilla y picazón",
                        "Trabajo en oficina con aire acondicionado, sin antecedentes de enfermedades autoinmunes"
                    ],
                    examenFisico: [
                        "Test de Schirmer: leve disminución de producción lagrimal",
                        "Conjuntiva levemente hiperémica, agudeza visual 1.0"
                    ],
                    diagnostico: ["Síndrome de ojo seco leve"],
                    plan: [
                        "Lágrimas artificiales frecuentes, humidificación ambiental",
                        "Control ambulatorio en 1 mes"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas de cuidado",
                        "Paciente estable, visión normal"
                    ]
                },
                {
                    motivo: ["mareos y visión borrosa transitoria", "fatiga ocular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere mareos leves y visión borrosa intermitente tras uso prolongado de pantallas",
                        "No antecedentes neurológicos o cardiovasculares"
                    ],
                    examenFisico: [
                        "Agudeza visual 1.0 ambos ojos, motilidad ocular normal",
                        "Pruebas de enfoque ocular normales"
                    ],
                    diagnostico: ["Fatiga visual por esfuerzo acomodativo"],
                    plan: [
                        "Recomendaciones ergonómicas, pausas visuales y ejercicios de enfoque",
                        "Seguimiento optométrico en 1 mes"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con medidas de higiene visual",
                        "Paciente estable, visión normalizada"
                    ]
                },
                {
                    motivo: ["visión borrosa bilateral", "ceguera parcial temporal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere visión borrosa gradual en ambos ojos",
                        "Antecedentes de hipertensión y diabetes tipo 2 controladas"
                    ],
                    examenFisico: [
                        "Agudeza visual OD 0.7, OI 0.7, fondo de ojo: microaneurismas y exudados retinianos leves",
                        "Reflex pupilar normal"
                    ],
                    diagnostico: ["Retinopatía diabética incipiente"],
                    plan: [
                        "Control glucémico estricto, seguimiento optométrico y oftalmológico trimestral",
                        "Educación sobre prevención de progresión"
                    ],
                    evolucion: [
                        "Paciente estable, sin progresión significativa",
                        "Visión corregida y conservada con seguimiento estricto"
                    ]
                }
            ]
            ,
            "Kinesiología": [
                {
                    motivo: ["dolor lumbar crónico", "rigidez matinal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar crónico desde 6 meses, rigidez matinal de 20 minutos",
                        "Sin antecedentes de trauma, actividad sedentaria"
                    ],
                    examenFisico: [
                        "Limitación leve en flexión lumbar, fuerza y sensibilidad normales",
                        "Marcha normal, sin dolor irradiado"
                    ],
                    diagnostico: ["Lumbalgia mecánica crónica leve"],
                    plan: [
                        "Ejercicios de fortalecimiento y estiramiento lumbar",
                        "Educación postural y ergonomía laboral, control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente, movilidad mejora",
                        "Paciente estable, adhesión al plan de ejercicios buena"
                    ]
                },
                {
                    motivo: ["dolor cervical y hombro", "tensión muscular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor cervical irradiado a hombro derecho",
                        "Trabajo en oficina, estrés laboral, postura prolongada frente a pantalla"
                    ],
                    examenFisico: [
                        "Limitación leve en rotación cervical derecha, dolor a palpación de trapecio y elevadores de escápula",
                        "Fuerza y sensibilidad normales"
                    ],
                    diagnostico: ["Cervicalgia con tensión muscular asociada"],
                    plan: [
                        "Terapia manual, estiramientos, ejercicios de fortalecimiento cervical",
                        "Educación postural y pausas activas durante jornada laboral"
                    ],
                    evolucion: [
                        "Dolor y tensión disminuyen",
                        "Movilidad cervical normalizada, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor de rodilla post-trauma deportivo", "edema leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor y edema en rodilla derecha tras caída jugando fútbol",
                        "Sin antecedentes de cirugías previas"
                    ],
                    examenFisico: [
                        "Rodilla con edema leve, dolor a palpación de ligamento colateral medial",
                        "Movilidad limitada por dolor, fuerza preservada"
                    ],
                    diagnostico: ["Esguince leve de ligamento colateral medial"],
                    plan: [
                        "Reposo relativo, crioterapia, ejercicios de movilidad progresiva",
                        "Seguimiento funcional en 1 semana"
                    ],
                    evolucion: [
                        "Dolor y edema disminuyen",
                        "Movilidad completa recuperada, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor de hombro post-ictus", "limitación funcional"],
                    anamnesis: [
                        "Paciente de ${edad} años post-ictus hemorrágico hace 1 mes, refiere limitación funcional en hombro derecho",
                        "Sin antecedentes de cirugías previas"
                    ],
                    examenFisico: [
                        "Limitación en abducción y rotación externa, fuerza 3/5",
                        "Reflejos preservados, sensibilidad disminuida distalmente"
                    ],
                    diagnostico: ["Dolor y limitación funcional post-ictus en hombro derecho"],
                    plan: [
                        "Terapia kinesiológica de movilización y fortalecimiento progresivo",
                        "Rehabilitación funcional supervisada, control semanal"
                    ],
                    evolucion: [
                        "Movilidad mejora gradualmente",
                        "Paciente logra funciones básicas de hombro, dolor controlado"
                    ]
                },
                {
                    motivo: ["rigidez articular y dolor en cadera", "limitación funcional leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere rigidez matinal de 15 minutos y dolor en cadera derecha",
                        "Actividad física moderada, sin antecedentes traumáticos"
                    ],
                    examenFisico: [
                        "Limitación leve en abducción y flexión de cadera derecha",
                        "Fuerza preservada, marcha normal"
                    ],
                    diagnostico: ["Osteoartritis leve de cadera derecha"],
                    plan: [
                        "Ejercicios de movilidad y fortalecimiento, fisioterapia acuática",
                        "Educación sobre higiene articular y analgesia según necesidad"
                    ],
                    evolucion: [
                        "Dolor disminuye y movilidad mejora",
                        "Paciente estable, adherente a plan de ejercicios"
                    ]
                },
                {
                    motivo: ["dolor lumbar post-embarazo", "fatiga muscular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar desde hace 2 meses postparto",
                        "Sin antecedentes de trauma, actividad física limitada durante embarazo"
                    ],
                    examenFisico: [
                        "Dolor a palpación lumbar, fuerza y sensibilidad normales",
                        "Limitación leve en flexión, movilidad global conservada"
                    ],
                    diagnostico: ["Lumbalgia postparto leve"],
                    plan: [
                        "Ejercicios de fortalecimiento abdominal y lumbar, estiramientos",
                        "Educación postural, control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor lumbar disminuye progresivamente",
                        "Paciente estable, movilidad normalizada"
                    ]
                },
                {
                    motivo: ["edema y dolor de tobillo post-esguince", "limitación funcional"],
                    anamnesis: [
                        "Paciente de ${edad}s años refiere dolor y edema en tobillo derecho tras esguince hace 3 días",
                        "No antecedentes de fracturas previas"
                    ],
                    examenFisico: [
                        "Edema moderado, dolor a palpación de ligamentos laterales",
                        "Movilidad limitada por dolor, fuerza preservada"
                    ],
                    diagnostico: ["Esguince lateral de tobillo grado I-II"],
                    plan: [
                        "Reposo relativo, crioterapia, ejercicios de movilidad progresiva",
                        "Seguimiento kinesiológico en 1 semana"
                    ],
                    evolucion: [
                        "Edema y dolor disminuyen",
                        "Movilidad recuperada, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor cervical crónico y cefalea tensional", "rigidez"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor cervical crónico y cefalea tensional desde hace 6 meses",
                        "Trabajo frente a computadora, estrés laboral"
                    ],
                    examenFisico: [
                        "Limitación leve en flexión y rotación cervical, palpación dolorosa de trapecio y músculos paravertebrales",
                        "Fuerza y sensibilidad normales"
                    ],
                    diagnostico: ["Cervicalgia crónica con cefalea tensional asociada"],
                    plan: [
                        "Terapia manual, estiramientos, fortalecimiento cervical",
                        "Educación postural, pausas activas, control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente",
                        "Paciente estable, mejora de cefalea y movilidad cervical"
                    ]
                },
                {
                    motivo: ["dolor de hombro por sobreuso", "limitación funcional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor en hombro derecho tras entrenamiento intenso de levantamiento de pesas",
                        "No antecedentes de trauma"
                    ],
                    examenFisico: [
                        "Dolor a palpación de tendones del manguito rotador, limitación leve en abducción",
                        "Fuerza preservada, reflejos normales"
                    ],
                    diagnostico: ["Tendinopatía del manguito rotador leve"],
                    plan: [
                        "Terapia física de fortalecimiento y estiramiento, reducción de carga de entrenamiento",
                        "Control funcional en 2 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye y movilidad mejora",
                        "Paciente estable, reincorporación progresiva a entrenamiento"
                    ]
                },
                {
                    motivo: ["rigidez matinal y dolor articular", "limitación funcional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere rigidez matinal de 20 minutos y dolor en articulaciones de manos y muñecas",
                        "Actividad física regular, sin antecedentes traumáticos"
                    ],
                    examenFisico: [
                        "Movilidad de articulaciones de manos limitada leve, dolor a palpación en articulaciones interfalángicas proximales",
                        "Fuerza preservada, sin deformidades"
                    ],
                    diagnostico: ["Osteoartritis leve de manos"],
                    plan: [
                        "Ejercicios de movilidad y fortalecimiento, fisioterapia manual",
                        "Educación sobre higiene articular, control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye y movilidad mejora",
                        "Paciente estable, adherente al plan terapéutico"
                    ]
                }
            ]
            ,
            "Fisiatría": [
                {
                    motivo: ["dolor lumbar crónico", "limitación funcional leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar crónico desde hace 1 año, dificultad para agacharse",
                        "Trabajo sedentario, sin antecedentes traumáticos"
                    ],
                    examenFisico: [
                        "Limitación leve en flexión y extensión lumbar, fuerza preservada",
                        "Movilidad de caderas conservada, reflejos normales"
                    ],
                    diagnostico: ["Lumbalgia mecánica crónica"],
                    plan: [
                        "Programa de rehabilitación lumbar: fortalecimiento, estiramiento y educación postural",
                        "Control funcional en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente, movilidad mejora",
                        "Paciente estable, adherente al plan de ejercicios"
                    ]
                },
                {
                    motivo: ["dolor cervical post-trauma", "rigidez y cefalea"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor cervical y rigidez tras accidente vehicular hace 2 semanas",
                        "Cefalea leve y mareos ocasionales"
                    ],
                    examenFisico: [
                        "Limitación en rotación y flexión cervical, palpación dolorosa de trapecio",
                        "Fuerza y sensibilidad normales, reflejos conservados"
                    ],
                    diagnostico: ["Cervicalgia post-traumática leve"],
                    plan: [
                        "Fisioterapia de movilización cervical, estiramientos y fortalecimiento muscular",
                        "Educación postural y control funcional semanal"
                    ],
                    evolucion: [
                        "Dolor y rigidez disminuyen progresivamente",
                        "Paciente estable, movilidad cervical casi normal"
                    ]
                },
                {
                    motivo: ["dolor de rodilla crónico", "limitación funcional para subir escaleras"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor en rodilla derecha desde hace 2 años, aumento al subir escaleras",
                        "Actividad física moderada, antecedentes de sobrepeso"
                    ],
                    examenFisico: [
                        "Movilidad de rodilla limitada en flexión, dolor a palpación de ligamento colateral medial",
                        "Fuerza preservada, sin signos de inestabilidad"
                    ],
                    diagnostico: ["Osteoartritis leve de rodilla derecha"],
                    plan: [
                        "Programa de fisioterapia de fortalecimiento de cuádriceps, estiramientos y entrenamiento funcional",
                        "Control funcional en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye y funcionalidad mejora",
                        "Paciente estable, adherente a plan de ejercicios"
                    ]
                },
                {
                    motivo: ["limitación funcional post-ictus", "hemiparesia derecha leve"],
                    anamnesis: [
                        "Paciente de ${edad} años post-ictus hace 1 mes, refiere dificultad para movimientos finos y marcha inestable",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Fuerza 4/5 en extremidad superior e inferior derecha",
                        "Marcha asistida, tono muscular aumentado leve"
                    ],
                    diagnostico: ["Hemiparesia derecha post-ictus"],
                    plan: [
                        "Rehabilitación integral: fortalecimiento, movilidad y equilibrio",
                        "Control semanal en clínica de fisiatría"
                    ],
                    evolucion: [
                        "Fuerza y movilidad mejoran progresivamente",
                        "Paciente logra independencia parcial en actividades diarias"
                    ]
                },
                {
                    motivo: ["dolor lumbar y ciática leve", "limitación funcional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar irradiado a pierna izquierda desde hace 3 meses",
                        "No antecedentes traumáticos"
                    ],
                    examenFisico: [
                        "Flexión lumbar limitada por dolor, reflejo aquileo conservado",
                        "Fuerza y sensibilidad normales"
                    ],
                    diagnostico: ["Lumbociática leve crónica"],
                    plan: [
                        "Programa de fisioterapia lumbar y neuromuscular, estiramiento de isquiotibiales",
                        "Educación sobre postura y ergonomía laboral"
                    ],
                    evolucion: [
                        "Dolor disminuye y movilidad mejora",
                        "Paciente estable, adherente a ejercicios domiciliarios"
                    ]
                },
                {
                    motivo: ["dolor de hombro crónico", "limitación funcional para levantar objetos"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor en hombro derecho desde hace 6 meses, dificultad para levantar objetos por encima de la cabeza",
                        "Actividad laboral con levantamiento repetitivo"
                    ],
                    examenFisico: [
                        "Limitación en abducción y rotación externa, fuerza 4/5",
                        "Palpación dolorosa de tendones del manguito rotador"
                    ],
                    diagnostico: ["Tendinopatía crónica de manguito rotador derecho"],
                    plan: [
                        "Fisioterapia: fortalecimiento del manguito rotador, estiramientos y ejercicios funcionales",
                        "Control funcional en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor y limitación funcional disminuyen",
                        "Paciente estable, reincorporación progresiva a actividades laborales"
                    ]
                },
                {
                    motivo: ["rigidez matinal y dolor articular", "limitación funcional leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere rigidez matinal de 20 minutos y dolor en articulaciones de rodillas y caderas",
                        "Actividad física moderada, sin antecedentes traumáticos"
                    ],
                    examenFisico: [
                        "Movilidad de rodillas y caderas limitada leve, dolor a palpación",
                        "Fuerza preservada, marcha conservada"
                    ],
                    diagnostico: ["Osteoartritis leve de rodillas y caderas"],
                    plan: [
                        "Programa de fortalecimiento y movilidad articular, fisioterapia acuática",
                        "Educación sobre higiene articular, control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye y movilidad mejora",
                        "Paciente estable, adherente al plan terapéutico"
                    ]
                },
                {
                    motivo: ["dolor lumbar post-embarazo", "fatiga muscular y debilidad abdominal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar desde hace 2 meses postparto",
                        "Actividad física limitada durante embarazo"
                    ],
                    examenFisico: [
                        "Dolor a palpación lumbar, debilidad leve en músculos abdominales profundos",
                        "Movilidad global conservada"
                    ],
                    diagnostico: ["Lumbalgia postparto con debilidad abdominal"],
                    plan: [
                        "Rehabilitación de fortalecimiento abdominal y lumbar, ejercicios posturales",
                        "Control funcional en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor lumbar disminuye y fuerza abdominal mejora",
                        "Paciente estable, movilidad normalizada"
                    ]
                },
                {
                    motivo: ["edema y dolor de tobillo post-esguince", "limitación funcional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor y edema en tobillo izquierdo tras esguince hace 3 días",
                        "No antecedentes de fracturas previas"
                    ],
                    examenFisico: [
                        "Edema moderado, dolor a palpación de ligamentos laterales",
                        "Movilidad limitada por dolor, fuerza preservada"
                    ],
                    diagnostico: ["Esguince lateral de tobillo grado I-II"],
                    plan: [
                        "Reposo relativo, crioterapia, ejercicios de movilidad progresiva",
                        "Seguimiento funcional en 1 semana"
                    ],
                    evolucion: [
                        "Edema y dolor disminuyen",
                        "Movilidad recuperada, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor cervical crónico y cefalea tensional", "rigidez"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor cervical crónico y cefalea tensional desde hace 6 meses",
                        "Trabajo frente a computadora, estrés laboral"
                    ],
                    examenFisico: [
                        "Limitación leve en flexión y rotación cervical, palpación dolorosa de trapecio y músculos paravertebrales",
                        "Fuerza y sensibilidad normales"
                    ],
                    diagnostico: ["Cervicalgia crónica con cefalea tensional asociada"],
                    plan: [
                        "Terapia manual, estiramientos, fortalecimiento cervical",
                        "Educación postural, pausas activas, control en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente",
                        "Paciente estable, mejora de cefalea y movilidad cervical"
                    ]
                }
            ],
            "Endocrinología": [
                {
                    motivo: ["sed intensa y poliuria", "fatiga general"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aumento de sed, poliuria y fatiga desde hace 2 semanas",
                        "Antecedentes familiares de diabetes tipo 2"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, IMC 28 kg/m²",
                        "Signos vitales normales, sin hallazgos físicos relevantes"
                    ],
                    diagnostico: ["Diabetes mellitus tipo 2 de reciente diagnóstico"],
                    plan: [
                        "Inicio de dieta hipocalórica y ejercicio regular, medicación hipoglucemiante oral",
                        "Educación sobre autocontrol glucémico, control en 1 mes"
                    ],
                    evolucion: [
                        "Glucemia controlada con cambios de estilo de vida y medicación",
                        "Paciente estable, sin complicaciones agudas"
                    ]
                },
                {
                    motivo: ["pérdida de peso involuntaria", "palpitaciones y sudoración"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere pérdida de 5 kg en 2 meses, palpitaciones y sudoración excesiva",
                        "No antecedentes de enfermedades crónicas"
                    ],
                    examenFisico: [
                        "TA 125/75 mmHg, FC 90 lpm, temblor fino distal",
                        "No bocio evidente, reflejos aumentados"
                    ],
                    diagnostico: ["Hipertiroidismo leve"],
                    plan: [
                        "Solicitar perfil tiroideo completo, seguimiento endocrinológico",
                        "Educación sobre signos de alarma y control de síntomas"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con tratamiento médico iniciado",
                        "Paciente estable, control bioquímico adecuado"
                    ]
                },
                {
                    motivo: ["fatiga y aumento de peso", "piel seca y caída de cabello"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aumento de peso progresivo y fatiga desde 6 meses",
                        "No antecedentes de enfermedades tiroideas"
                    ],
                    examenFisico: [
                        "TA 135/85 mmHg, FC 72 lpm, piel seca y cabello frágil",
                        "Bradicardia leve, sin bocio"
                    ],
                    diagnostico: ["Hipotiroidismo primario leve"],
                    plan: [
                        "Iniciar levotiroxina según peso, seguimiento clínico y bioquímico en 6 semanas",
                        "Educación sobre adherencia y signos de hipotiroidismo"
                    ],
                    evolucion: [
                        "Fatiga y piel mejoran progresivamente",
                        "Paciente estable, parámetros tiroideos normalizados"
                    ]
                },
                {
                    motivo: ["sed intensa y poliuria nocturna", "visión borrosa"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aumento de sed, poliuria nocturna y visión borrosa reciente",
                        "Antecedentes de hipertensión y obesidad"
                    ],
                    examenFisico: [
                        "TA 140/85 mmHg, IMC 31 kg/m²",
                        "Agudeza visual levemente disminuida, sin hallazgos neurológicos"
                    ],
                    diagnostico: ["Diabetes mellitus tipo 2 descompensada"],
                    plan: [
                        "Ajuste de medicación hipoglucemiante, educación en dieta y autocontrol glucémico",
                        "Revisión en 1 semana, control de complicaciones"
                    ],
                    evolucion: [
                        "Glucemia mejora con ajuste terapéutico",
                        "Paciente estable, visión normalizada tras control glucémico"
                    ]
                },
                {
                    motivo: ["aumento de peso y fatiga", "intolerancia al frío"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aumento de peso de 6 kg en 3 meses, fatiga y frío constante",
                        "Antecedentes familiares de hipotiroidismo"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 70 lpm, piel seca y cabello fino",
                        "Reflejos tardíos, sin bocio palpable"
                    ],
                    diagnostico: ["Hipotiroidismo subclínico"],
                    plan: [
                        "Inicio de levotiroxina según peso y seguimiento clínico",
                        "Control bioquímico en 6–8 semanas"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con tratamiento",
                        "Paciente estable, parámetros tiroideos normalizados"
                    ]
                },
                {
                    motivo: ["sed excesiva y cansancio", "infecciones frecuentes"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere sed intensa, fatiga y infecciones urinarias recurrentes",
                        "Antecedentes de hipertensión y sobrepeso"
                    ],
                    examenFisico: [
                        "TA 135/85 mmHg, FC 80 lpm, IMC 30 kg/m²",
                        "Signos vitales estables, abdomen sin hallazgos"
                    ],
                    diagnostico: ["Diabetes mellitus tipo 2 complicada con infecciones urinarias leves"],
                    plan: [
                        "Ajuste de medicación, educación en autocuidado y control glucémico",
                        "Control en 1 mes y seguimiento de infecciones"
                    ],
                    evolucion: [
                        "Glucemia controlada, infecciones resueltas",
                        "Paciente estable, adherente al tratamiento"
                    ]
                },
                {
                    motivo: ["aumento de peso y fatiga progresiva", "estreñimiento y piel seca"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aumento de peso de 5 kg en 4 meses, fatiga, estreñimiento y piel seca",
                        "Sin antecedentes de enfermedades crónicas"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 68 lpm, piel seca y cabello quebradizo",
                        "Bradicardia leve, sin bocio palpable"
                    ],
                    diagnostico: ["Hipotiroidismo primario moderado"],
                    plan: [
                        "Iniciar levotiroxina ajustada al peso y control bioquímico en 6 semanas",
                        "Educación sobre signos de alarma y adherencia"
                    ],
                    evolucion: [
                        "Síntomas mejoran progresivamente",
                        "Paciente estable, parámetros tiroideos normalizados"
                    ]
                },
                {
                    motivo: ["palpitaciones y ansiedad", "pérdida de peso rápida"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere palpitaciones frecuentes, ansiedad y pérdida de 4 kg en 1 mes",
                        "No antecedentes cardíacos"
                    ],
                    examenFisico: [
                        "TA 125/75 mmHg, FC 95 lpm, temblor distal fino",
                        "Bocio discreto, reflejos aumentados"
                    ],
                    diagnostico: ["Hipertiroidismo leve"],
                    plan: [
                        "Solicitar perfil tiroideo completo, seguimiento endocrinológico",
                        "Educación sobre signos de alarma y control de síntomas"
                    ],
                    evolucion: [
                        "Síntomas disminuyen tras inicio de tratamiento médico",
                        "Paciente estable, control bioquímico adecuado"
                    ]
                },
                {
                    motivo: ["sed intensa y poliuria", "visión borrosa leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aumento de sed y poliuria desde hace 3 semanas",
                        "Antecedentes de hipertensión y sobrepeso"
                    ],
                    examenFisico: [
                        "TA 140/85 mmHg, FC 78 lpm, IMC 32 kg/m²",
                        "Agudeza visual levemente disminuida, sin hallazgos neurológicos"
                    ],
                    diagnostico: ["Diabetes mellitus tipo 2 de reciente diagnóstico"],
                    plan: [
                        "Educación en autocontrol glucémico, dieta y ejercicio, ajuste de medicación",
                        "Revisión en 1 semana, control de complicaciones"
                    ],
                    evolucion: [
                        "Glucemia estabilizada, visión normalizada",
                        "Paciente estable, adherente al tratamiento"
                    ]
                },
                {
                    motivo: ["fatiga, aumento de peso y estreñimiento", "piel seca y caída de cabello"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere fatiga, aumento de peso y estreñimiento progresivo",
                        "Antecedentes familiares de hipotiroidismo"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 70 lpm, piel seca y cabello frágil",
                        "Bradicardia leve, sin bocio palpable"
                    ],
                    diagnostico: ["Hipotiroidismo moderado"],
                    plan: [
                        "Iniciar levotiroxina según peso, seguimiento clínico y bioquímico en 6 semanas",
                        "Educación sobre adherencia y signos de alarma"
                    ],
                    evolucion: [
                        "Síntomas disminuyen progresivamente",
                        "Paciente estable, parámetros tiroideos normalizados"
                    ]
                }
            ],
            "Gastroenterología": [
                {
                    motivo: ["dolor abdominal epigástrico", "ardor y reflujo"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor epigástrico intermitente y ardor después de las comidas",
                        "Antecedentes de gastritis crónica, consumo regular de café"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve a palpación epigástrica, sin masas ni visceromegalias",
                        "Ruidos intestinales normales"
                    ],
                    diagnostico: ["Gastritis crónica leve, probable reflujo gastroesofágico"],
                    plan: [
                        "Inhibidor de bomba de protones por 8 semanas, dieta modificada y evitar irritantes",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor y ardor disminuyen con tratamiento",
                        "Paciente estable, adherente a dieta y medicación"
                    ]
                },
                {
                    motivo: ["diarrea crónica", "distensión abdominal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere diarrea crónica de 2 meses y distensión abdominal",
                        "Antecedentes de colon irritable y dieta irregular"
                    ],
                    examenFisico: [
                        "Abdomen blando, ligero meteorismo, sin dolor a la palpación profunda",
                        "Ruidos intestinales normales"
                    ],
                    diagnostico: ["Síndrome de intestino irritable tipo diarrea predominante"],
                    plan: [
                        "Educación sobre hábitos alimentarios, dieta baja en FODMAPs, seguimiento nutricional",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Diarrea disminuye con cambios de dieta",
                        "Paciente estable, adherente a recomendaciones nutricionales"
                    ]
                },
                {
                    motivo: ["ictericia leve", "orina oscura"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere color amarillento de piel y orina oscura desde 1 semana",
                        "Antecedentes de hepatopatía leve por alcohol"
                    ],
                    examenFisico: [
                        "Ictericia leve en piel y escleras, abdomen blando, hígado palpable 1 cm por debajo de reborde costal",
                        "Sin dolor a la palpación"
                    ],
                    diagnostico: ["Hepatitis leve probable de etiología alcohólica"],
                    plan: [
                        "Abstenerse de alcohol, seguimiento bioquímico hepático en 1 semana",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Ictericia y orina normalizan progresivamente",
                        "Paciente estable, función hepática controlada"
                    ]
                },
                {
                    motivo: ["dolor abdominal derecho", "náuseas"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor en hipocondrio derecho y náuseas desde 3 días",
                        "No antecedentes quirúrgicos, consumo moderado de grasas"
                    ],
                    examenFisico: [
                        "Dolor a palpación en cuadrante superior derecho, sin rebote ni defensa",
                        "Murphy negativo, abdomen blando"
                    ],
                    diagnostico: ["Colecistitis leve sospechada, seguimiento imagenológico"],
                    plan: [
                        "Ecografía abdominal, analgesia y control ambulatorio según resultados",
                        "Educación sobre dieta baja en grasas"
                    ],
                    evolucion: [
                        "Dolor disminuye tras dieta y analgesia",
                        "Paciente estable, pendiente de resultados ecográficos"
                    ]
                },
                {
                    motivo: ["estreñimiento crónico", "distensión abdominal"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere estreñimiento crónico y distensión abdominal recurrente",
                        "Dieta baja en fibra, actividad física limitada"
                    ],
                    examenFisico: [
                        "Abdomen blando, distendido, sin dolor a palpación",
                        "Ruidos intestinales disminuidos"
                    ],
                    diagnostico: ["Estreñimiento crónico funcional"],
                    plan: [
                        "Aumento de ingesta de fibra, hidratación y ejercicios físicos regulares",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Frecuencia intestinal mejora progresivamente",
                        "Paciente estable, adherente a medidas de estilo de vida"
                    ]
                },
                {
                    motivo: ["diarrea intermitente", "dolor abdominal difuso"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere diarrea intermitente y dolor abdominal difuso desde 2 meses",
                        "Antecedentes de colon irritable y estrés laboral"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve difuso a palpación",
                        "Ruidos intestinales normales"
                    ],
                    diagnostico: ["Síndrome de intestino irritable tipo mixto"],
                    plan: [
                        "Modificación dietética, manejo del estrés, seguimiento nutricional",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Síntomas abdominales disminuyen con dieta y manejo del estrés",
                        "Paciente estable y adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["reflujo y pirosis frecuentes", "regurgitación nocturna"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere reflujo frecuente y sensación de ardor nocturno",
                        "Antecedentes de sobrepeso y consumo regular de café y alcohol"
                    ],
                    examenFisico: [
                        "Abdomen blando, sin dolor a palpación",
                        "IMC 28 kg/m², sin signos de alarma"
                    ],
                    diagnostico: ["Enfermedad por reflujo gastroesofágico leve"],
                    plan: [
                        "Inhibidor de bomba de protones por 8 semanas, dieta y cambios de hábitos",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Síntomas de reflujo disminuyen significativamente",
                        "Paciente estable, adherente a cambios de estilo de vida"
                    ]
                },
                {
                    motivo: ["dolor abdominal epigástrico y náuseas", "sensación de plenitud"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor epigástrico, náuseas y sensación de plenitud postprandial",
                        "Antecedentes de gastritis crónica"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve a palpación epigástrica",
                        "Murmullo intestinal conservado"
                    ],
                    diagnostico: ["Dispepsia funcional"],
                    plan: [
                        "Inhibidor de bomba de protones por 4 semanas, dieta fraccionada y evitar irritantes",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor y plenitud postprandial disminuyen",
                        "Paciente estable, adherente a medicación y dieta"
                    ]
                },
                {
                    motivo: ["diarrea aguda y dolor abdominal", "fiebre leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere diarrea aguda y dolor abdominal desde 2 días, fiebre leve",
                        "Antecedentes de consumo de alimentos fuera de casa recientemente"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor difuso leve, signos de deshidratación leve",
                        "Ruidos intestinales normales"
                    ],
                    diagnostico: ["Gastroenteritis aguda leve"],
                    plan: [
                        "Hidratación oral abundante, dieta blanda y seguimiento ambulatorio",
                        "Control clínico en 48–72 horas"
                    ],
                    evolucion: [
                        "Diarrea y dolor abdominal resuelven progresivamente",
                        "Paciente estable, hidratación adecuada"
                    ]
                },
                {
                    motivo: ["ictericia leve y fatiga", "orina oscura"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere ictericia leve, fatiga y orina oscura desde 1 semana",
                        "Antecedentes de hepatopatía leve por alcohol"
                    ],
                    examenFisico: [
                        "Ictericia leve, abdomen blando sin dolor a palpación",
                        "Hepatomegalia leve, sin ascitis"
                    ],
                    diagnostico: ["Hepatitis leve probable, seguimiento bioquímico"],
                    plan: [
                        "Abstenerse de alcohol, seguimiento de pruebas hepáticas en 1 semana",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Ictericia y fatiga disminuyen progresivamente",
                        "Paciente estable, función hepática controlada"
                    ]
                }
            ]
            ,
            "Dermatología": [
                {
                    motivo: ["erupción en manos", "prurito leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere erupción en manos con prurito leve desde hace 3 días",
                        "Antecedentes de dermatitis atópica, exposición a detergentes"
                    ],
                    examenFisico: [
                        "Placas eritematosas con descamación leve en dorso de manos",
                        "No vesículas, sin signos de infección"
                    ],
                    diagnostico: ["Dermatitis de contacto leve"],
                    plan: [
                        "Crema emoliente y corticoide tópico de baja potencia",
                        "Evitar exposición a irritantes, control en 2 semanas"
                    ],
                    evolucion: [
                        "Prurito y erupción disminuyen progresivamente",
                        "Paciente estable, piel hidratada y sin lesiones activas"
                    ]
                },
                {
                    motivo: ["acné en rostro", "lesiones inflamatorias"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aparición de pápulas y pústulas en rostro desde hace 3 meses",
                        "Antecedentes familiares de acné, piel grasa"
                    ],
                    examenFisico: [
                        "Pápulas y pústulas inflamatorias en mejillas y frente",
                        "No cicatrices ni signos de infección secundaria"
                    ],
                    diagnostico: ["Acné inflamatorio leve a moderado"],
                    plan: [
                        "Gel de peróxido de benzoilo, limpieza facial adecuada, evitar manipulación de lesiones",
                        "Control dermatológico en 4 semanas"
                    ],
                    evolucion: [
                        "Lesiones inflamatorias disminuyen, sin nuevas apariciones",
                        "Paciente estable, adherente al tratamiento"
                    ]
                },
                {
                    motivo: ["manchas hipopigmentadas en brazos", "prurito ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aparición de manchas claras en brazos desde 2 meses",
                        "No antecedentes familiares de vitiligo"
                    ],
                    examenFisico: [
                        "Máculas hipopigmentadas irregulares en antebrazos, sin descamación ni inflamación",
                        "No lesiones en otras áreas"
                    ],
                    diagnostico: ["Vitiligo incipiente"],
                    plan: [
                        "Protección solar estricta, crema emoliente y seguimiento dermatológico",
                        "Control en 6 semanas para evaluar evolución"
                    ],
                    evolucion: [
                        "Lesiones estables, sin expansión significativa",
                        "Paciente estable, adherente a medidas de fotoprotección"
                    ]
                },
                {
                    motivo: ["erupción en tronco", "prurito intenso"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere erupción generalizada en tronco con prurito intenso desde hace 1 semana",
                        "No antecedentes de alergias conocidas"
                    ],
                    examenFisico: [
                        "Pápulas eritematosas y excoriaciones secundarias en tronco",
                        "No vesículas, sin signos de infección"
                    ],
                    diagnostico: ["Dermatitis alérgica aguda leve"],
                    plan: [
                        "Antihistamínico oral, corticoide tópico de baja potencia",
                        "Evitar posibles alérgenos, control en 1 semana"
                    ],
                    evolucion: [
                        "Prurito y erupción disminuyen progresivamente",
                        "Paciente estable, sin nuevas lesiones"
                    ]
                },
                {
                    motivo: ["lesión nodular en pierna", "dolor leve al tacto"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aparición de nódulo indoloro en pierna izquierda desde 1 mes",
                        "No antecedentes traumáticos ni infecciones recientes"
                    ],
                    examenFisico: [
                        "Nódulo subcutáneo de 1.5 cm, firme, móvil, sin signos inflamatorios",
                        "Piel circundante normal"
                    ],
                    diagnostico: ["Lipoma subcutáneo benigno"],
                    plan: [
                        "Observación clínica, resección solo si aumenta de tamaño o genera molestias",
                        "Control en 3 meses"
                    ],
                    evolucion: [
                        "Lesión estable, sin crecimiento ni complicaciones",
                        "Paciente estable, seguimiento ambulatorio"
                    ]
                },
                {
                    motivo: ["erupción vesicular en tronco", "prurito moderado"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere erupción con pequeñas vesículas en tronco desde 5 días",
                        "No antecedentes de varicela reciente, contacto con familiares sanos"
                    ],
                    examenFisico: [
                        "Vesículas superficiales en base eritematosa, distribución lineal en tronco",
                        "No lesiones en extremidades"
                    ],
                    diagnostico: ["Herpes zóster leve"],
                    plan: [
                        "Antivirales orales según protocolo, analgesia y seguimiento dermatológico",
                        "Educación sobre contagio y cuidado de lesiones"
                    ],
                    evolucion: [
                        "Lesiones comienzan a secarse, dolor disminuye",
                        "Paciente estable, sin complicaciones neurológicas"
                    ]
                },
                {
                    motivo: ["prurito generalizado", "erupciones pequeñas en abdomen"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere prurito generalizado y pequeñas pápulas en abdomen desde 2 semanas",
                        "Antecedentes de alergia estacional"
                    ],
                    examenFisico: [
                        "Pápulas eritematosas pequeñas en abdomen y tronco, excoriaciones leves",
                        "No vesículas ni signos de infección"
                    ],
                    diagnostico: ["Urticaria aguda leve"],
                    plan: [
                        "Antihistamínicos orales, evitar alérgenos potenciales",
                        "Control dermatológico en 1 semana"
                    ],
                    evolucion: [
                        "Prurito y lesiones disminuyen significativamente",
                        "Paciente estable, adherente al tratamiento"
                    ]
                },
                {
                    motivo: ["lesión pigmentada en cara", "crecimiento lento"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere mancha oscura en mejilla derecha desde hace 6 meses, crecimiento lento",
                        "No antecedentes familiares de melanoma"
                    ],
                    examenFisico: [
                        "Mácula pigmentar bien delimitada de 0.8 cm, simétrica, superficie lisa",
                        "No adenopatías palpables"
                    ],
                    diagnostico: ["Lentigo benigno"],
                    plan: [
                        "Observación clínica, fotoprotección estricta",
                        "Control dermatológico en 6 meses"
                    ],
                    evolucion: [
                        "Lesión estable, sin cambios en tamaño ni color",
                        "Paciente estable, adherente a fotoprotección"
                    ]
                },
                {
                    motivo: ["lesión roja en antebrazo", "prurito leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aparición de placa eritematosa en antebrazo derecho desde 1 semana",
                        "Contacto reciente con plantas en jardín"
                    ],
                    examenFisico: [
                        "Placa eritematosa, leve descamación periférica, sin vesículas",
                        "No adenopatías, extremidades sin otras lesiones"
                    ],
                    diagnostico: ["Dermatitis de contacto leve por planta"],
                    plan: [
                        "Crema emoliente y corticoide tópico de baja potencia, evitar contacto con irritante",
                        "Control en 2 semanas"
                    ],
                    evolucion: [
                        "Lesión y prurito disminuyen progresivamente",
                        "Paciente estable, sin nuevas lesiones"
                    ]
                },
                {
                    motivo: ["manchas oscuras en cuello", "asintomáticas"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere aparición de manchas oscuras en pliegue cervical desde 3 meses",
                        "Antecedentes de obesidad y resistencia insulínica"
                    ],
                    examenFisico: [
                        "Placas hiperpigmentadas, engrosadas, textura aterciopelada en cuello y axilas",
                        "Sin otras lesiones cutáneas"
                    ],
                    diagnostico: ["Acantosis nigricans asociada a resistencia a insulina"],
                    plan: [
                        "Control metabólico, pérdida de peso, seguimiento endocrinológico y dermatológico",
                        "Control clínico en 1 mes"
                    ],
                    evolucion: [
                        "Placas estables, textura ligeramente mejorada con cuidados de piel y control metabólico",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                }
            ],
            "Nefrología": [
                {
                    motivo: ["edema en extremidades inferiores", "fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere hinchazón en tobillos y pies desde hace 2 semanas, fatiga leve",
                        "Antecedentes de hipertensión arterial controlada"
                    ],
                    examenFisico: [
                        "Edema maleolar bilateral, TA 140/85 mmHg, FC 78 lpm",
                        "Abdomen blando, sin dolor ni masas"
                    ],
                    diagnostico: ["Insuficiencia renal crónica leve, probable por hipertensión"],
                    plan: [
                        "Control de TA, restricción de sodio, monitorización de función renal y proteínas en orina",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Edema disminuye con medidas antihipertensivas y dieta",
                        "Paciente estable, función renal conservada"
                    ]
                },
                {
                    motivo: ["orina espumosa", "hinchazón leve facial"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere orina espumosa y edema leve en cara desde hace 1 mes",
                        "Sin antecedentes de enfermedad renal previa"
                    ],
                    examenFisico: [
                        "Edema palpebral leve, TA 130/80 mmHg",
                        "Abdomen blando, sin masas ni dolor"
                    ],
                    diagnostico: ["Síndrome nefrótico leve, probable glomerulonefritis"],
                    plan: [
                        "Analítica completa renal, restricción de sodio, control semanal de proteínas en orina",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Edema y proteinuria disminuyen con tratamiento conservador",
                        "Paciente estable, función renal controlada"
                    ]
                },
                {
                    motivo: ["dolor lumbar difuso", "alteraciones en la micción"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar leve y aumento de frecuencia urinaria desde 2 semanas",
                        "Antecedentes de litiasis renal pasada"
                    ],
                    examenFisico: [
                        "Dolor leve a la palpación lumbar bilateral, TA 135/85 mmHg",
                        "Sin fiebre, abdomen blando"
                    ],
                    diagnostico: ["Nefrolitiasis recurrente leve, sin obstrucción"],
                    plan: [
                        "Hidratación abundante, analgesia si es necesario, control ecográfico en 2 semanas",
                        "Educación sobre prevención de litiasis"
                    ],
                    evolucion: [
                        "Dolor lumbar disminuye, sin nuevos episodios de obstrucción",
                        "Paciente estable, adherente a medidas preventivas"
                    ]
                },
                {
                    motivo: ["edema de piernas", "taquicardia ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere hinchazón en piernas y taquicardia ocasional al esfuerzo",
                        "Antecedentes de hipertensión y diabetes mellitus tipo 2"
                    ],
                    examenFisico: [
                        "Edema maleolar bilateral, TA 145/85 mmHg, FC 90 lpm",
                        "Abdomen blando, sin hepatomegalia"
                    ],
                    diagnostico: ["Insuficiencia renal crónica moderada secundaria a hipertensión y diabetes"],
                    plan: [
                        "Optimización de medicación antihipertensiva y antidiabética, restricción de sodio y líquidos",
                        "Control clínico y bioquímico en 4 semanas"
                    ],
                    evolucion: [
                        "Edema disminuye y TA controlada",
                        "Paciente estable, función renal conservada"
                    ]
                },
                {
                    motivo: ["orina oscura", "malestar general"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere orina oscura y sensación de fatiga desde 1 semana",
                        "Antecedentes de consumo de analgésicos frecuentes"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 78 lpm, abdomen blando, sin dolor",
                        "No edema periférico"
                    ],
                    diagnostico: ["Nefritis leve por medicación, seguimiento bioquímico"],
                    plan: [
                        "Suspender analgésicos nefrotóxicos, control de función renal en 1 semana",
                        "Educación sobre medicamentos seguros para riñón"
                    ],
                    evolucion: [
                        "Orina normaliza, función renal estable",
                        "Paciente estable, adherente a recomendaciones"
                    ]
                },
                {
                    motivo: ["edema facial y hematuria leve", "fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere hinchazón en cara y hematuria leve desde 1 semana",
                        "Antecedentes familiares de enfermedad renal"
                    ],
                    examenFisico: [
                        "Edema palpebral leve, TA 135/80 mmHg",
                        "Abdomen blando, sin dolor ni masas"
                    ],
                    diagnostico: ["Glomerulonefritis leve, seguimiento bioquímico"],
                    plan: [
                        "Control de TA, restricción de sodio, analítica renal semanal",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Edema y hematuria disminuyen con tratamiento conservador",
                        "Paciente estable, función renal normalizada"
                    ]
                },
                {
                    motivo: ["orina espumosa", "presión arterial elevada"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere orina espumosa recurrente y presión arterial elevada",
                        "Antecedentes de hipertensión de larga data"
                    ],
                    examenFisico: [
                        "TA 150/90 mmHg, FC 82 lpm, abdomen blando",
                        "Edema leve en tobillos"
                    ],
                    diagnostico: ["Síndrome nefrótico moderado por hipertensión crónica"],
                    plan: [
                        "Optimización antihipertensiva, restricción de sodio, control de proteinuria",
                        "Seguimiento clínico y bioquímico en 2 semanas"
                    ],
                    evolucion: [
                        "Proteinuria y edema disminuyen progresivamente",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["dolor lumbar agudo", "náuseas leves"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar agudo y náuseas leves desde 2 días",
                        "Antecedentes de litiasis renal previa"
                    ],
                    examenFisico: [
                        "Dolor intenso a la palpación lumbar derecha, sin fiebre",
                        "TA 130/80 mmHg, FC 85 lpm"
                    ],
                    diagnostico: ["Cólico renal derecho por litiasis"],
                    plan: [
                        "Analgesia según protocolo, hidratación abundante, control ecográfico en 1 semana",
                        "Educación sobre prevención de litiasis"
                    ],
                    evolucion: [
                        "Dolor resuelto, sin obstrucción renal",
                        "Paciente estable, adherente a medidas preventivas"
                    ]
                },
                {
                    motivo: ["edema generalizado", "fatiga marcada"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere hinchazón en piernas y cara, fatiga marcada desde 2 semanas",
                        "Antecedentes de hipertensión, diabetes y enfermedad renal crónica leve"
                    ],
                    examenFisico: [
                        "Edema generalizado, TA 145/90 mmHg, FC 88 lpm",
                        "Abdomen blando, sin hepatomegalia"
                    ],
                    diagnostico: ["Insuficiencia renal crónica avanzada"],
                    plan: [
                        "Optimización medicación, restricción de líquidos y sodio, control bioquímico frecuente",
                        "Derivación a nefrología avanzada y educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Edema parcial mejora, función renal estable bajo control",
                        "Paciente adherente a plan terapéutico, estable clínicamente"
                    ]
                },
                {
                    motivo: ["orina turbia y dolor lumbar leve", "fiebre leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere orina turbia, dolor lumbar leve y fiebre leve desde 2 días",
                        "Antecedentes de infecciones urinarias recurrentes"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 82 lpm, abdomen blando",
                        "Dolor leve a palpación lumbar derecha"
                    ],
                    diagnostico: ["Pielonefritis leve"],
                    plan: [
                        "Tratamiento antibiótico oral según protocolo, hidratación y seguimiento en 48–72 horas",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Síntomas resuelven con antibiótico",
                        "Paciente estable, función renal conservada"
                    ]
                }
            ],
            "Urología": [
                {
                    motivo: ["dificultad para orinar", "goteo postmiccional"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para iniciar la micción y goteo postmiccional desde hace 3 meses",
                        "Antecedentes de hipertrofia prostática benigna"
                    ],
                    examenFisico: [
                        "Exploración abdominal normal, próstata aumentada de tamaño a tacto rectal, indolora",
                        "No edema periférico ni otros hallazgos"
                    ],
                    diagnostico: ["Hiperplasia prostática benigna moderada"],
                    plan: [
                        "Alfa-bloqueador oral, seguimiento clínico y PSA según protocolo",
                        "Educación sobre síntomas de alarma"
                    ],
                    evolucion: [
                        "Sintomatología urinaria disminuye con medicación",
                        "Paciente estable, función urinaria conservada"
                    ]
                },
                {
                    motivo: ["dolor lumbar y hematuria", "malestar general leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar derecho y hematuria intermitente desde 1 semana",
                        "Antecedentes de litiasis renal previa"
                    ],
                    examenFisico: [
                        "Dolor leve a palpación lumbar derecha, abdomen blando",
                        "TA 130/80 mmHg, FC 80 lpm"
                    ],
                    diagnostico: ["Cálculo renal derecho"],
                    plan: [
                        "Analgesia, hidratación abundante, estudio imagenológico (ecografía o TAC) para confirmar ubicación",
                        "Educación sobre signos de alarma y prevención de litiasis"
                    ],
                    evolucion: [
                        "Dolor y hematuria resuelven progresivamente tras expulsión parcial del cálculo",
                        "Paciente estable, función renal conservada"
                    ]
                },
                {
                    motivo: ["disuria y polaquiuria", "urgencia urinaria"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere ardor al orinar, necesidad frecuente de micción y urgencia urinaria desde 2 días",
                        "Sin antecedentes de infecciones urinarias recurrentes"
                    ],
                    examenFisico: [
                        "Abdomen blando, sin dolor a la palpación, sin fiebre",
                        "Genitales externos normales"
                    ],
                    diagnostico: ["Infección urinaria baja (cistitis)"],
                    plan: [
                        "Antibiótico oral según cultivo, hidratación abundante",
                        "Control clínico en 3–5 días"
                    ],
                    evolucion: [
                        "Síntomas resuelven con antibiótico",
                        "Paciente estable, sin recurrencias inmediatas"
                    ]
                },
                {
                    motivo: ["orina espumosa", "edema leve en extremidades inferiores"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere orina espumosa y edema leve en tobillos desde 1 mes",
                        "Antecedentes de hipertensión y diabetes mellitus tipo 2"
                    ],
                    examenFisico: [
                        "Edema maleolar bilateral leve, TA 140/85 mmHg",
                        "Abdomen blando, sin dolor"
                    ],
                    diagnostico: ["Síndrome nefrótico leve"],
                    plan: [
                        "Control de presión arterial, restricción de sodio, seguimiento de proteinuria",
                        "Control clínico en 2 semanas"
                    ],
                    evolucion: [
                        "Edema y proteinuria disminuyen progresivamente",
                        "Paciente estable, adherente a medidas dietéticas"
                    ]
                },
                {
                    motivo: ["dolor testicular derecho", "hinchazón leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor testicular derecho y ligera hinchazón desde 2 días",
                        "No antecedentes de traumatismos ni infecciones previas"
                    ],
                    examenFisico: [
                        "Testículo derecho levemente aumentado de tamaño, doloroso a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Epididimitis aguda leve"],
                    plan: [
                        "Antibiótico según protocolo, reposo relativo y analgesia",
                        "Control clínico en 5–7 días"
                    ],
                    evolucion: [
                        "Dolor y edema disminuyen progresivamente con tratamiento",
                        "Paciente estable, función testicular conservada"
                    ]
                },
                {
                    motivo: ["micción frecuente nocturna", "sensación de vaciado incompleto"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere necesidad de orinar varias veces por la noche y sensación de vaciado incompleto desde 6 meses",
                        "Antecedentes de hiperplasia prostática"
                    ],
                    examenFisico: [
                        "Próstata aumentada, indolora a tacto rectal",
                        "Abdomen blando, sin otros hallazgos"
                    ],
                    diagnostico: ["Hiperplasia prostática benigna"],
                    plan: [
                        "Alfa-bloqueador, seguimiento clínico y PSA según protocolo",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Síntomas nocturnos mejoran con medicación",
                        "Paciente estable, adherente a tratamiento"
                    ]
                },
                {
                    motivo: ["dolor lumbar y fiebre", "orina turbia"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar bilateral, fiebre ligera y orina turbia desde 3 días",
                        "Antecedentes de infecciones urinarias recurrentes"
                    ],
                    examenFisico: [
                        "Dolor a la palpación lumbar bilateral, TA 135/85 mmHg, FC 82 lpm",
                        "Abdomen blando"
                    ],
                    diagnostico: ["Pielonefritis leve"],
                    plan: [
                        "Antibiótico oral según protocolo, hidratación y seguimiento en 48–72 horas",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Síntomas resuelven con tratamiento antibiótico",
                        "Paciente estable, función renal conservada"
                    ]
                },
                {
                    motivo: ["dificultad para orinar y hematuria", "sensación de vaciado incompleto"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para iniciar micción, hematuria intermitente y sensación de vaciado incompleto",
                        "Antecedentes de hiperplasia prostática benigna"
                    ],
                    examenFisico: [
                        "Próstata aumentada a tacto rectal, indolora",
                        "Abdomen blando, sin hallazgos adicionales"
                    ],
                    diagnostico: ["Hiperplasia prostática benigna complicada con hematuria leve"],
                    plan: [
                        "Alfa-bloqueador, seguimiento clínico y PSA",
                        "Control en 4 semanas y educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Síntomas urinarios estables, hematuria leve resuelta",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["dolor testicular izquierdo", "inflamación leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor testicular izquierdo y ligera inflamación desde hace ${duracionSintoma} días",
                        "Sin antecedentes de traumatismos ni infecciones previas"
                    ],
                    examenFisico: [
                        "Testículo izquierdo levemente aumentado, doloroso a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Orquiepididimitis leve"],
                    plan: [
                        "Antibiótico según protocolo, analgesia y reposo relativo",
                        "Control clínico en 5–7 días"
                    ],
                    evolucion: [
                        "Dolor y edema disminuyen progresivamente",
                        "Paciente estable, función testicular conservada"
                    ]
                },
                {
                    motivo: ["orina espumosa persistente", "edema leve en pies"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere orina espumosa y edema leve en pies desde 1 mes",
                        "Antecedentes de hipertensión y diabetes mellitus tipo 2"
                    ],
                    examenFisico: [
                        "Edema maleolar bilateral leve, TA 140/85 mmHg",
                        "Abdomen blando, sin dolor"
                    ],
                    diagnostico: ["Síndrome nefrótico leve"],
                    plan: [
                        "Control de TA, restricción de sodio, seguimiento de proteinuria",
                        "Control clínico en 2 semanas"
                    ],
                    evolucion: [
                        "Edema y proteinuria disminuyen progresivamente",
                        "Paciente estable, adherente a medidas dietéticas"
                    ]
                }
            ],
            "Cardiología": [
                {
                    motivo: ["dolor torácico leve", "disnea al esfuerzo"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor torácico leve al subir escaleras y disnea al esfuerzo desde 2 semanas",
                        "Antecedentes de hipertensión y dislipidemia"
                    ],
                    examenFisico: [
                        "TA 145/85 mmHg, FC 88 lpm, FR 18 rpm",
                        "Auscultación cardíaca: ritmo regular, soplo sistólico leve en foco aórtico"
                    ],
                    diagnostico: ["Angina de esfuerzo leve, probable coronariopatía"],
                    plan: [
                        "Prueba de esfuerzo y ecocardiograma, modificación de factores de riesgo, medicación antianginosa según protocolo",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor torácico disminuye con medicación y reposo relativo",
                        "Paciente estable, adherente a tratamiento y cambios de estilo de vida"
                    ]
                },
                {
                    motivo: ["palpitaciones intermitentes", "mareos ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere palpitaciones intermitentes y mareos leves desde 1 mes",
                        "Antecedentes de tabaquismo, sin cardiopatía conocida"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 95 lpm, auscultación cardíaca normal",
                        "No edemas periféricos, pulso regular"
                    ],
                    diagnostico: ["Arritmia supraventricular paroxística leve"],
                    plan: [
                        "Holter de 24 horas, seguimiento electrocardiográfico, control de factores de riesgo",
                        "Educación sobre signos de alarma y cuándo acudir a urgencias"
                    ],
                    evolucion: [
                        "Palpitaciones disminuyen con manejo conservador",
                        "Paciente estable, adherente a seguimiento y control de factores de riesgo"
                    ]
                },
                {
                    motivo: ["disnea progresiva", "fatiga al esfuerzo"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere disnea progresiva al caminar y fatiga al esfuerzo desde ${duracionSintoma} meses",
                        "Antecedentes de insuficiencia cardíaca leve y diabetes tipo 2"
                    ],
                    examenFisico: [
                        "TA 140/85 mmHg, FC 90 lpm, FR 20 rpm",
                        "Edema maleolar leve bilateral, crepitantes bibasales leves"
                    ],
                    diagnostico: ["Insuficiencia cardíaca crónica leve"],
                    plan: [
                        "Optimización medicación (diuréticos, inhibidores de la ECA), restricción de sodio, seguimiento ambulatorio",
                        "Control clínico y ecocardiograma en 4 semanas"
                    ],
                    evolucion: [
                        "Disnea y edema disminuyen con tratamiento optimizado",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["dolor torácico súbito", "sudoración leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor torácico súbito en reposo con sudoración leve desde 2 horas",
                        "Antecedentes de hipertensión y dislipidemia"
                    ],
                    examenFisico: [
                        "TA 150/90 mmHg, FC 95 lpm, FR 18 rpm",
                        "Auscultación cardíaca normal, sin soplos"
                    ],
                    diagnostico: ["Angina inestable leve, pendiente estudios complementarios"],
                    plan: [
                        "Hospitalización breve para monitorización, análisis de marcadores cardíacos, ECG y ecocardiograma",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Dolor torácico cede tras medicación antianginosa",
                        "Paciente estable, seguimiento ambulatorio indicado"
                    ]
                },
                {
                    motivo: ["palpitaciones y mareo al esfuerzo", "fatiga leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere palpitaciones y mareo leve al esfuerzo desde 2 semanas",
                        "Antecedentes de hipertensión y consumo ocasional de cafeína"
                    ],
                    examenFisico: [
                        "TA 140/85 mmHg, FC 98 lpm, auscultación normal",
                        "Pulso irregular intermitente, sin edema"
                    ],
                    diagnostico: ["Fibrilación auricular paroxística leve"],
                    plan: [
                        "Holter de 24 horas, control de anticoagulación según riesgo, seguimiento ambulatorio",
                        "Educación sobre signos de alarma y prevención de tromboembolismo"
                    ],
                    evolucion: [
                        "Palpitaciones controladas, ritmo sinusal predominante",
                        "Paciente estable, adherente a seguimiento y tratamiento"
                    ]
                },
                {
                    motivo: ["disnea nocturna", "edema de pies"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere disnea nocturna y edema en pies desde 1 mes",
                        "Antecedentes de insuficiencia cardíaca y enfermedad coronaria"
                    ],
                    examenFisico: [
                        "TA 145/85 mmHg, FC 88 lpm, FR 20 rpm",
                        "Edema maleolar bilateral, crepitantes leves bibasales"
                    ],
                    diagnostico: ["Insuficiencia cardíaca crónica moderada"],
                    plan: [
                        "Optimización de medicación, restricción de líquidos y sodio, seguimiento ambulatorio",
                        "Control clínico y ecocardiograma en 4 semanas"
                    ],
                    evolucion: [
                        "Disnea nocturna y edema mejoran con tratamiento optimizado",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["dolor torácico intermitente", "palpitaciones"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor torácico intermitente y palpitaciones desde 1 mes",
                        "Antecedentes de hipertensión y tabaquismo"
                    ],
                    examenFisico: [
                        "TA 135/85 mmHg, FC 90 lpm, auscultación cardíaca normal",
                        "Pulso regular, sin edemas periféricos"
                    ],
                    diagnostico: ["Angina estable leve"],
                    plan: [
                        "Prueba de esfuerzo, modificación de factores de riesgo, medicación antianginosa según protocolo",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor torácico controlado con medicación y reposo relativo",
                        "Paciente estable, adherente a tratamiento y cambios de estilo de vida"
                    ]
                },
                {
                    motivo: ["mareos y palpitaciones", "fatiga leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere mareos y palpitaciones desde 2 semanas",
                        "Antecedentes familiares de arritmia"
                    ],
                    examenFisico: [
                        "TA 130/80 mmHg, FC 100 lpm, auscultación cardíaca normal",
                        "Pulso irregular intermitente, sin edema"
                    ],
                    diagnostico: ["Arritmia supraventricular paroxística leve"],
                    plan: [
                        "Holter de 24 horas, control ambulatorio y manejo de factores de riesgo",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Palpitaciones disminuyen con medidas conservadoras",
                        "Paciente estable, adherente a seguimiento"
                    ]
                },
                {
                    motivo: ["disnea progresiva y fatiga", "edema leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere disnea progresiva al esfuerzo, fatiga y edema leve en pies desde 2 meses",
                        "Antecedentes de insuficiencia cardíaca y diabetes tipo 2"
                    ],
                    examenFisico: [
                        "TA 145/85 mmHg, FC 88 lpm, FR 20 rpm",
                        "Edema maleolar bilateral leve, crepitantes bibasales leves"
                    ],
                    diagnostico: ["Insuficiencia cardíaca crónica leve a moderada"],
                    plan: [
                        "Optimización de medicación, restricción de líquidos y sodio, seguimiento ambulatorio",
                        "Control clínico y ecocardiograma en 4 semanas"
                    ],
                    evolucion: [
                        "Disnea y edema mejoran con tratamiento optimizado",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["dolor torácico súbito y sudoración", "mareo leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor torácico súbito acompañado de sudoración y mareo leve",
                        "Antecedentes de hipertensión, dislipidemia y tabaquismo"
                    ],
                    examenFisico: [
                        "TA 150/90 mmHg, FC 92 lpm, auscultación normal",
                        "Pulso regular, sin edemas periféricos"
                    ],
                    diagnostico: ["Angina inestable leve, pendiente estudios complementarios"],
                    plan: [
                        "Hospitalización breve para monitorización, ECG, marcadores cardíacos y ecocardiograma",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Dolor torácico cede tras medicación antianginosa",
                        "Paciente estable, seguimiento ambulatorio indicado"
                    ]
                }
            ],
            "Psiquiatría": [
                {
                    motivo: ["ansiedad generalizada", "insomnio leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere sensación de nerviosismo constante y dificultad para dormir desde hace 2 meses",
                        "Antecedentes familiares de ansiedad"
                    ],
                    examenMental: [
                        "Alerta, orientado en tiempo, espacio y persona",
                        "Ansioso, afecto congruente, sin ideas delirantes ni alucinaciones"
                    ],
                    diagnostico: ["Trastorno de ansiedad generalizada leve"],
                    plan: [
                        "Terapia cognitivo-conductual, técnicas de relajación, seguimiento psicológico",
                        "Control en 4 semanas y reevaluación de síntomas"
                    ],
                    evolucion: [
                        "Ansiedad disminuye con manejo terapéutico",
                        "Paciente estable, adherente a terapia y técnicas de relajación"
                    ]
                },
                {
                    motivo: ["tristeza persistente", "fatiga y desmotivación"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere estado de ánimo bajo, fatiga y desmotivación desde 1 mes",
                        "No antecedentes de episodios depresivos previos"
                    ],
                    examenMental: [
                        "Afecto deprimido, pensamiento lógico y coherente",
                        "Sin ideación suicida ni alucinaciones"
                    ],
                    diagnostico: ["Depresión leve"],
                    plan: [
                        "Terapia cognitivo-conductual, seguimiento psicológico, fomento de actividad física",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Estado de ánimo mejora progresivamente",
                        "Paciente estable, adherente a terapia y rutina diaria"
                    ]
                },
                {
                    motivo: ["insomnio crónico", "irritabilidad"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para dormir desde hace 3 meses y sensación de irritabilidad constante",
                        "Antecedentes de hipertensión, consumo de café elevado"
                    ],
                    examenMental: [
                        "Alerta, orientado, con afecto ansioso e irritabilidad leve",
                        "No alteraciones de pensamiento ni percepción"
                    ],
                    diagnostico: ["Insomnio crónico leve"],
                    plan: [
                        "Higiene del sueño, reducción de estimulantes, terapia cognitivo-conductual",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Sueño mejora progresivamente, irritabilidad disminuye",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["ataques de pánico recurrentes", "palpitaciones y sudoración"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere episodios súbitos de miedo intenso con palpitaciones y sudoración desde 1 mes",
                        "Antecedentes familiares de ansiedad"
                    ],
                    examenMental: [
                        "Ansioso durante la consulta, orientado y cooperativo",
                        "Pensamiento lógico, sin ideación delirante"
                    ],
                    diagnostico: ["Trastorno de pánico leve a moderado"],
                    plan: [
                        "Terapia cognitivo-conductual, técnicas de respiración y manejo de ataques",
                        "Control clínico en 2 semanas"
                    ],
                    evolucion: [
                        "Frecuencia e intensidad de ataques disminuyen",
                        "Paciente estable, adherente a técnicas de manejo"
                    ]
                },
                {
                    motivo: ["baja autoestima", "ansiedad social leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dificultad para relacionarse socialmente y sentimientos de inseguridad desde la adolescencia",
                        "Sin antecedentes psiquiátricos diagnosticados"
                    ],
                    examenMental: [
                        "Afecto ansioso, orientado, pensamiento coherente",
                        "No ideación suicida ni alucinaciones"
                    ],
                    diagnostico: ["Trastorno de ansiedad social leve"],
                    plan: [
                        "Terapia cognitivo-conductual enfocada en habilidades sociales",
                        "Control en 4 semanas"
                    ],
                    evolucion: [
                        "Ansiedad social disminuye, confianza aumenta",
                        "Paciente estable, adherente a terapia"
                    ]
                },
                {
                    motivo: ["estado de ánimo bajo", "falta de energía"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere tristeza persistente y fatiga desde 2 meses",
                        "Antecedentes familiares de depresión"
                    ],
                    examenMental: [
                        "Afecto deprimido, orientado, pensamiento lógico",
                        "Sin ideación suicida ni alucinaciones"
                    ],
                    diagnostico: ["Depresión leve"],
                    plan: [
                        "Terapia psicológica, fomento de actividad física, seguimiento psicológico",
                        "Control en 4 semanas"
                    ],
                    evolucion: [
                        "Estado de ánimo mejora progresivamente",
                        "Paciente estable, adherente a terapia"
                    ]
                },
                {
                    motivo: ["ansiedad generalizada", "tensión muscular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere preocupación constante, tensión muscular y dificultad para relajarse desde 3 meses",
                        "Antecedentes de estrés laboral crónico"
                    ],
                    examenMental: [
                        "Alerta, orientado, afecto ansioso, sin alteraciones del pensamiento",
                        "Cooperativo durante la consulta"
                    ],
                    diagnostico: ["Trastorno de ansiedad generalizada"],
                    plan: [
                        "Terapia cognitivo-conductual, técnicas de relajación, control del estrés",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Ansiedad y tensión disminuyen con manejo terapéutico",
                        "Paciente estable, adherente a terapia y técnicas de relajación"
                    ]
                },
                {
                    motivo: ["insomnio y preocupaciones constantes", "irritabilidad"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere insomnio persistente e irritabilidad desde 2 meses",
                        "Antecedentes de hipertensión y consumo elevado de cafeína"
                    ],
                    examenMental: [
                        "Orientado, afecto ansioso e irritable, pensamiento lógico",
                        "Sin alteraciones de percepción"
                    ],
                    diagnostico: ["Insomnio crónico leve asociado a ansiedad"],
                    plan: [
                        "Higiene del sueño, reducción de estimulantes, terapia cognitivo-conductual",
                        "Control en 4 semanas"
                    ],
                    evolucion: [
                        "Sueño mejora progresivamente, irritabilidad disminuye",
                        "Paciente estable, adherente a tratamiento"
                    ]
                },
                {
                    motivo: ["ataques de pánico nocturnos", "palpitaciones y sudoración"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere episodios súbitos de miedo intenso durante la noche con palpitaciones desde 1 mes",
                        "Sin antecedentes psiquiátricos graves"
                    ],
                    examenMental: [
                        "Ansioso, orientado y cooperativo",
                        "Pensamiento lógico, sin ideación suicida ni delirios"
                    ],
                    diagnostico: ["Trastorno de pánico leve"],
                    plan: [
                        "Terapia cognitivo-conductual, técnicas de respiración y manejo de ataques",
                        "Control clínico en 2 semanas"
                    ],
                    evolucion: [
                        "Frecuencia de ataques disminuye",
                        "Paciente estable, adherente a terapia"
                    ]
                },
                {
                    motivo: ["tristeza persistente y desmotivación", "aislamiento social leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere estado de ánimo bajo, falta de interés en actividades sociales desde 1 mes",
                        "Antecedentes familiares de depresión leve"
                    ],
                    examenMental: [
                        "Afecto deprimido, orientado, pensamiento lógico",
                        "No ideación suicida ni alucinaciones"
                    ],
                    diagnostico: ["Depresión leve"],
                    plan: [
                        "Terapia psicológica, fomento de actividades sociales y físicas",
                        "Control en 4 semanas"
                    ],
                    evolucion: [
                        "Estado de ánimo mejora progresivamente, reintegración social parcial",
                        "Paciente estable, adherente a terapia"
                    ]
                }
            ],
            "Neurología": [
                {
                    motivo: ["cefalea intensa recurrente", "fotofobia"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere episodios de cefalea pulsátil intensa, unilateral, acompañada de fotofobia desde hace 6 meses",
                        "Antecedentes de migraña en familiares de primer grado"
                    ],
                    examenNeurologico: [
                        "Paciente lúcido, orientado, sin déficit motor ni sensitivo",
                        "Pares craneales conservados"
                    ],
                    diagnostico: ["Migraña sin aura"],
                    plan: [
                        "Tratamiento con triptanes a demanda, identificación de factores desencadenantes",
                        "Seguimiento ambulatorio"
                    ],
                    evolucion: [
                        "Disminución en frecuencia e intensidad de crisis",
                        "Paciente controla crisis con tratamiento indicad"
                    ]
                },
                {
                    motivo: ["mareos rotatorios", "náuseas"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere episodios de vértigo rotatorio con náuseas desde hace 5 días",
                        "Sin antecedentes neurológicos previos"
                    ],
                    examenNeurologico: [
                        "Nistagmo horizontal al mirar a la derecha",
                        "Resto del examen neurológico sin hallazgos patológicos"
                    ],
                    diagnostico: ["Vértigo periférico benigno"],
                    plan: [
                        "Maniobras de reposicionamiento, antieméticos y control clínico",
                        "Seguimiento en 7 días"
                    ],
                    evolucion: [
                        "Vértigo disminuye progresivamente",
                        "Paciente retoma actividades habituales sin síntomas"
                    ]
                },
                {
                    motivo: ["pérdida transitoria de fuerza en brazo derecho", "dificultad en el habla"],
                    anamnesis: [
                        "Paciente de ${edad} años presenta episodio súbito de debilidad en brazo derecho con disartria que duró 20 minutos",
                        "Antecedentes de hipertensión y diabetes"
                    ],
                    examenNeurologico: [
                        "Paciente lúcido y orientado, sin déficit motor al momento del examen",
                        "Reflejos conservados"
                    ],
                    diagnostico: ["Ataque isquémico transitorio (AIT)"],
                    plan: [
                        "Inicio de antiagregación plaquetaria, control estricto de factores de riesgo",
                        "Solicitar estudios de neuroimagen"
                    ],
                    evolucion: [
                        "No presenta nuevos episodios neurológicos",
                        "Paciente permanece estable bajo control"
                    ]
                },
                {
                    motivo: ["temblor en manos", "torpeza al escribir"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere temblor progresivo de manos en reposo desde hace 1 año",
                        "Dificultad para realizar tareas finas"
                    ],
                    examenNeurologico: [
                        "Temblor en reposo bilateral, bradicinesia leve",
                        "Rigidez muscular leve en miembros superiores"
                    ],
                    diagnostico: ["Enfermedad de Parkinson en estadio inicial"],
                    plan: [
                        "Inicio de tratamiento dopaminérgico, kinesiterapia",
                        "Seguimiento neurológico periódico"
                    ],
                    evolucion: [
                        "Mejoría parcial del temblor con medicación",
                        "Paciente mantiene autonomía funcional"
                    ]
                },
                {
                    motivo: ["convulsión tónico-clónica", "desorientación posterior"],
                    anamnesis: [
                        "Paciente de ${edad} años presenta convulsión generalizada presenciada por familiares",
                        "No antecedentes epilépticos previos"
                    ],
                    examenNeurologico: [
                        "Paciente lúcido postictal, sin déficit focal",
                        "Reflejos normales"
                    ],
                    diagnostico: ["Primera crisis convulsiva"],
                    plan: [
                        "Solicitar electroencefalograma y resonancia magnética",
                        "Seguimiento neurológico y educación sobre prevención"
                    ],
                    evolucion: [
                        "No presenta nuevas convulsiones",
                        "Estudios en proceso de evaluación"
                    ]
                },
                {
                    motivo: ["hormigueo en manos", "pérdida de fuerza progresiva"],
                    anamnesis: [
                        "Paciente de ${edad} años presenta parestesias en ambas manos y debilidad progresiva desde hace 3 meses",
                        "Antecedentes de diabetes mal controlada"
                    ],
                    examenNeurologico: [
                        "Hipoestesia distal en guante y media",
                        "Disminución de reflejos osteotendinosos"
                    ],
                    diagnostico: ["Neuropatía periférica diabética"],
                    plan: [
                        "Optimización de control glucémico, analgesia neuromoduladora",
                        "Seguimiento conjunto con clínica médica"
                    ],
                    evolucion: [
                        "Mejoría parcial del dolor neuropático",
                        "Paciente con progresión lenta controlada"
                    ]
                },
                {
                    motivo: ["trastornos de la memoria reciente", "desorientación leve"],
                    anamnesis: [
                        "Paciente de ${edad} años presenta olvidos frecuentes y dificultad para orientarse en lugares conocidos",
                        "Evolución progresiva en último año"
                    ],
                    examenNeurologico: [
                        "Mini-Mental test con puntaje disminuido",
                        "Resto del examen neurológico sin déficit focal"
                    ],
                    diagnostico: ["Deterioro cognitivo leve"],
                    plan: [
                        "Estimulación cognitiva, seguimiento neurológico periódico",
                        "Evaluación por geriatría"
                    ],
                    evolucion: [
                        "Deterioro cognitivo lento, sin cambios bruscos",
                        "Paciente conserva autonomía parcial"
                    ]
                },
                {
                    motivo: ["debilidad en ambas piernas", "dolor lumbar"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere debilidad progresiva en ambos miembros inferiores asociada a dolor lumbar",
                        "Antecedentes de hernia de disco lumbar"
                    ],
                    examenNeurologico: [
                        "Disminución de fuerza en miembros inferiores",
                        "Reflejos rotulianos disminuidos"
                    ],
                    diagnostico: ["Radiculopatía lumbar"],
                    plan: [
                        "Solicitar resonancia lumbar, fisioterapia, analgesia",
                        "Seguimiento neurológico"
                    ],
                    evolucion: [
                        "Dolor lumbar disminuye con tratamiento",
                        "Mejoría parcial de la fuerza muscular"
                    ]
                },
                {
                    motivo: ["movimientos involuntarios faciales", "fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere movimientos involuntarios en hemicara izquierda desde hace 3 semanas",
                        "Sin antecedentes neurológicos previos"
                    ],
                    examenNeurologico: [
                        "Espasmos faciales intermitentes",
                        "Resto del examen neurológico normal"
                    ],
                    diagnostico: ["Hemiespasmo facial"],
                    plan: [
                        "Tratamiento farmacológico neuromodulador",
                        "Seguimiento neurológico y eventual infiltración con toxina botulínica"
                    ],
                    evolucion: [
                        "Disminución de los espasmos",
                        "Paciente mejora calidad de vida"
                    ]
                },
                {
                    motivo: ["cefalea súbita intensa", "rigidez cervical"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere cefalea súbita en trueno acompañada de rigidez cervical",
                        "Sin antecedentes similares previos"
                    ],
                    examenNeurologico: [
                        "Rigidez de nuca positiva",
                        "Paciente lúcido, sin déficit focal"
                    ],
                    diagnostico: ["Cefalea secundaria a descartar hemorragia subaracnoidea"],
                    plan: [
                        "Derivación urgente a guardia para estudios de neuroimagen",
                        "Monitoreo neurológico estrecho"
                    ],
                    evolucion: [
                        "Se descarta sangrado por tomografía",
                        "Paciente evoluciona favorablemente"
                    ]
                }
            ],
            "Traumatología": [
                {
                    motivo: ["dolor en rodilla derecha", "limitación de movilidad"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor crónico en rodilla derecha, aumento de molestias al subir escaleras desde 6 meses",
                        "Antecedentes de artrosis leve diagnosticada"
                    ],
                    examenFisico: [
                        "Dolor a la palpación medial de rodilla derecha, crepitación al movimiento",
                        "Flexión limitada a 100°, estabilidad ligamentaria conservada"
                    ],
                    diagnostico: ["Osteoartritis de rodilla derecha, grado II"],
                    plan: [
                        "Fisioterapia, analgesia con AINEs, refuerzo muscular",
                        "Control clínico en 4–6 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye con fisioterapia y analgesia",
                        "Paciente mantiene movilidad funcional estable"
                    ]
                },
                {
                    motivo: ["dolor lumbar", "rigidez matutina"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar crónico con rigidez matutina desde 1 año",
                        "Antecedentes de sobrepeso y vida sedentaria"
                    ],
                    examenFisico: [
                        "Movilidad lumbar reducida, dolor a la flexión y extensión",
                        "Reflejos normales, sin déficit motor"
                    ],
                    diagnostico: ["Lumbalgia crónica mecánica"],
                    plan: [
                        "Fisioterapia, ejercicio dirigido y analgesia según necesidad",
                        "Educación postural y seguimiento en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor lumbar disminuye parcialmente con tratamiento conservador",
                        "Paciente mantiene independencia funcional"
                    ]
                },
                {
                    motivo: ["dolor de hombro derecho", "limitación para levantar el brazo"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor en hombro derecho y dificultad para levantar el brazo desde 2 meses",
                        "No antecedentes traumáticos recientes"
                    ],
                    examenFisico: [
                        "Limitación en abducción y rotación externa, dolor a palpación de manguito rotador",
                        "No signos de luxación ni deformidad"
                    ],
                    diagnostico: ["Tendinopatía del manguito rotador derecho"],
                    plan: [
                        "Fisioterapia, analgesia con AINEs, seguimiento en 4 semanas",
                        "Evitar sobreesfuerzos temporales"
                    ],
                    evolucion: [
                        "Dolor y limitación disminuyen progresivamente",
                        "Paciente recupera movilidad funcional"
                    ]
                },
                {
                    motivo: ["esguince de tobillo izquierdo", "edema y dolor agudo"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere torcedura de tobillo izquierdo durante actividad deportiva hace 2 días",
                        "Dolor intenso, edema y dificultad para caminar"
                    ],
                    examenFisico: [
                        "Edema y equimosis moderada, dolor a palpación del ligamento lateral externo",
                        "Movilidad activa limitada, estabilidad ligamentaria pendiente de pruebas"
                    ],
                    diagnostico: ["Esguince lateral de tobillo izquierdo grado II"],
                    plan: [
                        "Reposo, hielo, vendaje compresivo, elevación y analgesia",
                        "Seguimiento en 7–10 días y fisioterapia posterior"
                    ],
                    evolucion: [
                        "Edema y dolor disminuyen progresivamente",
                        "Paciente recupera movilidad y estabilidad"
                    ]
                },
                {
                    motivo: ["fractura distal de radio derecho", "dolor y deformidad"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere caída sobre la mano extendida con dolor intenso y deformidad visible",
                        "Antecedentes de osteoporosis"
                    ],
                    examenFisico: [
                        "Deformidad distal de radio derecho, dolor intenso a la palpación, limitación funcional",
                        "Integridad neurovascular conservada"
                    ],
                    diagnostico: ["Fractura distal de radio derecho, desplazada"],
                    plan: [
                        "Reducción cerrada y yeso, control radiográfico, analgesia",
                        "Seguimiento ortopédico en 1–2 semanas"
                    ],
                    evolucion: [
                        "Dolor disminuye tras inmovilización",
                        "Paciente inicia rehabilitación funcional"
                    ]
                },
                {
                    motivo: ["dolor de cadera izquierda", "cojera intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor de cadera izquierda al caminar y cojea intermitentemente desde 3 meses",
                        "Antecedentes de artrosis y sobrepeso"
                    ],
                    examenFisico: [
                        "Limitación en rotación interna y abducción, dolor a palpación de trocánter mayor",
                        "Reflejos conservados"
                    ],
                    diagnostico: ["Osteoartritis de cadera izquierda, grado II–III"],
                    plan: [
                        "Fisioterapia, analgesia, modificación de actividad física",
                        "Control clínico y valoración de prótesis en caso de progresión"
                    ],
                    evolucion: [
                        "Dolor controlado parcialmente con fisioterapia y medicación",
                        "Paciente mantiene movilidad funcional moderada"
                    ]
                },
                {
                    motivo: ["dolor cervical crónico", "rigidez matutina"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor cervical crónico con rigidez matutina desde 6 meses",
                        "Antecedentes de vida sedentaria y uso prolongado de computadora"
                    ],
                    examenFisico: [
                        "Limitación en flexión y rotación cervical, dolor a palpación de músculos paravertebrales",
                        "Reflejos conservados"
                    ],
                    diagnostico: ["Cervicalgia crónica mecánica"],
                    plan: [
                        "Fisioterapia, analgesia según necesidad, ejercicios de movilidad y fortalecimiento",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Dolor y rigidez disminuyen progresivamente",
                        "Paciente mantiene funcionalidad cervical adecuada"
                    ]
                },
                {
                    motivo: ["esguince de muñeca derecha", "edema y dolor"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere caída sobre la mano derecha durante actividad deportiva hace ${duracionSintoma} día",
                        "Dolor intenso, edema y limitación funcional"
                    ],
                    examenFisico: [
                        "Edema y dolor en muñeca distal, movilidad limitada, sin deformidad evidente",
                        "Integridad neurovascular conservada"
                    ],
                    diagnostico: ["Esguince de muñeca derecha leve"],
                    plan: [
                        "Reposo, hielo, vendaje compresivo, analgesia",
                        "Seguimiento en 5–7 días y fisioterapia según evolución"
                    ],
                    evolucion: [
                        "Edema y dolor disminuyen progresivamente",
                        "Paciente recupera movilidad funcional completa"
                    ]
                },
                {
                    motivo: ["dolor de hombro izquierdo tras caída", "hematoma leve"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor en hombro izquierdo tras caída sobre brazo extendido hace 2 días",
                        "No antecedentes de fracturas"
                    ],
                    examenFisico: [
                        "Dolor a la palpación de hombro y acromion, limitación en abducción y elevación",
                        "No deformidad ni déficit neurovascular"
                    ],
                    diagnostico: ["Contusión y esguince leve de hombro izquierdo"],
                    plan: [
                        "Reposo relativo, hielo, analgesia y fisioterapia según tolerancia",
                        "Control clínico en 5–7 días"
                    ],
                    evolucion: [
                        "Dolor disminuye progresivamente",
                        "Paciente recupera movilidad funcional"
                    ]
                },
                {
                    motivo: ["dolor lumbar agudo tras levantar peso", "espasmo muscular"],
                    anamnesis: [
                        "Paciente de ${edad} años refiere dolor lumbar agudo después de levantar peso hace ${duracionSintoma} días",
                        "No antecedentes de trauma previo"
                    ],
                    examenFisico: [
                        "Espasmo muscular lumbar, dolor a la palpación y extensión",
                        "Reflejos conservados, sin déficit motor"
                    ],
                    diagnostico: ["Lumbalgia aguda muscular"],
                    plan: [
                        "Reposo relativo, analgesia, aplicación de frío/calor, fisioterapia inicial",
                        "Control clínico en 1 semana"
                    ],
                    evolucion: [
                        "Dolor y espasmo disminuyen progresivamente",
                        "Paciente retoma actividad laboral con medidas posturales"
                    ]
                }
            ],
            //AQUI EMPIEZAN LOS PARAMETERS:


            "Neumonología": [
                {
                    motivo: ["tos seca persistente", "disnea leve al esfuerzo"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere tos seca persistente desde ${duracionSintoma} y disnea leve al esfuerzo",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación pulmonar: estertores finos bilaterales, sin sibilancias"
                    ],
                    diagnostico: ["Bronquitis crónica leve"],
                    plan: [
                        "Educación sobre higiene respiratoria, broncodilatadores inhalados según necesidad",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Tos y disnea disminuyen progresivamente",
                        "Paciente estable, adherente al tratamiento"
                    ]
                },
                {
                    motivo: ["disnea progresiva", "tos con expectoración"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere disnea progresiva y tos con expectoración desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación: sibilancias dispersas y crepitantes basales"
                    ],
                    diagnostico: ["EPOC leve a moderada"],
                    plan: [
                        "Broncodilatadores de acción corta y larga, rehabilitación respiratoria, vacunación antigripal",
                        "Control clínico en 4–6 semanas"
                    ],
                    evolucion: [
                        "Disnea y tos disminuyen con tratamiento optimizado",
                        "Paciente estable, adherente a medicación y rehabilitación"
                    ]
                },
                {
                    motivo: ["tos con sangre", "disnea súbita leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere hemoptisis ocasional desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación pulmonar: discreta disminución de murmullo vesicular en base derecha"
                    ],
                    diagnostico: ["Bronquitis infecciosa con hemoptisis leve"],
                    plan: [
                        "Estudio imagenológico (radiografía de tórax), antibiótico si indicado, control de signos de alarma",
                        "Control clínico en 1–2 semanas"
                    ],
                    evolucion: [
                        "Hemoptisis resuelta y tos disminuye",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["disnea nocturna", "tos con flema amarillenta"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere disnea nocturna y tos con expectoración amarillenta desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación: estertores húmedos basales bilaterales"
                    ],
                    diagnostico: ["Insuficiencia respiratoria leve secundaria a bronquitis crónica"],
                    plan: [
                        "Broncodilatadores, fisioterapia respiratoria, hidratación adecuada",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Disnea y tos disminuyen con tratamiento conservador",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["tos persistente", "fatiga al caminar"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere tos persistente y fatiga al caminar desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación: sibilancias dispersas, sin estertores"
                    ],
                    diagnostico: ["Asma leve persistente"],
                    plan: [
                        "Broncodilatador inhalado a demanda, educación sobre factores desencadenantes",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Tos y fatiga disminuyen progresivamente",
                        "Paciente estable, adherente a tratamiento y medidas ambientales"
                    ]
                },
                {
                    motivo: ["disnea súbita", "dolor torácico leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere disnea súbita y dolor torácico leve desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación pulmonar normal, sin crepitantes ni sibilancias"
                    ],
                    diagnostico: ["Crisis asmática leve"],
                    plan: [
                        "Broncodilatador de acción corta, seguimiento ambulatorio, control de factores desencadenantes",
                        "Educación sobre signos de alarma"
                    ],
                    evolucion: [
                        "Disnea cede tras medicación",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["tos con expectoración verdosa", "fiebre leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere tos productiva con expectoración verdosa y fiebre leve desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación: crepitantes y broncofonía discreta en base derecha"
                    ],
                    diagnostico: ["Neumonía lobar derecha leve"],
                    plan: [
                        "Antibiótico oral según protocolo, hidratación y control de síntomas",
                        "Control clínico en 3–5 días"
                    ],
                    evolucion: [
                        "Síntomas disminuyen progresivamente",
                        "Paciente estable, adherente a tratamiento antibiótico"
                    ]
                },
                {
                    motivo: ["disnea progresiva", "tos crónica"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere disnea progresiva y tos crónica desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación: sibilancias dispersas y crepitantes leves"
                    ],
                    diagnostico: ["EPOC moderado"],
                    plan: [
                        "Broncodilatadores de acción larga, rehabilitación respiratoria, educación sobre tabaquismo",
                        "Control clínico en 4–6 semanas"
                    ],
                    evolucion: [
                        "Disnea y tos mejoran con tratamiento optimizado",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                },
                {
                    motivo: ["tos seca intensa", "fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere tos seca intensa y fatiga desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación pulmonar normal, sin hallazgos patológicos"
                    ],
                    diagnostico: ["Bronquitis aguda viral leve"],
                    plan: [
                        "Educación sobre hidratación, reposo, control de síntomas",
                        "Control clínico en 1–2 semanas"
                    ],
                    evolucion: [
                        "Tos y fatiga resuelven progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["disnea leve al esfuerzo", "tos intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere disnea leve al esfuerzo y tos intermitente desde ${duracionSintoma}",
                        "Antecedentes de ${antecedenteMedico}"
                    ],
                    examenFisico: [
                        "FR ${frecuenciaRespiratoria} rpm, saturación ${saturacionO2}%",
                        "Auscultación: sibilancias leves, sin crepitantes"
                    ],
                    diagnostico: ["Asma leve intermitente"],
                    plan: [
                        "Broncodilatador inhalado a demanda, seguimiento ambulatorio",
                        "Control clínico en 4 semanas"
                    ],
                    evolucion: [
                        "Disnea y tos controladas con medicación",
                        "Paciente estable, adherente a plan terapéutico"
                    ]
                }
            ],
            "Nutrición": [
                {
                    motivo: ["exceso de peso", "fatiga al caminar"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, consulta por exceso de peso y fatiga al caminar desde ${duracionSintoma}",
                        "Hábitos alimentarios poco equilibrados, consumo frecuente de ultraprocesados"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "Tensión arterial ${tensionArterial} mmHg, frecuencia cardíaca ${frecuenciaCardiaca} lpm"
                    ],
                    diagnostico: ["Obesidad grado I", "Riesgo metabólico asociado"],
                    plan: [
                        "Plan de alimentación hipocalórico personalizado, incremento de actividad física progresiva",
                        "Control de peso y seguimiento en 4 semanas"
                    ],
                    evolucion: [
                        "Paciente reduce 1–2 kg y refiere mayor energía",
                        "Adherencia parcial al plan, ajustando metas nutricionales"
                    ]
                },
                {
                    motivo: ["deficiencia de hierro", "fatiga y palidez"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere fatiga y palidez desde ${duracionSintoma}",
                        "Dieta baja en hierro y vegetales de hoja verde insuficiente"
                    ],
                    examenFisico: [
                        "Palidez cutánea y mucosa leve, signos vitales dentro de límites normales",
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm"
                    ],
                    diagnostico: ["Anemia por deficiencia de hierro leve"],
                    plan: [
                        "Suplementación oral de hierro, dieta rica en hierro hemo y no hemo",
                        "Control en 4 semanas y laboratorio de seguimiento"
                    ],
                    evolucion: [
                        "Fatiga mejora y palidez disminuye",
                        "Paciente sigue plan dietético y suplementación indicada"
                    ]
                },
                {
                    motivo: ["sobrepeso y colesterol elevado"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere sobrepeso y colesterol elevado desde ${duracionSintoma}",
                        "Alimentación con alto contenido de grasas saturadas y azúcares"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "Perfil lipídico alterado según estudios previos"
                    ],
                    diagnostico: ["Dislipidemia asociada a sobrepeso"],
                    plan: [
                        "Dieta hipolipídica, aumento de actividad física, seguimiento de laboratorio",
                        "Control en 6 semanas"
                    ],
                    evolucion: [
                        "Colesterol disminuye ligeramente, paciente motivado a cambios de hábito",
                        "Seguimiento nutricional y ajuste de dieta"
                    ]
                },
                {
                    motivo: ["pérdida de peso involuntaria", "cansancio"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere pérdida de peso involuntaria y cansancio desde ${duracionSintoma}",
                        "Consumo insuficiente de calorías, alta actividad física"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "Signos de desnutrición leve, TA ${tensionArterial} mmHg"
                    ],
                    diagnostico: ["Desnutrición leve"],
                    plan: [
                        "Plan hipercalórico progresivo, educación sobre frecuencia y calidad de alimentos",
                        "Control en 2–3 semanas para ajuste de plan"
                    ],
                    evolucion: [
                        "Paciente aumenta 1–2 kg, energía mejora",
                        "Adherencia adecuada al plan nutricional"
                    ]
                },
                {
                    motivo: ["intolerancia a la lactosa", "distensión abdominal"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere distensión abdominal y molestias tras consumo de lácteos desde ${duracionSintoma}",
                        "Consumo frecuente de leche y derivados"
                    ],
                    examenFisico: [
                        "Abdomen blando, ruidos intestinales presentes, sin dolor a palpación",
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm"
                    ],
                    diagnostico: ["Intolerancia a la lactosa leve"],
                    plan: [
                        "Dieta libre de lactosa, educación sobre sustitutos lácteos",
                        "Seguimiento nutricional en 3–4 semanas"
                    ],
                    evolucion: [
                        "Síntomas digestivos disminuyen tras ajuste dietético",
                        "Paciente mantiene adherencia parcial al plan"
                    ]
                },
                {
                    motivo: ["sobrepeso y resistencia a la insulina"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, consulta por sobrepeso y antecedentes de glucemia elevada desde ${duracionSintoma}",
                        "Alimentación alta en carbohidratos refinados y azúcares"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "Glucemia en ayunas elevada, TA ${tensionArterial} mmHg"
                    ],
                    diagnostico: ["Síndrome metabólico incipiente"],
                    plan: [
                        "Dieta baja en carbohidratos simples, actividad física regular, seguimiento bioquímico",
                        "Control en 4–6 semanas"
                    ],
                    evolucion: [
                        "Glucemia mejora ligeramente, paciente motivado",
                        "Adherencia parcial a cambios de hábitos"
                    ]
                },
                {
                    motivo: ["deficiencia de vitamina D", "fatiga y dolor óseo leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere fatiga y dolor óseo leve desde ${duracionSintoma}",
                        "Exposición solar insuficiente y dieta baja en lácteos"
                    ],
                    examenFisico: [
                        "Dolor óseo leve a palpación, postura normal",
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm"
                    ],
                    diagnostico: ["Deficiencia de vitamina D leve"],
                    plan: [
                        "Suplementación con vitamina D, dieta rica en calcio, exposición solar progresiva",
                        "Control en 6 semanas con laboratorio"
                    ],
                    evolucion: [
                        "Fatiga y dolor óseo disminuyen",
                        "Paciente sigue indicaciones dietéticas y suplementación"
                    ]
                },
                {
                    motivo: ["sobrepeso y estreñimiento crónico"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere sobrepeso y estreñimiento crónico desde ${duracionSintoma}",
                        "Dieta pobre en fibra, hidratación insuficiente"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "Abdomen blando, sin dolor a palpación"
                    ],
                    diagnostico: ["Estreñimiento funcional asociado a hábitos alimentarios"],
                    plan: [
                        "Incremento de fibra en dieta, hidratación adecuada, ejercicio físico regular",
                        "Control en 3–4 semanas"
                    ],
                    evolucion: [
                        "Evacuaciones más regulares, síntomas digestivos mejoran",
                        "Paciente adherente parcialmente a plan dietético"
                    ]
                },
                {
                    motivo: ["pérdida de peso lenta", "déficit de energía"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere pérdida de peso lenta y déficit de energía desde ${duracionSintoma}",
                        "Alimentación irregular y baja en proteínas"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "Signos vitales normales, sin hallazgos patológicos"
                    ],
                    diagnostico: ["Desequilibrio nutricional leve"],
                    plan: [
                        "Plan hipercalórico y balanceado, educación sobre frecuencia de comidas y macros",
                        "Control en 4 semanas para ajuste de plan"
                    ],
                    evolucion: [
                        "Paciente aumenta energía y gana peso leve",
                        "Adherencia moderada al plan nutricional"
                    ]
                },
                {
                    motivo: ["hipertensión y sobrepeso", "sedentarismo"],
                    anamnesis: [
                        "Paciente de ${edad} años, ${sexo}, refiere hipertensión y sobrepeso desde ${duracionSintoma}",
                        "Estilo de vida sedentario y alimentación con alto contenido de sal"
                    ],
                    examenFisico: [
                        "IMC ${imc}, circunferencia abdominal ${circunferenciaAbdominal} cm",
                        "TA ${tensionArterial} mmHg, FC ${frecuenciaCardiaca} lpm"
                    ],
                    diagnostico: ["Obesidad asociada a hipertensión leve"],
                    plan: [
                        "Dieta hiposódica y balanceada, incremento gradual de actividad física",
                        "Control en 4–6 semanas"
                    ],
                    evolucion: [
                        "Paciente disminuye ligeramente peso y presión arterial",
                        "Adherencia parcial al plan de hábitos saludables"
                    ]
                }
            ],
            "Otorrinolaringología": [
                {
                    motivo: ["dolor de garganta y disfagia", "fiebre leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor de garganta y dificultad para tragar desde ${duracionSintoma} días",
                        "No antecedentes de amigdalitis recurrente"
                    ],
                    examenFisico: [
                        "Amígdalas inflamadas con exudado blanquecino, faringe eritematosa",
                        "Signos vitales normales, sin adenopatías cervicales significativas"
                    ],
                    diagnostico: ["Faringoamigdalitis viral leve"],
                    plan: [
                        "Hidratación, analgésicos y antiinflamatorios según necesidad",
                        "Control ambulatorio en 3-5 días si persiste la sintomatología"
                    ],
                    evolucion: [
                        "Dolor de garganta disminuye progresivamente",
                        "Paciente mantiene ingesta normal y signos vitales estables"
                    ]
                },
                {
                    motivo: ["secreción nasal persistente", "estornudos frecuentes"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere rinorrea y estornudos frecuentes desde ${duracionSintoma} días",
                        "Sin antecedentes de rinitis alérgica conocida"
                    ],
                    examenFisico: [
                        "Mucosa nasal congestiva, secreción acuosa bilateral",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Rinitis viral"],
                    plan: [
                        "Lavados nasales con solución salina, hidratación",
                        "Observación y control ambulatorio en 5 días"
                    ],
                    evolucion: [
                        "Disminución de la rinorrea y congestión",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor de oído intermitente", "leve disminución de audición"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor de oído derecho intermitente desde ${duracionSintoma} días",
                        "No antecedentes de otitis recurrente"
                    ],
                    examenFisico: [
                        "Conducto auditivo externo sin lesiones, tímpano levemente enrojecido",
                        "Oído izquierdo normal, signos vitales dentro de parámetros normales"
                    ],
                    diagnostico: ["Otitis media leve"],
                    plan: [
                        "Analgesia según necesidad, evitar humedad en oído",
                        "Control clínico en 7 días"
                    ],
                    evolucion: [
                        "Dolor cede progresivamente",
                        "Audición normaliza, paciente estable"
                    ]
                },
                {
                    motivo: ["tos seca persistente", "sensación de cuerpo extraño en garganta"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere tos seca persistente desde ${duracionSintoma} días",
                        "Niega antecedentes de alergias respiratorias"
                    ],
                    examenFisico: [
                        "Faringe ligeramente eritematosa, sin secreciones",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Faringitis inespecífica"],
                    plan: [
                        "Hidratación, analgésicos según necesidad",
                        "Reevaluación si la tos persiste más de 7 días"
                    ],
                    evolucion: [
                        "Tos disminuye gradualmente",
                        "Paciente mantiene estado general estable"
                    ]
                },
                {
                    motivo: ["zumbido de oído", "leve vértigo ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere acúfenos en oído izquierdo desde ${duracionSintoma} días",
                        "Sin antecedentes de trauma acústico"
                    ],
                    examenFisico: [
                        "Otoscopia normal, sin secreciones ni lesiones",
                        "Pruebas vestibulares básicas dentro de límites normales"
                    ],
                    diagnostico: ["Acúfenos leves, posible origen vascular"],
                    plan: [
                        "Recomendaciones de higiene auditiva y reducción de ruido",
                        "Control ambulatorio en 2 semanas"
                    ],
                    evolucion: [
                        "Zumbido disminuye con medidas de protección auditiva",
                        "Paciente estable, sin alteraciones funcionales"
                    ]
                },
                {
                    motivo: ["obstrucción nasal unilateral", "dolor facial leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere obstrucción nasal derecha desde ${duracionSintoma} días",
                        "No antecedentes de sinusitis crónica"
                    ],
                    examenFisico: [
                        "Mucosa nasal derecha congestiva, secreción purulenta leve",
                        "Olfato conservado, signos vitales normales"
                    ],
                    diagnostico: ["Rinosinusitis aguda leve"],
                    plan: [
                        "Lavados nasales, analgésicos según necesidad",
                        "Control clínico en 5-7 días si no hay mejoría"
                    ],
                    evolucion: [
                        "Obstrucción y dolor disminuyen progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["ronquera persistente", "disfonía leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere ronquera y cambio de voz desde ${duracionSintoma} días",
                        "No antecedentes de cirugía laríngea ni intubaciones recientes"
                    ],
                    examenFisico: [
                        "Laringe eritematosa, cuerdas vocales sin nódulos visibles",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Laringitis aguda leve"],
                    plan: [
                        "Reposo vocal, hidratación, analgésicos según necesidad",
                        "Reevaluación en 7 días"
                    ],
                    evolucion: [
                        "Ronquera mejora gradualmente",
                        "Paciente mantiene voz funcional normal"
                    ]
                },
                {
                    motivo: ["sensación de oído tapado", "leve dolor al masticar"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere sensación de oído izquierdo tapado desde ${duracionSintoma} días",
                        "Sin antecedentes de otitis recurrente"
                    ],
                    examenFisico: [
                        "Conducto auditivo normal, tímpano con discreta retracción",
                        "Signos vitales normales, movimientos mandibulares sin dolor marcado"
                    ],
                    diagnostico: ["Disfunción de trompa de Eustaquio leve"],
                    plan: [
                        "Ejercicios de deglución y valsalva, evitar exposición a cambios bruscos de presión",
                        "Control en 1 semana"
                    ],
                    evolucion: [
                        "Sensación de taponamiento disminuye",
                        "Paciente estable, audición normal"
                    ]
                },
                {
                    motivo: ["epistaxis ocasional", "leve congestión nasal"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere sangrado nasal ocasional desde ${duracionSintoma} días",
                        "No antecedentes de hipertensión ni coagulopatías"
                    ],
                    examenFisico: [
                        "Fosa nasal derecha con costras recientes, mucosa congestionada",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Epistaxis anterior leve"],
                    plan: [
                        "Compresas frías y pinzamiento nasal según necesidad",
                        "Control en 1 semana si persiste"
                    ],
                    evolucion: [
                        "Sangrado cede con medidas locales",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor faríngeo leve", "tos irritativa"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor faríngeo y tos irritativa desde ${duracionSintoma} días",
                        "No antecedentes de alergias respiratorias"
                    ],
                    examenFisico: [
                        "Faringe ligeramente eritematosa, sin exudado",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Faringitis inespecífica leve"],
                    plan: [
                        "Hidratación, analgésicos según necesidad",
                        "Reevaluación si los síntomas persisten más de 7 días"
                    ],
                    evolucion: [
                        "Dolor y tos disminuyen progresivamente",
                        "Paciente estable y funcional"
                    ]
                }
            ],
            "Oncología": [
                {
                    motivo: ["masa palpable en mama derecha", "dolor leve local"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de masa palpable en mama derecha desde ${duracionSintoma} semanas",
                        "Niega antecedentes familiares de cáncer de mama"
                    ],
                    examenFisico: [
                        "Masa de 2 cm, firme, móvil, no adherida a planos profundos",
                        "No adenopatías axilares palpables"
                    ],
                    diagnostico: ["Neoplasia mamaria sospechosa, pendiente de biopsia"],
                    plan: [
                        "Biopsia estereotáctica, ecografía mamaria complementaria",
                        "Seguimiento en 1 semana tras resultados"
                    ],
                    evolucion: [
                        "Paciente tolera procedimientos sin complicaciones",
                        "No se detectan signos de progresión clínica"
                    ]
                },
                {
                    motivo: ["cansancio persistente", "pérdida de peso involuntaria"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere fatiga intensa y pérdida de peso no intencionada desde ${duracionSintoma} meses",
                        "No antecedentes oncológicos previos"
                    ],
                    examenFisico: [
                        "Signos vitales normales, palidez cutánea leve",
                        "Linfadenopatías cervicales pequeñas, móviles"
                    ],
                    diagnostico: ["Anemia y sospecha de neoplasia hematológica"],
                    plan: [
                        "Hemograma completo, estudios de médula ósea",
                        "Control en 1 semana tras resultados de laboratorio"
                    ],
                    evolucion: [
                        "Síntomas parcialmente controlados con soporte nutricional",
                        "Paciente estable, seguimiento oncológico iniciado"
                    ]
                },
                {
                    motivo: ["dolor abdominal persistente", "náuseas ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal difuso y náuseas desde ${duracionSintoma} semanas",
                        "No antecedentes digestivos importantes"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor difuso a palpación leve",
                        "Ruidos intestinales presentes, sin signos de irritación peritoneal"
                    ],
                    diagnostico: ["Neoplasia gastrointestinal sospechosa"],
                    plan: [
                        "Tomografía abdominal, colonoscopia y marcadores tumorales",
                        "Seguimiento en 2 semanas según resultados"
                    ],
                    evolucion: [
                        "Dolor y náuseas disminuyen parcialmente con analgésicos",
                        "Paciente estable, sin complicaciones graves"
                    ]
                },
                {
                    motivo: ["masa cervical palpable", "leve dolor local"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de masa cervical indolora desde ${duracionSintoma} semanas",
                        "Sin antecedentes de linfomas previos"
                    ],
                    examenFisico: [
                        "Linfadenopatía cervical derecha de 1.5 cm, firme, móvil",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Linfadenopatía sospechosa de origen neoplásico"],
                    plan: [
                        "Biopsia ganglionar, estudios de imagen cervicales",
                        "Control tras resultados de anatomía patológica"
                    ],
                    evolucion: [
                        "Masa estable, sin crecimiento adicional",
                        "Paciente mantiene estado general bueno"
                    ]
                },
                {
                    motivo: ["tos persistente", "hemoptisis leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere tos crónica con hemoptisis ocasional desde ${duracionSintoma} semanas",
                        "No antecedentes pulmonares crónicos"
                    ],
                    examenFisico: [
                        "Ausculatación pulmonar con estertores leves en lóbulo derecho",
                        "Signos vitales dentro de parámetros normales"
                    ],
                    diagnostico: ["Neoplasia pulmonar sospechosa"],
                    plan: [
                        "Radiografía y tomografía de tórax, broncoscopia si es necesario",
                        "Seguimiento en 1 semana con resultados"
                    ],
                    evolucion: [
                        "Tos parcialmente controlada con tratamiento sintomático",
                        "Paciente estable, sin progresión clínica inmediata"
                    ]
                },
                {
                    motivo: ["hematomas frecuentes", "fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de hematomas sin traumatismos y fatiga desde ${duracionSintoma} semanas",
                        "Sin antecedentes de coagulopatías conocidas"
                    ],
                    examenFisico: [
                        "Petequias y equimosis leves en miembros superiores",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de leucemia, pendiente de estudios hematológicos"],
                    plan: [
                        "Hemograma completo, aspirado de médula ósea",
                        "Control en 1 semana según resultados"
                    ],
                    evolucion: [
                        "Hematomas estables, fatiga leve persistente",
                        "Paciente adherente a indicaciones, estado general estable"
                    ]
                },
                {
                    motivo: ["dolor óseo difuso", "malestar general"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor óseo difuso desde ${duracionSintoma} meses",
                        "No antecedentes traumáticos recientes"
                    ],
                    examenFisico: [
                        "Sensibilidad a la palpación en fémur y pelvis, sin deformidades",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de mieloma múltiple"],
                    plan: [
                        "Radiografías, resonancia y perfil bioquímico",
                        "Control tras resultados de estudios"
                    ],
                    evolucion: [
                        "Dolor parcialmente controlado con analgésicos",
                        "Paciente estable, seguimiento oncológico iniciado"
                    ]
                },
                {
                    motivo: ["pérdida de apetito", "pérdida de peso progresiva"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere disminución del apetito y pérdida de peso desde ${duracionSintoma} semanas",
                        "No antecedentes digestivos significativos"
                    ],
                    examenFisico: [
                        "Signos vitales normales, abdomen blando sin dolor a la palpación",
                        "IMC disminuido respecto al valor previo"
                    ],
                    diagnostico: ["Sospecha de neoplasia digestiva"],
                    plan: [
                        "Endoscopia, tomografía abdominal y marcadores tumorales",
                        "Control según resultados"
                    ],
                    evolucion: [
                        "Paciente tolera dieta fraccionada, pérdida de peso estable",
                        "Estado general aceptable, sin complicaciones agudas"
                    ]
                },
                {
                    motivo: ["dolor de cabeza persistente", "náuseas"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere cefalea persistente y náuseas desde ${duracionSintoma} semanas",
                        "No antecedentes neurológicos importantes"
                    ],
                    examenFisico: [
                        "Neurológico sin déficit focal, presión intracraneal aparentemente normal",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de neoplasia intracraneal"],
                    plan: [
                        "Resonancia magnética cerebral, laboratorio básico",
                        "Seguimiento según resultados"
                    ],
                    evolucion: [
                        "Dolor de cabeza cede parcialmente con analgésicos",
                        "Paciente estable, sin signos de alarma inmediata"
                    ]
                },
                {
                    motivo: ["masa palpable en cuello", "leve dificultad para deglutir"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere masa cervical palpable desde ${duracionSintoma} semanas",
                        "Niega antecedentes oncológicos familiares"
                    ],
                    examenFisico: [
                        "Masa cervical firme, móvil, no adherida a planos profundos",
                        "Signos vitales normales, examen de boca y faringe sin hallazgos"
                    ],
                    diagnostico: ["Neoplasia tiroidea sospechosa"],
                    plan: [
                        "Ecografía cervical, biopsia por aspiración con aguja fina",
                        "Control tras resultados de anatomía patológica"
                    ],
                    evolucion: [
                        "Masa estable, paciente sin complicaciones",
                        "Deglución normal, estado general bueno"
                    ]
                }
            ],
            "Infectología": [
                {
                    motivo: ["fiebre alta", "malestar general"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere fiebre de hasta 39°C y malestar general desde ${duracionSintoma} días",
                        "Niega antecedentes de enfermedades infecciosas recientes"
                    ],
                    examenFisico: [
                        "Signos vitales: TA 120/80 mmHg, FC 100 lpm, Temp 38.8°C",
                        "Faringe levemente eritematosa, sin exudados"
                    ],
                    diagnostico: ["Infección viral aguda"],
                    plan: [
                        "Hidratación, control de fiebre, reposo relativo",
                        "Seguimiento clínico en 3 días si persiste la fiebre"
                    ],
                    evolucion: [
                        "Fiebre cede progresivamente",
                        "Paciente estable, síntomas leves"
                    ]
                },
                {
                    motivo: ["diarrea acuosa", "dolor abdominal leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere diarrea acuosa frecuente desde ${duracionSintoma} días",
                        "No antecedentes de enfermedades digestivas crónicas"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve a palpación difusa",
                        "Signos vitales normales, ligera deshidratación"
                    ],
                    diagnostico: ["Gastroenteritis aguda viral"],
                    plan: [
                        "Rehidratación oral, dieta blanda, control de signos vitales",
                        "Seguimiento en 2-3 días según evolución"
                    ],
                    evolucion: [
                        "Diarrea disminuye progresivamente",
                        "Paciente tolera dieta normal y está estable"
                    ]
                },
                {
                    motivo: ["tos persistente", "fatiga leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere tos seca persistente desde ${duracionSintoma} semanas",
                        "No antecedentes pulmonares significativos"
                    ],
                    examenFisico: [
                        "Auscultación pulmonar con ruidos respiratorios normales",
                        "Signos vitales dentro de límites normales"
                    ],
                    diagnostico: ["Infección respiratoria leve"],
                    plan: [
                        "Control sintomático con analgésicos y antitusivos según necesidad",
                        "Reevaluación en 1 semana si persiste la tos"
                    ],
                    evolucion: [
                        "Tos disminuye gradualmente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["erupción cutánea", "prurito leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de erupción cutánea y prurito desde ${duracionSintoma} días",
                        "No antecedentes de alergias conocidas"
                    ],
                    examenFisico: [
                        "Lesiones maculopapulares en tronco y miembros superiores",
                        "Signos vitales normales, sin fiebre"
                    ],
                    diagnostico: ["Exantema viral leve"],
                    plan: [
                        "Control sintomático con antihistamínicos según necesidad",
                        "Observación y control ambulatorio en 5 días"
                    ],
                    evolucion: [
                        "Prurito y erupción disminuyen progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["dolor de garganta", "fiebre leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor de garganta y fiebre intermitente desde ${duracionSintoma} días",
                        "Niega antecedentes de amigdalitis recurrente"
                    ],
                    examenFisico: [
                        "Faringe eritematosa, amígdalas sin exudado",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Faringitis viral leve"],
                    plan: [
                        "Hidratación, analgésicos según necesidad",
                        "Control ambulatorio si síntomas persisten más de 5 días"
                    ],
                    evolucion: [
                        "Dolor de garganta cede progresivamente",
                        "Paciente mantiene ingesta normal y estado general estable"
                    ]
                },
                {
                    motivo: ["fiebre intermitente", "dolor lumbar leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere fiebre intermitente y dolor lumbar desde ${duracionSintoma} días",
                        "No antecedentes de infección urinaria recurrente"
                    ],
                    examenFisico: [
                        "TA 118/78 mmHg, FC 88 lpm, Temp 38°C",
                        "Palpación lumbar normal, abdomen sin dolor"
                    ],
                    diagnostico: ["Infección urinaria baja sospechosa"],
                    plan: [
                        "Urocultivo, hidratación y control sintomático",
                        "Seguimiento en 3 días según resultados de laboratorio"
                    ],
                    evolucion: [
                        "Fiebre cede con medidas generales",
                        "Dolor lumbar leve desaparece, paciente estable"
                    ]
                },
                {
                    motivo: ["malestar general", "dolor de cabeza"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere malestar general y cefalea desde ${duracionSintoma} días",
                        "Niega antecedentes de enfermedades infecciosas recientes"
                    ],
                    examenFisico: [
                        "Signos vitales normales, sin rigidez de nuca",
                        "Neurológico sin déficit focal"
                    ],
                    diagnostico: ["Infección viral inespecífica"],
                    plan: [
                        "Reposo, hidratación y analgésicos según necesidad",
                        "Reevaluación si persisten síntomas más de 5 días"
                    ],
                    evolucion: [
                        "Síntomas disminuyen gradualmente",
                        "Paciente estable y funcional"
                    ]
                },
                {
                    motivo: ["diarrea y vómitos", "deshidratación leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere diarrea y vómitos desde ${duracionSintoma} días",
                        "No antecedentes de enfermedades gastrointestinales crónicas"
                    ],
                    examenFisico: [
                        "Signos vitales: TA 110/70 mmHg, FC 96 lpm",
                        "Abdomen blando, dolor leve a palpación"
                    ],
                    diagnostico: ["Gastroenteritis aguda viral"],
                    plan: [
                        "Rehidratación oral, dieta blanda, control ambulatorio",
                        "Seguimiento en 2-3 días"
                    ],
                    evolucion: [
                        "Síntomas disminuyen con rehidratación y dieta",
                        "Paciente estable, tolera ingesta normal"
                    ]
                },
                {
                    motivo: ["erupción cutánea y fiebre baja", "malestar general"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere erupción cutánea y fiebre baja desde ${duracionSintoma} días",
                        "No antecedentes de alergias ni enfermedades crónicas"
                    ],
                    examenFisico: [
                        "Lesiones maculopapulares generalizadas, sin descamación",
                        "Signos vitales: TA 120/78 mmHg, FC 88 lpm, Temp 37.8°C"
                    ],
                    diagnostico: ["Exantema viral"],
                    plan: [
                        "Hidratación, control de fiebre y observación",
                        "Reevaluación si erupción se extiende o persiste"
                    ],
                    evolucion: [
                        "Erupción y malestar ceden progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["tos y dificultad respiratoria leve", "fiebre intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere tos y leve dificultad respiratoria desde ${duracionSintoma} días",
                        "Niega antecedentes pulmonares crónicos"
                    ],
                    examenFisico: [
                        "Auscultación pulmonar con estertores leves, saturación O2 96%",
                        "Signos vitales: TA 118/76 mmHg, FC 92 lpm, Temp 37.9°C"
                    ],
                    diagnostico: ["Infección respiratoria viral leve"],
                    plan: [
                        "Control sintomático, reposo e hidratación",
                        "Seguimiento ambulatorio en 3-4 días"
                    ],
                    evolucion: [
                        "Tos y dificultad respiratoria disminuyen gradualmente",
                        "Paciente estable y funcional"
                    ]
                }
            ],
            "Cardiología Infantil": [
                {
                    motivo: ["soplo cardíaco detectado en control rutinario", "leve fatiga al jugar"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere leve cansancio al jugar desde ${duracionSintoma} semanas",
                        "Niega antecedentes familiares de cardiopatías congénitas"
                    ],
                    examenFisico: [
                        "Soplo sistólico II/VI en foco mitral, ritmo regular",
                        "Signos vitales dentro de parámetros normales"
                    ],
                    diagnostico: ["Soplo funcional, sin repercusión hemodinámica"],
                    plan: [
                        "Ecocardiograma de control, seguimiento ambulatorio",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Paciente tolera actividad física normal",
                        "Soplo estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["palpitaciones intermitentes", "fatiga durante clases de educación física"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere palpitaciones ocasionales desde ${duracionSintoma} semanas",
                        "No antecedentes de cardiopatías ni síncopes previos"
                    ],
                    examenFisico: [
                        "TA 100/60 mmHg, FC 110 lpm, ritmo regular",
                        "Auscultación cardíaca normal"
                    ],
                    diagnostico: ["Arritmia sin complicaciones, probablemente benignas"],
                    plan: [
                        "Monitorización ambulatoria Holter, seguimiento en 2 semanas",
                        "Registro de síntomas por padres"
                    ],
                    evolucion: [
                        "Palpitaciones intermitentes, sin eventos graves",
                        "Paciente estable, sigue actividad escolar normalmente"
                    ]
                },
                {
                    motivo: ["cianosis leve en labios durante ejercicio", "disnea al correr"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere coloración azulada en labios al correr desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cardiopatía congénita diagnosticada"
                    ],
                    examenFisico: [
                        "TA 95/60 mmHg, FC 105 lpm, Sat O2 94% en reposo",
                        "Soplo sistólico II/VI, pulsos periféricos normales"
                    ],
                    diagnostico: ["Sospecha de cardiopatía congénita leve, pendiente de ecocardiografía"],
                    plan: [
                        "Ecocardiograma, control de saturación y signos de alarma",
                        "Seguimiento pediátrico especializado"
                    ],
                    evolucion: [
                        "Cianosis sólo durante esfuerzo intenso",
                        "Paciente estable, sin complicaciones agudas"
                    ]
                },
                {
                    motivo: ["dolor torácico intermitente", "mareos al correr"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor torácico y mareos durante ejercicio desde ${duracionSintoma} semanas",
                        "No antecedentes familiares de muerte súbita"
                    ],
                    examenFisico: [
                        "TA 102/64 mmHg, FC 108 lpm, auscultación cardíaca normal",
                        "Resto del examen físico sin hallazgos"
                    ],
                    diagnostico: ["Dolor torácico de probable origen muscular, descartar arritmia"],
                    plan: [
                        "Electrocardiograma y seguimiento en 1 semana",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Dolor disminuye con reposo",
                        "Paciente estable, sin eventos agudos"
                    ]
                },
                {
                    motivo: ["palpitaciones tras esfuerzo escolar", "leve fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere palpitaciones ocasionales desde ${duracionSintoma} días",
                        "Sin antecedentes cardiacos"
                    ],
                    examenFisico: [
                        "TA 100/65 mmHg, FC 115 lpm, ritmo regular",
                        "Auscultación cardíaca normal"
                    ],
                    diagnostico: ["Taquicardia sinusal fisiológica"],
                    plan: [
                        "Registro de frecuencia cardíaca durante actividad física",
                        "Seguimiento en control pediátrico"
                    ],
                    evolucion: [
                        "Palpitaciones leves y esporádicas",
                        "Paciente estable, actividad escolar normal"
                    ]
                },
                {
                    motivo: ["soplo cardíaco detectado en control de crecimiento", "sin síntomas asociados"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere control pediátrico rutinario",
                        "Sin antecedentes familiares relevantes de cardiopatías"
                    ],
                    examenFisico: [
                        "Soplo sistólico II/VI en foco aórtico, ritmo regular",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Soplo inocente, seguimiento anual"],
                    plan: [
                        "Control ambulatorio pediátrico y ecocardiograma si síntomas aparecen",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Paciente sin síntomas, soplo estable",
                        "Crecimiento y desarrollo normales"
                    ]
                },
                {
                    motivo: ["cansancio al correr", "palpitaciones leves"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere cansancio y palpitaciones leves desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cardiopatía congénita"
                    ],
                    examenFisico: [
                        "TA 98/60 mmHg, FC 110 lpm, ritmo regular",
                        "Auscultación cardíaca normal, pulsos periféricos presentes"
                    ],
                    diagnostico: ["Palpitaciones benignas relacionadas con esfuerzo"],
                    plan: [
                        "Educación a padres sobre signos de alarma",
                        "Seguimiento ambulatorio en 1 mes"
                    ],
                    evolucion: [
                        "Palpitaciones y cansancio leves, sin complicaciones",
                        "Paciente tolera actividad escolar normal"
                    ]
                },
                {
                    motivo: ["dolor torácico leve", "fatiga durante actividad física"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor torácico y fatiga desde ${duracionSintoma} semanas",
                        "No antecedentes de cardiopatía en familia"
                    ],
                    examenFisico: [
                        "TA 100/60 mmHg, FC 105 lpm, auscultación normal",
                        "Examen físico general sin hallazgos"
                    ],
                    diagnostico: ["Dolor torácico funcional, descartar arritmia"],
                    plan: [
                        "Electrocardiograma y seguimiento pediátrico",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Dolor leve cede con reposo",
                        "Paciente estable, sin eventos graves"
                    ]
                },
                {
                    motivo: ["mareos intermitentes", "palpitaciones al correr"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere mareos intermitentes y palpitaciones desde ${duracionSintoma} semanas",
                        "No antecedentes familiares de cardiopatía"
                    ],
                    examenFisico: [
                        "TA 102/62 mmHg, FC 112 lpm, auscultación normal",
                        "Resto del examen físico sin hallazgos"
                    ],
                    diagnostico: ["Síncope vasovagal probable"],
                    plan: [
                        "Educación a padres sobre manejo y signos de alarma",
                        "Seguimiento ambulatorio en 1-2 semanas"
                    ],
                    evolucion: [
                        "Mareos leves, sin desmayos",
                        "Paciente estable y funcional"
                    ]
                },
                {
                    motivo: ["fatiga excesiva durante actividades escolares", "palpitaciones leves"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere fatiga excesiva desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cardiopatía congénita"
                    ],
                    examenFisico: [
                        "TA 100/65 mmHg, FC 108 lpm, ritmo regular",
                        "Auscultación cardíaca normal"
                    ],
                    diagnostico: ["Fatiga relacionada con esfuerzo, descartar causas cardiacas"],
                    plan: [
                        "Electrocardiograma y control pediátrico",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Fatiga disminuye con ajustes de actividad",
                        "Paciente estable, sigue actividad escolar normal"
                    ]
                }
            ],
            "Oncología Pediátrica": [
                {
                    motivo: ["fatiga persistente", "palidez"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere cansancio marcado y palidez desde ${duracionSintoma} semanas",
                        "Sin antecedentes familiares relevantes de enfermedades hematológicas"
                    ],
                    examenFisico: [
                        "Palidez cutáneo-mucosa marcada, sin petequias",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Anemia aplásica sospechada, pendiente estudios hematológicos"],
                    plan: [
                        "Hemograma completo y frotis periférico, seguimiento hematología pediátrica",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Fatiga disminuye tras corrección de anemia",
                        "Paciente estable, sin complicaciones agudas"
                    ]
                },
                {
                    motivo: ["fiebre recurrente", "dolor óseo intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere episodios de fiebre y dolor óseo desde ${duracionSintoma} semanas",
                        "Sin antecedentes de traumatismos"
                    ],
                    examenFisico: [
                        "Sensibilidad a la palpación en fémur y tibia",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Leucemia linfoblástica aguda sospechada"],
                    plan: [
                        "Hemograma, aspirado medular y pruebas complementarias",
                        "Referencia a oncología pediátrica"
                    ],
                    evolucion: [
                        "Dolor óseo intermitente, fiebre cede temporalmente",
                        "Paciente estable bajo seguimiento hospitalario"
                    ]
                },
                {
                    motivo: ["hematomas frecuentes", "sangrado nasal ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de hematomas y epistaxis desde ${duracionSintoma} semanas",
                        "Sin antecedentes de traumatismos recientes"
                    ],
                    examenFisico: [
                        "Petequias dispersas en extremidades, sangrado nasal leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trastorno hematológico sospechoso, descartar leucemia"],
                    plan: [
                        "Hemograma completo, coagulación y derivación a oncología pediátrica",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Hematomas y epistaxis disminuyen tras manejo inicial",
                        "Paciente estable, seguimiento en curso"
                    ]
                },
                {
                    motivo: ["dolor abdominal persistente", "masa palpable en fosa renal"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal y masa palpable desde ${duracionSintoma} semanas",
                        "No antecedentes de cirugías abdominales previas"
                    ],
                    examenFisico: [
                        "Masa palpable en flanco derecho, firme, indolora",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de tumor renal pediátrico (Wilms)"],
                    plan: [
                        "Ecografía abdominal, estudios de imagen complementarios, derivación a oncología pediátrica",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Masa estable, dolor abdominal disminuye con medidas de soporte",
                        "Paciente estable bajo seguimiento"
                    ]
                },
                {
                    motivo: ["fiebre persistente", "pérdida de apetito"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere fiebre de baja intensidad y disminución del apetito desde ${duracionSintoma} semanas",
                        "No antecedentes de infecciones graves recientes"
                    ],
                    examenFisico: [
                        "Leve palidez, ganglios linfáticos cervicales discretamente aumentados",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Linfoma pediátrico sospechoso"],
                    plan: [
                        "Hemograma, biopsia ganglionar y estudios de imagen",
                        "Referencia a oncología pediátrica"
                    ],
                    evolucion: [
                        "Fiebre cede parcialmente, apetito mejora lentamente",
                        "Paciente estable bajo seguimiento oncológico"
                    ]
                },
                {
                    motivo: ["dolor de extremidades", "cojeras intermitentes"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor de piernas y cojera intermitente desde ${duracionSintoma} semanas",
                        "Sin antecedentes de traumatismos"
                    ],
                    examenFisico: [
                        "Dolor a la palpación de fémur proximal derecho, movilidad conservada",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de tumor óseo pediátrico"],
                    plan: [
                        "Radiografía de extremidades, derivación a oncología ortopédica pediátrica",
                        "Seguimiento ambulatorio y control del dolor"
                    ],
                    evolucion: [
                        "Dolor disminuye con analgésicos",
                        "Paciente estable, continúa seguimiento especializado"
                    ]
                },
                {
                    motivo: ["palidez progresiva", "letargo"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere palidez y letargo progresivo desde ${duracionSintoma} semanas",
                        "No antecedentes de enfermedades hematológicas familiares"
                    ],
                    examenFisico: [
                        "Palidez cutánea marcada, mucosas pálidas",
                        "Signos vitales dentro de límites normales"
                    ],
                    diagnostico: ["Anemia severa secundaria a proceso oncológico sospechoso"],
                    plan: [
                        "Hemograma, frotis periférico, derivación a oncología pediátrica",
                        "Control ambulatorio y soporte transfusional según necesidad"
                    ],
                    evolucion: [
                        "Letargo disminuye tras corrección de anemia",
                        "Paciente estable bajo seguimiento"
                    ]
                },
                {
                    motivo: ["ganglios cervicales aumentados", "fiebre intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere inflamación de ganglios y fiebre intermitente desde ${duracionSintoma} semanas",
                        "Sin antecedentes de infecciones recurrentes"
                    ],
                    examenFisico: [
                        "Ganglios cervicales bilaterales, firmes, móviles y dolorosos a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Linfadenopatía sospechosa, descartar linfoma pediátrico"],
                    plan: [
                        "Biopsia ganglionar, estudios de imagen y derivación a oncología pediátrica",
                        "Seguimiento clínico ambulatorio"
                    ],
                    evolucion: [
                        "Fiebre intermitente cede con medidas sintomáticas",
                        "Ganglios persistentes, paciente estable bajo seguimiento"
                    ]
                },
                {
                    motivo: ["dolor abdominal intermitente", "náuseas ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal y náuseas desde ${duracionSintoma} semanas",
                        "Sin antecedentes quirúrgicos previos"
                    ],
                    examenFisico: [
                        "Abdomen blando, dolor leve en fosa iliaca derecha, sin masas palpables",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de tumor abdominal pediátrico, estudio por imagen requerido"],
                    plan: [
                        "Ecografía abdominal y estudios complementarios, derivación a oncología pediátrica",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Dolor abdominal disminuye con medidas de soporte",
                        "Paciente estable, seguimiento en curso"
                    ]
                },
                {
                    motivo: ["hematomas frecuentes", "dolor articular leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de hematomas y dolor articular desde ${duracionSintoma} semanas",
                        "Sin antecedentes de traumatismos ni enfermedades hematológicas conocidas"
                    ],
                    examenFisico: [
                        "Hematomas dispersos en extremidades, articulaciones sin inflamación evidente",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trastorno hematológico sospechoso, descartar proceso oncológico"],
                    plan: [
                        "Hemograma completo, frotis periférico, derivación a oncología pediátrica",
                        "Seguimiento ambulatorio y control de síntomas"
                    ],
                    evolucion: [
                        "Hematomas disminuyen con manejo inicial",
                        "Paciente estable, sin complicaciones agudas"
                    ]
                }
            ],
            "Nefrología Infantil": [
                {
                    motivo: ["orina oscura", "edema leve en párpados"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere orina oscura desde ${duracionSintoma} días",
                        "No antecedentes de infecciones urinarias previas"
                    ],
                    examenFisico: [
                        "Edema leve en párpados, tensión arterial normal",
                        "Signos vitales dentro de parámetros normales"
                    ],
                    diagnostico: ["Sospecha de glomerulonefritis postinfecciosa leve"],
                    plan: [
                        "Analítica renal completa, control de tensión arterial y seguimiento ambulatorio",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Orina se normaliza progresivamente",
                        "Edema disminuye, paciente estable"
                    ]
                },
                {
                    motivo: ["dolor lumbar intermitente", "disuria ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor lumbar intermitente y disuria desde ${duracionSintoma} días",
                        "Sin antecedentes de infecciones urinarias recurrentes"
                    ],
                    examenFisico: [
                        "Palpación lumbar sin hallazgos significativos",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de infección urinaria baja"],
                    plan: [
                        "Urocultivo, antibioterapia empírica según protocolo pediátrico",
                        "Seguimiento ambulatorio en 3-5 días"
                    ],
                    evolucion: [
                        "Dolor lumbar y disuria disminuyen con tratamiento",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["edema de miembros inferiores", "fatiga matutina"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere edema en pies y piernas desde ${duracionSintoma} días",
                        "Sin antecedentes de enfermedad renal crónica"
                    ],
                    examenFisico: [
                        "Edema leve a moderado en tobillos y pies, tensión arterial normal",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de síndrome nefrótico leve"],
                    plan: [
                        "Analítica renal completa, control de edema y proteínas en orina",
                        "Seguimiento con nefrología pediátrica"
                    ],
                    evolucion: [
                        "Edema disminuye con manejo conservador",
                        "Paciente estable, parámetros renales dentro de límites"
                    ]
                },
                {
                    motivo: ["hematuria intermitente", "dolor abdominal leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere orina con sangre intermitente desde ${duracionSintoma} días",
                        "Sin antecedentes de traumatismos"
                    ],
                    examenFisico: [
                        "Abdomen blando, sin masas palpables",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de glomerulonefritis o infección urinaria alta"],
                    plan: [
                        "Urocultivo, analítica renal y ecografía renal",
                        "Seguimiento ambulatorio y control de signos de alarma"
                    ],
                    evolucion: [
                        "Hematuria disminuye progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["poliuria y polidipsia", "leve pérdida de peso"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aumento de volumen urinario y sed excesiva desde ${duracionSintoma} semanas",
                        "Sin antecedentes de diabetes conocida"
                    ],
                    examenFisico: [
                        "Signos vitales normales, hidratación conservada",
                        "Peso levemente disminuido respecto a controles previos"
                    ],
                    diagnostico: ["Sospecha de diabetes mellitus tipo 1 con repercusión renal incipiente"],
                    plan: [
                        "Glucemia, HbA1c, análisis renal y derivación a endocrinología y nefrología pediátrica",
                        "Educación a padres sobre manejo de signos de alarma"
                    ],
                    evolucion: [
                        "Poliuria y polidipsia disminuyen tras intervención inicial",
                        "Paciente estable, seguimiento multidisciplinario"
                    ]
                },
                {
                    motivo: ["orina espumosa", "edema leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere orina espumosa desde ${duracionSintoma} días",
                        "Sin antecedentes de enfermedad renal"
                    ],
                    examenFisico: [
                        "Edema leve en párpados, presión arterial normal",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de síndrome nefrótico inicial"],
                    plan: [
                        "Analítica renal, control de proteínas en orina, seguimiento nefrológico",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Edema y proteinuria disminuyen con manejo conservador",
                        "Paciente estable"
                    ]
                },
                {
                    motivo: ["dolor lumbar persistente", "fiebre intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor lumbar y fiebre intermitente desde ${duracionSintoma} días",
                        "Sin antecedentes de infecciones urinarias recurrentes"
                    ],
                    examenFisico: [
                        "Palpación lumbar sin hallazgos significativos",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Sospecha de pielonefritis leve"],
                    plan: [
                        "Urocultivo, antibioterapia según protocolo pediátrico",
                        "Seguimiento ambulatorio y control de temperatura"
                    ],
                    evolucion: [
                        "Dolor lumbar y fiebre disminuyen con tratamiento",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["hematuria microscópica detectada en análisis rutinario", "sin síntomas asociados"],
                    anamnesis: [
                        "Paciente de ${edad} años, hallazgo de hematuria microscópica en control de rutina",
                        "Sin antecedentes de enfermedad renal ni traumatismos"
                    ],
                    examenFisico: [
                        "Signos vitales normales, abdomen y región lumbar sin hallazgos",
                        "Examen físico general conservado"
                    ],
                    diagnostico: ["Hematuria microscópica idiopática, seguimiento recomendado"],
                    plan: [
                        "Analítica renal de control, seguimiento nefrológico",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Hematuria estable, sin complicaciones",
                        "Paciente mantiene crecimiento y desarrollo normales"
                    ]
                },
                {
                    motivo: ["edema facial matutino", "orina espumosa ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere edema facial al despertar y orina espumosa ocasional desde ${duracionSintoma} días",
                        "Sin antecedentes de enfermedad renal"
                    ],
                    examenFisico: [
                        "Edema leve en párpados, tensión arterial normal",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Síndrome nefrótico leve sospechoso"],
                    plan: [
                        "Analítica renal, control de proteinuria y seguimiento nefrológico",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Edema disminuye con manejo inicial",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["poliuria y enuresis nocturna", "leve fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aumento de volumen urinario y enuresis nocturna desde ${duracionSintoma} semanas",
                        "Sin antecedentes de diabetes ni enfermedad renal"
                    ],
                    examenFisico: [
                        "Signos vitales normales, hidratación conservada",
                        "Examen abdominal y lumbar sin hallazgos"
                    ],
                    diagnostico: ["Alteración transitoria de concentración urinaria, descartar causa renal"],
                    plan: [
                        "Analítica básica de orina, seguimiento ambulatorio",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Poliuria y enuresis mejoran progresivamente",
                        "Paciente estable, seguimiento ambulatorio recomendado"
                    ]
                }
            ],
            "Hematología Infantil": [
                {
                    motivo: ["palidez progresiva", "fatiga"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere palidez marcada y cansancio desde ${duracionSintoma} semanas",
                        "Sin antecedentes familiares de enfermedades hematológicas"
                    ],
                    examenFisico: [
                        "Palidez cutáneo-mucosa notable, sin petequias",
                        "Signos vitales dentro de límites normales"
                    ],
                    diagnostico: ["Anemia ferropénica leve"],
                    plan: [
                        "Suplementación con hierro oral, hemograma de control en 4 semanas",
                        "Educación a padres sobre dieta rica en hierro"
                    ],
                    evolucion: [
                        "Palidez y fatiga disminuyen progresivamente",
                        "Paciente estable, adherente al tratamiento"
                    ]
                },
                {
                    motivo: ["hematomas frecuentes", "sangrado nasal leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de hematomas y epistaxis desde ${duracionSintoma} semanas",
                        "Sin antecedentes de traumatismos significativos"
                    ],
                    examenFisico: [
                        "Petequias y hematomas dispersos en extremidades",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trombocitopenia leve"],
                    plan: [
                        "Hemograma completo, seguimiento hematológico",
                        "Evitar traumatismos, control ambulatorio en 1 semana"
                    ],
                    evolucion: [
                        "Hematomas y epistaxis disminuyen progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["fatiga intensa", "palidez"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere cansancio extremo y palidez desde ${duracionSintoma} semanas",
                        "Sin antecedentes de anemia previa"
                    ],
                    examenFisico: [
                        "Palidez severa, mucosas pálidas",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Anemia severa, estudio etiológico requerido"],
                    plan: [
                        "Hemograma completo, reticulocitos y estudios de hierro, referencia a hematología pediátrica",
                        "Control ambulatorio y soporte según necesidad"
                    ],
                    evolucion: [
                        "Fatiga disminuye tras medidas iniciales",
                        "Paciente estable bajo seguimiento especializado"
                    ]
                },
                {
                    motivo: ["moretones frecuentes", "dolor articular leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de hematomas espontáneos y dolor articular leve desde ${duracionSintoma} semanas",
                        "Sin antecedentes familiares de coagulopatías"
                    ],
                    examenFisico: [
                        "Hematomas dispersos, articulaciones sin inflamación significativa",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trastorno de coagulación leve sospechoso"],
                    plan: [
                        "Hemograma, pruebas de coagulación y derivación a hematología pediátrica",
                        "Seguimiento ambulatorio y control de síntomas"
                    ],
                    evolucion: [
                        "Hematomas y dolor articular disminuyen con manejo conservador",
                        "Paciente estable, sin eventos graves"
                    ]
                },
                {
                    motivo: ["palidez y fatiga progresiva", "mareos ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere palidez y cansancio desde ${duracionSintoma} semanas, asociadas a mareos ocasionales",
                        "Sin antecedentes de anemia o hemorragias previas"
                    ],
                    examenFisico: [
                        "Palidez cutáneo-mucosa moderada",
                        "Signos vitales normales, examen neurológico sin hallazgos"
                    ],
                    diagnostico: ["Anemia por deficiencia de hierro"],
                    plan: [
                        "Suplementación con hierro, hemograma de control en 4 semanas",
                        "Educación a padres sobre dieta y adherencia"
                    ],
                    evolucion: [
                        "Síntomas de fatiga y mareos disminuyen progresivamente",
                        "Paciente estable y adherente a tratamiento"
                    ]
                },
                {
                    motivo: ["sangrado gingival leve", "hematomas pequeños"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere sangrado de encías y hematomas pequeños desde ${duracionSintoma} días",
                        "Sin antecedentes de traumatismos ni enfermedad hemorrágica conocida"
                    ],
                    examenFisico: [
                        "Petequias y hematomas dispersos, sangrado gingival leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trastorno de coagulación leve, descartar trombocitopenia"],
                    plan: [
                        "Hemograma y pruebas de coagulación, derivación a hematología pediátrica",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Sangrado y hematomas disminuyen progresivamente",
                        "Paciente estable, seguimiento ambulatorio"
                    ]
                },
                {
                    motivo: ["fatiga extrema", "palidez marcada"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere cansancio intenso y palidez desde ${duracionSintoma} semanas",
                        "Sin antecedentes de enfermedades hematológicas familiares"
                    ],
                    examenFisico: [
                        "Palidez severa, mucosas muy pálidas",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Anemia grave, etiología a determinar"],
                    plan: [
                        "Hemograma completo, reticulocitos, estudios de hierro y vitamina B12, derivación a hematología pediátrica",
                        "Control ambulatorio y soporte según indicación"
                    ],
                    evolucion: [
                        "Fatiga disminuye tras intervención inicial",
                        "Paciente estable, seguimiento cercano requerido"
                    ]
                },
                {
                    motivo: ["hematomas recurrentes", "palidez leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere hematomas frecuentes y palidez leve desde ${duracionSintoma} semanas",
                        "Sin antecedentes de traumatismos"
                    ],
                    examenFisico: [
                        "Petequias y hematomas en extremidades, palidez leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trombocitopenia leve idiopática"],
                    plan: [
                        "Hemograma completo, seguimiento hematológico",
                        "Evitar traumatismos, control ambulatorio"
                    ],
                    evolucion: [
                        "Hematomas disminuyen, paciente estable",
                        "Palidez leve mejora progresivamente"
                    ]
                },
                {
                    motivo: ["cansancio persistente", "mareos ocasionales"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere cansancio y mareos intermitentes desde ${duracionSintoma} semanas",
                        "Sin antecedentes de anemia o enfermedades hematológicas"
                    ],
                    examenFisico: [
                        "Palidez cutáneo-mucosa moderada",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Anemia leve por deficiencia de hierro"],
                    plan: [
                        "Suplementación con hierro y seguimiento hematológico",
                        "Educación a padres sobre dieta y adherencia"
                    ],
                    evolucion: [
                        "Fatiga y mareos disminuyen progresivamente",
                        "Paciente estable, adherente a tratamiento"
                    ]
                },
                {
                    motivo: ["moretones espontáneos", "sangrado leve de mucosas"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere aparición de moretones y sangrado leve de mucosas desde ${duracionSintoma} semanas",
                        "Sin antecedentes familiares de coagulopatías"
                    ],
                    examenFisico: [
                        "Petequias y hematomas dispersos, sangrado leve de mucosas",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Trastorno de coagulación leve, descartar trombocitopenia"],
                    plan: [
                        "Hemograma completo y pruebas de coagulación, derivación a hematología pediátrica",
                        "Seguimiento ambulatorio y control de signos de alarma"
                    ],
                    evolucion: [
                        "Moretones y sangrado leve disminuyen progresivamente",
                        "Paciente estable, sin complicaciones"
                    ]
                }
            ]
            ,
            "Cirugía General": [
                {
                    motivo: ["dolor abdominal agudo", "náuseas y vómitos"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal agudo desde ${duracionSintoma} horas, acompañado de náuseas",
                        "Sin antecedentes quirúrgicos previos"
                    ],
                    examenFisico: [
                        "Abdomen rígido, dolor a la palpación en fosa iliaca derecha",
                        "Signos vitales normales, sin fiebre"
                    ],
                    diagnostico: ["Sospecha de apendicitis aguda"],
                    plan: [
                        "Evaluación quirúrgica urgente, analítica completa y ecografía abdominal",
                        "Preparación preoperatoria en caso de confirmación"
                    ],
                    evolucion: [
                        "Dolor disminuye parcialmente tras analgesia inicial",
                        "Paciente estable, pendiente resolución quirúrgica"
                    ]
                },
                {
                    motivo: ["hernia inguinal dolorosa", "masa palpable"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere bulto doloroso en región inguinal desde ${duracionSintoma} días",
                        "No antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Masa inguinal reducible con leve dolor a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Hernia inguinal no complicada"],
                    plan: [
                        "Programar cirugía electiva de reparación de hernia",
                        "Educación sobre signos de estrangulación"
                    ],
                    evolucion: [
                        "Dolor leve persistente, paciente estable",
                        "Seguimiento postoperatorio programado"
                    ]
                },
                {
                    motivo: ["colelitiasis sintomática", "dolor en hipocondrio derecho"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor cólico en hipocondrio derecho desde ${duracionSintoma} días",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Sensibilidad en hipocondrio derecho, sin ictericia",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Colelitiasis sintomática"],
                    plan: [
                        "Colecistectomía laparoscópica programada",
                        "Analgesia y dieta blanda mientras espera cirugía"
                    ],
                    evolucion: [
                        "Dolor intermitente controlado con analgesia",
                        "Paciente estable, seguimiento quirúrgico programado"
                    ]
                },
                {
                    motivo: ["úlcera inguinal con signos de infección", "eritema local"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere úlcera en región inguinal desde ${duracionSintoma} días con enrojecimiento progresivo",
                        "Sin antecedentes de cirugía en la zona"
                    ],
                    examenFisico: [
                        "Úlcera con eritema y secreción purulenta, dolor a la palpación",
                        "Signos vitales normales, sin fiebre"
                    ],
                    diagnostico: ["Absceso inguinal"],
                    plan: [
                        "Drenaje quirúrgico menor, antibiótico según protocolo",
                        "Control ambulatorio post procedimiento"
                    ],
                    evolucion: [
                        "Secreción disminuye tras drenaje",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["hemorroides dolorosas", "sangrado rectal ocasional"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor anal y sangrado durante evacuación desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cirugía rectal"
                    ],
                    examenFisico: [
                        "Hemorroides internas y externas inflamadas, dolor leve a palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Hemorroides internas y externas sintomáticas"],
                    plan: [
                        "Tratamiento conservador con dieta rica en fibra y analgésicos",
                        "Control ambulatorio en 2 semanas, cirugía si persisten síntomas"
                    ],
                    evolucion: [
                        "Dolor disminuye con manejo conservador",
                        "Paciente estable, sin complicaciones graves"
                    ]
                },
                {
                    motivo: ["quiste de mama palpable", "dolor local leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere bulto palpable en mama derecha desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cirugía mamaria"
                    ],
                    examenFisico: [
                        "Masa firme, móvil y dolorosa a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Quiste mamario benigno sospechoso"],
                    plan: [
                        "Ecografía mamaria y seguimiento ambulatorio",
                        "Educación sobre signos de alarma y control periódico"
                    ],
                    evolucion: [
                        "Dolor leve persiste, tamaño estable",
                        "Paciente estable, control ambulatorio programado"
                    ]
                },
                {
                    motivo: ["hernia umbilical dolorosa", "masa palpable"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere hernia umbilical dolorosa desde ${duracionSintoma} días",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Masa umbilical reducible, dolor leve a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Hernia umbilical no complicada"],
                    plan: [
                        "Seguimiento quirúrgico y planificación de reparación electiva",
                        "Educación sobre signos de estrangulación"
                    ],
                    evolucion: [
                        "Dolor leve persiste, paciente estable",
                        "Programación de cirugía electiva"
                    ]
                },
                {
                    motivo: ["apendicitis crónica sospechada", "dolor intermitente en fosa iliaca derecha"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal intermitente en fosa iliaca derecha desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cirugías abdominales"
                    ],
                    examenFisico: [
                        "Dolor a la palpación en fosa iliaca derecha, sin defensa muscular",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Apendicitis crónica sospechada"],
                    plan: [
                        "Ecografía abdominal, hemograma y evaluación quirúrgica",
                        "Planificación de apendicectomía si se confirma diagnóstico"
                    ],
                    evolucion: [
                        "Dolor intermitente controlado con analgésicos",
                        "Paciente estable, seguimiento ambulatorio"
                    ]
                },
                {
                    motivo: ["colecistitis aguda leve", "dolor en hipocondrio derecho"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor en hipocondrio derecho desde ${duracionSintoma} horas",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Dolor a la palpación del hipocondrio derecho, defensa leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Colecistitis aguda leve"],
                    plan: [
                        "Analítica, ecografía abdominal y manejo quirúrgico según evolución",
                        "Analgesia y reposo relativo"
                    ],
                    evolucion: [
                        "Dolor disminuye con analgesia inicial",
                        "Paciente estable, pendiente resolución quirúrgica"
                    ]
                },
                {
                    motivo: ["quiste pilonidal doloroso", "secreción local"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere quiste pilonidal doloroso con secreción desde ${duracionSintoma} días",
                        "Sin antecedentes de cirugía en la zona"
                    ],
                    examenFisico: [
                        "Quiste con inflamación local y secreción purulenta leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Quiste pilonidal infectado leve"],
                    plan: [
                        "Drenaje quirúrgico menor, antibiótico según protocolo",
                        "Control ambulatorio post procedimiento"
                    ],
                    evolucion: [
                        "Secreción disminuye tras drenaje",
                        "Paciente estable, sin complicaciones"
                    ]
                }
            ]
            ,
            "Cirugía Pediátrica": [
                {
                    motivo: ["dolor abdominal agudo", "vómitos y fiebre leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal agudo desde ${duracionSintoma} horas, acompañado de vómitos",
                        "Sin antecedentes quirúrgicos previos"
                    ],
                    examenFisico: [
                        "Abdomen distendido, dolor a la palpación en fosa iliaca derecha",
                        "Signos vitales dentro de límites normales"
                    ],
                    diagnostico: ["Sospecha de apendicitis aguda"],
                    plan: [
                        "Evaluación quirúrgica urgente, hemograma y ecografía abdominal",
                        "Preparación preoperatoria en caso de confirmación"
                    ],
                    evolucion: [
                        "Dolor disminuye parcialmente tras analgesia inicial",
                        "Paciente estable, pendiente resolución quirúrgica"
                    ]
                },
                {
                    motivo: ["hernia inguinal dolorosa", "masa palpable"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere bulto doloroso en región inguinal desde ${duracionSintoma} días",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Masa inguinal reducible con leve dolor a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Hernia inguinal no complicada"],
                    plan: [
                        "Programar cirugía electiva de reparación de hernia",
                        "Educación a padres sobre signos de estrangulación"
                    ],
                    evolucion: [
                        "Dolor leve persistente, paciente estable",
                        "Seguimiento postoperatorio programado"
                    ]
                },
                {
                    motivo: ["intususcepción intestinal sospechada", "dolor abdominal intermitente"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal intermitente desde ${duracionSintoma} horas, con episodios de llanto intenso",
                        "Sin antecedentes quirúrgicos previos"
                    ],
                    examenFisico: [
                        "Abdomen blando, masas palpables intermitentes",
                        "Signos vitales dentro de límites normales"
                    ],
                    diagnostico: ["Intususcepción intestinal sospechada"],
                    plan: [
                        "Ecografía abdominal urgente, enema terapéutico si indicado",
                        "Evaluación quirúrgica si no hay reducción"
                    ],
                    evolucion: [
                        "Dolor disminuye tras enema terapéutico parcial",
                        "Paciente estable, seguimiento cercano"
                    ]
                },
                {
                    motivo: ["apendicitis crónica sospechada", "dolor intermitente en fosa iliaca derecha"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor intermitente en fosa iliaca derecha desde ${duracionSintoma} semanas",
                        "Sin antecedentes de cirugías abdominales"
                    ],
                    examenFisico: [
                        "Dolor a la palpación en fosa iliaca derecha, sin defensa muscular",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Apendicitis crónica sospechada"],
                    plan: [
                        "Ecografía abdominal, hemograma y evaluación quirúrgica",
                        "Planificación de apendicectomía si se confirma diagnóstico"
                    ],
                    evolucion: [
                        "Dolor intermitente controlado con analgésicos",
                        "Paciente estable, seguimiento ambulatorio"
                    ]
                },
                {
                    motivo: ["hernia umbilical dolorosa", "masa palpable"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere hernia umbilical dolorosa desde ${duracionSintoma} días",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Masa umbilical reducible, dolor leve a la palpación",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Hernia umbilical no complicada"],
                    plan: [
                        "Seguimiento quirúrgico y planificación de reparación electiva",
                        "Educación a padres sobre signos de estrangulación"
                    ],
                    evolucion: [
                        "Dolor leve persiste, paciente estable",
                        "Programación de cirugía electiva"
                    ]
                },
                {
                    motivo: ["quiste sacrocoxígeo inflamado", "eritema local"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere quiste sacrocoxígeo inflamado desde ${duracionSintoma} días",
                        "Sin antecedentes de cirugía en la zona"
                    ],
                    examenFisico: [
                        "Quiste con eritema y secreción leve",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Quiste sacrocoxígeo infectado leve"],
                    plan: [
                        "Drenaje quirúrgico menor, antibiótico según protocolo",
                        "Control ambulatorio post procedimiento"
                    ],
                    evolucion: [
                        "Inflamación y secreción disminuyen tras drenaje",
                        "Paciente estable, sin complicaciones"
                    ]
                },
                {
                    motivo: ["hernia diafragmática reparada recientemente", "control postoperatorio"],
                    anamnesis: [
                        "Paciente de ${edad} años, control postoperatorio de reparación de hernia diafragmática realizada hace ${duracionSintoma} días",
                        "Sin complicaciones previas"
                    ],
                    examenFisico: [
                        "Cicatriz limpia, sin signos de infección",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Control postoperatorio normal"],
                    plan: [
                        "Seguir manejo ambulatorio, control en 1 semana",
                        "Educación a padres sobre cuidados de la herida"
                    ],
                    evolucion: [
                        "Cicatriz limpia, paciente estable",
                        "Sin complicaciones postoperatorias"
                    ]
                },
                {
                    motivo: ["apendicitis aguda", "dolor abdominal intenso y fiebre"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere dolor abdominal intenso desde ${duracionSintoma} horas, con fiebre asociada",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Dolor a la palpación en fosa iliaca derecha, defensa abdominal leve",
                        "Signos vitales normales salvo fiebre 38°C"
                    ],
                    diagnostico: ["Apendicitis aguda confirmada"],
                    plan: [
                        "Preparación quirúrgica para apendicectomía urgente",
                        "Analgesia y fluidoterapia según protocolo"
                    ],
                    evolucion: [
                        "Dolor disminuye tras analgesia inicial",
                        "Paciente estable, pendiente cirugía"
                    ]
                },
                {
                    motivo: ["onfalocele corregido recientemente", "control postoperatorio"],
                    anamnesis: [
                        "Paciente de ${edad} años, control postoperatorio de onfalocele corregido hace ${duracionSintoma} días",
                        "Sin complicaciones previas"
                    ],
                    examenFisico: [
                        "Cicatriz limpia, abdomen blando",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Control postoperatorio normal"],
                    plan: [
                        "Seguir manejo ambulatorio, control en 1 semana",
                        "Educación a padres sobre cuidados de la herida"
                    ],
                    evolucion: [
                        "Paciente estable, sin signos de infección",
                        "Seguimiento ambulatorio según protocolo"
                    ]
                },
                {
                    motivo: ["quiste mamario infantil", "masa palpable y dolor leve"],
                    anamnesis: [
                        "Paciente de ${edad} años, refiere bulto mamario y dolor leve desde ${duracionSintoma} semanas",
                        "Sin antecedentes quirúrgicos"
                    ],
                    examenFisico: [
                        "Masa palpable, móvil y dolorosa levemente",
                        "Signos vitales normales"
                    ],
                    diagnostico: ["Quiste mamario benigno sospechoso"],
                    plan: [
                        "Ecografía mamaria y seguimiento ambulatorio",
                        "Educación a padres sobre signos de alarma"
                    ],
                    evolucion: [
                        "Dolor leve persiste, paciente estable",
                        "Seguimiento ambulatorio programado"
                    ]
                }
            ]
        }

        

        // ------------------- FUNCIONES AUXILIARES -------------------
        function replacePlaceholders(text, vars) {
            if (!text) return '';
            return text
                .replace(/\$\{edad\}/g, vars.edad !== undefined ? String(vars.edad) : '')
                .replace(/\$\{duracionSintoma\}/g, vars.duracionSintoma || '')
                .replace(/\$\{antecedenteMedico\}/g, vars.antecedenteMedico || 'Sin antecedentes relevantes.');
        }

        function plantillaArrayToText(arr, vars) {
            if (!Array.isArray(arr)) return '';
            return arr.map(s => replacePlaceholders(s, vars)).join('\n\n');
        }

        function generarAntecedenteMedicoGenerico(edad) {
            if (edad < 18) return 'Sin antecedentes pediátricos relevantes.';
            return 'Antecedentes médicos generales dentro de la norma.';
        }

        function especialidadValidaParaPaciente(especialidad, paciente, fecha) {
            if (!paciente) return false;
            const edad = Math.floor(yearsBetween(paciente.fecha_nacimiento, fecha));
            if ((especialidad.includes('Pedi') || especialidad.includes('Infantil')) && edad >= 18) return false;
            if (especialidad === 'Obstetricia' && (paciente.sexo !== 'femenino' || edad < 16 || edad > 45)) return false;
            if (especialidad === 'Ginecología' && (paciente.sexo !== 'femenino')) return false;
            if (especialidad === 'Urología' && (paciente.sexo !== 'masculino')) return false;
            return true;
        }

        // ------------------- GENERAR NOTES COMPLETO -------------------
        function generarNotesCompleto({
            start, medico, centro, numero_afiliado,
            paciente, especialidad, perfil, archivedAt, modifiedAt,
            esCesarea = false, cesareaTipo = 'Cesárea programada'
        }) {
            const edad = Math.floor(yearsBetween(paciente.fecha_nacimiento, start));
            const duracionSintoma = randomItem([`${randInt(1, 3)}`, `${randInt(4, 7)}`, `${randInt(1, 4)}`]);
            
            let antecedenteMedico = '';
            if (perfil === 'cronico' || perfil === 'oncologico') {
                antecedenteMedico = generarAntecedenteMedicoGenerico(edad);
            } else {
                antecedenteMedico = randomItem([
                    'Niega antecedentes patológicos relevantes.',
                    'Sin antecedentes quirúrgicos importantes.',
                    'No refiere enfermedades familiares significativas.'
                ]);
            }
            const vars = { edad, duracionSintoma, antecedenteMedico };

            const fechaStr = start.toISOString().slice(0, 16).replace('T', ' ');
            const medicoStr = medico ? `${medico.nombre}` : 'No asignado';
            const centroStr = centro ? centro.nombre : 'No asignado';
            const nroAf = `${numero_afiliado}-${String(paciente.sufijo).padStart(2, '0')}`;

            const bloques = [];
            bloques.push(`<b>Fecha:</b> ${fechaStr}`);
            bloques.push(`<b>Médico:</b> ${medicoStr}`);
            bloques.push(`<b>Centro Médico:</b> ${centroStr}\n`);
            bloques.push(`<b>Datos del paciente:</b>`);
            bloques.push(`Nombre: ${paciente.nombre} ${paciente.apellido}`);
            bloques.push(`Edad: ${edad}`);
            bloques.push(`Sexo: ${paciente.sexo}`);
            bloques.push(`<b>N° Afiliado:</b> ${nroAf}\n`);

            if (esCesarea) {
                bloques.push(`<b>Motivo de consulta:</b> ${cesareaTipo}`);
                bloques.push(`<b>Anamnesis:</b> Embarazo a término, paciente programada para cesárea.`);
                bloques.push(`<b>Examen físico:</b> Signos vitales estables, abdomen grávido.`);
                bloques.push(`<b>Diagnóstico:</b> Parto por cesárea programada.`);
                bloques.push(`<b>Plan:</b> Internación y preparación quirúrgica.`);
                bloques.push(`<b>Evolución:</b> Vigilancia post-operatoria.\n`);
                if (modifiedAt) bloques.push(`<b>Última actualización:</b> ${modifiedAt.toISOString().slice(0, 16).replace('T', ' ')}`);
                return bloques.join('\n\n');
            }

            const plantilla = casosPorEspecialidad[especialidad] ? randomItem(casosPorEspecialidad[especialidad]) : null;

            if (plantilla) {

                
                if (plantilla.motivo) bloques.push(`<b>Motivo de consulta:</b> ${plantillaArrayToText(plantilla.motivo, vars)}`);
                if (plantilla.anamnesis) bloques.push(`<b>Anamnesis:</b> ${plantillaArrayToText(plantilla.anamnesis, vars)}`);
                if (plantilla.examenFisico) bloques.push(`<b>Examen físico:</b> ${plantillaArrayToText(plantilla.examenFisico, vars)}`);
                if (plantilla.diagnostico) bloques.push(`<b>Diagnóstico:</b> ${plantillaArrayToText(plantilla.diagnostico, vars)}`);
                if (plantilla.plan) bloques.push(`<b>Plan:</b> ${plantillaArrayToText(plantilla.plan, vars)}`);
            }

            const requiereEvolucionSiempre = perfil === 'cronico' || perfil === 'oncologico';
            const generarEvo = archivedAt && (requiereEvolucionSiempre || Math.random() < 0.4);
            if (generarEvo) {
                bloques.push(`<b>Evolución:</b> ${plantilla && plantilla.evolucion ? randomItem(plantilla.evolucion) : 'Evolución favorable.'}`);
                if (modifiedAt) bloques.push(`<b>Última actualización:</b> ${modifiedAt.toISOString().slice(0, 16).replace('T', ' ')}`);
            }

            return bloques.join('\n\n');
        }

        // ------------------- CARGA DE TABLAS -------------------
        const afiliados = await queryInterface.sequelize.query('SELECT * FROM "Afiliados";', { type: Sequelize.QueryTypes.SELECT });
        const integrantes = await queryInterface.sequelize.query('SELECT * FROM "Integrantes";', { type: Sequelize.QueryTypes.SELECT });
        const prestadores = await queryInterface.sequelize.query('SELECT * FROM "Prestadors";', { type: Sequelize.QueryTypes.SELECT });

        if (!afiliados.length) throw new Error('No hay Afiliados cargados.');
        if (!prestadores.length) throw new Error('No hay Prestadors cargados.');

        const medicos = prestadores.filter(p => p.role === 'medico');
        const centros = prestadores.filter(p => p.role === 'centro_medico');

        const afiliadoById = Object.fromEntries(afiliados.map(a => [a.id, a]));
        const integranteById = Object.fromEntries(integrantes.map(i => [i.id, i]));

        // ------------------- ASIGNAR PERFILES -------------------
        const perfilPorPersona = new Map();
        const distribucionPerfiles = [
            { tipo: 'sano', porcentaje: 45 },
            { tipo: 'agudo', porcentaje: 30 },
            { tipo: 'cronico', porcentaje: 18 },
            { tipo: 'oncologico', porcentaje: 4 },
        ];

        const elegirPerfil = (persona) => {
            const edad = Math.floor(yearsBetween(persona.fecha_nacimiento, HOY));
            const r = Math.random() * 100; let acc = 0;
            if(edad<18){return 'pediátrico'}
            for (const d of distribucionPerfiles) { acc += d.porcentaje; if (r <= acc) return d.tipo; }
            return 'sano';
        };

        for (const a of afiliados) {
            let p = elegirPerfil(a);
            perfilPorPersona.set(`A-${a.id}`, p);
        }
        for (const i of integrantes) {
            let p = elegirPerfil(i);
            
            perfilPorPersona.set(`I-${i.id}`, p);
        }

        // ------------------- GENERAR TURNOS PASADOS -------------------
        const turnosToInsert = [];
        const todasPersonas = [...afiliados.map(a => ({ tipo: 'A', id: a.id, data: a })), ...integrantes.map(i => ({ tipo: 'I', id: i.id, data: i }))];
        
        for (const persona of todasPersonas) {
            const clave = `${persona.tipo}-${persona.id}`;
            const perfil = perfilPorPersona.get(clave) || 'sano' //|| persona.data.sexo;
            const titular = persona.tipo === 'A' ? persona.data : afiliadoById[persona.data.afiliadoId];
            if (!titular || !titular.fecha_alta) continue;
            const fechaAlta = new Date(titular.fecha_alta);
            const años = yearsBetween(fechaAlta, HOY);
            const coefRange = PERFIL_COEF[perfil] || PERFIL_COEF.sano;
            let totalTurnos = randInt(Math.floor(coefRange[0] * años), Math.ceil(coefRange[1] * años));
            totalTurnos = clamp(totalTurnos, 0, 200);


            for (let t = 0; t < totalTurnos; t++) {

                const fechaRand = faker.date.between({ from: fechaAlta, to: addDays(HOY, -1) });
                const hour = randInt(8, 17); const minute = [0, 15, 30, 45][randInt(0, 3)];
                const start = new Date(fechaRand); start.setHours(hour, minute, 0, 0);
                const duration = randomItem([15, 20, 30, 45]);
                const archivedAt = addMinutes(start, randInt(1, 30));
                let modifiedAtTent = addDays(archivedAt, randInt(0, 14));
                if (modifiedAtTent < archivedAt) modifiedAtTent = new Date(archivedAt);

                const posiblesEsp = ESPECIALIDADES.filter(e=>especialidadValidaParaPaciente(e, persona,start));
                const r = Math.random() * 100;
                
                
                let especialidadElegida = r < 60 ? randomItem(ESPECIALIDADES_POR_PERFIL[perfil]) : randomItem(posiblesEsp);
                let medList = medicos.filter(m => Array.isArray(m.especialidades) && m.especialidades[0] === especialidadElegida);
                if (!medList.length) { medList = medicos; especialidadElegida = medList[0].especialidades[0]; }
                const medicoSel = randomItem(medList);
                const centroSel = centros.find(c => c.id === medicoSel.centroId);

                

                const afiliadoIdFinal = persona.tipo === 'A' ? persona.id : persona.data.afiliadoId;
                const integranteIdFinal = persona.tipo === 'I' ? persona.id : null;

                let esCesarea = false;
                //if (perfil === 'materno' && Math.random() < 0.5) { especialidadElegida = 'Obstetricia'; esCesarea = true; }

                const numero_afiliado = persona.tipo === 'A' ? persona.data.numero_afiliado : (afiliadoById[persona.data.afiliadoId]).numero_afiliado;
                

                const notes = generarNotesCompleto({ start, medico: medicoSel, centro: centroSel, numero_afiliado, paciente: persona.data, especialidad: especialidadElegida, perfil, archivedAt, modifiedAt: modifiedAtTent, esCesarea });

                const contieneEvolucion = notes.includes('<b>Evolución:');
                const modifiedAtFinal = contieneEvolucion ? modifiedAtTent : null;
                const dateT = new Date(start.getTime() - randInt(1, 60) * 24 * 60 * 60 * 1000)
                
                turnosToInsert.push({
                    date: dateT > fechaAlta ? dateT : fechaAlta,
                    start,
                    duration,
                    archivedAt,
                    modifiedAt: modifiedAtFinal,
                    notes,
                    descripcion: `Consulta ${especialidadElegida}`,
                    afiliadoId: persona.tipo === 'A' ? persona.id : null,
                    integranteId: persona.tipo === 'I' ? persona.id : null,
                    prestadorId: medicoSel.id,
                    centroId: centroSel ? centroSel.id : null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                
                if (turnosToInsert.length >= BATCH_SIZE) {
                    await queryInterface.bulkInsert('Turnos', turnosToInsert.splice(0, turnosToInsert.length), {});
                }
            }
        }

        

        // ------------------- TURNOS FUTUROS -------------------
        
        for (const medico of medicos) {
            const especialidadMed = Array.isArray(medico.especialidades) ? medico.especialidades[0] : 'Clínica Médica';
            if (especialidadMed.toLowerCase().includes('Guardia') || especialidadMed.toLowerCase().includes('Terapia Intensiva')) continue;

            const dailyRange = dailyRangePorEspecialidad[especialidadMed] || DEFAULT_DAILY_RANGE;

            for (let d = 0; d <= NUM_DIAS_FUTUROS; d++) {
                const dia = addDays(HOY, d);
                const nTurnosDia = randInt(dailyRange[0], dailyRange[1]);

                const morningStart = new Date(dia); morningStart.setHours(8, 0, 0, 0);
                const afternoonStart = new Date(dia); afternoonStart.setHours(15, 30, 0, 0);
                const durationMorning = randomItem([15, 20, 30, 45])
                const durationEvening = randomItem([15, 20, 30, 45])
                const slots = [];
                const morningCount = Math.floor(nTurnosDia * 0.6);
                const afternoonCount = nTurnosDia - morningCount;

                let cursor = new Date(morningStart);
                for (let s = 0; s < morningCount; s++) {
                    slots.push({ start: new Date(cursor), duration: durationMorning});
                    cursor = addMinutes(cursor, durationMorning);
                }

                cursor = new Date(afternoonStart);
                for (let s = 0; s < afternoonCount; s++) {
                    slots.push({ start: new Date(cursor), duration: durationEvening });
                    cursor = addMinutes(cursor, durationEvening);
                }

                for (const slot of slots) {
                    let usarIntegrante = Math.random() < 0.5 && integrantes.length > 0;
                    let pacienteObj = usarIntegrante ? randomItem(integrantes) : randomItem(afiliados);

                    let tries = 0;
                    while (!especialidadValidaParaPaciente(especialidadMed, pacienteObj,dia) && tries < 20) {
                        usarIntegrante = Math.random() < 0.5 && integrantes.length > 0;
                        pacienteObj = usarIntegrante ? randomItem(integrantes) : randomItem(afiliados);
                        tries++;
                    }
                    if (!especialidadValidaParaPaciente(especialidadMed, pacienteObj,dia)) continue;

                    const afiliadoIdFinal = usarIntegrante ? null : pacienteObj.id;
                    const integranteIdFinal = usarIntegrante ? pacienteObj.id : null;
                    
                    turnosToInsert.push({
                        date: faker.date.between({ from: addDays(HOY,-14), to: addDays(slot.start, -1) }),
                        start: slot.start,
                        duration: slot.duration,
                        archivedAt: null,
                        modifiedAt: null,
                        notes: null,
                        descripcion: `Agenda ${especialidadMed}`,
                        afiliadoId: afiliadoIdFinal,
                        integranteId: integranteIdFinal,
                        prestadorId: medico.id,
                        centroId: medico.centroId || null,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });

                    if (turnosToInsert.length >= BATCH_SIZE) {
                        await queryInterface.bulkInsert('Turnos', turnosToInsert.splice(0, turnosToInsert.length), {});
                    }
                }
            }
        }

        if (turnosToInsert.length) {
            await queryInterface.bulkInsert('Turnos', turnosToInsert, {});
        }

        console.log('✅ Seeder de Turnos finalizado (pasados + futuros).');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Turnos', null, {});
    }
};
