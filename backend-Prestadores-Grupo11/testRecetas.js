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
            },
              {
                integranteId: 12,
                medicamento: 'Ibuprofeno',
                cantidad: 20,
                presentacion: 'comprimidos 400mg',
                observaciones: 'Tomar después de las comidas',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 7,
                medicamento: 'Losartan',
                cantidad: 30,
                presentacion: 'comprimidos 50mg',
                observaciones: '1 por día por la mañana',
                estado: 'en analisis',
                motivo: null,
                fecha_finalizacion: null,
                usuarioUltimoCambio: null,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 25,
                medicamento: 'Amoxicilina',
                cantidad: 21,
                presentacion: 'capsulas 500mg',
                observaciones: 'Completar los 7 días aunque desaparezcan los síntomas',
                estado: 'rechazado',
                motivo: 'No hay diagnóstico infeccioso respaldado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 3,
                medicamento: 'Omeprazol',
                cantidad: 14,
                presentacion: 'capsulas 20mg',
                observaciones: 'Tomar en ayunas',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 49,
                medicamento: 'Salbutamol',
                cantidad: 1,
                presentacion: 'inhalador',
                observaciones: 'Usar solo ante broncoespasmo',
                estado: 'observado',
                motivo: 'Falta detalle sobre frecuencia de uso',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 18,
                medicamento: 'Metformina',
                cantidad: 60,
                presentacion: 'comprimidos 850mg',
                observaciones: '2 por día junto a comidas',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 41,
                medicamento: 'Diclofenac',
                cantidad: 10,
                presentacion: 'inyecciones 75mg',
                observaciones: 'Aplicación intramuscular por profesional',
                estado: 'en analisis',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 6,
                medicamento: 'Cetirizina',
                cantidad: 14,
                presentacion: 'comprimidos 10mg',
                observaciones: '1 por día, preferentemente por la noche',
                estado: 'en analisis',
                motivo: null,
                fecha_finalizacion: null,
                usuarioUltimoCambio: null,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 33,
                medicamento: 'Enalapril',
                cantidad: 30,
                presentacion: 'comprimidos 10mg',
                observaciones: 'Controlar presión cada 48hs',
                estado: 'en analisis',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 22,
                medicamento: 'Diazepam',
                cantidad: 10,
                presentacion: 'comprimidos 5mg',
                observaciones: 'Uso sólo en caso de ansiedad aguda',
                estado: 'en analisis',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 14,
                medicamento: 'Atorvastatina',
                cantidad: 30,
                presentacion: 'comprimidos 20mg',
                observaciones: 'Tomar por la noche',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 27,
                medicamento: 'Clonazepam',
                cantidad: 20,
                presentacion: 'comprimidos 0.5mg',
                observaciones: 'Uso nocturno; evitar manejar',
                estado: 'observado',
                motivo: 'Debe aclararse duración del tratamiento',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 45,
                medicamento: 'Azitromicina',
                cantidad: 3,
                presentacion: 'comprimidos 500mg',
                observaciones: '1 por día durante 3 días',
                estado: 'recibido',
                motivo: null,
                fecha_finalizacion: null,
                usuarioUltimoCambio: null,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 5,
                medicamento: 'Furosemida',
                cantidad: 10,
                presentacion: 'comprimidos 40mg',
                observaciones: 'Controlar peso y edemas diariamente',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 38,
                medicamento: 'Sertralina',
                cantidad: 30,
                presentacion: 'comprimidos 50mg',
                observaciones: 'Una toma diaria por la mañana',
                estado: 'en analisis',
                motivo: null,
                fecha_finalizacion: null,
                usuarioUltimoCambio: null,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 20,
                medicamento: 'Amiodarona',
                cantidad: 14,
                presentacion: 'comprimidos 200mg',
                observaciones: 'Controlar función tiroidea cada 30 días',
                estado: 'observado',
                motivo: 'Falta referencia al diagnóstico arrítmico',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 31,
                medicamento: 'Ranitidina',
                cantidad: 20,
                presentacion: 'comprimidos 150mg',
                observaciones: 'Tomar antes de acostarse',
                estado: 'rechazado',
                motivo: 'Medicamento desaconsejado por guías actuales',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 2,
                medicamento: 'Prednisona',
                cantidad: 10,
                presentacion: 'comprimidos 20mg',
                observaciones: 'Seguir esquema descendente indicado',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 4,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 46,
                medicamento: 'Lorazepam',
                cantidad: 15,
                presentacion: 'comprimidos 1mg',
                observaciones: 'Uso puntual en crisis de ansiedad',
                estado: 'recibido',
                motivo: null,
                fecha_finalizacion: null,
                usuarioUltimoCambio: null,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 10,
                medicamento: 'Carvedilol',
                cantidad: 28,
                presentacion: 'comprimidos 12.5mg',
                observaciones: 'Tomar dos veces al día',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 19,
                medicamento: 'Bisoprolol',
                cantidad: 30,
                presentacion: 'comprimidos 5mg',
                observaciones: 'Tomar por la mañana',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 8,
                medicamento: 'Ketorolac',
                cantidad: 5,
                presentacion: 'ampollas 30mg',
                observaciones: 'Aplicación en guardia únicamente',
                estado: 'rechazado',
                motivo: 'No se justifica uso de AINE inyectable para dolor leve',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 44,
                medicamento: 'Amlodipina',
                cantidad: 30,
                presentacion: 'comprimidos 5mg',
                observaciones: 'Tomar a la noche',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 23,
                medicamento: 'Tramadol',
                cantidad: 10,
                presentacion: 'capsulas 50mg',
                observaciones: 'Uso solo en dolor moderado a severo',
                estado: 'rechazado',
                motivo: 'Paciente sin dolor moderado documentado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 16,
                medicamento: 'Ramipril',
                cantidad: 30,
                presentacion: 'comprimidos 10mg',
                observaciones: 'Controlar presión semanal',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 2,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 37,
                medicamento: 'Claritromicina',
                cantidad: 14,
                presentacion: 'comprimidos 500mg',
                observaciones: 'Evitar consumo de alcohol durante el tratamiento',
                estado: 'rechazado',
                motivo: 'No se evidencia infección bacteriana activa',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 4,
                medicamento: 'Metoprolol',
                cantidad: 28,
                presentacion: 'comprimidos 50mg',
                observaciones: 'Tomar 1 cada 12 horas',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 4,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 50,
                medicamento: 'Clopidogrel',
                cantidad: 30,
                presentacion: 'comprimidos 75mg',
                observaciones: 'Evitar golpes por riesgo de sangrado',
                estado: 'rechazado',
                motivo: 'No hay antecedentes cardiovasculares que lo indiquen',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 11,
                medicamento: 'Hidroclorotiazida',
                cantidad: 30,
                presentacion: 'comprimidos 25mg',
                observaciones: 'Tomar por la mañana, control de potasio mensual',
                estado: 'aprobado',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 3,
                prestadorAnalisisId: 1
            },
            {
                integranteId: 29,
                medicamento: 'Cefalexina',
                cantidad: 21,
                presentacion: 'capsulas 500mg',
                observaciones: '3 veces por día durante 7 días',
                estado: 'rechazado',
                motivo: 'Diagnóstico de origen no bacteriano',
                fecha_finalizacion: new Date(),
                usuarioUltimoCambio: 1,
                prestadorAnalisisId: 1
            }

    ]);
};

module.exports = {crearRecetas};
