'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es,en] });

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
    

    // Generamos situaciones para CADA especialidad para asegurar cobertura
    for (const especialidad of todasEspecialidades) {
        // Generamos un número fijo de situaciones por especialidad (ej. 15 por especialidad)
        for (let i = 0; i < 15; i++) { 

            const paciente = faker.helpers.arrayElement(todosLosPacientes);
            const medicoConEspecialidad = medicos.find(m => m.especialidades.includes(especialidad));

            const fechaInicio = faker.date.past({ years: 2 });
            const estaCerrada = Math.random() < 0.7; // 70% de situaciones cerradas

            let estado;
            let fechaFinal = null;
            let observacionesTexto;

            // 1. Siempre se genera la nota inicial al crear la situación
            observacionesTexto = `Motivo de ingreso: ${faker.lorem.words(4)}. Hallazgos iniciales: ${faker.lorem.sentences(1)}. Plan de tratamiento: ${faker.lorem.words(5)}.`;

            if (estaCerrada) {
                estado = 'baja';
                fechaFinal = faker.date.future({ months: 6, refDate: fechaInicio });
                
                // 2. Si se da de baja, se añaden observaciones adicionales al texto existente
                const notasCierre = `Evolución favorable: ${faker.lorem.sentences(1)}. Resultados satisfactorios. Se otorga el alta médica definitiva.`;
                observacionesTexto = `${observacionesTexto}\n\n[NOTA DE CIERRE]: ${notasCierre}`;

            } else {
                estado = 'en proceso';
                // Si está en proceso, solo queda la nota inicial
            }

            situacionesData.push({
                fecha_inicio: fechaInicio,
                especialidad: especialidad,
                observaciones: observacionesTexto, // Texto completo (inicio + cierre si aplica)
                estado: estado,
                fecha_final: fechaFinal, // NULL si está 'en proceso'
                afiliadoId: paciente.tipo === 'afiliado' ? paciente.id : null,
                integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
                prestadorId: medicoConEspecialidad ? medicoConEspecialidad.id : faker.helpers.arrayElement(medicos).id,
            });
        }
    }

    await queryInterface.bulkInsert('Situacions', situacionesData, {});
    console.log(`Datos de ${situacionesData.length} situaciones terapéuticas cargados con éxito.`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Situacions', null, {});
  }
};
