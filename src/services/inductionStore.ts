import { ApprenticeProfile } from '../types';
import { appendApprenticeRecord, getSavedSpreadsheetId } from './sheetsService';

export interface QuestionAnswerDetail {
  questionId: number;
  chapterId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  selectedOption: number;
}

export interface ApprenticeSubmission {
  id: string;
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  regional: string;
  center: string;
  program: string;
  cohortFicha: string;
  jornada: string;
  email?: string;
  score: number; // percentage (0-100)
  gamifiedPoints: number; // total gamified points (e.g., 1450)
  correctAnswers: number;
  errorAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  avgTimeSeconds: number;
  maxStreak: number;
  levelTitle: string;
  levelNumber: number;
  badges: string[];
  status: 'Aprobado' | 'No Aprobado';
  judgmentText: 'APROBADO' | 'NO APROBADO';
  attemptNumber: number;
  syncedToSheets: boolean;
  questionDetails?: QuestionAnswerDetail[];
}

const STORAGE_KEY = 'sena_induction_submissions_v2';

// Rich seed submissions with varied dates, programs, fichas and jornadas
const SEED_SUBMISSIONS: ApprenticeSubmission[] = [
  {
    id: 'sub-sena-001',
    timestamp: '2026-03-02 09:14:22',
    fullName: 'Julián Andrés Gómez Pardo',
    documentType: 'C.C.',
    documentNumber: '1023456789',
    regional: 'Regional Distrito Capital',
    center: 'Centro de Gestión de Mercados, Logística y TIC',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    cohortFicha: '2825410',
    jornada: 'Mañana',
    email: 'julian.gomez@soy.sena.edu.co',
    score: 100,
    gamifiedPoints: 1850,
    correctAnswers: 10,
    errorAnswers: 0,
    totalQuestions: 10,
    timeSpentSeconds: 112,
    avgTimeSeconds: 11.2,
    maxStreak: 10,
    levelTitle: 'Embajador SENA',
    levelNumber: 5,
    badges: ['👑 Embajador SENA', '🔥 Racha Imparable', '🎯 Precisión Impecable', '⚡ Rayo Veloz'],
    status: 'Aprobado',
    judgmentText: 'APROBADO',
    attemptNumber: 1,
    syncedToSheets: true
  },
  {
    id: 'sub-sena-002',
    timestamp: '2026-03-02 10:45:10',
    fullName: 'Mariana Sofía Torres Silva',
    documentType: 'T.I.',
    documentNumber: '1078901234',
    regional: 'Regional Antioquia',
    center: 'Centro de Tecnología de la Manufactura Avanzada',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    cohortFicha: '2825410',
    jornada: 'Mañana',
    email: 'mariana.torres@misena.edu.co',
    score: 90,
    gamifiedPoints: 1520,
    correctAnswers: 9,
    errorAnswers: 1,
    totalQuestions: 10,
    timeSpentSeconds: 135,
    avgTimeSeconds: 13.5,
    maxStreak: 7,
    levelTitle: 'Maestro del Reglamento',
    levelNumber: 4,
    badges: ['🏅 Maestro del Reglamento', '🔥 Racha Imparable', '⚖️ Constituyente SENA'],
    status: 'Aprobado',
    judgmentText: 'APROBADO',
    attemptNumber: 1,
    syncedToSheets: true
  },
  {
    id: 'sub-sena-003',
    timestamp: '2026-03-03 14:20:05',
    fullName: 'Carlos Eduardo Ramírez Meza',
    documentType: 'C.C.',
    documentNumber: '1012398745',
    regional: 'Regional Valle del Cauca',
    center: 'Centro de Electricidad y Automatización Industrial',
    program: 'Tecnólogo en Gestión Empresarial',
    cohortFicha: '2799821',
    jornada: 'Tarde',
    score: 90,
    gamifiedPoints: 1480,
    correctAnswers: 9,
    errorAnswers: 1,
    totalQuestions: 10,
    timeSpentSeconds: 142,
    avgTimeSeconds: 14.2,
    maxStreak: 6,
    levelTitle: 'Maestro del Reglamento',
    levelNumber: 4,
    badges: ['🏅 Maestro del Reglamento', '🔥 Racha Imparable'],
    status: 'Aprobado',
    judgmentText: 'APROBADO',
    attemptNumber: 1,
    syncedToSheets: true
  },
  {
    id: 'sub-sena-004',
    timestamp: '2026-03-04 18:30:44',
    fullName: 'Valentina Restrepo Castro',
    documentType: 'C.C.',
    documentNumber: '1034567890',
    regional: 'Regional Santander',
    center: 'Centro de Servicios Empresariales y Turísticos',
    program: 'Tecnólogo en Gestión Empresarial',
    cohortFicha: '2799821',
    jornada: 'Noche',
    score: 80,
    gamifiedPoints: 1250,
    correctAnswers: 8,
    errorAnswers: 2,
    totalQuestions: 10,
    timeSpentSeconds: 168,
    avgTimeSeconds: 16.8,
    maxStreak: 5,
    levelTitle: 'Experto Normativo',
    levelNumber: 3,
    badges: ['⚖️ Experto Normativo', '🔥 Racha Imparable'],
    status: 'Aprobado',
    judgmentText: 'APROBADO',
    attemptNumber: 1,
    syncedToSheets: true
  },
  {
    id: 'sub-sena-005',
    timestamp: '2026-03-05 11:15:20',
    fullName: 'Diego Alejandro Mora Díaz',
    documentType: 'C.C.',
    documentNumber: '1098765432',
    regional: 'Regional Distrito Capital',
    center: 'Centro de Formación de Talento Humano en Salud',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    cohortFicha: '2874912',
    jornada: 'Virtual',
    score: 100,
    gamifiedPoints: 1920,
    correctAnswers: 10,
    errorAnswers: 0,
    totalQuestions: 10,
    timeSpentSeconds: 98,
    avgTimeSeconds: 9.8,
    maxStreak: 10,
    levelTitle: 'Embajador SENA',
    levelNumber: 5,
    badges: ['👑 Embajador SENA', '🔥 Racha Imparable', '🎯 Precisión Impecable', '⚡ Rayo Veloz', '⏱️ Relámpago Normativo'],
    status: 'Aprobado',
    judgmentText: 'APROBADO',
    attemptNumber: 1,
    syncedToSheets: false
  },
  {
    id: 'sub-sena-006',
    timestamp: '2026-03-06 16:40:12',
    fullName: 'Camila Andrea Ospina Ortiz',
    documentType: 'T.I.',
    documentNumber: '1087654321',
    regional: 'Regional Cundinamarca',
    center: 'Centro de Desarrollo Agroempresarial',
    program: 'Tecnólogo en Animación Digital y 3D',
    cohortFicha: '2865320',
    jornada: 'Mixta',
    score: 70,
    gamifiedPoints: 990,
    correctAnswers: 7,
    errorAnswers: 3,
    totalQuestions: 10,
    timeSpentSeconds: 195,
    avgTimeSeconds: 19.5,
    maxStreak: 4,
    levelTitle: 'Experto Normativo',
    levelNumber: 3,
    badges: ['⚖️ Experto Normativo', '⚖️ Constituyente SENA'],
    status: 'Aprobado',
    judgmentText: 'APROBADO',
    attemptNumber: 1,
    syncedToSheets: true
  },
  {
    id: 'sub-sena-007',
    timestamp: '2026-03-07 08:50:33',
    fullName: 'Santiago López Montoya',
    documentType: 'C.C.',
    documentNumber: '1045678912',
    regional: 'Regional Boyacá',
    center: 'Centro Minero',
    program: 'Tecnólogo en Mantenimiento Electromecánico Industrial',
    cohortFicha: '2811400',
    jornada: 'Mañana',
    score: 60,
    gamifiedPoints: 780,
    correctAnswers: 6,
    errorAnswers: 4,
    totalQuestions: 10,
    timeSpentSeconds: 210,
    avgTimeSeconds: 21.0,
    maxStreak: 3,
    levelTitle: 'Conocedor del Reglamento',
    levelNumber: 2,
    badges: ['📘 Conocedor del Reglamento'],
    status: 'No Aprobado',
    judgmentText: 'NO APROBADO',
    attemptNumber: 1,
    syncedToSheets: false
  }
];

export function getSubmissions(): ApprenticeSubmission[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Migration: Check old v1 storage if available
    const oldV1 = localStorage.getItem('sena_induction_submissions_v1');
    if (oldV1) {
      try {
        const parsed = JSON.parse(oldV1);
        const migrated: ApprenticeSubmission[] = parsed.map((item: any, idx: number) => ({
          id: item.id || `migrated-${idx}`,
          timestamp: item.timestamp || '2026-03-01 10:00:00',
          fullName: item.fullName || 'Aprendiz SENA',
          documentType: item.documentType || 'C.C.',
          documentNumber: item.documentNumber || '1020304050',
          regional: item.regional || 'Regional Distrito Capital',
          center: item.center || 'Centro de Formación',
          program: item.program || 'Programa SENA',
          cohortFicha: item.cohortFicha || '2874912',
          jornada: item.jornada || 'Mañana',
          email: item.email || '',
          score: item.score || 80,
          gamifiedPoints: item.gamifiedPoints || (item.score ? item.score * 12 : 950),
          correctAnswers: item.correctAnswers || 8,
          errorAnswers: (item.totalQuestions || 10) - (item.correctAnswers || 8),
          totalQuestions: item.totalQuestions || 10,
          timeSpentSeconds: item.timeSpentSeconds || 140,
          avgTimeSeconds: 14.0,
          maxStreak: item.maxStreak || 4,
          levelTitle: item.levelTitle || 'Experto Normativo',
          levelNumber: item.levelNumber || 3,
          badges: item.badges || ['⚖️ Constituyente SENA'],
          status: item.status === 'Aprobado' ? 'Aprobado' : 'No Aprobado',
          judgmentText: item.status === 'Aprobado' ? 'APROBADO' : 'NO APROBADO',
          attemptNumber: item.attemptNumber || 1,
          syncedToSheets: item.syncedToSheets ?? true
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      } catch {
        // fallback to seed
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SUBMISSIONS));
    return SEED_SUBMISSIONS;
  }

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error parsing induction submissions:', err);
    return SEED_SUBMISSIONS;
  }
}

export function getApprenticeAttempts(documentNumber: string): ApprenticeSubmission[] {
  const all = getSubmissions();
  return all.filter((s) => s.documentNumber.trim() === documentNumber.trim());
}

export interface SaveEvaluationParams {
  profile: ApprenticeProfile;
  scorePercent: number; // 0-100
  gamifiedPoints: number;
  correctAnswers: number;
  errorAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  avgTimeSeconds: number;
  maxStreak: number;
  levelTitle: string;
  levelNumber: number;
  badges: string[];
  status: 'Aprobado' | 'No Aprobado';
  questionDetails?: QuestionAnswerDetail[];
}

export async function saveEvaluationAttempt(
  params: SaveEvaluationParams
): Promise<ApprenticeSubmission> {
  const submissions = getSubmissions();
  const existingAttempts = submissions.filter(
    (s) => s.documentNumber.trim() === params.profile.documentNumber.trim()
  );
  const nextAttemptNum = existingAttempts.length + 1;

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const newSubmission: ApprenticeSubmission = {
    id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp,
    fullName: params.profile.fullName || 'Aprendiz SENA',
    documentType: params.profile.documentType || 'C.C.',
    documentNumber: params.profile.documentNumber || '000000000',
    regional: params.profile.regional || 'Regional Distrito Capital',
    center: params.profile.center || 'Centro de Formación',
    program: params.profile.program || 'Programa de Formación',
    cohortFicha: params.profile.cohortFicha || '2800000',
    jornada: params.profile.jornada || 'Mañana',
    email: params.profile.email || '',
    score: params.scorePercent,
    gamifiedPoints: params.gamifiedPoints,
    correctAnswers: params.correctAnswers,
    errorAnswers: params.errorAnswers,
    totalQuestions: params.totalQuestions,
    timeSpentSeconds: params.timeSpentSeconds,
    avgTimeSeconds: params.avgTimeSeconds,
    maxStreak: params.maxStreak,
    levelTitle: params.levelTitle,
    levelNumber: params.levelNumber,
    badges: params.badges,
    status: params.status,
    judgmentText: params.status === 'Aprobado' ? 'APROBADO' : 'NO APROBADO',
    attemptNumber: nextAttemptNum,
    syncedToSheets: false,
    questionDetails: params.questionDetails
  };

  // Attempt automatic sync with existing Google Sheet if configured
  const sheetId = getSavedSpreadsheetId();
  if (sheetId) {
    try {
      await appendApprenticeRecord(sheetId, {
        timestamp: newSubmission.timestamp,
        fullName: newSubmission.fullName,
        documentType: newSubmission.documentType,
        documentNumber: newSubmission.documentNumber,
        regional: newSubmission.regional,
        center: newSubmission.center,
        program: newSubmission.program,
        cohortFicha: newSubmission.cohortFicha,
        progressPercent: 100,
        finalExamScore: newSubmission.score,
        evaluationJudgment: newSubmission.status === 'Aprobado' ? 'APROBADO' : 'NO APROBADO',
        inductionStatus: 'COMPLETADA',
        registeredEmail: newSubmission.email || 'N/A'
      });
      newSubmission.syncedToSheets = true;
    } catch (syncErr) {
      console.warn('Could not auto-sync directly to Google Sheet (will be queued):', syncErr);
    }
  }

  const updated = [newSubmission, ...submissions];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newSubmission;
}

export function saveSubmission(
  profile: ApprenticeProfile,
  score: number,
  correctAnswers: number,
  totalQuestions: number,
  status: 'Aprobado' | 'No Aprobado'
): ApprenticeSubmission {
  const errorAnswers = totalQuestions - correctAnswers;
  const gamifiedPoints = correctAnswers * 100 + (status === 'Aprobado' ? 250 : 0);
  return {
    id: `sub-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    fullName: profile.fullName,
    documentType: profile.documentType,
    documentNumber: profile.documentNumber,
    regional: profile.regional,
    center: profile.center,
    program: profile.program,
    cohortFicha: profile.cohortFicha,
    jornada: profile.jornada || 'Mañana',
    email: profile.email,
    score,
    gamifiedPoints,
    correctAnswers,
    errorAnswers,
    totalQuestions,
    timeSpentSeconds: 120,
    avgTimeSeconds: 12.0,
    maxStreak: correctAnswers,
    levelTitle: 'Conocedor del Reglamento',
    levelNumber: 2,
    badges: ['⚖️ Constituyente SENA'],
    status,
    judgmentText: status === 'Aprobado' ? 'APROBADO' : 'NO APROBADO',
    attemptNumber: 1,
    syncedToSheets: false
  };
}

export function markSubmissionsAsSynced(ids: string[]): void {
  const submissions = getSubmissions();
  const idSet = new Set(ids);
  const updated = submissions.map((sub) =>
    idSet.has(sub.id) ? { ...sub, syncedToSheets: true } : sub
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearAllSubmissions(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

export function exportSubmissionsToCSV(submissions: ApprenticeSubmission[]): void {
  if (!submissions.length) return;

  const headers = [
    'ID Registro',
    'Fecha y Hora',
    'Intento',
    'Nombre Completo',
    'Tipo Documento',
    'Numero Documento',
    'Jornada',
    'Regional',
    'Centro de Formacion',
    'Programa de Formacion',
    'Ficha',
    'Puntos Gamificados',
    'Precision (%)',
    'Aciertos',
    'Errores',
    'Total Preguntas',
    'Tiempo Total (seg)',
    'Tiempo Promedio (seg)',
    'Racha Maxima',
    'Nivel Alcanzado',
    'Juicio Institucional',
    'Insignias',
    'Correo Electronico',
    'Sincronizado a Google Sheets'
  ];

  const rows = submissions.map((s) => [
    `"${s.id}"`,
    `"${s.timestamp}"`,
    `"${s.attemptNumber}"`,
    `"${s.fullName.replace(/"/g, '""')}"`,
    `"${s.documentType}"`,
    `"${s.documentNumber}"`,
    `"${s.jornada || 'N/A'}"`,
    `"${s.regional.replace(/"/g, '""')}"`,
    `"${s.center.replace(/"/g, '""')}"`,
    `"${s.program.replace(/"/g, '""')}"`,
    `"${s.cohortFicha}"`,
    `"${s.gamifiedPoints}"`,
    `"${s.score}%"`,
    `"${s.correctAnswers}"`,
    `"${s.errorAnswers}"`,
    `"${s.totalQuestions}"`,
    `"${s.timeSpentSeconds}"`,
    `"${s.avgTimeSeconds.toFixed(1)}"`,
    `"${s.maxStreak}"`,
    `"${s.levelTitle}"`,
    `"${s.judgmentText}"`,
    `"${(s.badges || []).join(' | ').replace(/"/g, '""')}"`,
    `"${s.email || 'N/A'}"`,
    `"${s.syncedToSheets ? 'SI' : 'PENDIENTE'}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Reglamento_Evaluaciones_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
