import React, { useState } from 'react';
import { ApprenticeProfile } from '../types';
import { SenaLogosymbol, SenaEscudo } from './SenaEmblem';
import { QrCode, RefreshCw, Edit3, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface ApprenticeCardProps {
  profile: ApprenticeProfile;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  isInductionCompleted: boolean;
}

export const ApprenticeCardModal: React.FC<ApprenticeCardProps> = ({
  profile,
  isOpen,
  onClose,
  onEdit,
  isInductionCompleted,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md neu-convex rounded-3xl p-6 sm:p-7 transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-white/5 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-stone-900 dark:text-stone-100 font-display">
              Carné Virtual del Aprendiz
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">· SENA Colombia</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Flip Container with Soft Relief */}
        <div className="relative w-full aspect-[1.58/1] perspective-1000 mb-5">
          <div
            className={`w-full h-full duration-500 transition-all rounded-2xl shadow-xl border border-white/60 dark:border-white/10 text-stone-900 overflow-hidden relative ${
              isFlipped ? 'bg-gradient-to-br from-stone-50 to-stone-200' : 'bg-white'
            }`}
          >
            {!isFlipped ? (
              /* Front of Card */
              <div className="h-full flex flex-col justify-between p-4 bg-white relative">
                {/* Decorative top green stripe */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-emerald-600" />

                {/* Header */}
                <div className="flex items-start justify-between mt-1 pt-1">
                  <div className="flex items-center gap-2">
                    <SenaLogosymbol className="w-7 h-7" variant="color" />
                    <div>
                      <h4 className="text-[13px] font-extrabold tracking-tight text-emerald-800 leading-tight">
                        SENA
                      </h4>
                      <p className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                        Servicio Nacional de Aprendizaje
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      Aprendiz
                    </span>
                  </div>
                </div>

                {/* Middle details with photo */}
                <div className="flex gap-3 items-center my-1">
                  {/* Photo container */}
                  <div className="w-16 h-20 rounded-xl bg-stone-100 border border-emerald-300 flex flex-col items-center justify-center p-1 relative overflow-hidden shrink-0 shadow-xs">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                      {profile.fullName.charAt(0)}
                    </div>
                    <span className="text-[8px] font-mono mt-1 text-stone-500 text-center uppercase truncate w-full">
                      {profile.documentType} {profile.documentNumber.slice(-4)}
                    </span>
                    {isInductionCompleted && (
                      <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Info fields */}
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-sm font-bold text-stone-900 truncate leading-snug">
                      {profile.fullName}
                    </h3>
                    <p className="text-[11px] font-mono text-stone-600">
                      {profile.documentType}: {profile.documentNumber}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-800 truncate mt-0.5">
                      {profile.program}
                    </p>
                    <div className="text-[9px] text-stone-500 mt-0.5 flex flex-wrap gap-x-2">
                      <span>Ficha: <strong className="font-mono text-stone-800">{profile.cohortFicha}</strong></span>
                      <span>·</span>
                      <span className="truncate">{profile.center}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom barcode & verification */}
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[9px] text-stone-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{isInductionCompleted ? 'Inducción Aprobada' : 'En proceso de inducción'}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-stone-400">
                    <QrCode className="w-4 h-4 text-stone-700" />
                    <span>SENA-{profile.cohortFicha}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Back of Card */
              <div className="h-full flex flex-col justify-between p-4 bg-stone-50 relative">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <SenaEscudo className="w-5 h-6" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase">
                      Información Institucional
                    </span>
                  </div>
                  <span className="text-[9px] text-stone-500 font-mono">
                    {profile.regional}
                  </span>
                </div>

                <div className="text-[9px] text-stone-600 space-y-1.5 my-2">
                  <p>
                    <strong>1. Porte Obligatorio:</strong> El aprendiz debe portar visiblemente este documento durante su permanencia en ambientes formativos SENA (Acuerdo 0009 de 2024).
                  </p>
                  <p>
                    <strong>2. Póliza Estudiantil:</strong> Documento requerido para la cobertura de la póliza de accidentes en actividades académicas oficiales.
                  </p>
                  <p>
                    <strong>3. Línea Gratuita Nacional:</strong> 01 8000 910270 | www.sena.edu.co
                  </p>
                </div>

                {/* Barcode simulation */}
                <div className="pt-2 border-t border-stone-200 flex flex-col items-center">
                  <div className="h-5 w-44 bg-repeating-linear-gradient flex items-center justify-center">
                    <div className="w-full flex justify-between h-4 px-2">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full ${i % 3 === 0 ? 'w-1 bg-stone-900' : i % 2 === 0 ? 'w-0.5 bg-stone-700' : 'w-1 bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-stone-500 mt-0.5">
                    *SENA-{profile.documentNumber}-{profile.cohortFicha}*
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls with Neumorphic buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200/60 dark:border-white/5">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold neu-btn px-3.5 py-2 rounded-xl text-stone-700 dark:text-stone-300 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Girar Carné ({isFlipped ? 'Ver Frente' : 'Ver Reverso'})</span>
          </button>

          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-xs font-bold neu-btn-green px-4 py-2 rounded-xl text-white cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Datos</span>
          </button>
        </div>
      </div>
    </div>
  );
};
