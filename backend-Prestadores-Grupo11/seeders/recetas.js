'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });
const db = require('../db/models/index');
const Receta = db.Receta;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;
// Ya no necesitamos exportar la caché local

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ... (El código de generación de datos es el mismo que antes, usa el que ya tienes) ...
    const medicos = await Prestador.findAll({ where: { role: 'medico' }, attributes: ['id', 'especialidades', 'nombre'] });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });
    const integrantes = await Integrante.findAll({ attributes: ['id', 'afiliadoId'] });
    if (medicos.length === 0 || afiliados.length === 0) return;
    const todosLosPacientes = [ ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })), ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId })) ];

    const recetasDataInput = [];
    const NUM_RECETAS = 500; 
    const estadosPosibles = ['aprobado', 'rechazado', 'observado', 'en analisis', 'recibido'];

    for (let i = 0; i < NUM_RECETAS; i++) {
        const paciente = faker.helpers.arrayElement(todosLosPacientes);
        const estado = faker.helpers.arrayElement(estadosPosibles);
        let fechaFinalizacion = null;
        let motivoTexto = null;
        let usuarioAuditorId = null; 

        if (estado !== 'recibido') { const auditor = faker.helpers.arrayElement(medicos); usuarioAuditorId = auditor.id; }
        if (estado === 'aprobado' || estado === 'rechazado') { fechaFinalizacion = new Date(); if (estado === 'rechazado') motivoTexto = faker.lorem.sentences(1); }

        const medicoEmisor = faker.helpers.arrayElement(medicos);

        recetasDataInput.push({
            medicamento: faker.lorem.word(), cantidad: faker.number.int({ min: 1, max: 5 }), presentacion: faker.lorem.word(), observaciones: faker.lorem.sentences(1),
            estado: estado, motivo: motivoTexto, fecha_finalizacion: fechaFinalizacion, usuarioUltimoCambio: usuarioAuditorId,
            prestadorId: medicoEmisor.id, // FK del emisor real
            afiliadoId: paciente.afiliadoIdFK,
            integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
            createdAt: faker.date.past({ months: 6 }), updatedAt: new Date()
        });
    }

    await Receta.bulkCreate(recetasDataInput);
    console.log(`Datos de ${recetasDataInput.length} recetas cargados con éxito.`);
    // Ya no almacenamos en caché
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recetas', null, {});
  }
};
