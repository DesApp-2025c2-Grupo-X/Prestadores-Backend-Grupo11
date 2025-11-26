'use strict';
const { faker } = require('@faker-js/faker/locale/es_AR');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const afiliadosData = [];
    const integrantesData = [];
    let numeroAfiliadoBase = 100000;

    // Generamos 100 afiliados titulares
    for (let i = 0; i < 100; i++) {
      const nombre = faker.person.firstName();
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
        telefono
      });
    }

    // Insertamos los titulares primero
    await queryInterface.bulkInsert('Afiliados', afiliadosData, {});

    // --- Generamos Integrantes con lógica de proporción familiar ---
    // Usaremos los IDs fijos de los titulares (1 a 100)
    for (const afiliado of afiliadosData) {
      const afiliadoId = afiliado.id;
      const esFamiliaTipo = Math.random() < 0.6; // 60% de familia tipo (conyugue + hijos)

      if (esFamiliaTipo) {
        // Añadir cónyuge (parentesco: 'conyugue')
        integrantesData.push({
          nombre: faker.person.firstName(),
          edad: afiliado.edad + faker.number.int({ min: -3, max: 3 }), // Edad similar
          dni: faker.number.int({ min: 10000000, max: 45000000 }).toString(),
          afiliadoId: afiliadoId,
          parentesco: 'conyugue' 
        });

        // Añadir 1 a 3 hijos (parentesco: 'hijo')
        const cantidadHijos = faker.number.int({ min: 1, max: 3 });
        for (let h = 0; h < cantidadHijos; h++) {
          integrantesData.push({
            nombre: faker.person.firstName(),
            edad: faker.number.int({ min: 0, max: 18 }), // Edad menor
            dni: faker.number.int({ min: 45000001, max: 60000000 }).toString(),
            afiliadoId: afiliadoId,
            parentesco: 'hijo'
          });
        }

      } else {
        // Otros casos: sin familia, solo 1 hijo, o un familiar a cargo
        if (Math.random() < 0.3) {
            // Caso sin integrantes (30% del 40% restante)
        } else {
            // Caso con 1 familiar a cargo (70% del 40% restante)
             integrantesData.push({
                nombre: faker.person.firstName(),
                edad: faker.number.int({ min: 0, max: 80 }), 
                dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
                afiliadoId: afiliadoId,
                parentesco: faker.helpers.arrayElement(['hijo', 'familiar_a_cargo'])
            });
        }
      }
    }

    // Insertamos los integrantes
    await queryInterface.bulkInsert('Integrantes', integrantesData, {});
    console.log(`Datos de ${afiliadosData.length} afiliados titulares y ${integrantesData.length} integrantes cargados con éxito.`);

  },

  down: async (queryInterface, Sequelize) => {
    // Borramos primero integrantes porque dependen de Afiliados (FK)
    await queryInterface.bulkDelete('Integrantes', null, {});
    await queryInterface.bulkDelete('Afiliados', null, {});
  }
};
