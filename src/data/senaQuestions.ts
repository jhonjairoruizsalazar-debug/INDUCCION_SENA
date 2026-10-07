export interface RegulationQuestion {
  id: number;
  chapterId: 'cap1' | 'cap2' | 'cap3' | 'cap4' | 'cap5';
  chapterNumber: string;
  chapterTitle: string;
  articleRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pedagogicalTip: string;
  domain: string;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
}

export const SENA_CHAPTERS = [
  {
    id: 'cap1',
    code: 'Capítulo I',
    title: 'Definiciones, Alcance y Principios Orientadores',
    articles: 'Artículos 1 al 4',
    color: '#059669', // Emerald
    icon: 'Compass'
  },
  {
    id: 'cap2',
    code: 'Capítulo II',
    title: 'Derechos del Aprendiz, Reconocimientos y Representatividad',
    articles: 'Artículos 5 al 7',
    color: '#0284C7', // Sky
    icon: 'Award'
  },
  {
    id: 'cap3',
    code: 'Capítulo III',
    title: 'Deberes y Prohibiciones del Aprendiz',
    articles: 'Artículos 8 y 9',
    color: '#D97706', // Amber
    icon: 'ShieldAlert'
  },
  {
    id: 'cap4',
    code: 'Capítulo IV',
    title: 'Ingreso, Permanencia, Evaluación y Certificación',
    articles: 'Artículos 10 al 38',
    color: '#39A900', // SENA Green
    icon: 'GraduationCap'
  },
  {
    id: 'cap5',
    code: 'Capítulo V',
    title: 'Régimen de Faltas, Medidas Formativas y Debido Proceso',
    articles: 'Artículos 39 al 53',
    color: '#7C3AED', // Purple
    icon: 'Scale'
  }
];

export const REGULATION_QUESTION_BANK: RegulationQuestion[] = [
  // ==================== CAPÍTULO I: DEFINICIONES Y PRINCIPIOS ====================
  {
    id: 101,
    chapterId: 'cap1',
    chapterNumber: 'Capítulo I',
    chapterTitle: 'Definiciones y Principios Orientadores',
    articleRef: 'Acuerdo 009 de 2024 - Art. 1 (Definiciones)',
    question: 'Según el Artículo 1 del Acuerdo 009 de 2024, ¿cómo se define formalmente al Aprendiz SENA?',
    options: [
      'Toda persona matriculada en los programas de formación laboral o tecnológica en cualquiera de las modalidades del SENA.',
      'Únicamente el estudiante presencial que asiste diariamente a talleres técnicos.',
      'Cualquier ciudadano colombiano que visite las instalaciones de una sede regional.',
      'El egresado que ya culminó su etapa productiva y busca empleo en la APE.'
    ],
    correctIndex: 0,
    explanation: 'El Aprendiz SENA es toda persona con matrícula formal vigente en programas de formación laboral o tecnológica en cualquiera de sus modalidades (presencial, virtual o a distancia).',
    pedagogicalTip: 'Revisa el Artículo 1 para comprender la concepción integral de la comunidad educativa y el rol protagonista del aprendiz.',
    domain: 'Definiciones Institucionales',
    difficulty: 'básico'
  },
  {
    id: 102,
    chapterId: 'cap1',
    chapterNumber: 'Capítulo I',
    chapterTitle: 'Definiciones y Principios Orientadores',
    articleRef: 'Acuerdo 009 de 2024 - Art. 2 (Alcance del Reglamento)',
    question: '¿A quiénes cobija el ámbito de aplicación del Reglamento del Aprendiz vigente?',
    options: [
      'Aplica universalmente a todos los aprendices en todas las sedes, modalidades (presencial, virtual, combinada) y jornadas a nivel nacional.',
      'Solo aplica a los aprendices de formación técnica presencial diurna.',
      'Aplica únicamente a los aprendices en etapa lectiva, eximiendo la etapa productiva.',
      'Rige de manera exclusiva para centros de formación ubicados en Bogotá.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 2 estipula que el reglamento es de cobertura nacional obligatoria para todos los aprendices sin importar jornada, centro o modalidad.',
    pedagogicalTip: 'Ten presente que el reglamento te acompaña tanto en el aula virtual o física como en tu empresa patrocinadora.',
    domain: 'Alcance Normativo',
    difficulty: 'básico'
  },
  {
    id: 103,
    chapterId: 'cap1',
    chapterNumber: 'Capítulo I',
    chapterTitle: 'Definiciones y Principios Orientadores',
    articleRef: 'Acuerdo 009 de 2024 - Art. 3 (Principios Orientadores)',
    question: '¿Cuál de los siguientes principios orientadores consagra el Acuerdo 009 de 2024 como pilar de la convivencia y el debido proceso?',
    options: [
      'La dignidad humana, la libertad con responsabilidad y el enfoque de justicia restaurativa pedagógica.',
      'La sanción punitiva inmediata sin oportunidad de descargos.',
      'La primacía del beneficio económico por encima del bienestar del aprendiz.',
      'La obligatoriedad de resolver todos los desacuerdos en tribunales judiciales externos.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 3 enfatiza la dignidad humana, la equidad, el debido proceso y la justicia restaurativa que busca reparar y formar antes que castigar.',
    pedagogicalTip: 'En el SENA el enfoque disciplinario es formativo y restaurativo, fomentando la reconciliación y el aprendizaje reflexivo.',
    domain: 'Principios Éticos',
    difficulty: 'intermedio'
  },
  {
    id: 104,
    chapterId: 'cap1',
    chapterNumber: 'Capítulo I',
    chapterTitle: 'Definiciones y Principios Orientadores',
    articleRef: 'Acuerdo 009 de 2024 - Art. 4 (Centro de Convivencia)',
    question: '¿Cuál es el propósito del Centro de Convivencia establecido en el Artículo 4 del Reglamento?',
    options: [
      'Promover espacios institucionales de diálogo, mediación pacífica de conflictos y fortalecimiento del tejido comunitario.',
      'Imponer multas económicas a los aprendices que lleguen tarde.',
      'Gestionar la venta obligatoria de uniformes y materiales.',
      'Operar como calabozo o sala de aislamiento temporal.'
    ],
    correctIndex: 0,
    explanation: 'El Centro de Convivencia es un entorno institucional pedagógico orientado a la resolución concertada de diferencias y a la promoción de la cultura de paz.',
    pedagogicalTip: 'Ante cualquier diferencia con instructores o compañeros, acude al Centro de Convivencia como instancia amigable de diálogo.',
    domain: 'Convivencia y Mediación',
    difficulty: 'intermedio'
  },
  {
    id: 105,
    chapterId: 'cap1',
    chapterNumber: 'Capítulo I',
    chapterTitle: 'Definiciones y Principios Orientadores',
    articleRef: 'Acuerdo 009 de 2024 - Art. 3 (Igualdad y No Discriminación)',
    question: '¿Qué garantiza el principio de igualdad y no discriminación en el proceso formativo del SENA?',
    options: [
      'El acceso libre, equitativo y respetuoso a la formación sin distingos de género, etnia, credo, orientación o condición socioeconómica.',
      'Que todos los aprendices deben presentar las evaluaciones en el mismo segundo exacto.',
      'Que no se permite formular preguntas durante las sesiones pedagógicas.',
      'La asignación aleatoria de títulos técnicos sin evaluar competencias.'
    ],
    correctIndex: 0,
    explanation: 'El SENA es un patrimonio incluyente de los colombianos que salvaguarda la igualdad material y prohíbe cualquier forma de discriminación.',
    pedagogicalTip: 'Consulta el Artículo 3 para conocer los pilares de inclusión y enfoque diferencial en la formación.',
    domain: 'Principios Éticos',
    difficulty: 'básico'
  },

  // ==================== CAPÍTULO II: DERECHOS Y ESTÍMULOS ====================
  {
    id: 201,
    chapterId: 'cap2',
    chapterNumber: 'Capítulo II',
    chapterTitle: 'Derechos del Aprendiz y Estímulos',
    articleRef: 'Acuerdo 009 de 2024 - Art. 5 (Derechos del Aprendiz)',
    question: '¿Cuál de las siguientes garantías es un DERECHO fundamental consagrado en el Artículo 5 del Reglamento?',
    options: [
      'Recibir formación profesional integral gratuita, carné institucional oficial y acceso a los ambientes de aprendizaje dotados.',
      'Cobrar dinero a los compañeros por prestarles herramientas de taller.',
      'Modificar arbitrariamente los horarios de clase pactados en Sofia Plus.',
      'Exigir la aprobación automática de los módulos sin presentar evidencias.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 5 garantiza formación de calidad, carné gratuito, uso de infraestructura tecnológica, libre expresión respetuosa y debido proceso.',
    pedagogicalTip: 'Tus derechos garantizan que el SENA provea los recursos y ambientes necesarios para tu éxito formativo.',
    domain: 'Derechos del Aprendiz',
    difficulty: 'básico'
  },
  {
    id: 202,
    chapterId: 'cap2',
    chapterNumber: 'Capítulo II',
    chapterTitle: 'Derechos del Aprendiz y Estímulos',
    articleRef: 'Acuerdo 009 de 2024 - Art. 6 (Reconocimientos Formativos)',
    question: '¿Qué estímulos o reconocimientos formativos contempla el Artículo 6 para aprendices destacados en su desempeño?',
    options: [
      'Monitorías remuneradas, cuadro de honor, prioridad en semilleros SENNOVA y representación institucional nacional e internacional.',
      'Exención vitalicia del pago de impuestos de timbre.',
      'Otorgamiento de doble titulación sin cursar las competencias requeridas.',
      'Autorización para no realizar la etapa productiva.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 6 promueve el mérito y la excelencia mediante monitorías, cuadros de honor, pasantías y convocatorias WorldSkills y SENNOVA.',
    pedagogicalTip: 'Un excelente desempeño académico y ético te abre puertas a monitorías pagadas y oportunidades de movilidad.',
    domain: 'Estímulos e Incentivos',
    difficulty: 'intermedio'
  },
  {
    id: 203,
    chapterId: 'cap2',
    chapterNumber: 'Capítulo II',
    chapterTitle: 'Derechos del Aprendiz y Estímulos',
    articleRef: 'Acuerdo 009 de 2024 - Art. 7 (Representatividad y Vocerías)',
    question: '¿Cómo se ejerce el derecho a la representatividad democrática de los aprendices según el Artículo 7?',
    options: [
      'A través de la elección democrática de Voceros de Ficha y el Representante de Centro ante comités y mesas de trabajo.',
      'Mediante designación a dedo efectuada por la empresa patrocinadora.',
      'Por orden de llegada el primer día de clases a la sede formativa.',
      'A través de sorteos de lotería organizados en la cafetería.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 7 garantiza el ejercicio democrático de postulación y votación secreta de voceros y líderes estudiantiles.',
    pedagogicalTip: 'Tu vocero de ficha es el enlace directo con la coordinación académica y vela por los derechos de tu grupo.',
    domain: 'Liderazgo Democrático',
    difficulty: 'básico'
  },
  {
    id: 204,
    chapterId: 'cap2',
    chapterNumber: 'Capítulo II',
    chapterTitle: 'Derechos del Aprendiz y Estímulos',
    articleRef: 'Acuerdo 009 de 2024 - Art. 5 (Derecho al Debido Proceso)',
    question: 'Cuando un aprendiz es llamado a descargos por presunta falta, ¿qué derecho consagrado le asiste?',
    options: [
      'Derecho a la presunción de inocencia, a conocer las pruebas, a ser escuchado y a presentar su versión con recursos de defensa.',
      'La obligación de aceptar inmediatamente la expulsión sin hacer preguntas.',
      'Pagar una caución bancaria al centro para no ser investigado.',
      'Delegar a una persona externa sin vínculo con el SENA para responder el examen.'
    ],
    correctIndex: 0,
    explanation: 'El debido proceso es una garantía constitucional reiterada en el Artículo 5 que impide sanciones arbitrarias y asegura la contradicción probatoria.',
    pedagogicalTip: 'Siempre tienes derecho a ser escuchado, presentar pruebas y solicitar acompañamiento antes de cualquier decisión.',
    domain: 'Debido Proceso',
    difficulty: 'intermedio'
  },
  {
    id: 205,
    chapterId: 'cap2',
    chapterNumber: 'Capítulo II',
    chapterTitle: 'Derechos del Aprendiz y Estímulos',
    articleRef: 'Acuerdo 009 de 2024 - Art. 6 (Apoyos y Semilleros)',
    question: '¿Qué iniciativa de investigación formativa prioriza a los aprendices con rendimiento sobresaliente?',
    options: [
      'La vinculación a semilleros de investigación aplicada SENNOVA y proyectos de innovación en TecnoParques.',
      'Contratos de publicidad con marcas comerciales externas.',
      'Concesiones para administrar comedores institucionales.',
      'Permiso para inasistir a clase sin soporte alguno.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 6 incentiva la participación de aprendices destacados en proyectos de I+D+i a través de los semilleros SENNOVA.',
    pedagogicalTip: 'Involúcrate temprano en los semilleros de investigación SENNOVA para enriquecer tu hoja de vida profesional.',
    domain: 'Estímulos e Incentivos',
    difficulty: 'avanzado'
  },

  // ==================== CAPÍTULO III: DEBERES Y PROHIBICIONES ====================
  {
    id: 301,
    chapterId: 'cap3',
    chapterNumber: 'Capítulo III',
    chapterTitle: 'Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Art. 8 (Porte del Carné Institucional)',
    question: 'De acuerdo con el Artículo 8 (numeral relativo a identificación), ¿cómo debe portarse el carné institucional?',
    options: [
      'En lugar visible del pecho o cuello durante toda la permanencia en las instalaciones y ambientes de aprendizaje del SENA.',
      'Guardado exclusivamente en la billetera o maletín sin mostrarlo a nadie.',
      'Únicamente es necesario llevarlo el día de la ceremonia de grado.',
      'Es opcional y puede reemplazarse por una foto en redes sociales.'
    ],
    correctIndex: 0,
    explanation: 'Portar visiblemente el carné es obligatorio por seguridad institucional y porque activa la cobertura de la póliza de accidentes escolares.',
    pedagogicalTip: 'El carné visible identifica tu calidad de aprendiz y es requisito de ingreso en todas las sedes del país.',
    domain: 'Deberes de Seguridad',
    difficulty: 'básico'
  },
  {
    id: 302,
    chapterId: 'cap3',
    chapterNumber: 'Capítulo III',
    chapterTitle: 'Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Art. 8 (Justificación de Inasistencias)',
    question: '¿Cuál es el plazo improrrogable establecido en el Artículo 8 para presentar justificaciones ante inasistencias imprevistas?',
    options: [
      'Dentro de los tres (3) días hábiles siguientes al hecho generador con el soporte formal respectivo.',
      'Al finalizar el año calendario en una carta dirigida a la Dirección General.',
      'Quince (15) días después de que el instructor reporte la deserción en Sofia Plus.',
      'No hay plazo límite si se envía un mensaje de voz informal por WhatsApp.'
    ],
    correctIndex: 0,
    explanation: 'El término legal estipulado en el Artículo 8 y 14 es de tres (3) días hábiles para allegar incapacidad médica oficial o prueba de fuerza mayor.',
    pedagogicalTip: '¡Regla de oro!: si faltas por fuerza mayor médica o calamidad, radica tu soporte antes de que venzan los 3 días hábiles.',
    domain: 'Deberes Académicos',
    difficulty: 'básico'
  },
  {
    id: 303,
    chapterId: 'cap3',
    chapterNumber: 'Capítulo III',
    chapterTitle: 'Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Art. 9 (Prohibición de Plagio y Fraude)',
    question: '¿Qué consecuencia tipifica el Artículo 9 respecto al plagio en evidencias y la suplantación de identidad?',
    options: [
      'Constituye una prohibición expresa calificada como falta grave o gravísima que da lugar a medidas formativas o sanción disciplinaria.',
      'Es una práctica recomendada para ahorrar tiempo en el desarrollo del proyecto.',
      'Se tolera si la evidencia obtiene una calificación superior a 80 puntos.',
      'Solo se sanciona si el autor original reside en el mismo municipio.'
    ],
    correctIndex: 0,
    explanation: 'El plagio vulnera la ética formativa, los derechos de autor y el Saber Ser, acarreando investigación y sanción disciplinaria.',
    pedagogicalTip: 'Cita siempre las fuentes y autores en tus entregas; la honestidad intelectual es pilar esencial en el SENA.',
    domain: 'Prohibiciones Éticas',
    difficulty: 'intermedio'
  },
  {
    id: 304,
    chapterId: 'cap3',
    chapterNumber: 'Capítulo III',
    chapterTitle: 'Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Art. 9 (Sustancias Prohibidas y Armas)',
    question: '¿Qué dispone el Artículo 9 sobre el ingreso de sustancias psicoactivas, bebidas alcohólicas o armas a las sedes del SENA?',
    options: [
      'Está terminantemente prohibido su ingreso, porte, consumo o distribución, considerándose falta gravísima de inmediata repercusión.',
      'Se permite el consumo moderado durante eventos recreativos de fin de semana.',
      'Solo aplica la prohibición para aprendices menores de 18 años.',
      'Requiere únicamente permiso verbal del vocero de la ficha.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 9 prohíbe categóricamente el porte de armas y sustancias estupefacientes o alcohol para salvaguardar la vida y convivencia.',
    pedagogicalTip: 'Los ambientes SENA son espacios seguros libres de alcohol, tabaco y sustancias psicoactivas.',
    domain: 'Prohibiciones Expresas',
    difficulty: 'básico'
  },
  {
    id: 305,
    chapterId: 'cap3',
    chapterNumber: 'Capítulo III',
    chapterTitle: 'Deberes y Prohibiciones',
    articleRef: 'Acuerdo 009 de 2024 - Art. 8 (Cuidado de Bienes Institucionales)',
    question: '¿Qué deber tienen los aprendices frente a la maquinaria, laboratorios y recursos tecnológicos del SENA?',
    options: [
      'Cuidar, mantener en óptimas condiciones y dar uso estrictamente formativo a los bienes, reportando cualquier anomalía.',
      'Desensamblar los equipos para llevar partes a casa sin autorización.',
      'Utilizar los computadores para minería de criptomonedas o juegos de azar.',
      'Subarrendar los espacios de taller a terceros comerciales.'
    ],
    correctIndex: 0,
    explanation: 'Los bienes del SENA son patrimonio público financiado con recursos de los colombianos para la formación de las futuras generaciones.',
    pedagogicalTip: 'Trata las herramientas y computadores del SENA con el máximo esmero y respeto como bienes colectivos.',
    domain: 'Deberes de Convivencia',
    difficulty: 'básico'
  },

  // ==================== CAPÍTULO IV: INGRESO, PERMANENCIA Y CERTIFICACIÓN ====================
  {
    id: 401,
    chapterId: 'cap4',
    chapterNumber: 'Capítulo IV',
    chapterTitle: 'Ingreso, Permanencia y Certificación',
    articleRef: 'Acuerdo 009 de 2024 - Art. 11 (Inducción Institucional)',
    question: '¿Cuál es la naturaleza y obligatoriedad del proceso de Inducción según el Artículo 11?',
    options: [
      'Es una etapa inicial obligatoria que apropia la identidad, valores, plataformas y el modelo pedagógico FPI de la institución.',
      'Es un trámite voluntario que solo deben realizar quienes no tengan experiencia laboral.',
      'Consiste en un día de campo sin contenido curricular alguno.',
      'Se puede convalidar presentando la factura de internet de la vivienda.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 11 define la inducción como la primera fase formativa estructurada para garantizar la inmersión del aprendiz en la cultura SENA.',
    pedagogicalTip: 'La inducción sienta las bases del éxito formativo y es tu primer contacto con el ecosistema de oportunidades del SENA.',
    domain: 'Proceso de Inducción',
    difficulty: 'básico'
  },
  {
    id: 402,
    chapterId: 'cap4',
    chapterNumber: 'Capítulo IV',
    chapterTitle: 'Ingreso, Permanencia y Certificación',
    articleRef: 'Acuerdo 009 de 2024 - Art. 22 (Escala de Calificación A / D)',
    question: '¿Cómo funciona la escala oficial de juicios de evaluación en el SENA según el Artículo 22?',
    options: [
      'Cualitativa con dos juicios: "A" (Aprobado - competencia lograda) y "D" (No Aprobado - exige concertar Plan de Mejoramiento).',
      'Numérica de 1 a 100 donde 60 es la nota mínima de paso.',
      'Por letras de la A a la F como en el sistema escolar tradicional.',
      'Únicamente se califica si el aprendiz asistió con uniforme completo.'
    ],
    correctIndex: 0,
    explanation: 'En el SENA la evaluación es por competencias laborales: o eres competente (Aprobado) o aún debes reforzar evidencias con plan de mejoramiento (No Aprobado).',
    pedagogicalTip: 'Obtener un juicio "D" no es el fin del camino: activa tu derecho pedagógico a concertar un Plan de Mejoramiento.',
    domain: 'Evaluación del Aprendizaje',
    difficulty: 'intermedio'
  },
  {
    id: 403,
    chapterId: 'cap4',
    chapterNumber: 'Capítulo IV',
    chapterTitle: 'Ingreso, Permanencia y Certificación',
    articleRef: 'Acuerdo 009 de 2024 - Arts. 23 a 28 (Alternativas de Etapa Productiva)',
    question: '¿Cuál de las siguientes es una alternativa válida reconocida para el desarrollo de la Etapa Productiva (Arts. 23-28)?',
    options: [
      'Contrato de Aprendizaje, Proyecto Productivo, Pasantía Institucional, Monitoría o Vínculo Laboral afín al programa.',
      'Prestar servicio militar obligatorio sin relación con la tecnología.',
      'Publicar videos en plataformas de streaming sobre videojuegos.',
      'Tomar un año sabático de vacaciones sin vinculación alguna.'
    ],
    correctIndex: 0,
    explanation: 'El Acuerdo 009 de 2024 reconoce múltiples modalidades flexibles para que el aprendiz aplique sus competencias en el entorno real de trabajo.',
    pedagogicalTip: 'Elige con anticipación la alternativa de etapa productiva que mejor se ajuste a tu perfil y proyecto de vida.',
    domain: 'Etapa Productiva',
    difficulty: 'intermedio'
  },
  {
    id: 404,
    chapterId: 'cap4',
    chapterNumber: 'Capítulo IV',
    chapterTitle: 'Ingreso, Permanencia y Certificación',
    articleRef: 'Acuerdo 009 de 2024 - Art. 20 (Causales de Deserción)',
    question: '¿En qué caso se configura formalmente el trámite preventivo de Deserción según el Artículo 20?',
    options: [
      'Inasistencia injustificada durante tres (3) días continuos en presencial o incumplimiento reiterado en el envío de evidencias en virtual sin justificación.',
      'Llegar 5 minutos tarde a una clase en el primer mes.',
      'Pedir cambio de jornada por motivos laborales acreditados.',
      'Preguntar dudas al instructor de manera insistente.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 20 tipifica la deserción tras tres días continuos sin justificar, requiriendo citación previa antes del reporte final en Sofia Plus.',
    pedagogicalTip: 'Nunca dejes de comunicarte con tu centro; ante cualquier dificultad personal, tramita un aplazamiento antes de acumular inasistencias.',
    domain: 'Novedades de Matrícula',
    difficulty: 'intermedio'
  },
  {
    id: 405,
    chapterId: 'cap4',
    chapterNumber: 'Capítulo IV',
    chapterTitle: 'Ingreso, Permanencia y Certificación',
    articleRef: 'Acuerdo 009 de 2024 - Art. 38 (Actualización de Datos)',
    question: '¿Por qué el Artículo 38 obliga a mantener actualizados los datos de contacto y correo electrónico en Sofia Plus?',
    options: [
      'Porque allí se notifican legalmente las citaciones, contratos de aprendizaje, llamados y expedición de certificaciones oficiales.',
      'Para enviar publicidad de compañías telefónicas comerciales.',
      'Para que el SENA venda bases de datos a agencias de turismo.',
      'No tiene valor legal y se puede ignorar.'
    ],
    correctIndex: 0,
    explanation: 'El correo registrado en Sofia Plus es el canal procesal oficial para comunicaciones institucionales y notificaciones válidas.',
    pedagogicalTip: 'Revisa periódicamente que tu correo y teléfono en Sofia Plus coincidan con tus datos activos.',
    domain: 'Permanencia Institucional',
    difficulty: 'básico'
  },

  // ==================== CAPÍTULO V: FALTAS Y RÉGIMEN SANCIONATORIO ====================
  {
    id: 501,
    chapterId: 'cap5',
    chapterNumber: 'Capítulo V',
    chapterTitle: 'Faltas y Régimen Disciplinario',
    articleRef: 'Acuerdo 009 de 2024 - Art. 39 (Tipificación de Faltas)',
    question: '¿Cómo se clasifican las faltas cometidas por los aprendices según el Artículo 39?',
    options: [
      'En Faltas Académicas (incumplimiento en resultados y evidencias) y Faltas Disciplinarias (conductas contra la convivencia y normas institucionales).',
      'En Faltas Deportivas y Faltas Recreativas exclusivamente.',
      'En Errores de tipeo y Errores de impresión.',
      'Únicamente en faltas monetarias y de vestuario.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 39 distingue claramente la dimensión formativa del saber (académica) frente a la dimensión ética ciudadana (disciplinaria).',
    pedagogicalTip: 'Tanto el rendimiento técnico como el respeto interpersonal son evaluados dentro del desarrollo integral del aprendiz.',
    domain: 'Tipificación Disciplinaria',
    difficulty: 'básico'
  },
  {
    id: 502,
    chapterId: 'cap5',
    chapterNumber: 'Capítulo V',
    chapterTitle: 'Faltas y Régimen Disciplinario',
    articleRef: 'Acuerdo 009 de 2024 - Art. 42 (Medidas Formativas Pedagógicas)',
    question: 'Antes de aplicar una sanción formal, ¿cuáles son las Medidas Formativas Pedagógicas y Restaurativas que contempla el Artículo 42?',
    options: [
      'Llamado de atención verbal reflexivo, llamado de atención escrito con suscripción de acta de compromiso y plan de mejoramiento.',
      'Suspensión inmediata de los servicios públicos de la vivienda del aprendiz.',
      'Aislamiento forzoso en una celda durante el horario de formación.',
      'Retención de documentos de identidad civil.'
    ],
    correctIndex: 0,
    explanation: 'El modelo es restaurativo: busca que el aprendiz reflexione, asuma compromisos por escrito y supere sus deficiencias antes de medidas punitivas.',
    pedagogicalTip: 'El acta de compromiso es una oportunidad pedagógica para reorientar tu proceso formativo de manera concertada.',
    domain: 'Justicia Restaurativa',
    difficulty: 'intermedio'
  },
  {
    id: 503,
    chapterId: 'cap5',
    chapterNumber: 'Capítulo V',
    chapterTitle: 'Faltas y Régimen Disciplinario',
    articleRef: 'Acuerdo 009 de 2024 - Art. 47 (Comité de Evaluación y Seguimiento)',
    question: '¿Quiénes integran el Comité de Evaluación y Seguimiento según el Artículo 47?',
    options: [
      'El Subdirector de Centro o su delegado, coordinador académico, instructores de la ficha, profesional de bienestar y el Vocero de Ficha.',
      'Únicamente un juez de la república y la policía nacional.',
      'Exclusivamente la empresa patrocinadora sin participación de docentes.',
      'Cualquier grupo de transeúntes convocados por megáfono.'
    ],
    correctIndex: 0,
    explanation: 'El Comité es un órgano colegiado democrático donde el Vocero de Ficha tiene voz activa para velar por las garantías de sus compañeros.',
    pedagogicalTip: 'La presencia del vocero de ficha asegura la representatividad y equidad en las deliberaciones del comité.',
    domain: 'Órganos Colegiados',
    difficulty: 'intermedio'
  },
  {
    id: 504,
    chapterId: 'cap5',
    chapterNumber: 'Capítulo V',
    chapterTitle: 'Faltas y Régimen Disciplinario',
    articleRef: 'Acuerdo 009 de 2024 - Art. 52 (Recurso de Reposición)',
    question: 'Si a un aprendiz se le notifica un acto administrativo de sanción emitido por Subdirección, ¿qué recurso de ley puede interponer?',
    options: [
      'El Recurso de Reposición ante el mismo Subdirector de Centro dentro del término legal estipulado tras la notificación.',
      'Una demanda ante la Corte Internacional de Justicia de La Haya.',
      'No tiene derecho a presentar ningún recurso ni reclamo.',
      'Pedir una votación por redes sociales para anular el acto.'
    ],
    correctIndex: 0,
    explanation: 'El Artículo 52 consagra el derecho fundamental al Recurso de Reposición para que la entidad revise los argumentos de defensa y pruebas aportadas.',
    pedagogicalTip: 'El debido proceso garantiza que siempre puedas impugnar y fundamentar tu posición ante resoluciones de subdirección.',
    domain: 'Recursos Legales',
    difficulty: 'avanzado'
  },
  {
    id: 505,
    chapterId: 'cap5',
    chapterNumber: 'Capítulo V',
    chapterTitle: 'Faltas y Régimen Disciplinario',
    articleRef: 'Acuerdo 009 de 2024 - Art. 44 (Sanciones Disciplinarias)',
    question: '¿Cuáles son las sanciones disciplinarias formales que puede adoptar la Subdirección ante faltas graves o gravísimas comprobadas?',
    options: [
      'El Condicionamiento de la matrícula y la Cancelación de la matrícula con imposibilidad temporal de reingreso al SENA.',
      'Prisión domiciliaria impuesta por el coordinador de centro.',
      'Confiscación de computadores y teléfonos personales.',
      'Trabajo forzado no remunerado en obras públicas.'
    ],
    correctIndex: 0,
    explanation: 'Las sanciones tipificadas son de orden estrictamente académico-administrativo: condicionamiento o cancelación definitiva de matrícula.',
    pedagogicalTip: 'Evita incurrir en faltas graves; el condicionamiento te coloca en estado de observación estricto para proteger tu cupo.',
    domain: 'Sanciones Institucionales',
    difficulty: 'intermedio'
  }
];

/**
 * Intelligent question selector: selects balanced questions across chapters
 * and avoids repetitions within the session.
 */
export function generateBalancedQuiz(
  questionsPerChapter: number = 2
): RegulationQuestion[] {
  const selected: RegulationQuestion[] = [];
  const chapters: Array<'cap1' | 'cap2' | 'cap3' | 'cap4' | 'cap5'> = [
    'cap1',
    'cap2',
    'cap3',
    'cap4',
    'cap5'
  ];

  chapters.forEach((chapId) => {
    const chapterPool = REGULATION_QUESTION_BANK.filter((q) => q.chapterId === chapId);
    // Shuffle the chapter questions
    const shuffled = [...chapterPool].sort(() => 0.5 - Math.random());
    // Pick requested amount
    const picked = shuffled.slice(0, Math.min(questionsPerChapter, chapterPool.length));
    selected.push(...picked);
  });

  // Final shuffle of the selected list so chapters are mixed or grouped dynamically
  return selected;
}

export interface GamificationLevel {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  badge: string;
  color: string;
  description: string;
}

export const GAMIFICATION_LEVELS: GamificationLevel[] = [
  {
    level: 1,
    title: 'Aprendiz Inicial',
    minPoints: 0,
    maxPoints: 499,
    badge: '🌱',
    color: '#10B981',
    description: 'Comenzando el viaje por el Acuerdo 009 de 2024'
  },
  {
    level: 2,
    title: 'Conocedor del Reglamento',
    minPoints: 500,
    maxPoints: 899,
    badge: '📘',
    color: '#0284C7',
    description: 'Dominio de deberes básicos y derechos de formación'
  },
  {
    level: 3,
    title: 'Experto Normativo',
    minPoints: 900,
    maxPoints: 1299,
    badge: '⚖️',
    color: '#8B5CF6',
    description: 'Comprensión profunda de debidos procesos y permanencia'
  },
  {
    level: 4,
    title: 'Maestro del Reglamento',
    minPoints: 1300,
    maxPoints: 1699,
    badge: '🏅',
    color: '#F59E0B',
    description: 'Liderazgo ético ejemplar y resolución de casos complejos'
  },
  {
    level: 5,
    title: 'Embajador SENA',
    minPoints: 1700,
    maxPoints: 99999,
    badge: '👑',
    color: '#39A900',
    description: 'Referente institucional de probidad, excelencia y convivencia'
  }
];

export function getLevelForScore(points: number): GamificationLevel {
  return (
    GAMIFICATION_LEVELS.find(
      (lvl) => points >= lvl.minPoints && points <= lvl.maxPoints
    ) || GAMIFICATION_LEVELS[GAMIFICATION_LEVELS.length - 1]
  );
}
