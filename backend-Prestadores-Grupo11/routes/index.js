const authRoute = require('./auth.route');
const dashboardRoute = require('./dashboard.route');
const historialRoute = require('./historial.route');
const situacionesRoute = require('./situaciones.route');
const turnosRoute = require('./turnos.routes');
const autorizacionRoute = require('./autorizacion.routes');
const integranteRoute = require('./integrante.routes');
const reintegroRoutes = require('./reintegro.routes');
const recetaRoutes = require('./receta.routes');
const pendientesRoute = require('./pendientes.routes');

module.exports = {
    authRoute, 
    dashboardRoute, 
    historialRoute, 
    situacionesRoute, 
    turnosRoute, 
    autorizacionRoute,
    integranteRoute, 
    reintegroRoutes, 
    recetaRoutes, 
    pendientesRoute};