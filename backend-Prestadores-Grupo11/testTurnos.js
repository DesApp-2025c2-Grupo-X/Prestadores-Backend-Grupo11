const {Turno} = require('./db/models');
const { notify } = require('./routes/auth.route');

const crearTurnos = async () => {
    await Turno.bulkCreate([
        {
            date: "2025-01-07T09:15:00",
            start: "2025-01-07T08:30:00",
            duration: 45,
            notes: "Durante la consulta cardiológica, el paciente acudió para un control dirigido a evaluar síntomas recientes y revisar la evolución de factores de riesgo. Refirió sensación intermitente de cansancio tras esfuerzos prolongados, sin dolor torácico típico ni disnea significativa. En el examen físico se observaron signos vitales dentro de parámetros aceptables, aunque con tendencia a hipertensión leve. La auscultación cardíaca mostró tonos rítmicos sin soplos ni arritmias. Se revisaron estudios previos con ECG en ritmo sinusal y se solicitaron nuevos análisis de laboratorio junto con un ecocardiograma Doppler para evaluación estructural y funcional. Se reforzaron medidas de estilo de vida y se pautó seguimiento.",
            afiliadoId: 1,
            prestadorId: 1,
            centroId: 3
        },
        {
            date: "2025-01-12T14:40:00",
            start: "2025-01-12T13:55:00",
            duration: 45,
            notes: "El paciente asistió para control cardiovascular general, refiriendo estabilidad clínica pero episodios ocasionales de fatiga al final del día. Negó dolor torácico, palpitaciones sostenidas o síncope. En el examen físico no se encontraron hallazgos patológicos relevantes, salvo una presión arterial algo elevada en reposo. La auscultación cardíaca fue normal. Se revisaron estudios previos que mostraron perfil lipídico alto y ECG sin alteraciones. Se recomendaron medidas higiénico-dietéticas, control ambulatorio y estudios complementarios para ajuste terapéutico.",
            integranteId: 1,
            prestadorId: 7,
            centroId: 4
        },

        {
            date: "2025-02-03T11:20:00",
            start: "2025-02-03T10:35:00",
            duration: 45,
            notes: "El paciente acudió para control de rutina manifestando sensación de agotamiento variable según la carga laboral. Descartó dolor torácico, palpitaciones severas o mareos importantes. En la exploración física se evidenció estabilidad hemodinámica, auscultación cardíaca normal y ausencia de edemas. Estudios previos mostraron colesterol total elevado. Se indicó reevaluación con análisis de laboratorio, seguimiento periódico y mantenimiento de actividad aeróbica moderada.",
            afiliadoId: 2,
            prestadorId: 12,
            centroId: 5
        },
        {
            date: "2025-02-14T16:05:00",
            start: "2025-02-14T15:20:00",
            duration: 45,
            notes: "Durante la consulta, el paciente refirió estabilidad general pero cierta pesadez al caminar distancias largas. Negó disnea en reposo, dolor precordial o arritmias percibidas. El examen físico reveló presión arterial algo elevada, sin signos de insuficiencia cardíaca. La auscultación pulmonar fue normal. Estudios previos mostraron valores lipídicos altos y ECG normal. Se recomendó control periódico, dieta baja en grasas y nuevos estudios complementarios.",
            integranteId: 2,
            prestadorId: 18,
            centroId: 3
        },

        {
            date: "2025-03-02T08:50:00",
            start: "2025-03-02T08:05:00",
            duration: 45,
            notes: "El paciente asistió para reevaluación de síntomas inespecíficos de cansancio, sin signos claros de patología aguda. No presentó dolor torácico ni disnea limitante. En la exploración física se observaron signos vitales estables y examen cardiovascular normal. El ECG previo mostró ritmo sinusal sin alteraciones. Se indicó laboratorio completo, ecocardiograma y refuerzo de medidas no farmacológicas con seguimiento cercano.",
            afiliadoId: 3,
            prestadorId: 26,
            centroId: 4
        },
        {
            date: "2025-03-18T10:10:00",
            start: "2025-03-18T09:25:00",
            duration: 45,
            notes: "Acudió para control mencionando fluctuaciones en su nivel de energía, especialmente tras días laboralmente exigentes. Sin síntomas anginosos ni palpitaciones persistentes. Examen físico dentro de parámetros, salvo presión arterial en rango alto normal. ECG previo sin alteraciones. Se solicitaron estudios adicionales y se reforzaron recomendaciones dietéticas y de actividad aeróbica regular.",
            integranteId: 3,
            prestadorId: 30,
            centroId: 5
        },

        {
            date: "2025-04-05T12:45:00",
            start: "2025-04-05T12:00:00",
            duration: 45,
            notes: "El paciente relató episodios breves de cansancio sin relación clara con el esfuerzo y sin otros síntomas cardiovasculares asociados. El examen físico fue normal, con buena perfusión periférica y auscultación cardíaca sin soplos. Se revisaron estudios previos que mostraron lípidos elevados y ECG normal. Se aconsejó control domiciliario de presión arterial y estudios complementarios.",
            afiliadoId: 4,
            prestadorId: 6,
            centroId: 3
        },
        {
            date: "2025-04-19T09:00:00",
            start: "2025-04-19T08:15:00",
            duration: 45,
            notes: "En el control, el paciente manifestó sentirse estable pero con menor resistencia física que meses atrás. No refirió disnea, dolor torácico ni síncope. Examen físico sin hallazgos patológicos, presión arterial en límite alto. ECG previo normal. Se planificaron estudios adicionales y se reforzó la importancia de hábitos saludables y seguimiento periódico.",
            integranteId: 4,
            prestadorId: 11,
            centroId: 4
        },

        {
            date: "2025-05-01T17:20:00",
            start: "2025-05-01T16:35:00",
            duration: 45,
            notes: "El paciente acudió para control integral, refiriendo cansancio leve ocasional, especialmente al final del día. Negó dolor torácico o arritmias. El examen cardiovascular resultó normal, con ligera tendencia a hipertensión. ECG previo sin alteraciones. Se solicitaron estudios complementarios y se reforzaron medidas de estilo de vida.",
            afiliadoId: 5,
            prestadorId: 22,
            centroId: 5
        },
        {
            date: "2025-05-14T15:10:00",
            start: "2025-05-14T14:25:00",
            duration: 45,
            notes: "Consulta de control en la que el paciente reportó estabilidad general, aunque con baja tolerancia a esfuerzos intensos. No hay dolor torácico, disnea ni palpitaciones persistentes. Examen físico normal. ECG previo en ritmo sinusal. Se solicitó laboratorio completo y ecocardiograma, además de recomendar dieta equilibrada y ejercicio moderado.",
            prestadorId: 19,
            centroId: 3
        },

        {
            date: "2025-06-03T10:30:00",
            start: "2025-06-03T09:45:00",
            duration: 45,
            notes: "El paciente asistió para seguimiento, comentando fatiga ocasional relacionada con estrés laboral. Ausencia de síntomas anginosos o arritmias. Examen físico normal. ECG previo sin particularidades. Se indicó completar estudios y reforzar higiene del sueño, ejercicio y alimentación saludable.",
            afiliadoId: 6,
            prestadorId: 8,
            centroId: 4
        },
        {
            date: "2025-06-18T11:50:00",
            start: "2025-06-18T11:05:00",
            duration: 45,
            notes: "Control cardiovascular con paciente que refiere cansancio intermitente sin otros síntomas relevantes. Examen físico sin hallazgos patológicos. ECG previo normal. Se solicitaron estudios para reevaluación metabólica y se recomendó control periódico.",
            integranteId: 6,
            prestadorId: 15,
            centroId: 5
        },

        {
            date: "2025-07-06T13:15:00",
            start: "2025-07-06T12:30:00",
            duration: 45,
            notes: "Paciente refiere estabilidad clínica, aunque con sensación de pesadez tras actividades prolongadas. Examen físico normal salvo presión limítrofe. ECG previo sin alteraciones. Indicación de estudios complementarios y educación sobre factores de riesgo.",
            afiliadoId: 7,
            prestadorId: 21,
            centroId: 3
        },
        {
            date: "2025-07-22T08:35:00",
            start: "2025-07-22T07:50:00",
            duration: 45,
            notes: "Durante la consulta, el paciente mencionó fluctuaciones leves en su energía diaria. Negó síntomas cardiovasculares agudos. Examen físico normal. ECG previo estable. Solicitud de laboratorio y ecocardiograma con recomendaciones de estilo de vida.",
            integranteId: 7,
            prestadorId: 9,
            centroId: 4
        },

        {
            date: "2025-08-03T14:55:00",
            start: "2025-08-03T14:10:00",
            duration: 45,
            notes: "Paciente estable, con cansancio leve no progresivo. Examen físico dentro de parámetros normales. ECG previo normal. Se indicó control metabólico y seguimiento clínico.",
            afiliadoId: 8,
            prestadorId: 16,
            centroId: 5
        },
        {
            date: "2025-08-20T17:40:00",
            start: "2025-08-20T16:55:00",
            duration: 45,
            notes: "El paciente asistió refiriendo buena evolución, salvo fatiga en días de mayor demanda física. Examen normal. ECG previo sin alteraciones. Se solicitaron estudios y se reforzó actividad aeróbica.",
            integranteId: 8,
            prestadorId: 6,
            centroId: 3
        },

        {
            date: "2025-09-01T09:05:00",
            start: "2025-09-01T08:20:00",
            duration: 45,
            notes: "Control general con síntomas mínimos y no específicos. Examen físico normal. ECG previo sin cambios. Se recomendó laboratorio completo y eco Doppler.",
            afiliadoId: 9,
            prestadorId: 13,
            centroId: 4
        },
        {
            date: "2025-09-16T10:25:00",
            start: "2025-09-16T09:40:00",
            duration: 45,
            notes: "Paciente estable, con presión arterial en límite alto. Examen físico normal. ECG previo sin alteraciones. Se solicitó reevaluación metabólica y se reforzaron medidas no farmacológicas.",
            integranteId: 9,
            prestadorId: 28,
            centroId: 5
        },

        {
            date: "2025-10-07T15:30:00",
            start: "2025-10-07T14:45:00",
            duration: 45,
            notes: "Consulta de rutina donde el paciente refirió cansancio ocasional sin factores desencadenantes claros. Examen normal. ECG sin alteraciones. Se solicitaron estudios y seguimiento.",
            afiliadoId: 10,
            prestadorId: 2,
            centroId: 3
        },
        {
            date: "2025-10-21T16:55:00",
            start: "2025-10-21T16:10:00",
            duration: 45,
            notes: "El paciente comentó reducción leve en la tolerancia al esfuerzo. No hay síntomas anginosos. Examen físico normal. ECG sin cambios. Solicitud de laboratorio y eco.",
            integranteId: 10,
            prestadorId: 27,
            centroId: 4
        },

        {
            date: "2025-11-03T11:40:00",
            start: "2025-11-03T10:55:00",
            duration: 45,
            notes: "Paciente sin síntomas relevantes, salvo episodios de fatiga aislada. Examen normal. ECG previo normal. Se indicó seguimiento y medidas preventivas.",
            afiliadoId: 1,
            prestadorId: 25,
            centroId: 5
        },
        {
            date: "2025-11-18T12:15:00",
            start: "2025-11-18T11:30:00",
            duration: 45,
            notes: "Control con paciente que refiere estabilidad general. Examen físico sin alteraciones. ECG normal. Solicitud de estudios complementarios.",
            integranteId: 11,
            prestadorId: 14,
            centroId: 3
        },

        {
            date: "2025-12-02T08:45:00",
            start: "2025-12-02T08:00:00",
            duration: 45,
            notes: "Paciente con cansancio leve crónico no progresivo. Examen normal. ECG sin alteraciones. Se refuerzan medidas higiénico-dietéticas y estudios.",
            afiliadoId: 2,
            prestadorId: 17,
            centroId: 4
        },
        {
            date: "2025-12-12T10:55:00",
            start: "2025-12-12T10:10:00",
            duration: 45,
            notes: "Consulta de control sin síntomas críticos. Examen normal. ECG previo sin alteraciones. Se solicita reevaluación metabólica.",
            integranteId: 12,
            prestadorId: 23,
            centroId: 5
        },

        {
            date: "2025-01-22T12:30:00",
            start: "2025-01-22T11:45:00",
            duration: 45,
            notes: "Paciente estable, con actividad física moderada bien tolerada salvo días de fatiga. Examen normal. ECG normal. Se planifican estudios.",
            afiliadoId: 3,
            prestadorId: 29,
            centroId: 3
        },
        {
            date: "2025-02-09T15:25:00",
            start: "2025-02-09T14:40:00",
            duration: 45,
            notes: "Control donde el paciente refirió cansancio variable. Examen físico normal. ECG previo normal. Se solicitaron estudios adicionales.",
            integranteId: 13,
            prestadorId: 20,
            centroId: 4
        },

        {
            date: "2025-03-11T09:50:00",
            start: "2025-03-11T09:05:00",
            duration: 45,
            notes: "Paciente con estabilidad clínica general. Examen normal. ECG sin alteraciones. Se indicaron medidas de prevención y seguimiento.",
            afiliadoId: 4,
            prestadorId: 10,
            centroId: 5
        },
        {
            date: "2025-03-29T17:15:00",
            start: "2025-03-29T16:30:00",
            duration: 45,
            notes: "Consulta sin síntomas relevantes. Examen físico normal. ECG previo estable. Solicitud de laboratorio y ecocardiograma.",
            integranteId: 14,
            prestadorId: 24,
            centroId: 3
        },

        {
            date: "2025-04-10T14:30:00",
            start: "2025-04-10T13:45:00",
            duration: 45,
            notes: "Paciente refirió disminución leve en la energía diaria. Examen cardiovascular normal. ECG sin alteraciones. Se reforzaron recomendaciones y se solicitaron estudios.",
            afiliadoId: 5,
            prestadorId: 6,
            centroId: 4
        },
        {
            date: "2025-04-28T13:05:00",
            start: "2025-04-28T12:20:00",
            duration: 45,
            notes: "Control general con síntomas mínimos. Examen normal. ECG previo normal. Indicación de estudios complementarios.",
            integranteId: 15,
            prestadorId: 30,
            centroId: 5
        },

        {
            date: "2025-05-06T10:40:00",
            start: "2025-05-06T09:55:00",
            duration: 45,
            notes: "Paciente estable sin síntomas anginosos. Examen normal salvo tensión límite. ECG normal. Se recomendó seguimiento.",
            afiliadoId: 6,
            prestadorId: 18,
            centroId: 3
        },
        {
            date: "2025-05-30T16:50:00",
            start: "2025-05-30T16:05:00",
            duration: 45,
            notes: "Consulta de control con fatiga leve ocasional. Examen físico dentro de la normalidad. ECG sin cambios. Estudios solicitados.",
            integranteId: 16,
            prestadorId: 11,
            centroId: 4
        },

        {
            date: "2025-06-15T09:35:00",
            start: "2025-06-15T08:50:00",
            duration: 45,
            notes: "Paciente sin síntomas significativos. Examen cardiovascular normal. ECG previo normal. Se indicaron medidas preventivas.",
            afiliadoId: 7,
            prestadorId: 13,
            centroId: 5
        },
        {
            date: "2025-06-29T12:50:00",
            start: "2025-06-29T12:05:00",
            duration: 45,
            notes: "Control de rutina con estabilidad clínica. Examen normal. ECG sin alteraciones. Solicitud de laboratorio.",
            integranteId: 17,
            prestadorId: 16,
            centroId: 3
        },

        {
            date: "2025-07-09T11:05:00",
            start: "2025-07-09T10:20:00",
            duration: 45,
            notes: "Paciente refiere cansancio ocasional tras esfuerzo. Examen físico normal. ECG previo sin cambios. Se refuerzan hábitos saludables.",
            afiliadoId: 8,
            prestadorId: 7,
            centroId: 4
        },
        {
            date: "2025-07-26T15:40:00",
            start: "2025-07-26T14:55:00",
            duration: 45,
            notes: "Consulta sin hallazgos relevantes. Examen normal. ECG normal. Se solicitaron estudios.",
            integranteId: 18,
            prestadorId: 22,
            centroId: 5
        },

        {
            date: "2025-08-14T08:55:00",
            start: "2025-08-14T08:10:00",
            duration: 45,
            notes: "Paciente en buen estado general con fatiga leve esporádica. Examen normal. ECG previo sin alteraciones. Recomendación de seguimiento.",
            afiliadoId: 9,
            prestadorId: 21,
            centroId: 3
        },
        {
            date: "2025-08-31T10:45:00",
            start: "2025-08-31T10:00:00",
            duration: 45,
            notes: "Control con estabilidad clínica. Examen cardiovascular normal. ECG sin cambios. Solicitud de laboratorio completo.",
            integranteId: 19,
            prestadorId: 12,
            centroId: 4
        },

        {
            date: "2025-09-11T13:15:00",
            start: "2025-09-11T12:30:00",
            duration: 45,
            notes: "Paciente sin síntomas nuevos. Examen físico normal. ECG previo normal. Estudios solicitados.",
            afiliadoId: 10,
            prestadorId: 30,
            centroId: 5
        },
        {
            date: "2025-09-27T15:30:00",
            start: "2025-09-27T14:45:00",
            duration: 45,
            notes: "Consulta de rutina con buena evolución clínica. Examen normal. ECG sin alteraciones. Se pidió reevaluación.",
            integranteId: 20,
            prestadorId: 10,
            centroId: 3
        },
        {
            "date": "2025-12-02T10:30:00",
            "start": "2025-12-02T09:45:00",
            "duration": 45,
            "notes": "Consulta sin hallazgos relevantes. Evolución favorable.",
            "integranteId": 12,
            "prestadorId": 7,
            "centroId": 4
        },
        {
            "date": "2025-12-02T11:20:00",
            "start": "2025-12-02T10:35:00",
            "duration": 45,
            "notes": "Control general, signos vitales normales.",
            "afiliadoId": 3,
            "prestadorId": 1,
            "centroId": 3
        },
        {
            "date": "2025-12-03T14:10:00",
            "start": "2025-12-03T13:25:00",
            "duration": 45,
            "notes": "Paciente sin síntomas agudos. Refiere buena evolución.",
            "integranteId": 44,
            "prestadorId": 12,
            "centroId": 5
        },
        {
            "date": "2025-12-03T15:40:00",
            "start": "2025-12-03T14:55:00",
            "duration": 45,
            "notes": "Se ajusta medicación. Próximo control en 1 mes.",
            "afiliadoId": 7,
            "prestadorId": 2,
            "centroId": 4
        },
        {
            "date": "2025-12-04T09:00:00",
            "start": "2025-12-04T08:15:00",
            "duration": 45,
            "notes": "Consulta por dolor leve. No se observan complicaciones.",
            "integranteId": 25,
            "prestadorId": 15,
            "centroId": 3
        },
        {
            "date": "2025-12-04T10:30:00",
            "start": "2025-12-04T09:45:00",
            "duration": 45,
            "notes": "Examen físico normal. Se recomienda hidratación.",
            "afiliadoId": 1,
            "prestadorId": 28,
            "centroId": 5
        },
        {
            "date": "2025-12-04T12:15:00",
            "start": "2025-12-04T11:30:00",
            "duration": 45,
            "notes": "Control periódico. Sin hallazgos patológicos.",
            "integranteId": 8,
            "prestadorId": 30,
            "centroId": 4
        },
        {
            "date": "2025-12-05T08:50:00",
            "start": "2025-12-05T08:05:00",
            "duration": 45,
            "notes": "Se indican estudios complementarios.",
            "afiliadoId": 4,
            "prestadorId": 1,
            "centroId": 3
        },
        {
            "date": "2025-12-05T11:10:00",
            "start": "2025-12-05T10:25:00",
            "duration": 45,
            "notes": "Paciente refiere mejoría parcial. Se mantiene control.",
            "integranteId": 37,
            "prestadorId": 14,
            "centroId": 5
        },
        {
            "date": "2025-12-05T15:40:00",
            "start": "2025-12-05T14:55:00",
            "duration": 45,
            "notes": "Consulta rutinaria. Sin novedades clínicas.",
            "afiliadoId": 9,
            "prestadorId": 9,
            "centroId": 4
        },

        {
            "date": "2025-12-06T09:30:00",
            "start": "2025-12-06T08:45:00",
            "duration": 45,
            "notes": "Control general. Se programan estudios.",
            "integranteId": 4,
            "prestadorId": 19,
            "centroId": 3
        },
        {
            "date": "2025-12-06T10:50:00",
            "start": "2025-12-06T10:05:00",
            "duration": 45,
            "notes": "Dolor leve en zona lumbar. Tratamiento sintomático.",
            "afiliadoId": 2,
            "prestadorId": 25,
            "centroId": 5
        },
        {
            "date": "2025-12-06T12:40:00",
            "start": "2025-12-06T11:55:00",
            "duration": 45,
            "notes": "Se evalúa evolución favorable.",
            "integranteId": 15,
            "prestadorId": 18,
            "centroId": 4
        },
        {
            "date": "2025-12-07T08:30:00",
            "start": "2025-12-07T07:45:00",
            "duration": 45,
            "notes": "Sin síntomas agudos. Se mantiene seguimiento.",
            "afiliadoId": 6,
            "prestadorId": 7,
            "centroId": 5
        },
        {
            "date": "2025-12-07T11:50:00",
            "start": "2025-12-07T11:05:00",
            "duration": 45,
            "notes": "Examen clínico normal.",
            "integranteId": 50,
            "prestadorId": 11,
            "centroId": 3
        },

        {
            "date": "2025-12-08T14:30:00",
            "start": "2025-12-08T13:45:00",
            "duration": 45,
            "notes": "Consulta por malestar leve. No se observan complicaciones.",
            "afiliadoId": 10,
            "prestadorId": 6,
            "centroId": 4
        },
        {
            "date": "2025-12-08T16:00:00",
            "start": "2025-12-08T15:15:00",
            "duration": 45,
            "notes": "Paciente refiere cefalea ocasional.",
            "integranteId": 9,
            "prestadorId": 26,
            "centroId": 5
        },
        {
            "date": "2025-12-09T09:10:00",
            "start": "2025-12-09T08:25:00",
            "duration": 45,
            "notes": "Control sin observaciones relevantes.",
            "afiliadoId": 1,
            "prestadorId": 2,
            "centroId": 3
        },
        {
            "date": "2025-12-09T12:45:00",
            "start": "2025-12-09T12:00:00",
            "duration": 45,
            "notes": "Se ajustan indicaciones médicas.",
            "integranteId": 2,
            "prestadorId": 28,
            "centroId": 4
        },
        {
            "date": "2025-12-09T15:50:00",
            "start": "2025-12-09T15:05:00",
            "duration": 45,
            "notes": "Buena evolución del cuadro previo.",
            "afiliadoId": 8,
            "prestadorId": 6,
            "centroId": 5
        },

        {
            "date": "2025-12-10T08:40:00",
            "start": "2025-12-10T07:55:00",
            "duration": 45,
            "notes": "No se registran síntomas nuevos.",
            "integranteId": 23,
            "prestadorId": 10,
            "centroId": 3
        },
        {
            "date": "2025-12-10T10:20:00",
            "start": "2025-12-10T09:35:00",
            "duration": 45,
            "notes": "Consulta general. Signos normales.",
            "afiliadoId": 5,
            "prestadorId": 13,
            "centroId": 4
        },
        {
            "date": "2025-12-10T13:10:00",
            "start": "2025-12-10T12:25:00",
            "duration": 45,
            "notes": "Derivación a especialista.",
            "integranteId": 47,
            "prestadorId": 17,
            "centroId": 5
        },
        {
            "date": "2025-12-11T11:45:00",
            "start": "2025-12-11T11:00:00",
            "duration": 45,
            "notes": "Consulta por dolor leve. Se indica reposo.",
            "afiliadoId": 2,
            "prestadorId": 21,
            "centroId": 3
        },
        {
            "date": "2025-12-11T14:55:00",
            "start": "2025-12-11T14:10:00",
            "duration": 45,
            "notes": "Se solicita laboratorio de control.",
            "integranteId": 39,
            "prestadorId": 8,
            "centroId": 4
        },

        {
            "date": "2025-12-12T09:25:00",
            "start": "2025-12-12T08:40:00",
            "duration": 45,
            "notes": "Examen físico sin hallazgos.",
            "afiliadoId": 7,
            "prestadorId": 29,
            "centroId": 5
        },
        {
            "date": "2025-12-12T12:50:00",
            "start": "2025-12-12T12:05:00",
            "duration": 45,
            "notes": "Paciente con buena evolución clínica.",
            "integranteId": 18,
            "prestadorId": 20,
            "centroId": 3
        },
        {
            "date": "2025-12-12T15:00:00",
            "start": "2025-12-12T14:15:00",
            "duration": 45,
            "notes": "Control preventivo. Valores normales.",
            "afiliadoId": 10,
            "prestadorId": 24,
            "centroId": 4
        },

        {
            "date": "2025-12-13T08:50:00",
            "start": "2025-12-13T08:05:00",
            "duration": 45,
            "notes": "Molestias digestivas leves. Se indica dieta.",
            "integranteId": 33,
            "prestadorId": 6,
            "centroId": 5
        },
        {
            "date": "2025-12-13T10:30:00",
            "start": "2025-12-13T09:45:00",
            "duration": 45,
            "notes": "Consulta sin signos de alarma.",
            "afiliadoId": 4,
            "prestadorId": 22,
            "centroId": 3
        },
        {
            "date": "2025-12-13T12:15:00",
            "start": "2025-12-13T11:30:00",
            "duration": 45,
            "notes": "Se planifica control en dos semanas.",
            "integranteId": 10,
            "prestadorId": 16,
            "centroId": 4
        },

        {
            "date": "2025-12-14T14:30:00",
            "start": "2025-12-14T13:45:00",
            "duration": 45,
            "notes": "Consulta por cefalea intermitente.",
            "afiliadoId": 3,
            "prestadorId": 11,
            "centroId": 5
        },
        {
            "date": "2025-12-14T15:50:00",
            "start": "2025-12-14T15:05:00",
            "duration": 45,
            "notes": "Sin novedades relevantes.",
            "integranteId": 49,
            "prestadorId": 12,
            "centroId": 3
        },

        {
            "date": "2025-12-15T09:40:00",
            "start": "2025-12-15T08:55:00",
            "duration": 45,
            "notes": "Dolor muscular leve. Indicaciones generales.",
            "afiliadoId": 6,
            "prestadorId": 30,
            "centroId": 4
        },
        {
            "date": "2025-12-15T11:15:00",
            "start": "2025-12-15T10:30:00",
            "duration": 45,
            "notes": "Control clínico normal.",
            "integranteId": 20,
            "prestadorId": 7,
            "centroId": 5
        },
        {
            "date": "2025-12-15T12:55:00",
            "start": "2025-12-15T12:10:00",
            "duration": 45,
            "notes": "Se solicitan estudios de rutina.",
            "afiliadoId": 9,
            "prestadorId": 18,
            "centroId": 3
        },

        {
            "date": "2025-12-16T13:20:00",
            "start": "2025-12-16T12:35:00",
            "duration": 45,
            "notes": "Buena evolución. Continúa tratamiento.",
            "integranteId": 41,
            "prestadorId": 17,
            "centroId": 4
        },
        {
            "date": "2025-12-16T15:30:00",
            "start": "2025-12-16T14:45:00",
            "duration": 45,
            "notes": "Consulta general sin hallazgos.",
            "afiliadoId": 1,
            "prestadorId": 29,
            "centroId": 5
        },

        {
            "date": "2025-12-17T10:50:00",
            "start": "2025-12-17T10:05:00",
            "duration": 45,
            "notes": "Se evalúa cuadro leve. No requiere intervención.",
            "integranteId": 7,
            "prestadorId": 13,
            "centroId": 3
        },
        {
            "date": "2025-12-17T12:20:00",
            "start": "2025-12-17T11:35:00",
            "duration": 45,
            "notes": "Control ambulatorio. Se agenda seguimiento.",
            "afiliadoId": 5,
            "prestadorId": 27,
            "centroId": 4
        },
        {
            "date": "2025-12-17T14:40:00",
            "start": "2025-12-17T13:55:00",
            "duration": 45,
            "notes": "Sin cambios clínicos respecto a consulta previa.",
            "integranteId": 14,
            "prestadorId": 6,
            "centroId": 5
        },

        {
            "date": "2025-12-18T09:35:00",
            "start": "2025-12-18T08:50:00",
            "duration": 45,
            "notes": "Paciente estable. Indicaciones habituales.",
            "afiliadoId": 8,
            "prestadorId": 20,
            "centroId": 3
        },
        {
            "date": "2025-12-18T11:10:00",
            "start": "2025-12-18T10:25:00",
            "duration": 45,
            "notes": "Consulta con evolución favorable.",
            "integranteId": 27,
            "prestadorId": 10,
            "centroId": 4
        },
        {
            "date": "2025-12-18T13:55:00",
            "start": "2025-12-18T13:10:00",
            "duration": 45,
            "notes": "Control general. Próximo turno en un mes.",
            "afiliadoId": 2,
            "prestadorId": 22,
            "centroId": 5
        },

        {
            "date": "2025-12-19T08:45:00",
            "start": "2025-12-19T08:00:00",
            "duration": 45,
            "notes": "Cuadro estable sin complicaciones.",
            "integranteId": 35,
            "prestadorId": 16,
            "centroId": 3
        },
        {
            "date": "2025-12-19T10:55:00",
            "start": "2025-12-19T10:10:00",
            "duration": 45,
            "notes": "Chequeo preventivo sin particularidades.",
            "afiliadoId": 10,
            "prestadorId": 30,
            "centroId": 5
        },
        {
            "date": "2025-12-19T13:25:00",
            "start": "2025-12-19T12:40:00",
            "duration": 45,
            "notes": "Buena adherencia al tratamiento.",
            "integranteId": 19,
            "prestadorId": 14,
            "centroId": 4
        }
]);
}

module.exports = {crearTurnos};
