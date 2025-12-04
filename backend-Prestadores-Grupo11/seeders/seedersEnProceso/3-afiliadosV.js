'use strict';
const { Faker, es_MX } = require('@faker-js/faker');
const faker = new Faker({ locale: [es_MX] });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const afiliadosData = [];
    const integrantesData = [];
    let numeroAfiliadoBase = 100000;
    const NUM_AFILIADOS_TITULARES = 34000; // Ajusta según necesidad para alcanzar 75k
    const OBJETIVO_PACIENTES_TOTALES = 75000;
    const OBJETIVO_INTEGRANTES = OBJETIVO_PACIENTES_TOTALES - NUM_AFILIADOS_TITULARES;

    // Generamos los afiliados titulares
    for (let i = 0; i < NUM_AFILIADOS_TITULARES; i++) {
      const nombre = faker.person.firstName();
      const apellido = faker.person.lastName();
      const edad = faker.number.int({ min: 18, max: 65 });
      const dni = faker.number.int({ min: 10000000, max: 45000000 }).toString();
      const numero_afiliado = (numeroAfiliadoBase + i).toString();
      const telefono = faker.phone.number('11########');

      afiliadosData.push({
        id: i + 1,
        nombre,
        apellido,
        edad,
        dni,
        numero_afiliado,
        telefono,
      });
    }

    await queryInterface.bulkInsert('Afiliados', afiliadosData, {});

    // Distribución de tipos de hogar (porcentajes reales)
    const distribucion = {
      unipersonal: 0.25,
      conConyugueSinHijos: 0.15,
      conHijosSinConyugue: 0.20,
      conHijosYConyugue: 0.30,
      otros: 0.10,
    };

    let integrantesGenerados = 0;

    for (const afiliado of afiliadosData) {
      const afiliadoId = afiliado.id;
      let tipoHogar = '';
      const rand = Math.random();

      if (rand < distribucion.unipersonal) {
        tipoHogar = 'unipersonal';
      } else if (rand < distribucion.unipersonal + distribucion.conConyugueSinHijos) {
        tipoHogar = 'conConyugueSinHijos';
      } else if (rand < distribucion.unipersonal + distribucion.conConyugueSinHijos + distribucion.conHijosSinConyugue) {
        tipoHogar = 'conHijosSinConyugue';
      } else if (rand < distribucion.unipersonal + distribucion.conConyugueSinHijos + distribucion.conHijosSinConyugue + distribucion.conHijosYConyugue) {
        tipoHogar = 'conHijosYConyugue';
      } else {
        tipoHogar = 'otros';
      }

      let conyugueAgregado = false;
      let numHijos = 0;

      // Generamos integrantes según tipo de hogar
      if (tipoHogar === 'unipersonal') {
        // No agregamos integrantes
      } else if (tipoHogar === 'conConyugueSinHijos') {
        const edadConyugue = Math.max(18, afiliado.edad + faker.number.int({ min: -3, max: 3 }));
        integrantesData.push({
          nombre: faker.person.firstName(),
          apellido: faker.person.lastName(),
          edad: edadConyugue,
          dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
          afiliadoId: afiliadoId,
          parentesco: 'conyugue',
        });
        conyugueAgregado = true;
      } else if (tipoHogar === 'conHijosSinConyugue') {
        numHijos = faker.number.int({ min: 1, max: 3 });
        for (let j = 0; j < numHijos; j++) {
          const edadHijo = faker.number.int({ min: 0, max: Math.min(25, afiliado.edad - 18) });
          integrantesData.push({
            nombre: faker.person.firstName(),
            apellido: afiliado.apellido,
            edad: edadHijo,
            dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
            afiliadoId: afiliadoId,
            parentesco: 'hijo',
          });
        }
      } else if (tipoHogar === 'conHijosYConyugue') {
        // Agregamos conyugue
        const edadConyugue = Math.max(18, afiliado.edad + faker.number.int({ min: -3, max: 3 }));
        integrantesData.push({
          nombre: faker.person.firstName(),
          apellido: faker.person.lastName(),
          edad: edadConyugue,
          dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
          afiliadoId: afiliadoId,
          parentesco: 'conyugue',
        });
        conyugueAgregado = true;

        // Hijos (pueden ser del afiliado o de ambos, o solo de uno)
        numHijos = faker.number.int({ min: 1, max: 3 });
        for (let j = 0; j < numHijos; j++) {
          // 70% hijos compartidos, 30% solo del afiliado
          const edadHijo = faker.number.int({ min: 0, max: Math.min(25, Math.min(afiliado.edad, edadConyugue) - 18) });
          const parentesco = Math.random() < 0.7 ? 'hijo' : 'hijo';
          integrantesData.push({
            nombre: faker.person.firstName(),
            apellido: parentesco === 'hijo' ? afiliado.apellido : faker.person.lastName(),
            edad: edadHijo,
            dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
            afiliadoId: afiliadoId,
            parentesco: parentesco,
          });
        }
      } else {
        // Otros (familiar a cargo, etc.)
        const parentesco = faker.helpers.arrayElement(['familiar_a_cargo']);
        integrantesData.push({
          nombre: faker.person.firstName(),
          apellido: afiliado.apellido,
          edad: faker.number.int({ min: 0, max: 65 }),
          dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
          afiliadoId: afiliadoId,
          parentesco: parentesco,
        });
      }

      integrantesGenerados += integrantesData.length - integrantesData.length;
    }

    await queryInterface.bulkInsert('Integrantes', integrantesData, {});
    console.log(`[V3 SEEDING] Cargados ${afiliadosData.length} titulares y ${integrantesData.length} integrantes. Total pacientes: ${afiliadosData.length + integrantesData.length}.`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Integrantes', null, {});
    await queryInterface.bulkDelete('Afiliados', null, {});
  },
};
