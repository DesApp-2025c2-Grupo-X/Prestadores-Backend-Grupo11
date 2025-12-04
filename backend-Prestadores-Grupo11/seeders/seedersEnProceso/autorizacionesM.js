'use strict';
const { Faker, es, es_MX } = require('@faker-js/faker');
const faker = new Faker({ locale: [es_MX, es] });
const db = require('../db/models/index');
const Autorizacion = db.Autorizacion;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante;

// --- BASES DE TEXTO PERSONALIZADAS PARA SEEDING ---
const TEXTOS_AUTORIZACIONES = {
    'Cirugía General': { // Usado para Cirugía General, Pediátrica, Cardiovascular
        observaciones: [
            "Solicitud de autorización para colecistectomía laparoscópica programada.",
            "Requiere autorización para cirugía de hernia inguinal bilateral con colocación de malla.",
            "Autorización para by-pass coronario (4 puentes) urgente. Paciente internado en UCO.",
            "Solicitud de material descartable para apendicetomía de urgencia."
        ],
        motivos: [
            "Falta resumen de historia clínica completo y resultados de prequirúrgico.",
            "Material solicitado no es el estándar cubierto por el plan del afiliado. Se autoriza material alternativo.",
            "Se requiere interconsulta con cardiología/neumonología antes de autorizar la cirugía mayor."
        ]
    },
    'Traumatología': {
        observaciones: [
            "Solicitud de autorización para reemplazo total de cadera (prótesis).",
            "Autorización para cirugía artroscópica de meniscos por rotura traumática.",
            "Material de osteosíntesis para fractura expuesta de tibia y peroné.",
            "Autorización de 15 sesiones de kinesiología post-operatorias."
        ],
        motivos: [
            "Falta presupuesto detallado de la prótesis a utilizar (marca, modelo).",
            "Requiere auditoría médica presencial del caso antes de la cirugía.",
            "Kinesiología se autoriza por módulo de 5 sesiones, no 15 juntas. Reenviar solicitud."
        ]
    },
    'Oncología': { // Usado para Oncología y Oncología Pediátrica
        observaciones: [
            "Solicitud de tratamiento de quimioterapia específico (PMI - Plan Materno Infantil).",
            "Autorización de medicación oncológica de alto costo (uso compasivo).",
            "Autorización de ciclo de radioterapia externa para cáncer de próstata.",
            "Autorización de internación para quimioterapia endovenosa."
        ],
        motivos: [
            "La medicación requiere CUDAP (Certificado Único de Discapacidad/Afiliación Provincial) para cobertura 100%.",
            "Falta consentimiento informado firmado por el paciente para el tratamiento propuesto.",
            "El protocolo de tratamiento no es el estándar de cobertura. Requerimos justificación del comité oncológico."
        ]
    },
    'Cardiología': {
        observaciones: [
            "Solicitud de autorización para colocación de stent coronario.",
            "Autorización de marcapasos definitivo (generador y electrodos).",
            "Estudio de alta complejidad: Cateterismo cardíaco con cinecoronariografía.",
            "Internación para estudio electrofisiológico."
        ],
        motivos: [
            "Falta informe de riesgo quirúrgico y estudios pre-procedimiento.",
            "El material solicitado (stent liberador de droga) no está en el listado de cobertura. Se autoriza stent convencional.",
            "Se requiere validación de la UCO (Unidad Coronaria) antes de autorizar el procedimiento invasivo."
        ]
    },
    'Nefrología': { // Usado para Nefrología y Trasplantes
        observaciones: [
            "Autorización de inicio de hemodiálisis crónica (3 veces por semana).",
            "Solicitud de trasplante renal. Paciente en lista de espera INCUCAI.",
            "Autorización de medicación inmunosupresora post-trasplante.",
            "Biopsia renal percutánea programada."
        ],
        motivos: [
            "Falta empadronamiento del paciente en el programa de diálisis/trasplante provincial.",
            "Medicación inmunosupresora requiere auditoría mensual para renovación de autorización.",
            "El centro de diálisis solicitado no es prestador directo de la obra social."
        ]
    },
    'General': {
        observaciones: [
            "Solicitud de internación general por diagnóstico a confirmar.",
            "Autorización de estudios de alta complejidad (RMN, TAC con contraste).",
            "Solicitud de material descartable para procedimiento menor en consultorio.",
            "Autorización de traslado en ambulancia de alta complejidad."
        ],
        motivos: [
            "La internación no está justificada médicamente para el diagnóstico preliminar.",
            "Falta orden médica y justificación clínica clara del estudio solicitado.",
            "El traslado en ambulancia solo se autoriza para emergencias, no para traslados programados."
        ]
    }
};

// Función helper para obtener texto realista
const getTextoAutorizacion = (especialidad, tipoCampo) => {
    // Si la especialidad no existe, usa 'General' como fallback
    const textos = TEXTOS_AUTORIZACIONES[especialidad] || TEXTOS_AUTORIZACIONES['General'];
    return faker.helpers.arrayElement(textos[tipoCampo]);
};


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const medicos = await Prestador.findAll({ where: { role: 'medico' }, attributes: ['id', 'centroId', 'nombre'] });
    const afiliados = await Afiliado.findAll({ attributes: ['id'] });
    const integrantes = await Integrante.findAll({ attributes: ['id', 'afiliadoId'] });
    const todosLosPacientes = [
      ...afiliados.map(a => ({ tipo: 'afiliado', id: a.id, afiliadoIdFK: a.id })),
      ...integrantes.map(i => ({ tipo: 'integrante', id: i.id, afiliadoIdFK: i.afiliadoId }))
    ];

    if (medicos.length === 0 || afiliados.length === 0) return;

    const autorizacionesDataInput = [];
    const RANGO_MESES_HISTORICO = 6;
    const CANTIDAD_SOLICITUDES_X_DIA = { min: 0, max: 1 }; 
    const especialidadesDisponibles = Object.keys(TEXTOS_AUTORIZACIONES).filter(key => key !== 'General');


    for (const medico of medicos) {
      for (let m = 0; m < RANGO_MESES_HISTORICO; m++) {
        const fechaIteracion = new Date();
        fechaIteracion.setMonth(fechaIteracion.getMonth() - m);

        for (let d = 1; d <= 22; d++) { 
          fechaIteracion.setDate(d);
          const numProcesadas = faker.number.int(CANTIDAD_SOLICITUDES_X_DIA);

          for (let s = 0; s < numProcesadas; s++) {
            const paciente = faker.helpers.arrayElement(todosLosPacientes);
            const estado = Math.random() < 0.5 ? faker.helpers.arrayElement(['aprobado', 'rechazado']) : faker.helpers.arrayElement(['en analisis', 'observado']);
            const especialidadSeleccionada = faker.helpers.arrayElement(especialidadesDisponibles);
            
            autorizacionesDataInput.push({
                fecha_prevista: faker.date.future({ months: 3, refDate: fechaIteracion }), 
                integranteId: paciente.tipo === 'integrante' ? paciente.id : null, 
                afiliadoId: paciente.afiliadoIdFK, 
                medico: faker.person.fullName(), // El médico que solicita la autorización
                especialidad: especialidadSeleccionada, // La especialidad de la práctica
                // Días de internación solo si tiene sentido para la especialidad (ej. Cirugía, Cardio)
                dias_internacion: ['Cirugía General', 'Cardiología', 'Nefrología'].includes(especialidadSeleccionada) ? faker.number.int({ min: 1, max: 10 }) : faker.number.int({ min: 0, max: 1 }),
                // Usamos textos realistas aquí
                observaciones: getTextoAutorizacion(especialidadSeleccionada, 'observaciones'),
                estado: estado, 
                // Usamos textos realistas aquí para motivos de rechazo/observación
                motivo: (estado === 'rechazado' || estado === 'observado') ? getTextoAutorizacion(especialidadSeleccionada, 'motivos') : null, 
                fecha_finalizacion: (estado === 'aprobado' || estado === 'rechazado') ? fechaIteracion : null, 
                usuarioUltimoCambio: medico.id, // El ID del auditor/admin que gestiona la autorización
                createdAt: faker.date.recent({ days: 10, refDate: fechaIteracion }),
                updatedAt: fechaIteracion
            });
          }
        }
      }
    }

    await Autorizacion.bulkCreate(autorizacionesDataInput);
    console.log(`[V2 SEEDING - WORKFLOW] Cargadas ${autorizacionesDataInput.length} autorizaciones con ratios realistas.`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Autorizacions', null, {});
  }
};
