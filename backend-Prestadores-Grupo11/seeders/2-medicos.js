'use strict';
const { Faker, es } = require('@faker-js/faker');
const faker = new Faker({ locale: [es] });
//const { faker } = require('@faker-js/faker/locale/es_AR');
//const { fakerES_AR: faker } = require('@faker-js/faker'); 
//const faker = require('@faker-js/faker').fakerES_AR;
//const { faker } = require('@faker-js/faker');

const db = require('../db/models/index'); // Asegúrate que la ruta es correcta
const Prestador = db.Prestador;

// Caché local para IDs reales que se generarán
let generatedMedicosListCache = []; 

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Lista de centros con IDs supuestos (asumimos que el 01-seed-centros.js los crea con estos IDs)
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
    
    const medicosData = [];

    // Lógica para generar médicos por especialidad y tamaño (se mantiene intacta)
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

    // --- CAMBIO CLAVE: bulkCreate devuelve los objetos con IDs reales ---
    const insertedMedicos = await Prestador.bulkCreate(medicosData);
    console.log(`Datos de ${insertedMedicos.length} médicos cargados con éxito.`);

    // Almacenamos los IDs reales en nuestra caché local para referencia si es necesario
    generatedMedicosListCache = insertedMedicos.map(medico => ({
        id: medico.id, 
        especialidades: medico.especialidades
    }));

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prestadors', { role: 'medico' }, {}); 
    generatedMedicosListCache = [];
  },

  // Exportamos un método getter para que 04/05-seed-turnos.js lo use si lo requiere
  getGeneratedMedicosList: () => generatedMedicosListCache
};
