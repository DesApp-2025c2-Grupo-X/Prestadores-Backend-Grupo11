const {Turno} = require('./db/models');
const { notify } = require('./routes/auth.route');

const crearTurnos = async () => {
    Turno.bulkCreate([
    {
        date: "2025-01-15T10:00:00",
        start: "2025-01-15T09:30:00",
        duration: 45,
        notes: "Durante la consulta cardiológica, el paciente acudió para una evaluación rutinaria de su condición cardíaca, reportando episodios ocasionales de palpitaciones y fatiga tras actividades físicas moderadas. En el examen físico, se observó una presión arterial ligeramente elevada (140/90 mmHg), con frecuencia cardíaca en reposo de 78 lpm. La auscultación reveló tonos cardíacos rítmicos sin soplos ni arritmias evidentes. Se realizó un electrocardiograma que mostró ritmo sinusal con ondas T invertidas en derivaciones precordiales, sugiriendo posible isquemia subclínica. Se solicitaron pruebas adicionales como ecocardiograma Doppler, prueba de esfuerzo y análisis de biomarcadores cardíacos (troponina, BNP). Se prescribió tratamiento con betabloqueantes y antiagregantes plaquetarios, además de recomendaciones dietéticas bajas en sodio y ejercicio aeróbico controlado. Se programó seguimiento en tres meses para monitorear la respuesta terapéutica y ajustar el plan según evolución. Además, se discutieron factores de riesgo modificables como el tabaquismo y el sedentarismo, enfatizando la importancia de un estilo de vida saludable para prevenir complicaciones futuras. El paciente recibió educación sobre síntomas de alerta cardíaca y se le proporcionó material informativo sobre rehabilitación cardíaca.",
        afiliadoId: 5,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-02-20T14:30:00",
        start: "2025-02-20T14:00:00",
        duration: 30,
        notes: "En la consulta de medicina clínica, el paciente se presentó con síntomas de malestar general, incluyendo cefalea persistente, náuseas y pérdida de apetito. El interrogatorio reveló antecedentes de estrés laboral y falta de sueño. En el examen físico, se encontraron signos vitales estables, con temperatura corporal normal y sin adenopatías palpables. Se realizó un hemograma completo que mostró anemia leve (hemoglobina 11.5 g/dL), y se solicitaron estudios adicionales como perfil bioquímico, ecografía abdominal y serologías para descartar infecciones crónicas. Se diagnosticó probable anemia ferropénica secundaria a dieta inadecuada, prescribiendo suplementos de hierro y vitamina B12. Se recomendó cambios en el estilo de vida, incluyendo higiene del sueño y técnicas de manejo del estrés. Seguimiento programado en cuatro semanas para evaluar mejoría sintomática y resultados de laboratorio. Además, se exploraron posibles causas subyacentes como trastornos gastrointestinales, y se derivó a gastroenterología para endoscopía si los síntomas persisten. El paciente fue instruido sobre la importancia de una alimentación balanceada rica en hierro y se le entregó un diario alimentario para seguimiento.",
        afiliadoId: 10,
        prestadorId: 2,
        centroId: 5
    },
    {
        date: "2025-03-10T11:15:00",
        start: "2025-03-10T10:45:00",
        duration: 45,
        notes: "Durante la consulta pediátrica, la madre acudió con su hijo de 5 años refiriendo fiebre recurrente y tos productiva de una semana de evolución. El niño presentaba buen estado general, con temperatura axilar de 38.2°C y auscultación pulmonar con crepitantes en base derecha. Se realizó radiografía de tórax que evidenció infiltrado alveolar compatible con neumonía bacteriana. Se inició tratamiento antibiótico con amoxicilina oral, junto con medidas de soporte como hidratación y reposo. Se educó a la familia sobre signos de alarma y vacunación pendiente. Control en 48 horas para reevaluación clínica y ajuste terapéutico si es necesario. Además, se discutieron medidas preventivas como lavado de manos frecuente y evitar exposición a humo de tabaco, y se recomendó completar el calendario de inmunizaciones incluyendo la vacuna antineumocócica. Se evaluó el estado nutricional del niño y se dieron consejos sobre alimentación saludable para fortalecer el sistema inmune.",
        afiliadoId: 8,
        integranteId: 6,
        prestadorId: 4,
        centroId: 3
    },
    {
        date: "2025-04-05T16:00:00",
        start: "2025-04-05T15:30:00",
        duration: 60,
        notes: "En la consulta traumatológica, el paciente reportó dolor agudo en el tobillo derecho tras una torcedura durante una actividad deportiva. El examen físico mostró edema, equimosis y limitación funcional, con prueba de estabilidad articular positiva para esguince de grado II. Se realizó radiografía que descartó fractura ósea. Se indicó tratamiento conservador con inmovilización con vendaje funcional, crioterapia y elevación. Se prescribieron analgésicos no esteroideos y fisioterapia ambulatoria. Se recomendó evitar carga ponderal por dos semanas y seguimiento en una semana para monitorear evolución y considerar rehabilitación. Además, se evaluaron posibles lesiones ligamentarias mediante resonancia magnética si no hay mejoría, y se educó sobre técnicas de prevención de lesiones deportivas, incluyendo calentamiento adecuado y uso de calzado apropiado. Se derivó a fisioterapia para un plan personalizado de fortalecimiento muscular.",
        afiliadoId: 10,
        prestadorId: 7,
        centroId: 3
    },
    {
        date: "2025-11-20T09:45:00",
        start: "2025-11-20T09:15:00",
        duration: 45,
        notes: "Durante la consulta cardiológica, el paciente acudió para control post-infarto, refiriendo disnea de esfuerzo leve y angina ocasional. En el examen, presión arterial 135/85 mmHg, frecuencia cardíaca 72 lpm, con cicatriz de esternotomía visible. La auscultación mostró tonos rítmicos con soplo sistólico leve. Se revisaron estudios previos: angiografía coronaria con stents permeables. Se solicitaron ecocardiograma y Holter de 24 horas. Se ajustó medicación con estatinas, IECA y antiplaquetarios. Se enfatizó en rehabilitación cardíaca y dieta cardioprotectora. Seguimiento mensual programado. Además, se discutieron estrategias para manejar el estrés post-evento, incluyendo terapia psicológica si es necesario, y se evaluó la adherencia al tratamiento mediante cuestionarios. El paciente recibió información detallada sobre signos de re-infarto y se le recomendó un programa de ejercicio supervisado.",
        afiliadoId: 7,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-12T13:00:00",
        start: "2025-11-12T12:30:00",
        duration: 30,
        notes: "En la consulta de medicina clínica, la paciente se presentó con síntomas de fatiga crónica y dolor articular difuso. Antecedentes de hipotiroidismo tratado. Examen físico sin hallazgos patológicos específicos, signos vitales normales. Se realizaron análisis de laboratorio incluyendo TSH, anticuerpos y factor reumatoide, que mostraron hipotiroidismo compensado y positividad para anticuerpos reumatoides. Se diagnosticó probable artritis reumatoide incipiente, iniciando tratamiento con metotrexato y AINE. Se derivó a reumatología para manejo especializado. Control en seis semanas. Además, se exploraron comorbilidades como depresión asociada, y se prescribieron suplementos vitamínicos para apoyar la función inmune. La paciente fue educada sobre el monitoreo de síntomas y la importancia de un seguimiento multidisciplinario, incluyendo fisioterapia para preservar la movilidad articular.",
        afiliadoId: 7,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-09T10:30:00",
        start: "2025-11-09T10:00:00",
        duration: 45,
        notes: "Durante la consulta dermatológica, el paciente refirió erupción pruriginosa en tronco y extremidades de dos semanas. Examen dermatológico mostró placas eritematosas descamativas compatibles con psoriasis. Se realizó biopsia cutánea para confirmación histológica. Se prescribió tratamiento tópico con corticoides y calcipotriol, además de fototerapia UVB. Se educó sobre factores desencadenantes y cuidado de la piel. Seguimiento en cuatro semanas para evaluar respuesta. Además, se discutieron opciones de tratamiento sistémico si la psoriasis progresa, y se evaluó el impacto psicológico de la enfermedad, derivando a psicología si es necesario. El paciente recibió consejos sobre hidratación cutánea y evitación de irritantes, con un plan de cuidado diario personalizado.",
        afiliadoId: 4,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-20T15:45:00",
        start: "2025-11-20T15:15:00",
        duration: 45,
        notes: "En la consulta ginecológica, la paciente acudió para control anual, reportando ciclos menstruales irregulares y dolor pélvico. Examen ginecológico mostró útero en anteversión, sin masas palpables. Se realizó ecografía transvaginal que evidenció quistes ováricos funcionales. Se solicitaron marcadores tumorales (CA-125) y mamografía. Se prescribió anticonceptivos orales para regularizar ciclos. Se discutieron opciones de fertilidad futura. Control en tres meses. Además, se evaluó el riesgo de endometriosis mediante laparoscopía si los síntomas persisten, y se educó sobre salud reproductiva, incluyendo screening de cáncer cervical y mamario. La paciente recibió información sobre anticoncepción de emergencia y se le recomendó un estilo de vida saludable para optimizar la función ovárica.",
        afiliadoId: 9,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-11T11:00:00",
        start: "2025-11-11T10:30:00",
        duration: 60,
        notes: "Durante la consulta neurológica, el paciente se presentó con cefalea intensa y recurrente, acompañada de fotofobia y náuseas. Antecedentes de migraña. Examen neurológico normal, sin déficits focales. Se realizó tomografía computarizada cerebral que descartó lesiones estructurales. Se diagnosticó migraña con aura, prescribiendo triptanes y profilaxis con betabloqueantes. Se recomendó diario de cefaleas y técnicas de relajación. Seguimiento en un mes. Además, se exploraron triggers como alimentos específicos y estrés, y se derivó a nutrición para una dieta anti-migraña. El paciente fue instruido sobre el uso de medicación preventiva y se evaluó la necesidad de terapias alternativas como acupuntura.",
        afiliadoId: 6,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-22T14:20:00",
        start: "2025-11-22T13:50:00",
        duration: 45,
        notes: "En la consulta de medicina clínica, el paciente refirió hipertensión arterial de reciente diagnóstico. Examen físico con presión 150/95 mmHg. Se realizaron electrocardiograma y ecocardiograma, mostrando hipertrofia ventricular izquierda leve. Se inició tratamiento con ARA-II y diuréticos. Se educó sobre monitoreo domiciliario y dieta DASH. Control semanal para ajuste de dosis. Además, se evaluaron factores de riesgo como obesidad y sedentarismo, prescribiendo un plan de pérdida de peso gradual. El paciente recibió educación sobre complicaciones de la hipertensión no controlada y se le recomendó actividad física regular, con seguimiento cardiológico si es necesario.",
        afiliadoId: 8,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-17T09:00:00",
        start: "2025-11-17T08:30:00",
        duration: 45,
        notes: "Durante la consulta pediátrica, la niña de 8 años presentó erupción cutánea generalizada y fiebre. Examen mostró exantema maculopapular compatible con rubéola. Se realizó serología confirmatoria. Se indicó aislamiento domiciliario y tratamiento sintomático. Se verificó estado vacunal y se completó esquema. Control en 10 días. Además, se educó a la familia sobre la contagiosidad de la enfermedad y medidas de higiene, y se evaluó el riesgo de complicaciones en inmunodeprimidos cercanos. La niña recibió consejos sobre reposo y hidratación, con seguimiento para asegurar la resolución completa de síntomas.",
        afiliadoId: 1,
        integranteId: 7,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-01T16:30:00",
        start: "2025-11-01T16:00:00",
        duration: 30,
        notes: "En la consulta pediátrica, el lactante de 6 meses refirió llanto inconsolable y regurgitación frecuente. Examen mostró distensión abdominal. Se sospechó reflujo gastroesofágico, realizando pH-metría esofágica. Se prescribió inhibidores de bomba de protones y cambios posturales. Se educó a padres sobre alimentación. Seguimiento en dos semanas. Además, se exploraron alergias alimentarias mediante pruebas cutáneas, y se recomendó espesantes para la fórmula láctea. Los padres fueron instruidos sobre técnicas de posicionamiento y se derivó a gastroenterología pediátrica para evaluación endoscópica si persiste.",
        afiliadoId: 5,
        integranteId: 2,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-02T10:00:00",
        start: "2025-11-02T09:30:00",
        duration: 45,
        notes: "Durante la consulta cardiológica, evalué a un paciente con estenosis aórtica severa, refiriendo disnea y angina. Examen físico con soplo sistólico, presión arterial 140/80 mmHg. Ecocardiograma confirmó gradiente transvalvular alto. Derivé a cirugía para reemplazo valvular. Prescribí betabloqueantes. Educé sobre síntomas de descompensación. Control prequirúrgico. En mi práctica, la estenosis aórtica requiere intervención oportuna.",
        afiliadoId: 9,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-02T11:00:00",
        start: "2025-11-02T10:30:00",
        duration: 45,
        notes: "El paciente acudió a la consulta cardiológica para control de insuficiencia mitral, con disnea nocturna. Examen físico con soplo pansistólico, presión arterial 125/75 mmHg. Ecocardiograma mostró regurgitación severa. Indiqué reparación valvular. Ajusté diuréticos. Programé evaluación quirúrgica. Educé sobre anticoagulación postoperatoria. Como cardiólogo, manejo la insuficiencia valvular con enfoque multidisciplinario.",
        afiliadoId: 4,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: "2025-11-02T12:00:00",
        start: "2025-11-02T11:30:00",
        duration: 45,
        notes: "Durante la consulta cardiológica, la paciente refirió miocardiopatía hipertrófica, con síncope. Examen físico con soplo sistólico, presión arterial 130/85 mmHg. Ecocardiograma confirmó hipertrofia septal. Prescribí betabloqueantes y calcioantagonistas. Derivé a electrofisiología para ICD. Recomendé evitar deportes de alto riesgo. Control trimestral. En casos de miocardiopatía, la prevención de arritmias es prioritaria.",
        afiliadoId: 5,
        prestadorId: 1,
        centroId: 5
    },
    {
    date: "2025-11-15T10:00:00",
    start: "2025-11-15T09:15:00",
    duration: 45,
    descripcion: "Consulta de control cardiológico con evaluación de arritmias.",
    afiliadoId: 1,
    prestadorId: 1,
    centroId: 5,
    notes: "Paciente acudió para evaluación integral de su condición cardíaca. Reporta palpitaciones irregulares nocturnas y ligera opresión en el pecho sin irradiación. Antecedentes: hipertensión arterial tratada con IECA y fibrilación auricular previa resuelta con anticoagulación. Examen físico: PA 135/85 mmHg, FC 72 lpm en ritmo sinusal, auscultación sin soplos. ECG: ondas P invertidas en derivaciones inferiores, posible bloqueo auriculoventricular de primer grado. Se indicó Holter 24 h, troponina, BNP y ecocardiograma. Recomendaciones: dieta hiposódica, ejercicio moderado, control de estrés y ajuste de medicación antiarrítmica. Seguimiento: 4 semanas."
    },
  {
    date: "2025-02-20T14:30:00",
    start: "2025-02-20T13:45:00",
    duration: 45,
    descripcion: "Consulta clínica por fatiga y pérdida de peso.",
    afiliadoId: 2,
    prestadorId: 6,
    centroId: 3,
    notes: "Paciente con fatiga crónica y pérdida de 5 kg en 2 meses, sin cambios en apetito. Antecedentes: diabetes tipo 2 controlada con metformina y antecedentes familiares de neoplasias GI. Examen físico: signos leves de deshidratación, PA 120/80 mmHg, abdomen blando sin dolor. Laboratorio: anemia normocítica, glucemia en ayunas elevada, PCR ligeramente aumentada. Estudios indicados: endoscopía digestiva alta y baja, ecografía abdominal, función tiroidea. Recomendaciones: suplementos vitamínicos, dieta rica en hierro y proteínas, seguimiento nutricional. Seguimiento: 3 semanas."
  },
  {
    date: "2025-03-10T11:00:00",
    start: "2025-03-10T10:15:00",
    duration: 45,
    descripcion: "Consulta pediátrica por control de asma.",
    afiliadoId: 3,
    integranteId: 1,
    prestadorId: 7,
    centroId: 3,
    notes: "Niño de 8 años con asma bronquial recurrente. Antecedentes de atopía familiar y sensibilización a ácaros del polvo. Examen físico: frecuencia respiratoria elevada, sibilancias, SpO₂ 95%. Espirometría: FEV1 70% del predicho, obstrucción reversible. Tratamiento: corticoides inhalados, plan de acción escrito, nebulizaciones con salbutamol. Recomendaciones: control ambiental, educación sobre técnica de inhalación. Seguimiento: 1 mes."
  },
  {
    date: "2025-04-05T16:00:00",
    start: "2025-04-05T15:15:00",
    duration: 45,
    descripcion: "Consulta traumatológica por lesión de rodilla.",
    afiliadoId: 4,
    prestadorId: 8,
    centroId: 3,
    notes: "Adulto joven con dolor agudo en rodilla tras accidente deportivo. Sospecha de esguince de ligamento cruzado anterior. Examen físico: efusión articular, prueba de Lachman positiva, dolor a la palpación. Estudios: resonancia magnética de rodilla. Tratamiento inicial: reposo, hielo, elevación, AINEs. Recomendaciones: fisioterapia, ejercicios isométricos. Seguimiento: 2 semanas."
  },
  {
    date: "2025-05-12T09:00:00",
    start: "2025-05-12T08:15:00",
    duration: 45,
    descripcion: "Consulta cardiológica por insuficiencia cardíaca.",
    afiliadoId: 5,
    prestadorId: 9,
    centroId: 3,
    notes: "Paciente con disnea de esfuerzo progresiva y edema en miembros inferiores. Antecedentes: IAM hace 2 años, dislipidemia, tabaquismo pasivo. Examen físico: taquicardia, crepitantes basales, edema pretibial. Estudios: ECG con cicatrices de infarto, ecocardiograma con FEVI 35%, dilatación ventricular y regurgitación mitral moderada. Tratamiento: ajuste de betabloqueantes, IECA, diuréticos y antagonista de aldosterona. Rehabilitación cardíaca y educación sobre signos de alarma. Seguimiento: mensual."
  }
])
}

module.exports = {crearTurnos};
