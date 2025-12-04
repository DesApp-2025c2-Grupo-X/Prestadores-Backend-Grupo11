'use strict';
const { Faker, es, es_MX } = require('@faker-js/faker');
const faker = new Faker({ locale: [es_MX, es] });
const db = require('../db/models/index');
const Reintegro = db.Reintegro;
const Prestador = db.Prestador;
const Afiliado = db.Afiliado;
const Integrante = db.Integrante; 

// --- BASES DE TEXTO PERSONALIZADAS PARA SEEDING ---
const TEXTOS_REINTEGROS = {
    'Kinesiología': {
        observaciones: [
            "Solicitud de reintegro por 10 sesiones de kinesiología por lumbalgia.",
            "Factura de fisioterapia por esguince de tobillo. Incluye 5 sesiones.",
            "Reintegro por tratamiento de rehabilitación post-operatoria de rodilla."
        ],
        motivos: [
            "Falta la indicación médica original (receta/orden médica).",
            "La factura no detalla las fechas de cada sesión individual.",
            "La especialidad del prestador no coincide con la práctica facturada."
        ]
    },
    'Laboratorio': {
        observaciones: [
            "Solicitud de reintegro por análisis clínicos de rutina (Hemograma, glucemia, colesterol).",
            "Factura de laboratorio por estudio de HIV y Hepatitis B/C.",
            "Reintegro por análisis de orina y cultivo, con antibiograma."
        ],
        motivos: [
            "El CUIT del laboratorio emisor no está registrado en nuestros sistemas.",
            "Falta la orden médica sellada y firmada por el profesional.",
            "El valor facturado excede el tope máximo de reintegro por práctica."
        ]
    },
    'Farmacia': {
        observaciones: [
            "Solicitud de reintegro por compra de medicamentos de uso crónico (hipertensión, diabetes).",
            "Factura de farmacia por antibióticos (Amoxicilina/Ácido clavulánico).",
            "Reintegro por compra de insulina y tiras reactivas para glucemia."
        ],
        motivos: [
            "La fecha de emisión de la receta es mayor a 30 días, está vencida.",
            "Falta el ticket de la farmacia que corrobore el CUIT y monto.",
            "El medicamento no está en el listado de cobertura por reintegro, solo por vademécum."
        ]
    },
    'Oftalmología': {
        observaciones: [
            "Solicitud de reintegro por consulta oftalmológica y fondo de ojos.",
            "Factura por compra de lentes recetados (armazón + cristales).",
            "Reintegro por estudio de campo visual y medición de presión ocular."
        ],
        motivos: [
            "Falta la receta original del oftalmólogo con la graduación de los lentes.",
            "La factura del armazón es de óptica, pero no se adjuntan los cristales.",
            "El reintegro por lentes se aprueba cada 2 años, el último fue hace 6 meses."
        ]
    },
    'Cardiología': {
        observaciones: [
            "Consulta cardiológica particular por riesgo cardiovascular.",
            "Reintegro por Holter 24hs o Ecocardiograma doppler.",
            "Estudios complementarios de ergometría para apto físico."
        ],
        motivos: [
            "La práctica solicitada requiere autorización previa, no es por reintegro directo.",
            "Falta informe médico que justifique la realización del estudio."
        ]
    },
    'Pediatría': {
        observaciones: [
            "Consulta pediátrica particular de control de niño sano.",
            "Reintegro por honorarios de pediatra a domicilio por urgencia febril.",
            "Estudios de curvas de crecimiento y desarrollo."
        ],
        motivos: [
            "No se aceptan reintegros por consultas a domicilio, solo en consultorio.",
            "Falta detalle de la consulta en la factura."
        ]
    },
    'Dermatología': {
        observaciones: [
            "Consulta dermatológica por control de lunares (dermatoscopía).",
            "Reintegro por biopsia de piel realizada en consultorio.",
            "Tratamiento de verrugas con nitrógeno líquido (sesión)."
        ],
        motivos: [
            "El tratamiento estético (peeling, láser) no es cubierto por reintegro.",
            "La práctica de biopsia requiere informe anatomopatológico adjunto."
        ]
    },
    'Ginecología': {
        observaciones: [
            "Consulta ginecológica particular anual y Papanicolaou.",
            "Reintegro por colocación de DIU.",
            "Estudios de monitoreo fetal (correa) en consultorio."
        ],
        motivos: [
            "Insumos (DIU) deben ser gestionados por farmacia, no por reintegro de práctica.",
            "Falta la orden médica que indique la práctica solicitada."
        ]
    },
    'Traumatología': {
        observaciones: [
            "Consulta traumatológica particular por dolor de hombro.",
            "Reintegro por infiltración con corticoides en rodilla.",
            "Lectura de estudios de RMN de columna."
        ],
        motivos: [
            "La infiltración no es una práctica de reintegro directo, requiere autorización.",
            "Falta factura por la lectura del estudio, solo se adjunta la del estudio de imágenes."
        ]
    },
    'Neurología': {
        observaciones: [
            "Consulta neurológica particular por cefaleas crónicas.",
            "Reintegro por realización de Electroencefalograma (EEG) en consultorio.",
            "Estudio de potenciales evocados visuales/auditivos."
        ],
        motivos: [
            "El estudio solicitado es de alta complejidad y requiere validación previa.",
            "Falta resumen de historia clínica para justificar el reintegro de la consulta."
        ]
    },
    'General': {
        observaciones: [
            "Solicitud de reintegro por gastos médicos varios.",
            "Factura por consulta médica particular, sin detalle de especialidad.",
            "Reintegro por insumos médicos menores no cubiertos por farmacia."
        ],
        motivos: [
            "No se adjunta el comprobante (factura/ticket B o C) válido.",
            "El beneficiario no posee 1 año de antigüedad mínimo para reintegros.",
            "Los datos de CBU/Transferencia están incompletos o son incorrectos."
        ]
    }
    // No incluyo Patología, Análisis Clínicos, Imágenes como especialidades de reintegro directo
    // ya que suelen gestionarse por Laboratorio/Estudios que ya están mapeados.
};

// Función helper para obtener texto realista
const getTextoReintegro = (especialidad, tipoCampo) => {
    // Intenta usar la especialidad específica, si no, usa 'General' como fallback
    const textos = TEXTOS_REINTEGROS[especialidad] || TEXTOS_REINTEGROS['General'];
    return faker.helpers.arrayElement(textos[tipoCampo]);
};


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const medicos = await Prestador.findAll({ where: { role: 'medico' }, attributes: ['id', 'centroId', 'nombre'] });
    
    const afiliadosTitulares = await Afiliado.findAll({ attributes: ['id'] });
    const listaAfiliados = afiliadosTitulares.map(a => ({ afiliadoId: a.id, integranteId: null }));

    const integrantes = await Integrante.findAll({ attributes: ['id'] });
    const listaIntegrantes = integrantes.map(i => ({ afiliadoId: null, integranteId: i.id }));

    if (medicos.length === 0 || afiliadosTitulares.length === 0) return;

    const todosLosBeneficiarios = [...listaAfiliados, ...listaIntegrantes];

    const reintegrosDataInput = [];
    const formasPago = ['cheque', 'efectivo', 'transferencia'];
    const RANGO_MESES_HISTORICO = 6;
    const CANTIDAD_SOLICITUDES_X_DIA = { min: 1, max: 2 }; 
    // Lista ampliada de especialidades disponibles para reintegro
    const especialidadesDisponibles = Object.keys(TEXTOS_REINTEGROS).filter(key => key !== 'General');

    for (const medico of medicos) {
      for (let m = 0; m < RANGO_MESES_HISTORICO; m++) {
        const fechaIteracion = new Date();
        fechaIteracion.setMonth(fechaIteracion.getMonth() - m);
        for (let d = 1; d <= 22; d++) { 
          fechaIteracion.setDate(d);
          const numProcesadas = faker.number.int(CANTIDAD_SOLICITUDES_X_DIA);

          for (let s = 0; s < numProcesadas; s++) {
            const beneficiario = faker.helpers.arrayElement(todosLosBeneficiarios);
            const estado = Math.random() < 0.7 ? faker.helpers.arrayElement(['aprobado', 'rechazado']) : faker.helpers.arrayElement(['en analisis', 'observado']);
            const especialidadSeleccionada = faker.helpers.arrayElement(especialidadesDisponibles);

            reintegrosDataInput.push({
              fecha_prestacion: faker.date.past({ months: 3, refDate: fechaIteracion }),
              afiliadoId: beneficiario.afiliadoId, 
              integranteId: beneficiario.integranteId, 
              medico: faker.person.fullName(), // Nombre del prestador que emite la factura
              especialidad: especialidadSeleccionada, 
              factura_fecha: faker.date.past({ months: 2, refDate: fechaIteracion }),
              factura_cuit: faker.finance.bic(),
              factura_valor: faker.number.float({ min: 1000, max: 50000, precision: 0.01 }),
              factura_persona: faker.person.fullName(), // Nombre en la factura, a veces es el paciente/familiar
              forma_pago: faker.helpers.arrayElement(formasPago),
              cbu: (faker.helpers.arrayElement(formasPago) === 'transferencia') ? faker.finance.iban() : null,
              observaciones: getTextoReintegro(especialidadSeleccionada, 'observaciones'),
              estado: estado,
              motivo: (estado === 'rechazado' || estado === 'observado') ? getTextoReintegro(especialidadSeleccionada, 'motivos') : null,
              fecha_finalizacion: (estado === 'aprobado' || estado === 'rechazado') ? fechaIteracion : null,
              usuarioUltimoCambio: medico.id, // ID del auditor/admin que procesó (puede ser un médico admin)
              createdAt: faker.date.recent({ days: 10, refDate: fechaIteracion }),
              updatedAt: fechaIteracion
            });
          }
        }
      }
    }

    await Reintegro.bulkCreate(reintegrosDataInput);
    console.log(`[V2 SEEDING - WORKFLOW] Cargados ${reintegrosDataInput.length} reintegros (incluyendo titulares e integrantes) con ratios realistas.`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reintegros', null, {});
  }
};
