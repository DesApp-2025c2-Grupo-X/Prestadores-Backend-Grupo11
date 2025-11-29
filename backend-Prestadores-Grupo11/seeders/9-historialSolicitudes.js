'use strict';
const { Faker, es, en } = require('@faker-js/faker');
const faker = new Faker({ locale: [es, en] });
const db = require('../db/models/index');

const HistorialSolicitud = db.HistorialSolicitud;
const Receta = db.Receta; // Para consultar la DB
const Autorizacion = db.Autorizacion; // Para consultar la DB
const Reintegro = db.Reintegro; // Para consultar la DB

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Consultamos la DB para obtener los IDs y estados reales
    const generatedRecetas = await Receta.findAll({ attributes: ['id', 'estado', 'usuarioUltimoCambio'] });
    const generatedAutorizaciones = await Autorizacion.findAll({ attributes: ['id', 'estado', 'usuarioUltimoCambio'] });
    const generatedReintegros = await Reintegro.findAll({ attributes: ['id', 'estado', 'usuarioUltimoCambio'] });

    const historialData = [];
    const estadosPosibles = ['recibido', 'en analisis', 'observado', 'aprobado', 'rechazado'];

    try{
    // Lógica para Recetas
    for (const receta of generatedRecetas) {
      const estadoFinalIndex = estadosPosibles.indexOf(receta.estado);
      for (let i = 0; i <= estadoFinalIndex; i++) {
        const estadoActual = estadosPosibles[i];
        const estadoAnterior = i === 0 ? null : estadosPosibles[i - 1];
        // Forzamos 0 si usuarioUltimoCambio es null para evitar error de DB
        const usuarioId = (i === estadoFinalIndex && receta.usuarioUltimoCambio) ? receta.usuarioUltimoCambio : (faker.number.int({ min: 100, max: 200 }) || null);

        historialData.push({
          tipoSolicitud: 'receta', solicitudId: receta.id, estadoAnterior: estadoAnterior, estadoNuevo: estadoActual, usuarioId: usuarioId,
          // Forzamos '' si motivo es null para evitar error de DB
          motivo: (estadoActual === 'rechazado' || estadoActual === 'observado') ? faker.lorem.sentence() : '' || '',
          // Ya no incluimos createdAt/updatedAt porque usamos { timestamps: false } en el insert
        });
        
      }
      
    }

    // Lógica para Autorizaciones
    for (const auth of generatedAutorizaciones) {
      const estadoFinalIndex = estadosPosibles.indexOf(auth.estado);
      for (let i = 0; i <= estadoFinalIndex; i++) {
        const estadoActual = estadosPosibles[i];
        const estadoAnterior = i === 0 ? null : estadosPosibles[i - 1];
        const usuarioId = (i === estadoFinalIndex && auth.usuarioUltimoCambio) ? auth.usuarioUltimoCambio : (faker.number.int({ min: 100, max: 200 }) || null);
        historialData.push({ tipoSolicitud: 'autorizacion', solicitudId: auth.id, estadoAnterior: estadoAnterior, estadoNuevo: estadoActual, usuarioId: usuarioId, motivo: (estadoActual === 'rechazado' || estadoActual === 'observado') ? faker.lorem.sentence() : '' || '' });
      }
    }

    // Lógica para Reintegros
    for (const reint of generatedReintegros) {
      const estadoFinalIndex = estadosPosibles.indexOf(reint.estado);
      for (let i = 0; i <= estadoFinalIndex; i++) {
        const estadoActual = estadosPosibles[i];
        const estadoAnterior = i === 0 ? null : estadosPosibles[i - 1];
        const usuarioId = (i === estadoFinalIndex && reint.usuarioUltimoCambio) ? reint.usuarioUltimoCambio : (faker.number.int({ min: 100, max: 200 }) || null);
        historialData.push({ tipoSolicitud: 'reintegro', solicitudId: reint.id, estadoAnterior: estadoAnterior, estadoNuevo: estadoActual, usuarioId: usuarioId, motivo: (estadoActual === 'rechazado' || estadoActual === 'observado') ? faker.lorem.sentence() : '' || '' });
      }
    }
    
    // Insertamos los datos, ignorando los timestamps para evitar el error de sintaxis de PostgreSQL
    await queryInterface.bulkInsert('HistorialSolicitudes', historialData, { timestamps: false });
    console.log(`Datos de ${historialData.length} registros de historial maestro cargados con éxito.`);
  
  
    } catch (error) {
      console.error("DEBUGGING ERROR: ", error); // Esto debería imprimir el SQL que falla
      throw error; // Vuelve a lanzar el error para que la CLI sepa que falló
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HistorialSolicitudes', null, {});
  }
};
