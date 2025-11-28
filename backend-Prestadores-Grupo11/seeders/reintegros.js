'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });
const db = require('../db/models/index');
const Reintegro = db.Reintegro;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const auditores = await Prestador.findAll({ attributes: ['id', 'role', 'nombre'] });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });

    if (auditores.length === 0 || afiliados.length === 0) return;

    // Solo usamos IDs de afiliados titulares, ya que integranteId no existe en este modelo
    const soloAfiliadosTitulares = afiliados.map(a => ({ afiliadoIdFK: a.id }));

    const reintegrosDataInput = [];
    const NUM_REINTEGROS = 150; 
    const estadosPosibles = ['aprobado', 'rechazado', 'observado', 'en analisis', 'recibido'];
    const formasPago = ['cheque', 'efectivo', 'transferencia'];

    for (let i = 0; i < NUM_REINTEGROS; i++) {
        const paciente = faker.helpers.arrayElement(soloAfiliadosTitulares);
        const estado = faker.helpers.arrayElement(estadosPosibles);
        let fechaFinalizacion = null; let motivoTexto = null; let usuarioAuditorId = null; 
        let nombreAuditorTexto = "Pendiente de Asignación";

        if (estado !== 'recibido') { const auditor = faker.helpers.arrayElement(auditores); usuarioAuditorId = auditor.id; nombreAuditorTexto = auditor.nombre; }
        if (estado === 'aprobado' || estado === 'rechazado') { fechaFinalizacion = new Date(); if (estado === 'rechazado') motivoTexto = faker.lorem.sentences(1); }
        const especialidadNombre = faker.helpers.arrayElement(['Cardiología', 'Farmacia', 'Kinesiología', 'Laboratorio']);
        const formaPago = faker.helpers.arrayElement(formasPago);
        const cbu = (formaPago === 'transferencia') ? faker.finance.iban() : null;

        reintegrosDataInput.push({
            fecha_prestacion: faker.date.past({ months: 3 }),
            // integranteId: null, // Campo eliminado del modelo
            afiliadoId: paciente.afiliadoIdFK, // ID del titular
            medico: nombreAuditorTexto, // Nombre del auditor (TEXT)
            especialidad: especialidadNombre, // (TEXT)
            factura_fecha: faker.date.past({ months: 2 }),
            factura_cuit: faker.finance.bic(), // (STRING)
            factura_valor: faker.number.float({ min: 1000, max: 50000, precision: 0.01 }),
            factura_persona: faker.person.fullName(), // (TEXT)
            forma_pago: formaPago, // (ENUM)
            cbu: cbu, // (STRING)
            observaciones: faker.lorem.sentences(2), // (TEXT)
            estado: estado, // (ENUM)
            motivo: motivoTexto, // (TEXT)
            fecha_finalizacion: fechaFinalizacion, // (DATE)
            usuarioUltimoCambio: usuarioAuditorId, // (INTEGER/FK)
            createdAt: faker.date.past({ months: 6 }), // Fechas manuales
            updatedAt: new Date()
        });
    }

    await Reintegro.bulkCreate(reintegrosDataInput);
    console.log(`Datos de ${reintegrosDataInput.length} reintegros cargados con éxito.`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reintegros', null, {});
  }
};
