'use strict';
const { faker } = require('@faker-js/faker/locale/es_AR');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const medicosData = [];

    // !! IMPORTANTE: REEMPLAZA ESTO CON LOS IDS Y ESPECIALIDADES REALES DE TU DB
    // Si usas autoIncrement, la forma más limpia es usar la CLI de Sequelize para 
    // capturar los IDs del seeder anterior, pero manualmente puedes usar IDs fijos:
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
    // FIN REEMPLAZO

    // Iteramos sobre cada centro y sus especialidades para asegurar el mínimo de médicos
    for (const centro of centrosConEspecialidades) {
        for (const especialidad of centro.especialidades) {
            let minMedicos = 0;
            if (centro.tamano === 'pequeno') minMedicos = 5;
            else if (centro.tamano === 'mediano') minMedicos = 3;
            else if (centro.tamano === 'grande') minMedicos = 6; // Apuntamos a 6 de mínima

            for (let i = 0; i < minMedicos; i++) {
                const nombre = faker.person.firstName();
                const apellido = faker.person.lastName();
                
                medicosData.push({
                    // Aseguramos username único
                    username: `${apellido.toLowerCase()}.${nombre.charAt(0).toLowerCase()}.${centro.id}.${i}`, 
                    nombre: `${nombre} ${apellido}`, // Nombre completo sin Dr/Dra
                    password: `Pass_${apellido}_${centro.id}_${i}_!`, // Contraseña única
                    especialidades: [especialidad], // EXACTAMENTE la especialidad del loop
                    role: 'medico',
                    centroId: centro.id // Asignación obligatoria
                });
            }
        }
    }

    await queryInterface.bulkInsert('Prestadores', medicosData, {});
    console.log(`Datos de ${medicosData.length} médicos cargados con éxito.`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prestadores', { role: 'medico' }, {}); 
  }
};
