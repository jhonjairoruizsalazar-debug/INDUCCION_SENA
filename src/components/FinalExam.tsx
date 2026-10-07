import React, { useState } from 'react';
import { ApprenticeProfile } from '../types';
import { EvaluationRegistration } from './evaluation/EvaluationRegistration';
import { GamifiedEvaluation, EvaluationResultData } from './evaluation/GamifiedEvaluation';
import { EvaluationResults } from './evaluation/EvaluationResults';
import { saveEvaluationAttempt } from '../services/inductionStore';

interface FinalExamProps {
  onExamPassed: (score: number, totalQuestions?: number) => void;
  openCertificate: () => void;
  currentProfile?: ApprenticeProfile;
  onUpdateProfile?: (profile: ApprenticeProfile) => void;
  onOpenRanking?: () => void;
  onReturnToDashboard?: () => void;
}

type ExamStep = 'registration' | 'evaluation' | 'results';

export const FinalExam: React.FC<FinalExamProps> = ({
  onExamPassed,
  openCertificate,
  currentProfile = {
    fullName: 'Aprendiz SENA',
    documentType: 'C.C.',
    documentNumber: '1020304050',
    regional: 'Regional Distrito Capital',
    center: 'Centro de Formación de Talento Humano en Salud',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    cohortFicha: '2874912',
    jornada: 'Mañana',
    avatarSeed: 'Felix',
    enrollmentDate: '2026-03-01'
  },
  onUpdateProfile,
  onOpenRanking,
  onReturnToDashboard
}) => {
  const [step, setStep] = useState<ExamStep>('registration');
  const [activeProfile, setActiveProfile] = useState<ApprenticeProfile>(currentProfile);
  const [latestResults, setLatestResults] = useState<EvaluationResultData | null>(null);

  // 1. From registration to start evaluation
  const handleStartEvaluation = (validatedProfile: ApprenticeProfile) => {
    setActiveProfile(validatedProfile);
    if (onUpdateProfile) {
      onUpdateProfile(validatedProfile);
    }
    setStep('evaluation');
  };

  // 2. Evaluation finished
  const handleEvaluationFinished = async (results: EvaluationResultData) => {
    setLatestResults(results);

    // Persist to store and try sync to Google Sheets
    await saveEvaluationAttempt({
      profile: results.profile,
      scorePercent: results.scorePercent,
      gamifiedPoints: results.gamifiedPoints,
      correctAnswers: results.correctAnswers,
      errorAnswers: results.errorAnswers,
      totalQuestions: results.totalQuestions,
      timeSpentSeconds: results.timeSpentSeconds,
      avgTimeSeconds: results.avgTimeSeconds,
      maxStreak: results.maxStreak,
      levelTitle: results.levelTitle,
      levelNumber: results.levelNumber,
      badges: results.badges,
      status: results.status,
      questionDetails: results.questionDetails
    });

    if (results.status === 'Aprobado') {
      onExamPassed(results.correctAnswers, results.totalQuestions);
    }

    setStep('results');
  };

  // 3. Repeat evaluation
  const handleRepeat = () => {
    setStep('evaluation');
  };

  // 4. Return to registration
  const handleBackToRegistration = () => {
    setStep('registration');
  };

  return (
    <div className="w-full">
      {step === 'registration' && (
        <EvaluationRegistration
          currentProfile={activeProfile}
          onStartEvaluation={handleStartEvaluation}
          onCancel={onReturnToDashboard}
        />
      )}

      {step === 'evaluation' && (
        <GamifiedEvaluation
          apprenticeProfile={activeProfile}
          onEvaluationFinished={handleEvaluationFinished}
          onExit={handleBackToRegistration}
        />
      )}

      {step === 'results' && latestResults && (
        <EvaluationResults
          results={latestResults}
          onRepeatEvaluation={handleRepeat}
          onOpenCertificate={openCertificate}
          onOpenRanking={onOpenRanking || (() => {})}
          onReturnToHome={onReturnToDashboard || handleBackToRegistration}
        />
      )}
    </div>
  );
};
