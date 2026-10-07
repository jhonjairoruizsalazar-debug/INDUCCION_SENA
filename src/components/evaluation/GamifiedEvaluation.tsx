import React, { useState, useEffect, useRef } from 'react';
import { ApprenticeProfile } from '../../types';
import {
  RegulationQuestion,
  generateBalancedQuiz,
  SENA_CHAPTERS,
  GAMIFICATION_LEVELS,
  getLevelForScore
} from '../../data/senaQuestions';
import { soundEffects } from '../../services/soundEffects';
import { QuestionAnswerDetail } from '../../services/inductionStore';
import confetti from 'canvas-confetti';
import {
  Clock,
  Flame,
  Award,
  Zap,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface GamifiedEvaluationProps {
  apprenticeProfile: ApprenticeProfile;
  onEvaluationFinished: (results: EvaluationResultData) => void;
  onExit: () => void;
}

export interface EvaluationResultData {
  profile: ApprenticeProfile;
  scorePercent: number;
  gamifiedPoints: number;
  correctAnswers: number;
  errorAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  avgTimeSeconds: number;
  maxStreak: number;
  speedBonusTotal: number;
  streakBonusTotal: number;
  perfectionBonus: number;
  timeBonus: number;
  levelTitle: string;
  levelNumber: number;
  badges: string[];
  status: 'Aprobado' | 'No Aprobado';
  questionDetails: QuestionAnswerDetail[];
  questionsAnswered: RegulationQuestion[];
  userSelectedOptions: { [qId: number]: number };
}

const POSITIVE_MESSAGES = [
  '✅ ¡Excelente trabajo!',
  '✅ ¡Muy bien hecho!',
  '✅ ¡Vas avanzando como un experto del Reglamento!',
  '✅ ¡Has conseguido una racha de aciertos!',
  '✅ ¡Precisión institucional impecable!'
];

export const GamifiedEvaluation: React.FC<GamifiedEvaluationProps> = ({
  apprenticeProfile,
  onEvaluationFinished,
  onExit
}) => {
  // Questions list (10 questions, 2 from each chapter)
  const [questions] = useState<RegulationQuestion[]>(() => generateBalancedQuiz(2));
  const [currentIdx, setCurrentIdx] = useState(0);

  // User selections
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [questionDetails, setQuestionDetails] = useState<QuestionAnswerDetail[]>([]);

  // Gamification Metrics
  const [totalScore, setTotalScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [speedBonusTotal, setSpeedBonusTotal] = useState(0);
  const [streakBonusTotal, setStreakBonusTotal] = useState(0);
  const [floatingBonus, setFloatingBonus] = useState<{ id: number; text: string; color: string } | null>(null);

  // Time tracking: Real stopwatch (NO countdown)
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [questionSeconds, setQuestionSeconds] = useState(0);
  const questionStartTimeRef = useRef<number>(Date.now());

  // Audio mute state
  const [isMuted, setIsMuted] = useState(() => soundEffects.isMuted());

  // Active question
  const currentQuestion = questions[currentIdx];
  const currentChapter = SENA_CHAPTERS.find((c) => c.id === currentQuestion.chapterId);

  // Total Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
      setQuestionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reset per-question stopwatch on step change
  useEffect(() => {
    setQuestionSeconds(0);
    questionStartTimeRef.current = Date.now();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  }, [currentIdx]);

  // Audio Toggle
  const toggleSound = () => {
    const next = soundEffects.toggleMute();
    setIsMuted(next);
  };

  // Trigger floating bonus badge
  const showBonusBadge = (text: string, color: string = 'text-amber-400') => {
    const bonusId = Date.now();
    setFloatingBonus({ id: bonusId, text, color });
    setTimeout(() => {
      setFloatingBonus((prev) => (prev?.id === bonusId ? null : prev));
    }, 1800);
  };

  // Keyboard accessibility: 1, 2, 3, 4 to select
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswerSubmitted) {
        if (e.key === 'Enter' || e.key === 'ArrowRight') {
          handleNext();
        }
        return;
      }
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (optIdx < currentQuestion.options.length) {
          handleSelectOption(optIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerSubmitted, currentIdx, selectedOption]);

  const handleSelectOption = (optIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optIdx);
    setIsAnswerSubmitted(true);

    const isCorrect = optIdx === currentQuestion.correctIndex;
    const timeSpent = questionSeconds;

    // Track answer
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optIdx }));
    setQuestionDetails((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        chapterId: currentQuestion.chapterId,
        isCorrect,
        timeSpentSeconds: timeSpent,
        selectedOption: optIdx
      }
    ]);

    if (isCorrect) {
      // 1. Base points
      let pointsEarned = 100;

      // 2. Speed bonus (< 10 seconds)
      let earnedSpeedBonus = 0;
      if (timeSpent < 10) {
        earnedSpeedBonus = 50;
        pointsEarned += earnedSpeedBonus;
        setSpeedBonusTotal((prev) => prev + 50);
      }

      // 3. Streak bonus
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }

      let earnedStreakBonus = 0;
      if (newStreak % 5 === 0) {
        earnedStreakBonus = 100;
        pointsEarned += earnedStreakBonus;
        setStreakBonusTotal((prev) => prev + 100);
        soundEffects.playStreak();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#39A900', '#F59E0B', '#10B981']
        });
      } else {
        soundEffects.playCorrect();
      }

      setCorrectCount((prev) => prev + 1);
      setTotalScore((prev) => prev + pointsEarned);

      // Show motivational feedback
      const bonusText = earnedSpeedBonus > 0 ? '+150 pts (¡Veloz!)' : '+100 pts';
      showBonusBadge(bonusText, 'text-emerald-400');
    } else {
      // Incorrect answer
      setCurrentStreak(0);
      setErrorCount((prev) => prev + 1);
      soundEffects.playErrorHint();
      showBonusBadge('+0 pts', 'text-stone-400');
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      finishEvaluation();
    }
  };

  const finishEvaluation = () => {
    // Calculate final scores and extra bonuses
    const accuracyPct = Math.round((correctCount / questions.length) * 100);
    let finalPoints = totalScore;

    // Perfection bonus (+250 points)
    let perfBonus = 0;
    if (correctCount === questions.length) {
      perfBonus = 250;
      finalPoints += perfBonus;
    }

    // Fast completion bonus (< 180 seconds)
    let fastBonus = 0;
    if (totalSeconds < 180 && accuracyPct >= 70) {
      fastBonus = 150;
      finalPoints += fastBonus;
    }

    // Determine gamification level and badges
    const level = getLevelForScore(finalPoints);
    const earnedBadges: string[] = [];

    if (accuracyPct >= 70) {
      earnedBadges.push('⚖️ Constituyente SENA');
    }
    if (maxStreak >= 5) {
      earnedBadges.push('🔥 Racha Imparable');
    }
    if (speedBonusTotal >= 150) {
      earnedBadges.push('⚡ Rayo Veloz');
    }
    if (correctCount === questions.length) {
      earnedBadges.push('🎯 Precisión Impecable');
    }
    if (totalSeconds < 180 && accuracyPct >= 70) {
      earnedBadges.push('⏱️ Relámpago Normativo');
    }
    earnedBadges.push(level.badge + ' ' + level.title);

    const isPassed = accuracyPct >= 70;

    const resultData: EvaluationResultData = {
      profile: apprenticeProfile,
      scorePercent: accuracyPct,
      gamifiedPoints: finalPoints,
      correctAnswers: correctCount,
      errorAnswers: errorCount,
      totalQuestions: questions.length,
      timeSpentSeconds: totalSeconds,
      avgTimeSeconds: Number((totalSeconds / questions.length).toFixed(1)),
      maxStreak,
      speedBonusTotal,
      streakBonusTotal,
      perfectionBonus: perfBonus,
      timeBonus: fastBonus,
      levelTitle: level.title,
      levelNumber: level.level,
      badges: earnedBadges,
      status: isPassed ? 'Aprobado' : 'No Aprobado',
      questionDetails,
      questionsAnswered: questions,
      userSelectedOptions: userAnswers
    };

    onEvaluationFinished(resultData);
  };

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentLevel = getLevelForScore(totalScore);
  const isCorrectSelection = selectedOption === currentQuestion.correctIndex;
  const randomPositiveMsg =
    POSITIVE_MESSAGES[(currentIdx + correctCount) % POSITIVE_MESSAGES.length];

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fadeIn">
      {/* Top Gamification Bar (Duolingo / Kahoot HUD) */}
      <div className="bg-white dark:bg-[#111713] rounded-2xl border border-stone-200 dark:border-[#232f27] p-4 shadow-sm flex items-center justify-between gap-3 flex-wrap">
        {/* Progress & Chapter indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
          >
            Salir
          </button>
          <div className="h-4 w-px bg-stone-200 dark:bg-stone-800" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Pregunta <strong className="text-[#39A900]">{currentIdx + 1}</strong> de {questions.length}
            </span>
          </div>
        </div>

        {/* Gamification Stats: Streak, Points, Timer, Sound */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Flame streak */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
              currentStreak > 0
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 ring-1 ring-amber-400/40 animate-pulse'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
            }`}
          >
            <Flame className={`w-4 h-4 ${currentStreak > 0 ? 'text-amber-500 fill-amber-500' : 'text-stone-400'}`} />
            <span>Racha {currentStreak}</span>
          </div>

          {/* Points Counter */}
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30 text-xs font-black">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="tabular-nums">{totalScore} pts</span>

            {/* Floating bonus chip */}
            {floatingBonus && (
              <span
                key={floatingBonus.id}
                className="absolute -top-6 right-0 text-xs font-black px-2 py-0.5 rounded-full bg-stone-900 text-white shadow-md animate-bounce"
              >
                {floatingBonus.text}
              </span>
            )}
          </div>

          {/* Real-time stopwatch */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 text-xs font-mono font-bold tabular-nums">
            <Clock className="w-3.5 h-3.5 text-[#39A900]" />
            <span>{formatTime(totalSeconds)}</span>
          </div>

          {/* Sound toggle button */}
          <button
            onClick={toggleSound}
            aria-label="Silenciar sonido"
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-[#39A900]" />}
          </button>
        </div>
      </div>

      {/* Progress Bar with Chapters Colors */}
      <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#39A900] to-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIdx + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 sm:p-8 shadow-md space-y-6">
        {/* Chapter pill and timer */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-[#39A900]" />
            <span>{currentChapter?.code}: {currentChapter?.title}</span>
          </div>

          <div className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <span>Tiempo en pregunta:</span>
            <strong className="text-stone-800 dark:text-stone-200 font-mono tabular-nums">
              {questionSeconds}s
            </strong>
            {questionSeconds < 10 && !isAnswerSubmitted && (
              <span className="text-amber-500 font-bold ml-1 text-[10px]">⚡ Bono de rapidez activo</span>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
            {currentQuestion.domain} • {currentQuestion.articleRef}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100 font-display leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options List (Accessible buttons) */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;

            // Conditional styling based on feedback state
            let optionStyles =
              'border-stone-200 dark:border-[#26352b] bg-stone-50/60 dark:bg-[#162019] hover:bg-stone-100 dark:hover:bg-[#1e2a22] text-stone-800 dark:text-stone-200';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyles =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                optionStyles =
                  'border-red-400 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 ring-2 ring-red-400/40';
              } else {
                optionStyles = 'opacity-40 border-stone-200 dark:border-stone-800 text-stone-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${optionStyles}`}
              >
                {/* Number Key badge */}
                <div
                  className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    isAnswerSubmitted && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswerSubmitted && isSelected && !isCorrect
                      ? 'bg-red-500 text-white'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {isAnswerSubmitted && isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isAnswerSubmitted && isSelected && !isCorrect ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Option text */}
                <div className="flex-1 text-sm font-medium leading-relaxed pt-0.5">
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK SECTION (Shows immediately after selection) */}
        {isAnswerSubmitted && (
          <div
            className={`p-5 rounded-2xl border transition-all animate-fadeIn ${
              isCorrectSelection
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
            }`}
          >
            {/* Header line */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                {isCorrectSelection ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
                <span className="font-black text-sm">
                  {isCorrectSelection ? randomPositiveMsg : '⚠️ Tu respuesta no es correcta'}
                </span>
              </div>

              {isCorrectSelection && (
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-emerald-900/60 px-2.5 py-1 rounded-full">
                  +{questionSeconds < 10 ? '150 pts' : '100 pts'}
                </span>
              )}
            </div>

            {/* Explanation & Article Citation */}
            <p className="text-xs leading-relaxed opacity-95 mb-2">
              {currentQuestion.explanation}
            </p>

            <div className="p-3 rounded-xl bg-white/60 dark:bg-stone-900/60 border border-black/5 dark:border-white/5 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-stone-800 dark:text-stone-200">
                <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Referencia Oficial: {currentQuestion.articleRef}</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-[11px]">
                {currentQuestion.pedagogicalTip}
              </p>
            </div>

            {/* Next Question Button */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-black shadow-md shadow-[#39A900]/25 transition-transform active:scale-95 cursor-pointer"
              >
                <span>{currentIdx < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Ver Resultados'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard guidance hint */}
      <div className="text-center text-[11px] text-stone-400 dark:text-stone-500">
        Tip de teclado: presiona <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">1</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">2</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">3</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">4</kbd> para responder rápidamente.
      </div>
    </div>
  );
};
