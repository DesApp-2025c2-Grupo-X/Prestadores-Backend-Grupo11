'use strict';
const { Faker, es, es_MX } = require('@faker-js/faker');
const faker = new Faker({ locale: [es_MX, es] });
const db = require('../db/models/index');
const Reintegro = db.Reintegro;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante; 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const medicos = await Prestador.findAll({ where: { role: 'medico' }, attributes: ['id', 'centroId', 'nombre'] });
    
    // 1. Consultar Afiliados TITULARES
    const afiliadosTitulares = await Afiliado.findAll({ attributes: ['id'] });
    // Mapeamos para tener una estructura consistente { afiliadoId?, integranteId? }
    const listaAfiliados = afiliadosTitulares.map(a => ({ afiliadoId: a.id, integranteId: null }));

    // 2. Consultar Integrantes (grupo familiar)
    const integrantes = await Integrante.findAll({ attributes: ['id'] });
    // Mapeamos a la misma estructura consistente
    const listaIntegrantes = integrantes.map(i => ({ afiliadoId: null, integranteId: i.id }));

    if (medicos.length === 0 || afiliadosTitulares.length === 0) return;

    // 3. Unificar ambas listas en una sola para seleccionar aleatoriamente
    const todosLosBeneficiarios = [...listaAfiliados, ...listaIntegrantes];

    const reintegrosDataInput = [];
    const formasPago = ['cheque', 'efectivo', 'transferencia'];
    const RANGO_MESES_HISTORICO = 6;
    const CANTIDAD_SOLICITUDES_X_DIA = { min: 1, max: 2 }; 

    for (const medico of medicos) {
      for (let m = 0; m < RANGO_MESES_HISTORICO; m++) {
        const fechaIteracion = new Date();
        fechaIteracion.setMonth(fechaIteracion.getMonth() - m);
        for (let d = 1; d <= 22; d++) { 
          fechaIteracion.setDate(d);
          const numProcesadas = faker.number.int(CANTIDAD_SOLICITUDES_X_DIA);

          for (let s = 0; s < numProcesadas; s++) {
            // Seleccionamos un beneficiario aleatorio de la lista combinada
            const beneficiario = faker.helpers.arrayElement(todosLosBeneficiarios);

            const estado = Math.random() < 0.7 ? faker.helpers.arrayElement(['aprobado', 'rechazado']) : faker.helpers.arrayElement(['en analisis', 'observado']);
            
            reintegrosDataInput.push({
              fecha_prestacion: faker.date.past({ months: 3, refDate: fechaIteracion }),
              // Asignamos el ID correcto: uno será null y el otro tendrá valor
              afiliadoId: beneficiario.afiliadoId, 
              integranteId: beneficiario.integranteId, 

              medico: faker.person.fullName(), 
              especialidad: faker.helpers.arrayElement(['Kinesiología', 'Laboratorio', 'Farmacia', 'Oftalmología']), 
              factura_fecha: faker.date.past({ months: 2, refDate: fechaIteracion }),
              factura_cuit: faker.finance.bic(),
              factura_valor: faker.number.float({ min: 1000, max: 50000, precision: 0.01 }),
              factura_persona: faker.person.fullName(),
              forma_pago: faker.helpers.arrayElement(formasPago),
              cbu: (faker.helpers.arrayElement(formasPago) === 'transferencia') ? faker.finance.iban() : null,
              observaciones: faker.lorem.sentences(2),
              estado: estado,
              motivo: (estado === 'rechazado' || estado === 'observado') ? faker.lorem.sentences(1) : null,
              fecha_finalizacion: (estado === 'aprobado' || estado === 'rechazado') ? fechaIteracion : null,
              usuarioUltimoCambio: medico.id, 
              createdAt: faker.date.recent({ days: 10, refDate: fechaIteracion }),
              updatedAt: fechaIteracion
            });
          }
        }
      }
    }

    await Reintegro.bulkCreate(reintegrosDataInput);
    console.log(`[V2 SEEDING - WORKFLOW] Cargados ${reintegrosDataInput.length} reintegros (incluyendo titulares e integrantes) con ratios realistas.`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reintegros', null, {});
  }
};
