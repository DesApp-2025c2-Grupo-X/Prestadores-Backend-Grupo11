const express = require('express');
const cors = require('cors');
const db = require('./db/models');
const {crearTurnos} = require('./testTurnos.js');
const {crearAfiliados} = require('./testAfiliados.js');
const {crearIntegrantes} = require('./testIntegrantes.js');
const {crearPrestadores} = require('./testPrestadores.js');
const {crearSituaciones} = require('./testSituaciones.js');
const {crearAutorizaciones} = require('./testAutorizaciones.js');
const {crearReintegros} = require('./testReintegros.js');
const {crearRecetas} = require('./testRecetas.js');

const app = express();
const PORT = process.env.PORT || 3001;
const {
    authRoute, 
    dashboardRoute, 
    historialRoute, 
    situacionesRoute, 
    turnosRoute, 
    autorizacionRoute, 
    integranteRoute, 
    reintegroRoutes,
    recetaRoutes, 
    pendientesRoute,
    afiliadoRoute,
    prestadorRoute} = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/login', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/historial', historialRoute);
app.use('/situaciones', situacionesRoute);
app.use('/turnos', turnosRoute);
app.use('/autorizaciones', autorizacionRoute);
app.use('/integrantes', integranteRoute);
app.use('/afiliados', afiliadoRoute)
app.use('/reintegros', reintegroRoutes)
app.use('/recetas', recetaRoutes)
app.use('/pendientes', pendientesRoute)
app.use('/prestador', prestadorRoute)


app.listen(PORT, async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync();

        const prestadores = await db.Prestador.count();

        if (prestadores === 0) {
            await crearPrestadores();
            await crearAfiliados();
            await crearIntegrantes();
            await crearAutorizaciones();
            await crearReintegros();
            await crearRecetas();
            await crearSituaciones();
            await crearTurnos();
        }

        console.log(`La app arranco en el puerto ${PORT}.`);


    } catch (error) {
        console.error("Error conectando a la base:", error);
    }
});