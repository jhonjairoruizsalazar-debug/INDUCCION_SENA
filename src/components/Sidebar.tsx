import React from 'react';
import { SenaLogosymbol } from './SenaEmblem';
import {
  LayoutDashboard,
  Shield,
  GraduationCap,
  Scale,
  Laptop,
  HeartHandshake,
  Award,
  Trophy,
  BarChart3,
  Video,
  BookOpen,
  CreditCard,
  Sun,
  Moon,
  X,
  ChevronRight,
  Sparkles,
  UserCheck,
  Lock
} from 'lucide-react';
import { ApprenticeProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCarnet: () => void;
  openCertificado: () => void;
  openGlosario: () => void;
  openProfile: () => void;
  openAdminConsole?: () => void;
  progressPercent: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  profile: ApprenticeProfile;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  openCarnet,
  openCertificado,
  openGlosario,
  openProfile,
  openAdminConsole,
  progressPercent,
  darkMode,
  toggleDarkMode,
  profile,
  isOpenMobile,
  setIsOpenMobile
}) => {
  const mainNavigation = [
    {
      id: 'inicio',
      label: 'Tablero Principal',
      sublabel: 'Vista general y avance',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'identidad',
      label: '01. Identidad & Símbolos',
      sublabel: 'Historia, escudo e himno',
      icon: Shield,
      badge: '15 min'
    },
    {
      id: 'pedagogia',
      label: '02. Modelo Pedagógico',
      sublabel: 'Pilares FPI y etapas',
      icon: GraduationCap,
      badge: '15 min'
    },
    {
      id: 'reglamento',
      label: '03. Reglamento del Aprendiz',
      sublabel: 'Acuerdo 0009 de 2024',
      icon: Scale,
      badge: '20 min'
    },
    {
      id: 'plataformas',
      label: '04. Ecosistema Digital',
      sublabel: 'Sofia, Zajuna y SBS',
      icon: Laptop,
      badge: '15 min'
    },
    {
      id: 'bienestar',
      label: '05. Bienestar & Decálogo',
      sublabel: 'Apoyos y pacto ético',
      icon: HeartHandshake,
      badge: '15 min'
    },
    {
      id: 'examen',
      label: 'Evaluación Gamificada',
      sublabel: 'Reto Acuerdo 009 de 2024',
      icon: Award,
      badge: 'Reto'
    },
    {
      id: 'ranking',
      label: 'Ranking Gamificado',
      sublabel: 'Podio & cuadro de honor',
      icon: Trophy,
      badge: 'Top'
    },
    {
      id: 'instructor',
      label: 'Panel para Instructores',
      sublabel: 'Analítica & Google Sheets',
      icon: BarChart3,
      badge: 'Admin'
    },
    {
      id: 'video',
      label: 'Animar Foto en Video',
      sublabel: 'Generador Veo 3.1 AI',
      icon: Video,
      badge: 'Veo'
    }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#111713] border-r border-stone-200 dark:border-[#232f27] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-100 dark:border-[#1e2821] flex items-center justify-between">
          <div
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo at maintained 41.6px size */}
            <div className="w-[41.6px] h-[41.6px] shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <SenaLogosymbol className="w-[41.6px] h-[41.6px]" variant="color" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-stone-900 dark:text-stone-100 font-display">
                  SENA Inducción
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  LMS
                </span>
              </div>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                Portal del Aprendiz
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpenMobile(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Course Sections */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Ruta del Aprendiz
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {progressPercent}% Completado
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="mx-3 mb-3 h-1.5 bg-stone-100 dark:bg-[#1a231d] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <nav className="space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/80 shadow-xs'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#18201b] hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-[#1c2620] text-stone-500 dark:text-stone-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs block leading-tight truncate">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal block truncate">
                          {item.sublabel}
                        </span>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ml-1 ${
                          isActive
                            ? 'bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-stone-100 dark:bg-[#202c23] text-stone-500 dark:text-stone-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Institutional Tools */}
          <div>
            <span className="px-3 mb-2 block text-[10px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Recursos & Certificados
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  openGlosario();
                  setIsOpenMobile(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#18201b] rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-stone-400" />
                  <span>Glosario SENA</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </button>

              <button
                onClick={() => {
                  openCarnet();
                  setIsOpenMobile(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Mi Carné Virtual (3D)</span>
                </div>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                  {profile.documentType}
                </span>
              </button>

              <button
                onClick={() => {
                  openCertificado();
                  setIsOpenMobile(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#18201b] rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Constancia Oficial 40h</span>
                </div>
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded font-mono">
                  PDF
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* User Card & Dark Mode Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-[#1e2821] bg-stone-50/50 dark:bg-[#151c17]/60">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => {
                openProfile();
                setIsOpenMobile(false);
              }}
              className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity min-w-0"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                {profile.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {profile.fullName}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono block truncate">
                  Ficha {profile.cohortFicha}
                </span>
              </div>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="p-2 rounded-xl bg-white dark:bg-[#1f2922] border border-stone-200 dark:border-[#2b392f] text-stone-600 dark:text-amber-300 hover:bg-stone-100 dark:hover:bg-[#28362d] transition-transform active:scale-95 cursor-pointer shadow-2xs"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-400 dark:text-stone-500 pt-1 border-t border-stone-200/50 dark:border-[#253229]">
            <span>{profile.regional}</span>
            <button
              onClick={() => {
                openProfile();
                setIsOpenMobile(false);
              }}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
            >
              Editar Ficha
            </button>
          </div>

          {/* Discreet Instructor Console Access */}
          {openAdminConsole && (
            <button
              onClick={() => {
                openAdminConsole();
                setIsOpenMobile(false);
              }}
              className="w-full mt-3 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-semibold text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-stone-100 dark:bg-[#19221b] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors border border-stone-200 dark:border-[#223126] cursor-pointer"
              title="Consola protegida para el Instructor SENA"
            >
              <Lock className="w-3 h-3 text-stone-400 dark:text-stone-500" />
              <span>Consola Instructor</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
