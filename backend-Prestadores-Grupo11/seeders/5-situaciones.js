'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });

const db = require('../db/models/index');
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
      console.error("Error: No se encontraron médicos o pacientes. Ejecuta seeders anteriores.");
      return;
    }

    const todosLosPacientes = [
        ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })),
        ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId }))
    ];

    const situacionesData = [];
    const todasEspecialidades = [...new Set(medicos.flatMap(m => m.especialidades))];
    const SITUACIONES_POR_ESPECIALIDAD = 45; // Aprox. 1420 situaciones totales

    for (const especialidad of todasEspecialidades) {
        for (let i = 0; i < SITUACIONES_POR_ESPECIALIDAD; i++) { 

            const paciente = faker.helpers.arrayElement(todosLosPacientes);
            const medicoConEspecialidad = medicos.find(m => m.especialidades.includes(especialidad));

            const fechaInicio = faker.date.past({ years: 2 });
            const estaCerrada = Math.random() < 0.7; // 70% de situaciones cerradas

            let estado;
            let fechaFinal = null;
            let observacionesTexto = ""; // Usaremos esto para acumular notas

            // 1. Nota de Alta (todas las situaciones tienen una)
            observacionesTexto += `[ALTA]: ${faker.lorem.sentences({ min: 1, max: 2 })}.`;

            if (estaCerrada) {
                estado = 'baja';
                // La fecha final ocurre después de la fecha de inicio
                fechaFinal = faker.date.future({ months: 6, refDate: fechaInicio });
                
                // 2. Acumulamos un cúmulo importante de notas para enriquecer la historia clínica
                const cantidadNotasIntermedias = faker.number.int({ min: 3, max: 8 });
                for (let n = 0; n < cantidadNotasIntermedias; n++) {
                    observacionesTexto += `\n\n[EVOLUCION ${n + 1}]: ${faker.lorem.sentences({ min: 1, max: 3 })}.`;
                }

                // 3. Nota de Cierre/Baja
                observacionesTexto += `\n\n[BAJA]: ${faker.lorem.sentences({ min: 1, max: 2 })}. Evolución favorable, se otorga el alta definitiva.`;

            } else {
                estado = 'en proceso';
                // Las situaciones en proceso solo tienen la nota de alta y quizás 1 o 2 de evolución
                if (Math.random() < 0.5) {
                    observacionesTexto += `\n\n[EVOLUCION 1]: ${faker.lorem.sentences({ min: 1, max: 2 })}.`;
                }
            }

            situacionesData.push({
                fecha_inicio: fechaInicio,
                especialidad: especialidad,
                observaciones: observacionesTexto, // Texto completo acumulado
                estado: estado,
                fecha_final: fechaFinal, // NULL si está 'en proceso'
                afiliadoId: paciente.tipo === 'afiliado' ? paciente.id : null,
                integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
                prestadorId: medicoConEspecialidad ? medicoConEspecialidad.id : faker.helpers.arrayElement(medicos).id,
            });
        }
    }

    await queryInterface.bulkInsert('Situacions', situacionesData, {});
    console.log(`[V2 SEEDING] Cargados ${situacionesData.length} situaciones terapéuticas totales.`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Situacions', null, {});
  }
};
