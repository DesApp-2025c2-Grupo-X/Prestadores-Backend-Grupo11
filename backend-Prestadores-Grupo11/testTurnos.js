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
        date: new Date("2025-12-11T15:00:00"),
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
        date: new Date("2025-12-03T11:00:00"),
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
  },

  // Turnos Integrante Id: 4

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
        prestadorId: 1
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
        prestadorId: 1
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
        prestadorId: 1
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
        prestadorId: 1
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
        prestadorId: 1,
        centroId:5
    },
        {
        date: new Date("2025-12-18T11:30:00"),
        start: new Date("2025-12-18T08:30:00"),
        duration: 45,
        notes: null,
        integranteId: 2,
        prestadorId: 1,
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
        prestadorId: 1,
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
