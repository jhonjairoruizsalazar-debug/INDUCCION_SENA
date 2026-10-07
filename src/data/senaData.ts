import { CaseStudy, GlossaryTerm, QuizQuestion, ReglamentoAcuerdoJSON } from '../types';

export const INITIAL_APPRENTICE = {
  fullName: 'Aprendiz SENA',
  documentType: 'CC',
  documentNumber: '1020304050',
  regional: 'Regional Distrito Capital',
  center: 'Centro de Formación de Talento Humano en Salud',
  program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  cohortFicha: '2874912',
  avatarSeed: 'Felix',
  enrollmentDate: '2026-03-01',
};

export const REGIONALS_LIST = [
  'Regional Distrito Capital',
  'Regional Antioquia',
  'Regional Valle del Cauca',
  'Regional Santander',
  'Regional Atlántico',
  'Regional Cundinamarca',
  'Regional Bolívar',
  'Regional Boyacá',
  'Regional Caldas',
  'Regional Risaralda',
  'Regional Tolima',
  'Regional Nariño',
  'Regional Huila',
  'Regional Magdalena',
  'Regional Cesar',
  'Regional Meta',
  'Regional Cauca',
  'Regional Norte de Santander',
  'Regional Córdoba',
  'Regional Quindío',
  'Regional Sucre',
  'Regional La Guajira',
  'Regional Casanare',
  'Regional Chocó',
  'Regional Caquetá',
  'Regional Putumayo',
  'Regional Arauca',
  'Regional San Andrés y Providencia',
  'Regional Amazonas',
  'Regional Guaviare',
  'Regional Vichada',
  'Regional Guainía',
  'Regional Vaupés'
];

export const POPULAR_PROGRAMS = [
  'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  'Tecnólogo en Gestión Empresarial',
  'Tecnólogo en Animación Digital y 3D',
  'Tecnólogo en Mantenimiento Electromecánico Industrial',
  'Tecnólogo en Gestión de Redes de Datos',
  'Tecnólogo en Gestión Logística y Cadena de Suministro',
  'Tecnólogo en Control Ambiental',
  'Técnico en Cocina y Servicios Gastronómicos',
  'Técnico en Contabilización de Operaciones Comerciales y Financieras',
  'Técnico en Asistencia Administrativa',
  'Técnico en Sistemas y Telecomunicaciones',
  'Tecnólogo en Gestión Agroempresarial'
];

export const HYMN_VERSES = [
  {
    type: 'CORO',
    lyrics: [
      'Estudiantes del SENA adelante,',
      'por Colombia luchad con amor,',
      'con el ánimo noble y radiante,',
      'transformemos el mundo en mejor.'
    ],
    timeStart: 0,
    timeEnd: 12
  },
  {
    type: 'ESTROFA I',
    lyrics: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que a la patria la gloria dará.'
    ],
    timeStart: 12,
    timeEnd: 24
  },
  {
    type: 'ESTROFA II',
    lyrics: [
      'En la forja del SENA se aprende,',
      'con la ciencia y la técnica en flor,',
      'cada joven su antorcha ya enciende,',
      'con un grito de fe y de valor.'
    ],
    timeStart: 24,
    timeEnd: 36
  },
  {
    type: 'ESTROFA III',
    lyrics: [
      'Compañeros de esfuerzo y fatiga,',
      'el taller es el templo del bien,',
      'donde el alma labora y abriga,',
      'el anhelo de honor y laurel.'
    ],
    timeStart: 36,
    timeEnd: 48
  }
];

// REGLAMENTO DEL APRENDIZ VIGENTE - ACUERDO 009 DE 2024
export const ACUERDO_009_2024: ReglamentoAcuerdoJSON = {
  documento: "Acuerdo 009 de 2024",
  entidad: "Servicio Nacional de Aprendizaje - SENA",
  organo_emisor: "Consejo Directivo Nacional",
  fecha_emision: "2024-11-05",
  objeto: "Por medio del cual se adopta el Reglamento del Aprendiz SENA y se derogan los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024",
  firmante: "Iván Daniel Jaramillo Jassir (Presidente Consejo Directivo, Viceministro de Empleo y Pensiones)",
  articulos_resolutivos: [
    {
      articulo: "Artículo 1",
      descripcion: "Adopción del Reglamento del Aprendiz SENA."
    },
    {
      articulo: "Artículo 2",
      descripcion: "Ámbito de aplicación y transición para aprendices en curso y materia disciplinaria."
    },
    {
      articulo: "Artículo 3",
      descripcion: "Vigencia y derogatorias (deroga los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024)."
    },
    {
      articulo: "Artículo 4",
      descripcion: "Divulgación en la página web del SENA conforme a la Ley 1437 de 2011."
    }
  ],
  estructura_reglamento: [
    {
      capitulo: "Capítulo I",
      titulo: "Definiciones",
      articulos: [
        "Artículo 1 (Definiciones)",
        "Artículo 2 (Alcance del reglamento)",
        "Artículo 3 (Principios orientadores)",
        "Artículo 4 (Centro de Convivencia)"
      ],
      descripcionResumen: "Bases conceptuales del SENA, ámbito de aplicación para todas las modalidades y jornadas, principios orientadores (dignidad, debido proceso, justicia restaurativa) e institución del Centro de Convivencia."
    },
    {
      capitulo: "Capítulo II",
      titulo: "Derechos del Aprendiz SENA",
      articulos: [
        "Artículo 5 (Derechos del aprendiz)",
        "Artículo 6 (Reconocimientos formativos)",
        "Artículo 7 (Representatividad de los aprendices)"
      ],
      descripcionResumen: "Garantías del proceso formativo, acceso libre a recursos tecnológicos, esquema de estímulos y reconocimientos (monitorías, movilidad), y mecanismos democráticos de representación (vocerías)."
    },
    {
      capitulo: "Capítulo III",
      titulo: "Deberes del Aprendiz SENA",
      articulos: [
        "Artículo 8 (Deberes del aprendiz)",
        "Artículo 9 (Prohibiciones)"
      ],
      descripcionResumen: "Obligaciones del aprendiz: porte obligatorio del carné, justificación oportuna de inasistencias en 3 días hábiles, convivencia y probidad académica; junto al régimen estricto de prohibiciones."
    },
    {
      capitulo: "Capítulo IV",
      titulo: "Ingreso, Permanencia y Certificación",
      articulos: [
        "Artículo 10",
        "Artículo 11",
        "Artículo 12",
        "Artículo 13",
        "Artículo 14",
        "Artículo 15",
        "Artículo 16",
        "Artículo 17",
        "Artículo 18",
        "Artículo 19",
        "Artículo 20",
        "Artículo 21",
        "Artículo 22",
        "Artículo 23",
        "Artículo 24",
        "Artículo 25",
        "Artículo 26",
        "Artículo 27",
        "Artículo 28",
        "Artículo 29",
        "Artículo 30",
        "Artículo 31",
        "Artículo 32",
        "Artículo 33",
        "Artículo 34",
        "Artículo 35",
        "Artículo 36",
        "Artículo 37",
        "Artículo 38"
      ],
      descripcionResumen: "Ciclo integral del aprendiz: formalización de matrícula, inducción, modalidades formativas, gestión de novedades en Sofia Plus, planes de mejoramiento, evaluación (A/D), etapas lectiva y productiva, y expedición de certificados."
    },
    {
      capitulo: "Capítulo V",
      titulo: "Régimen de Faltas, Medidas Formativas, Disciplinarias y Sancionatorias",
      articulos: [
        "Artículo 39",
        "Artículo 40",
        "Artículo 41",
        "Artículo 42",
        "Artículo 43",
        "Artículo 44",
        "Artículo 45",
        "Artículo 46",
        "Artículo 47",
        "Artículo 48",
        "Artículo 49",
        "Artículo 50",
        "Artículo 51",
        "Artículo 52",
        "Artículo 53"
      ],
      descripcionResumen: "Tipificación de faltas académicas y disciplinarias, escala pedagógica restaurativa (llamados de atención y plan de mejoramiento), debido proceso, funcionamiento del Comité de Evaluación y Seguimiento, y recursos de ley."
    }
  ]
};

// Detalle pedagógico complementario para consulta de cada artículo de Acuerdo 009 de 2024
export const ARTICULOS_DETALLES_009: Record<string, { titulo: string; detalle: string; categoria: string }> = {
  'Artículo 1 (Definiciones)': {
    titulo: 'Conceptos Rectores de la Formación',
    detalle: 'Define formalmente al Aprendiz SENA, Centro de Formación, Formación Profesional Integral (FPI), Saber Ser, y la Comunidad Educativa.',
    categoria: 'Capítulo I - Definiciones'
  },
  'Artículo 2 (Alcance del reglamento)': {
    titulo: 'Cobertura Universal del Reglamento',
    detalle: 'Aplica a todos los aprendices matriculados en formación laboral o tecnológica, en modalidades presencial, virtual o a distancia, y en todas las jornadas.',
    categoria: 'Capítulo I - Definiciones'
  },
  'Artículo 3 (Principios orientadores)': {
    titulo: 'Pilares Éticos y Constitucionales',
    detalle: 'Dignidad humana, libertad con responsabilidad, debido proceso, justicia restaurativa pedagógica, igualdad, no discriminación e inclusión.',
    categoria: 'Capítulo I - Definiciones'
  },
  'Artículo 4 (Centro de Convivencia)': {
    titulo: 'Espacio Institucional de Mediación',
    detalle: 'Ambiente institucional formativo orientado a la resolución concertada y pacífica de desacuerdos y promoción de la convivencia ciudadana.',
    categoria: 'Capítulo I - Definiciones'
  },
  'Artículo 5 (Derechos del aprendiz)': {
    titulo: 'Garantías y Libertades Formativas',
    detalle: 'Recibir formación gratuita de calidad, carné oficial gratuito, inducción integral, ambientes seguros dotados, libertad de pensamiento y debido proceso.',
    categoria: 'Capítulo II - Derechos'
  },
  'Artículo 6 (Reconocimientos formativos)': {
    titulo: 'Estímulos, Incentivos y Mérito',
    detalle: 'Monitorías remuneradas, cuadro de honor, representación institucional (WorldSkills), prioridad en semilleros SENNOVA y convocatorias de movilidad.',
    categoria: 'Capítulo II - Derechos'
  },
  'Artículo 7 (Representatividad de los aprendices)': {
    titulo: 'Liderazgo y Participación Democrática',
    detalle: 'Mecanismos de postulación y elección de Voceros de Ficha y Representantes de Centro ante las instancias consultivas y de seguimiento.',
    categoria: 'Capítulo II - Derechos'
  },
  'Artículo 8 (Deberes del aprendiz)': {
    titulo: 'Compromisos de Formación y Convivencia',
    detalle: 'Portar permanentemente el carné visible, asistir puntualmente, justificar inasistencias en 3 días hábiles, radicar evidencias en Zajuna y cuidar bienes del SENA.',
    categoria: 'Capítulo III - Deberes'
  },
  'Artículo 9 (Prohibiciones)': {
    titulo: 'Conductas Vedadas y Límites Disciplinarios',
    detalle: 'Plagio en evidencias, consumo de sustancias prohibidas o alcohol, porte de armas, agresiones físicas o verbales, discriminación y cobros indebidos a compañeros.',
    categoria: 'Capítulo III - Deberes'
  },
  'Artículo 10': {
    titulo: 'Matrícula y Formalización',
    detalle: 'Acto formal que confiere la calidad de aprendiz y la adhesión vinculante al marco normativo e institucional del SENA.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 11': {
    titulo: 'Inducción Institucional',
    detalle: 'Etapa inicial obligatoria que orienta sobre la identidad, herramientas tecnológicas, deberes, derechos y el modelo FPI.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 12': {
    titulo: 'Identificación Oficial y Carné',
    detalle: 'Obligatoriedad de tramitar y portar el carné oficial que activa el seguro contra accidentes y habilita el acceso a laboratorios y bibliotecas.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 13': {
    titulo: 'Modalidades de Formación',
    detalle: 'Reglas para programas presenciales, virtuales, a distancia y en alternancia tecnológica.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 14': {
    titulo: 'Asistencia y Justificación de Inasistencias',
    detalle: 'Término improrrogable de tres (3) días hábiles siguientes para allegar incapacidades médicas oficiales o soportes de fuerza mayor.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 15': {
    titulo: 'Novedades Académicas en Sofia Plus',
    detalle: 'Procedimiento de radicación y registro formal de novedades del estado del aprendiz en la plataforma académica central.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 16': {
    titulo: 'Aplazamiento del Programa',
    detalle: 'Solicitud motivada para suspender temporalmente la formación hasta por un máximo de 6 meses por motivos de salud, fuerza mayor o servicio militar.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 17': {
    titulo: 'Reingreso a la Formación',
    detalle: 'Solicitud formal para reincorporarse al programa tras un aplazamiento previa disponibilidad de cupo en la ficha correspondiente.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 18': {
    titulo: 'Traslado de Centro o de Programa',
    detalle: 'Condiciones académicas y de cupo para transferir la matrícula entre centros de formación del SENA a nivel nacional.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 19': {
    titulo: 'Retiro Voluntario',
    detalle: 'Manifestación expresa del aprendiz para retirarse de la formación, sujeta a los términos y paz y salvos del centro.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 20': {
    titulo: 'Deserción de la Formación',
    detalle: 'Configuración de deserción por inasistencia injustificada continuada (3 días seguidos o más) y procedimiento preventivo de notificación.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 21': {
    titulo: 'Plan de Mejoramiento Pedagógico',
    detalle: 'Instrumento pedagógico concertado entre instructor y aprendiz con actividades complementarias para superar deficiencias en los RAPs.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 22': {
    titulo: 'Evaluación y Escala de Juicios',
    detalle: 'Evaluación formativa y cualitativa: Aprobado (A) cuando alcanza el resultado de aprendizaje, y Deficiente (D) cuando requiere plan de mejora.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 23': {
    titulo: 'Naturaleza de la Etapa Productiva',
    detalle: 'Aplicación práctica de conocimientos y habilidades en escenarios reales del sector productivo u organizacional.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 24': {
    titulo: 'Modalidades de Etapa Productiva',
    detalle: 'Contrato de aprendizaje (Ley 789), proyecto productivo, pasantía institucional o empresarial, monitoría técnica y vínculo laboral directo.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 25': {
    titulo: 'Registro y Aval para Inicio Productivo',
    detalle: 'Requisitos académicos, paz y salvo lectivo y registro formal en el aplicativo institucional antes de iniciar labores.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 26': {
    titulo: 'Seguimiento Tutorial y Bitácoras',
    detalle: 'Diligenciamiento periódico de bitácoras de aprendizaje y concertación de visitas evaluativas entre instructor de seguimiento y coformador.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 27': {
    titulo: 'Evaluación Final de Etapa Productiva',
    detalle: 'Emisión del juicio definitivo de aprobación de la etapa práctica suscrito por el instructor asignado y el responsable en la empresa.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 28': {
    titulo: 'Término Límite de Culminación',
    detalle: 'Plazos máximos reglamentarios para culminar la etapa productiva y radicar las evidencias finales tras finalizar la etapa lectiva.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 29': {
    titulo: 'Paz y Salvo Institucional',
    detalle: 'Comprobación de no adeudar materiales de laboratorio, libros de biblioteca ni implementos tecnológicos del centro.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 30': {
    titulo: 'Certificación y Títulos Oficiales',
    detalle: 'Expedición digital del título de Técnico o Tecnólogo con validez legal en el territorio nacional y registro en las bases ministeriales.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 31': {
    titulo: 'Verificación Digital y Duplicados',
    detalle: 'Consulta y validación en línea de la autenticidad de diplomas y actas de grado mediante el código de barras y firma electrónica.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 32': {
    titulo: 'Registro en Sistemas Nacionales',
    detalle: 'Articulación de los registros con las entidades rectoras de educación en Colombia.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 33': {
    titulo: 'Ceremonias y Grados',
    detalle: 'Protocolo institucional para la entrega solemne de títulos ordinarios y extraordinarios.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 34': {
    titulo: 'Reconocimiento de Aprendizajes Previos (RAP)',
    detalle: 'Mecanismos de homologación y validación de competencias laborales y saberes empíricos certificados.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 35': {
    titulo: 'Convalidación Curricular',
    detalle: 'Trámite de equiparación de módulos entre diferentes programas de formación técnica y tecnológica.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 36': {
    titulo: 'Cancelación de Matrícula por Causales Académicas',
    detalle: 'Determinación administrativa cuando no se supera el plan de mejoramiento tras agotar las instancias pedagógicas.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 37': {
    titulo: 'Custodia de Historias Académicas',
    detalle: 'Archivo seguro físico y digital de los expedientes formativos conforme a las tablas de retención documental.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 38': {
    titulo: 'Actualización Periódica de Datos',
    detalle: 'Deber ineludible del aprendiz de mantener actualizados sus canales de contacto, correo y domicilio en Sofia Plus.',
    categoria: 'Capítulo IV - Permanencia'
  },
  'Artículo 39': {
    titulo: 'Tipificación de Faltas',
    detalle: 'Clasificación entre Faltas Académicas (incumplimiento en evidencias y competencias) y Faltas Disciplinarias (conductas contra la convivencia y normas institucionales).',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 40': {
    titulo: 'Criterios de Gravedad de la Falta',
    detalle: 'Calificación de faltas como Leves, Graves o Gravísimas según el daño, reincidencia y grado de intencionalidad.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 41': {
    titulo: 'Criterios para Calificar la Falta',
    detalle: 'Ponderación objetiva: dolo o culpa, antecedentes, confesión oportuna, reparación del daño y motivos determinantes.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 42': {
    titulo: 'Medidas Formativas Pedagógicas',
    detalle: 'Llamado de atención verbal y llamado de atención escrito con suscripción de acta de compromiso formativo orientados a la justicia restaurativa.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 43': {
    titulo: 'Plan de Mejoramiento Disciplinario',
    detalle: 'Acciones de carácter formativo y psicosocial concertadas con el aprendiz para fortalecer su conducta y sana convivencia.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 44': {
    titulo: 'Sanciones Disciplinarias',
    detalle: 'Condicionamiento de matrícula y Cancelación definitiva de matrícula emitida por la Subdirección de Centro ante faltas graves o gravísimas.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 45': {
    titulo: 'Pérdida de Estímulos e Incentivos',
    detalle: 'Suspensión temporal o revocatoria de monitorías, auxilios económicos o representaciones ante sanciones disciplinarias.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 46': {
    titulo: 'Garantías del Debido Proceso',
    detalle: 'Presunción de inocencia, derecho a la defensa y contradicción, doble instancia, publicidad y celeridad procesal.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 47': {
    titulo: 'Comité de Evaluación y Seguimiento',
    detalle: 'Órgano consultivo colegiado integrado por subdirector, coordinadores, instructores, vocero de ficha y profesional de bienestar.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 48': {
    titulo: 'Procedimiento y Citación a Descargos',
    detalle: 'Notificación oficial de la queja con copia de las pruebas, otorgando al aprendiz el plazo legal para preparar su defensa.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 49': {
    titulo: 'Sesión del Comité y Práctica de Pruebas',
    detalle: 'Audiencia formal donde se escuchan los descargos, se controvierten las pruebas y se delibera pedagógicamente.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 50': {
    titulo: 'Recomendación del Comité a Subdirección',
    detalle: 'Acta motivada que recomienda la medida pedagógica, el archivo del caso o la sanción correspondiente.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 51': {
    titulo: 'Acto Administrativo Motivado',
    detalle: 'Resolución expedida por el Subdirector de Centro que resuelve de fondo el caso con motivación fáctica y jurídica.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 52': {
    titulo: 'Notificación y Recurso de Reposición',
    detalle: 'Notificación personal o por correo institucional y concesión del Recurso de Reposición en los términos consagrados por la ley.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  },
  'Artículo 53': {
    titulo: 'Ejecutoria, Firmeza y Archivo',
    detalle: 'Tránsito a cosa juzgada institucional, reporte de la novedad en el sistema y archivo de las actuaciones.',
    categoria: 'Capítulo V - Régimen Sancionatorio'
  }
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Inasistencia Imprevista y Justificación Documentada',
    scenario: 'Carlos, aprendiz en formación de Gestión Contable, presentó un problema de salud urgente comprobado con incapacidad médica oficial que le impidió asistir a sus sesiones presenciales durante tres días continuos.',
    question: 'Según el Reglamento del Aprendiz vigente (Acuerdo 009 de 2024, Capítulo IV - Art. 14), ¿cuál es el procedimiento oportuno para salvaguardar su permanencia?',
    options: [
      {
        text: 'Radicar la justificación médica documental ante su instructor y coordinador dentro de los tres (3) días hábiles siguientes al hecho.',
        isCorrect: true,
        feedback: '¡Exacto! El Acuerdo 009 de 2024 estipula que toda inasistencia debe justificarse formalmente dentro de los 3 días hábiles siguientes mediante los canales institucionales.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo IV, Artículo 14 (Justificación de Inasistencias y Debido Proceso)'
      },
      {
        text: 'Esperar a que finalice el trimestre formativo para solicitar una audiencia en el Comité.',
        isCorrect: false,
        feedback: 'Incorrecto. Si no reporta dentro del plazo de 3 días, la inasistencia se registrará como injustificada y activará el reporte preventivo de deserción.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo IV, Artículo 20 (Deserción y Reporte)'
      },
      {
        text: 'Enviar únicamente un mensaje informal por mensajería instantánea a un compañero de ficha.',
        isCorrect: false,
        feedback: 'Incorrecto. El reporte a terceros no cumple con la formalidad del debido proceso institucional.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo I, Artículo 3 y Capítulo IV, Artículo 14'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Porte del Carné Institucional y Seguridad Integral',
    scenario: 'Mariana olvidó portar su carné institucional físico y visible al ingresar al Centro de Formación, manifestando al personal de apoyo que "todos ya la conocen en el aula".',
    question: '¿Qué principio y deber institucional se encuentra comprometido según el Acuerdo 009 de 2024 (Capítulo III - Art. 8)?',
    options: [
      {
        text: 'El deber ineludible de portar permanentemente el carné institucional visible en instalaciones y entornos formativos.',
        isCorrect: true,
        feedback: '¡Correcto! El carné no solo es una identificación personal, sino el requisito de seguridad, acceso a servicios y activación de la póliza de accidentes del aprendiz.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo III, Artículo 8 (Deberes del Aprendiz) y Capítulo IV, Artículo 12'
      },
      {
        text: 'Es una recomendación opcional que solo aplica durante las semanas de evaluaciones finales.',
        isCorrect: false,
        feedback: 'Incorrecto. El porte de la credencial es de carácter obligatorio durante toda la estancia en las sedes del SENA.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo III, Artículo 8'
      },
      {
        text: 'Solo aplica para aprendices de cursos virtuales que visitan la biblioteca.',
        isCorrect: false,
        feedback: 'Incorrecto. La norma rige para toda la comunidad de aprendices sin distinción de modalidad.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo I, Artículo 2 (Alcance Universal)'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Integridad Académica, Derechos de Autor y Citación',
    scenario: 'En la entrega de un proyecto formativo, Juan copió textualmente documentación y código fuente de un repositorio externo sin citar autorías ni generar aportes originales, presentándolo como desarrollo propio.',
    question: '¿Cómo califica el Acuerdo 009 de 2024 esta infracción a la ética formativa?',
    options: [
      {
        text: 'Falta académica y disciplinaria grave por plagio y violación de propiedad intelectual (Capítulo III, Art. 9 y Capítulo V, Art. 39).',
        isCorrect: true,
        feedback: '¡Correcto! El Acuerdo 009 de 2024 ratifica el compromiso con la probidad académica y la propiedad intelectual como pilares del Saber Ser.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo III, Artículo 9 (Prohibiciones) y Capítulo V, Artículos 39-40'
      },
      {
        text: 'Es una práctica permitida si el software compila y funciona en los computadores del laboratorio.',
        isCorrect: false,
        feedback: 'Incorrecto. El rigor técnico debe estar sustentado en valores éticos de honestidad y autoría.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo I, Artículo 3 (Principios Orientadores)'
      },
      {
        text: 'Solo es sancionable si el proyecto genera ingresos económicos comerciales directos.',
        isCorrect: false,
        feedback: 'Incorrecto. El plagio en evidencias formativas es una falta tipificada con independencia de su lucro comercial.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo V, Artículo 39 (Faltas Académicas y Disciplinarias)'
      }
    ]
  },
  {
    id: 'case-4',
    title: 'Estímulos e Incentivos al Rendimiento Sobresaliente',
    scenario: 'Valentina ha obtenido juicios Aprobados en el 100% de sus competencias, lideró el semillero SENNOVA de su centro y demostró un alto sentido cívico.',
    question: '¿A cuáles estímulos e incentivos institucionales puede acceder Valentina bajo el Acuerdo 009 de 2024 (Capítulo II - Art. 6)?',
    options: [
      {
        text: 'Postulación a Monitorías remuneradas, reconocimiento en cuadro de honor y prioridad en convocatorias de pasantías o movilidad.',
        isCorrect: true,
        feedback: '¡Excelente! El Acuerdo 009 de 2024 consagra en su Capítulo II (Art. 6) los Reconocimientos Formativos para promover la excelencia y el liderazgo.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo II, Artículo 6 (Reconocimientos Formativos)'
      },
      {
        text: 'Exoneración total de presentar evidencias en la etapa productiva.',
        isCorrect: false,
        feedback: 'Incorrecto. Los estímulos premian el mérito pero no eliminan los requisitos pedagógicos de graduación.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo IV, Artículos 23-28'
      },
      {
        text: 'Cobro de tarifas a compañeros por brindar asesorías en horas de clase.',
        isCorrect: false,
        feedback: 'Incorrecto. El cobro indebido a compañeros atenta contra la gratuidad y el compañerismo institucional.',
        regulationArticle: 'Acuerdo 009 de 2024 - Capítulo III, Artículo 9 (Prohibiciones Expresas)'
      }
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Acuerdo 009 de 2024',
    category: 'Convivencia',
    definition: 'Reglamento del Aprendiz vigente expedido el 5 de noviembre de 2024 por el Consejo Directivo Nacional del SENA (firmado por Iván Daniel Jaramillo Jassir). Deroga formalmente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024, modernizando los derechos, deberes, prohibiciones, estímulos, debido proceso y medidas pedagógicas restaurativas a lo largo de 5 capítulos y 53 artículos.'
  },
  {
    term: 'FPI',
    acronym: 'Formación Profesional Integral',
    category: 'Pedagogía',
    definition: 'Proceso educativo teórico-práctico integral de carácter gratuito, orientado al desarrollo armónico de conocimientos técnicos (Saber), destrezas procedimentales (Saber Hacer) y valores éticos y cívicos (Saber Ser).'
  },
  {
    term: 'SOFIA Plus',
    acronym: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo',
    category: 'Plataformas',
    definition: 'Plataforma administrativa del SENA para inscripción, selección, gestión de matrícula, novedades académicas, registro de juicios evaluativos y expedición de certificados oficiales con firma digital.'
  },
  {
    term: 'Zajuna',
    category: 'Plataformas',
    definition: 'Ambiente Virtual de Aprendizaje (LMS oficial del SENA) donde los aprendices acceden a contenidos interactivos, foros, guías de aprendizaje, sesiones en línea y entrega de evidencias formativas.'
  },
  {
    term: 'RAP',
    acronym: 'Resultado de Aprendizaje',
    category: 'Pedagogía',
    definition: 'Logro verificable que describe lo que el aprendiz sabe, comprende y es capaz de hacer al culminar una unidad de aprendizaje curricular.'
  },
  {
    term: 'Etapa Lectiva',
    category: 'Pedagogía',
    definition: 'Fase inicial del programa formativo donde se desarrollan las competencias técnicas y transversales en ambientes de aprendizaje físicos, virtuales o combinados.'
  },
  {
    term: 'Etapa Productiva',
    category: 'Pedagogía',
    definition: 'Fase práctica regulada en el Capítulo IV (Arts. 23 a 28 de Acuerdo 009 de 2024) donde el aprendiz aplica y consolida sus competencias en el entorno laboral mediante contrato de aprendizaje, proyecto productivo, pasantía, monitoría o vínculo laboral.'
  },
  {
    term: 'SBS',
    acronym: 'Sistema de Bibliotecas SENA',
    category: 'Plataformas',
    definition: 'Red nacional de bibliotecas físicas y digitales con acceso libre a bases de datos científicas de primer nivel (ScienceDirect, Scopus, IEEE), libros electrónicos y repositorio de patentes.'
  },
  {
    term: 'APE',
    acronym: 'Agencia Pública de Empleo',
    category: 'Institucional',
    definition: 'Operador público y gratuito del SENA que brinda orientación ocupacional e intermediación laboral entre empresas y aprendices o egresados.'
  },
  {
    term: 'SENNOVA',
    acronym: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación',
    category: 'Institucional',
    definition: 'Ecosistema de fomento a la investigación aplicada del SENA a través de semilleros de aprendices, tecnoparques, tecnoacademias y grupos científicos.'
  },
  {
    term: 'Fondo Emprender',
    category: 'Institucional',
    definition: 'Fondo de capital semilla no reembolsable del SENA creado para financiar iniciativas empresariales de aprendices y egresados.'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Convivencia',
    definition: 'Órgano consultivo colegiado de cada centro formativo (regulado en el Capítulo V, Art. 47 de Acuerdo 009 de 2024) que analiza el desempeño de los aprendices, salvaguardando el debido proceso y proponiendo medidas formativas restaurativas.'
  },
  {
    term: 'Juicio Evaluativo (A / D)',
    category: 'Pedagogía',
    definition: 'Escala cualitativa oficial del SENA (Capítulo IV, Art. 22 de Acuerdo 009 de 2024): "A" (Aprobado) certifica el logro de la competencia, y "D" (No Aprobado / Por Mejorar) exige la concertación inmediata de un Plan de Mejoramiento.'
  },
  {
    term: 'Vocero de Ficha',
    category: 'Convivencia',
    definition: 'Aprendiz elegido democráticamente por sus compañeros (Capítulo II, Art. 7 de Acuerdo 009 de 2024) para representarlos, canalizar inquietudes pedagógicas y participar con voz y voto en instancias formativas.'
  },
  {
    term: 'Medidas Formativas Restaurativas',
    category: 'Convivencia',
    definition: 'Acciones de carácter pedagógico (Capítulo V, Art. 42 de Acuerdo 009 de 2024: llamado de atención verbal, llamado de atención escrito con acta de compromiso y plan de mejoramiento) orientadas a corregir conductas antes de aplicar sanciones definitivas.'
  }
];

export const FINAL_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿En qué año fue fundado el Servicio Nacional de Aprendizaje SENA y quién fue su fundador principal?',
    options: [
      'En 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118.',
      'En 1970 por el Ministerio de Hacienda mediante una resolución interna.',
      'En 1991 tras la promulgación de la nueva Constitución Política.',
      'En 1945 al culminar la Segunda Guerra Mundial por decreto presidencial.'
    ],
    correctIndex: 0,
    explanation: 'El SENA nació el 21 de junio de 1957 por iniciativa del visionario cartagenero Rodolfo Martínez Tono, respaldado por trabajadores y empresarios.',
    domain: 'Identidad Institucional'
  },
  {
    id: 2,
    question: '¿Qué simbolizan los tres sectores económicos en el Escudo oficial del SENA?',
    options: [
      'Las tres regiones geográficas más grandes de Colombia.',
      'Los tres sectores vitales: primario/agropecuario (café y caduceo), secundario/industrial (rueda dentada) y terciario/servicios (ancla y timón).',
      'Los tres niveles de directivos del Ministerio de Trabajo.',
      'Las tres sedes iniciales ubicadas en Bogotá, Medellín y Cali.'
    ],
    correctIndex: 1,
    explanation: 'El escudo del SENA plasma la rueda dentada (industria), el caduceo con la rama de café (agropecuario) y el ancla con el timón (comercio, servicios y navegación).',
    domain: 'Símbolos SENA'
  },
  {
    id: 3,
    question: '¿Cuál es el acto administrativo que contiene el Reglamento del Aprendiz vigente en el SENA y a quién deroga?',
    options: [
      'El Acuerdo 009 de 2024 expedido el 5 de noviembre de 2024, que deroga los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024.',
      'El Decreto 205 de 2003 del Ministerio de la Protección Social.',
      'La Ley 100 de 1993 de Seguridad Social.',
      'La Resolución 1409 de 2012 de Trabajo en Alturas.'
    ],
    correctIndex: 0,
    explanation: 'El Acuerdo 009 de 2024, emitido por el Consejo Directivo Nacional y firmado por Iván Daniel Jaramillo Jassir, es el estatuto vigente del aprendiz y derogó expresamente los acuerdos anteriores.',
    domain: 'Reglamento del Aprendiz'
  },
  {
    id: 4,
    question: '¿Cuáles son las tres dimensiones del ser humano articuladas por la Formación Profesional Integral (FPI)?',
    options: [
      'Saber (conocimientos), Saber Hacer (destrezas técnicas) y Saber Ser (actitudes, valores éticos y convivencia).',
      'Leer, memorizar y repetir manuales operativos.',
      'Producción, exportación y facturación de servicios.',
      'Teoría básica, pruebas escritas y exámenes bimestrales.'
    ],
    correctIndex: 0,
    explanation: 'La FPI del SENA busca no solo formar técnicos capacitados sino ciudadanos éticos y solidarios para Colombia.',
    domain: 'Modelo Pedagógico FPI'
  },
  {
    id: 5,
    question: 'Según el Acuerdo 009 de 2024 (Capítulo IV, Artículo 14), ¿cuál es el plazo perentorio para justificar formalmente una inasistencia imprevista?',
    options: [
      'Hasta el último día del trimestre académico.',
      'Dentro de los tres (3) días hábiles siguientes al hecho generador.',
      'Quince (15) días calendario después de reincorporarse.',
      'No existe plazo si el vocero de ficha da su visto bueno verbal.'
    ],
    correctIndex: 1,
    explanation: 'El Reglamento vigente fija tres (3) días hábiles para radicar formalmente las incapacidades o soportes ante el instructor y la coordinación.',
    domain: 'Reglamento del Aprendiz'
  },
  {
    id: 6,
    question: '¿Cuál es la función del Ambiente Virtual de Aprendizaje Zajuna (LMS oficial del SENA)?',
    options: [
      'Alojar los contenidos formativos interactivos, guías, foros y recibir el envío formal de evidencias de aprendizaje.',
      'Funcionar como red social pública de entretenimiento estudiantil.',
      'Emitir pagos salariales internacionales.',
      'Tramitar pasaportes y visados para el exterior.'
    ],
    correctIndex: 0,
    explanation: 'Zajuna es el campus virtual donde los aprendices y formadores interactúan a diario para el desarrollo de guías y evidencias.',
    domain: 'Ecosistema Digital'
  },
  {
    id: 7,
    question: '¿Cuál es el rol primordial de la plataforma SENA SOFIA Plus?',
    options: [
      'Administrar la gestión académica: fichas de caracterización, estado de matrícula, novedades, juicios evaluativos y certificados oficiales.',
      'Producir programas de radio y televisión institucional.',
      'Vender libros de texto a los aprendices.',
      'Registrar compras de insumos para comedores escolares.'
    ],
    correctIndex: 0,
    explanation: 'SOFIA Plus es el sistema central de gestión académica y certificación del SENA.',
    domain: 'Ecosistema Digital'
  },
  {
    id: 8,
    question: '¿Qué recurso gratuito pone el Sistema de Bibliotecas SENA (SBS) a disposición de los aprendices?',
    options: [
      'Acceso a bases de datos científicas internacionales de alto impacto (ScienceDirect, Scopus), libros digitales y repositorio de proyectos.',
      'Venta de fotocopias y enciclopedias impresas antiguas.',
      'Suscripciones pagas obligatorias para ingresar al edificio.',
      'Únicamente diccionarios básicos de español en salas de lectura.'
    ],
    correctIndex: 0,
    explanation: 'El SBS brinda acceso libre y gratuito a un ecosistema científico y bibliográfico de estándar universitario internacional.',
    domain: 'Investigación & SBS'
  },
  {
    id: 9,
    question: '¿Qué dependencia institucional gestiona los auxilios de sostenimiento, monitorías, programas de salud, cultura y deportes?',
    options: [
      'Bienestar al Aprendiz.',
      'Dirección Jurídica General.',
      'Contraloría General de la República.',
      'Oficina de Archivo Central.'
    ],
    correctIndex: 0,
    explanation: 'Bienestar al Aprendiz ejecuta la política integral para garantizar la permanencia, equidad y desarrollo humano de los aprendices.',
    domain: 'Bienestar al Aprendiz'
  },
  {
    id: 10,
    question: 'Según el Manual de Identidad Visual del SENA, ¿cuál es el color institucional primario oficial de la marca?',
    options: [
      'Verde SENA (Pantone 361C / #39A900), complementado con el blanco puro.',
      'Azul eléctrico con rojo escarlata.',
      'Amarillo dorado brillante con franjas negras.',
      'Gris metálico oscuro con naranja fluorescente.'
    ],
    correctIndex: 0,
    explanation: 'El Verde SENA oficial (Pantone 361C / #39A900) y el Blanco Puro son los colores identitarios normados en el Manual de Identidad Visual del SENA.',
    domain: 'Identidad Visual'
  }
];
