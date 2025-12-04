'use strict';
const { Faker, es_MX } = require('@faker-js/faker');
const faker = new Faker({ locale: [es_MX] });

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const afiliadosData = [];
    const integrantesData = [];
    let numeroAfiliadoBase = 100000;
    const NUM_AFILIADOS_TITULARES = 500; 
    const OBJETIVO_PACIENTES_TOTALES = 2850;
    // Objetivo de integrantes a generar = 2850 - 500 = 2350
    // Promedio de integrantes por titular necesario = 2350 / 500 = 4.7
    // Ajustaremos la lógica para asegurar que el promedio se mantenga cerca de 4.7

    // Generamos los 500 afiliados titulares
    for (let i = 0; i < NUM_AFILIADOS_TITULARES; i++) {
      const nombre = faker.person.firstName();
      const apellido = faker.person.lastName();
      const edad = faker.number.int({ min: 25, max: 60 });
      const dni = faker.number.int({ min: 10000000, max: 45000000 }).toString();
      const numero_afiliado = (numeroAfiliadoBase + i).toString();
      const telefono = faker.phone.number('11########');

      afiliadosData.push({
        id: i + 1, // IDs fijos para poder referenciarlos en Integrantes
        nombre, apellido, edad, dni, numero_afiliado, telefono,
      });
    }

    // Insertamos los titulares primero
    await queryInterface.bulkInsert('Afiliados', afiliadosData, {});

    // --- Generamos Integrantes con lógica ajustada para cumplir la cuota ---
    for (const afiliado of afiliadosData) {
      const afiliadoId = afiliado.id;
      // Forzamos un número de integrantes por titular (entre 3 y 6) para asegurar la cuota
      const numIntegrantes = faker.number.int({ min: 3, max: 6 }); // Promedio de 4.5
      
      let conyugueAgregado = false;

      for (let j = 0; j < numIntegrantes; j++) {
        let parentesco;
        if (!conyugueAgregado && Math.random() < 0.8) { // Alta prob de agregar conyugue primero
            parentesco = 'conyugue';
            conyugueAgregado = true;
        } else {
            parentesco = faker.helpers.arrayElement(['hijo', 'hijo', 'hijo', 'familiar_a_cargo']); // Más hijos que a cargo
        }

        integrantesData.push({
            nombre: faker.person.firstName(),
            apellido: parentesco === 'conyugue' ? faker.person.lastName() : afiliado.apellido,
            edad: parentesco === 'conyugue' ? afiliado.edad + faker.number.int({ min: -3, max: 3 }) : faker.number.int({ min: 0, max: 25 }),
            dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
            afiliadoId: afiliadoId,
            parentesco: parentesco
        });
      }
    }

    // Insertamos los integrantes
    await queryInterface.bulkInsert('Integrantes', integrantesData, {});
    console.log(`[V2 SEEDING] Cargados ${afiliadosData.length} titulares y ${integrantesData.length} integrantes. Total pacientes: ${afiliadosData.length + integrantesData.length}.`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Integrantes', null, {});
    await queryInterface.bulkDelete('Afiliados', null, {});
  }
};
