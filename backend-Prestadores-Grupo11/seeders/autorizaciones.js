'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });
const db = require('../db/models/index');
const Autorizacion = db.Autorizacion;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;
// Ya no necesitamos exportar la caché local

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ... (El código de generación de datos es el mismo que antes, usa el que ya tienes) ...
    const auditores = await Prestador.findAll({ attributes: ['id', 'role', 'nombre'] });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });
    const integrantes = await Integrante.findAll({ attributes: ['id', 'afiliadoId'] });
    if (auditores.length === 0 || afiliados.length === 0) return;
    const todosLosPacientes = [ ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })), ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId })) ];

    const autorizacionesDataInput = [];
    const NUM_AUTORIZACIONES = 200; 
    const estadosPosibles = ['aprobado', 'rechazado', 'observado', 'en analisis', 'recibido'];

    for (let i = 0; i < NUM_AUTORIZACIONES; i++) {
        const paciente = faker.helpers.arrayElement(todosLosPacientes);
        const estado = faker.helpers.arrayElement(estadosPosibles);
        let fechaFinalizacion = null; let motivoTexto = null; let usuarioAuditorId = null; 
        let nombreAuditorTexto = "Pendiente de Asignación";

        if (estado !== 'recibido') { const auditorAsignado = faker.helpers.arrayElement(auditores); usuarioAuditorId = auditorAsignado.id; nombreAuditorTexto = auditorAsignado.nombre; }
        if (estado === 'aprobado' || estado === 'rechazado') { fechaFinalizacion = new Date(); if (estado === 'rechazado') motivoTexto = faker.lorem.sentences(1); }
        const especialidadNombre = faker.helpers.arrayElement(['Cardiología', 'Cirugía General', 'Traumatología', 'Neurología']);

        autorizacionesDataInput.push({
            fecha_prevista: faker.date.future({ months: 3 }), integranteId: paciente.tipo === 'integrante' ? paciente.id : null, afiliadoId: paciente.afiliadoIdFK, medico: nombreAuditorTexto, especialidad: especialidadNombre, dias_internacion: faker.number.int({ min: 1, max: 10 }),
            observaciones: faker.lorem.sentences(2), estado: estado, motivo: motivoTexto, fecha_finalizacion: fechaFinalizacion, usuarioUltimoCambio: usuarioAuditorId,
            createdAt: faker.date.past({ months: 6 }), updatedAt: new Date()
        });
    }

    await Autorizacion.bulkCreate(autorizacionesDataInput);
    console.log(`Datos de ${autorizacionesDataInput.length} autorizaciones cargados con éxito.`);
    // Ya no almacenamos en caché
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Autorizacions', null, {});
  }
};
