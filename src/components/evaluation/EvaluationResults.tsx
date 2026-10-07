import React, { useEffect, useState } from 'react';
import { EvaluationResultData } from './GamifiedEvaluation';
import { GAMIFICATION_LEVELS } from '../../data/senaQuestions';
import { soundEffects } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  Trophy,
  Zap,
  Flame,
  Clock,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface EvaluationResultsProps {
  results: EvaluationResultData;
  onRepeatEvaluation: () => void;
  onOpenCertificate: () => void;
  onOpenRanking: () => void;
  onReturnToHome: () => void;
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  results,
  onRepeatEvaluation,
  onOpenCertificate,
  onOpenRanking,
  onReturnToHome
}) => {
  const [showQuestionReview, setShowQuestionReview] = useState(false);
  const isPassed = results.status === 'Aprobado';

  // Trigger celebration effects on mount if passed
  useEffect(() => {
    if (isPassed) {
      soundEffects.playCelebration();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#39A900', '#047857', '#F59E0B', '#38BDF8']
      });
    }
  }, [isPassed]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const levelInfo =
    GAMIFICATION_LEVELS.find((l) => l.level === results.levelNumber) ||
    GAMIFICATION_LEVELS[GAMIFICATION_LEVELS.length - 1];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Hero Result Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-xl transition-all ${
          isPassed
            ? 'bg-gradient-to-br from-[#39A900] via-[#047857] to-[#064e3b]'
            : 'bg-gradient-to-br from-amber-600 via-stone-800 to-stone-900'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-emerald-100">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Resultado Oficial del Aprendiz</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              {isPassed ? '¡Excelente! Juicio: A (APROBADO)' : 'Juicio: D (POR MEJORAR)'}
            </h1>

            <p className="text-sm text-emerald-50/90 leading-relaxed">
              {isPassed
                ? `¡Felicitaciones, ${results.profile.fullName}! Has demostrado apropiación cabal del Acuerdo 009 de 2024 (Reglamento del Aprendiz SENA). Tu registro se ha asociado a la Ficha ${results.profile.cohortFicha}.`
                : `Hola ${results.profile.fullName}, obtuviste ${results.correctAnswers} aciertos de ${results.totalQuestions}. El juicio aprobatorio requiere un mínimo de 70%. Te invitamos a repasar los artículos y presentar un nuevo intento.`}
            </p>

            {/* Submissions & Sheets Sync Status */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-emerald-100">
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
              <span>Registro guardado en historial institucional y vinculado a la Hoja de Cálculo del Instructor</span>
            </div>
          </div>

          {/* Big Score Trophy badge */}
          <div className="shrink-0 text-center bg-white/15 backdrop-blur-md p-6 rounded-3xl border border-white/20 min-w-[200px]">
            <div className="text-4xl mb-1">{levelInfo.badge}</div>
            <div className="text-3xl font-black font-mono tracking-tight text-white tabular-nums">
              {results.gamifiedPoints}
            </div>
            <div className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              Puntos Ganados
            </div>
            <div className="text-[11px] text-emerald-100/80 mt-1">
              Precisión: {results.scorePercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Gamification KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Aciertos */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111713] border border-stone-200 dark:border-[#232f27] shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] mx-auto flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {results.correctAnswers} / {results.totalQuestions}
          </div>
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Aciertos</div>
        </div>

        {/* Tiempo Total */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111713] border border-stone-200 dark:border-[#232f27] shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 mx-auto flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {formatTime(results.timeSpentSeconds)}
          </div>
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            {results.avgTimeSeconds}s prom/preg
          </div>
        </div>

        {/* Racha Máxima */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111713] border border-stone-200 dark:border-[#232f27] shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {results.maxStreak} 🔥
          </div>
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Racha Máxima</div>
        </div>

        {/* Nivel de Dominio */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111713] border border-stone-200 dark:border-[#232f27] shadow-xs text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 mx-auto flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-lg font-black text-stone-900 dark:text-stone-100 truncate">
            {results.levelTitle}
          </div>
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            Nivel {results.levelNumber} de 5
          </div>
        </div>
      </div>

      {/* Bonus breakdown & Badges Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desglose de Puntos Gamificados */}
        <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Desglose de Puntuación Inteligente</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-[#18211b]">
              <span className="text-stone-600 dark:text-stone-300">Aciertos Base ({results.correctAnswers} x 100 pts)</span>
              <strong className="text-stone-900 dark:text-stone-100 font-mono">
                +{results.correctAnswers * 100} pts
              </strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-[#18211b]">
              <span className="text-stone-600 dark:text-stone-300">Bonificación de Velocidad (&lt;10 seg)</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                +{results.speedBonusTotal} pts
              </strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-[#18211b]">
              <span className="text-stone-600 dark:text-stone-300">Bonificación de Racha Continua</span>
              <strong className="text-amber-600 dark:text-amber-400 font-mono">
                +{results.streakBonusTotal} pts
              </strong>
            </div>

            {results.perfectionBonus > 0 && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-emerald-800 dark:text-emerald-200 font-bold">Bonus Perfección (10/10 sin errores)</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                  +{results.perfectionBonus} pts
                </strong>
              </div>
            )}

            {results.timeBonus > 0 && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <span className="text-blue-800 dark:text-blue-200 font-bold">Bonus Tiempo Récord (&lt;3 minutos)</span>
                <strong className="text-blue-600 dark:text-blue-400 font-mono">
                  +{results.timeBonus} pts
                </strong>
              </div>
            )}

            <div className="pt-2 border-t border-stone-200 dark:border-[#232f27] flex items-center justify-between font-black text-sm">
              <span className="text-stone-900 dark:text-stone-100">Puntaje Total Registrado:</span>
              <span className="text-[#39A900] text-base font-mono">{results.gamifiedPoints} pts</span>
            </div>
          </div>
        </div>

        {/* Insignias Desbloqueadas */}
        <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#39A900]" />
            <span>Insignias Desbloqueadas ({results.badges.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.badges.map((badge, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-[#18211b] border border-stone-200 dark:border-[#26352b] flex items-center gap-3 transition-transform hover:scale-102"
              >
                <div className="text-2xl">{badge.split(' ')[0]}</div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {badge.split(' ').slice(1).join(' ')}
                  </div>
                  <div className="text-[10px] text-stone-500">Insignia Oficial</div>
                </div>
              </div>
            ))}
          </div>

          {/* Gamification progress bar to next level */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400">
              <span>{levelInfo.title}</span>
              <span>Nivel {levelInfo.level}</span>
            </div>
            <div className="h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#39A900] to-emerald-400 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((results.gamifiedPoints / 2000) * 100))}%`
                }}
              />
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 text-right">
              {levelInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion: Pedagogical Review of Questions */}
      <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 shadow-sm space-y-4">
        <button
          type="button"
          onClick={() => setShowQuestionReview((prev) => !prev)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#39A900]" />
            <span className="text-sm font-black text-stone-900 dark:text-stone-100">
              Revisión Pedagógica Detallada de Preguntas ({results.correctAnswers} acertadas, {results.errorAnswers} por reforzar)
            </span>
          </div>
          <div className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 group-hover:bg-[#39A900] group-hover:text-white transition-colors">
            {showQuestionReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showQuestionReview && (
          <div className="pt-4 border-t border-stone-100 dark:border-[#1e2821] space-y-4 animate-fadeIn">
            {results.questionsAnswered.map((q, idx) => {
              const userOpt = results.userSelectedOptions[q.id];
              const isCorrect = userOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 transition-all ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : 'border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold text-stone-800 dark:text-stone-200">
                      <span className="font-mono text-[#39A900] mr-1.5">#{idx + 1}</span>
                      {q.question}
                    </div>
                    {isCorrect ? (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Acertada
                      </span>
                    ) : (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-black text-red-600 dark:text-red-400">
                        <XCircle className="w-3.5 h-3.5" /> Por Reforzar
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="text-stone-600 dark:text-stone-300">
                      Tu selección:{' '}
                      <strong className={isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                        {q.options[userOpt]}
                      </strong>
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-700 dark:text-emerald-300">
                        Respuesta correcta: <strong>{q.options[q.correctIndex]}</strong>
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-black/5 dark:border-white/5 text-[11px] space-y-0.5">
                    <span className="font-bold text-stone-700 dark:text-stone-300 block">
                      {q.articleRef}
                    </span>
                    <p className="text-stone-600 dark:text-stone-400">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-stone-100 dark:bg-[#111713] border border-stone-200 dark:border-[#232f27]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReturnToHome}
            className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Tablero Principal
          </button>
          <button
            type="button"
            onClick={onRepeatEvaluation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetir Evaluación</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenRanking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Ver Ranking Gamificado</span>
          </button>

          {isPassed && (
            <button
              type="button"
              onClick={onOpenCertificate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-black shadow-md shadow-[#39A900]/25 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ver y Descargar Certificado</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
