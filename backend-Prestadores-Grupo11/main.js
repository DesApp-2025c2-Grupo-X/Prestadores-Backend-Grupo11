const express = require('express');
const cors = require('cors');
const db = require('./db/models');
const {crearAfiliados, crearPrestadores, crearAutorizaciones} = require('./test');
const app = express();
const PORT = process.env.PORT ?? 3001;
const {authRoute, dashboardRoute, historiasRoute, situacionesRoute, turnosRoute, autorizacionRoute, integranteRoute} = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/login', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/historias', historiasRoute);
app.use('/situaciones', situacionesRoute);
app.use('/turnos', turnosRoute);
app.use('/autorizaciones', autorizacionRoute);
app.use('/integrantes', integranteRoute);

app.listen(PORT, async () => {
    await db.sequelize.sync({ force: true });
    await crearPrestadores();
    await crearAfiliados();
    await crearAutorizaciones();

    console.log(`La app arranco en el puerto ${PORT}.`);
});