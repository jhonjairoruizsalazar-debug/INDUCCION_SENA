import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, ModuleProgress } from './types';
import { INITIAL_APPRENTICE } from './data/senaData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ApprenticeCardModal } from './components/ApprenticeCard';
import { CertificateModal } from './components/CertificateModal';
import { ProfileModal } from './components/ProfileModal';
import { GlossaryModal } from './components/GlossaryModal';
import { AdminConsoleModal } from './components/AdminConsoleModal';
import { saveSubmission } from './services/inductionStore';
import { ModuleIdentity } from './components/modules/ModuleIdentity';
import { ModulePedagogy } from './components/modules/ModulePedagogy';
import { ModuleRegulations } from './components/modules/ModuleRegulations';
import { ModuleDigitalEco } from './components/modules/ModuleDigitalEco';
import { ModuleWellness } from './components/modules/ModuleWellness';
import { FinalExam } from './components/FinalExam';
import { GamifiedRanking } from './components/evaluation/GamifiedRanking';
import { InstructorAnalyticsDashboard } from './components/evaluation/InstructorAnalyticsDashboard';
import { AnimateVideoModule } from './components/modules/AnimateVideoModule';
import { SenaLogosymbol } from './components/SenaEmblem';
import {
  CheckCircle2,
  Clock,
  Award,
  Trophy,
  BarChart3,
  Video,
  ChevronRight,
  CreditCard,
  ArrowRight,
  Calendar as CalendarIcon,
  Star,
  Check,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  FileText,
  UserCheck,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_MODULES: ModuleProgress[] = [
  {
    id: 'identidad',
    title: '01. Identidad, Historia y Símbolos',
    description: 'Conoce los orígenes del SENA (1957), la visión de Rodolfo Martínez Tono, la misión, el escudo de los 3 sectores y el himno.',
    estimatedMinutes: 15,
    completed: false,
    badge: {
      name: 'Emblema Institucional',
      description: 'Dominio de la historia y símbolos patrios del SENA',
      icon: '🛡️'
    }
  },
  {
    id: 'pedagogia',
    title: '02. Modelo Pedagógico SENA (FPI)',
    description: 'Aprende los pilares del Saber, Hacer y Ser, la Etapa Lectiva vs. Productiva (contrato de aprendizaje) y calificaciones (A/D).',
    estimatedMinutes: 15,
    completed: false,
    badge: {
      name: 'Maestro FPI',
      description: 'Comprensión integral de la formación por competencias',
      icon: '🎓'
    }
  },
  {
    id: 'reglamento',
    title: '03. Reglamento del Aprendiz & Casos',
    description: 'Explora tus derechos, deberes esenciales, justificación de inasistencias en 3 días hábiles y resuelve casos del comité.',
    estimatedMinutes: 20,
    completed: false,
    badge: {
      name: 'Defensor del Reglamento',
      description: 'Apropiación ética de los deberes y derechos del Acuerdo 009 de 2024',
      icon: '⚖️'
    }
  },
  {
    id: 'plataformas',
    title: '04. Ecosistema Digital SENA',
    description: 'Aprende el uso práctico de SOFIA Plus, Zajuna (LMS), MiSENA, Sistema de Bibliotecas y la Agencia Pública de Empleo.',
    estimatedMinutes: 15,
    completed: false,
    badge: {
      name: 'Navegante Digital',
      description: 'Dominio integral de los sistemas de información SENA',
      icon: '💻'
    }
  },
  {
    id: 'bienestar',
    title: '05. Bienestar al Aprendiz & Decálogo',
    description: 'Descubre los apoyos de sostenimiento, monitorías, deporte, cultura y asume el Decálogo de Convivencia del Aprendiz.',
    estimatedMinutes: 15,
    completed: false,
    badge: {
      name: 'Embajador de Bienestar',
      description: 'Compromiso ético con la convivencia y el desarrollo humano',
      icon: '🌟'
    }
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isThemeBlurring, setIsThemeBlurring] = useState<boolean>(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    const saved = localStorage.getItem('sena_apprentice_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_APPRENTICE;
  });

  const [modules, setModules] = useState<ModuleProgress[]>(() => {
    const saved = localStorage.getItem('sena_induction_modules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_MODULES;
  });

  const [finalExamPassed, setFinalExamPassed] = useState<boolean>(() => {
    return localStorage.getItem('sena_final_exam_passed') === 'true';
  });

  const [activeTab, setActiveTab] = useState<string>('inicio');

  // Interactive Widgets State
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(8);

  // Modals state
  const [isCarnetOpen, setIsCarnetOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('sena_dark_mode', String(darkMode));
  }, [darkMode]);

  // Handle Dark Mode toggle with blur transition
  const toggleDarkMode = () => {
    setIsThemeBlurring(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsThemeBlurring(false);
    }, 420);
  };

  // Persistence
  useEffect(() => {
    localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sena_induction_modules', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('sena_final_exam_passed', String(finalExamPassed));
  }, [finalExamPassed]);

  // Calculate overall progress
  const completedModulesCount = modules.filter((m) => m.completed).length;
  // 5 modules count for 80%, final exam counts for 20%
  const progressPercent = Math.min(
    100,
    Math.round((completedModulesCount / modules.length) * 80 + (finalExamPassed ? 20 : 0))
  );

  const markModuleCompleted = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m))
    );
  };

  const handleExamPassed = (score: number, totalQuestions?: number) => {
    setFinalExamPassed(true);
    const totalQ = totalQuestions || 10;
    const pct = Math.round((score / totalQ) * 100);
    saveSubmission(profile, pct, score, totalQ, 'Aprobado');
  };

  const handleSendRating = (e: React.FormEvent) => {
    e.preventDefault();
    setRatingSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  // Find next incomplete module
  const nextIncompleteModule = modules.find((m) => !m.completed) || modules[0];

  return (
    <div
      className={`min-h-screen bg-[#f8fafc] dark:bg-[#0c110d] text-stone-900 dark:text-stone-100 transition-colors duration-300 ${
        isThemeBlurring ? 'theme-transition-blur' : ''
      }`}
    >
      {/* 1. Modern EdTech Sidebar Navigation (Persistent on Desktop, Drawer on Mobile) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCarnet={() => setIsCarnetOpen(true)}
        openCertificado={() => setIsCertificateOpen(true)}
        openGlosario={() => setIsGlossaryOpen(true)}
        openProfile={() => setIsProfileOpen(true)}
        openAdminConsole={() => setIsAdminConsoleOpen(true)}
        progressPercent={progressPercent}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        profile={profile}
        isOpenMobile={isSidebarMobileOpen}
        setIsOpenMobile={setIsSidebarMobileOpen}
      />

      {/* 2. Main Dashboard Layout Area (Offset by Sidebar on Desktop) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <Header
          onToggleSidebarMobile={() => setIsSidebarMobileOpen(true)}
          openCarnet={() => setIsCarnetOpen(true)}
          openCertificado={() => setIsCertificateOpen(true)}
          openGlosario={() => setIsGlossaryOpen(true)}
          openProfile={() => setIsProfileOpen(true)}
          openAdminConsole={() => setIsAdminConsoleOpen(true)}
          progressPercent={progressPercent}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          profile={profile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectSearchItem={(tabId) => setActiveTab(tabId)}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'inicio' ? (
            <div className="space-y-8">
              {/* Hero Welcome Banner (Modern LMS Dashboard Model) */}
              <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-950 dark:from-[#0d2216] dark:via-[#091a11] dark:to-[#050e09] text-white rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-md border border-emerald-700/40 dark:border-emerald-800/40">
                <div className="absolute right-[-30px] top-[-30px] bottom-[-30px] w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
                  <SenaLogosymbol className="w-80 h-80" variant="white" />
                </div>

                <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                      <span>INDUCCIÓN INSTITUCIONAL 2026</span>
                    </span>
                    <span className="text-emerald-200 font-mono text-[11px]">
                      Ficha {profile.cohortFicha} · {profile.regional}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white leading-tight">
                    ¡Bienvenido, {profile.fullName.split(' ')[0]}!
                  </h1>

                  <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                    Inicias tu formación profesional integral en el SENA. Avanza en los módulos interactivos para conocer tus derechos, dominar Zajuna y Sofia Plus, y desbloquear tu carné virtual y certificación oficial de 40 horas.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab(nextIncompleteModule.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-950 font-extrabold rounded-xl text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <span>Continuar: {nextIncompleteModule.title.split('. ')[1] || nextIncompleteModule.title}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-800" />
                    </button>

                    <button
                      onClick={() => setIsCarnetOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-white font-semibold rounded-xl text-xs border border-emerald-600/50 transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-emerald-300" />
                      <span>Ver Carné Virtual</span>
                    </button>

                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-emerald-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Editar Ficha</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* 4 KPI Metrics Cards in a Row (Classic LMS Model from Reference Image) */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Metric 1 */}
                <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs flex items-center justify-between transition-colors">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
                      Progreso General
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900 dark:text-stone-100 mt-1 block">
                      {progressPercent}%
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Meta: 100% de Inducción</span>
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0">
                    {progressPercent}%
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs flex items-center justify-between transition-colors">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
                      Módulos Listos
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900 dark:text-stone-100 mt-1 block">
                      {completedModulesCount} / 5
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-1 block">
                      {5 - completedModulesCount} pendientes
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs flex items-center justify-between transition-colors">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
                      Intensidad Horaria
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900 dark:text-stone-100 mt-1 block">
                      40 Horas
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-1 block">
                      Formación Oficial
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs flex items-center justify-between transition-colors">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
                      Juicio Evaluativo
                    </span>
                    <span
                      className={`text-xl sm:text-2xl font-black mt-1 block ${
                        finalExamPassed
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {finalExamPassed ? 'A (Aprobado)' : 'En Curso'}
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-1 block">
                      {finalExamPassed ? 'Reto completado' : 'Reto final pendiente'}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </section>

              {/* Multi-Column Work Area: Main Courses Grid (Left) + Right Utility Widgets (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Center Column: Mis Módulos de Inducción */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display">
                        Módulos de Formación Institucional
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        Ruta pedagógica y de apropiación de valores del aprendiz SENA
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-[#1a231d] px-3 py-1 rounded-full">
                      {completedModulesCount} de 5 listos
                    </span>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="space-y-4">
                    {modules.map((mod, index) => (
                      <div
                        key={mod.id}
                        className={`bg-white dark:bg-[#141b16] rounded-2xl p-5 sm:p-6 border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:shadow-md ${
                          mod.completed
                            ? 'border-emerald-200 dark:border-emerald-800/60'
                            : 'border-stone-200/80 dark:border-[#232f27]'
                        }`}
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {/* Module Number Box */}
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow-xs ${
                              mod.completed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 dark:bg-[#1c2620] text-stone-700 dark:text-stone-300'
                            }`}
                          >
                            0{index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                Módulo 0{index + 1}
                              </span>
                              <span className="text-stone-300 dark:text-stone-600">·</span>
                              <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                                <Clock className="w-3 h-3" />
                                <span>{mod.estimatedMinutes} min</span>
                              </div>
                              {mod.completed && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.2 rounded-full border border-emerald-200 dark:border-emerald-800/60 ml-auto sm:ml-0">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Aprobado</span>
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                              {mod.title}
                            </h3>

                            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1 leading-relaxed">
                              {mod.description}
                            </p>

                            {/* Badge reward preview */}
                            <div className="flex items-center gap-2 mt-3 text-xs text-stone-500 dark:text-stone-400">
                              <span className="text-base">{mod.badge.icon}</span>
                              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                                Insignia: {mod.badge.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-[#1e2721] shrink-0">
                          <button
                            onClick={() => setActiveTab(mod.id)}
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              mod.completed
                                ? 'bg-stone-100 dark:bg-[#1c2620] text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-[#253229]'
                                : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-xs'
                            }`}
                          >
                            <span>{mod.completed ? 'Repasar Módulo' : 'Iniciar Módulo'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Final Exam Challenge Card in Course Grid */}
                    <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-white rounded-2xl p-6 border border-emerald-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                              Evaluación Integral Gamificada
                            </span>
                            <span className="text-stone-500">·</span>
                            <span className="text-[11px] text-amber-300 font-mono font-bold">Acuerdo 009 de 2024</span>
                          </div>
                          <h3 className="text-base font-bold font-display text-white">
                            Reto Gamificado del Reglamento del Aprendiz SENA
                          </h3>
                          <p className="text-xs text-stone-300 mt-1 max-w-lg leading-relaxed">
                            Responde preguntas organizadas por capítulos, acumula puntos por rapidez y racha, compite en el ranking general y obtén tu juicio oficial Aprobatorio (A/D).
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                        <button
                          onClick={() => setActiveTab('ranking')}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          <Trophy className="w-4 h-4 text-amber-300" />
                          <span>Ver Ranking</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('video')}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-200 border border-emerald-600/40 transition-colors cursor-pointer"
                        >
                          <Video className="w-4 h-4 text-emerald-300" />
                          <span>Animar en Video</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('examen')}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black bg-[#39A900] hover:bg-[#2d8500] text-white transition-colors cursor-pointer shadow-md"
                        >
                          <span>{finalExamPassed ? 'Repetir Reto' : 'Presentar Evaluación'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Digital Badges Showcase */}
                  <div className="bg-white dark:bg-[#141b16] rounded-2xl p-6 border border-stone-200/80 dark:border-[#232f27] shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                          Insignias Digitales de Inducción
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          Reconocimientos acumulables por logros pedagógicos
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {completedModulesCount} / 5 Desbloqueadas
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {modules.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3.5 rounded-xl text-center border transition-all ${
                            m.completed
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                              : 'bg-stone-50 dark:bg-[#19221c] border-stone-200 dark:border-[#232f27] opacity-40 grayscale'
                          }`}
                        >
                          <div className="text-2xl mb-1.5">{m.badge.icon}</div>
                          <h4 className="text-[11px] font-bold text-stone-900 dark:text-stone-100 leading-tight">
                            {m.badge.name}
                          </h4>
                          <span className="text-[9px] text-stone-500 dark:text-stone-400 font-mono mt-1 block">
                            {m.completed ? 'Conseguida' : 'Bloqueada'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Utility Widgets Column (Directly matching reference image LMS layout) */}
                <div className="space-y-6">
                  {/* Widget 1: Interactive Academic Calendar */}
                  <div className="bg-white dark:bg-[#141b16] rounded-2xl border border-stone-200/80 dark:border-[#232f27] shadow-xs overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-blue-200" />
                          <span className="text-xs font-bold tracking-wide uppercase">Calendario Académico</span>
                        </div>
                        <span className="text-[10px] font-mono bg-blue-800/60 px-2 py-0.5 rounded-full">2026</span>
                      </div>
                      <p className="text-base font-black font-display mt-1">Octubre · Trimestre I</p>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-stone-400 mb-1">
                        <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {[...Array(31)].map((_, idx) => {
                          const day = idx + 1;
                          const isSelected = selectedCalendarDay === day;
                          const isMilestone = day === 1 || day === 8 || day === 15 || day === 22;
                          return (
                            <button
                              key={day}
                              onClick={() => setSelectedCalendarDay(day)}
                              className={`h-7 w-7 mx-auto rounded-lg flex items-center justify-center font-semibold text-[11px] transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white font-bold shadow-xs scale-105'
                                  : isMilestone
                                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold'
                                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-stone-100 dark:border-[#202c23] text-[11px] text-stone-600 dark:text-stone-300">
                        <p className="font-semibold text-emerald-800 dark:text-emerald-400">
                          {selectedCalendarDay === 1 && '🎉 Día 1: Bienvenida Institucional SENA'}
                          {selectedCalendarDay === 8 && '⚖️ Día 8: Taller Práctico Reglamento Acuerdo 009'}
                          {selectedCalendarDay === 15 && '💻 Día 15: Inmersión Zajuna y Sofia Plus'}
                          {selectedCalendarDay === 22 && '🎓 Día 22: Cierre de Inducción y Certificación'}
                          {![1, 8, 15, 22].includes(selectedCalendarDay) && `Jornada formativa regular · Día ${selectedCalendarDay}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Widget 2: Próximos Hitos & Entregas */}
                  <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-[#202c23]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        Próximas Actividades
                      </h4>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        En curso
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-[#19221c] border border-stone-200/60 dark:border-[#26332a] flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-stone-900 dark:text-stone-100">Lectura del Acuerdo 009 de 2024</p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400">Módulo 03 · Deberes y Derechos</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-[#19221c] border border-stone-200/60 dark:border-[#26332a] flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-stone-900 dark:text-stone-100">Guía Práctica Zajuna & Sofia</p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400">Módulo 04 · Ecosistema Digital</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-[#19221c] border border-stone-200/60 dark:border-[#26332a] flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-stone-900 dark:text-stone-100">Presentación del Reto Final</p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400">Evaluación de 10 preguntas</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Widget 3: Tutor & Institutional Support */}
                  <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Mesa de Ayuda & Tutoría
                    </h4>

                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                        <span>Canales Oficiales SENA</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                        ¿Tienes dudas con tu ficha o acceso a Zajuna? Comunícate con la coordinación académica de tu centro o soporte nacional.
                      </p>
                      <div className="pt-2 border-t border-emerald-200/80 dark:border-emerald-800/60 text-[10px] font-mono text-emerald-800 dark:text-emerald-300">
                        Línea gratuita: 01 8000 910270
                      </div>
                    </div>
                  </div>

                  {/* Widget 4: Rate us / Valoración de Inducción */}
                  <div className="bg-white dark:bg-[#141b16] rounded-2xl p-5 border border-stone-200/80 dark:border-[#232f27] shadow-xs text-center space-y-3">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 font-display">
                      ¿Cómo ha sido tu experiencia en la plataforma?
                    </h4>

                    {ratingSubmitted ? (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs">
                        <Check className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                        <p className="font-bold">¡Gracias por tu valoración!</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSendRating} className="space-y-3">
                        <div className="flex justify-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setSelectedRating(star)}
                              className="p-1 cursor-pointer transition-transform hover:scale-125"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= selectedRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-stone-300 dark:text-stone-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>

                        <input
                          type="text"
                          value={ratingComment}
                          onChange={(e) => setRatingComment(e.target.value)}
                          placeholder="Tu comentario..."
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-100 dark:bg-[#1a231d] border border-stone-200 dark:border-[#28362d] text-stone-900 dark:text-stone-100 outline-none"
                        />

                        <button
                          type="submit"
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Enviar Calificación
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Individual Module Stage (with breadcrumb back to Dashboard) */
            <div className="space-y-6">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-[#232f27]">
                <button
                  onClick={() => setActiveTab('inicio')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>← Volver al Tablero Principal</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCarnetOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-lg cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Mi Carné</span>
                  </button>

                  <button
                    onClick={() => setIsCertificateOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Certificado ({progressPercent}%)</span>
                  </button>
                </div>
              </div>

              {/* Module Content */}
              {activeTab === 'identidad' && (
                <ModuleIdentity
                  isCompleted={modules[0].completed}
                  onComplete={() => markModuleCompleted('identidad')}
                />
              )}

              {activeTab === 'pedagogia' && (
                <ModulePedagogy
                  isCompleted={modules[1].completed}
                  onComplete={() => markModuleCompleted('pedagogia')}
                />
              )}

              {activeTab === 'reglamento' && (
                <ModuleRegulations
                  isCompleted={modules[2].completed}
                  onComplete={() => markModuleCompleted('reglamento')}
                />
              )}

              {activeTab === 'plataformas' && (
                <ModuleDigitalEco
                  isCompleted={modules[3].completed}
                  onComplete={() => markModuleCompleted('plataformas')}
                />
              )}

              {activeTab === 'bienestar' && (
                <ModuleWellness
                  isCompleted={modules[4].completed}
                  onComplete={() => markModuleCompleted('bienestar')}
                />
              )}

              {activeTab === 'examen' && (
                <FinalExam
                  onExamPassed={handleExamPassed}
                  openCertificate={() => setIsCertificateOpen(true)}
                  currentProfile={profile}
                  onUpdateProfile={(updated) => setProfile(updated)}
                  onOpenRanking={() => setActiveTab('ranking')}
                  onReturnToDashboard={() => setActiveTab('inicio')}
                />
              )}

              {activeTab === 'ranking' && (
                <GamifiedRanking
                  currentProfile={profile}
                  onPresentEvaluation={() => setActiveTab('examen')}
                />
              )}

              {activeTab === 'instructor' && (
                <InstructorAnalyticsDashboard
                  onOpenGoogleSheet={() => setIsAdminConsoleOpen(true)}
                />
              )}

              {activeTab === 'video' && (
                <AnimateVideoModule
                  onReturnToDashboard={() => setActiveTab('inicio')}
                />
              )}
            </div>
          )}
        </main>

        {/* Institutional Footer */}
        <footer className="bg-white dark:bg-[#111713] text-stone-600 dark:text-stone-400 text-xs border-t border-stone-200 dark:border-[#232f27] py-6 px-4 sm:px-6 lg:px-8 mt-auto transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SenaLogosymbol className="w-[38px] h-[38px]" variant="color" />
              <div>
                <p className="text-stone-900 dark:text-white font-extrabold text-xs font-display">
                  Servicio Nacional de Aprendizaje · SENA
                </p>
                <p className="text-[11px] text-stone-500">
                  Dirección General · Calle 57 No. 8 - 69, Bogotá D.C., Colombia
                </p>
              </div>
            </div>

            <div className="text-center md:text-right text-[11px] text-stone-500 space-y-1">
              <p>Línea Gratuita Nacional: 01 8000 910270 | Bogotá: (601) 343 0111</p>
              <div className="flex items-center justify-center md:justify-end gap-3">
                <p>Portal LMS de Inducción Institucional · Formación Profesional Integral</p>
                <button
                  onClick={() => setIsAdminConsoleOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold cursor-pointer transition-colors"
                  title="Acceso exclusivo para el Instructor / Administrador"
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Acceso Instructor</span>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Interactive Modals */}
      <ApprenticeCardModal
        profile={profile}
        isOpen={isCarnetOpen}
        onClose={() => setIsCarnetOpen(false)}
        onEdit={() => {
          setIsCarnetOpen(false);
          setIsProfileOpen(true);
        }}
        isInductionCompleted={progressPercent >= 80}
      />

      <CertificateModal
        profile={profile}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        progressPercent={progressPercent}
      />

      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSave={(updated) => setProfile(updated)}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <AdminConsoleModal
        isOpen={isAdminConsoleOpen}
        onClose={() => setIsAdminConsoleOpen(false)}
      />
    </div>
  );
}
