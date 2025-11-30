const {Receta} = require('./db/models');
const { notify } = require('./routes/auth.route');

    const crearRecetas = async () => {
        await Receta.bulkCreate([
            {
                integranteId: 1,
                medicamento: 'Ibuprofeno',
                cantidad: 20,
                presentacion: 'capsulas',
                observaciones: 'Tomar cada 8 horas después de las comidas',
            },
            {
                integranteId: 2,
                medicamento: 'Amoxicilina',
                cantidad: 10,
                presentacion: 'blister',
                observaciones: 'Completar tratamiento por 7 días',
                estado: 'en analisis',
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 3,
                medicamento: 'Paracetamol',
                cantidad: 15,
                presentacion: 'pastillas',
                observaciones: 'Solo en caso de fiebre mayor a 38°C',
                estado: 'rechazado',
                motivo: 'Dosis no justificada por diagnóstico',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },  
            {
                integranteId: 4,
                medicamento: 'Omeprazol',
                cantidad: 30,
                presentacion: 'comprimidos',
                observaciones: 'Tomar en ayunas durante 15 días',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2,
            },
            {
                integranteId: 5,
                medicamento: 'Salbutamol',
                cantidad: 1,
                presentacion: 'aerosol',
                observaciones: 'Usar en caso de crisis asmática',
                estado: 'observado',
                fecha_finalizacion: '2025-09-11', //Fecha de cuando se cambio el estado
                motivo: 'Falta de estudios complementarios',
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 3
            },
            {
                integranteId: 6,
                medicamento: 'Bisoprolol',
                cantidad: 30,
                presentacion: 'comprimidos',
                observaciones: 'Tratamiento de hipertensión arterial',
                estado: 'en analisis',
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 7,
                medicamento: 'Furosemida',
                cantidad: 20,
                presentacion: 'ampollas',
                observaciones: 'Uso en caso de edema agudo de pulmón',
                estado: 'en analisis',
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 8,
                medicamento: 'Clopidogrel',
                cantidad: 28,
                presentacion: 'blister',
                observaciones: 'Prevención secundaria post infarto',
                estado: 'observado',
                fecha_finalizacion: '2025-02-21', //Fecha de cuando se cambio el estado
                motivo: 'Falta de informe de laboratorio',
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 9,
                medicamento: 'Atorvastatina',
                cantidad: 30,
                presentacion: 'pastillas',
                observaciones: 'Control de dislipemia',
                estado: 'observado',
                fecha_finalizacion: '2025-08-05', //Fecha de cuando se cambio el estado
                motivo: 'Estudios complementarios no adjuntos',
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 3
            },
            {
                integranteId: 10,
                medicamento: 'Enalapril',
                cantidad: 20,
                presentacion: 'comprimidos',
                observaciones: 'Tratamiento de insuficiencia cardíaca',
                estado: 'rechazado',
                motivo: 'Diagnóstico no justificado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 2,
                medicamento: 'Amiodarona',
                cantidad: 10,
                presentacion: 'blister',
                observaciones: 'Control de arritmia ventricular',
                estado: 'rechazado',
                motivo: 'Receta vencida',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 2
            },
            {
                integranteId: 6,
                medicamento: 'Losartán',
                cantidad: 30,
                presentacion: 'pastillas',
                observaciones: 'Control de presión arterial',
                estado: 'recibido'
            },
            {
                integranteId: 7,
                medicamento: 'Aspirina',
                cantidad: 20,
                presentacion: 'blister',
                observaciones: 'Prevención cardiovascular en paciente de riesgo',
                estado: 'recibido'
            },
            {
                integranteId: 8,
                medicamento: 'Nitroglicerina',
                cantidad: 5,
                presentacion: 'spray sublingual',
                observaciones: 'Uso en caso de angina de pecho',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 3
            },
            {
                integranteId: 5,
                medicamento: 'Carvedilol',
                cantidad: 30,
                presentacion: 'comprimidos',
                observaciones: 'Tratamiento de insuficiencia cardíaca con FE reducida',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            }

    ]);
};

module.exports = {crearRecetas};
