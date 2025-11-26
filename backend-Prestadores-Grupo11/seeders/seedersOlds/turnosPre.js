'use strict';
const { faker } = require('@faker-js/faker/locale/es_AR');
const medicosSeeder = require('./02_medicos');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Duraciones de turno comunes en minutos (15, 30, 45 o 60 minutos)
    const duraciones = [15, 30, 45, 60]; 

    const turnosData = [];
    
    // Obtenemos la lista de médicos generada con sus IDs y especialidades
    const medicosConEspecialidadSimulados = medicosSeeder.generatedMedicosList;

    // Asumimos rangos basados en los seeders anteriores:
    const afiliadoIds = Array.from({ length: 100 }, (_, i) => i + 1);
    const integranteIds = Array.from({ length: 220 }, (_, i) => i + 1);

    // --- Mapeo de Especialidades a Datos Médicos (Completo) ---
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
        'Patología': { motivos: ['Análisis de biopsia'], hallazgos: ['Resultados enviados al médico tratante.'], prescripciones: [] },
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


    // --- Generación de Registros de Turnos (Aprox 1000 turnos totales) ---

    for (let i = 0; i < 1000; i++) {
      const isPast = Math.random() < 0.8; 
      const duration = faker.helpers.arrayElement(duraciones);
      const startTime = isPast ? faker.date.past({ years: 2 }) : faker.date.future({ days: 60 }); 
      const dateRecorded = isPast ? new Date() : null; 

      const medico = faker.helpers.arrayElement(medicosConEspecialidadSimulados);
      const especialidad = faker.helpers.arrayElement(medico.especialidades);
      const dataEsp = dataEspecialidades[especialidad];

      let selectedDescription = 'Turno agendado, pendiente de atención';
      let selectedNote = null;

      if (isPast && dataEsp) {
        const motivo = faker.helpers.arrayElement(dataEsp.motivos);
        const hallazgo = faker.helpers.arrayElement(dataEsp.hallazgos);
        const prescripcion = dataEsp.prescripciones.length > 0 ? faker.helpers.arrayElement(dataEsp.prescripciones) : 'No se requiere prescripción específica.';
        
        selectedDescription = motivo;
        selectedNote = `Motivo: ${motivo}. Hallazgos clínicos: ${hallazgo} Prescripción: ${prescripcion}`;
      } else if (isPast) {
          selectedDescription = 'Consulta médica general concluida.';
          selectedNote = 'Evolución favorable. Control en 1 mes.';
      }

      let afiliadoIdFK = null;
      let integranteIdFK = null;
      if (Math.random() < 0.5) {
          afiliadoIdFK = faker.helpers.arrayElement(afiliadoIds);
      } else {
          integranteIdFK = faker.helpers.arrayElement(integranteIds);
      }

      turnosData.push({
        date: dateRecorded, 
        start: startTime,   
        duration: duration,
        notes: selectedNote,       
        descripción: selectedDescription, 
        prestadorId: medico.id, 
        afiliadoId: afiliadoIdFK,
        integranteId: integranteIdFK,
      });
    }

    await queryInterface.bulkInsert('Turnos', turnosData, {});
    console.log(`Datos de ${turnosData.length} turnos consistentes con especialidades cargados.`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Turnos', null, {});
  }
};
