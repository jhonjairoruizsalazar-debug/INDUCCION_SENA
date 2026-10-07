import React, { useState } from 'react';
import { CheckCircle, Briefcase, GraduationCap, HelpCircle } from 'lucide-react';

interface ModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModulePedagogy: React.FC<ModuleProps> = ({ onComplete, isCompleted }) => {
  const [selectedPillar, setSelectedPillar] = useState<'saber' | 'hacer' | 'ser'>('saber');
  const [selectedProductiva, setSelectedProductiva] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [checkpointPassed, setCheckpointPassed] = useState(isCompleted);

  const productivaModalities = [
    {
      title: 'Contrato de Aprendizaje (Ley 789 de 2002)',
      badge: 'Modalidad Principal',
      description: 'Vinculación formal formativa con una empresa patrocinadora. Recibes un apoyo de sostenimiento mensual (75% al 100% del SMMLV según tasa de desempleo), más cobertura de salud (EPS) y riesgos laborales (ARL).',
      requirements: 'Estar matriculado en un programa titulado y no haber tenido contrato previo con la misma empresa en el mismo nivel.'
    },
    {
      title: 'Proyecto Productivo Institucional',
      badge: 'Innovación & Emprendimiento',
      description: 'Desarrollo de un proyecto técnico o de base tecnológica que responde a una necesidad del sector productivo, articulado con el Fondo Emprender o SENNOVA.',
      requirements: 'Propuesta avalada por el comité técnico y plan de negocio estructurado.'
    },
    {
      title: 'Pasantía en Empresas o Instituciones',
      badge: 'Práctica Especializada',
      description: 'Convenio entre el Centro de Formación y una entidad pública o privada para desarrollar tareas técnicas específicas orientadas a los resultados de aprendizaje.',
      requirements: 'Convenio formal suscrito y afiliación a ARL a cargo de la empresa o el SENA.'
    },
    {
      title: 'Monitorías en el Centro de Formación',
      badge: 'Liderazgo Académico',
      description: 'Apoyo a instructores en ambientes de formación especializados, laboratorios y talleres del centro, aportando a la formación de otros aprendices.',
      requirements: 'Excelente rendimiento académico y postulación en la convocatoria semestral de monitorías.'
    },
    {
      title: 'Vinculación Laboral Previa',
      badge: 'Validación en Empleo',
      description: 'Si ya te encuentras trabajando formalmente en una empresa en funciones 100% afines a tu programa de formación, puedes homologar y validar tu etapa productiva.',
      requirements: 'Certificado laboral con funciones detalladas y visto bueno del instructor de seguimiento.'
    }
  ];

  const handleQuiz = (idx: number) => {
    setQuizAnswer(idx);
    if (idx === 0) {
      setCheckpointPassed(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">Módulo 02</span>
          <span aria-hidden="true">·</span>
          <span>Pedagogía Institucional</span>
          <span aria-hidden="true">·</span>
          <span>15 min estimados</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-display">
          El Modelo Pedagógico SENA: Formación Profesional Integral (FPI)
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Descubre cómo el SENA articula la teoría y la práctica en competencias laborales, guiándote a través de la Etapa Lectiva y la Etapa Productiva para transformar tu perfil laboral.
        </p>
      </div>

      {/* The 3 Pillars of Competence */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Estructura Epistemológica
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            Los Tres Pilares de la Competencia Laboral
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            En el SENA no solo adquieres conocimientos abstractos; desarrollas destrezas técnicas y actitudes humanas para la convivencia ciudadana.
          </p>
        </div>

        {/* Pillar Selectors with Tactile Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setSelectedPillar('saber')}
            className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
              selectedPillar === 'saber'
                ? 'neu-convex ring-2 ring-emerald-500/80 scale-[1.02]'
                : 'neu-btn text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              Pilar 01
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
              Saber (Cognitivo)
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              Conceptos, teorías, principios científicos y tecnologías de la disciplina.
            </p>
          </button>

          <button
            onClick={() => setSelectedPillar('hacer')}
            className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
              selectedPillar === 'hacer'
                ? 'neu-convex ring-2 ring-emerald-500/80 scale-[1.02]'
                : 'neu-btn text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">
              Pilar 02
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
              Saber Hacer (Procedimental)
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              Destrezas motrices, operación de herramientas, resolución práctica de problemas reales.
            </p>
          </button>

          <button
            onClick={() => setSelectedPillar('ser')}
            className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
              selectedPillar === 'ser'
                ? 'neu-convex ring-2 ring-emerald-500/80 scale-[1.02]'
                : 'neu-btn text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              Pilar 03
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
              Saber Ser (Actitudinal)
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              Ética, trabajo colaborativo, puntualidad, empatía y responsabilidad social.
            </p>
          </button>
        </div>

        {/* Detailed Focus Area with Inset Well */}
        <div className="neu-inset rounded-2xl p-6">
          {selectedPillar === 'saber' && (
            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <h5 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm font-display">
                Apropiación del Conocimiento (Saber)
              </h5>
              <p className="leading-relaxed">
                Los aprendices investigan, analizan normas técnicas nacionales e internacionales (ISO, NTC), comprenden manuales de fabricante y entienden los fundamentos científicos de su especialidad técnica.
              </p>
              <div className="neu-flat p-3 rounded-xl mt-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                Evidencia típica: Cuestionarios técnicos, mapas conceptuales, análisis de casos de estudio.
              </div>
            </div>
          )}

          {selectedPillar === 'hacer' && (
            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <h5 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm font-display">
                Desempeño y Producción (Saber Hacer)
              </h5>
              <p className="leading-relaxed">
                El centro del modelo es el "Aprender Haciendo". En los talleres, simuladores y laboratorios de última generación, los aprendices construyen artefactos, programan sistemas o preparan procesos exactos.
              </p>
              <div className="neu-flat p-3 rounded-xl mt-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                Evidencia típica: Listas de chequeo de desempeño, prototipos funcionales, maquetas, informes de laboratorio.
              </div>
            </div>
          )}

          {selectedPillar === 'ser' && (
            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <h5 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm font-display">
                Dimensión Humana y Convivencia (Saber Ser)
              </h5>
              <p className="leading-relaxed">
                Un egresado SENA sobresale en el mercado laboral por su honestidad, respeto por las diferencias, cumplimiento de normas de seguridad y salud en el trabajo (SST) y liderazgo cívico.
              </p>
              <div className="neu-flat p-3 rounded-xl mt-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                Evidencia típica: Coevaluación entre pares, cumplimiento de cronogramas, decálogo del aprendiz.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* The Two Phases: Etapa Lectiva & Etapa Productiva */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Ciclo Curricular Titulado
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            Etapa Lectiva vs. Etapa Productiva
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Un programa técnico o tecnólogo se estructura en dos fases complementarias obligatorias para la certificación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Lectiva Card */}
          <div className="p-6 neu-convex rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                1. Etapa Lectiva
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-2 neu-inset p-2.5 rounded-xl">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Se desarrolla en ambientes de aprendizaje físicos, virtuales o combinados.</span>
              </li>
              <li className="flex items-start gap-2 neu-inset p-2.5 rounded-xl">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Desarrollo de guías de aprendizaje y proyectos formativos (ABP).</span>
              </li>
              <li className="flex items-start gap-2 neu-inset p-2.5 rounded-xl">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Interacción continua con instructores técnicos y transversales (bilingüismo, TIC, ética).</span>
              </li>
            </ul>
          </div>

          {/* Productiva Card */}
          <div className="p-6 neu-convex rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                2. Etapa Productiva
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-2 neu-inset p-2.5 rounded-xl">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                <span>Duración habitual de 6 meses (según el nivel del programa de formación).</span>
              </li>
              <li className="flex items-start gap-2 neu-inset p-2.5 rounded-xl">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                <span>Inmersión en el sector productivo real aplicando conocimientos en empresas.</span>
              </li>
              <li className="flex items-start gap-2 neu-inset p-2.5 rounded-xl">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                <span>Supervisión y concertación de bitácoras evaluativas con el instructor de seguimiento.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modalidades de Etapa Productiva Selector */}
        <div>
          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display mb-3">
            5 Modalidades Oficiales de Etapa Productiva
          </h4>

          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none text-xs">
            {productivaModalities.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedProductiva(idx)}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedProductiva === idx
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {m.badge}
              </button>
            ))}
          </div>

          <div className="neu-inset p-5 rounded-2xl mt-2 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm font-display">
                {productivaModalities[selectedProductiva].title}
              </h5>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full neu-flat">
                {productivaModalities[selectedProductiva].badge}
              </span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {productivaModalities[selectedProductiva].description}
            </p>
            <div className="pt-2 border-t border-stone-200/60 dark:border-white/5 text-[11px] text-stone-600 dark:text-stone-400">
              <strong>Requisitos:</strong> {productivaModalities[selectedProductiva].requirements}
            </div>
          </div>
        </div>
      </section>

      {/* Sistema de Calificación Cualitativa: A o D */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Evaluación del Aprendizaje
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            Juicios Evaluativos: Aprobado (A) o No Aprobado (D)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl neu-convex">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                A
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">Aprobado</h4>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Resultado de Aprendizaje alcanzado</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed neu-inset p-3 rounded-xl mt-3">
              El aprendiz demostró las evidencias de conocimiento, desempeño y producto requeridas en el resultado de aprendizaje según los criterios del diseño curricular.
            </p>
          </div>

          <div className="p-5 rounded-2xl neu-convex">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                D
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">Deficiente / No Aprobado</h4>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Requiere Plan de Mejoramiento</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed neu-inset p-3 rounded-xl mt-3">
              No se alcanzaron los criterios mínimos. El instructor concertará de inmediato un <strong>Plan de Mejoramiento</strong> pedagógico con nuevas actividades y fechas para superar la dificultad.
            </p>
          </div>
        </div>
      </section>

      {/* Checkpoint Quiz */}
      <section className="neu-flat rounded-3xl p-6 sm:p-7 transition-all">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
              Reto de Validación del Módulo 02
            </h4>
            <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 mb-3">
              ¿Cuáles son las tres dimensiones del ser humano articuladas por el modelo de Formación Profesional Integral (FPI)?
            </p>

            <div className="space-y-2">
              {[
                'Saber (Conocimiento), Saber Hacer (Práctica) y Saber Ser (Ética y valores).',
                'Matemáticas, Física y Química aplicadas.',
                'Ventas, Mercadeo y Contabilidad financiera.'
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuiz(i)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all cursor-pointer ${
                    quizAnswer === i
                      ? i === 0
                        ? 'neu-btn-green font-bold text-white'
                        : 'neu-btn-coral font-bold text-white'
                      : 'neu-btn text-stone-800 dark:text-stone-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {checkpointPassed && (
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-bold neu-inset p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>¡Excelente! Has validado el Módulo 02: Modelo Pedagógico SENA.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
