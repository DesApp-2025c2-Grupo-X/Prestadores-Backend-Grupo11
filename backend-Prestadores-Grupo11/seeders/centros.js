'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Contraseñas únicas y no triviales
    const centrosData = [
      // --- 4 CENTROS PEQUEÑOS (role: 'centro_medico') ---
      {
        username: 'consultorio.saavedra',
        nombre: 'Consultorio Saavedra', 
        password: 'Pass_C_Saavedra_1!',
        especialidades: ['Odontología'],
        role: 'centro_medico', 
        // centroId ya no está presente en la data, se asumirá NULL
      },
      {
        username: 'kinesiologia.mitre',
        nombre: 'Kinesiología Mitre',
        password: 'Pass_K_Mitre_2@',
        especialidades: ['Kinesiología', 'Fisiatría'],
        role: 'centro_medico',
      },
      {
        username: 'centro.oftalmo.norte',
        nombre: 'Centro Oftalmológico Norte',
        password: 'Pass_CO_Norte_3#',
        especialidades: ['Oftalmología'],
        role: 'centro_medico',
      },
      {
        username: 'laboratorio.central',
        nombre: 'Laboratorio Central',
        password: 'Pass_LC_Central_4$',
        especialidades: ['Análisis Clínicos', 'Patología'],
        role: 'centro_medico',
      },

      // --- 7 CENTROS MEDIANOS (role: 'centro_medico') ---
      {
        username: 'clinica.independencia',
        nombre: 'Clínica Independencia',
        password: 'Pass_CI_Indepe_5%',
        especialidades: ['Medicina General', 'Guardia', 'Diagnóstico por Imágenes', 'Pediatría'],
        role: 'centro_medico',
      },
      {
        username: 'sanatorio.belgrano',
        nombre: 'Sanatorio Belgrano',
        password: 'Pass_SB_Belgrano_6^',
        especialidades: ['Pediatría', 'Maternidad', 'Neonatología', 'Ginecología', 'Cirugía Pediátrica'],
        role: 'centro_medico',
      },
      {
        username: 'hospital.municipal.oeste',
        nombre: 'Hospital Municipal del Oeste',
        password: 'Pass_HMO_Oeste_7&',
        especialidades: ['Guardia 24hs', 'Traumatología', 'Clínica Médica', 'Otorrinolaringología'],
        role: 'centro_medico',
      },
       {
        username: 'centro.medico.quilmes',
        nombre: 'Centro Médico Quilmes',
        password: 'Pass_CMQ_Quilmes_8*',
        especialidades: ['Cardiología', 'Nutrición', 'Dermatología', 'Endocrinología'],
        role: 'centro_medico',
      },
       {
        username: 'consultorios.obelisco',
        nombre: 'Consultorios Obelisco',
        password: 'Pass_CO_Obelisco_9(',
        especialidades: ['Psicología', 'Psiquiatría', 'Neurología', 'Fonoaudiología', 'Terapia Ocupacional'],
        role: 'centro_medico',
      },
      {
        username: 'clinica.pueyrredon',
        nombre: 'Clínica Pueyrredón',
        password: 'Pass_CP_Pueyrredon_0)',
        especialidades: ['Urología', 'Nefrología', 'Oncología', 'Hematología'],
        role: 'centro_medico',
      },
       {
        username: 'maternidad.trinidad',
        nombre: 'Maternidad Trinidad',
        password: 'Pass_MT_Trinidad_!',
        especialidades: ['Obstetricia', 'Ginecología', 'Neonatología', 'Pediatría', 'Fertilidad'],
        role: 'centro_medico',
      },

      // --- 5 CENTROS GRANDES (role: 'centro_medico') ---
      {
        username: 'hospital.italiano.ba',
        nombre: 'Hospital Italiano de Buenos Aires',
        password: 'Pass_HIBA_Grande_1!',
        especialidades: ['Cardiología', 'Cirugía General', 'Terapia Intensiva', 'Oncología', 'Neurología', 'Pediatría', 'Clínica Médica', 'Diagnóstico por Imágenes', 'Traumatología', 'Urología'],
        role: 'centro_medico',
      },
      {
        username: 'sanatorio.otamendi',
        nombre: 'Sanatorio Otamendi',
        password: 'Pass_SO_Grande_2@',
        especialidades: ['Guardia', 'Clínica Médica', 'Cirugía General', 'Terapia Intensiva', 'Pediatría', 'Maternidad', 'Gastroenterología', 'Neumonología', 'Endocrinología', 'Dermatología'],
        role: 'centro_medico',
      },
      {
        username: 'clinica.favaloro',
        nombre: 'Clínica Favaloro',
        password: 'Pass_CF_Grande_3#',
        especialidades: ['Cardiología', 'Cirugía Cardiovascular', 'Trasplantes', 'Clínica Médica', 'Neurología', 'Nefrología', 'Diagnóstico por Imágenes', 'Oncología', 'Hematología', 'Pediatría'],
        role: 'centro_medico',
      },
      {
        username: 'hospital.austral',
        nombre: 'Hospital Austral',
        password: 'Pass_HA_Grande_4$',
        especialidades: ['Pediatría', 'Clínica Médica', 'Ginecología', 'Obstetricia', 'Cirugía General', 'Traumatología', 'Oftalmología', 'Otorrinolaringología', 'Neurología', 'Psiquiatría', 'Nutrición'],
        role: 'centro_medico',
      },
      {
        username: 'hospital.garrahan',
        nombre: 'Hospital Garrahan',
        password: 'Pass_HG_Grande_5%',
        especialidades: ['Pediatría', 'Oncología Pediátrica', 'Cardiología Infantil', 'Nefrología Infantil', 'Cirugía Pediátrica', 'Traumatología Infantil', 'Neurología Infantil', 'Hematología Infantil', 'Infectología', 'Inmunología'],
        role: 'centro_medico',
      },
    ];

    await queryInterface.bulkInsert('Prestadores', centrosData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prestadores', null, {});
  }
};
