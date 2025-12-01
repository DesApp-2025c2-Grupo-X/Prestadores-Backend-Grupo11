const {Autorizacion} = require('./db/models');
const { notify } = require('./routes/auth.route');

const crearAutorizaciones = async () => {
    await Autorizacion.bulkCreate([
        {
            fecha_prevista: new Date('2025-11-01'),
            integranteId: 1,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Chequeo prequirúrgico',
            estado:'en analisis',
            usuarioUltimoCambio: 3
        },
        {
            fecha_prevista: new Date('2025-11-03'),
            integranteId: 2,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones: 'Control de lunares'
        },

        {
            fecha_prevista: new Date('2025-01-03'),
            integranteId: 2,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones:'Biopsia de lesión cutánea sospechosa en antebrazo izquierdo'
        },

        {
            fecha_prevista: new Date('2025-11-05'),
            integranteId: 3,
            medico: 'dr cecilia lopez',
            especialidad: 'Neurología',
            lugar: 'Clínica Santa María',
            dias_internacion: 1,
            observaciones: 'Fiebre persistente, acompañado de una cefalea intensa',
            estado:'observado',
            fecha_finalizacion: '2025-11-09', //Fecha de cuando se cambio el estado
            motivo:'Falta resultado de análisis de sangre',
            usuarioUltimoCambio:2
        },

        {
            fecha_prevista: new Date('2025-11-06'),
            integranteId: 4,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 3,
            observaciones: 'Infarto agudo de miocardio con necesidad de colocación de stent coronario izquierdo',
            estado: 'aprobado',    
            fecha_finalizacion: '2025-11-10', //Fecha de cuando se cambio el estado
            usuarioUltimoCambio: 3           
        },
        {
            fecha_prevista: new Date('2025-11-07'),
            integranteId: 5,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 0,
            observaciones: 'Controles anuales',
            estado: 'rechazado',
            fecha_finalizacion: '2025-11-11', //Fecha de cuando se cambio el estado
            motivo: 'No paso un año desde el último control',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: new Date('2025-11-08'),
            integranteId: 6,
            medico: 'dr alejandro ruiz',
            especialidad: 'Psiquiatría',
            lugar: 'Clínica Santa María',
            dias_internacion: 0,
            observaciones: 'Evaluación pre asignación del profesional adecuado para el caso',
            estado:'observado',
            fecha_finalizacion: '2025-11-13', //Fecha de cuando se cambio el estado
            motivo: 'No abonó el copago obligatorio',
            usuarioUltimoCambio: 1,    
        },
        {
            fecha_prevista: new Date('2025-11-09'),
            integranteId: 7,
            medico: 'dr alejandro ruiz',
            especialidad: 'cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 2,
            observaciones: 'Insuficencia cardiaca',
            estado:'aprobado',
            fecha_finalizacion: '2025-11-16', //Fecha de cuando se cambio el estado
            usuarioUltimoCambio:1
        },
        {
            fecha_prevista: new Date('2025-11-10'),
            integranteId: 8,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 1,
            observaciones: 'Reacción a alimentos',
            estado: 'rechazado',
            fecha_finalizacion: '2025-11-20', //Fecha de cuando se cambio el estado
            motivo: 'Se aplicó corticoide y luego 2hs de reposo ya se puede dar el alta',
            usuarioUltimoCambio: 2
        },
        {
            fecha_prevista: new Date('2025-11-11'),
            integranteId: 9,
            medico: 'dr alejandro ruiz',
            especialidad: 'Psiquiatría',
            lugar: 'Clínica Santa María',
            dias_internacion: 1,
            observaciones: 'Ataque de panico severo',
            estado: 'rechazado',
            fecha_finalizacion: '2025-11-12', //Fecha de cuando se cambio el estado
            motivo: 'Se aplicó calmante y luego de 2hs de control en guardia, ya se puede dar el alta',
            usuarioUltimoCambio: 1
        },
        {
            fecha_prevista: new Date('2025-11-12'),
            integranteId: 10,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Hipertensión arterial severa'
        },
        {
            fecha_prevista: new Date('2025-11-26'),
            integranteId: 10,
            medico: 'dr alejandro ruiz',
            especialidad: 'Cardiología',
            lugar: 'Hospital Central',
            dias_internacion: 1,
            observaciones: 'Arritmia ventricular con necesidad de Holter',
            estado:'en analisis',
            usuarioUltimoCambio:1
        },
        {
            fecha_prevista: new Date('2025-11-10'),
            integranteId: 9,
            medico: 'dr cecilia lopez',
            especialidad: 'Medica Clinica',
            lugar: 'Consultorio Norte',
            dias_internacion: 1,
            observaciones: 'Nuevo melanocítico con bordes irregulares en espalda',
            estado: 'observado',
            fecha_finalizacion: '2025-11-15', //Fecha de cuando se cambio el estado
            motivo: 'Falta biopsia',
            usuarioUltimoCambio: 2
        }

    ]);
};

module.exports = {crearAutorizaciones};