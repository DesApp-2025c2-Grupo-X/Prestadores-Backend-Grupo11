const {Turno} = require('./db/models');
const { notify } = require('./routes/auth.route');

const crearTurnos = async () => {
    await Turno.bulkCreate([
        //Turnos Intregrante Id: 1
        {
        date: new Date("2025-12-03T10:00:00"),
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
        date: new Date("2025-02-10T15:30:00"),
        start: new Date("2025-02-10T15:30:00"),
        duration: 30,
        notes: `En esta consulta de clínica médica general, el paciente acudió con el objetivo de realizar un control integral del estado de salud, evaluar síntomas recientes y actualizar estudios complementarios de rutina. Durante la entrevista clínica refirió haber experimentado en las últimas semanas episodios aislados de malestar general y cansancio, aunque aclaró que estos no interfieren significativamente en su vida cotidiana. Negó presencia de fiebre, tos persistente, dificultad respiratoria, molestias digestivas relevantes o cambios bruscos en el apetito o el peso corporal. También comentó que ha intentado mantener hábitos saludables, aunque reconoció que su nivel de actividad física disminuyó en el último mes debido a mayor carga laboral.

El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.

A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.

Además, se conversó con el paciente sobre la importancia del descanso adecuado y el manejo del estrés, ya que ambos factores suelen influir notablemente en la sensación de fatiga. Se recomendó mantener correcta hidratación y vigilar aparición de cualquier síntoma persistente o progresivo. Finalmente, se coordinó un nuevo control clínico para la revisión de los estudios solicitados, dejando la puerta abierta para consulta anticipada si presentara fiebre, malestar general sostenido, dolor abdominal importante o cualquier síntoma que genere preocupación.`,
        integranteId: 1,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-07-21T14:00:00"),
        start: new Date("2025-07-21T14:00:00"),
        duration: 60,
        notes: `Durante la consulta traumatológica, el paciente acudió para una evaluación integral orientada a valorar su estado musculoesquelético, particularmente a raíz de molestias intermitentes que había mencionado en controles previos. Al iniciar la entrevista, refirió episodios aislados de rigidez matutina leve y sensación de tensión en la región lumbar después de periodos prolongados sentado, sin irradiación hacia miembros inferiores ni acompañamiento de hormigueo o pérdida de fuerza. Negó traumatismos recientes, caídas, torceduras, inflamación significativa o dolor agudo incapacitante.

En el examen físico se evaluó la postura, movilidad general y presencia de puntos dolorosos. Se observó una marcha estable, sin claudicación. La columna vertebral mostró alineación adecuada, aunque con ligera contractura paravertebral lumbar bilateral a la palpación. Los rangos de movimiento fueron completos, aunque la flexión lumbar presentó leve molestia al final del recorrido. Las extremidades inferiores exhibieron fuerza conservada, reflejos osteotendinosos simétricos y sin alteraciones de sensibilidad. No se detectaron signos clínicos sugestivos de radiculopatía ni compromiso neurológico agudo.`,
        integranteId: 1,
        prestadorId: 4
    },
    {
        date: new Date("2025-11-03T11:15:00"),
        start: new Date("2025-10-03T11:15:00"),
        duration: 30,
        notes: `Durante esta revisión cardiológica, el paciente indicó sensación ocasional de fatiga. Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.)`,
        integranteId: 1,
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
        integranteId: 1,
        prestadorId: 2,
        centroId: 5
    },

    {
        date: new Date("2025-12-11T13:00:00"),
        start: new Date("2025-12-11T13:00:00"),
        duration: 30,
        notes: null,
        integranteId: 1,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2026-01-02T09:45:00"),
        start: new Date("2026-01-02T09:45:00"),
        duration: 45,
        notes: null,
        integranteId: 1,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-11-04T18:30:00"),
        start: new Date("2025-10-04T18:30:00"),
        duration: 60,
        notes: `El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.

Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.

Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.

Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
        integranteId: 1,
        prestadorId: 1,
        centroId: 5
    },

    //Turnos Intregrante Id: 2
    {
        date: new Date("2025-01-22T09:00:00"),
        start: new Date("2025-01-22T09:00:00"),
        duration: 45,
        notes: `Durante la consulta traumatológica, el paciente acudió para una evaluación integral orientada a valorar su estado musculoesquelético, particularmente a raíz de molestias intermitentes que había mencionado en controles previos. Al iniciar la entrevista, refirió episodios aislados de rigidez matutina leve y sensación de tensión en la región lumbar después de periodos prolongados sentado, sin irradiación hacia miembros inferiores ni acompañamiento de hormigueo o pérdida de fuerza. Negó traumatismos recientes, caídas, torceduras, inflamación significativa o dolor agudo incapacitante.

En el examen físico se evaluó la postura, movilidad general y presencia de puntos dolorosos. Se observó una marcha estable, sin claudicación. La columna vertebral mostró alineación adecuada, aunque con ligera contractura paravertebral lumbar bilateral a la palpación. Los rangos de movimiento fueron completos, aunque la flexión lumbar presentó leve molestia al final del recorrido. Las extremidades inferiores exhibieron fuerza conservada, reflejos osteotendinosos simétricos y sin alteraciones de sensibilidad. No se detectaron signos clínicos sugestivos de radiculopatía ni compromiso neurológico agudo.

En las articulaciones de miembros superiores e inferiores no se evidenció inflamación, eritema ni aumento de temperatura local. Las maniobras específicas para evaluar rodilla, cadera y hombro resultaron negativas para lesiones ligamentarias o meniscales. El paciente manifestó que las molestias suelen mejorar con estiramientos y breves caminatas, lo que sugiere un componente mecánico asociado a postura y sobrecarga funcional más que a patología estructural severa.

Se conversó sobre factores predisponentes, como sedentarismo, debilidad de la musculatura abdominal y falta de pausas activas durante la jornada laboral. Se recomendó iniciar un plan progresivo de ejercicios orientados al fortalecimiento de la musculatura central (core), estiramientos diarios y caminatas regulares. También se sugirió evitar posiciones prolongadas, realizar pausas cada 45 a 60 minutos y ajustar el puesto de trabajo para mantener ergonomía adecuada. Debido a que el paciente no presentó signos de alarma, no se consideró necesario solicitar estudios por imágenes de inmediato; sin embargo, se aclaró que en caso de persistencia o agravamiento del dolor podría indicarse una radiografía o resonancia magnética para descartar alteraciones estructurales mayores.

Finalmente, se pautó un seguimiento clínico para valorar la evolución y ajustar el plan terapéutico según la respuesta. Se recomendó consultar de forma inmediata si aparecían síntomas neurológicos, pérdida de fuerza, dolor intenso o limitación funcional significativa.`,
        integranteId: 2,
        prestadorId: 4,
    },

    {
        date: new Date("2025-03-10T14:15:00"),
        start: new Date("2025-03-10T14:15:00"),
        duration: 45,
        notes: `El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.

A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.`,
        integranteId: 2,
        prestadorId: 2
    },

    {
        date: new Date("2025-05-02T11:30:00"),
        start: new Date("2025-05-02T11:30:00"),
        duration: 30,
        notes: `Se conversó sobre factores predisponentes, como sedentarismo, debilidad de la musculatura abdominal y falta de pausas activas durante la jornada laboral. Se recomendó iniciar un plan progresivo de ejercicios orientados al fortalecimiento de la musculatura central (core), estiramientos diarios y caminatas regulares. También se sugirió evitar posiciones prolongadas, realizar pausas cada 45 a 60 minutos y ajustar el puesto de trabajo para mantener ergonomía adecuada. Debido a que el paciente no presentó signos de alarma, no se consideró necesario solicitar estudios por imágenes de inmediato; sin embargo, se aclaró que en caso de persistencia o agravamiento del dolor podría indicarse una radiografía o resonancia magnética para descartar alteraciones estructurales mayores.

Finalmente, se pautó un seguimiento clínico para valorar la evolución y ajustar el plan terapéutico según la respuesta. Se recomendó consultar de forma inmediata si aparecían síntomas neurológicos, pérdida de fuerza, dolor intenso o limitación funcional significativa.`,
        integranteId: 2,
        prestadorId: 4,
    },

    {
        date: new Date("2025-07-19T08:45:00"),
        start: new Date("2025-07-19T08:45:00"),
        duration: 45,
        notes: `El examen físico reveló un paciente en buen estado general, colaborador y orientado en tiempo y espacio. Se constató una presión arterial dentro de rangos normales, frecuencia cardíaca regular y temperatura afebril. La auscultación cardiopulmonar no mostró alteraciones significativas: los ruidos cardíacos fueron claros y rítmicos, sin soplos evidentes, y los campos pulmonares presentaron buena ventilación, sin ruidos agregados. El abdomen se palpó blando, depresible y sin signos de dolor a la presión. No se identificaron masas ni organomegalias. Las extremidades no mostraron edemas y la movilidad general fue adecuada.

A nivel metabólico, se revisaron estudios previos que indicaron valores limítrofes en glucemia y colesterol total. Por ello se recomendó reforzar cuidados dietarios, disminuir consumo de azúcares simples e incorporar más fibras vegetales. También se sugirió retomar una rutina regular de ejercicio, al menos 30 minutos cinco veces por semana. Dado que los valores anteriores fueron tomados hace varios meses, se solicitó un nuevo laboratorio que incluya hemograma completo, función hepática, función renal, glucemia en ayunas, perfil lipídico y control tiroideo, con el fin de descartar alteraciones subyacentes que pudieran relacionarse con el cansancio referido.`,
        integranteId: 2,
        prestadorId: 2
    },

    {
        date: new Date("2025-10-03T10:30:00"),
        start: new Date("2025-10-03T10:30:00"),
        duration: 30,
        notes: `Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular.

Se conversó con el paciente sobre la importancia del control periódico, la adherencia a las medidas terapéuticas no farmacológicas y el seguimiento continuo de síntomas. Se acordó una nueva consulta una vez obtenidos los resultados solicitados o antes en caso de presentar dolor precordial, disnea, palpitaciones persistentes o cualquier síntoma nuevo que genere preocupación.)`,
        integranteId: 2,
        prestadorId: 1,
        centroId: 5
    },


    {
        date: new Date("2025-12-03T09:00:00"),
        start: new Date("2025-12-03T09:00:00"),
        duration: 45,
        notes:`Durante la consulta cardiológica, el paciente asistió para un control integral orientado a evaluar su estado cardiovascular general, la presencia de síntomas relacionados y la evolución de factores de riesgo previamente identificados. Al iniciar la entrevista, refirió sentirse en términos generales estable, aunque mencionó episodios ocasionales de cansancio leve al realizar esfuerzos prolongados, sin que estos se acompañen de disnea significativa, dolor torácico típico, palpitaciones sostenidas o mareos incapacitantes. El paciente relató que en las últimas semanas mantuvo una rutina de actividad física moderada, aunque aclaró que sus niveles de energía han variado según el descanso y las demandas laborales.

Durante el examen físico se constató un estado general bueno, con buena coloración y sin signos visibles de fatiga. La presión arterial se registró dentro de parámetros aceptables para su rango etario, aunque se observó una ligera tendencia a valores altos, motivo por el cual se recomendó continuar el monitoreo domiciliario. La auscultación cardíaca reveló tonos rítmicos, sin soplos, extratonos ni arritmias evidentes. No se identificaron edemas en miembros inferiores ni signos compatibles con falla cardíaca descompensada. La auscultación pulmonar no mostró ruidos agregados y el pulso periférico se palpó con buena intensidad y simetría.

Se revisaron estudios previos, incluyendo un electrocardiograma de control que muestra un ritmo sinusal normal sin alteraciones de la conducción ni signos de isquemia recientes. También se evaluaron resultados de laboratorio anteriores, observándose perfiles lipídicos ligeramente elevados, por lo que se reforzaron las recomendaciones sobre alimentación, reducción de grasas saturadas y mantenimiento de una rutina regular de ejercicio aeróbico. En vista de los hallazgos actuales y considerando el antecedente de factores de riesgo cardiovasculares moderados, se indicó solicitar un laboratorio actualizado que incluya perfil lipídico completo, función renal, glucemia y hemoglobina glicosilada. Asimismo, se programó un ecocardiograma Doppler para evaluar estructura y función cardíaca con mayor detalle, especialmente parámetros como fracción de eyección, tamaño de cavidades y funcionamiento valvular. `,
        integranteId: 2,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2025-11-04T21:30:00"),
        start: new Date("2025-10-04T21:30:00"),
        duration: 45,
        notes: `El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.

Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.

Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.

Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
        integranteId: 2,
        prestadorId: 1
    },

    {
        date: new Date("2025-12-11T14:00:00"),
        start: new Date("2025-12-11T14:00:00"),
        duration: 45,
        notes: null,
        integranteId: 2,
        prestadorId: 1,
        centroId: 5
    },

    {
        date: new Date("2026-01-12T16:00:00"),
        start: new Date("2026-01-12T16:00:00"),
        duration: 30,
        notes: null,
        integranteId: 2,
        prestadorId: 1
    },

    {
        date: new Date("2026-01-27T18:30:00"),
        start: new Date("2026-01-27T18:30:00"),
        duration: 60,
        notes: null,
        integranteId: 2,
        prestadorId: 4
    },
       //Turnos Intregrante Id: 3
          {
        date: new Date("2025-12-03T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: `El paciente concurre a la consulta programada para evaluación cardiológica de seguimiento. Refiere sentirse en buen estado general, aunque menciona episodios aislados de fatiga leve durante actividades cotidianas que antes no le generaban malestar. No refiere dolor torácico, mareos, palpitaciones ni disnea de reposo. Durante el examen físico, se constatan signos vitales estables, frecuencia cardíaca dentro de parámetros normales y ausencia de soplos o ruidos cardíacos anormales. El pulso periférico se palpa simétrico y sin alteraciones. No se observa edema en extremidades inferiores.

La auscultación respiratoria es normal, con buena entrada de aire bilateral. El electrocardiograma realizado en consultorio muestra ritmo sinusal, sin signos de isquemia aguda. Se revisan estudios previos y se observa estabilidad en los parámetros de función ventricular.

Se indica realizar un test ergométrico para descartar isquemia inducible, dado el antecedente de episodios de fatiga referidos por el paciente. También se solicita laboratorio completo con perfil lipídico, función renal y marcadores inflamatorios. Se recomienda mantener actividad física moderada, evitar el sedentarismo y continuar con la medicación actual. Se agenda un control en cuatro semanas o antes si aparecen síntomas nuevos.`,
        integranteId: 3,
        prestadorId: 1,
        centroId: 5
    },
    {
        date: new Date("2025-12-11T10:00:00"),
        start: new Date("2025-11-18T10:00:00"),
        duration: 45,
        notes: null,
        integranteId: 3,
        prestadorId: 1,
        centroId: 5
    },
     {
    date: new Date("2025-03-14T10:30:00"),
    start: new Date("2025-03-14T10:30:00"),
    duration: 45,
    notes:`El paciente llega a la consulta para seguimiento de su condición cardiovascular. Refiere que en las últimas semanas presentó episodios de presión en el pecho durante esfuerzos intensos, los cuales cedieron al descansar. No se acompañaron de sudoración fría ni náuseas. Tampoco manifiesta palpitaciones ni pérdida de conocimiento. Refiere que ha descuidado un poco la actividad física regular y la dieta recomendada.

Durante el examen físico, los signos vitales se encuentran dentro de valores esperados. La auscultación cardíaca no revela soplos ni alteraciones de los ruidos cardíacos. La evaluación vascular periférica muestra buena perfusión, sin edemas. La exploración respiratoria es normal. Se revisa el electrocardiograma previo, que mostraba un ritmo sinusal sin cambios significativos, aunque el paciente no trae estudios recientes.

Ante la descripción de molestias torácicas relacionadas con el esfuerzo, se indica realizar una ergometría y un ecocardiograma para evaluar la función ventricular y descartar isquemia. Asimismo, se solicita laboratorio completo, incluyendo perfil lipídico, función hepática y renal, y marcadores metabólicos.

Se conversa con el paciente sobre la importancia de retomar hábitos saludables, mantener un plan de ejercicio progresivo y controlar adecuadamente los factores de riesgo. Se fija una nueva consulta una vez obtenidos los resultados.`,
    integranteId: 3,
    prestadorId: 1
  },

  {
    date: new Date("2025-07-21T09:00:00"),
    start: new Date("2025-07-21T09:00:00"),
    duration: 40,
    notes: `Consulta con especialista en clínica médica para seguimiento general. El paciente refiere estabilidad en su estado de salud, aunque menciona episodios ocasionales de cansancio matutino y dificultades leves para conciliar el sueño. Durante la anamnesis se revisan hábitos alimentarios, hidratación, rutina diaria y cumplimiento de medicación preventiva. El paciente reconoce cierta irregularidad en la ingesta de líquidos y una disminución progresiva en su nivel de actividad física desde hace dos meses. (…)`,
    integranteId: 3,
    prestadorId: 4
  },

  {
    date: new Date("2025-05-02T14:45:00"),
    start: new Date("2025-05-02T14:45:00"),
    duration: 60,
    notes:`El paciente concurre a la consulta traumatológica por molestias persistentes en la región lumbar, que se han acentuado durante las últimas semanas. Refiere dolor de características mecánicas, que aumenta con el movimiento, especialmente al inclinarse hacia adelante o al realizar esfuerzos moderados. Comenta que el malestar comenzó de forma insidiosa hace aproximadamente dos meses, sin antecedente claro de traumatismo directo, aunque reconoce haber realizado varias tareas de carga y traslado de objetos pesados durante ese período. Indica que el dolor se irradia de manera ocasional hacia la zona glútea derecha, sin irradiación franca hacia miembros inferiores.` ,
    integranteId: 3,
    prestadorId: 4
  },

  {
    date: new Date("2025-12-18T11:00:00"),
    start: new Date("2025-12-18T11:00:00"),
    duration: 30,
    notes: null,
    integranteId: 3,
    prestadorId: 2,
    centroId: 5
  },
  
  {
    date: new Date("2025-12-05T09:30:00"),
    start: new Date("2025-10-25T09:30:00"),
    duration: 45,
    notes: null,
    integranteId: 3,
    prestadorId: 2,
    centroId: 5
  },

  {
    date: new Date("2025-10-02T16:00:00"),
    start: new Date("2025-10-02T16:00:00"),
    duration: 45,
    notes:`El paciente acude a la consulta de clínica médica para control integral de salud y seguimiento de varios síntomas inespecíficos que ha manifestado de forma intermitente durante los últimos meses. Refiere sensación de cansancio generalizado, particularmente al finalizar la jornada laboral, acompañado en ocasiones de cefaleas tensionales que describen un patrón predominantemente vespertino. También menciona episodios esporádicos de malestar abdominal leve, sin relación clara con los alimentos, aunque reconoce que su dieta habitual incluye comidas rápidas, bebidas azucaradas y un consumo irregular de agua. Indica que su rutina de sueño se ha vuelto más desordenada y que suele despertarse durante la noche sin causa aparente, lo que contribuye a la fatiga diurna.

Durante la anamnesis se revisan antecedentes personales, hábitos, medicación actual, factores de estrés laboral y rutinas de actividad física. El paciente admite llevar un estilo de vida predominantemente sedentario, con escasa práctica de ejercicio estructurado. Señala además que ha aumentado su carga laboral en los últimos dos meses, lo que coincide temporalmente con la intensificación de los síntomas referidos. No presenta antecedentes crónicos relevantes, aunque en consultas previas se había observado una tendencia al sobrepeso y elevaciones límite en los valores de presión arterial.`, 
    integranteId: 3,
    prestadorId: 1,
    centroId: 5
  },

  {
    date: new Date("2025-12-18T15:15:00"),
    start: new Date("2025-12-01T15:15:00"),
    duration: 30,
    notes: null,
    integranteId: 3,
    prestadorId: 1,
    centroId: 5
  }
   
    ])
}

module.exports = {crearTurnos};
