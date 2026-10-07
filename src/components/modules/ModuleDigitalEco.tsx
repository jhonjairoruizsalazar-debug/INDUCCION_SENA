import React, { useState } from 'react';
import { Laptop, Database, Mail, BookOpen, Briefcase, Rocket, CheckCircle, ExternalLink, ChevronRight } from 'lucide-react';

interface ModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleDigitalEco: React.FC<ModuleProps> = ({ onComplete, isCompleted }) => {
  const [activePlatform, setActivePlatform] = useState<string>('sofia');
  const [interactiveTaskIndex, setInteractiveTaskIndex] = useState(0);
  const [taskSelectedPlatform, setTaskSelectedPlatform] = useState<string | null>(null);
  const [correctTasksCount, setCorrectTasksCount] = useState(0);

  // Practical Step-by-Step Guide State
  const [stepPlatform, setStepPlatform] = useState<'sofia' | 'zajuna' | 'sbs'>('sofia');
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(0);

  const stepGuides = {
    sofia: {
      title: 'SENA SOFIA Plus (Gestión Académica & Trámites)',
      url: 'http://senasofiaplus.edu.co/sofia-public/',
      steps: [
        {
          title: 'Paso 1: Autenticación Segura',
          desc: 'Ingresa a senasofiaplus.edu.co, selecciona tipo de documento (CC, TI, PPT), digita tu número y contraseña personal. Nunca compartas tus credenciales.'
        },
        {
          title: 'Paso 2: Selección del Rol "Aprendiz"',
          desc: 'En la esquina superior derecha, despliega el menú de roles y selecciona "Aprendiz". Verás los módulos de Ejecución de la Formación, Certificación y Registro.'
        },
        {
          title: 'Paso 3: Descarga de Certificados y Constancias',
          desc: 'Ve a Certificación → Consultar Constancias → Descargar Certificado de Estudio. El documento oficial incluye código de verificación y firma digital del SENA.'
        },
        {
          title: 'Paso 4: Solicitud de Novedades Académicas',
          desc: 'Si requieres traslado de centro, aplazamiento justificado o cambio de jornada, radícalo en Registro → Novedades dentro de los plazos reglamentarios.'
        }
      ]
    },
    zajuna: {
      title: 'Ambiente Virtual de Aprendizaje Zajuna (LMS)',
      url: 'https://zajuna.sena.edu.co/',
      steps: [
        {
          title: 'Paso 1: Ingreso al Campus Virtual',
          desc: 'Accede a zajuna.sena.edu.co e inicia sesión con las mismas credenciales institucionales de SOFIA Plus. Revisa el banner de tu ficha de formación.'
        },
        {
          title: 'Paso 2: Exploración de "Contenido del Curso"',
          desc: 'Accede a la estructura del programa: Carpeta Proyecto → Fases (Análisis, Planeación, Ejecución, Evaluación) y descarga la Guía de Aprendizaje vigente.'
        },
        {
          title: 'Paso 3: Envío Formal de Evidencias',
          desc: 'En el menú "Evidencias", localiza la actividad programada, adjunta tu archivo en formato PDF/ZIP, redacta una nota al instructor y presiona "Contestar".'
        },
        {
          title: 'Paso 4: Seguimiento al Centro de Calificaciones',
          desc: 'Verifica periódicamente tus juicios evaluativos cualitativos: "A" (Aprobado) o "D" (Deficiente / Por Mejorar) con la retroalimentación del instructor.'
        }
      ]
    },
    sbs: {
      title: 'Sistema de Bibliotecas SENA (SBS & Investigación)',
      url: 'https://biblioteca.sena.edu.co/',
      steps: [
        {
          title: 'Paso 1: Acceso al Portal Bibliográfico',
          desc: 'Ingresa a biblioteca.sena.edu.co desde cualquier dispositivo para acceder al repositorio nacional y bases de datos gratuitas.'
        },
        {
          title: 'Paso 2: Consulta del Catálogo & Repositorio',
          desc: 'Busca libros físicos disponibles para préstamo en tu Centro de Formación o consulta proyectos formativos y monografías de egresados SENA.'
        },
        {
          title: 'Paso 3: Bases de Datos Científicas Internacionales',
          desc: 'Autentícate con tu correo institucional y accede sin costo a plataformas de alto impacto como ScienceDirect, Scopus, IEEE y Ambientalex.'
        },
        {
          title: 'Paso 4: Asesoría en Normas APA y Formación en Búsqueda',
          desc: 'Aprovecha las capacitaciones virtuales gratuitas impartidas por los bibliotecólogos del SENA para citar tus proyectos y evitar el plagio.'
        }
      ]
    }
  };

  const platforms = [
    {
      id: 'sofia',
      name: 'SENA SOFIA Plus',
      acronym: 'Sistema de Gestión Académica',
      icon: Database,
      tag: 'Gestión & Certificados',
      summary: 'El núcleo de administración educativa donde reposa tu historial académico oficial.',
      features: [
        'Consulta de fichas de caracterización y estado de matrícula (Inducción, En Formación, Certificado).',
        'Registro formal de novedades académicas (traslado de centro, aplazamiento, retiro voluntario).',
        'Descarga de certificados oficiales de estudio, actas de grado y constancias con firma digital.',
        'Verificación de juicios evaluativos por competencia.'
      ],
      portalUrl: 'http://senasofiaplus.edu.co/sofia-public/'
    },
    {
      id: 'zajuna',
      name: 'Zajuna (LMS)',
      acronym: 'Ambiente Virtual de Aprendizaje',
      icon: Laptop,
      tag: 'Aulas & Evidencias',
      summary: 'El campus virtual diario donde interactúas con instructores, materiales y actividades formativas.',
      features: [
        'Envío formal de evidencias técnicas y talleres evaluativos.',
        'Foros temáticos, foros sociales y foros de dudas e inquietudes.',
        'Acceso a guías de aprendizaje, material complementario y grabaciones de sesiones en línea.',
        'Consulta del centro de calificaciones con la retroalimentación cualitativa del instructor.'
      ],
      portalUrl: 'https://zajuna.sena.edu.co/'
    },
    {
      id: 'misena',
      name: 'Correo MiSENA',
      acronym: 'Identidad y Comunicación Oficial',
      icon: Mail,
      tag: 'Comunicación Institucional',
      summary: 'Tu buzón oficial institucional como aprendiz de la república de Colombia.',
      features: [
        'Cuenta oficial con terminación @misena.edu.co o @sena.edu.co.',
        'Canal formal exclusivo para citaciones, circulares de Bienestar y notificaciones de comités.',
        'Acceso a suite ofimática en la nube y almacenamiento para proyectos formativos.'
      ],
      portalUrl: 'https://correo.misena.edu.co'
    },
    {
      id: 'sbs',
      name: 'Sistema de Bibliotecas (SBS)',
      acronym: 'Investigación & Literatura Científica',
      icon: BookOpen,
      tag: 'Bases de Datos & Libros',
      summary: 'Red nacional de bibliotecas y repositorio digital con acceso gratuito ilimitado.',
      features: [
        'Acceso a millones de libros electrónicos y revistas académicas indexadas.',
        'Bases de datos internacionales especializadas: ScienceDirect, Scopus, EBSCO, Ambientalex.',
        'Repositorio institucional con monografías, proyectos de grado y patentes SENA.'
      ],
      portalUrl: 'https://biblioteca.sena.edu.co/'
    },
    {
      id: 'ape',
      name: 'Agencia Pública de Empleo (APE)',
      acronym: 'Intermediación Laboral Gratuita',
      icon: Briefcase,
      tag: 'Empleabilidad & Vacantes',
      summary: 'La plataforma que conecta a los aprendices y egresados con empresas de todo el país.',
      features: [
        'Registro y estructuración de tu hoja de vida profesional.',
        'Postulación a ofertas laborales nacionales e internacionales para contratos de aprendizaje y egresados.',
        'Talleres gratuitos de orientación ocupacional y preparación para entrevistas.'
      ],
      portalUrl: 'https://ape.sena.edu.co'
    },
    {
      id: 'sennova',
      name: 'SENNOVA & Fondo Emprender',
      acronym: 'Investigación e Innovación Abierta',
      icon: Rocket,
      tag: 'Emprendimiento & I+D+i',
      summary: 'Ecosistema de investigación aplicada, tecnoparques y capital semilla para tus ideas de negocio.',
      features: [
        'Participación en Semilleros de Investigación aplicada del Centro de Formación.',
        'Acceso a laboratorios de prototipado y nanotecnología en TecnoParques.',
        'Postulación al Fondo Emprender para capital semilla condonable para crear tu propia empresa.'
      ],
      portalUrl: 'https://www.fondoemprender.com'
    }
  ];

  const tasksToSolve = [
    {
      task: 'Necesitas descargar tu certificado oficial de notas y constancia de matrícula para presentar a tu EPS o caja de compensación.',
      correctPlatformId: 'sofia',
      hint: 'Se gestiona en el sistema central administrativo de gestión académica (SOFIA Plus).'
    },
    {
      task: 'Tu instructor te dejó una guía de aprendizaje y debes adjuntar el informe técnico en formato PDF antes del viernes a medianoche.',
      correctPlatformId: 'zajuna',
      hint: 'Es el LMS o campus virtual de formación diaria (Zajuna).'
    },
    {
      task: 'Estás investigando para tu proyecto formativo y necesitas consultar libros científicos indexados y normas técnicas NTC actualizadas.',
      correctPlatformId: 'sbs',
      hint: 'El Sistema de Bibliotecas SENA (SBS) brinda acceso gratuito a bases de datos.'
    },
    {
      task: 'Estás a punto de graduarte y deseas registrar tu hoja de vida para postularte a vacantes formales en empresas aliadas.',
      correctPlatformId: 'ape',
      hint: 'La Agencia Pública de Empleo (APE) gestiona la intermediación laboral.'
    }
  ];

  const currentTask = tasksToSolve[interactiveTaskIndex];

  const handleResolveTask = (platformId: string) => {
    setTaskSelectedPlatform(platformId);
    if (platformId === currentTask.correctPlatformId) {
      const nextCount = correctTasksCount + 1;
      setCorrectTasksCount(nextCount);
      if (nextCount >= 3) {
        onComplete();
      }
    }
  };

  const nextTask = () => {
    setTaskSelectedPlatform(null);
    setInteractiveTaskIndex((prev) => (prev + 1) % tasksToSolve.length);
  };

  const activeData = platforms.find((p) => p.id === activePlatform) || platforms[0];
  const IconComponent = activeData.icon;

  const currentGuide = stepGuides[stepPlatform];

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-semibold text-emerald-800 dark:text-emerald-400">Módulo 04</span>
          <span aria-hidden="true">·</span>
          <span>Tecnología Institucional</span>
          <span aria-hidden="true">·</span>
          <span>15 min estimados</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight font-display">
          Ecosistema Digital: Guía Práctica de Herramientas SENA
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Domina los tres pilares tecnológicos del aprendiz: SOFIA Plus para gestión académica, Zajuna como entorno virtual de aprendizaje, y el Sistema de Bibliotecas SENA (SBS) para investigación.
        </p>
      </div>

      {/* Interactive Step-by-Step Practical Guide */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 space-y-6 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60 dark:border-white/5">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
              Tutoriales Paso a Paso
            </span>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
              Guía de Navegación en Plataformas Clave
            </h3>
          </div>

          <div className="flex gap-1.5 p-1.5 rounded-2xl neu-inset text-xs">
            <button
              onClick={() => {
                setStepPlatform('sofia');
                setCurrentStepNumber(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                stepPlatform === 'sofia'
                  ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Sofia Plus
            </button>
            <button
              onClick={() => {
                setStepPlatform('zajuna');
                setCurrentStepNumber(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                stepPlatform === 'zajuna'
                  ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Zajuna (LMS)
            </button>
            <button
              onClick={() => {
                setStepPlatform('sbs');
                setCurrentStepNumber(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                stepPlatform === 'sbs'
                  ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Biblioteca SENA
            </button>
          </div>
        </div>

        {/* Step Guide Interactive Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps List */}
          <div className="space-y-2">
            {currentGuide.steps.map((st, i) => (
              <button
                key={i}
                onClick={() => setCurrentStepNumber(i)}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  currentStepNumber === i
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-bold text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-stone-50 dark:bg-[#18201b] border-stone-200 dark:border-[#26332a] text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#202b24]'
                }`}
              >
                <span>{st.title}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
              </button>
            ))}

            <a
              href={currentGuide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
            >
              <span>Ir al portal oficial: {currentGuide.title.split(' (')[0]}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Current Step Focus Canvas */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-stone-50 dark:bg-[#18201b] border border-stone-200 dark:border-[#26332a] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-mono text-emerald-800 dark:text-emerald-400 font-bold">
                  {currentGuide.steps[currentStepNumber].title}
                </span>
                <span className="text-xs font-mono text-stone-400">
                  {currentStepNumber + 1} de {currentGuide.steps.length}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                {currentGuide.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pt-1">
                {currentGuide.steps[currentStepNumber].desc}
              </p>
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-[#26332a] flex items-center justify-between mt-4">
              <button
                disabled={currentStepNumber === 0}
                onClick={() => setCurrentStepNumber((prev) => prev - 1)}
                className="px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-30"
              >
                ← Paso Anterior
              </button>
              <button
                disabled={currentStepNumber === currentGuide.steps.length - 1}
                onClick={() => setCurrentStepNumber((prev) => prev + 1)}
                className="px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 disabled:opacity-30"
              >
                Siguiente Paso →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Explorer */}
      <section className="bg-white dark:bg-[#141b16] rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-[#222e26] shadow-xs transition-colors">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
            Directorio Oficial
          </span>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display mt-1">
            Plataformas Tecnológicas al Servicio del Aprendiz
          </h3>
        </div>

        {/* Platform Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {platforms.map((p) => {
            const PtrIcon = p.icon;
            const isSelected = activePlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500 shadow-xs'
                    : 'bg-stone-50 dark:bg-[#19221c] border-stone-200 dark:border-[#26332a] hover:bg-stone-100 dark:hover:bg-[#202c24]'
                }`}
              >
                <PtrIcon className={`w-5 h-5 mb-2 ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'}`} />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {p.name.split(' (')[0]}
                  </h4>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 truncate block">
                    {p.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Platform Detail Card */}
        <div className="bg-stone-50 dark:bg-[#18201b] rounded-xl p-6 border border-stone-200 dark:border-[#26332a]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-[#26332a]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1f2922] border border-stone-200 dark:border-[#2d3d32] flex items-center justify-center shadow-xs">
                <IconComponent className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
                  {activeData.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {activeData.acronym}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-white dark:bg-[#1f2922] border border-stone-200 dark:border-[#2d3d32] rounded-lg text-emerald-800 dark:text-emerald-300">
              {activeData.tag}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 my-4 leading-relaxed">
            {activeData.summary}
          </p>

          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Funcionalidades Clave para el Aprendiz:
            </h5>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              {activeData.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white dark:bg-[#1f2922] p-2.5 rounded-lg border border-stone-200 dark:border-[#2d3d32]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Simulator: "Simulador de Trámites Digitales" */}
      <section className="bg-emerald-950 dark:bg-[#07190f] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-900/60 dark:border-[#1d3d28]">
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-emerald-900 dark:border-emerald-900/80">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Simulador Práctico
            </span>
            <h3 className="text-xl font-bold font-display mt-0.5">
              ¿A qué plataforma debes acudir?
            </h3>
            <p className="text-xs text-emerald-200">
              Caso {interactiveTaskIndex + 1} de {tasksToSolve.length}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-emerald-300">
              Aciertos: {correctTasksCount} / {tasksToSolve.length}
            </span>
          </div>
        </div>

        {/* Task prompt */}
        <div className="bg-emerald-900/60 dark:bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 dark:border-emerald-800/80 my-4">
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            "{currentTask.task}"
          </p>
        </div>

        {/* Platform choices */}
        <p className="text-xs text-emerald-300 mb-2 font-semibold">
          Selecciona la plataforma correcta para gestionar esta solicitud:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {platforms.map((p) => {
            const isSelected = taskSelectedPlatform === p.id;
            const isCorrect = p.id === currentTask.correctPlatformId;

            return (
              <button
                key={p.id}
                onClick={() => handleResolveTask(p.id)}
                className={`p-3 rounded-lg text-left text-xs transition-all border ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-400'
                      : 'bg-rose-900 border-rose-600 text-rose-100'
                    : 'bg-emerald-900/40 dark:bg-emerald-950/40 border-emerald-800 dark:border-[#1f3a28] text-emerald-200 hover:bg-emerald-800 dark:hover:bg-emerald-900/60'
                }`}
              >
                <div className="font-bold truncate">{p.name.split(' (')[0]}</div>
                <div className="text-[10px] opacity-75 truncate">{p.tag}</div>
              </button>
            );
          })}
        </div>

        {/* Feedback on task selection */}
        {taskSelectedPlatform && (
          <div className="mt-4 pt-4 border-t border-emerald-800 flex items-center justify-between">
            <div className="text-xs">
              {taskSelectedPlatform === currentTask.correctPlatformId ? (
                <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  ¡Correcto! Has seleccionado la plataforma exacta para este requerimiento.
                </span>
              ) : (
                <span className="text-rose-300">
                  Respuesta incorrecta. Pista: {currentTask.hint}
                </span>
              )}
            </div>

            <button
              onClick={nextTask}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg transition-colors"
            >
              Siguiente Situación →
            </button>
          </div>
        )}
      </section>

      {isCompleted && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>¡Validado! Has completado el Módulo 04: Ecosistema Digital SENA.</span>
        </div>
      )}
    </div>
  );
};
