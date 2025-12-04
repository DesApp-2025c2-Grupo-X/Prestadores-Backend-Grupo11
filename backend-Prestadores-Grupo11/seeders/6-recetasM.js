'use strict';
const { Faker, es, es_MX } = require('@faker-js/faker');
const faker = new Faker({ locale: [es_MX, es] });
const db = require('../db/models/index');
const Receta = db.Receta;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;

// --- BASES DE TEXTO PERSONALIZADAS PARA SEEDING ---
const TEXTOS_RECETAS = {
    // TEXTOS GENERALES/COMPARTIDOS
    'General': {
        observaciones: [
            "Renovación de medicación crónica habitual.",
            "Tratamiento de síntomas agudos.",
            "Medicación indicada para uso ambulatorio por 30 días.",
            "Indicación de reposo y medicación estándar."
        ],
        motivos: [
            "Error en la carga de la cantidad/presentación.",
            "Vencimiento de la receta original, requiere nueva emisión.",
            "Cobertura de la obra social no aplica para este fármaco específico."
        ]
    },
    'Medicina General': { // Usado para Clínica Médica y Medicina General
        observaciones: [
            "Tratamiento sintomático para gripe/resfrío común.",
            "Renovación de receta crónica para diabetes tipo 2 e hipertensión.",
            "Manejo de ansiedad y estrés laboral, receta de ansiolíticos.",
            "Analgesia para dolor lumbar agudo."
        ],
        motivos: [
            "Receta ilegible, requiere reenvío claro.",
            "Falta la firma digital del profesional en la imagen adjunta.",
            "Medicamento solicitado es de venta libre, no requiere auditoría."
        ]
    },
    'Pediatría': {
        observaciones: [
            "Tratamiento de otitis media aguda en lactante.",
            "Control de asma infantil. Uso de salbutamol y corticoides inhalados.",
            "Indicación de suplemento de hierro y vitaminas para niño sano.",
            "Tratamiento de escabiosis (sarna) familiar."
        ],
        motivos: [
            "Presentación del medicamento no apta para edad pediátrica.",
            "Falta de peso y edad del paciente en la solicitud.",
            "Antibiótico de amplio espectro no justificado para un resfrío común."
        ]
    },

    // ESPECIALIDADES INDIVIDUALES
    'Cardiología': {
        observaciones: [
            "Control de hipertensión arterial y colesterol.",
            "Seguimiento post-infarto. Uso de anticoagulantes indicado.",
            "Insuficiencia cardíaca congestiva leve. Control de diuréticos.",
            "Profilaxis endocarditis bacteriana."
        ],
        motivos: [
            "Medicación fuera de cobertura para esta patología.",
            "Dosis máxima excedida por día.",
            "Falta de estudios complementarios que justifiquen el uso del fármaco."
        ]
    },
    'Traumatología': {
        observaciones: [
            "Analgesia y antinflamatorios para esguince de tobillo.",
            "Relajantes musculares para contractura cervical severa.",
            "Crema tópica para manejo de tendinitis de Aquiles.",
            "Tramadol para dolor post-quirúrgico de rodilla."
        ],
        motivos: [
            "Analgésicos de alta potencia requieren autorización previa de auditoría médica.",
            "Se solicitan 2 cajas de la misma presentación, solo 1 cubierta por mes.",
            "Falta informe de estudios de imagen (radiografía/RMN) que justifiquen el tratamiento."
        ]
    },
    'Neurología': {
        observaciones: [
            "Tratamiento profiláctico para migrañas crónicas.",
            "Medicación para manejo de síntomas de Parkinson.",
            "Receta de anticonvulsivantes para epilepsia.",
            "Manejo de neuropatía periférica diabética."
        ],
        motivos: [
            "Medicación requiere un informe neurológico actualizado para su aprobación.",
            "Se exceden las unidades máximas permitidas por receta.",
            "Falta el sello y firma del neurólogo tratante."
        ]
    },
    'Psiquiatría': {
        observaciones: [
            "Renovación de antidepresivos (ISRS).",
            "Manejo de trastorno bipolar, receta de estabilizador de ánimo.",
            "Ansiolíticos para tratamiento de ataque de pánico.",
            "Receta de medicación para TDAH en adultos."
        ],
        motivos: [
            "Medicamento de lista roja/estupefaciente requiere receta duplicada oficial.",
            "Falta la matrícula provincial en la receta digital.",
            "Psicofármaco no cubierto por la obra social para este diagnóstico específico."
        ]
    },
    'Oftalmología': {
        observaciones: [
            "Gotas para tratamiento de glaucoma (control de PIO).",
            "Indicación de lágrimas artificiales para ojo seco severo.",
            "Antibiótico tópico para conjuntivitis bacteriana.",
            "Medicación para degeneración macular asociada a la edad."
        ],
        motivos: [
            "Receta de lentes no es auditable por este canal, debe presentarse en óptica convenida.",
            "El fármaco solicitado requiere autorización de auditoría médica previa."
        ]
    },
    'Dermatología': {
        observaciones: [
            "Receta de corticoides tópicos para dermatitis atópica.",
            "Tratamiento oral para acné severo (isotretinoína).",
            "Cremas antimicóticas para pie de atleta.",
            "Protector solar de alta gama para paciente con lupus."
        ],
        motivos: [
            "Tratamiento con Isotretinoína requiere firma de consentimiento informado adjunto.",
            "El cosmético/crema solicitado no es considerado medicamento por la obra social.",
            "Falta diagnóstico claro en la receta."
        ]
    },
    'Endocrinología': {
        observaciones: [
            "Ajuste de dosis de levotiroxina para hipotiroidismo.",
            "Receta de insulina y medidor de glucemia para diabetes tipo 1.",
            "Medicación para osteoporosis (bifosfonatos).",
            "Tratamiento hormonal para menopausia."
        ],
        motivos: [
            "Resultados de TSH recientes (últimos 3 meses) requeridos para autorizar dosis alta.",
            "Falta CUIT del paciente para autorizar insumos de diabetes."
        ]
    },
    'Odontología': {
        observaciones: [
            "Receta de antibióticos por infección dental (amoxicilina).",
            "Analgésicos post-extracción dental.",
            "Enjuague bucal medicado para gingivitis.",
            "Gel tópico para aftas severas."
        ],
        motivos: [
            "El tratamiento odontológico debe ser auditado por el área de odontología.",
            "Medicación analgésica no requiere receta auditada, es de venta libre.",
            "Falta detalle del tratamiento realizado en la orden médica."
        ]
    },
    'Urología': {
        observaciones: [
            "Tratamiento para infección urinaria (Cistitis).",
            "Medicación para hiperplasia benigna de próstata (HBP).",
            "Analgésicos para cólico renal.",
            "Tratamiento para disfunción eréctil (requiere auditoría)."
        ],
        motivos: [
            "Medicación para disfunción eréctil no cubierta por plan básico.",
            "Falta urocultivo que justifique el antibiótico solicitado."
        ]
    },
    'Ginecología': { // Usado para Ginecología y Obstetricia
        observaciones: [
            "Renovación de anticonceptivos orales.",
            "Tratamiento para candidiasis vaginal (óvulos/crema).",
            "Vitaminas prenatales y ácido fólico para embarazo.",
            "Tratamiento hormonal de reemplazo (THR)."
        ],
        motivos: [
            "Marca de anticonceptivo solicitada es de alta gama, solo se cubre genérico/marca estándar.",
            "Falta fecha de la última consulta ginecológica en la solicitud."
        ]
    },
    'Nutrición': {
        observaciones: [
            "Suplementos vitamínicos por déficit nutricional.",
            "Leche maternizada especial para alergia a proteína de leche de vaca (APLV).",
            "Fórmula enteral para paciente con sonda nasogástrica.",
            "Medicación coadyuvante para manejo de obesidad."
        ],
        motivos: [
            "Suplemento requiere informe médico completo y estudios que justifiquen su uso.",
            "El producto solicitado es un alimento, no un medicamento cubierto por auditoría."
        ]
    },
    'Otorrinolaringología': {
        observaciones: [
            "Gotas óticas para otitis externa.",
            "Spray nasal corticoides para rinitis alérgica severa.",
            "Antibióticos orales para sinusitis aguda.",
            "Medicación para vértigo/mareos."
        ],
        motivos: [
            "El tratamiento para rinitis crónica debe ser gestionado por el área de alergología.",
            "Falta resultados de audiometría que justifiquen el tratamiento accesorio."
        ]
    },
    // Mapeos a claves existentes
    'Clínica Médica': TEXTOS_RECETAS['Medicina General'],
    'Guardia': TEXTOS_RECETAS['General'], // Las guardias suelen ser genéricas
    'Guardia 24hs': TEXTOS_RECETAS['General'],
    'Kinesiología': TEXTOS_RECETAS['General'], // Kine/Fisio no suelen recetar fármacos
    'Fisiatría': TEXTOS_RECETAS['General'],
    'Fonoaudiología': TEXTOS_RECETAS['General'],
    'Terapia Ocupacional': TEXTOS_RECETAS['General'],
    'Psicología': TEXTOS_RECETAS['Psiquiatría'], // Mismo tipo de auditoría
    'Obstetricia': TEXTOS_RECETAS['Ginecología'],
    'Pediatría Infantil': TEXTOS_RECETAS['Pediatría'],
    'Cardiología Infantil': TEXTOS_RECETAS['Cardiología'],
    // Las especialidades de estudios (Lab, Imagen) o complejas (Onco, UTI, Cirugía)
    // tendrán textos más genéricos ya que las recetas son muy específicas de cada caso
    'Análisis Clínicos': TEXTOS_RECETAS['General'],
   
    'Diagnóstico por Imágenes': TEXTOS_RECETAS['General'],
    'Cirugía General': TEXTOS_RECETAS['General'],
    'Terapia Intensiva': TEXTOS_RECETAS['General'],
    'Oncología': { 
        observaciones: [
            "Protocolo de quimioterapia adyuvante para cáncer de mama, ciclo 3/6.",
            "Renovación de medicación oral (inhibidor de tirosina quinasa) para leucemia mieloide crónica.",
            "Manejo de síntomas secundarios a radioterapia (cremas hidratantes, analgésicos).",
            "Receta de antieméticos (ondansetrón) para control de náuseas post-quimioterapia."
        ],
        motivos: [
            "Falta resumen de historia clínica y estadio actual de la enfermedad.",
            "La medicación oncológica solicitada requiere autorización previa de auditoría de alta complejidad (CUDAP/PMI).",
            "Se solicita marca comercial no cubierta; solo se autoriza genérico o marca de menor valor, con justificación médica."
        ]
    },
    'Patología': {
        observaciones: [
            "Solicitud de insumos para procesamiento de biopsia de ganglio linfático.",
            "Requerimiento de colorantes específicos para estudio inmunohistoquímico de muestra tumoral.",
            "Insumos para estudios anatomopatológicos de rutina."
        ],
        motivos: [
            "Insumo solicitado no está en el listado de cobertura por auditoría central.",
            "Falta la orden de estudio original del médico tratante que justifique el uso del insumo.",
            "Error administrativo en la solicitud interna del laboratorio."
        ]
    },

};

// Función helper para obtener texto realista
const getTextoReceta = (especialidad, tipoCampo) => {
    // Intenta usar la especialidad específica, si no, usa 'General' como fallback
    const textos = TEXTOS_RECETAS[especialidad] || TEXTOS_RECETAS['General'];
    return faker.helpers.arrayElement(textos[tipoCampo]);
};


module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. Consultamos datos maestros
        const medicos = await Prestador.findAll({
            where: { role: 'medico' },
            attributes: ['id', 'especialidades', 'centroId', 'nombre']
        });
        const afiliados = await Afiliado.findAll({ attributes: ['id'] });
        const integrantes = await db.Integrante.findAll({ attributes: ['id', 'afiliadoId'] }); // Usar db.Integrante aquí

        const todosLosPacientes = [
            ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })),
            ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId }))
        ];

        if (medicos.length === 0 || afiliados.length === 0) return;

        const recetasDataInput = [];
        const RANGO_MESES_HISTORICO = 6;

        for (const medico of medicos) {
            // Usamos solo la primera especialidad como la principal para la generación de textos
            const especialidadPrincipal = medico.especialidades && medico.especialidades.length > 0 ? medico.especialidades[0] : 'General';

            for (let m = 0; m < RANGO_MESES_HISTORICO; m++) {
                const fechaIteracion = new Date();
                fechaIteracion.setMonth(fechaIteracion.getMonth() - m);

                for (let d = 1; d <= 22; d++) {
                    fechaIteracion.setDate(d);
                    const numProcesadas = faker.number.int({ min: 2, max: 4 });

                    for (let s = 0; s < numProcesadas; s++) {
                        const paciente = faker.helpers.arrayElement(todosLosPacientes);
                        const estado = Math.random() < 0.6 ? faker.helpers.arrayElement(['aprobado', 'rechazado']) : faker.helpers.arrayElement(['en analisis', 'observado']);

                        recetasDataInput.push({
                            medicamento: faker.commerce.productName(),
                            cantidad: faker.number.int({ min: 1, max: 5 }),
                            presentacion: faker.helpers.arrayElement(['Caja x 20 comp', 'Gotas 15ml', 'Inyectable', 'Jarabe 100ml']),
                            observaciones: getTextoReceta(especialidadPrincipal, 'observaciones'),
                            estado: estado,
                            motivo: (estado === 'rechazado' || estado === 'observado') ? getTextoReceta(especialidadPrincipal, 'motivos') : null,
                            fecha_finalizacion: (estado === 'aprobado' || estado === 'rechazado') ? fechaIteracion : null,
                            usuarioUltimoCambio: medico.id,
                            prestadorId: medico.id,
                            afiliadoId: paciente.afiliadoIdFK,
                            integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
                            createdAt: faker.date.recent({ days: 10, refDate: fechaIteracion }),
                            updatedAt: fechaIteracion
                        });
                    }
                }
            }
        }

        await Receta.bulkCreate(recetasDataInput);
        console.log(`[V2 SEEDING - WORKFLOW] Cargadas ${recetasDataInput.length} recetas con ratios realistas por médico.`);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Recetas', null, {});
    }
};
