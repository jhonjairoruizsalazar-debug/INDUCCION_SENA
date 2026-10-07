import React, { useState, useMemo } from 'react';
import { ACUERDO_009_2024, ARTICULOS_DETALLES_009, CASE_STUDIES } from '../../data/senaData';
import { DecisionTreeSimulator } from '../DecisionTreeSimulator';
import {
  ShieldAlert,
  CheckCircle2,
  Scale,
  CheckCircle,
  Award,
  GitBranch,
  BookOpen,
  FileText,
  Search,
  Code2,
  Copy,
  Check,
  ChevronRight,
  Info,
  Calendar,
  UserCheck,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleRegulations: React.FC<ModuleProps> = ({ onComplete, isCompleted }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [caseAnswers, setCaseAnswers] = useState<{ [caseId: string]: number }>({});
  const [mainTab, setMainTab] = useState<'reglamento' | 'simulador' | 'arbol'>('reglamento');
  const [reglamentoSubTab, setReglamentoSubTab] = useState<'estructura' | 'resolutivos' | 'sintesis' | 'json'>('estructura');
  
  // Interactive chapter & article state
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedArticleDetail, setSelectedArticleDetail] = useState<string | null>('Artículo 14');
  const [copiedJson, setCopiedJson] = useState(false);

  const currentCase = CASE_STUDIES[selectedCaseIdx];

  const handleSelectCaseOption = (caseId: string, optionIdx: number) => {
    const updated = { ...caseAnswers, [caseId]: optionIdx };
    setCaseAnswers(updated);

    const correctCount = CASE_STUDIES.filter(
      (c) => updated[c.id] !== undefined && c.options[updated[c.id]].isCorrect
    ).length;

    if (correctCount >= 3) {
      onComplete();
    }
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(ACUERDO_009_2024, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2200);
  };

  const selectedChapter = ACUERDO_009_2024.estructura_reglamento[selectedChapterIdx];

  // Search through all articles across all chapters
  const filteredArticles = useMemo(() => {
    if (!articleSearch.trim()) return null;
    const query = articleSearch.toLowerCase().trim();
    const results: { chapter: string; articleName: string; detail?: { titulo: string; detalle: string; categoria: string } }[] = [];

    ACUERDO_009_2024.estructura_reglamento.forEach((chap) => {
      chap.articulos.forEach((art) => {
        const detail = ARTICULOS_DETALLES_009[art];
        const matchName = art.toLowerCase().includes(query);
        const matchTitle = detail?.titulo.toLowerCase().includes(query);
        const matchDesc = detail?.detalle.toLowerCase().includes(query);

        if (matchName || matchTitle || matchDesc) {
          results.push({
            chapter: chap.capitulo,
            articleName: art,
            detail
          });
        }
      });
    });

    return results;
  }, [articleSearch]);

  const activeArticleInfo = selectedArticleDetail ? ARTICULOS_DETALLES_009[selectedArticleDetail] : null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-semibold text-emerald-800 dark:text-emerald-400">Módulo 03</span>
          <span aria-hidden="true">·</span>
          <span>Reglamento Oficial del Aprendiz SENA</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo 009 de 2024</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight font-display">
          Reglamento del Aprendiz SENA: Acuerdo 009 de 2024
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Estatuto integral adoptado el 5 de noviembre de 2024 por el Consejo Directivo Nacional del SENA. Deroga los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024, normando los derechos, deberes, permanencia, debido proceso y justicia restaurativa en 5 capítulos y 53 artículos.
        </p>
      </div>

      {/* Main Mode Navigation Bar with Neumorphic Inset Track */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl neu-inset w-fit">
        <button
          onClick={() => setMainTab('reglamento')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            mainTab === 'reglamento'
              ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Estatuto Oficial (Acuerdo 009 de 2024)</span>
        </button>
        <button
          onClick={() => setMainTab('arbol')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            mainTab === 'arbol'
              ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Juego de Rol (Árbol de Decisiones)</span>
        </button>
        <button
          onClick={() => setMainTab('simulador')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            mainTab === 'simulador'
              ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Tribunal de Casos Reales</span>
          <span className="text-[10px] bg-black/10 dark:bg-white/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold shadow-inner">
            {Object.keys(caseAnswers).length}/{CASE_STUDIES.length}
          </span>
        </button>
      </div>

      {mainTab === 'reglamento' && (
        <div className="space-y-6">
          {/* Institutional Act Banner Card (Acuerdo 009 de 2024) */}
          <div className="neu-convex rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-stone-200/60 dark:border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-lg">
                    {ACUERDO_009_2024.documento}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    {ACUERDO_009_2024.fecha_emision} (5 de Noviembre de 2024)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-200/80 dark:bg-white/10 text-stone-700 dark:text-stone-300 font-mono">
                    {ACUERDO_009_2024.organo_emisor}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
                  {ACUERDO_009_2024.objeto}
                </h3>
              </div>

              {/* Signatory badge */}
              <div className="shrink-0 p-3 rounded-2xl neu-flat text-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400">Firmante Oficial</div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">{ACUERDO_009_2024.firmante}</div>
                </div>
              </div>
            </div>

            {/* Sub-nav tabs for the regulation */}
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <button
                onClick={() => setReglamentoSubTab('estructura')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  reglamentoSubTab === 'estructura'
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Estructura por Capítulos (I al V)</span>
              </button>
              <button
                onClick={() => setReglamentoSubTab('resolutivos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  reglamentoSubTab === 'resolutivos'
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Artículos Resolutivos y Derogatorias (1 al 4)</span>
              </button>
              <button
                onClick={() => setReglamentoSubTab('sintesis')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  reglamentoSubTab === 'sintesis'
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Síntesis de Derechos, Deberes y Estímulos</span>
              </button>
              <button
                onClick={() => setReglamentoSubTab('json')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  reglamentoSubTab === 'json'
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Estructura de Datos JSON Oficial</span>
              </button>
            </div>
          </div>

          {/* SUB-VIEW 1: Interactive Chapters & Articles Explorer */}
          {reglamentoSubTab === 'estructura' && (
            <div className="space-y-6">
              {/* Search Bar for Articles */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  placeholder="Buscar en el reglamento (ej. 'Artículo 14', 'inasistencia', 'carné', 'faltas', 'plagio', 'etapa productiva')..."
                  className="w-full neu-inset rounded-2xl py-3 pl-11 pr-4 text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 outline-none"
                />
                {articleSearch && (
                  <button
                    onClick={() => setArticleSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-white"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* If search query active, display search results */}
              {filteredArticles ? (
                <div className="neu-flat rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-white/5">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Resultados de búsqueda: {filteredArticles.length} artículo(s) encontrado(s)
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">Término: "{articleSearch}"</span>
                  </div>

                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-8 text-xs text-stone-500 dark:text-stone-400">
                      No se encontraron artículos que coincidan con tu búsqueda. Intenta con palabras clave como "derechos", "deberes", "asistencia", "sanciones" o números de artículo.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                      {filteredArticles.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedArticleDetail(item.articleName)}
                          className={`p-3.5 rounded-2xl text-left cursor-pointer transition-all border ${
                            selectedArticleDetail === item.articleName
                              ? 'neu-convex border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                              : 'neu-flat border-transparent hover:border-emerald-500/20'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                              {item.articleName}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-200/60 dark:bg-white/5 text-stone-600 dark:text-stone-400">
                              {item.chapter}
                            </span>
                          </div>
                          {item.detail && (
                            <>
                              <div className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-1">
                                {item.detail.titulo}
                              </div>
                              <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                                {item.detail.detalle}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Chapter tabs view */
                <div className="space-y-6">
                  {/* Chapter Selector Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {ACUERDO_009_2024.estructura_reglamento.map((cap, idx) => {
                      const isActive = selectedChapterIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedChapterIdx(idx)}
                          className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between h-full border ${
                            isActive
                              ? 'neu-convex border-emerald-500/50 scale-[1.02] bg-emerald-500/5'
                              : 'neu-flat border-transparent hover:border-stone-300 dark:hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                              {cap.capitulo}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-200/80 dark:bg-white/10 font-mono text-stone-600 dark:text-stone-300">
                              {cap.articulos.length} arts
                            </span>
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
                            {cap.titulo}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Chapter Content */}
                  <div className="neu-flat rounded-3xl p-6 sm:p-7 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/60 dark:border-white/5">
                      <div>
                        <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                          {selectedChapter.capitulo}
                        </div>
                        <h4 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 font-display">
                          {selectedChapter.titulo}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        {selectedChapter.articulos.length} artículos en este capítulo
                      </span>
                    </div>

                    {selectedChapter.descripcionResumen && (
                      <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-black/20 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed border border-stone-200/40 dark:border-white/5">
                        <strong className="text-stone-900 dark:text-stone-100 block mb-1">Enfoque Pedagógico del Capítulo:</strong>
                        {selectedChapter.descripcionResumen}
                      </div>
                    )}

                    {/* Articles Grid for the selected Chapter */}
                    <div>
                      <h5 className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                        Artículos del {selectedChapter.capitulo} (Haz clic para ver alcance normativo):
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                        {selectedChapter.articulos.map((artName) => {
                          const isSelected = selectedArticleDetail === artName;
                          return (
                            <button
                              key={artName}
                              onClick={() => setSelectedArticleDetail(artName)}
                              className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer font-medium border ${
                                isSelected
                                  ? 'neu-convex border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold scale-[1.03]'
                                  : 'neu-flat border-transparent hover:border-emerald-500/30 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                              }`}
                            >
                              <div className="truncate font-mono">{artName}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed info panel for currently clicked article */}
                    {selectedArticleDetail && activeArticleInfo && (
                      <div className="p-5 rounded-2xl neu-convex bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/30 space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                              {selectedArticleDetail}
                            </span>
                            <span className="text-stone-400">·</span>
                            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                              {activeArticleInfo.titulo}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {activeArticleInfo.categoria}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pt-1">
                          {activeArticleInfo.detalle}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 2: Artículos Resolutivos (Artículos 1 al 4) */}
          {reglamentoSubTab === 'resolutivos' && (
            <div className="neu-flat rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="pb-4 border-b border-stone-200/60 dark:border-white/5">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Parte Resolutiva Oficial
                </span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display mt-0.5">
                  Artículos Resolutivos de Adopción, Transición y Vigencia
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Acto administrativo expedido en Bogotá D.C. por el Consejo Directivo Nacional que adopta formalmente el nuevo estatuto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACUERDO_009_2024.articulos_resolutivos.map((resolutivo, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl neu-convex border border-stone-200/50 dark:border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-100/80 dark:bg-emerald-950">
                        {resolutivo.articulo}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">Resolutivo 0{idx + 1}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {idx === 0 && 'Adopción del Reglamento del Aprendiz SENA'}
                      {idx === 1 && 'Ámbito de Aplicación y Régimen de Transición'}
                      {idx === 2 && 'Vigencia y Derogatorias Expresas'}
                      {idx === 3 && 'Divulgación Web y Publicidad Institucional'}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {resolutivo.descripcion}
                    </p>
                    {idx === 2 && (
                      <div className="mt-2 pt-2 border-t border-stone-200/40 dark:border-white/5 text-[11px] text-amber-700 dark:text-amber-400">
                        <strong>Deroga expresamente:</strong> Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: Síntesis de Derechos, Deberes y Estímulos */}
          {reglamentoSubTab === 'sintesis' && (
            <div className="space-y-6">
              {/* Rights vs Duties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Derechos (Capítulo II, Art. 5, 6, 7) */}
                <div className="neu-flat rounded-3xl p-6 transition-all">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200/60 dark:border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                        Derechos Fundamentales del Aprendiz
                      </h3>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                        Capítulo II (Artículos 5, 6 y 7)
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">01.</span>
                      <span>Recibir inducción integral, carné institucional gratuito y formación profesional de excelencia sin costo alguno (Art. 5).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">02.</span>
                      <span>Disfrutar de ambientes tecnológicos seguros, dotados y con acceso ilimitado a bibliotecas y plataformas Zajuna y Sofia Plus (Art. 5).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">03.</span>
                      <span>Acceder a los programas de Bienestar al Aprendiz, apoyos de sostenimiento, monitorías y servicios de salud integral (Art. 5 y 6).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">04.</span>
                      <span>Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Aprendices ante comités de centro (Art. 7).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">05.</span>
                      <span>Garantía irrenunciable al debido proceso, presunción de inocencia, derecho a la defensa y contradicción de pruebas (Art. 3 y 5).</span>
                    </li>
                  </ul>
                </div>

                {/* Deberes (Capítulo III, Art. 8 y 9) */}
                <div className="neu-flat rounded-3xl p-6 transition-all">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200/60 dark:border-white/5">
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                        Deberes y Prohibiciones Esenciales
                      </h3>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
                        Capítulo III (Artículos 8 y 9)
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 dark:text-amber-400">01.</span>
                      <span>Portar permanentemente en lugar visible el carné oficial dentro de las sedes y eventos formativos (Art. 8).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 dark:text-amber-400">02.</span>
                      <span>Cumplir los horarios de clase y radicar justificación documental de inasistencias en tres (3) días hábiles (Art. 8 y 14).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 dark:text-amber-400">03.</span>
                      <span>Presentar evidencias formativas en Zajuna con estricta integridad ética, respetando los derechos de autor (Art. 8 y 9).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 dark:text-amber-400">04.</span>
                      <span>Prohibición taxativa de portar armas, comercializar sustancias ilegales o cometer agresiones de cualquier tipo (Art. 9).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 dark:text-amber-400">05.</span>
                      <span>Cuidar la infraestructura, inventarios, herramientas de talleres y convivencia armónica en la comunidad SENA (Art. 8).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Estímulos e Incentivos (Capítulo II, Art. 6) */}
              <div className="p-6 rounded-3xl neu-convex text-stone-900 dark:text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h4 className="text-base font-bold font-display">
                        Reconocimientos Formativos y Estímulos (Artículo 6)
                      </h4>
                      <span className="text-[10px] text-stone-500 font-mono">
                        Mérito académico, investigativo y comunitario
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] neu-btn text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-mono font-bold">
                    Acuerdo 009 de 2024
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="neu-flat p-4 rounded-2xl space-y-1">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">1. Monitorías Institucionales</div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
                      Remuneración económica y ejercicio pedagógico como monitor de apoyo en ambientes de aprendizaje y laboratorios.
                    </p>
                  </div>
                  <div className="neu-flat p-4 rounded-2xl space-y-1">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">2. Representación & Movilidad</div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
                      Prioridad para representar al SENA en WorldSkills, semilleros SENNOVA y convocatorias de pasantías nacionales o en el exterior.
                    </p>
                  </div>
                  <div className="neu-flat p-4 rounded-2xl space-y-1">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">3. Distinción & Cuadro de Honor</div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
                      Mención de honor solemne en la ceremonia de graduación y prelación para vinculaciones formativas estratégicas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medidas Formativas Restaurativas (Capítulo V, Arts. 39 a 53) */}
              <div className="neu-flat rounded-3xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                    Régimen de Medidas Formativas Restaurativas y Sancionatorias (Capítulo V)
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  El nuevo acuerdo ratifica el modelo de justicia pedagógica restaurativa: antes de sanciones drásticas, se privilegian las oportunidades de superación mediante planes formativos:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="neu-convex p-3.5 rounded-2xl">
                    <span className="font-bold text-stone-800 dark:text-stone-200 block mb-1">1. Llamado de Atención</span>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                      Verbal o escrito con compromiso del aprendiz ante faltas leves iniciales (Art. 42).
                    </p>
                  </div>

                  <div className="neu-convex p-3.5 rounded-2xl">
                    <span className="font-bold text-amber-800 dark:text-amber-400 block mb-1">2. Plan de Mejoramiento</span>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                      Actividades pedagógicas concertadas para alcanzar los logros formativos pendientes (Art. 43).
                    </p>
                  </div>

                  <div className="neu-convex p-3.5 rounded-2xl">
                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">3. Condicionamiento</span>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                      Pérdida temporal de incentivos y seguimiento estricto ante faltas graves (Art. 44).
                    </p>
                  </div>

                  <div className="neu-convex p-3.5 rounded-2xl">
                    <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">4. Cancelación de Matrícula</span>
                    <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                      Sanción máxima aplicada por Subdirección tras el debido proceso en Comité ante faltas gravísimas (Art. 44 y 51).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 4: JSON Data Viewer */}
          {reglamentoSubTab === 'json' && (
            <div className="neu-flat rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-white/5">
                <div>
                  <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                    Objeto JSON Normativo (Acuerdo 009 de 2024)
                  </h4>
                  <p className="text-xs text-stone-500 font-mono">
                    Estructura procesada según el estándar oficial del Consejo Directivo Nacional
                  </p>
                </div>
                <button
                  onClick={copyJsonToClipboard}
                  className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-emerald-800 dark:text-emerald-300"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? '¡Copiado!' : 'Copiar JSON'}</span>
                </button>
              </div>

              <div className="neu-inset p-4 rounded-2xl overflow-x-auto max-h-[500px]">
                <pre className="font-mono text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed whitespace-pre">
                  {JSON.stringify(ACUERDO_009_2024, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Decision Tree Roleplaying tab */}
      {mainTab === 'arbol' && <DecisionTreeSimulator />}

      {/* Case studies tribunal tab */}
      {mainTab === 'simulador' && (
        <div className="neu-convex rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/60 dark:border-white/5">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
                Caso {selectedCaseIdx + 1} de {CASE_STUDIES.length}
              </span>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display mt-0.5">
                {currentCase.title}
              </h3>
            </div>

            {/* Stepper buttons */}
            <div className="flex gap-2">
              {CASE_STUDIES.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseIdx(i)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCaseIdx === i
                      ? 'neu-btn-green text-white scale-105'
                      : caseAnswers[c.id] !== undefined
                      ? 'neu-convex text-emerald-700 dark:text-emerald-300'
                      : 'neu-btn text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Text */}
          <div className="p-5 rounded-2xl neu-inset text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1 text-xs uppercase tracking-wider font-mono">
              Situación Planteada:
            </span>
            {currentCase.scenario}
          </div>

          <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
            {currentCase.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentCase.options.map((opt, optIdx) => {
              const isSelected = caseAnswers[currentCase.id] === optIdx;

              return (
                <div key={optIdx} className="space-y-2">
                  <button
                    onClick={() => handleSelectCaseOption(currentCase.id, optIdx)}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? opt.isCorrect
                          ? 'neu-convex border border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-semibold'
                          : 'neu-convex border border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200 font-semibold'
                        : 'neu-flat hover:neu-convex text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-stone-400 text-xs mt-0.5 font-bold">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  </button>

                  {/* Feedback on selection */}
                  {isSelected && (
                    <div
                      className={`p-3.5 rounded-xl text-xs neu-flat ${
                        opt.isCorrect
                          ? 'text-emerald-900 dark:text-emerald-200 border-l-4 border-emerald-500'
                          : 'text-rose-900 dark:text-rose-200 border-l-4 border-rose-500'
                      }`}
                    >
                      <p className="font-semibold">{opt.feedback}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 font-mono">
                        Base normativa: {opt.regulationArticle}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation between cases */}
          <div className="pt-4 border-t border-stone-200/60 dark:border-white/5 flex items-center justify-between">
            <button
              disabled={selectedCaseIdx === 0}
              onClick={() => setSelectedCaseIdx((prev) => prev - 1)}
              className="neu-btn px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 disabled:opacity-30 cursor-pointer"
            >
              ← Caso Anterior
            </button>

            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              Completados: {Object.keys(caseAnswers).length} / {CASE_STUDIES.length}
            </span>

            <button
              disabled={selectedCaseIdx === CASE_STUDIES.length - 1}
              onClick={() => setSelectedCaseIdx((prev) => prev + 1)}
              className="neu-btn px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 disabled:opacity-30 cursor-pointer"
            >
              Siguiente Caso →
            </button>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="p-4.5 neu-convex rounded-2xl flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200 border border-emerald-500/40">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>¡Validado con éxito! Has completado el Módulo 03: Reglamento del Aprendiz SENA (Acuerdo 009 de 2024).</span>
        </div>
      )}
    </div>
  );
};
