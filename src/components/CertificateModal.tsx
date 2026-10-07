import React from 'react';
import { ApprenticeProfile } from '../types';
import { SenaEscudo } from './SenaEmblem';
import { Printer, X, CheckCircle, ShieldCheck, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  profile: ApprenticeProfile;
  isOpen: boolean;
  onClose: () => void;
  progressPercent: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  profile,
  isOpen,
  onClose,
  progressPercent
}) => {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#39A900', '#047857', '#FBBF24', '#0284C7']
    });
  };

  const isEligible = progressPercent >= 80;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl neu-convex rounded-3xl p-6 sm:p-8 my-auto transition-all">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 dark:border-white/5 no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl neu-flat flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">
                Certificado Institucional de Inducción SENA
              </h3>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                · Acreditación Oficial 40 Horas Formativas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEligible && (
              <button
                onClick={() => {
                  triggerConfetti();
                  window.print();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold neu-btn-green rounded-xl cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Warning if incomplete */}
        {!isEligible && (
          <div className="my-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2 no-print">
            <span className="font-bold">Nota de Acreditación:</span> Has completado el {progressPercent}% de la inducción. Te recomendamos alcanzar el 80% o más completando los módulos y el reto final para recibir la condecoración completa.
          </div>
        )}

        {/* The Printable Certificate Container */}
        <div
          id="printable-certificate"
          className="relative bg-[#FCFBF8] border-8 border-double border-emerald-900/30 p-8 sm:p-12 text-stone-800 rounded-lg shadow-xs overflow-hidden mt-4"
        >
          {/* Subtle Guilloche / Watermark Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <SenaEscudo className="w-96 h-96" />
          </div>

          {/* Top Institutional Header */}
          <div className="text-center relative z-10 mb-8">
            <div className="flex justify-center items-center gap-4 mb-3">
              <SenaEscudo className="w-16 h-20" />
              <div className="text-left">
                <p className="text-[11px] font-bold tracking-widest text-emerald-800 uppercase">
                  República de Colombia
                </p>
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-display">
                  SERVICIO NACIONAL DE APRENDIZAJE · SENA
                </h1>
                <p className="text-xs text-stone-600 font-medium">
                  Dirección de Formación Profesional Integral
                </p>
              </div>
            </div>

            <div className="h-0.5 w-32 bg-emerald-700 mx-auto my-3" />

            <h2 className="text-base sm:text-lg font-bold uppercase tracking-widest text-stone-800 mt-2 font-display">
              Constancia Oficial de Inducción Institucional
            </h2>
          </div>

          {/* Body Prose */}
          <div className="text-center relative z-10 max-w-2xl mx-auto space-y-4 text-stone-700">
            <p className="text-xs sm:text-sm text-stone-600">
              El Servicio Nacional de Aprendizaje SENA, creado mediante el Decreto Ley 118 de 1957, hace constar que:
            </p>

            <div className="py-2 border-b border-stone-300">
              <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 uppercase font-display tracking-wide">
                {profile.fullName}
              </p>
              <p className="text-xs font-mono text-stone-500 mt-0.5">
                Identificado(a) con {profile.documentType} No. {profile.documentNumber}
              </p>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-stone-700">
              Ha cursado, comprendido y aprobado satisfactoriamente el proceso de{' '}
              <strong className="text-emerald-950 font-semibold">
                INDUCCIÓN Y APROPIACIÓN INSTITUCIONAL SENA
              </strong>
              , correspondiente al programa de formación profesional:
            </p>

            <div className="bg-stone-100/70 p-3 rounded-lg border border-stone-200">
              <p className="text-sm font-bold text-stone-900">
                {profile.program}
              </p>
              <p className="text-xs font-mono text-stone-600 mt-1">
                Ficha de Caracterización: <strong>{profile.cohortFicha}</strong> · {profile.regional}
              </p>
              <p className="text-[11px] text-stone-500 truncate">
                {profile.center}
              </p>
            </div>

            {/* Modules Covered Summary */}
            <div className="text-left text-[11px] text-stone-600 bg-white/80 p-3 rounded-md border border-stone-200">
              <p className="font-bold text-stone-800 mb-1">
                Competencias Institucionales Apropiadas (Intensidad: 40 Horas):
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-none">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Identidad, Historia (1957) y Símbolos SENA</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Modelo Pedagógico FPI (Saber, Hacer, Ser)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Reglamento del Aprendiz (Acuerdo 0009 de 2024)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ecosistema Digital: Sofia Plus, Zajuna y SBS</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Signatures & Footer Metadata */}
          <div className="relative z-10 mt-10 pt-6 border-t border-stone-300">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="w-40 h-10 border-b border-stone-600 mx-auto flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-stone-600">SENA Institucional</span>
                </div>
                <p className="text-[11px] font-bold text-stone-800 mt-1">
                  Subdirección de Centro
                </p>
                <p className="text-[10px] text-stone-500">
                  {profile.center}
                </p>
              </div>

              <div>
                <div className="w-40 h-10 border-b border-stone-600 mx-auto flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-stone-600">Formación Profesional</span>
                </div>
                <p className="text-[11px] font-bold text-stone-800 mt-1">
                  Coordinación Académica & Inducción
                </p>
                <p className="text-[10px] text-stone-500">
                  Sistema de Gestión de la Calidad SENA
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-500 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Expedido en Colombia el {currentDate}</span>
              </div>
              <div className="font-mono text-[9px] mt-2 sm:mt-0">
                Código de Verificación: SENA-IND-2026-{profile.cohortFicha}-{profile.documentNumber.slice(-4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
