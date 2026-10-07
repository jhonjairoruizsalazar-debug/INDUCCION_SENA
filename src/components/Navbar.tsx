import React from 'react';
import { SenaLogosymbol } from './SenaEmblem';
import { Award, CreditCard, BookOpen, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCarnet: () => void;
  openCertificado: () => void;
  openGlosario: () => void;
  progressPercent: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openCarnet,
  openCertificado,
  openGlosario,
  progressPercent,
  darkMode,
  toggleDarkMode
}) => {
  const navItems = [
    { id: 'inicio', label: 'Ruta Integral' },
    { id: 'identidad', label: 'Identidad & Símbolos' },
    { id: 'pedagogia', label: 'Modelo FPI' },
    { id: 'reglamento', label: 'Reglamento & Casos' },
    { id: 'plataformas', label: 'Ecosistema Digital' },
    { id: 'bienestar', label: 'Bienestar & Decálogo' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#eef2f7]/90 dark:bg-[#111713]/90 backdrop-blur-md border-b border-white/60 dark:border-white/5 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Brand Wordmark (Single text element with 41.6px icon) */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl py-1.5 px-2 hover:bg-white/40 dark:hover:bg-white/5 transition-all shrink-0 cursor-pointer"
        >
          <SenaLogosymbol className="w-[41.6px] h-[41.6px] transition-transform group-hover:scale-105 filter drop-shadow-xs" variant="color" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-display">
              Inducción SENA
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
              Formación Profesional
            </span>
          </div>
        </button>

        {/* Zone 2: Neumorphic Soft Navigation Pill Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-2xl neu-inset">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Neumorphic Action Buttons + Tactile Toggle Slider */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openGlosario}
            title="Glosario Institucional"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 rounded-xl neu-btn cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span className="hidden md:inline">Glosario</span>
          </button>

          <button
            onClick={openCarnet}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 rounded-xl neu-btn cursor-pointer whitespace-nowrap"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Mi Carné</span>
          </button>

          <button
            onClick={openCertificado}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white rounded-xl neu-btn-green cursor-pointer whitespace-nowrap"
          >
            <Award className="w-4 h-4 text-emerald-100" />
            <span className="hidden sm:inline">Certificado</span>
            <span className="text-[11px] bg-black/20 text-white px-2 py-0.5 rounded-full font-mono tabular-nums shadow-inner">
              {progressPercent}%
            </span>
          </button>

          {/* Tactile Neumorphic Switch Slider (Inspired by UI Reference Kit) */}
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="group relative w-14 h-8 rounded-full neu-inset p-1 flex items-center cursor-pointer transition-all focus:outline-none"
          >
            {/* Sliding tactile knob */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform shadow-md ${
                darkMode
                  ? 'translate-x-6 bg-[#1a231d] text-amber-300 border border-emerald-500/30'
                  : 'translate-x-0 bg-white text-stone-700 border border-stone-200/60'
              }`}
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-stone-600" />
              )}
            </div>
            <span className="sr-only">
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
