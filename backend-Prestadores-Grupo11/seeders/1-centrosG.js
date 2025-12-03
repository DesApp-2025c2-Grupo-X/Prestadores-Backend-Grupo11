    'use strict';

    module.exports = {
    up: async (queryInterface, Sequelize) => {

        const centrosData = [

        // =========================
        // 🟢 3 CENTROS PEQUEÑOS
        // =========================

        {
            username: 'consultorio.saavedra',
            nombre: 'Consultorio Saavedra',
            password: 'Pass_CS_1!',
            especialidades: [
            'Clínica Médica',
            'Cardiología',
            'Nutrición'
            ],
            role: 'centro_medico',
        },

        {
            username: 'centro.kinesiologico.mitre',
            nombre: 'Centro Kinesiológico Mitre',
            password: 'Pass_CKM_2@',
            especialidades: [
            'Kinesiología',
            'Fisiatría',
            'Traumatología'
            ],
            role: 'centro_medico',
        },

        {
            username: 'centro.oftalmologico.norte',
            nombre: 'Centro Oftalmológico Norte',
            password: 'Pass_CON_3#',
            especialidades: [
            'Oftalmología',
            'Optometría'
            ],
            role: 'centro_medico',
        },

        // =========================
        // 🟡 2 CENTROS MEDIANOS
        // =========================

        {
            username: 'sanatorio.belgrano',
            nombre: 'Sanatorio Belgrano',
            password: 'Pass_SB_4$',
            especialidades: [
            'Clínica Médica',
            'Guardia',
            'Pediatría',
            'Ginecología',
            'Obstetricia',
            'Neonatología',
            'Diagnóstico por Imágenes'
            ],
            role: 'centro_medico',
        },

        {
            username: 'centro.medico.quilmes',
            nombre: 'Centro Médico Quilmes',
            password: 'Pass_CMQ_5%',
            especialidades: [
            'Endocrinología',
            'Neumonología',
            'Gastroenterología',
            'Dermatología',
            'Nefrología',
            'Urología',
            'Nutrición'
            ],
            role: 'centro_medico',
        },

        // =========================
        // 🔴 3 CENTROS GRANDES
        // =========================

        {
            username: 'hospital.italiano.ba',
            nombre: 'Hospital Italiano de Buenos Aires',
            password: 'Pass_HIBA_6^',
            especialidades: [
            'Clínica Médica',
            'Cardiología',
            'Cirugía General',
            'Terapia Intensiva',
            'Neurología',
            'Oncología',
            'Traumatología',
            'Gastroenterología',
            'Diagnóstico por Imágenes',
            'Nefrología'
            ],
            role: 'centro_medico',
        },

        {
            username: 'hospital.austral',
            nombre: 'Hospital Austral',
            password: 'Pass_HA_7&',
            especialidades: [
            'Pediatría',
            'Clínica Médica',
            'Ginecología',
            'Obstetricia',
            'Cirugía General',
            'Traumatología',
            'Otorrinolaringología',
            'Oftalmología',
            'Neurología',
            'Psiquiatría'
            ],
            role: 'centro_medico',
        },

        {
            username: 'hospital.garrahan',
            nombre: 'Hospital Garrahan',
            password: 'Pass_HG_8*',
            especialidades: [
            'Pediatría',
            'Oncología Pediátrica',
            'Cardiología Infantil',
            'Nefrología Infantil',
            'Cirugía Pediátrica',
            'Neurología Infantil',
            'Hematología Infantil',
            'Infectología'
            ],
            role: 'centro_medico',
        }

        ];

        await queryInterface.bulkInsert('Prestadors', centrosData, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Prestadors', null, {});
    }
    };
