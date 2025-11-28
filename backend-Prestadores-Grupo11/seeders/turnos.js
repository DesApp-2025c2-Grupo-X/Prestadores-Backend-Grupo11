'use strict';
const { Faker, es } = require('@faker-js/faker');
const faker = new Faker({ locale: [es] });

const db = require('../db/models/index');
const Turno = db.Turno;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const medicos = await Prestador.findAll({
      where: { role: 'medico' },
      attributes: ['id', 'especialidades']
    });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });
    const integrantes = await Integrante.findAll({ attributes: ['id', 'afiliadoId'] });

    if (medicos.length === 0 || afiliados.length === 0) {
      console.error("Error: No se encontraron médicos o afiliados. Ejecuta los seeders anteriores.");
      return;
    }

    const todosLosPacientes = [
      ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })),
      ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId }))
    ];

    const duraciones = [15, 30, 45, 60];
    const turnosData = [];

    // Mapeo de Especialidades a Datos Médicos (lógica de realismo intacta)
    const dataEspecialidades = {
      'Cardiología': { motivos: ['Control de presión arterial', 'Dolor de pecho atípico'], hallazgos: ['TA 120/80. Auscultación rítmica, sin soplos.'], prescripciones: ['Atorvastatina 20mg, 1 por noche.'] },
      'Pediatría': { motivos: ['Control niño sano', 'Fiebre y tos'], hallazgos: ['Desarrollo acorde a la edad. Vacunas al día.'], prescripciones: ['Ibuprofeno infantil, dosificar por peso.'] },
      'Traumatología': { motivos: ['Dolor de rodilla', 'Esguince de tobillo'], hallazgos: ['Inflamación leve en tobillo. Rx sin fracturas.'], prescripciones: ['Ibuprofeno 600mg c/8hs.'] },
      'Neurología': { motivos: ['Migrañas recurrentes', 'Mareos'], hallazgos: ['Examen neurológico normal. Sin déficits focales.'], prescripciones: ['Sumatriptán si crisis.'] },
      'Clínica Médica': { motivos: ['Chequeo general', 'Resultados de laboratorio'], hallazgos: ['Signos vitales estables. Laboratorio normal. Paciente sano.'], prescripciones: ['Se solicita laboratorio completo y EGG.'] },
      'Oftalmología': { motivos: ['Control de la vista', 'Picazón en los ojos'], hallazgos: ['Agudeza visual 10/10 con corrección. Fondo de ojo normal.'], prescripciones: ['Gotas de Cloranfenicol, 1 gota cada 4hs.'] },
      'Otorrinolaringología': { motivos: ['Dolor de garganta', 'Otitis'], hallazgos: ['Faringe hiperémica. Amígdalas aumentadas de tamaño.'], prescripciones: ['Amoxicilina/Ác. Clavulánico 875mg.'] },
      'Psicología': { motivos: ['Primera sesión', 'Seguimiento de terapia'], hallazgos: ['Paciente refiere alto nivel de estrés laboral.'], prescripciones: ['Derivación a Psiquiatría.'] },
      'Kinesiología': { motivos: ['Rehabilitación de rodilla', 'Fisioterapia lumbar'], hallazgos: ['Mejora del rango de movimiento en rodilla.'], prescripciones: ['10 sesiones de kinesiología.'] },
      'Dermatología': { motivos: ['Erupción cutánea', 'Control de lunares'], hallazgos: ['Lesión sospechosa en espalda, se biopsia.'], prescripciones: ['Crema con Hidrocortisona.'] },
      'Gastroenterología': { motivos: ['Acidez estomacal', 'Dolor abdominal crónico'], hallazgos: ['Endoscopia: Gastritis erosiva leve.'], prescripciones: ['Omeprazol 20mg, 1 por día.'] },
      'Endocrinología': { motivos: ['Control de Tiroides', 'Diabetes'], hallazgos: ['TSH en rango normal.'], prescripciones: ['Levotiroxina 75mcg/día.'] },
      'Urología': { motivos: ['Infección urinaria recurrente', 'Control de próstata'], hallazgos: ['PSA normal para la edad.'], prescripciones: ['Ciprofloxacina 500mg c/12hs.'] },
      'Oncología': { motivos: ['Sesión de quimioterapia', 'Control oncológico'], hallazgos: ['Hemograma pre-quimio normal. Paciente estable.'], prescripciones: ['Plan de quimioterapia ciclo 4.'] },
      'Nefrología': { motivos: ['Control de función renal', 'Diálisis'], hallazgos: ['Creatinina estable. Función renal conservada.'], prescripciones: ['Control de electrolitos semanal.'] },
      'Odontología': { motivos: ['Extracción dental', 'Limpieza y control'], hallazgos: ['Caries en molar inferior izquierdo.'], prescripciones: ['Analgésico post-extracción.'] },
      'Fisiatría': { motivos: ['Rehabilitación general'], hallazgos: ['Mejora en movilidad general.'], prescripciones: ['10 sesiones de fisiatría.'] },
      'Análisis Clínicos': { motivos: ['Extracción de sangre'], hallazgos: ['Muestra tomada con éxito.'], prescripciones: [] },
      'Patología': { motivos: ['Análisis de biopsia'], hallazgos: ['Resultado enviado al médico tratante.'], prescripciones: [] },
      'Guardia': { motivos: ['Emergencia general', 'Fiebre alta'], hallazgos: ['Evaluación inicial en guardia. Paciente estable.'], prescripciones: ['Dipirona EV 1g.'] },
      'Diagnóstico por Imágenes': { motivos: ['Radiografía', 'Ecografía'], hallazgos: ['Estudio realizado. Informe en 48hs.'], prescripciones: [] },
      'Maternidad': { motivos: ['Parto inminente', 'Control de embarazo de alto riesgo'], hallazgos: ['Dilatación 4cm. Monitoreo fetal constante.'], prescripciones: ['Internación.'] },
      'Ginecología': { motivos: ['PAP y Colpo', 'Control anual'], hallazgos: ['PAP normal.'], prescripciones: ['Anticonceptivos orales habituales.'] },
      'Cirugía Pediátrica': { motivos: ['Evaluación pre-quirúrgica', 'Cirugía de hernia'], hallazgos: ['Cirugía realizada sin complicaciones.'], prescripciones: ['Control post-operatorio en 7 días.'] },
      'Psiquiatría': { motivos: ['Evaluación de medicación', 'Depresión severa'], hallazgos: ['Ajuste de dosis de antidepresivos.'], prescripciones: ['Sertralina 100mg/día.'] },
      'Fonoaudiología': { motivos: ['Problemas del habla', 'Terapia de voz'], hallazgos: ['Progreso en terapia del habla.'], prescripciones: [] },
      'Terapia Ocupacional': { motivos: ['Rehabilitación motriz'], hallazgos: ['Mejora en motricidad fina.'], prescripciones: [] },
      'Hematología': { motivos: ['Anemia', 'Resultados de hemograma'], hallazgos: ['Hemograma: Hb 10g/dL. Se indica suplemento de hierro.'], prescripciones: ['Hierro oral.'] },
      'Obstetricia': { motivos: ['Control semanal de embarazo'], hallazgos: ['Latidos fetales presentes. TA normal.'], prescripciones: ['Vitaminas prenatales.'] },
      'Fertilidad': { motivos: ['Estudios de fertilidad', 'Tratamiento FIV'], hallazgos: ['Evaluación hormonal inicial.'], prescripciones: ['Estimulación ovárica.'] }
    };


    // --- Generación de Registros de Turnos (1000 turnos totales) ---

    for (let i = 0; i < 1000; i++) {
      const isPast = Math.random() < 0.8; // 80% turnos pasados/completados
      const duration = faker.helpers.arrayElement(duraciones);

      // 1. 'start': Cuando se solicitó el turno (siempre en el pasado)
      const requestedDate = faker.date.past({ years: 2 });

      // 2. 'date': Fecha agendada del turno (obligatorio, posterior a 'start')
      // Si es pasado, la fecha agendada fue hace poco. Si es futuro, será pronto.
      const scheduledDate = isPast
        ? faker.date.past({ refDate: new Date(), days: 30 })
        : faker.date.future({ days: 60 });

      let selectedNote = null;
      let selectedDescription = `Turno agendado`;
      // 3. 'archivedAt': Momento de grabación de la nota clínica (solo para turnos completados)
      let archiveDate = null;

      const medico = faker.helpers.arrayElement(medicos);
      const paciente = faker.helpers.arrayElement(todosLosPacientes);

      const especialidad = faker.helpers.arrayElement(medico.especialidades);
      const dataEsp = dataEspecialidades[especialidad];

      if (isPast) {
        // Si el turno ya pasó (isPast=true), generamos notas y la fecha de archivo
        if (dataEsp) {
          const motivo = faker.helpers.arrayElement(dataEsp.motivos);
          const hallazgo = faker.helpers.arrayElement(dataEsp.hallazgos);
          const prescripcion = dataEsp.prescripciones.length > 0 ? faker.helpers.arrayElement(dataEsp.prescripciones) : 'No se requiere prescripción específica.';
          selectedDescription = motivo;
          selectedNote = `Motivo: ${motivo}. Hallazgos clínicos: ${hallazgo} Prescripción: ${prescripcion}`;
        } else {
          selectedDescription = 'Consulta médica general concluida.';
          selectedNote = 'Evolución favorable. Control en 1 mes.';
        }

        // La nota se grabó en algún momento después de la fecha/hora del turno
        // Asumimos que se graba "ahora" o poco después de la fecha agendada
        archiveDate = new Date();
      }

      turnosData.push({
        date: scheduledDate,      // Fecha agendada (obligatorio)
        start: requestedDate,     // Cuando se solicitó (obligatorio)
        duration: duration,
        notes: selectedNote,      // Notas de historia clínica (solo si está archivado)
        descripción: selectedDescription,
        prestadorId: medico.id,
        afiliadoId: paciente.afiliadoIdFK,
        integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
        archivedAt: archiveDate,  // Momento de grabación de la nota (solo si está archivado)
      });
    }

    await queryInterface.bulkInsert('Turnos', turnosData, {});
    console.log(`Datos de ${turnosData.length} turnos cargados con éxito.`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Turnos', null, {});
  }
};
