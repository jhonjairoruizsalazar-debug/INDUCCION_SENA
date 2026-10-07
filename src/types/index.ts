export interface ApprenticeProfile {
  fullName: string;
  documentType: string;
  documentNumber: string;
  regional: string;
  center: string;
  program: string;
  cohortFicha: string;
  jornada?: 'Mañana' | 'Tarde' | 'Noche' | 'Mixta' | 'Virtual' | string;
  email?: string;
  avatarSeed: string;
  enrollmentDate: string;
}

export interface GamifiedBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface EvaluationRecord {
  id: string;
  attemptNumber: number;
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  program: string;
  cohortFicha: string;
  jornada: string;
  center: string;
  email?: string;
  score: number; // gamified points
  accuracyPercent: number;
  correctAnswers: number;
  errorAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  avgTimeSeconds: number;
  maxStreak: number;
  levelTitle: string;
  levelNumber: number;
  badges: string[];
  judgment: 'A' | 'D';
  judgmentText: 'APROBADO' | 'NO APROBADO';
  syncedToSheets: boolean;
}

export interface ModuleProgress {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  score?: number;
  badge: {
    name: string;
    description: string;
    icon: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    regulationArticle: string;
  }[];
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  definition: string;
  category: 'Institucional' | 'Pedagogía' | 'Plataformas' | 'Convivencia' | 'Bienestar';
}

export interface ArticuloResolutivo {
  articulo: string;
  descripcion: string;
}

export interface CapituloReglamento {
  capitulo: string;
  titulo: string;
  articulos: string[];
  descripcionResumen?: string;
  icono?: string;
}

export interface ReglamentoAcuerdoJSON {
  documento: string;
  entidad: string;
  organo_emisor: string;
  fecha_emision: string;
  objeto: string;
  firmante: string;
  articulos_resolutivos: ArticuloResolutivo[];
  estructura_reglamento: CapituloReglamento[];
}
