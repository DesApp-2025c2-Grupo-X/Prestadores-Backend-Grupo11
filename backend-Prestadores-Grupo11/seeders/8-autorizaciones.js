'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });
const db = require('../db/models/index');
const Autorizacion = db.Autorizacion;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const medicos = await Prestador.findAll({ where: { role: 'medico' }, attributes: ['id', 'centroId', 'nombre'] });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });
    const integrantes = await Integrante.findAll({ attributes: ['id', 'afiliadoId'] });
    const todosLosPacientes = [
      ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })),
      ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId }))
    ];

    if (medicos.length === 0 || afiliados.length === 0) return;

    const autorizacionesDataInput = [];
    const RANGO_MESES_HISTORICO = 6;
    const CANTIDAD_SOLICITUDES_X_DIA = { min: 0, max: 1 }; 

    for (const medico of medicos) {
      for (let m = 0; m < RANGO_MESES_HISTORICO; m++) {
        const fechaIteracion = new Date();
        fechaIteracion.setMonth(fechaIteracion.getMonth() - m);

        for (let d = 1; d <= 22; d++) { 
          fechaIteracion.setDate(d);
          const numProcesadas = faker.number.int(CANTIDAD_SOLICITUDES_X_DIA);

          for (let s = 0; s < numProcesadas; s++) {
            const paciente = faker.helpers.arrayElement(todosLosPacientes);
            const estado = Math.random() < 0.5 ? faker.helpers.arrayElement(['aprobado', 'rechazado']) : faker.helpers.arrayElement(['en analisis', 'observado']);
            
            autorizacionesDataInput.push({
                fecha_prevista: faker.date.future({ months: 3, refDate: fechaIteracion }), 
                integranteId: paciente.tipo === 'integrante' ? paciente.id : null, 
                afiliadoId: paciente.afiliadoIdFK, 
                medico: faker.person.fullName(), 
                especialidad: faker.helpers.arrayElement(['Cirugía General', 'Traumatología', 'Oncología', 'Cardiología', 'Nefrología']), 
                dias_internacion: faker.number.int({ min: 1, max: 10 }),
                observaciones: faker.lorem.sentences(2), // CORREGIDO: respeta locale 'es'
                estado: estado, 
                motivo: (estado === 'rechazado' || estado === 'observado') ? faker.lorem.sentences(1) : null, // CORREGIDO: respeta locale 'es'
                fecha_finalizacion: (estado === 'aprobado' || estado === 'rechazado') ? fechaIteracion : null, 
                usuarioUltimoCambio: medico.id, 
                createdAt: faker.date.recent({ days: 10, refDate: fechaIteracion }),
                updatedAt: fechaIteracion
            });
          }
        }
      }
    }

    await Autorizacion.bulkCreate(autorizacionesDataInput);
    console.log(`[V2 SEEDING - WORKFLOW] Cargadas ${autorizacionesDataInput.length} autorizaciones con ratios realistas.`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Autorizacions', null, {});
  }
};
