const {Afiliado} = require('./db/models');
const { notify } = require('./routes/auth.route');

async function crearAfiliados() {
    await Afiliado.bulkCreate([
        {nombre: "Roberto", apellido: "Perez", numero_afiliado: "IOMA-00111222", dni: "30456789", telefono: "+54 9 11 2345-6789", edad: 50},
        {nombre: "María", apellido: "Lopez", numero_afiliado: 'OSDE-00012345',dni: '30456790',telefono: '+54 9 11 2345-6789', edad: 35},
        { nombre: "Javier", apellido: "Gómez", numero_afiliado: "SWISS-00987456", dni: "28890345", telefono: "+54 9 11 5512-3321", edad: 42 },
        { nombre: "Luciana", apellido: "Martínez", numero_afiliado: "GALENO-00451233", dni: "31780456", telefono: "+54 9 11 4421-9987", edad: 29 },
        { nombre: "Hernán", apellido: "Suárez", numero_afiliado: "OSDE-00077812", dni: "30123987", telefono: "+54 9 11 6132-4400", edad: 53 },
        { nombre: "Carolina", apellido: "Bianchi", numero_afiliado: "IOMA-00334455", dni: "32901822", telefono: "+54 9 11 7002-5588", edad: 31 },
        { nombre: "Diego", apellido: "Fernández", numero_afiliado: "PAMI-55781200", dni: "27119876", telefono: "+54 9 11 3322-1100", edad: 64 },
        { nombre: "Camila", apellido: "Rossi", numero_afiliado: "OSECAC-00881144", dni: "32564098", telefono: "+54 9 11 2456-8877", edad: 27 },
        { nombre: "Esteban", apellido: "Dominguez", numero_afiliado: "SWISS-00772010", dni: "30922114", telefono: "+54 9 11 5099-3011", edad: 39 },
        { nombre: "Sofía", apellido: "Cabrera", numero_afiliado: "GALENO-00665588", dni: "33301972", telefono: "+54 9 11 2280-4411", edad: 33 }
    ])
}

module.exports = {crearAfiliados};
