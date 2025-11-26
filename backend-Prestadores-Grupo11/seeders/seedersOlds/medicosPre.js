'use strict';
const { faker } = require('@faker-js/faker/locale/es_AR');

let generatedMedicosList = []; // Variable para almacenar los médicos generados

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const medicosData = [];

    const centrosConEspecialidades = [
        { id: 1, especialidades: ['Odontología'], tamano: 'pequeno' },
        { id: 2, especialidades: ['Kinesiología', 'Fisiatría'], tamano: 'pequeno' },
        { id: 3, especialidades: ['Oftalmología'], tamano: 'pequeno' },
        { id: 4, especialidades: ['Análisis Clínicos', 'Patología'], tamano: 'pequeno' },
        { id: 5, especialidades: ['Medicina General', 'Guardia', 'Diagnóstico por Imágenes', 'Pediatría'], tamano: 'mediano' },
        { id: 6, especialidades: ['Pediatría', 'Maternidad', 'Neonatología', 'Ginecología', 'Cirugía Pediátrica'], tamano: 'mediano' },
        { id: 7, especialidades: ['Guardia 24hs', 'Traumatología', 'Clínica Médica', 'Otorrinolaringología'], tamano: 'mediano' },
        { id: 8, especialidades: ['Cardiología', 'Nutrición', 'Dermatología', 'Endocrinología'], tamano: 'mediano' },
        { id: 9, especialidades: ['Psicología', 'Psiquiatría', 'Neurología', 'Fonoaudiología', 'Terapia Ocupacional'], tamano: 'mediano' },
        { id: 10, especialidades: ['Urología', 'Nefrología', 'Oncología', 'Hematología'], tamano: 'mediano' },
        { id: 11, especialidades: ['Obstetricia', 'Ginecología', 'Neonatología', 'Pediatría', 'Fertilidad'], tamano: 'mediano' },
        { id: 12, especialidades: ['Cardiología', 'Cirugía General', 'Terapia Intensiva', 'Oncología', 'Neurología', 'Pediatría', 'Clínica Médica', 'Diagnóstico por Imágenes', 'Traumatología', 'Urología'], tamano: 'grande' },
        { id: 13, especialidades: ['Guardia', 'Clínica Médica', 'Cirugía General', 'Terapia Intensiva', 'Pediatría', 'Maternidad', 'Gastroenterología', 'Neumonología', 'Endocrinología', 'Dermatología'], tamano: 'grande' },
        { id: 14, especialidades: ['Cardiología', 'Cirugía Cardiovascular', 'Trasplantes', 'Clínica Médica', 'Neurología', 'Nefrología', 'Diagnóstico por Imágenes', 'Oncología', 'Hematología', 'Pediatría'], tamano: 'grande' },
        { id: 15, especialidades: ['Pediatría', 'Clínica Médica', 'Ginecología', 'Obstetricia', 'Cirugía General', 'Traumatología', 'Oftalmología', 'Otorrinolaringología', 'Neurología', 'Psiquiatría', 'Nutrición'], tamano: 'grande' },
        { id: 16, especialidades: ['Pediatría', 'Oncología Pediátrica', 'Cardiología Infantil', 'Nefrología Infantil', 'Cirugía Pediátrica', 'Traumatología Infantil', 'Neurología Infantil', 'Hematología Infantil', 'Infectología', 'Inmunología'], tamano: 'grande' },
    ];

    for (const centro of centrosConEspecialidades) {
        for (const especialidad of centro.especialidades) {
            let minMedicos = 0;
            if (centro.tamano === 'pequeno') minMedicos = 5;
            else if (centro.tamano === 'mediano') minMedicos = 3;
            else if (centro.tamano === 'grande') minMedicos = 6;

            for (let i = 0; i < minMedicos; i++) {
                const nombre = faker.person.firstName();
                const apellido = faker.person.lastName();
                
                medicosData.push({
                    username: `${apellido.toLowerCase()}.${nombre.charAt(0).toLowerCase()}.${centro.id}.${i}`, 
                    nombre: `${nombre} ${apellido}`,
                    password: `Pass_${apellido}_${centro.id}_${i}_!`,
                    especialidades: [especialidad],
                    role: 'medico',
                    centroId: centro.id
                });
            }
        }
    }

    await queryInterface.bulkInsert('Prestadores', medicosData, {});
    console.log(`Datos de ${medicosData.length} médicos cargados con éxito.`);

    // NOTA: Si usas autoIncrement, los IDs generados por PG NO coincidirán con los que Sequelize usa internamente aquí.
    // Esta lista asume que los IDs se generarán en orden secuencial en PostgreSQL.
    // Generamos una lista de IDs simulados (empezando por 17, ya que los centros usaron 1 al 16)
    generatedMedicosList = medicosData.map((medico, index) => ({
        id: 17 + index, // <-- AQUI ajustas el ID de inicio si es necesario
        especialidades: medico.especialidades
    }));

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prestadores', { role: 'medico' }, {});
    generatedMedicosList = [];
  },

  // Exportamos la lista para que 04_turnos.js la use
  generatedMedicosList
};
