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
  },
  {
        date: new Date("2025-03-19T10:00:00"),
        start: new Date("2025-03-19T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
        Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 4,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-06-11T15:30:00"),
        start: new Date("2025-06-11T15:30:00"),
        duration: 45,
        notes: `Consulta de traumatología debido a dolor persistente en la zona lumbar. El paciente relata que desde hace aproximadamente ocho semanas siente una molestia constante al permanecer mucho tiempo sentado o de pie, y que durante los últimos diez días la incomodidad se ha intensificado al agacharse o al levantar objetos de tamaño moderado. Durante la entrevista clínica refiere que no recuerda un episodio traumático específico, pero admite que pasa varias horas frente a la computadora, muchas veces sin realizar pausas activas ni mantener una postura adecuada.`,
        integranteId: 4,
        prestadorId: 4
    },
    {
        date: new Date("2025-01-29T09:15:00"),
        start: new Date("2025-01-29T09:15:00"),
        duration: 30,
        notes: `El paciente concurre a la consulta cardiológica programada para seguimiento de factores de riesgo cardiovascular y evaluación del síntoma inespecífico de fatiga que venía refiriendo desde hace algunas semanas. Al iniciar la entrevista, describe que la sensación de cansancio aparece principalmente al realizar caminatas prolongadas o al subir pendientes moderadas, aunque aclara que no ha llegado a presentar dolor torácico típico ni disnea severa. Expresa preocupación debido a que hace aproximadamente un mes tuvo un episodio breve de palpitaciones durante la noche, el cual no se repitió pero motivó su inquietud actual. Niega mareos, síncope, edema en extremidades o antecedentes recientes de infecciones respiratorias.
Se revisan sus antecedentes personales y se constata hipertensión arterial diagnosticada hace tres años, tratada en forma irregular según admite el propio paciente. También refiere antecedentes familiares de enfermedad coronaria en su padre, quien padeció un infarto agudo de miocardio en la sexta década de vida. No fuma desde hace más de una década, pero reconoce que su alimentación ha sido últimamente desordenada, con ingesta frecuente de comidas ricas en sodio y grasas. Su nivel de actividad física también ha disminuido desde el inicio del invierno, lo que puede haber colaborado a la aparición de ciertos síntomas.`,
        integranteId: 4,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-12-04T11:45:00"),
        start: new Date("2025-12-04T11:45:00"),
        duration: 30,
        notes: null,
        integranteId: 4,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-12-18T09:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 4,
        prestadorId: 2,
        centroId: 5
    },
    {
        date: new Date("2025-09-08T14:00:00"),
        start: new Date("2025-09-08T14:00:00"),
        duration: 60,
        notes:`En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 4,
        prestadorId: 4
    },
    {
        date: new Date("2025-04-23T17:00:00"),
        start: new Date("2025-04-23T17:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta de clínica médica refiriendo episodios intermitentes de mareos leves, sensación de agotamiento general y disminución del apetito en los últimos veinte días. Explica que los síntomas aparecen con mayor recurrencia en horarios matutinos, especialmente después de noches con descanso insuficiente. Aclara que su ritmo laboral se ha visto intensificado en el último mes, con jornadas prolongadas y pocas pausas. Reconoce además que su adherencia a la hidratación ha sido inconstante y que la ingesta de alimentos ha sido irregular.`,
        integranteId: 4,
        prestadorId: 2,
        centroId: 5
    },

    //Turno Integrande Id: 5

   {
        date: new Date("2025-03-19T10:00:00"),
        start: new Date("2025-03-19T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 5,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-06-11T15:30:00"),
        start: new Date("2025-06-11T15:30:00"),
        duration: 45,
        notes: `Consulta de traumatología debido a dolor persistente en la zona lumbar. El paciente relata que desde hace aproximadamente ocho semanas siente una molestia constante al permanecer mucho tiempo sentado o de pie, y que durante los últimos diez días la incomodidad se ha intensificado al agacharse o al levantar objetos de tamaño moderado. Durante la entrevista clínica refiere que no recuerda un episodio traumático específico, pero admite que pasa varias horas frente a la computadora, muchas veces sin realizar pausas activas ni mantener una postura adecuada.`,
        integranteId: 5,
        prestadorId: 4
    },
    {
        date: new Date("2025-01-29T09:15:00"),
        start: new Date("2025-01-29T09:15:00"),
        duration: 30,
        notes: `El paciente concurre a la consulta cardiológica programada para seguimiento de factores de riesgo cardiovascular y evaluación del síntoma inespecífico de fatiga que venía refiriendo desde hace algunas semanas. Al iniciar la entrevista, describe que la sensación de cansancio aparece principalmente al realizar caminatas prolongadas o al subir pendientes moderadas, aunque aclara que no ha llegado a presentar dolor torácico típico ni disnea severa. Expresa preocupación debido a que hace aproximadamente un mes tuvo un episodio breve de palpitaciones durante la noche, el cual no se repitió pero motivó su inquietud actual. Niega mareos, síncope, edema en extremidades o antecedentes recientes de infecciones respiratorias.
Se revisan sus antecedentes personales y se constata hipertensión arterial diagnosticada hace tres años, tratada en forma irregular según admite el propio paciente. También refiere antecedentes familiares de enfermedad coronaria en su padre, quien padeció un infarto agudo de miocardio en la sexta década de vida. No fuma desde hace más de una década, pero reconoce que su alimentación ha sido últimamente desordenada, con ingesta frecuente de comidas ricas en sodio y grasas. Su nivel de actividad física también ha disminuido desde el inicio del invierno, lo que puede haber colaborado a la aparición de ciertos síntomas.`,
        integranteId: 5,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-12-04T12:45:00"),
        start: new Date("2025-12-04T11:45:00"),
        duration: 30,
        notes: null,
        integranteId: 5,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-12-18T08:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 5,
        prestadorId: 33,
        centroId: 5
    },
    {
        date: new Date("2025-09-08T14:00:00"),
        start: new Date("2025-09-08T14:00:00"),
        duration: 60,
        notes:`En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 5,
        prestadorId: 4
    },
    {
        date: new Date("2025-04-23T17:00:00"),
        start: new Date("2025-04-23T17:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta de clínica médica refiriendo episodios intermitentes de mareos leves, sensación de agotamiento general y disminución del apetito en los últimos veinte días. Explica que los síntomas aparecen con mayor recurrencia en horarios matutinos, especialmente después de noches con descanso insuficiente. Aclara que su ritmo laboral se ha visto intensificado en el último mes, con jornadas prolongadas y pocas pausas. Reconoce además que su adherencia a la hidratación ha sido inconstante y que la ingesta de alimentos ha sido irregular.`,
        integranteId: 5,
        prestadorId: 2,
        centroId: 5
    },
     //Turnos Intregrante Id: 6
        {
        date: new Date("2025-12-03T12:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.
Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.
Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.
Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.`,
        integranteId: 6,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-02-10T15:30:00"),
        start: new Date("2025-02-10T15:30:00"),
        duration: 30,
        notes: `En esta consulta de clínica médica general, el paciente acudió con el objetivo de realizar un control integral del estado de salud, evaluar síntomas recientes y actualizar estudios complementarios de rutina. Durante la entrevista clínica refirió haber experimentado en las últimas semanas episodios aislados de malestar general y cansancio, aunque aclaró que estos no interfieren significativamente en su vida cotidiana. Negó presencia de fiebre, tos persistente, dificultad respiratoria, molestias digestivas relevantes o cambios bruscos en el apetito o el peso corporal. También comentó que ha intentado mantener hábitos saludables, aunque reconoció que su nivel de actividad física disminuyó en el último mes debido a mayor carga laboral.
El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.
A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.
Además, se conversó con el paciente sobre la importancia del descanso adecuado y el manejo del estrés, ya que ambos factores suelen influir notablemente en la sensación de fatiga. Se recomendó mantener correcta hidratación y vigilar aparición de cualquier síntoma persistente o progresivo. Finalmente, se coordinó un nuevo control clínico para la revisión de los estudios solicitados, dejando la puerta abierta para consulta anticipada si presentara fiebre, malestar general sostenido, dolor abdominal importante o cualquier síntoma que genere preocupación.`,
        integranteId: 6,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-07-21T14:00:00"),
        start: new Date("2025-07-21T14:00:00"),
        duration: 60,
        notes: `Durante la consulta traumatológica, el paciente acudió para una evaluación integral orientada a valorar su estado musculoesquelético, particularmente a raíz de molestias intermitentes que había mencionado en controles previos. Al iniciar la entrevista, refirió episodios aislados de rigidez matutina leve y sensación de tensión en la región lumbar después de periodos prolongados sentado, sin irradiación hacia miembros inferiores ni acompañamiento de hormigueo o pérdida de fuerza. Negó traumatismos recientes, caídas, torceduras, inflamación significativa o dolor agudo incapacitante.
En el examen físico se evaluó la postura, movilidad general y presencia de puntos dolorosos. Se observó una marcha estable, sin claudicación. La columna vertebral mostró alineación adecuada, aunque con ligera contractura paravertebral lumbar bilateral a la palpación. Los rangos de movimiento fueron completos, aunque la flexión lumbar presentó leve molestia al final del recorrido. Las extremidades inferiores exhibieron fuerza conservada, reflejos osteotendinosos simétricos y sin alteraciones de sensibilidad. No se detectaron signos clínicos sugestivos de radiculopatía ni compromiso neurológico agudo.`,
        integranteId: 6,
        prestadorId: 4
    },
    {
        date: new Date("2025-11-03T11:15:00"),
        start: new Date("2025-10-03T11:15:00"),
        duration: 30,
        notes: `Durante esta revisión cardiológica, el paciente indicó sensación ocasional de fatiga. Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.)`,
        integranteId: 6,
        prestadorId: 1
    },
    {
        date: new Date("2025-12-02T08:30:00"),
        start: new Date("2025-11-03T08:30:00"),
        duration: 45,
        notes: `En esta consulta de clínica médica general, el paciente acudió con el objetivo de realizar un control integral del estado de salud, evaluar síntomas recientes y actualizar estudios complementarios de rutina. Durante la entrevista clínica refirió haber experimentado en las últimas semanas episodios aislados de malestar general y cansancio, aunque aclaró que estos no interfieren significativamente en su vida cotidiana. Negó presencia de fiebre, tos persistente, dificultad respiratoria, molestias digestivas relevantes o cambios bruscos en el apetito o el peso corporal. También comentó que ha intentado mantener hábitos saludables, aunque reconoció que su nivel de actividad física disminuyó en el último mes debido a mayor carga laboral.
El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.
A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.
Además, se conversó con el paciente sobre la importancia del descanso adecuado y el manejo del estrés, ya que ambos factores suelen influir notablemente en la sensación de fatiga. Se recomendó mantener correcta hidratación y vigilar aparición de cualquier síntoma persistente o progresivo. Finalmente, se coordinó un nuevo control clínico para la revisión de los estudios solicitados, dejando la puerta abierta para consulta anticipada si presentara fiebre, malestar general sostenido, dolor abdominal importante o cualquier síntoma que genere preocupación.`,
        integranteId: 6,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-12-11T13:00:00"),
        start: new Date("2025-12-11T13:00:00"),
        duration: 30,
        notes: null,
        integranteId: 6,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2026-01-02T09:45:00"),
        start: new Date("2026-01-02T09:45:00"),
        duration: 45,
        notes: null,
        integranteId: 6,
        prestadorId: 1,
        centroId: 5
    },
    // Turnos Integrante Id: 7
    {
        date: new Date("2025-11-04T18:30:00"),
        start: new Date("2025-10-04T18:30:00"),
        duration: 60,
        notes: `El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.
Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.
Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.
Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
        integranteId: 7,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-03-19T10:00:00"),
        start: new Date("2025-03-19T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 7,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-06-11T16:30:00"),
        start: new Date("2025-06-11T15:30:00"),
        duration: 45,
        notes: `Consulta de traumatología debido a dolor persistente en la zona lumbar. El paciente relata que desde hace aproximadamente ocho semanas siente una molestia constante al permanecer mucho tiempo sentado o de pie, y que durante los últimos diez días la incomodidad se ha intensificado al agacharse o al levantar objetos de tamaño moderado. Durante la entrevista clínica refiere que no recuerda un episodio traumático específico, pero admite que pasa varias horas frente a la computadora, muchas veces sin realizar pausas activas ni mantener una postura adecuada.`,
        integranteId: 7,
        prestadorId: 4
    },
    {
        date: new Date("2025-01-29T10:15:00"),
        start: new Date("2025-01-29T09:15:00"),
        duration: 30,
        notes: `El paciente concurre a la consulta cardiológica programada para seguimiento de factores de riesgo cardiovascular y evaluación del síntoma inespecífico de fatiga que venía refiriendo desde hace algunas semanas. Al iniciar la entrevista, describe que la sensación de cansancio aparece principalmente al realizar caminatas prolongadas o al subir pendientes moderadas, aunque aclara que no ha llegado a presentar dolor torácico típico ni disnea severa. Expresa preocupación debido a que hace aproximadamente un mes tuvo un episodio breve de palpitaciones durante la noche, el cual no se repitió pero motivó su inquietud actual. Niega mareos, síncope, edema en extremidades o antecedentes recientes de infecciones respiratorias.
Se revisan sus antecedentes personales y se constata hipertensión arterial diagnosticada hace tres años, tratada en forma irregular según admite el propio paciente. También refiere antecedentes familiares de enfermedad coronaria en su padre, quien padeció un infarto agudo de miocardio en la sexta década de vida. No fuma desde hace más de una década, pero reconoce que su alimentación ha sido últimamente desordenada, con ingesta frecuente de comidas ricas en sodio y grasas. Su nivel de actividad física también ha disminuido desde el inicio del invierno, lo que puede haber colaborado a la aparición de ciertos síntomas.`,
        integranteId: 7,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-12-04T13:45:00"),
        start: new Date("2025-12-04T11:45:00"),
        duration: 30,
        notes: null,
        integranteId: 7,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-12-18T10:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 7,
        prestadorId: 31,
        centroId: 5
    },
    {
        date: new Date("2025-09-08T20:00:00"),
        start: new Date("2025-09-08T14:00:00"),
        duration: 60,
        notes:`En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 7,
        prestadorId: 4
    },
    {
        date: new Date("2025-04-23T15:00:00"),
        start: new Date("2025-03-23T17:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta de clínica médica refiriendo episodios intermitentes de mareos leves, sensación de agotamiento general y disminución del apetito en los últimos veinte días. Explica que los síntomas aparecen con mayor recurrencia en horarios matutinos, especialmente después de noches con descanso insuficiente. Aclara que su ritmo laboral se ha visto intensificado en el último mes, con jornadas prolongadas y pocas pausas. Reconoce además que su adherencia a la hidratación ha sido inconstante y que la ingesta de alimentos ha sido irregular.`,
        integranteId: 7,
        prestadorId: 2,
        centroId: 5
    },

    //Turnos Integrante Id: 8
    {
        date: new Date("2025-12-03T13:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.
Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.
Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.
Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.`,
        integranteId: 8,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-02-10T19:30:00"),
        start: new Date("2025-02-10T15:30:00"),
        duration: 30,
        notes: `En esta consulta de clínica médica general, el paciente acudió con el objetivo de realizar un control integral del estado de salud, evaluar síntomas recientes y actualizar estudios complementarios de rutina. Durante la entrevista clínica refirió haber experimentado en las últimas semanas episodios aislados de malestar general y cansancio, aunque aclaró que estos no interfieren significativamente en su vida cotidiana. Negó presencia de fiebre, tos persistente, dificultad respiratoria, molestias digestivas relevantes o cambios bruscos en el apetito o el peso corporal. También comentó que ha intentado mantener hábitos saludables, aunque reconoció que su nivel de actividad física disminuyó en el último mes debido a mayor carga laboral.
El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.
A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.
Además, se conversó con el paciente sobre la importancia del descanso adecuado y el manejo del estrés, ya que ambos factores suelen influir notablemente en la sensación de fatiga. Se recomendó mantener correcta hidratación y vigilar aparición de cualquier síntoma persistente o progresivo. Finalmente, se coordinó un nuevo control clínico para la revisión de los estudios solicitados, dejando la puerta abierta para consulta anticipada si presentara fiebre, malestar general sostenido, dolor abdominal importante o cualquier síntoma que genere preocupación.`,
        integranteId: 8,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-07-21T16:00:00"),
        start: new Date("2025-07-21T14:00:00"),
        duration: 60,
        notes: `Durante la consulta traumatológica, el paciente acudió para una evaluación integral orientada a valorar su estado musculoesquelético, particularmente a raíz de molestias intermitentes que había mencionado en controles previos. Al iniciar la entrevista, refirió episodios aislados de rigidez matutina leve y sensación de tensión en la región lumbar después de periodos prolongados sentado, sin irradiación hacia miembros inferiores ni acompañamiento de hormigueo o pérdida de fuerza. Negó traumatismos recientes, caídas, torceduras, inflamación significativa o dolor agudo incapacitante.
En el examen físico se evaluó la postura, movilidad general y presencia de puntos dolorosos. Se observó una marcha estable, sin claudicación. La columna vertebral mostró alineación adecuada, aunque con ligera contractura paravertebral lumbar bilateral a la palpación. Los rangos de movimiento fueron completos, aunque la flexión lumbar presentó leve molestia al final del recorrido. Las extremidades inferiores exhibieron fuerza conservada, reflejos osteotendinosos simétricos y sin alteraciones de sensibilidad. No se detectaron signos clínicos sugestivos de radiculopatía ni compromiso neurológico agudo.`,
        integranteId: 8,
        prestadorId: 4
    },
    {
        date: new Date("2025-11-03T14:15:00"),
        start: new Date("2025-10-03T11:15:00"),
        duration: 30,
        notes: `Durante esta revisión cardiológica, el paciente indicó sensación ocasional de fatiga. Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.)`,
        integranteId: 8,
        prestadorId: 1
    },
    {
        date: new Date("2025-12-02T14:30:00"),
        start: new Date("2025-11-03T08:30:00"),
        duration: 45,
        notes: `En esta consulta de clínica médica general, el paciente acudió con el objetivo de realizar un control integral del estado de salud, evaluar síntomas recientes y actualizar estudios complementarios de rutina. Durante la entrevista clínica refirió haber experimentado en las últimas semanas episodios aislados de malestar general y cansancio, aunque aclaró que estos no interfieren significativamente en su vida cotidiana. Negó presencia de fiebre, tos persistente, dificultad respiratoria, molestias digestivas relevantes o cambios bruscos en el apetito o el peso corporal. También comentó que ha intentado mantener hábitos saludables, aunque reconoció que su nivel de actividad física disminuyó en el último mes debido a mayor carga laboral.
El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.
A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.
Además, se conversó con el paciente sobre la importancia del descanso adecuado y el manejo del estrés, ya que ambos factores suelen influir notablemente en la sensación de fatiga. Se recomendó mantener correcta hidratación y vigilar aparición de cualquier síntoma persistente o progresivo. Finalmente, se coordinó un nuevo control clínico para la revisión de los estudios solicitados, dejando la puerta abierta para consulta anticipada si presentara fiebre, malestar general sostenido, dolor abdominal importante o cualquier síntoma que genere preocupación.`,
        integranteId: 8,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-12-11T16:30:00"),
        start: new Date("2025-12-11T13:00:00"),
        duration: 30,
        notes: null,
        integranteId: 8,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2026-01-02T16:45:00"),
        start: new Date("2026-01-02T09:45:00"),
        duration: 45,
        notes: null,
        integranteId: 8,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-11-04T19:30:00"),
        start: new Date("2025-10-04T18:30:00"),
        duration: 60,
        notes: `El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.
Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.
Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.
Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
        integranteId: 8,
        prestadorId: 1,
        centroId: 5
    },
    // Turnos Integrante Id: 9
     {
        date: new Date("2025-11-04T20:30:00"),
        start: new Date("2025-10-04T18:30:00"),
        duration: 60,
        notes: `El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.
Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.
Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.
Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
        integranteId: 9,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-03-19T17:00:00"),
        start: new Date("2025-03-19T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 9,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-06-11T17:30:00"),
        start: new Date("2025-06-11T15:30:00"),
        duration: 45,
        notes: `Consulta de traumatología debido a dolor persistente en la zona lumbar. El paciente relata que desde hace aproximadamente ocho semanas siente una molestia constante al permanecer mucho tiempo sentado o de pie, y que durante los últimos diez días la incomodidad se ha intensificado al agacharse o al levantar objetos de tamaño moderado. Durante la entrevista clínica refiere que no recuerda un episodio traumático específico, pero admite que pasa varias horas frente a la computadora, muchas veces sin realizar pausas activas ni mantener una postura adecuada.`,
        integranteId: 9,
        prestadorId: 4
    },
    {
        date: new Date("2025-01-29T17:15:00"),
        start: new Date("2025-01-29T09:15:00"),
        duration: 30,
        notes: `El paciente concurre a la consulta cardiológica programada para seguimiento de factores de riesgo cardiovascular y evaluación del síntoma inespecífico de fatiga que venía refiriendo desde hace algunas semanas. Al iniciar la entrevista, describe que la sensación de cansancio aparece principalmente al realizar caminatas prolongadas o al subir pendientes moderadas, aunque aclara que no ha llegado a presentar dolor torácico típico ni disnea severa. Expresa preocupación debido a que hace aproximadamente un mes tuvo un episodio breve de palpitaciones durante la noche, el cual no se repitió pero motivó su inquietud actual. Niega mareos, síncope, edema en extremidades o antecedentes recientes de infecciones respiratorias.
Se revisan sus antecedentes personales y se constata hipertensión arterial diagnosticada hace tres años, tratada en forma irregular según admite el propio paciente. También refiere antecedentes familiares de enfermedad coronaria en su padre, quien padeció un infarto agudo de miocardio en la sexta década de vida. No fuma desde hace más de una década, pero reconoce que su alimentación ha sido últimamente desordenada, con ingesta frecuente de comidas ricas en sodio y grasas. Su nivel de actividad física también ha disminuido desde el inicio del invierno, lo que puede haber colaborado a la aparición de ciertos síntomas.`,
        integranteId: 9,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-12-04T18:45:00"),
        start: new Date("2025-12-04T11:45:00"),
        duration: 30,
        notes: null,
        integranteId: 9,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-12-18T18:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 9,
        prestadorId: 33,
        centroId: 5
    },
    {
        date: new Date("2025-09-08T19:00:00"),
        start: new Date("2025-09-08T14:00:00"),
        duration: 60,
        notes:`En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 9,
        prestadorId: 4
    },
    {
        date: new Date("2025-04-23T17:00:00"),
        start: new Date("2025-03-23T17:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta de clínica médica refiriendo episodios intermitentes de mareos leves, sensación de agotamiento general y disminución del apetito en los últimos veinte días. Explica que los síntomas aparecen con mayor recurrencia en horarios matutinos, especialmente después de noches con descanso insuficiente. Aclara que su ritmo laboral se ha visto intensificado en el último mes, con jornadas prolongadas y pocas pausas. Reconoce además que su adherencia a la hidratación ha sido inconstante y que la ingesta de alimentos ha sido irregular.`,
        integranteId: 9,
        prestadorId: 2,
        centroId: 5
    },
    // Turnos Integrante Id: 10
     {
        date: new Date("2025-11-04T19:30:00"),
        start: new Date("2025-10-04T18:30:00"),
        duration: 60,
        notes: `El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.
Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.
Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.
Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
        integranteId: 10,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-03-19T15:00:00"),
        start: new Date("2025-03-19T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 10,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-06-11T19:30:00"),
        start: new Date("2025-06-11T15:30:00"),
        duration: 45,
        notes: `Consulta de traumatología debido a dolor persistente en la zona lumbar. El paciente relata que desde hace aproximadamente ocho semanas siente una molestia constante al permanecer mucho tiempo sentado o de pie, y que durante los últimos diez días la incomodidad se ha intensificado al agacharse o al levantar objetos de tamaño moderado. Durante la entrevista clínica refiere que no recuerda un episodio traumático específico, pero admite que pasa varias horas frente a la computadora, muchas veces sin realizar pausas activas ni mantener una postura adecuada.`,
        integranteId: 10,
        prestadorId: 4
    },
    {
        date: new Date("2025-01-29T20:15:00"),
        start: new Date("2025-01-29T09:15:00"),
        duration: 30,
        notes: `El paciente concurre a la consulta cardiológica programada para seguimiento de factores de riesgo cardiovascular y evaluación del síntoma inespecífico de fatiga que venía refiriendo desde hace algunas semanas. Al iniciar la entrevista, describe que la sensación de cansancio aparece principalmente al realizar caminatas prolongadas o al subir pendientes moderadas, aunque aclara que no ha llegado a presentar dolor torácico típico ni disnea severa. Expresa preocupación debido a que hace aproximadamente un mes tuvo un episodio breve de palpitaciones durante la noche, el cual no se repitió pero motivó su inquietud actual. Niega mareos, síncope, edema en extremidades o antecedentes recientes de infecciones respiratorias.
Se revisan sus antecedentes personales y se constata hipertensión arterial diagnosticada hace tres años, tratada en forma irregular según admite el propio paciente. También refiere antecedentes familiares de enfermedad coronaria en su padre, quien padeció un infarto agudo de miocardio en la sexta década de vida. No fuma desde hace más de una década, pero reconoce que su alimentación ha sido últimamente desordenada, con ingesta frecuente de comidas ricas en sodio y grasas. Su nivel de actividad física también ha disminuido desde el inicio del invierno, lo que puede haber colaborado a la aparición de ciertos síntomas.`,
        integranteId: 10,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-12-04T07:45:00"),
        start: new Date("2025-12-04T11:45:00"),
        duration: 30,
        notes: null,
        integranteId: 10,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-12-18T21:00:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 5,
        notes: null,
        integranteId: 10,
        prestadorId: 1
    },
    {
        date: new Date("2025-09-08T20:00:00"),
        start: new Date("2025-09-08T14:00:00"),
        duration: 60,
        notes:`En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 10,
        prestadorId: 4
    },
    {
        date: new Date("2025-04-23T19:00:00"),
        start: new Date("2025-03-23T17:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta de clínica médica refiriendo episodios intermitentes de mareos leves, sensación de agotamiento general y disminución del apetito en los últimos veinte días. Explica que los síntomas aparecen con mayor recurrencia en horarios matutinos, especialmente después de noches con descanso insuficiente. Aclara que su ritmo laboral se ha visto intensificado en el último mes, con jornadas prolongadas y pocas pausas. Reconoce además que su adherencia a la hidratación ha sido inconstante y que la ingesta de alimentos ha sido irregular.`,
        integranteId: 10,
        prestadorId: 2,
        centroId: 5
    },
        {
        date: new Date("2025-12-18T07:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 15,
        notes: null,
        integranteId: 1,
        prestadorId: 28,
        centroId:5
    },
        {
        date: new Date("2025-12-18T11:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 2,
        prestadorId: 28,
        centroId:5
    },
        {
        date: new Date("2025-12-18T12:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 3,
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T14:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 15,
        notes: null,
        integranteId: 4,
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T13:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 30,
        notes: null,
        integranteId: 5,
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T16:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 30,
        notes: null,
        integranteId: 6,
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T17:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 7,
        prestadorId: 2,
        centroId:5
    },
        {
        date: new Date("2025-12-18T19:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 8,
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T20:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 15,
        notes: null,
        integranteId: 9,
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T20:45:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 15,
        notes: null,
        integranteId: 10,
        prestadorId: 1,
        centroId:5
    },
     {
        date: new Date("2025-08-01T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.
Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.
Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.
Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.`,
        integranteId: 1,
        prestadorId: 1,
        centroId: 5
    },
     {
        date: new Date("2025-12-03T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 1,
        prestadorId: 2,
        centroId: 5
    },
      {
        date: new Date("2025-09-03T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 1,
        prestadorId: 4
    },
     {
        date: new Date("2025-01-03T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta traumatológica refiriendo dolor persistente en la rodilla izquierda, el cual ha evolucionado de manera progresiva durante los últimos dos meses. Describe el dolor como una molestia profunda, localizada principalmente en la región anterior y medial de la articulación, que se intensifica al caminar largas distancias, durante la subida o bajada de escaleras y al mantenerse de pie por períodos prolongados. Refiere además sensación ocasional de rigidez matutina que dura algunos minutos y que mejora con el movimiento. No reporta episodios de bloqueo articular ni inestabilidad franca, aunque menciona que en ocasiones siente “como si la rodilla no acompañara bien el movimiento”.
Durante la anamnesis, el paciente indica que no recuerda un traumatismo específico que haya desencadenado el malestar, pero reconoce que su trabajo implica estar muchas horas de pie y que, fuera del ámbito laboral, ha realizado actividades de impacto moderado como caminatas rápidas y trotes esporádicos sin una preparación adecuada. Niega fiebre, pérdida de peso o síntomas sistémicos.`,
        integranteId: 1,
        prestadorId: 4
    },
    {
        date: new Date("2025-05-01T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.
Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.
Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.
Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.`,
        integranteId: 1,
        prestadorId: 1
    },
    {
        date: new Date("2025-03-01T10:00:00"),
        start: new Date("2024-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta de control clínico general, el paciente refiere un período de tres meses con aumento del cansancio relacionado principalmente con falta de regularidad en hábitos de descanso y modificaciones significativas en su rutina alimentaria. Describe que, debido a mayores exigencias laborales, ha reducido la cantidad de comidas caseras y ha incrementado la ingesta de alimentos procesados. Refiere episodios leves de distensión abdominal, especialmente por la noche.`,
        integranteId: 1,
        prestadorId: 2
    },
       {
        date: new Date("2025-04-01T10:00:00"),
        start: new Date("2024-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente acude al servicio de traumatología por molestias persistentes en la región lumbar baja, las cuales describe como una sensación de tensión acompañada de dolor opresivo tras períodos prolongados sentado. Explica que estos síntomas comenzaron de manera progresiva hace aproximadamente dos meses, sin antecedente traumático definido. Comenta que trabaja muchas horas frente a una computadora y que ha descuidado la ergonomía en su puesto de trabajo.`,
        integranteId: 1,
        prestadorId: 4
    },
    //////////
    {
        date: new Date("2025-06-03T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 1,
        prestadorId: 2,
        centroId: 5
    },
      {
        date: new Date("2025-02-06T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 1,
        prestadorId: 4
    },
     {
        date: new Date("2025-05-14T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta traumatológica refiriendo dolor persistente en la rodilla izquierda, el cual ha evolucionado de manera progresiva durante los últimos dos meses. Describe el dolor como una molestia profunda, localizada principalmente en la región anterior y medial de la articulación, que se intensifica al caminar largas distancias, durante la subida o bajada de escaleras y al mantenerse de pie por períodos prolongados. Refiere además sensación ocasional de rigidez matutina que dura algunos minutos y que mejora con el movimiento. No reporta episodios de bloqueo articular ni inestabilidad franca, aunque menciona que en ocasiones siente “como si la rodilla no acompañara bien el movimiento”.
Durante la anamnesis, el paciente indica que no recuerda un traumatismo específico que haya desencadenado el malestar, pero reconoce que su trabajo implica estar muchas horas de pie y que, fuera del ámbito laboral, ha realizado actividades de impacto moderado como caminatas rápidas y trotes esporádicos sin una preparación adecuada. Niega fiebre, pérdida de peso o síntomas sistémicos.`,
        integranteId: 1,
        prestadorId: 4
    },
    {
        date: new Date("2025-01-28T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.
Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.
Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.
Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.`,
        integranteId: 1,
        prestadorId: 1
    },
    {
        date: new Date("2025-03-18T10:00:00"),
        start: new Date("2024-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta de control clínico general, el paciente refiere un período de tres meses con aumento del cansancio relacionado principalmente con falta de regularidad en hábitos de descanso y modificaciones significativas en su rutina alimentaria. Describe que, debido a mayores exigencias laborales, ha reducido la cantidad de comidas caseras y ha incrementado la ingesta de alimentos procesados. Refiere episodios leves de distensión abdominal, especialmente por la noche.`,
        integranteId: 1,
        prestadorId: 2
    },
       {
        date: new Date("2025-11-19T10:00:00"),
        start: new Date("2024-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente acude al servicio de traumatología por molestias persistentes en la región lumbar baja, las cuales describe como una sensación de tensión acompañada de dolor opresivo tras períodos prolongados sentado. Explica que estos síntomas comenzaron de manera progresiva hace aproximadamente dos meses, sin antecedente traumático definido. Comenta que trabaja muchas horas frente a una computadora y que ha descuidado la ergonomía en su puesto de trabajo.`,
        integranteId: 1,
        prestadorId: 4
    },
    ////////////
        {
        date: new Date("2025-08-03T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes:`El paciente acude a la consulta programada de clínica médica con el objetivo de realizar un control integral de salud y evaluar algunos síntomas inespecíficos que ha venido experimentando en los últimos meses. Al inicio de la entrevista, refiere que ha tenido episodios intermitentes de fatiga, especialmente durante la tarde, sensación que describe como "un cansancio raro" que no logra asociar claramente a esfuerzo físico excesivo ni a situaciones puntuales de estrés. Comenta también que ha tenido cierta dificultad para mantener la concentración en tareas prolongadas y que en algunas ocasiones experimenta leve cefalea tensional hacia el final del día, aunque estas molestias no han sido incapacitantes.
Durante la revisión de antecedentes personales, señala que no ha sufrido enfermedades agudas recientes, no ha tenido fiebre ni procesos infecciosos conocidos, y ha mantenido su medicación habitual sin cambios. En cuanto a los hábitos de vida, reconoce que ha reducido la actividad física en las últimas semanas debido a una mayor carga laboral y que su alimentación ha sido irregular, con frecuentes saltos de comidas y mayor consumo de alimentos procesados por motivos de tiempo. También refiere que ha estado durmiendo menos horas de lo habitual, rondando entre cinco y seis horas por noche, lo cual podría estar contribuyendo a sus síntomas.`,
        integranteId: 1,
        prestadorId: 2,
        centroId: 5
    },
      {
        date: new Date("2025-07-06T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `En el examen físico, se observa alineación conservada de miembros inferiores, sin deformidades visibles. A la inspección, no se aprecia aumento significativo de volumen, aunque se percibe leve derrame articular en la maniobra de onda patelar. La palpación revela sensibilidad dolorosa en el borde medial de la articulación y sobre el tendón rotuliano. La movilidad activa y pasiva se encuentra completa, aunque genera molestias en el rango final de flexión. Las pruebas específicas para meniscos muestran dolor en la maniobra de McMurray medial, sin chasquidos claros. No se evidencian laxitudes en los ligamentos colateral medial, lateral ni cruzados.
Se explica al paciente que los hallazgos son compatibles con un síndrome femoropatelar asociado a sobrecarga mecánica y posible irritación meniscal leve, cuadro frecuente en personas que realizan actividades repetitivas o mantienen posturas sostenidas durante mucho tiempo. Dado que el dolor ha persistido y afecta sus actividades diarias, se indica un plan terapéutico que incluye reposo relativo, aplicación de frío local, y un esquema de antiinflamatorios no esteroides por corto plazo. Se recomienda iniciar fisioterapia con enfoque en fortalecimiento del cuádriceps, estiramiento de la musculatura posterior del muslo y reentrenamiento de la mecánica de marcha. Para evaluar mejor la estructura interna de la rodilla y descartar lesiones meniscales o condropatías más avanzadas, se solicita una resonancia magnética. Se programa un nuevo control una vez obtenidos los estudios o antes si los síntomas empeoran.`,
        integranteId: 1,
        prestadorId: 4
    },
     {
        date: new Date("2025-06-14T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente se presenta a la consulta traumatológica refiriendo dolor persistente en la rodilla izquierda, el cual ha evolucionado de manera progresiva durante los últimos dos meses. Describe el dolor como una molestia profunda, localizada principalmente en la región anterior y medial de la articulación, que se intensifica al caminar largas distancias, durante la subida o bajada de escaleras y al mantenerse de pie por períodos prolongados. Refiere además sensación ocasional de rigidez matutina que dura algunos minutos y que mejora con el movimiento. No reporta episodios de bloqueo articular ni inestabilidad franca, aunque menciona que en ocasiones siente “como si la rodilla no acompañara bien el movimiento”.
Durante la anamnesis, el paciente indica que no recuerda un traumatismo específico que haya desencadenado el malestar, pero reconoce que su trabajo implica estar muchas horas de pie y que, fuera del ámbito laboral, ha realizado actividades de impacto moderado como caminatas rápidas y trotes esporádicos sin una preparación adecuada. Niega fiebre, pérdida de peso o síntomas sistémicos.`,
        integranteId: 1,
        prestadorId: 4
    },
    {
        date: new Date("2025-05-28T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.
Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.
Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.
Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.`,
        integranteId: 1,
        prestadorId: 1
    },
    {
        date: new Date("2025-04-18T10:00:00"),
        start: new Date("2024-11-18T10:00:00"),
        duration: 45,
        notes: `Durante la consulta de control clínico general, el paciente refiere un período de tres meses con aumento del cansancio relacionado principalmente con falta de regularidad en hábitos de descanso y modificaciones significativas en su rutina alimentaria. Describe que, debido a mayores exigencias laborales, ha reducido la cantidad de comidas caseras y ha incrementado la ingesta de alimentos procesados. Refiere episodios leves de distensión abdominal, especialmente por la noche.`,
        integranteId: 1,
        prestadorId: 2
    },
       {
        date: new Date("2025-01-19T10:00:00"),
        start: new Date("2024-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente acude al servicio de traumatología por molestias persistentes en la región lumbar baja, las cuales describe como una sensación de tensión acompañada de dolor opresivo tras períodos prolongados sentado. Explica que estos síntomas comenzaron de manera progresiva hace aproximadamente dos meses, sin antecedente traumático definido. Comenta que trabaja muchas horas frente a una computadora y que ha descuidado la ergonomía en su puesto de trabajo.`,
        integranteId: 1,
        prestadorId: 4
    }
])
}

module.exports = {crearTurnos};
