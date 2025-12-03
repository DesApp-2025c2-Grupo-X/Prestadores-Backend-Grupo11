'use strict';
const { Faker, es_MX } = require('@faker-js/faker');
// Asegúrate de que las columnas de tu base de datos permitan 'masculino'/'femenino'
// o 'm'/'f' según tu definición de esquema.
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

    // Generamos los 500 afiliados titulares
    for (let i = 0; i < NUM_AFILIADOS_TITULARES; i++) {
      // Determinamos el sexo del titular primero
      const sexoTitular = faker.helpers.arrayElement(['masculino', 'femenino']);
      // Generamos el nombre y apellido asegurando que el nombre coincida con el sexo
      const nombre = faker.person.firstName(sexoTitular === 'masculino' ? 'male' : 'female');
      const apellido = faker.person.lastName();
      const edad = faker.number.int({ min: 25, max: 60 });
      const dni = faker.number.int({ min: 10000000, max: 45000000 }).toString();
      const numero_afiliado = (numeroAfiliadoBase + i).toString();
      const telefono = faker.phone.number('11########');

      afiliadosData.push({
        id: i + 1, // IDs fijos para poder referenciarlos en Integrantes
        nombre, 
        apellido, 
        edad, 
        dni, 
        numero_afiliado, 
        telefono,
        sexo: sexoTitular // <-- CAMPO AGREGADO A AFILIADOS
      });
    }

    // Insertamos los titulares primero
    await queryInterface.bulkInsert('Afiliados', afiliadosData, {});

    // --- Generamos Integrantes con lógica ajustada para cumplir la cuota ---
    for (const afiliado of afiliadosData) {
      const afiliadoId = afiliado.id;
      const sexoTitular = afiliado.sexo; // Obtenemos el sexo del titular
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

        // --- Lógica para determinar sexo y nombre del integrante ---
        let sexoIntegrante;
        let nombreIntegrante;

        if (parentesco === 'conyugue') {
            // El cónyuge tiene el sexo opuesto al titular
            sexoIntegrante = (sexoTitular === 'masculino') ? 'femenino' : 'masculino';
            nombreIntegrante = faker.person.firstName(sexoIntegrante === 'masculino' ? 'male' : 'female');
        } else {
            // Hijos/familiares a cargo tienen un sexo aleatorio
            sexoIntegrante = faker.helpers.arrayElement(['masculino', 'femenino']);
            nombreIntegrante = faker.person.firstName(sexoIntegrante === 'masculino' ? 'male' : 'female');
        }
        // -----------------------------------------------------------

        integrantesData.push({
            nombre: nombreIntegrante,
            apellido: parentesco === 'conyugue' ? faker.person.lastName() : afiliado.apellido,
            edad: parentesco === 'conyugue' ? afiliado.edad + faker.number.int({ min: -3, max: 3 }) : faker.number.int({ min: 0, max: 25 }),
            dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
            afiliadoId: afiliadoId,
            parentesco: parentesco,
            sexo: sexoIntegrante // <-- CAMPO AGREGADO A INTEGRANTES
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
