import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Award,
  CreditCard,
  BookOpen,
  CheckCircle,
  Clock,
  Sparkles,
  X
} from 'lucide-react';
import { ApprenticeProfile } from '../types';

interface HeaderProps {
  onToggleSidebarMobile: () => void;
  openCarnet: () => void;
  openCertificado: () => void;
  openGlosario: () => void;
  openProfile: () => void;
  openAdminConsole?: () => void;
  progressPercent: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  profile: ApprenticeProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectSearchItem?: (itemId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebarMobile,
  openCarnet,
  openCertificado,
  openGlosario,
  openProfile,
  openAdminConsole,
  progressPercent,
  darkMode,
  toggleDarkMode,
  profile,
  searchQuery,
  setSearchQuery,
  onSelectSearchItem
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Bienvenido al SENA',
      desc: 'Inicia el Módulo 01 para conocer la historia y símbolos institucionales.',
      time: 'Hoy',
      read: false
    },
    {
      id: 2,
      title: 'Reglamento del Aprendiz',
      desc: 'Acuerdo 0009 de 2024 cargado en la plataforma.',
      time: 'Hace 1 hora',
      read: false
    },
    {
      id: 3,
      title: 'Carné Digital Habilitado',
      desc: 'Tu documento de identificación institucional ya está disponible.',
      time: 'Hace 3 horas',
      read: true
    }
  ];

  const quickSearchSuggestions = [
    { label: 'Historia y Rodolfo Martínez Tono', tab: 'identidad' },
    { label: 'Himno del SENA (Reproductor & Letra)', tab: 'identidad' },
    { label: 'Modelo Pedagógico FPI (Saber, Hacer, Ser)', tab: 'pedagogia' },
    { label: 'Contrato de Aprendizaje & Etapa Productiva', tab: 'pedagogia' },
    { label: 'Reglamento del Aprendiz (Acuerdo 0009 de 2024)', tab: 'reglamento' },
    { label: 'Justificación de Inasistencias (3 días hábiles)', tab: 'reglamento' },
    { label: 'Sofia Plus, Zajuna LMS y Biblioteca SENA', tab: 'plataformas' },
    { label: 'Bienestar al Aprendiz y Apoyos de Sostenimiento', tab: 'bienestar' },
    { label: 'Reto Final Evaluativo (Examen)', tab: 'examen' },
  ];

  const filteredSuggestions = searchQuery.trim()
    ? quickSearchSuggestions.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#111713]/95 backdrop-blur-md border-b border-stone-200 dark:border-[#232f27] transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile Menu Toggle & Global Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onToggleSidebarMobile}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#1f2922] lg:hidden cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar matching modern LMS Dashboard */}
          <div className="relative w-full max-w-md">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-stone-400 dark:text-stone-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Buscar temas, reglamento, Zajuna, FPI..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-stone-100 dark:bg-[#19221c] border border-transparent dark:border-[#28362d] focus:bg-white dark:focus:bg-[#1c2720] focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-0.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick search popup results */}
            {isSearchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#141b16] rounded-2xl border border-stone-200 dark:border-[#28362d] shadow-xl p-2 z-50 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2.5 py-1 block">
                  Resultados Rápidos
                </span>
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onMouseDown={() => {
                      if (onSelectSearchItem) onSelectSearchItem(item.tab);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-xl flex items-center justify-between transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                      Ir al módulo →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick LMS Badges + Actions + Dark Mode Toggle on Top Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Glosario */}
          <button
            onClick={openGlosario}
            title="Glosario SENA"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-[#1a231d] hover:bg-stone-200 dark:hover:bg-[#253229] rounded-xl transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span>Glosario</span>
          </button>

          {/* Quick Mi Carné */}
          <button
            onClick={openCarnet}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl transition-colors cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Mi Carné</span>
          </button>

          {/* Quick Certificado */}
          <button
            onClick={openCertificado}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-emerald-100" />
            <span className="hidden sm:inline">Certificado</span>
            <span className="text-[10px] bg-emerald-900/80 text-emerald-100 px-1.5 py-0.2 rounded-full font-mono tabular-nums">
              {progressPercent}%
            </span>
          </button>

          {/* Notifications Flyout */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-[#1a231d] hover:bg-stone-200 dark:hover:bg-[#253229] transition-colors cursor-pointer"
              title="Notificaciones de Inducción"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#141b16] rounded-2xl border border-stone-200 dark:border-[#28362d] shadow-2xl p-4 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-[#222e26] mb-3">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Notificaciones de Formación
                  </h4>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    3 Nuevas
                  </span>
                </div>
                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-stone-50 dark:bg-[#1a231d] text-left text-xs space-y-0.5"
                    >
                      <p className="font-bold text-stone-900 dark:text-stone-100">{n.title}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">{n.desc}</p>
                      <span className="text-[9px] text-stone-400 font-mono block mt-1">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Mini Badge */}
          <button
            onClick={openProfile}
            className="hidden xl:flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-[#28362d] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {profile.fullName.charAt(0)}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block leading-none truncate max-w-[120px]">
                {profile.fullName.split(' ')[0]}
              </span>
              <span className="text-[10px] text-stone-400 font-mono block mt-0.5">
                Aprendiz
              </span>
            </div>
          </button>

          {/* Dark Mode Toggle Button on Top Right (User Requirement with blur effect) */}
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 rounded-xl text-stone-600 dark:text-amber-300 bg-stone-100 dark:bg-[#1f2922] hover:bg-stone-200 dark:hover:bg-[#2c3b31] border border-stone-200 dark:border-[#324338] transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
            <span className="sr-only">
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
