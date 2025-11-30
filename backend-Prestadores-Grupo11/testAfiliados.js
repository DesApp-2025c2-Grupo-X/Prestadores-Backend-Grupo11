const {Afiliado} = require('./db/models');
const { notify } = require('./routes/auth.route');

async function crearAfiliados() {
    await Afiliado.bulkCreate([
        {nombre: "Roberto", apellido: "Perez", numero_afiliado: "IOMA-00111222", dni: "30456789", telefono: "+54 9 11 2345-6789", edad: 50},
        {nombre: "María", apellido: "Lopez", numero_afiliado: 'OSDE-00012345',dni: '30456790',telefono: '+54 9 11 2345-6789', edad: 35}
    ])
}

module.exports = {crearAfiliados};
