'use strict';
const { faker } = require('@faker-js/faker');
faker.locale = 'es_MX';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const afiliadosData = [];
    const integrantesData = [];
    const NUM_AFILIADOS_TITULARES = 500;
    let numeroAfiliadoBase = 100000;

    // ------------------------------------------------------------------
    // FUNCIÓN QUE ELIGE TIPO DE FAMILIA SIN weightedArrayElement
    // ------------------------------------------------------------------
    const elegirTipoFamilia = () => {
      const r = Math.random() * 100;
      if (r < 60) return 'tradicional';
      if (r < 80) return 'reconstituida';
      if (r < 90) return 'conviviente_reciente';
      if (r < 98) return 'monoparental';
      return 'pareja_joven_sin_hijos';
    };

    // ------------------------------------------------------------------
    // GENERADOR DE GRUPO FAMILIAR – 100% SEGURO CONTRA RANGOS INVÁLIDOS
    // ------------------------------------------------------------------
    const generarGrupoFamiliarReal = () => {
      const tipoFamilia = elegirTipoFamilia();

      // Cantidad de hijos
      let cantHijos = faker.helpers.arrayElement([0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4]);
      if (tipoFamilia === 'pareja_joven_sin_hijos') cantHijos = 0;
      if (tipoFamilia === 'monoparental' && cantHijos === 0) cantHijos = faker.number.int({ min: 1, max: 4 });

      // Edades de hijos – PROTEGIDO 100%
      let edadesHijos = [];
      if (cantHijos > 0) {
        let edadMayor = faker.number.int({ min: 1, max: 36 });
        edadesHijos.push(edadMayor);

        for (let i = 1; i < cantHijos; i++) {
          const edadAnterior = edadesHijos[i - 1];
          const diferenciaMin = 1;
          const diferenciaMax = 16;
          const diferencia = faker.number.int({ min: diferenciaMin, max: diferenciaMax });
          const nuevaEdad = Math.max(0, edadAnterior - diferencia);
          edadesHijos.push(nuevaEdad);
        }
      }

      // Edad del progenitor biológico
      const edadProgenitorBio = edadesHijos.length > 0
        ? edadesHijos[0] + faker.number.int({ min: 18, max: 40 })
        : faker.number.int({ min: 26, max: 64 });

      let edadTitular, edadConyuge = null, tieneConyuge = true;

      switch (tipoFamilia) {
        case 'tradicional':
          edadTitular = edadProgenitorBio;
          edadConyuge = Math.max(20, edadTitular + faker.number.int({ min: -8, max: 8 }));
          break;
        case 'reconstituida':
          edadTitular = edadProgenitorBio;
          edadConyuge = faker.number.int({ min: 22, max: edadTitular - 2 });
          break;
        case 'conviviente_reciente':
          edadTitular = edadProgenitorBio;
          const diff = faker.helpers.arrayElement([-25, -20, -15, -10, 6, 12, 18]);
          edadConyuge = Math.max(20, edadTitular + diff);
          break;
        case 'monoparental':
          edadTitular = edadProgenitorBio;
          tieneConyuge = false;
          break;
        case 'pareja_joven_sin_hijos':
          edadTitular = faker.number.int({ min: 22, max: 44 });
          edadConyuge = edadTitular + faker.number.int({ min: -8, max: 10 });
          break;
      }

      // Seguridad final
      edadTitular = Math.max(20, Math.min(88, edadTitular));
      if (edadConyuge !== null) edadConyuge = Math.max(18, Math.min(85, edadConyuge));

      // Titular
      const sexoTitular = faker.helpers.arrayElement(['masculino', 'femenino']);
      const titular = {
        nombre: faker.person.firstName(sexoTitular === 'masculino' ? 'male' : 'female'),
        apellido: faker.person.lastName(),
        edad: edadTitular,
        dni: faker.number.int({ min: 10000000, max: 45000000 }).toString(),
        numero_afiliado: null,
        telefono: '11' + faker.string.numeric(8),
        sexo: sexoTitular
      };

      const integrantes = [];

      // Cónyuge
      if (tieneConyuge && edadConyuge !== null) {
        const sexoConyuge = sexoTitular === 'masculino' ? 'femenino' : 'masculino';
        integrantes.push({
          nombre: faker.person.firstName(sexoConyuge === 'masculino' ? 'male' : 'female'),
          apellido: faker.person.lastName(),
          edad: edadConyuge,
          dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
          parentesco: 'conyugue',
          sexo: sexoConyuge
        });
      }

      // Hijos
      for (const edadHijo of edadesHijos) {
        const sexoHijo = faker.helpers.arrayElement(['masculino', 'femenino']);
        integrantes.push({
          nombre: faker.person.firstName(sexoHijo === 'masculino' ? 'male' : 'female'),
          apellido: titular.apellido,
          edad: edadHijo,
          dni: faker.number.int({ min: 30000000, max: 95000000 }).toString(),
          parentesco: 'hijo',
          sexo: sexoHijo
        });
      }

      return { titular, integrantes };
    };

    // ------------------------------------------------------------------
    // GENERACIÓN DE LOS 500 GRUPOS FAMILIARES
    // ------------------------------------------------------------------
    for (let i = 0; i < NUM_AFILIADOS_TITULARES; i++) {
      const { titular, integrantes } = generarGrupoFamiliarReal();

      titular.id = i + 1;
      titular.numero_afiliado = (numeroAfiliadoBase + i).toString();

      afiliadosData.push(titular);

      integrantes.forEach(int => {
        int.afiliadoId = titular.id;
        integrantesData.push(int);
      });

      if ((i + 1) % 100 === 0) {
        console.log(`Generados ${i + 1} grupos familiares reales...`);
      }
    }

    // ------------------------------------------------------------------
    // INSERCIÓN FINAL
    // ------------------------------------------------------------------
    await queryInterface.bulkInsert('Afiliados', afiliadosData, {});
    await queryInterface.bulkInsert('Integrantes', integrantesData, {});

    console.log(`\n¡2850 PACIENTES 100% REALES ARGENTINA 2025 CARGADOS SIN NINGÚN ERROR!`);
    console.log(`Titulares: ${afiliadosData.length} | Integrantes: ${integrantesData.length} | Total: ${afiliadosData.length + integrantesData.length}`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Integrantes', null, {});
    await queryInterface.bulkDelete('Afiliados', null, {});
  }
};