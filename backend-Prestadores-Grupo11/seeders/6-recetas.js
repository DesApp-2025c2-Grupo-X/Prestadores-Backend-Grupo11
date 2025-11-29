'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });
const db = require('../db/models/index');
const Receta = db.Receta;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Consultamos datos maestros
    const medicos = await Prestador.findAll({ 
        where: { role: 'medico' }, 
        attributes: ['id', 'especialidades', 'centroId', 'nombre'] 
    });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });
    const integrantes = await Integrante.findAll({ attributes: ['id', 'afiliadoId'] });
    
    const todosLosPacientes = [
      ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })),
      ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId }))
    ];

    if (medicos.length === 0 || afiliados.length === 0) return;

    const recetasDataInput = [];
    const RANGO_MESES_HISTORICO = 6; // Simulación de 6 meses de data
    
    // 2. Iteramos por médico y por día hábil en el rango histórico (Worklow-Driven)
    for (const medico of medicos) {
        for (let m = 0; m < RANGO_MESES_HISTORICO; m++) {
            const fechaIteracion = new Date();
            fechaIteracion.setMonth(fechaIteracion.getMonth() - m);
            
            // Iteramos por ~22 días hábiles en el mes
            for (let d = 1; d <= 22; d++) { 
                fechaIteracion.setDate(d);

                // Cuantas solicitudes procesa HOY este médico (Ratios 2-4 procesadas/día)
                const numProcesadas = faker.number.int({ min: 2, max: 4 });
                
                for (let s = 0; s < numProcesadas; s++) {
                    const paciente = faker.helpers.arrayElement(todosLosPacientes);
                    // Simulamos que el 60% de lo que procesa hoy se resuelve (aprobado/rechazado)
                    const estado = Math.random() < 0.6 ? faker.helpers.arrayElement(['aprobado', 'rechazado']) : faker.helpers.arrayElement(['en analisis', 'observado']);

                    recetasDataInput.push({
                        medicamento: faker.commerce.productName(),
                        cantidad: faker.number.int({ min: 1, max: 5 }),
                        presentacion: faker.helpers.arrayElement(['Caja x 20 comp', 'Gotas 15ml', 'Inyectable', 'Jarabe 100ml']),
                        observaciones: faker.lorem.sentences(1),
                        estado: estado, 
                        motivo: (estado === 'rechazado' || estado === 'observado') ? faker.lorem.sentences(1) : null, 
                        fecha_finalizacion: (estado === 'aprobado' || estado === 'rechazado') ? fechaIteracion : null, 
                        usuarioUltimoCambio: medico.id, // ID del médico que procesó/resolvió HOY
                        prestadorId: medico.id, // ID del médico que emitió la receta
                        afiliadoId: paciente.afiliadoIdFK,
                        integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
                        // Usamos la fecha de iteración como fecha de actualización (procesamiento)
                        createdAt: faker.date.recent({ days: 10, refDate: fechaIteracion }), 
                        updatedAt: fechaIteracion 
                    });
                }
            }
        }
    }

    await Receta.bulkCreate(recetasDataInput);
    console.log(`[V2 SEEDING - WORKFLOW] Cargadas ${recetasDataInput.length} recetas con ratios realistas por médico.`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recetas', null, {});
  }
};
