'use strict';
const { Faker, es } = require('@faker-js/faker');
const faker = new Faker({ locale: [es] });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const afiliadosData = [];
    const integrantesData = [];

    const NUM_AFILIADOS_TITULARES = 600; // ajustable
    let numeroAfiliadoBase = 100000;
    const HOY = new Date();

    // -------------------------------
    // UTILIDADES DE FECHAS
    // -------------------------------
    const restarAnios = (fecha, anios) => {
      const f = new Date(fecha);
      f.setFullYear(f.getFullYear() - anios);
      return f;
    };

    const fechaNacimientoDesdeEdad = (edad) => {
      return faker.date.between({
        from: restarAnios(HOY, edad + 1),
        to: restarAnios(HOY, edad),
      });
    };

    const fechaAltaAleatoria = () => {
      return faker.date.between({
        from: restarAnios(HOY, 5),
        to: HOY,
      });
    };

    // -------------------------------
    // TIPO DE FAMILIA
    // -------------------------------
    const elegirTipoFamilia = () => {
      const r = Math.random() * 100;
      if (r < 55) return 'tradicional';
      if (r < 75) return 'reconstituida';
      if (r < 85) return 'monoparental';
      if (r < 95) return 'conviviente_reciente';
      return 'pareja_joven_sin_hijos';
    };

    // -------------------------------
    // GENERADOR DE GRUPO FAMILIAR REAL
    // -------------------------------
    const generarGrupoFamiliar = () => {
      const tipoFamilia = elegirTipoFamilia();

      // Cantidad de hijos
      let cantHijos = faker.helpers.arrayElement([0, 1, 1, 2, 2, 3, 4]);
      if (tipoFamilia === 'pareja_joven_sin_hijos') cantHijos = 0;
      if (tipoFamilia === 'monoparental' && cantHijos === 0)
        cantHijos = faker.number.int({ min: 1, max: 3 });

      // Edades de hijos (de mayor a menor)
      let edadesHijos = [];
      if (cantHijos > 0) {
        let edadMayor = faker.number.int({ min: 1, max: 35 });
        edadesHijos.push(edadMayor);

        for (let i = 1; i < cantHijos; i++) {
          const anterior = edadesHijos[i - 1];
          const diferencia = faker.number.int({ min: 1, max: 12 });
          edadesHijos.push(Math.max(0, anterior - diferencia));
        }
      }

      // Edad del titular basada en el hijo mayor
      const edadProgenitor = edadesHijos.length
        ? edadesHijos[0] + faker.number.int({ min: 18, max: 40 })
        : faker.number.int({ min: 24, max: 65 });

      let edadTitular = edadProgenitor;
      let edadConyuge = null;
      let tieneConyuge = true;

      switch (tipoFamilia) {
        case 'tradicional':
          edadConyuge = edadTitular + faker.number.int({ min: -8, max: 8 });
          break;
        case 'reconstituida':
          edadConyuge = faker.number.int({
            min: 22,
            max: edadTitular - 2,
          });
          break;
        case 'conviviente_reciente':
          edadConyuge = edadTitular + faker.helpers.arrayElement([-12, -8, 5, 10]);
          break;
        case 'monoparental':
          tieneConyuge = false;
          break;
        case 'pareja_joven_sin_hijos':
          edadTitular = faker.number.int({ min: 22, max: 40 });
          edadConyuge = edadTitular + faker.number.int({ min: -5, max: 8 });
          break;
      }

      edadTitular = Math.max(20, Math.min(80, edadTitular));
      if (edadConyuge !== null)
        edadConyuge = Math.max(18, Math.min(80, edadConyuge));

      const fechaNacimientoTitular = fechaNacimientoDesdeEdad(edadTitular);
      const fechaAlta = fechaAltaAleatoria();

      const sexoTitular = faker.helpers.arrayElement(['masculino', 'femenino']);

      const titular = {
        nombre: faker.person.firstName(sexoTitular === 'masculino' ? 'male' : 'female'),
        apellido: faker.person.lastName(),
        sexo: sexoTitular,
        dni: faker.number.int({ min: 10000000, max: 45000000 }).toString(),
        telefono: '11' + faker.string.numeric(8),
        fecha_nacimiento: fechaNacimientoTitular,
        fecha_alta: fechaAlta,
        numero_afiliado: null,
      };

      const integrantes = [];

      // Cónyuge
      if (tieneConyuge && edadConyuge !== null) {
        const sexoConyuge = sexoTitular === 'masculino' ? 'femenino' : 'masculino';
        integrantes.push({
          nombre: faker.person.firstName(sexoConyuge === 'masculino' ? 'male' : 'female'),
          apellido: faker.person.lastName(),
          sexo: sexoConyuge,
          dni: faker.number.int({ min: 10000000, max: 60000000 }).toString(),
          parentesco: 'conyugue',
          fecha_nacimiento: fechaNacimientoDesdeEdad(edadConyuge),
        });
      }

      // Hijos
      for (let i = 0; i < edadesHijos.length; i++) {
        const edadHijo = edadesHijos[i];
        const sexoHijo = faker.helpers.arrayElement(['masculino', 'femenino']);

        integrantes.push({
          nombre: faker.person.firstName(sexoHijo === 'masculino' ? 'male' : 'female'),
          apellido: titular.apellido,
          sexo: sexoHijo,
          dni: faker.number.int({ min: 30000000, max: 90000000 }).toString(),
          parentesco: 'hijo',
          fecha_nacimiento: fechaNacimientoDesdeEdad(edadHijo),
        });
      }

      return { titular, integrantes };
    };

    // -------------------------------
    // GENERACIÓN DE LOS AFILIADOS
    // -------------------------------
    for (let i = 0; i < NUM_AFILIADOS_TITULARES; i++) {
      const { titular, integrantes } = generarGrupoFamiliar();

      titular.id = i + 1;
      titular.numero_afiliado = (numeroAfiliadoBase + i).toString();
      afiliadosData.push(titular);

      integrantes.forEach((int) => {
        int.afiliadoId = titular.id;
        integrantesData.push(int);
      });

      if ((i + 1) % 100 === 0) {
        console.log(`Generados ${i + 1} grupos familiares reales...`);
      }
    }

    await queryInterface.bulkInsert('Afiliados', afiliadosData, {});
    await queryInterface.bulkInsert('Integrantes', integrantesData, {});

    console.log(`\n✅ Afiliados cargados: ${afiliadosData.length}`);
    console.log(`✅ Integrantes cargados: ${integrantesData.length}`);
    console.log(`✅ Total personas: ${afiliadosData.length + integrantesData.length}`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Integrantes', null, {});
    await queryInterface.bulkDelete('Afiliados', null, {});
  },
};
