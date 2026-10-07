import React, { useState } from 'react';
import { GitBranch, CheckCircle, AlertTriangle, XCircle, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

interface DecisionStep {
  id: number;
  stageName: string;
  situation: string;
  choices: {
    text: string;
    isOptimal: boolean;
    consequence: string;
    normativeFeedback: string;
    nextStepId: number | null;
  }[];
}

export const DecisionTreeSimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<number[]>([]);
  const [isScenarioFinished, setIsScenarioFinished] = useState(false);

  const steps: DecisionStep[] = [
    {
      id: 1,
      stageName: 'Etapa 1: El Reto de la Evidencia Técnica',
      situation: 'Sebastián y su compañero tienen plazo hasta hoy a las 23:59 para enviar una evidencia colaborativa en la plataforma Zajuna. Su compañero no responde desde hace 4 días y no aportó su parte del código.',
      choices: [
        {
          text: 'Enviar su desarrollo individual en Zajuna, adjuntar bitácora de trabajo y notificar al instructor por el foro de dudas antes del vencimiento.',
          isOptimal: true,
          consequence: 'Decisión Ética Impecable: El instructor valora la honestidad, califica la parte desarrollada y activa una alerta formativa de acompañamiento para el compañero.',
          normativeFeedback: 'Acuerdo 0009 de 2024: Promueve la responsabilidad individual y el uso de canales oficiales de comunicación institucional.',
          nextStepId: 2
        },
        {
          text: 'Copiar el módulo faltante de un foro público de internet sin citar autor para que el proyecto parezca "completo".',
          isOptimal: false,
          consequence: 'Falta Grave a la Integridad: El software detector de similitud de Zajuna detecta el plagio. La evidencia recibe juicio Deficiente (D) y se remite a Coordinación.',
          normativeFeedback: 'Acuerdo 0009 de 2024: El plagio está tipificado como falta a la propiedad intelectual y activa procedimiento con llamado de atención escrito.',
          nextStepId: 2
        },
        {
          text: 'No entregar nada en Zajuna y esperar a hablar verbalmente en el pasillo del centro la próxima semana.',
          isOptimal: false,
          consequence: 'Incumplimiento Injustificado: Se vence el plazo en el LMS, se registra inasistencia a la entrega y se emite reporte de deserción preliminar.',
          normativeFeedback: 'Acuerdo 0009 de 2024: Las evidencias deben radicarse en las fechas estipuladas; las prórrogas requieren solicitud oportuna.',
          nextStepId: 2
        }
      ]
    },
    {
      id: 2,
      stageName: 'Etapa 2: Afrontando la Mediación Pedagógica',
      situation: 'El instructor convoca a una sesión de retroalimentación pedagógica para concertar el plan de acción y evaluar lo ocurrido con el proyecto.',
      choices: [
        {
          text: 'Asistir puntualmente, asumir los compromisos del Plan de Mejoramiento formativo y presentar el desarrollo complementario en los 8 días acordados.',
          isOptimal: true,
          consequence: 'Éxito y Crecimiento Personal: Sebastián cumple el Plan de Mejoramiento, obtiene juicio Aprobado (A) y refuerza sus competencias en el Saber Ser.',
          normativeFeedback: 'Acuerdo 0009 de 2024: El Plan de Mejoramiento es la medida pedagógica por excelencia para subsanar deficiencias y garantizar la permanencia.',
          nextStepId: null
        },
        {
          text: 'Mostrar inconformidad, no asistir a la concertación del plan de mejora y justificar que "la culpa fue exclusiva del compañero".',
          isOptimal: false,
          consequence: 'Riesgo Disciplinario: La falta de compromiso para concertar el plan formativo escala el caso al Comité de Evaluación y Seguimiento.',
          normativeFeedback: 'Acuerdo 0009 de 2024: El aprendiz tiene el deber de participar activamente en las medidas formativas restaurativas acordadas.',
          nextStepId: null
        }
      ]
    }
  ];

  const currentStep = steps[currentStepIndex];

  const handleChoose = (choiceIdx: number) => {
    setSelectedChoiceIndex(choiceIdx);
  };

  const handleAdvance = () => {
    if (selectedChoiceIndex === null) return;
    const choice = currentStep.choices[selectedChoiceIndex];
    setDecisionHistory([...decisionHistory, selectedChoiceIndex]);

    if (choice.nextStepId !== null && currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedChoiceIndex(null);
    } else {
      setIsScenarioFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedChoiceIndex(null);
    setDecisionHistory([]);
    setIsScenarioFinished(false);
  };

  const isCurrentChoiceOptimal =
    selectedChoiceIndex !== null ? currentStep.choices[selectedChoiceIndex].isOptimal : false;

  return (
    <div className="bg-white dark:bg-[#141b16] rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-[#222e26] shadow-xs space-y-6 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-[#222e26]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
              Juego de Rol & Árbol de Decisiones
            </span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-mono">
              Acuerdo 0009 de 2024
            </span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display mt-0.5 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <span>El Dilema de Sebastián: Convivencia y Ética Formativa</span>
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-[#1b241e] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Dilema</span>
        </button>
      </div>

      {!isScenarioFinished ? (
        <div className="space-y-6">
          {/* Situation Box */}
          <div className="p-5 rounded-xl bg-stone-50 dark:bg-[#18201b] border border-stone-200 dark:border-[#26332a] space-y-2">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
              {currentStep.stageName}
            </span>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              "{currentStep.situation}"
            </p>
          </div>

          <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
            ¿Qué decisión debe tomar el aprendiz frente al Reglamento institucional?
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {currentStep.choices.map((choice, idx) => {
              const isSelected = selectedChoiceIndex === idx;
              return (
                <div key={idx} className="space-y-2">
                  <button
                    onClick={() => handleChoose(idx)}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm transition-all border flex items-start gap-3 ${
                      isSelected
                        ? choice.isOptimal
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium'
                          : 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-200 font-medium'
                        : 'bg-white dark:bg-[#18201b] border-stone-200 dark:border-[#28362d] text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-[#202b24]'
                    }`}
                  >
                    <span className="font-mono text-stone-400 text-xs shrink-0 mt-0.5">
                      Opción {idx + 1}:
                    </span>
                    <span className="flex-1">{choice.text}</span>
                  </button>

                  {/* Feedback preview when clicked */}
                  {isSelected && (
                    <div
                      className={`p-3.5 rounded-lg text-xs border space-y-1 ${
                        choice.isOptimal
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-amber-50/70 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {choice.isOptimal ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        )}
                        <span>{choice.consequence}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 font-mono pt-1">
                        Fundamento normativo: {choice.normativeFeedback}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action button */}
          {selectedChoiceIndex !== null && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleAdvance}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 rounded-lg shadow-xs transition-colors"
              >
                <span>Confirmar Decisión y Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Scenario Final Summary */
        <div className="p-6 rounded-xl bg-stone-50 dark:bg-[#18201b] border border-stone-200 dark:border-[#26332a] text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
            ¡Caso Resuelto a la Luz del Acuerdo 0009 de 2024!
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-300 max-w-lg mx-auto leading-relaxed">
            Has experimentado cómo el Reglamento del Aprendiz no es una herramienta meramente punitiva, sino una ruta formativa y restaurativa orientada a desarrollar tu ética, responsabilidad y pertenencia institucional.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 dark:bg-emerald-600 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Explorar Otras Ramas del Caso</span>
          </button>
        </div>
      )}
    </div>
  );
};
