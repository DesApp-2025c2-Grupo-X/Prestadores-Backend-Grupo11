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
            if (r < 45) return 'tradicional';
            if (r < 65) return 'reconstituida';
            if (r < 75) return 'monoparental';
            if (r < 90) return 'soltero';
            if (r < 95) return 'conviviente_reciente';
            return 'pareja_joven_sin_hijos';
        };

        // -------------------------------
        // GENERADOR DE GRUPO FAMILIAR
        // -------------------------------
        const generarGrupoFamiliar = () => {
            const tipoFamilia = elegirTipoFamilia();

            // Cantidad de hijos
            let cantHijos = faker.helpers.arrayElement([0, 1, 1, 2, 2, 3, 4]);
            if (tipoFamilia === 'pareja_joven_sin_hijos') cantHijos = 0;
            if (tipoFamilia === 'monoparental' && cantHijos === 0)
                cantHijos = faker.number.int({ min: 1, max: 3 });

            // Hijos orden descendente por edad
            let edadesHijos = [];
            if (cantHijos > 0) {
                const edadMayor = faker.number.int({ min: cantHijos , max: 35 });
                edadesHijos.push(edadMayor);
                if (cantHijos > 1) {
                    for (let i = 1; i < cantHijos; i++) {
                        const edadAnterior = edadesHijos[i - 1];
                        const diferencia = faker.number.int({ min: 0, max: (Math.max(edadAnterior-1, 1))});
                        edadesHijos.push(Math.max(0, edadAnterior - diferencia));
                        
                    }
                }

            }

            // Edad del titular basada en hijo mayor
            const edadProgenitor = edadesHijos.length > 0
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
                    const minConyugue = edadesHijos.length>0 ? edadesHijos[cantHijos] : 21
                    edadConyuge = faker.number.int({ min: minConyugue , max: edadTitular - 2 });
                    break;
                case 'conviviente_reciente':
                    edadConyuge = edadTitular + faker.helpers.arrayElement([-12, -8, 5, 10]);
                    break;
                case 'monoparental':
                    tieneConyuge = false;
                    break;
                case 'soltero':
                    tieneConyuge= false;
                    cantHijos=0;
                    edadTitular = faker.number.int({ min: 22, max: 40 });
                case 'pareja_joven_sin_hijos':
                    edadTitular = faker.number.int({ min: 22, max: 40 });
                    edadConyuge = edadTitular + faker.number.int({ min: -5, max: 8 });
                    break;
            }
            //edadTitular = Math.max(20, Math.min(80, edadTitular));
            //if (edadConyuge !== null) edadConyuge = Math.max(18, Math.min(80, edadConyuge));

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
                numero_afiliado: faker.string.numeric({length: 7}),
                sufijo: '01'
            };
           
            let integrantes = [];
            let sufijoCounter = 2;

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
                    sufijo: String(sufijoCounter).padStart(2, '0')
                });
                sufijoCounter++;
            }

            // Hijos
            const apellidoPadre = faker.person.lastName()

            edadesHijos.forEach((edadHijo) => {
                const sexoHijo = faker.helpers.arrayElement(['masculino', 'femenino']);
                integrantes.push({
                    nombre: faker.person.firstName(sexoHijo === 'masculino' ? 'male' : 'female'),
                    apellido: titular.sexo === 'masculino' ? titular.apellido : (tieneConyuge ? (integrantes[0]).apellido : apellidoPadre ),
                    sexo: sexoHijo,
                    dni: faker.number.int({ min: 30000000, max: 90000000 }).toString(),
                    parentesco: 'hijo',
                    fecha_nacimiento: fechaNacimientoDesdeEdad(edadHijo),
                    sufijo: String(sufijoCounter).padStart(2, '0')
                });
                sufijoCounter++;
            });

            // Familiares a cargo (aleatorio)
            const agregarFamiliarCargo = Math.random() < 0.5; // 50% chance
            if (agregarFamiliarCargo) {
                const cantFamiliaresCargo = faker.number.int({ min: 1, max: 2 });
                let edadFamiliar = faker.number.int({ min: 18, max: 85 });
                
                for (let i = 0; i < cantFamiliaresCargo; i++) {
                    
                    const sexoFamiliar = faker.helpers.arrayElement(['masculino', 'femenino']);
                    integrantes.push({
                        nombre: faker.person.firstName(sexoFamiliar === 'masculino' ? 'male' : 'female'),
                        apellido: titular.apellido,
                        sexo: sexoFamiliar,
                        dni: faker.number.int({ min: 30000000, max: 90000000 }).toString(),
                        parentesco: 'familiar_a_cargo',
                        fecha_nacimiento: fechaNacimientoDesdeEdad(edadFamiliar),
                        sufijo: String(sufijoCounter).padStart(2, '0') 
                    });
                    
                    edadFamiliar = faker.number.int({ min: edadFamiliar-18, max: edadFamiliar - 1 });
                    sufijoCounter++;
                };
            }

            return { titular, integrantes };
        };

        // -------------------------------
        // GENERACIÓN DE AFILIADOS
        // -------------------------------
       
        for (let i = 0; i < NUM_AFILIADOS_TITULARES; i++) {
            const { titular, integrantes } = generarGrupoFamiliar();

            titular.id = i + 1;
            //titular.numero_afiliado = (numeroAfiliadoBase + i).toString() + '-' + titular.sufijo;
            afiliadosData.push(titular);
            
            integrantes.forEach((int) => {
                int.afiliadoId = titular.id;
                //int.numero_afiliado = (numeroAfiliadoBase + i).toString() + '-' + int.sufijo;
                integrantesData.push(int);
            });

            if ((i + 1) % 100 === 0) {
                console.log(`Generados ${i + 1} grupos familiares...`);
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
