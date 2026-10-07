import React, { useState } from 'react';
import { ApprenticeProfile } from '../types';
import { REGIONALS_LIST, POPULAR_PROGRAMS } from '../data/senaData';
import { X, Save, UserCheck, ShieldCheck } from 'lucide-react';

interface ProfileModalProps {
  profile: ApprenticeProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ApprenticeProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg neu-convex rounded-3xl p-6 sm:p-8 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 dark:border-white/5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl neu-flat flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                Ficha del Aprendiz en Inducción
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Personaliza los datos impresos en tu carné y certificado SENA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Nombre Completo del Aprendiz
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 font-medium transition-all"
              placeholder="Ej. Andrés Camilo Pérez Gómez"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Tipo Doc.
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                className="w-full px-3 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 font-medium transition-all"
              >
                <option value="CC">Cédula (CC)</option>
                <option value="TI">Tarjeta Identidad (TI)</option>
                <option value="CE">Cédula Extranjería (CE)</option>
                <option value="PPT">Permiso PPT</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Número de Documento
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 font-mono font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Regional SENA
            </label>
            <select
              value={formData.regional}
              onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
              className="w-full px-3.5 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 font-medium transition-all"
            >
              {REGIONALS_LIST.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Centro de Formación
            </label>
            <input
              type="text"
              required
              value={formData.center}
              onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              className="w-full px-3.5 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 font-medium transition-all"
              placeholder="Ej. Centro de Servicios Financieros"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Programa de Formación
              </label>
              <input
                type="text"
                required
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-3.5 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 truncate font-medium transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Ficha (7 dígitos)
              </label>
              <input
                type="text"
                required
                maxLength={7}
                value={formData.cohortFicha}
                onChange={(e) => setFormData({ ...formData, cohortFicha: e.target.value })}
                className="w-full px-3.5 py-2.5 neu-inset rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-stone-900 dark:text-stone-100 font-mono font-medium transition-all"
              />
            </div>
          </div>

          {/* Quick program templates */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 block mb-1.5">
              Programas Frecuentes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_PROGRAMS.slice(0, 4).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setFormData({ ...formData, program: p })}
                  className="px-2.5 py-1 text-[11px] neu-btn rounded-lg text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer"
                >
                  {p.split(' en ')[1] || p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/60 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Validez SOFIA Plus</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold neu-btn rounded-xl text-stone-600 dark:text-stone-400 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold neu-btn-green rounded-xl cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Datos</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
