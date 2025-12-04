'use strict';
const { faker } = require('@faker-js/faker');
faker.locale = 'es';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('GENERANDO 75.000 TURNOS + 3.000 FUTUROS - HIPERREALISMO ARGENTINO 2025');

    const [medicosRaw] = await queryInterface.sequelize.query(`SELECT id, nombre, "centroId", especialidades FROM "Prestadors" WHERE role = 'medico'`);
    const [centros] = await queryInterface.sequelize.query(`SELECT id, nombre FROM "Prestadors" WHERE role = 'centro_medico'`);
    const [afiliados] = await queryInterface.sequelize.query(`SELECT id, nombre, apellido, dni, edad FROM "Afiliados"`);
    const [integrantes] = await queryInterface.sequelize.query(`SELECT id, nombre, apellido, dni, edad FROM "Integrantes"`);

    const centrosMap = Object.fromEntries(centros.map(c => [c.id, c.nombre]));
    const beneficiarios = [...afiliados.map(a => ({ ...a, tipo: 'titular' })), ...integrantes.map(i => ({ ...i, tipo: 'integrante' }))];
    const medicos = medicosRaw.map(m => ({ ...m, nombreCompleto: m.nombre.includes('Dr.') ? m.nombre : `Dr/a. ${m.nombre}` }));

    const seleccionar = (arr) => faker.helpers.arrayElement(arr);

    const especialidades = {
      'Medicina General': {
        motivos: ['Fiebre + odinofagia 3-7 días','Dolor lumbar mecánico tras esfuerzo','Control HTA + dislipemia','Tos seca persistente >3 semanas','Cefalea tensional crónica','Control de salud anual','Dolor abdominal tipo cólico','Mareos + inestabilidad','Renovación receta crónica','Dolor torácico atípico','Disnea de esfuerzo reciente','Artralgias generalizadas'],
        diagnosticos: [
          ['presuntivo','Se sospecha faringoamigdalitis bacteriana'],
          ['definitivo','Faringoamigdalitis aguda (J03.0)'],
          ['presuntivo','Posible lumbalgia mecánica'],
          ['definitivo','Lumbalgia mecánica (M54.5)'],
          ['presuntivo','Hipertensión arterial no controlada'],
          ['definitivo','Hipertensión esencial (I10)'],
          ['presuntivo','Posible ansiedad generalizada'],
          ['definitivo','Ansiedad generalizada (F41.1)']
        ],
        anamnesis: ['Refiere inicio brusco con fiebre 38.5°C y dolor faríngeo intenso. Niega disnea.','Dolor lumbar tras levantar peso hace 10 días. Niega irradiación ni parestesias.','Control programado. Niega nuevos síntomas. Toma Losartán 50 mg + Atorvastatina 20 mg.','Tos seca de 4 semanas. Niega fiebre ni expectoración. Fumador 20 cig/día.','Paciente refiere mareos asociados a cambios posturales.','Consulta para renovación de receta de medicación crónica.'],
        fisicoBase: ['TA 138/86 mmHg, FC 78 lpm, T° 38.2°C, Sat 97%, FR 16 rpm','TA 150/95 mmHg, FC 88 lpm, T° 36.7°C, Sat 96%, FR 14 rpm','TA 128/78 mmHg, FC 72 lpm, T° 36.5°C, Sat 98%, FR 14 rpm'],
        fisicoEspecifico: ['Orofaringe eritematosa con exudado.','Contractura paravertebral L4-L5. Lasègue negativo. Fuerza 5/5.','ACP rítmico sin soplos. Abdomen blando depresible.','Fondo de ojo grado I.'],
        estudios: ['Hemograma + VES + PCR','Perfil lipídico + glucemia + HbA1c','Rx columna lumbosacra','ECG 12 derivaciones','MAPA 24 hs','No se indican estudios complementarios'],
        planes: ['Amoxicilina 1 g c/8 hs x 7 días + Ibuprofeno 600 mg SOS + Control 72 hs','Losartán 100 mg + Atorvastatina 40 mg nocturna + AAS 100 mg + Control 1 mes','Meloxicam 15 mg 1/día x 10 días + Reposo relativo + Kinesiología 15 sesiones','Paracetamol 1 g c/8 hs + Reposo + Control en 5 días','Enalapril 20 mg c/12 hs + Hidroclorotiazida 12.5 mg + Control TA domiciliario','Control clínico en 3 meses + Educación en salud']
      },
      'Guardia': {
        motivos: ['Dolor abdominal intenso + vómitos','Dolor precordial opresivo','Traumatismo craneoencefálico','Convulsión generalizada','Fiebre alta + rash','Disnea aguda','Síncope','Hemorragia digestiva'],
        diagnosticos: [['presuntivo','Se sospecha abdomen agudo'],['definitivo','Abdomen agudo quirúrgico (R10.0)'],['presuntivo','Posible síndrome coronario'],['definitivo','Síndrome coronario agudo (I24.9)']],
        anamnesis: ['Paciente refiere inicio súbito de dolor abdominal intenso.','Dolor precordial opresivo irradiado a brazo izquierdo.','Caída desde altura con pérdida de conciencia.'],
        fisicoBase: ['TA 90/60 mmHg, FC 120 lpm, T° 37.8°C, Sat 94%','TA 180/110 mmHg, FC 110 lpm, T° 36.6°C, Sat 96%'],
        fisicoEspecifico: ['Abdomen rígido, doloroso a la palpación, Blumberg positivo.','Diaforesis profusa, palidez cutánea.','Glasgow 14 puntos, pupilas isocóricas reactivas.'],
        estudios: ['Ecografía abdominal urgente','ECG 12 derivaciones + troponinas','TAC cerebral'],
        planes: ['Internación clínica médica','Código infarto - Traslado hemodinamia','TAC cerebro urgente']
      },
      'Pediatría': {
        motivos: ['Fiebre alta + tos 4 días','Control niño sano 2 años','Vómitos + diarrea 3 días','Broncoespasmo recurrente','Convulsión febril'],
        diagnosticos: [['presuntivo','Se sospecha bronquiolitis'],['definitivo','Bronquiolitis viral (J21.9)'],['presuntivo','Posible gastroenteritis'],['definitivo','Gastroenteritis aguda (A09)']],
        anamnesis: ['Madre refiere fiebre 39.5°C desde ayer, tos perruna y decaimiento.','Niño asintomático, vacunas al día, percentil 60 peso/talla.'],
        fisicoBase: ['T° 39.2°C, FC 145 lpm, FR 48 rpm, Sat 92%','T° 36.6°C, FC 110 lpm, FR 28 rpm, Sat 99%'],
        fisicoEspecifico: ['Tiraje intercostal ++, sibilancias difusas, aleteo nasal.','Buen estado general, peso 12.8 kg, fontanela normotensa, ORL normal.'],
        estudios: ['Rx tórax','Hemograma + PCR + ionograma'],
        planes: ['Salbutamol nebulización c/4 hs + Prednisona 2 mg/kg/día x 5 días + Control mañana','SRO ad libitum + Zinc 20 mg/día x 14 días']
      },
      'Traumatología': {
        motivos: ['Esguince tobillo grado II-III','Lumbociatalgia aguda','Fractura radio distal','Hombro doloroso post trauma'],
        diagnosticos: [['presuntivo','Se sospecha esguince ligamentoso lateral'],['definitivo','Esguince ligamento lateral tobillo (S93.4)'],['presuntivo','Posible hernia discal L5-S1'],['definitivo','Hernia discal L5-S1 (M51.1)']],
        anamnesis: ['Torcedura jugando fútbol. Dolor intenso e impotencia funcional.','Dolor irradiado a pie derecho + parestesias 1er-3er dedo.'],
        fisicoBase: ['TA 130/80 mmHg, FC 76 lpm, T° 36.7°C','TA 135/85 mmHg, FC 80 lpm, T° 36.6°C'],
        fisicoEspecifico: ['Edema maleolar ++, equimosis, cajón anterior positivo, Ottawa positivo.','Lasègue + 30° derecha, hipoestesia L5, fuerza 4+/5 en flexión plantar.'],
        estudios: ['Rx tobillo 3 proyecciones','RMN lumbosacra'],
        planes: ['Inmovilización bota Walker 21 días + Crioterapia + Ibuprofeno 600 mg c/8 hs','Pregabalina 150 mg nocturna + Diclofenac 75 mg c/12 hs + Bloqueo facetario si no mejora']
      },
      'Cardiología': {
        motivos: ['Dolor precordial opresivo esfuerzo','Control HTA grado 2','Fibrilación auricular nueva','Disnea clase III NYHA'],
        diagnosticos: [['presuntivo','Se sospecha angina inestable'],['definitivo','Síndrome coronario agudo (I24.9)'],['presuntivo','Hipertensión grado 2 no controlada'],['definitivo','Hipertensión arterial grado 2 (I10)']],
        anamnesis: ['Dolor precordial opresivo de 30 min relacionado con esfuerzo.','Paciente con HTA conocida, refiere cefalea matinal.'],
        fisicoBase: ['TA 160/100 mmHg, FC 92 lpm, Sat 95%','TA 148/94 mmHg, FC 68 lpm, Sat 97%'],
        fisicoEspecifico: ['ACP rítmico sin soplos, tercer ruido audible, ingurgitación yugular 3 cm.','Estertores crepitantes bibasales, edemas maleolares ++.'],
        estudios: ['ECG 12 derivaciones + troponinas','Ecocardiograma transtorácico'],
        planes: ['AAS 100 mg + Clopidogrel 75 mg carga + Heparina EV + Coronariografía urgente','Losartán/HCTZ 100/25 mg + Amlodipino 10 mg + MAPA 24 hs']
      }
    };

    const evolucionesPorEspecialidad = {
      'Medicina General': ['Franca mejoría clínica. Se da alta definitiva.','Paciente asintomático. Control anual programado.','Persiste leve dolor residual. Se ajusta dosis y control en 30 días.','Se recibe laboratorio con HbA1c 6.8% → se intensifica tratamiento.','Paciente trae autorización OSDE aprobada. Se agenda estudio.'],
      'Guardia': ['Paciente estable tras manejo inicial. Alta de guardia con indicaciones.','Código infarto activado. Traslado a hemodinamia exitoso.','Sin nuevas crisis convulsivas. Alta con antiepilépticos.'],
      'Pediatría': ['Cuadro viral autolimitado resuelto. Alta definitiva.','Buena evolución post bronquiolitis. Retiro oxígeno domiciliario.','Control niño sano normal. Vacunas al día.'],
      'Traumatología': ['Evolución favorable post inmovilización. Inicia fase II kinesiología.','Consolidación ósea adecuada. Retiro de yeso programado.','Persiste dolor radicular → derivación a Neurocirugía.'],
      'Cardiología': ['Paciente asintomático clase funcional I. Control anual.','Buena respuesta a betabloqueadores. Se reduce dosis carvedilol.','Coronariografía limpia. Alta cardiológica.'],
      'default': ['Evolución favorable. Continuar tratamiento indicado.','Paciente asintomático. Se da alta evolutiva.']
    };

    const generarNota = (turnoBase, medico, paciente, centro) => {
      const arch = turnoBase.archivedAt;
      const fechaArch = arch.toLocaleDateString('es-AR');
      const horaArch = arch.toLocaleTimeString('es-AR', {hour:'2-digit',minute:'2-digit'});
      const esp = medico.especialidades?.[0] || 'Medicina General';
      const c = especialidades[esp] || especialidades['Medicina General'];
      const evols = evolucionesPorEspecialidad[esp] || evolucionesPorEspecialidad.default;

      const nombre = `${paciente.nombre} ${paciente.apellido || ''}`.trim();
      const edad = paciente.edad || 42;

      const motivo = seleccionar(c.motivos);
      const diagArray = seleccionar(c.diagnosticos);
      const diagnostico = diagArray[0] === 'presuntivo' ? `Se sospecha ${diagArray[1].toLowerCase()}` : diagArray[1];
      const anam = seleccionar(c.anamnesis);
      const vitales = seleccionar(c.fisicoBase);
      const especifico = seleccionar(c.fisicoEspecifico);
      const estudio = seleccionar(c.estudios);
      const plan = seleccionar(c.planes);

      const conEstudio = !estudio.includes('No') && faker.datatype.boolean(0.8);
      const estudioTxt = conEstudio ? `${estudio} - Programado ${faker.date.between({from: arch, to: new Date(arch.getTime() + 30*24*60*60*1000)}).toLocaleDateString('es-AR')}` : estudio;

      const tieneSeguimiento = faker.datatype.boolean(0.88);
      const proximoControl = tieneSeguimiento ? `\n• Próximo control: ${faker.date.between({from: new Date(arch.getTime() + 20*24*60*60*1000), to: new Date(arch.getTime() + 150*24*60*60*1000)}).toLocaleDateString('es-AR')}` : '';

      const planFormateado = plan.split('+').map(p => `• ${p.trim()}`).join('\n') + proximoControl;

      const cantidadEvoluciones = faker.helpers.weightedArrayElement([
        {weight:55,value:0},{weight:25,value:1},{weight:12,value:2},{weight:6,value:3},{weight:2,value:faker.number.int({min:4,max:7})}
      ]);

      let evolucionesTexto = '';
      let ultimaFecha = arch;
      if (cantidadEvoluciones > 0) {
        for (let i = 0; i < cantidadEvoluciones; i++) {
          const dias = cantidadEvoluciones === 1 ? faker.number.int({min:7,max:21}) :
                       cantidadEvoluciones === 2 ? faker.number.int({min:22,max:50}) :
                       cantidadEvoluciones === 3 ? faker.number.int({min:51,max:100}) :
                       faker.number.int({min:101,max:365});
          const fechaEvol = new Date(ultimaFecha.getTime() + dias*24*60*60*1000);
          evolucionesTexto += `\n\nEvolución (${fechaEvol.toLocaleDateString('es-AR')}):\n${seleccionar(evols)}`;
          ultimaFecha = fechaEvol;
        }
      }

      turnoBase.modifiedAt = cantidadEvoluciones > 0 ? ultimaFecha : arch;
      const ultimaModif = cantidadEvoluciones > 0
        ? `${ultimaFecha.toLocaleDateString('es-AR')} ${ultimaFecha.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})} hs`
        : `${fechaArch} ${horaArch} hs`;

      return `
${fechaArch} ${horaArch} hs
${centro}
Médico: ${medico.nombreCompleto} - ${esp}

Paciente: ${nombre} | DNI ${paciente.dni?.toLocaleString('es-AR') || 'S/D'} | ${edad} años

Motivo de consulta:
${motivo}

Anamnesis:
${anam}

Examen físico:
${vitales}. ${especifico}

Estudios complementarios:
${estudioTxt}

Diagnóstico:
${diagnostico}

Plan:
${planFormateado}${evolucionesTexto}

Última modificación: ${ultimaModif}
`.trim();
    };

    const turnos = [];

    for (let i = 0; i < 72000; i++) {
      const medico = faker.helpers.arrayElement(medicos);
      const paciente = faker.helpers.arrayElement(beneficiarios);
      const centro = centrosMap[medico.centroId] || 'Centro Médico Central';

      const start = faker.date.between({from:'2015-01-01',to:new Date()});
      start.setHours(faker.number.int({min:8,max:19}));
      start.setMinutes(faker.helpers.arrayElement([0,15,30,45]));

      const duration = faker.helpers.arrayElement([20,30,40,60]);
      const finTurno = new Date(start.getTime() + duration*60*1000);
      const offsetMin = faker.number.int({min:-10,max:15});
      const archivedAt = new Date(finTurno.getTime() + offsetMin*60*1000);

      const turno = {
        date: faker.date.between({from:new Date(start.getTime()-90*24*60*60*1000),to:start}),
        start,
        duration,
        archivedAt,
        modifiedAt: archivedAt,
        descripcion: 'Consulta médica',
        afiliadoId: paciente.tipo==='titular'?paciente.id:null,
        integranteId: paciente.tipo==='integrante'?paciente.id:null,
        prestadorId: medico.id,
        centroId: medico.centroId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      turno.notes = generarNota(turno, medico, paciente, centro);
      turnos.push(turno);

      if (i % 10000 === 0) console.log(`${i}/72000 turnos generados...`);
    }

    for (let i = 0; i < 3000; i++) {
      const medico = faker.helpers.arrayElement(medicos);
      const start = faker.date.soon({days:120});
      start.setHours(faker.number.int({min:8,max:19}));
      start.setMinutes(faker.helpers.arrayElement([0,30]));

      turnos.push({
        date: faker.date.recent({days:20}),
        start,
        duration: 30,
        archivedAt: null,
        modifiedAt: null,
        notes: null,
        descripcion: 'Turno reservado',
        afiliadoId: null,
        integranteId: null,
        prestadorId: medico.id,
        centroId: medico.centroId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Turnos', turnos);
    console.log('¡75.000 TURNOS HIPERREALISTAS COMPLETADOS!');
  },

  down: async (queryInterface) => queryInterface.bulkDelete('Turnos', null, {})
};