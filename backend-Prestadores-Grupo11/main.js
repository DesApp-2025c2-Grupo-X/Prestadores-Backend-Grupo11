const express = require('express');
const cors = require('cors');
const db = require('./db/models');
//const {crearAfiliados, crearPrestadores, crearAutorizaciones, crearReintegros, crearRecetas, crearIntegrantes} = require('./test');
const app = express();
const PORT = process.env.PORT ?? 3001;
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
    afiliadoRoute} = require('./routes');

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


app.listen(PORT, async () => {
    //await db.sequelize.sync({ force: true });
    /*await crearPrestadores();
    await crearAfiliados();
    await crearIntegrantes();
    await crearAutorizaciones();
    await crearReintegros();
    await crearRecetas();*/
    console.log(`La app arranco en el puerto ${PORT}.`);
   
});