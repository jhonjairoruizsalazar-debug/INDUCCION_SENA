import React, { useState, useMemo } from 'react';
import { ApprenticeSubmission, getSubmissions } from '../../services/inductionStore';
import { ApprenticeProfile } from '../../types';
import {
  Trophy,
  Medal,
  Award,
  Flame,
  Clock,
  Search,
  Filter,
  Users,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';

interface GamifiedRankingProps {
  currentProfile?: ApprenticeProfile;
  onPresentEvaluation?: () => void;
}

type RankingFilterType = 'general' | 'programa' | 'ficha' | 'semanal' | 'mensual';

export const GamifiedRanking: React.FC<GamifiedRankingProps> = ({
  currentProfile,
  onPresentEvaluation
}) => {
  const [filterType, setFilterType] = useState<RankingFilterType>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedFicha, setSelectedFicha] = useState<string>('all');
  const [submissions, setSubmissions] = useState<ApprenticeSubmission[]>(() => getSubmissions());

  // Distinct programs and fichas for dropdowns
  const availablePrograms = useMemo(() => {
    return Array.from(new Set(submissions.map((s) => s.program))).filter(Boolean);
  }, [submissions]);

  const availableFichas = useMemo(() => {
    return Array.from(new Set(submissions.map((s) => s.cohortFicha))).filter(Boolean);
  }, [submissions]);

  // Refresh data
  const handleRefresh = () => {
    setSubmissions(getSubmissions());
  };

  // Filtered and sorted leaderboard
  const filteredSubmissions = useMemo(() => {
    let list = [...submissions];

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.documentNumber.includes(q) ||
          s.cohortFicha.includes(q) ||
          s.program.toLowerCase().includes(q)
      );
    }

    // Tab-specific filters
    if (filterType === 'programa' && selectedProgram !== 'all') {
      list = list.filter((s) => s.program === selectedProgram);
    } else if (filterType === 'ficha' && selectedFicha !== 'all') {
      list = list.filter((s) => s.cohortFicha === selectedFicha);
    } else if (filterType === 'semanal') {
      // 7 days window
      const now = Date.now();
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
      list = list.filter((s) => {
        const time = new Date(s.timestamp.replace(' ', 'T')).getTime();
        return isNaN(time) || time >= sevenDaysAgo;
      });
    } else if (filterType === 'mensual') {
      // 30 days window
      const now = Date.now();
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
      list = list.filter((s) => {
        const time = new Date(s.timestamp.replace(' ', 'T')).getTime();
        return isNaN(time) || time >= thirtyDaysAgo;
      });
    }

    // Sort: Primary by gamifiedPoints DESC, Secondary by timeSpentSeconds ASC (faster is better)
    list.sort((a, b) => {
      const ptsA = a.gamifiedPoints || a.score * 10;
      const ptsB = b.gamifiedPoints || b.score * 10;
      if (ptsB !== ptsA) {
        return ptsB - ptsA;
      }
      return (a.timeSpentSeconds || 999) - (b.timeSpentSeconds || 999);
    });

    return list;
  }, [submissions, filterType, searchTerm, selectedProgram, selectedFicha]);

  const top3 = filteredSubmissions.slice(0, 3);
  const firstPlace = top3[0];
  const secondPlace = top3[1];
  const thirdPlace = top3[2];

  const formatTime = (sec?: number) => {
    if (!sec) return '01:30';
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner with Trophy */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-[#39A900] to-emerald-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Cuadro de Honor y Rendimiento Institucional</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              Ranking Gamificado SENA
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Descubre a los aprendices destacados del Acuerdo 009 de 2024. Las posiciones se definen por puntos de acierto, bonos de velocidad y rachas consecutivas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Actualizar Ranking</span>
            </button>
            {onPresentEvaluation && (
              <button
                onClick={onPresentEvaluation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#047857] hover:bg-emerald-50 text-xs font-black shadow-lg shadow-black/10 transition-all transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                <span>Presentar Mi Reto</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Olympic Podium (Top 1, 2, 3) */}
      {top3.length > 0 && (
        <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Podio Olímpico SENA
            </span>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display">
              Líderes de Excelencia Normativa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-6">
            {/* 2nd Place (Silver) */}
            {secondPlace && (
              <div className="order-2 md:order-1 flex flex-col items-center text-center p-5 rounded-3xl bg-stone-50 dark:bg-[#172019] border-2 border-stone-300 dark:border-stone-700 shadow-sm relative">
                <div className="absolute -top-5 w-10 h-10 rounded-2xl bg-stone-300 dark:bg-stone-600 text-stone-800 dark:text-white flex items-center justify-center font-black text-lg shadow-md">
                  🥈 2°
                </div>
                <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-2xl font-black text-stone-700 dark:text-stone-200 mt-2 mb-3">
                  {secondPlace.fullName.charAt(0)}
                </div>
                <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 truncate max-w-full">
                  {secondPlace.fullName}
                </h3>
                <p className="text-[11px] text-stone-500 truncate max-w-full mb-2">
                  Ficha {secondPlace.cohortFicha} • {secondPlace.program.split('(')[0]}
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#111713] w-full border border-stone-200 dark:border-[#232f27] space-y-1">
                  <div className="text-lg font-black text-stone-800 dark:text-stone-200 font-mono tabular-nums">
                    {secondPlace.gamifiedPoints || secondPlace.score * 10} pts
                  </div>
                  <div className="text-[10px] text-stone-500 font-bold">
                    ⏱️ {formatTime(secondPlace.timeSpentSeconds)} • {secondPlace.score}% acierto
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place (Gold) - Elevated */}
            {firstPlace && (
              <div className="order-1 md:order-2 flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-[#172019] border-2 border-amber-400 dark:border-amber-500 shadow-lg relative md:-translate-y-4">
                <div className="absolute -top-6 w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-amber-200 dark:ring-amber-900">
                  🥇 1°
                </div>
                <div className="w-20 h-20 rounded-full bg-amber-200 dark:bg-amber-800/80 flex items-center justify-center text-3xl font-black text-amber-950 dark:text-amber-100 mt-2 mb-3 ring-4 ring-amber-300 dark:ring-amber-600">
                  👑
                </div>
                <h3 className="font-black text-base text-stone-900 dark:text-stone-100 truncate max-w-full">
                  {firstPlace.fullName}
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold truncate max-w-full mb-3">
                  Ficha {firstPlace.cohortFicha} • {firstPlace.program.split('(')[0]}
                </p>
                <div className="p-3 rounded-2xl bg-white dark:bg-[#111713] w-full border border-amber-300 dark:border-amber-700/60 space-y-1 shadow-xs">
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                    {firstPlace.gamifiedPoints || firstPlace.score * 10} pts
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300 font-bold">
                    ⏱️ {formatTime(firstPlace.timeSpentSeconds)} • {firstPlace.score}% acierto
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider">
                    {firstPlace.levelTitle}
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place (Bronze) */}
            {thirdPlace && (
              <div className="order-3 flex flex-col items-center text-center p-5 rounded-3xl bg-stone-50 dark:bg-[#172019] border-2 border-amber-600/30 dark:border-amber-700/40 shadow-sm relative">
                <div className="absolute -top-5 w-10 h-10 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-black text-lg shadow-md">
                  🥉 3°
                </div>
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-2xl font-black text-amber-800 dark:text-amber-200 mt-2 mb-3">
                  {thirdPlace.fullName.charAt(0)}
                </div>
                <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 truncate max-w-full">
                  {thirdPlace.fullName}
                </h3>
                <p className="text-[11px] text-stone-500 truncate max-w-full mb-2">
                  Ficha {thirdPlace.cohortFicha} • {thirdPlace.program.split('(')[0]}
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#111713] w-full border border-stone-200 dark:border-[#232f27] space-y-1">
                  <div className="text-lg font-black text-stone-800 dark:text-stone-200 font-mono tabular-nums">
                    {thirdPlace.gamifiedPoints || thirdPlace.score * 10} pts
                  </div>
                  <div className="text-[10px] text-stone-500 font-bold">
                    ⏱️ {formatTime(thirdPlace.timeSpentSeconds)} • {thirdPlace.score}% acierto
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filters and Search Tabs */}
      <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 shadow-sm space-y-6">
        {/* Filter Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-[#1e2821] pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('general')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'general'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Ranking General
            </button>
            <button
              onClick={() => setFilterType('programa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'programa'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Por Programa
            </button>
            <button
              onClick={() => setFilterType('ficha')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'ficha'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Por Ficha
            </button>
            <button
              onClick={() => setFilterType('semanal')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'semanal'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setFilterType('mensual')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'mensual'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Mensual
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por aprendiz o ficha..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-stone-200 dark:border-[#26352b] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>
        </div>

        {/* Secondary dropdown if filtering by program or ficha */}
        {filterType === 'programa' && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-500">Filtrar por Programa:</span>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs border border-stone-200 dark:border-[#26352b] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100"
            >
              <option value="all">Todos los programas</option>
              {availablePrograms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {filterType === 'ficha' && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-500">Filtrar por Ficha:</span>
            <select
              value={selectedFicha}
              onChange={(e) => setSelectedFicha(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs border border-stone-200 dark:border-[#26352b] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100"
            >
              <option value="all">Todas las fichas</option>
              {availableFichas.map((f) => (
                <option key={f} value={f}>
                  Ficha {f}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Leaderboard Table (Top 10 & Full List) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-[#232f27] text-stone-500 dark:text-stone-400 font-black uppercase tracking-wider text-[11px]">
                <th className="pb-3 pl-3">Posición</th>
                <th className="pb-3">Aprendiz</th>
                <th className="pb-3">Programa & Ficha</th>
                <th className="pb-3 text-right">Puntaje</th>
                <th className="pb-3 text-center">Tiempo</th>
                <th className="pb-3 text-center">Precisión</th>
                <th className="pb-3 text-center">Nivel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-[#1e2821]">
              {filteredSubmissions.slice(0, 15).map((sub, index) => {
                const rank = index + 1;
                const isCurrentApprentice =
                  currentProfile && currentProfile.documentNumber === sub.documentNumber;

                let rankBadge: React.ReactNode = (
                  <span className="font-mono font-bold text-stone-600 dark:text-stone-400">
                    #{rank}
                  </span>
                );

                if (rank === 1) rankBadge = <span className="text-base">🥇 1°</span>;
                if (rank === 2) rankBadge = <span className="text-base">🥈 2°</span>;
                if (rank === 3) rankBadge = <span className="text-base">🥉 3°</span>;

                return (
                  <tr
                    key={sub.id}
                    className={`transition-colors ${
                      isCurrentApprentice
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-bold ring-1 ring-[#39A900]/40'
                        : 'hover:bg-stone-50 dark:hover:bg-[#162019]'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center gap-1.5 font-bold">{rankBadge}</div>
                    </td>

                    {/* Apprentice Name */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#39A900]/15 text-[#39A900] font-black flex items-center justify-center text-xs">
                          {sub.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                            <span>{sub.fullName}</span>
                            {isCurrentApprentice && (
                              <span className="text-[10px] bg-[#39A900] text-white px-1.5 py-0.2 rounded font-black">
                                Tú
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {sub.documentType} {sub.documentNumber}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Program & Ficha */}
                    <td className="py-3.5">
                      <div className="text-stone-700 dark:text-stone-300 max-w-xs truncate font-medium">
                        {sub.program}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        Ficha {sub.cohortFicha} • Jornada {sub.jornada || 'Mañana'}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 text-right font-mono font-black text-stone-900 dark:text-stone-100 tabular-nums">
                      <span className="text-[#39A900] text-sm font-bold">
                        {sub.gamifiedPoints || sub.score * 10}
                      </span>{' '}
                      pts
                    </td>

                    {/* Time */}
                    <td className="py-3.5 text-center font-mono text-stone-600 dark:text-stone-400 tabular-nums">
                      {formatTime(sub.timeSpentSeconds)}
                    </td>

                    {/* Accuracy */}
                    <td className="py-3.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          sub.score >= 80
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : sub.score >= 70
                            ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {sub.score}%
                      </span>
                    </td>

                    {/* Level */}
                    <td className="py-3.5 text-center">
                      <span className="text-xs" title={sub.levelTitle}>
                        {sub.levelTitle?.includes('Embajador')
                          ? '👑 Embajador'
                          : sub.levelTitle?.includes('Maestro')
                          ? '🏅 Maestro'
                          : sub.levelTitle?.includes('Experto')
                          ? '⚖️ Experto'
                          : '📘 Aprendiz'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-10 text-stone-400 text-xs">
              No se encontraron registros con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
