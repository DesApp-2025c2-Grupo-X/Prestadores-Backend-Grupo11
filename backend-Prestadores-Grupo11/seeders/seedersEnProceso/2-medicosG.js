'use strict';

const { Faker, es } = require('@faker-js/faker');
const faker = new Faker({ locale: [es] });

const db = require('../db/models/index');
const Prestador = db.Prestador;

let generatedMedicosListCache = [];

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // === 8 CENTROS DEFINITIVOS ===
    const centros = [
      // 3 PEQUEÑOS
      { id: 1, especialidades: ['Odontología'], tipo: 'pequeno' },
      { id: 2, especialidades: ['Kinesiología', 'Fisiatría'], tipo: 'pequeno' },
      { id: 3, especialidades: ['Oftalmología'], tipo: 'pequeno' },

      // 2 MEDIANOS
      { id: 4, especialidades: ['Medicina General', 'Guardia', 'Diagnóstico por Imágenes', 'Pediatría'], tipo: 'mediano' },
      { id: 5, especialidades: ['Pediatría', 'Maternidad', 'Neonatología', 'Ginecología', 'Cirugía Pediátrica'], tipo: 'mediano' },

      // 3 GRANDES
      { id: 6, especialidades: ['Cardiología', 'Clínica Médica', 'Cirugía General', 'Terapia Intensiva', 'Oncología', 'Neurología'], tipo: 'grande' },
      { id: 7, especialidades: ['Cardiología', 'Cirugía Cardiovascular', 'Clínica Médica', 'Nefrología', 'Diagnóstico por Imágenes', 'Oncología'], tipo: 'grande' },
      { id: 8, especialidades: ['Pediatría', 'Oncología Pediátrica', 'Cardiología Infantil', 'Neurología Infantil', 'Cirugía Pediátrica'], tipo: 'grande' },
    ];

    const medicosData = [];

    for (const centro of centros) {
      for (const especialidad of centro.especialidades) {

        let cantidad = 2;

        if (centro.tipo === 'pequeno') cantidad = faker.number.int({ min: 1, max: 2 });
        if (centro.tipo === 'mediano') cantidad = faker.number.int({ min: 2, max: 3 });
        if (centro.tipo === 'grande') cantidad = faker.number.int({ min: 3, max: 4 });

        for (let i = 0; i < cantidad; i++) {
          const nombre = faker.person.firstName();
          const apellido = faker.person.lastName();

          medicosData.push({
            username: `${apellido.toLowerCase()}.${nombre[0].toLowerCase()}.${centro.id}.${i}`,
            nombre: `${nombre} ${apellido}`,
            password: `Pass_${apellido}_${centro.id}_${i}_!`,
            especialidades: [especialidad],
            role: 'medico',
            centroId: centro.id
          });
        }
      }
    }

    const insertedMedicos = await Prestador.bulkCreate(medicosData, { returning: true });

    console.log(`✅ ${insertedMedicos.length} médicos creados con distribución realista.`);

    generatedMedicosListCache = insertedMedicos.map(m => ({
      id: m.id,
      especialidades: m.especialidades,
      centroId: m.centroId
    }));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prestadors', { role: 'medico' }, {});
    generatedMedicosListCache = [];
  },

  getGeneratedMedicosList: () => generatedMedicosListCache
};
