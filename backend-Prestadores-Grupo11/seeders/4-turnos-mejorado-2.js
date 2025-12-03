'use strict';
const { faker } = require('@faker-js/faker');
faker.locale = 'es';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const [medicosRaw] = await queryInterface.sequelize.query(`SELECT id, nombre, "centroId", especialidades FROM "Prestadors" WHERE role = 'medico'`);
        const [centros] = await queryInterface.sequelize.query(`SELECT id, nombre FROM "Prestadors" WHERE role = 'centro_medico'`);
        const [afiliados] = await queryInterface.sequelize.query(`SELECT id, nombre, apellido, dni, edad FROM "Afiliados"`);
        const [integrantes] = await queryInterface.sequelize.query(`SELECT id, nombre, apellido, dni, edad FROM "Integrantes"`);

        const centrosMap = Object.fromEntries(centros.map(c => [c.id, c.nombre]));
        const beneficiarios = [...afiliados.map(a => ({ ...a, tipo: 'titular' })), ...integrantes.map(i => ({ ...i, tipo: 'integrante' }))];
        const medicos = medicosRaw.map(m => ({ ...m, nombreCompleto: m.nombre.includes('Dr.') ? m.nombre : `Dr/a. ${m.nombre}` }));

        const especialidades = {
            'Medicina General': {
                motivos: ['Control de salud anual', 'Fiebre + odinofagia', 'Dolor lumbar mecánico', 'Renovación receta crónica', 'Tos persistente', 'Cefalea tensional', 'Control HTA/diabetes/dislipemia', 'Dolor abdominal', 'Mareos'],
                diagnosticos: [['presuntivo', 'Faringoamigdalitis bacteriana'], ['definitivo', 'Faringoamigdalitis aguda (J03)'], ['presuntivo', 'Lumbalgia mecánica'], ['definitivo', 'Lumbalgia (M54.5)'], ['presuntivo', 'HTA no controlada'], ['definitivo', 'Hipertensión esencial (I10)'], ['presuntivo', 'Diabetes tipo 2 descompensada'], ['definitivo', 'Diabetes mellitus tipo 2 (E11)']],
                anamnesis: ['Dolor faríngeo + fiebre 38.5°C hace 3 días', 'Dolor lumbar tras levantar peso', 'Control programado, asintomático', 'Tos seca hace 4 semanas, fumador 20 cig/día', 'Cefalea frontal pulsátil + fotofobia'],
                vitales: ['TA 135/85 mmHg, FC 78 lpm, T° 38.2°C, Sat 97%', 'TA 148/92 mmHg, FC 72 lpm, T° 36.6°C, Sat 98%', 'TA 128/80 mmHg, FC 70 lpm, T° 36.5°C, Sat 99%'],
                fisico: ['Orofaringe hiperémica con exudado', 'Contractura paravertebral lumbar', 'ACP rítmico sin soplos, abdomen blando', 'Murmullo vesicular conservado'],
                estudios: ['Hemograma + PCR + exudado faríngeo', 'Rx lumbosacra AP/L', 'ECG + perfil lipídico', 'No se indican estudios', 'HbA1c + fondo de ojo'],
                planes: ['Amoxicilina 1g c/8hs x7 días + ibuprofeno', 'Reposo + kinesiología 15 sesiones', 'Optimizar losartán + añadir estatina', 'Control en 30 días']
            },

            'Guardia': {
                motivos: ['Dolor precordial opresivo', 'Dolor abdominal intenso', 'Trauma craneoencefálico', 'Convulsión generalizada', 'Disnea aguda + fiebre'],
                diagnosticos: [['presuntivo', 'Síndrome coronario agudo'], ['definitivo', 'IAMCEST (I21)'], ['presuntivo', 'Abdomen agudo'], ['definitivo', 'Apendicitis aguda (K35)'], ['presuntivo', 'Neumonía comunitaria']],
                anamnesis: ['Dolor torácico irradiado a brazo izquierdo + diaforesis', 'Dolor en FID + vómitos + fiebre 38.5°C', 'Accidente de moto, casco puesto, pérdida de conocimiento 3 min'],
                vitales: ['TA 90/60 mmHg, FC 125 lpm, Sat 91%', 'TA 180/110 mmHg, FC 115 lpm, Sat 96%', 'TA 100/70 mmHg, FC 110 lpm, Sat 94%'],
                fisico: ['Palidez, diaforesis profusa, crepitantes basales', 'Defensa abdominal, Blumberg positivo', 'Glasgow 14, hematoma frontal'],
                estudios: ['Troponinas ultrasensibles + ECG seriado', 'Ecografía FAST', 'TAC cerebro sin contraste'],
                planes: ['Código infarto activado', 'Internación quirúrgica urgente', 'Internación UTI']
            },

            'Guardia 24hs': {
                motivos: ['Código infarto', 'ACV isquémico', 'Shock séptico', 'EAP grave'],
                diagnosticos: [['presuntivo', 'IAMCEST'], ['definitivo', 'Infarto agudo de miocardio (I21)'], ['presuntivo', 'ACV isquémico'], ['definitivo', 'Infarto cerebral (I63)']],
                anamnesis: ['Dolor torácico típico 90 min de evolución', 'Déficit motor brusco hemicuerpo derecho + afasia', 'Fiebre + hipotensión refractaria + foco urinario'],
                vitales: ['TA 80/50 mmHg, FC 140 lpm, Sat 88%', 'TA 190/100 mmHg, FC 110 lpm, Sat 95%'],
                fisico: ['Cianosis central, crepitantes bibasales', 'Hemiparesia 0/5, Babinski positivo'],
                estudios: ['ECG urgente', 'TAC cerebral sin contraste', 'Hemocultivos + lactato'],
                planes: ['Trombolisis + hemodinamia', 'Stroke Unit', 'Antibióticos amplio espectro + noradrenalina']
            },

            'Pediatría': {
                motivos: ['Fiebre + tos', 'Control niño sano', 'Diarrea + vómitos', 'Broncoespasmo', 'Convulsión febril'],
                diagnosticos: [['presuntivo', 'Bronquiolitis viral'], ['definitivo', 'Bronquiolitis (J21)'], ['presuntivo', 'Gastroenteritis viral'], ['definitivo', 'Gastroenteritis (A09)']],
                anamnesis: ['Lactante 7 meses, tos perruna + dificultad respiratoria', 'Niño sano, vacunas al día', '12 deposiciones líquidas + vómitos biliosos'],
                vitales: ['T° 39.1°C, FC 165 lpm, FR 58 rpm, Sat 90%', 'T° 36.6°C, FC 110 lpm, Sat 99%'],
                fisico: ['Tiraje subcostal, sibilancias difusas', 'Peso percentil 55, fontanela normotensa', 'Signos de deshidratación moderada'],
                estudios: ['Rx tórax', 'Ionograma + uremia', 'No se indican'],
                planes: ['Nebulizaciones + corticoides sistémicos', 'SRO + zinc 20mg/día', 'Dieta astringente + probióticos']
            },

            'Traumatología': {
                motivos: ['Esguince de tobillo', 'Lumbociatalgia', 'Fractura radio distal', 'Hombro doloroso postraumático'],
                diagnosticos: [['presuntivo', 'Esguince grado II'], ['definitivo', 'Esguince tobillo (S93.4)'], ['presuntivo', 'Hernia discal L5-S1'], ['definitivo', 'Ciatalgia (M54.4)']],
                anamnesis: ['Torcedura jugando fútbol hace 6hs', 'Dolor lumbar irradiado a pierna derecha', 'Caída sobre mano extendida'],
                vitales: ['TA 130/80 mmHg, FC 76 lpm'],
                fisico: ['Edema maleolar externo, Ottawa positivo', 'Lasègue positivo a 35°', 'Deformidad en cena de tenedor'],
                estudios: ['Rx tobillo 3 vistas', 'RMN lumbosacra', 'Rx muñeca AP/L'],
                planes: ['Bota Walker 21 días + AINEs', 'Pregabalina 150mg + kinesiología', 'Yeso antebraquial 6 semanas']
            },

            'Cardiología': {
                motivos: ['Dolor precordial típico', 'Control HTA', 'Fibrilación auricular nueva', 'Insuficiencia cardíaca descompensada'],
                diagnosticos: [['presuntivo', 'Angina inestable'], ['definitivo', 'Síndrome coronario agudo (I24)'], ['definitivo', 'Fibrilación auricular (I48)']],
                anamnesis: ['Dolor opresivo retroesternal en reposo', 'Palpitaciones irregulares + mareos', 'Disnea de reposo + ortopnea'],
                vitales: ['TA 160/100 mmHg, FC 115 lpm irregular', 'TA 140/90 mmHg, FC 68 lpm'],
                fisico: ['Estertores crepitantes bibasales, edemas MMII', 'Yugulares ingurgitadas, tercer ruido'],
                estudios: ['Troponinas + ECG seriado', 'Ecocardiograma transtorácico', 'MAPA 24hs'],
                planes: ['Coronariografía urgente', 'Anticoagulación con acenocumarol', 'Furosemida EV + espironolactona']
            },

            'Ginecología': {
                motivos: ['Control ginecológico anual', 'Colocación DIU', 'Sangrado uterino anormal', 'Dismenorrea severa'],
                diagnosticos: [['presuntivo', 'Sangrado disfuncional'], ['definitivo', 'Trastorno hemorrágico uterino (N93)']],
                anamnesis: ['Sangrado abundante e irregular 5 meses', 'Dolor pélvico intenso con menstruación'],
                vitales: ['TA 120/80 mmHg, FC 78 lpm'],
                fisico: ['Útero aumentado, móvil, no doloroso', 'Anexos sin masas'],
                estudios: ['Ecografía transvaginal', 'PAP + colposcopia', 'Laboratorio hormonal'],
                planes: ['DIU levonorgestrel colocado', 'Ácido tranexámico + AOC', 'Histeroscopía diagnóstica']
            },

            'Obstetricia': {
                motivos: ['Control prenatal', 'Amenaza de parto prematuro', 'Diabetes gestacional', 'Hipertensión gestacional'],
                diagnosticos: [['presuntivo', 'Embarazo normal'], ['definitivo', 'Embarazo de alto riesgo (O13)']],
                anamnesis: ['Embarazo 31 semanas, contracciones dolorosas', 'Glicemias elevadas en curva 75g', 'TA 150/100 mmHg en tercer trimestre'],
                vitales: ['TA 130/85 mmHg, FC 88 lpm'],
                fisico: ['AU 29 cm, LCF 138 lpm, edema MMII ++'],
                estudios: ['Cardiotocografía', 'Perfil biofísico fetal', 'Proteinuria 24hs'],
                planes: ['Ritodrina EV + corticoides pulmonares', 'Insulina NPH + dieta', 'Reposo absoluto + labetalol']
            },

            'Odontología': {
                motivos: ['Dolor dental intenso', 'Control + limpieza', 'Caries múltiples', 'Extracción cordales'],
                diagnosticos: [['presuntivo', 'Pulpitis irreversible'], ['definitivo', 'Pulpitis (K04.0)']],
                anamnesis: ['Dolor espontáneo pieza 36, insomnio', 'Control anual', 'Cordal 38 incluido'],
                vitales: ['TA 125/80 mmHg'],
                fisico: ['Caries extensa oclusal', 'Cordal semi-incluido'],
                estudios: ['Rx periapical', 'Ortopantomografía'],
                planes: ['Endodoncia pieza 36', 'Destartraje + curetaje', 'Extracción quirúrgica cordales']
            },

            'Oftalmología': {
                motivos: ['Control glaucoma', 'Catarata', 'Retinopatía diabética', 'Queratitis'],
                diagnosticos: [['presuntivo', 'Glaucoma primario'], ['definitivo', 'Glaucoma de ángulo abierto (H40.1)']],
                anamnesis: ['Visión borrosa progresiva', 'Disminución campo visual', 'Ojo rojo + dolor intenso'],
                vitales: ['TA 130/80 mmHg'],
                fisico: ['PIO 28 mmHg OI, excavación 0.9', 'Catarata nuclear ++', 'Inyección ciliar + hipopion'],
                estudios: ['Campimetría', 'Paquimetría', 'Fondo de ojo'],
                planes: ['Latanoprost + timolol', 'Facoemulsificación programada', 'Antibióticos + corticoides tópicos']
            },

            'Kinesiología': {
                motivos: ['Lumbalgia', 'Rehabilitación post artroscopía rodilla', 'Post fractura tobillo', 'Rehabilitación neurológica'],
                diagnosticos: [['presuntivo', 'Lumbalgia mecánica'], ['definitivo', 'Dolor lumbar crónico (M54.5)']],
                anamnesis: ['Dolor lumbar >6 meses', 'Postoperatorio meniscectomía', 'Post yeso 6 semanas'],
                vitales: ['TA 128/82 mmHg'],
                fisico: ['Contractura paravertebral', 'Rodilla con derrame', 'Atrofia gemelos'],
                estudios: ['No requiere nuevos', 'RMN previa'],
                planes: ['20 sesiones protocolo lumbar', 'Fase II rehabilitación rodilla', 'Propiocepción tobillo']
            },

            'Fisiatría': {
                motivos: ['Dolor crónico cervical', 'Fibromialgia', 'Síndrome túnel carpiano', 'Epicondilitis'],
                diagnosticos: [['presuntivo', 'Fibromialgia'], ['definitivo', 'Fibromialgia (M79.7)']],
                anamnesis: ['Dolor generalizado + fatiga', 'Parestesias mano dominante', 'Dolor codo lateral'],
                vitales: ['TA 135/85 mmHg'],
                fisico: ['18/18 puntos gatillo', 'Tinel positivo', 'Dolor en epicóndilo'],
                estudios: ['EMG miembros superiores', 'No requiere'],
                planes: ['Bloqueos + pregabalina', 'Férula nocturna + infiltración', 'Ondas de choque']
            },

            'Análisis Clínicos': {
                motivos: ['Perfil prequirúrgico', 'Control diabetes', 'Chequeo anual', 'Estudios laborales'],
                diagnosticos: [['definitivo', 'Laboratorio dentro de parámetros normales']],
                anamnesis: ['Asintomático, solicita estudios preoperatorios', 'Control trimestral diabetes'],
                vitales: ['TA 120/80 mmHg'],
                fisico: ['Sin hallazgos relevantes'],
                estudios: ['Hemograma + coagulación + hepatograma', 'HbA1c + microalbuminuria', 'Perfil lipídico completo'],
                planes: ['Apto quirúrgico', 'HbA1c 6.8% → intensificar tratamiento']
            },

            'Patología': {
                motivos: ['Biopsia mama', 'Papanicolaou', 'Biopsia próstata', 'Biopsia piel'],
                diagnosticos: [['definitivo', 'Carcinoma ductal infiltrante mama'], ['definitivo', 'Adenocarcinoma próstata Gleason 6']],
                anamnesis: ['Nódulo palpable mama', 'PSA 8.2 ng/ml'],
                vitales: ['TA 130/80 mmHg'],
                fisico: ['Nódulo duro 2cm mama derecha'],
                estudios: ['Biopsia guiada', 'Biopsia transrectal'],
                planes: ['Derivación oncología', 'Vigilancia activa']
            },

            'Clínica Médica': {
                motivos: ['Control HTA + diabetes', 'Dislipemia', 'Chequeo ejecutivo', 'Anemia'],
                diagnosticos: [['presuntivo', 'Diabetes tipo 2 descompensada'], ['definitivo', 'Diabetes mellitus tipo 2 (E11)']],
                anamnesis: ['HbA1c 9.5%', 'Colesterol total 290 mg/dl'],
                vitales: ['TA 150/90 mmHg, FC 78 lpm'],
                fisico: ['IMC 32, retinopatía grado I'],
                estudios: ['HbA1c + fondo de ojo', 'Perfil lipídico'],
                planes: ['Iniciar insulina basal', 'Atorvastatina 40mg']
            },

            'Diagnóstico por Imágenes': {
                motivos: ['Ecografía abdominal', 'RMN columna', 'Rx tórax', 'TAC cerebro'],
                diagnosticos: [['definitivo', 'Hernia discal L5-S1'], ['definitivo', 'Litiasis renal']],
                anamnesis: ['Dolor lumbar crónico', 'Cólico nefrítico'],
                vitales: ['TA 135/85 mmHg'],
                fisico: ['Puño percusión positivo'],
                estudios: ['RMN lumbosacra', 'Ecografía renal + vías'],
                planes: ['Derivación traumatología', 'Derivación urología']
            },

            'Neonatología': {
                motivos: ['Control RN', 'Ictericia neonatal', 'SDR', 'Prematuro'],
                diagnosticos: [['definitivo', 'RN a término sano']],
                anamnesis: ['RN 38 semanas, buen Apgar', 'Ictericia a las 60hs'],
                vitales: ['T° 36.8°C, FC 145 lpm'],
                fisico: ['Ictericia cefalocaudal', 'Buen estado general'],
                estudios: ['Bilirrubina total/directa', 'Coombs'],
                planes: ['Alta 48hs', 'Fototerapia 24hs']
            },

            'Gastroenterología': {
                motivos: ['Reflujo', 'Colitis ulcerosa', 'Hepatitis crónica', 'Dolor abdominal crónico'],
                diagnosticos: [['presuntivo', 'ERGE'], ['definitivo', 'Enfermedad por reflujo (K21)']],
                anamnesis: ['Pirosis diaria + regurgitación', 'Diarrea sanguinolenta 4 semanas'],
                vitales: ['TA 125/80 mmHg'],
                fisico: ['Epigastralgia'],
                estudios: ['Endoscopía alta', 'Colonoscopía'],
                planes: ['Omeprazol 40mg + domperidona', 'Mesalazina 4g + corticoides']
            },

            'Neumonología': {
                motivos: ['EPOC', 'Asma', 'Neumonía', 'TBC'],
                diagnosticos: [['presuntivo', 'EPOC reagudizado'], ['definitivo', 'EPOC (J44)']],
                anamnesis: ['Disnea + expectoración purulenta', 'Crisis asmática nocturna'],
                vitales: ['Sat 86% aire ambiente'],
                fisico: ['Tórax en tonel, sibilancias'],
                estudios: ['Rx tórax', 'Espirometría'],
                planes: ['Corticoides sistémicos + nebulizaciones', 'Budesonida/formoterol']
            },

            'Endocrinología': {
                motivos: ['Diabetes tipo 2', 'Hipotiroidismo', 'Nódulo tiroideo', 'Osteoporosis'],
                diagnosticos: [['presuntivo', 'Diabetes descontrolada'], ['definitivo', 'Diabetes tipo 2 (E11)']],
                anamnesis: ['HbA1c 10.1%', 'Fatiga + aumento peso'],
                vitales: ['TA 140/90 mmHg'],
                fisico: ['Tiroides aumentada'],
                estudios: ['HbA1c', 'TSH + ecografía tiroidea'],
                planes: ['Insulina basal + metformina', 'Levotiroxina 125mcg']
            },

            'Dermatología': {
                motivos: ['Acné', 'Psoriasis', 'Carcinoma basocelular', 'Alopecia'],
                diagnosticos: [['definitivo', 'Carcinoma basocelular']],
                anamnesis: ['Lesión perlada en nariz', 'Placas eritematoescamosas'],
                vitales: ['TA 128/78 mmHg'],
                fisico: ['Lesión ulcerada borde perlado'],
                estudios: ['Biopsia cutánea'],
                planes: ['Extirpación quirúrgica', 'Metotrexato 15mg/semana']
            },

            'Psicología': {
                motivos: ['Ansiedad', 'Depresión', 'Trastorno adaptativo', 'Estrés laboral'],
                diagnosticos: [['presuntivo', 'Trastorno de ansiedad generalizada'], ['definitivo', 'TAG (F41.1)']],
                anamnesis: ['Preocupación excesiva + insomnio', 'Ánimo depresivo 3 meses'],
                vitales: ['TA 135/85 mmHg'],
                fisico: ['Sin alteraciones'],
                estudios: ['No requiere'],
                planes: ['Terapia cognitivo-conductual', 'Derivación psiquiátrica']
            },

            'Psiquiatría': {
                motivos: ['Depresión mayor', 'Trastorno bipolar', 'Esquizofrenia', 'TOC'],
                diagnosticos: [['definitivo', 'Depresión mayor (F32.2)']],
                anamnesis: ['Ideación suicida pasiva', 'Episodio maníaco actual'],
                vitales: ['TA 130/80 mmHg'],
                fisico: ['Contacto pobre'],
                estudios: ['No requiere'],
                planes: ['Sertralina 150mg + quetiapina', 'Valproato + olanzapina']
            },

            'Neurología': {
                motivos: ['Epilepsia', 'Parkinson', 'Esclerosis múltiple', 'Cefalea crónica'],
                diagnosticos: [['presuntivo', 'Crisis convulsiva'], ['definitivo', 'Epilepsia (G40)']],
                anamnesis: ['Crisis tónico-clónica', 'Temblor de reposo'],
                vitales: ['TA 135/80 mmHg'],
                fisico: ['Reflejos exaltados'],
                estudios: ['EEG', 'RMN cerebral'],
                planes: ['Levetiracetam 1500mg', 'Levodopa/carbidopa']
            },

            'Fonoaudiología': {
                motivos: ['Disfagia post ACV', 'Disfemia', 'Afasia', 'Trastorno voz'],
                diagnosticos: [['definitivo', 'Disfagia orofaríngea']],
                anamnesis: ['Dificultad deglución post ACV', 'Tartamudez'],
                vitales: ['TA 140/90 mmHg'],
                fisico: ['Reflejo tusígeno abolido'],
                estudios: ['Videodeglución'],
                planes: ['Rehabilitación deglución 30 sesiones', 'Terapia logopédica']
            },

            'Terapia Ocupacional': {
                motivos: ['Rehabilitación mano', 'Post ACV', 'Lesión medular', 'Ergonomía'],
                diagnosticos: [['definitivo', 'Hemiparesia post ACV']],
                anamnesis: ['Déficit motor brazo izquierdo', 'Lesión medular D8'],
                vitales: ['TA 120/80 mmHg'],
                fisico: ['Fuerza 1/5 miembro superior'],
                estudios: ['No requiere'],
                planes: ['Terapia ocupacional 40 sesiones', 'Adaptaciones domiciliarias']
            },

            'Urología': {
                motivos: ['Hipertrofia prostática', 'Litiasis renal', 'Cáncer próstata', 'Incontinencia'],
                diagnosticos: [['presuntivo', 'HPB'], ['definitivo', 'Hiperplasia benigna próstata (N40)']],
                anamnesis: ['Chorro débil + nicturia x6', 'Cólico nefrítico'],
                vitales: ['TA 140/85 mmHg'],
                fisico: ['Próstata 60g'],
                estudios: ['PSA + tacto rectal', 'TAC urológica'],
                planes: ['Tamsulosina + finasteride', 'Litotricia']
            },

            'Nefrología': {
                motivos: ['ERC', 'Síndrome nefrótico', 'Trasplante renal', 'Hemodiálisis'],
                diagnosticos: [['definitivo', 'ERC etapa 5 (N18.5)']],
                anamnesis: ['Creatinina 6.2 mg/dl', 'Proteinuria 5g/día'],
                vitales: ['TA 160/100 mmHg'],
                fisico: ['Edemas generalizados'],
                estudios: ['Clearance creatinina', 'Biopsia renal'],
                planes: ['Inicio hemodiálisis', 'Lista trasplante']
            },

            'Oncología': {
                motivos: ['Cáncer mama', 'Cáncer pulmón', 'Linfoma', 'Cáncer colon'],
                diagnosticos: [['definitivo', 'Carcinoma mama HER2+']],
                anamnesis: ['Nódulo mama 3cm', 'Tumor pulmonar 6cm'],
                vitales: ['TA 120/80 mmHg'],
                fisico: ['Nódulo duro mama'],
                estudios: ['Mamografía + biopsia', 'PET-CT'],
                planes: ['Quimioterapia + trastuzumab', 'Derivación oncología torácica']
            },

            'Hematología': {
                motivos: ['Anemia', 'Leucemia', 'Trombocitopenia', 'Coagulopatía'],
                diagnosticos: [['definitivo', 'Anemia ferropénica']],
                anamnesis: ['Hb 7.2 g/dl', 'Plaquetas 5000'],
                vitales: ['TA 110/70 mmHg'],
                fisico: ['Palidez mucosas'],
                estudios: ['Médula ósea', 'Coombs'],
                planes: ['Transfusión + hierro EV', 'Corticoides + rituximab']
            },

            'Cirugía General': {
                motivos: ['Apendicitis', 'Colecistitis', 'Hernia inguinal', 'Eventración'],
                diagnosticos: [['definitivo', 'Apendicitis aguda (K35)']],
                anamnesis: ['Dolor FID + vómitos', 'Dolor epigastrio irradiado'],
                vitales: ['TA 130/80 mmHg, FC 100 lpm'],
                fisico: ['Blumberg positivo', 'Murphy positivo'],
                estudios: ['Ecografía abdominal'],
                planes: ['Apendicectomía laparoscópica', 'Colecistectomía']
            },

            'Terapia Intensiva': {
                motivos: ['Shock séptico', 'Postoperatorio mayor', 'SDR grave', 'PCR recuperada'],
                diagnosticos: [['definitivo', 'Shock séptico (R65.1)']],
                anamnesis: ['Fiebre + hipotensión + foco abdominal', 'Post cirugía cardíaca'],
                vitales: ['TA 70/40 mmHg, FC 150 lpm'],
                fisico: ['Crepitantes bibasales'],
                estudios: ['Rx tórax portátil', 'Lactato'],
                planes: ['Noradrenalina + piperacilina/tazobactam', 'Soporte ventilatorio']
            },

            'Nutrición': {
                motivos: ['Obesidad', 'Desnutrición', 'Diabetes', 'Celíaco'],
                diagnosticos: [['definitivo', 'Obesidad mórbida (E66)']],
                anamnesis: ['IMC 42', 'Pérdida 15kg involuntaria'],
                vitales: ['TA 140/90 mmHg'],
                fisico: ['IMC 42, cintura 135cm'],
                estudios: ['No requiere'],
                planes: ['Dieta 1500 kcal + actividad física', 'Suplementación enteral']
            },

            'Fertilidad': {
                motivos: ['Infertilidad', 'FIV', 'Baja reserva ovárica', 'Azoospermia'],
                diagnosticos: [['definitivo', 'Infertilidad de causa desconocida']],
                anamnesis: ['3 años buscando embarazo', 'AMH 0.6 ng/ml'],
                vitales: ['TA 120/80 mmHg'],
                fisico: ['Sin alteraciones'],
                estudios: ['Histerosalpingografía', 'Espermograma'],
                planes: ['FIV-ICSI programada', 'Donación de gametos']
            },

            'Infectología': {
                motivos: ['HIV', 'Tuberculosis', 'Hepatitis', 'Infección urinaria'],
                diagnosticos: [['definitivo', 'HIV controlado']],
                anamnesis: ['Carga viral indetectable', 'TBC pulmonar activa'],
                vitales: ['TA 125/80 mmHg'],
                fisico: ['Sin particularidades'],
                estudios: ['Carga viral', 'BK en esputo'],
                planes: ['TAR continuado', 'Rifampicina + isoniazida 6 meses']
            },

            'Inmunología': {
                motivos: ['Lupus', 'Artritis reumatoide', 'Vasculitis', 'Inmunodeficiencia'],
                diagnosticos: [['definitivo', 'Lupus eritematoso sistémico (M32)']],
                anamnesis: ['Rash malar + artralgias', 'Artritis simétrica manos'],
                vitales: ['TA 140/90 mmHg'],
                fisico: ['Rash malar', 'Deformidad manos'],
                estudios: ['ANA + anti-DNA', 'Factor reumatoide'],
                planes: ['Hidroxicloroquina + prednisona', 'Metotrexato + biológico']
            },

            'default': {
                motivos: ['Consulta programada', 'Control evolutivo', 'Estudio solicitado'],
                diagnosticos: [['definitivo', 'Consulta médica']],
                anamnesis: ['Motivo: control', 'Asintomático'],
                vitales: ['TA 130/80 mmHg, FC 70 lpm, Sat 98%'],
                fisico: ['Sin particularidades'],
                estudios: ['No se indican'],
                planes: ['Control en 3-6 meses']
            }
        };


        const evolucionesPorEspecialidad = {
            'Medicina General': [
                'Franca mejoría clínica. Se da alta definitiva.',
                'Paciente asintomático. Control anual programado.',
                'Persiste leve dolor residual. Se ajusta dosis y control en 30 días.',
                'Se recibe laboratorio con HbA1c 6.8% → se intensifica tratamiento.',
                'Paciente trae autorización OSDE aprobada. Se agenda RMN.',
                'Se extiende certificado médico laboral 15 días más (lumbalgia).',
                'Buena adherencia al tratamiento. Laboratorio dentro de metas.'
            ],
            'Guardia': [
                'Paciente estable hemodinámicamente. Alta de guardia con indicaciones.',
                'Traslado a hemodinamia exitoso. Código infarto resuelto.',
                'Sin nuevas crisis convulsivas. Alta con antiepilépticos.',
                'Abdomen blando tras 6 hs. Alta por evolución favorable.',
                'Mejoría franca con antibióticos. Alta en 48 hs.'
            ],
            'Guardia 24hs': [
                'Extubado con buenos parámetros. Traslado a sala general.',
                'Shock séptico resuelto. Vasopresores suspendidos.',
                'Egreso de UTI por mejoría clínica sostenida.',
                'Reperfusión completa post trombolisis. Evolución favorable.'
            ],
            'Pediatría': [
                'Cuadro viral autolimitado resuelto. Alta definitiva.',
                'Buena evolución post bronquiolitis. Retiro oxígeno domiciliario.',
                'Control niño sano normal. Vacunas al día.',
                'Curva ponderal recuperada. Alta nutricional.',
                'Mejoría franca con salbutamol. Espaciado de medicación.',
                'Persiste diarrea → derivación a Infectología pediátrica.'
            ],
            'Traumatología': [
                'Evolución favorable post inmovilización. Inicia fase II kinesiología.',
                'Consolidación ósea adecuada. Retiro de yeso programado.',
                'Buena evolución post artroscopía de rodilla. Alta deportiva en 3 meses.',
                'Persiste dolor radicular → derivación a Neurocirugía.',
                'Retiro de material de osteosíntesis sin complicaciones.'
            ],
            'Cardiología': [
                'Paciente asintomático clase funcional I. Control anual.',
                'Buena respuesta a betabloqueadores. Se reduce dosis carvedilol.',
                'Coronariografía limpia. Alta cardiológica definitiva.',
                'FA controlada en frecuencia. Continúa anticoagulación.',
                'Se recibe MAPA 24 hs: HTA de bata blanca confirmada.'
            ],
            'Ginecología': [
                'DIU colocado correctamente. Control a las 6 semanas.',
                'Sangrado anormal resuelto con anticonceptivos. Control en 3 meses.',
                'Mioma submucoso resecado. Márgenes libres.',
                'Quiste ovárico funcional resuelto espontáneamente.',
                'Embarazo evolutivo confirmado tras FIV. Derivación a Obstetricia.'
            ],
            'Obstetricia': [
                'Parto normal. Madre e hijo en buenas condiciones. Alta 48 hs.',
                'Cesárea sin complicaciones. Alta día +4.',
                'Buena evolución post amenaza de parto prematuro. Reposo levantado.',
                'Diabetes gestacional controlada. Programación cesárea 39 semanas.'
            ],
            'Odontología': [
                'Endodoncia finalizada. Control radiológico en 6 meses.',
                'Destartraje + curetaje completado. Alta odontológica.',
                'Extracción de cordales sin complicaciones. Control día +7.',
                'Ortodoncia fase activa finalizada. Contención colocada.'
            ],
            'Oftalmología': [
                'PIO controlada con latanoprost. Control en 3 meses.',
                'Postoperatorio facoemulsificación OD sin complicaciones. Alta.',
                'Retinopatía diabética estable. Próximo fondo de ojo en 6 meses.',
                'Queratitis resuelta. Se suspende tratamiento tópico.'
            ],
            'Kinesiología': [
                'Objetivos terapéuticos alcanzados. Alta kinésica.',
                'Mejoría significativa en rango articular. Continúa 10 sesiones más.',
                'Paciente independiente en AVD. Alta funcional.'
            ],
            'Fisiatría': [
                'Dolor crónico controlado. Reducción de opioides.',
                'Bloqueo facetario con excelente respuesta. Alta.',
                'Rehabilitación post accidente finalizada. Alta fisiatrica.'
            ],
            'Análisis Clínicos': [
                'Resultados dentro de parámetros normales. No requiere derivación.',
                'Mejoría en perfil lipídico con estatina.',
                'Estabilidad en función renal. Control en 6 meses.'
            ],
            'Patología': [
                'Resultado de biopsia: benigno. Se informa al paciente.',
                'Carcinoma ductal infiltrante grado 2. Derivación a oncología.',
                'Adenocarcinoma de próstata Gleason 6. Derivación a urología.'
            ],
            'Clínica Médica': [
                'HTA controlada. Se reduce dosis de medicación.',
                'Diabetes compensada. HbA1c 6.4%. Control semestral.',
                'Paciente asintomático. Alta clínica.'
            ],
            'Diagnóstico por Imágenes': [
                'Estudio sin hallazgos patológicos.',
                'Ecografía abdominal normal. Control anual.',
                'RMN lumbosacra: hernia discal L5-S1 contenida.'
            ],
            'Neonatología': [
                'Recién nacido estable. Alta de neonatología día +5.',
                'Buena evolución post SDR. Extubado.',
                'Curva de peso recuperada. Alta neonatal.'
            ],
            'Gastroenterología': [
                'Reflujo controlado con IBP. Control endoscópico en 1 año.',
                'Colitis ulcerosa en remisión clínica y endoscópica.',
                'Hepatitis C curada (ARN no detectable).'
            ],
            'Neumonología': [
                'EPOC estable GOLD B. Control anual.',
                'Neumonía resuelta. Rx tórax de control normal.',
                'Asma controlada. Reduce dosis de budesonida.'
            ],
            'Endocrinología': [
                'Hipotiroidismo compensado. TSH 2.1.',
                'Osteoporosis estable. Continúa denosumab.',
                'Diabetes tipo 2 controlada. HbA1c 6.7%.'
            ],
            'Dermatología': [
                'Acné en franca mejoría. Reduce isotretinoína.',
                'Psoriasis controlada con biológico. Control trimestral.',
                'Carcinoma basocelular resecado. Márgenes libres.'
            ],
            'Psicología': [
                'Objetivos terapéuticos alcanzados. Alta psicológica.',
                'Mejoría significativa en síntomas ansiosos.',
                'Proceso terapéutico en curso. Sesiones mensuales.'
            ],
            'Psiquiatría': [
                'Estabilización clínica completa. Alta psiquiátrica.',
                'Buena respuesta a antidepresivo. Reduce frecuencia de controles.',
                'Esquizofrenia compensada. Clozapina 400 mg/día.'
            ],
            'Neurología': [
                'Epilepsia controlada. Sin crisis en 2 años.',
                'Parkinson estable. Ajuste mínimo de levodopa.',
                'Esclerosis múltiple estable. Última resonancia sin lesiones activas.'
            ],
            'Fonoaudiología': [
                'Deglución segura. Alta fonoaudiológica.',
                'Lenguaje recuperado post ACV. Alta.',
                'Voz normalizada tras nódulo. Alta.'
            ],
            'Terapia Ocupacional': [
                'Independencia funcional alcanzada. Alta.',
                'Reentrenamiento en AVD completado.',
                'Adaptaciones domiciliarias instaladas.'
            ],
            'Urología': [
                'Litiasis expulsada espontáneamente.',
                'Hipertrofia prostática controlada con alfa-bloqueante.',
                'Cáncer de próstata en vigilancia activa. PSA estable.'
            ],
            'Nefrología': [
                'Función renal estabilizada. Creatinina 1.4 mg/dl.',
                'Síndrome nefrótico en remisión completa.',
                'Trasplante renal funcionante. Control mensual.'
            ],
            'Oncología': [
                'Remisión completa confirmada por PET-CT. Alta oncológica.',
                'Buena respuesta a quimioterapia. Próximo ciclo 15/01/2026.',
                'Progresión de enfermedad → se indica segunda línea.',
                'Efectos adversos grado 2 manejados. Continúa esquema.'
            ],
            'Hematología': [
                'Anemia corregida. Ferritina 180 ng/ml.',
                'Leucemia en remisión completa post inducción.',
                'Trombocitopenia inmune controlada con eltrombopag.'
            ],
            'Cirugía General': [
                'Postoperatorio apendicectomía sin complicaciones. Alta día +2.',
                'Colecistectomía laparoscópica. Alta día +1.',
                'Hernioplasta inguinal. Alta ambulatoria.'
            ],
            'Terapia Intensiva': [
                'Egreso de UTI. Traslado a sala general.',
                'Extubado con buenos parámetros. Alta de UTI.',
                'Shock séptico resuelto. Vasopresores suspendidos.'
            ],
            'Nutrición': [
                'IMC 24. Objetivo alcanzado. Alta nutricional.',
                'Desnutrición corregida. Albumina 4.1 g/dl.',
                'Dieta para diabetes controlada. HbA1c 6.5%.'
            ],
            'Fertilidad': [
                'Embarazo evolutivo confirmado. Derivación a obstetricia.',
                'Estimulación ovárica exitosa. Transferencia programada.',
                'Espermograma mejorado tras tratamiento.'
            ],
            'Infectología': [
                'Infección urinaria resuelta. Urocultivo negativo.',
                'Tuberculosis pulmonar curada (6 meses de tratamiento).',
                'HIV indetectable. Alta virológica.'
            ],
            'Inmunología': [
                'Lupus en remisión clínica y serológica.',
                'Artritis reumatoide controlada (DAS28 < 2.6).',
                'Vasculitis en remisión. Prednisona 5 mg/día.'
            ],
            'default': [
                'Evolución favorable. Continuar tratamiento indicado.',
                'Paciente asintomático. Se da alta evolutiva.',
                'Persiste sintomatología leve. Control en 30-60 días.',
                'Se reciben estudios complementarios dentro de parámetros normales.'
            ]
        };

        const generarNota = (turnoBase, medico, paciente, edad, centro) => {
            const arch = turnoBase.archivedAt;
            const fechaArch = arch.toLocaleDateString('es-AR');
            const horaArch = arch.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
            const esp = medico.especialidades[0];
            const c = especialidades[esp] || especialidades.default;
            const evols = evolucionesPorEspecialidad[esp] || evolucionesPorEspecialidad.default;

            const nombre = `${paciente.nombre} ${paciente.apellido || ''}`.trim();

            //const edad = paciente.edad || 42;
            const sexo = paciente.sexo
            const motivo = faker.helpers.arrayElement(c.motivos);
            const diagArray = faker.helpers.arrayElement(c.diagnosticos);
            const diagnostico = diagArray[0] === 'presuntivo' ? `Se sospecha ${diagArray[1].toLowerCase()}` : diagArray[1];
            const anam = faker.helpers.arrayElement(c.anamnesis);
            const vitales = faker.helpers.arrayElement(c.vitales);
            const fisicoEsp = faker.helpers.arrayElement(c.fisico);
            const estudio = faker.helpers.arrayElement(c.estudios);
            const plan = faker.helpers.arrayElement(c.planes);

            const conEstudio = !estudio.includes('No') && faker.datatype.boolean(0.82);
            const estudioTxt = conEstudio ? `${estudio} - Programado ${faker.date.between({ from: arch, to: new Date(arch.getTime() + 35 * 24 * 60 * 60 * 1000) }).toLocaleDateString('es-AR')}` : estudio;

            const proximoControl = faker.datatype.boolean(0.88) ? `\n• Próximo control: ${faker.date.between({ from: new Date(arch.getTime() + 20 * 24 * 60 * 60 * 1000), to: new Date(arch.getTime() + 150 * 24 * 60 * 60 * 1000) }).toLocaleDateString('es-AR')}` : '';

            const planFormateado = plan.split('+').map(p => `• ${p.trim()}`).join('\n') + proximoControl;

            const cantEvol = faker.helpers.weightedArrayElement([{ weight: 55, value: 0 }, { weight: 25, value: 1 }, { weight: 12, value: 2 }, { weight: 6, value: 3 }, { weight: 2, value: faker.number.int({ min: 4, max: 7 }) }]);

            let evolucionesTexto = '';
            let ultimaFecha = arch;
            if (cantEvol > 0) {
                for (let i = 0; i < cantEvol; i++) {
                    const dias = cantEvol === 1 ? faker.number.int({ min: 7, max: 21 }) :
                        cantEvol === 2 ? faker.number.int({ min: 22, max: 50 }) :
                            cantEvol === 3 ? faker.number.int({ min: 51, max: 100 }) :
                                faker.number.int({ min: 101, max: 365 });
                    const fechaEvol = new Date(ultimaFecha.getTime() + dias * 24 * 60 * 60 * 1000);
                    evolucionesTexto += `\n\nEvolución (${fechaEvol.toLocaleDateString('es-AR')}):\n${faker.helpers.arrayElement(evols)}`;
                    ultimaFecha = fechaEvol;
                }
            }

            turnoBase.modifiedAt = cantEvol > 0 ? ultimaFecha : arch;
            const ultimaModif = cantEvol > 0 ? `${ultimaFecha.toLocaleDateString('es-AR')} ${ultimaFecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs` : `${fechaArch} ${horaArch} hs`;

            return `
${fechaArch} ${horaArch} 
${centro}
Médico: ${medico.nombreCompleto} - ${esp}

Paciente: ${nombre} | DNI ${paciente.dni?.toLocaleString('es-AR') || 'S/D'} | ${edad} años

Motivo de consulta:
${motivo}

Anamnesis:
${anam}

Examen físico:
${vitales}. ${fisicoEsp}

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
        const ahora = new Date()
        for (let i = 0; i < 72000; i++) {
            const medico = faker.helpers.arrayElement(medicos);

            const centro = centrosMap[medico.centroId] || 'Centro Médico Central';

            const start = faker.date.between({ from: '2015-01-01', to: new Date() });
            start.setHours(faker.number.int({ min: 8, max: 19 }));
            start.setMinutes(faker.helpers.arrayElement([0, 15, 30, 45]));

            const duration = faker.helpers.arrayElement([20, 30, 40, 60]);
            const finTurno = new Date(start.getTime() + duration * 60 * 1000);
            const offsetMin = faker.number.int({ min: -10, max: 15 });
            const archivedAt = new Date(finTurno.getTime() + offsetMin * 60 * 1000);
            
            const antes = archivedAt.getFullYear() * 100000000 + archivedAt.getMonth() * 1000000 + archivedAt.getDay() * 10000 + archivedAt.getHours() * 100 + archivedAt.getMinutes()
            const ya = ahora.getFullYear() * 100000000 + ahora.getMonth() * 1000000 + ahora.getDay() * 10000 + ahora.getHours() * 100 + ahora.getMinutes()
            const dif = Math.trunc((ya - antes) / 100000000)
            let paciente= faker.helpers.arrayElement(beneficiarios);
            const menores = beneficiarios.filter(p => ((p.edad - dif) >= 0) && ((p.edad - dif) < 18))
            const hombres = beneficiarios.filter(p => p.sexo === 'masculino' && ((p.edad - dif) >= 0))
            const mujeres = beneficiarios.filter(p => p.sexo === 'femenino' && ((p.edad - dif) > 16))
            const posibles = beneficiarios.filter(p=>(p.edad-dif)>=0)
            if ( mujeres.length>0 && (((medico.especialidades)[0] === 'Obstetricia' )|| ((medico.especialidades)[0] === 'Ginecología'))) {

                paciente = faker.helpers.arrayElement(mujeres) 
            }else if( mujeres.length>0 && (medico.especialidades)[0] === 'Maternidad'){
                console.log("t")
                paciente = faker.helpers.arrayElement(mujeres.filter(p=>((p.edad -dif) < 45)))
            }
            else if (hombres.length>0 && ((medico.especialidades)[0] === 'Urología')) {
                paciente = faker.helpers.arrayElement(hombres)
            }else if (menores.length>0 && (((medico.especialidades)[0] === 'Pediatría') || ((medico.especialidades[0]).includes("Pediátrica")) || ((medico.especialidades[0]).includes("Infantil")))) {

                paciente = faker.helpers.arrayElement(menores)
            }
            else if((medico.especialidades)[0]==='Neonatología'){
                paciente = faker.helpers.arrayElement(menores.filter(p=>p.edad-dif<1))
            }
            else if((medico.especialidades)[0]==='Fertilidad'){
                paciente = faker.helpers.arrayElement(beneficiarios.filter(p=>p.edad-dif>18 && p.edad-dif<50));
            }
            else {
                paciente = faker.helpers.arrayElement(posibles);
            }
            const edad = paciente.edad - dif 
            
            const turno = {
                date: faker.date.between({ from: new Date(start.getTime() - 90 * 24 * 60 * 60 * 1000), to: start }),
                start, duration, archivedAt,
                modifiedAt: archivedAt,
                descripcion: 'Consulta médica',
                afiliadoId: paciente.tipo === 'titular' ? paciente.id : null,
                integranteId: paciente.tipo === 'integrante' ? paciente.id : null,
                prestadorId: medico.id,
                centroId: medico.centroId,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            turno.notes = generarNota(turno, medico, paciente, edad, centro);
            turnos.push(turno);

            if (i % 10000 === 0) console.log(`${i}/72000 turnos generados...`);
        }

        for (let i = 0; i < 3000; i++) {
            const medico = faker.helpers.arrayElement(medicos);
            const start = faker.date.soon({ days: 120 });
            start.setHours(faker.number.int({ min: 8, max: 19 }));
            start.setMinutes(faker.helpers.arrayElement([0, 30]));

            turnos.push({
                date: faker.date.recent({ days: 20 }), start, duration: 30,
                archivedAt: null, modifiedAt: null, notes: null,
                descripcion: 'Turno reservado',
                afiliadoId: null, integranteId: null,
                prestadorId: medico.id, centroId: medico.centroId,
                createdAt: new Date(), updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('Turnos', turnos);
        console.log('75.000 TURNOS HIPERREALISTAS ARGENTINA 2025 - 100% COMPLETOS');
    },

    down: async (queryInterface) => queryInterface.bulkDelete('Turnos', null, {})
};