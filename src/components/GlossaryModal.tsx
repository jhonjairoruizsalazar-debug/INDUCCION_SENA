import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/senaData';
import { Search, X, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', 'Institucional', 'Pedagogía', 'Plataformas', 'Convivencia', 'Bienestar'];

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl neu-convex rounded-3xl p-6 sm:p-8 max-h-[85vh] flex flex-col transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 dark:border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl neu-flat flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                Glosario Institucional del Aprendiz SENA
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Terminología técnica oficial de la Formación Profesional Integral
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Soft Inset Search Bar (inspired by reference image) */}
        <div className="my-4 relative shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar concepto (ej. RAP, Sofia Plus, Etapa Productiva, FPI)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs neu-inset rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
          />
        </div>

        {/* Categories Tab Selector with Inset Pills */}
        <div className="flex gap-1.5 pb-3 overflow-x-auto shrink-0 scrollbar-none text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Term List with Soft Surfaces */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400 text-xs neu-inset rounded-2xl p-6">
              No se encontraron términos que coincidan con la búsqueda.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.term}
                className="p-4 neu-flat rounded-2xl transition-all text-left group"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 font-display">
                      {item.term}
                    </h4>
                    {item.acronym && (
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                        ({item.acronym})
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full neu-inset text-stone-600 dark:text-stone-400 uppercase tracking-wider font-bold">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
