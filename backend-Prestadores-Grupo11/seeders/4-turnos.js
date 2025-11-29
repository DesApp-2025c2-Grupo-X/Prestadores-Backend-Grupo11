'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es,en] });

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

    const dataEspecialidades = { /* ... (tu diccionario completo de especialidades) ... */ };

    const NUM_TURNOS_V2 = 9500; 

    for (let i = 0; i < NUM_TURNOS_V2; i++) {
      const isPast = Math.random() < 0.8; 
      const duration = faker.helpers.arrayElement(duraciones);

      const medico = faker.helpers.arrayElement(medicos);
      const paciente = faker.helpers.arrayElement(todosLosPacientes);
      const especialidad = faker.helpers.arrayElement(medico.especialidades);
      const dataEsp = dataEspecialidades[especialidad];
      
      // --- Flujo de Fechas Ajustado ---
      const dateSolicitud = faker.date.past({ years: 2 }); // Fecha de solicitud ('date')
      
      const dateInicio = isPast // Fecha agendada y de inicio ('start')
        ? faker.date.past({ refDate: new Date(), days: 30 })
        : faker.date.future({ days: 60 });
        
      let archiveDate = null; // Momento del registro clínico ('archivedAt')
      let modifiedDate = null; // Momento de la enmienda ('modifiedAt')

      let selectedNote = null;
      let selectedDescription = `Turno agendado`;

      if (isPast) {
        // archivedAt: Posterior a start + duration (simulamos 5-10 minutos después de finalizar)
        archiveDate = new Date(dateInicio.getTime() + duration * 60000 + faker.number.int({ min: 300000, max: 600000 }));

        // modifiedAt: 1% de probabilidad de enmienda posterior a archivedAt
        if (Math.random() < 0.01) { 
            modifiedDate = faker.date.recent({ refDate: archiveDate, days: 7 }); // Días después de archivado
        }

        if (dataEsp) {
          const motivo = faker.helpers.arrayElement(dataEsp.motivos);
          const hallazgo = faker.helpers.arrayElement(dataEsp.hallazgos);
          const prescripcion = dataEsp.prescripciones.length > 0 ? faker.helpers.arrayElement(dataEsp.prescripciones) : faker.lorem.sentence();
          selectedDescription = motivo;
          selectedNote = `Motivo de consulta: ${motivo}. Hallazgos: ${hallazgo} Evolución: Paciente estable. Prescripción: ${prescripcion}`;
        } else {
          selectedNote = `Nota clínica para especialidad ${especialidad}. ${faker.lorem.sentence()}.`;
        }
      }

      turnosData.push({
        date: dateSolicitud,
        start: dateInicio,
        duration: duration,
        archivedAt: archiveDate,
        modifiedAt: modifiedDate,
        notes: selectedNote,
        descripcion: selectedDescription,
        afiliadoId: paciente.afiliadoIdFK,
        prestadorId: medico.id,
        integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
      });
    }

    await queryInterface.bulkInsert('Turnos', turnosData, {});
    console.log(`[V2 SEEDING] Cargados ${turnosData.length} turnos, cumpliendo flujo de fechas exacto y 1% de modificaciones.`);

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Turnos', null, {});
  }
};

