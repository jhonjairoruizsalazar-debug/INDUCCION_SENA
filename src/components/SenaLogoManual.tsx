import React, { useState } from 'react';
import { SenaLogosymbol } from './SenaEmblem';
import { Check, X, Shield } from 'lucide-react';

export const SenaLogoManual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'colores' | 'reserva' | 'usos'>('colores');

  return (
    <div className="neu-flat rounded-3xl p-6 sm:p-8 space-y-6 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60 dark:border-white/5">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Manual de Identidad Visual SENA
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            Lineamientos del Logotipo & Arquitectura de Marca
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            Normativa oficial para el uso correcto del logotipo en interfaces, certificados, carné y piezas institucionales.
          </p>
        </div>

        {/* Tab switch with Inset Pill Track */}
        <div className="flex gap-1 p-1 rounded-2xl neu-inset text-xs">
          <button
            onClick={() => setActiveTab('colores')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'colores'
                ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Paleta Oficial
          </button>
          <button
            onClick={() => setActiveTab('reserva')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'reserva'
                ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Área de Reserva (X)
          </button>
          <button
            onClick={() => setActiveTab('usos')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'usos'
                ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Correcto vs. Incorrecto
          </button>
        </div>
      </div>

      {activeTab === 'colores' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Verde SENA */}
          <div className="p-5 rounded-2xl neu-convex space-y-3">
            <div className="w-full h-16 rounded-xl bg-[#39A900] shadow-md flex items-center justify-center text-white font-bold text-xs tracking-wider">
              PANTONE 361 C
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
                Verde Institucional SENA
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                Color primario oficial que simboliza la esperanza, el crecimiento y la vocación formativa de Colombia.
              </p>
            </div>
            <div className="text-[10px] font-mono text-stone-700 dark:text-stone-300 neu-inset p-3 rounded-xl space-y-1">
              <div>HEX: <strong>#39A900</strong></div>
              <div>RGB: <strong>57, 169, 0</strong></div>
              <div>CMYK: <strong>C:77 M:0 Y:100 K:0</strong></div>
            </div>
          </div>

          {/* Blanco Puro */}
          <div className="p-5 rounded-2xl neu-convex space-y-3">
            <div className="w-full h-16 rounded-xl bg-white border border-stone-200/80 shadow-md flex items-center justify-center text-stone-800 font-bold text-xs tracking-wider">
              BLANCO PURO
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
                Blanco Institucional
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                Color de fondo de la bandera, representando la transparencia, la paz y la libertad de pensamiento.
              </p>
            </div>
            <div className="text-[10px] font-mono text-stone-700 dark:text-stone-300 neu-inset p-3 rounded-xl space-y-1">
              <div>HEX: <strong>#FFFFFF</strong></div>
              <div>RGB: <strong>255, 255, 255</strong></div>
              <div>CMYK: <strong>C:0 M:0 Y:0 K:0</strong></div>
            </div>
          </div>

          {/* Negro Carbón & Contraste */}
          <div className="p-5 rounded-2xl neu-convex space-y-3">
            <div className="w-full h-16 rounded-xl bg-[#0F172A] shadow-md flex items-center justify-center text-white font-bold text-xs tracking-wider">
              CARBÓN NEUTRO
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
                Tipografía & Alto Contraste
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                Utilizado para textos jerárquicos y aplicaciones monocromáticas oficiales de soporte.
              </p>
            </div>
            <div className="text-[10px] font-mono text-stone-700 dark:text-stone-300 neu-inset p-3 rounded-xl space-y-1">
              <div>HEX: <strong>#1C1917</strong></div>
              <div>RGB: <strong>28, 25, 23</strong></div>
              <div>WCAG AA: <strong>Aprobado 14.2:1</strong></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reserva' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* Visual Diagram of Area of Protection */}
          <div className="p-6 neu-convex rounded-2xl text-center">
            <div className="relative inline-block p-8 border-2 border-dashed border-emerald-500 rounded-2xl neu-inset">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                ↑ X (Área de Protección) ↑
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                ↓ X (Área de Protección) ↓
              </div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold rotate-90">
                X
              </div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold -rotate-90">
                X
              </div>

              <div className="flex items-center gap-3 py-2">
                <SenaLogosymbol className="w-16 h-16 filter drop-shadow-sm" variant="color" />
                <div className="text-left">
                  <span className="text-2xl font-black tracking-tight text-emerald-800 dark:text-emerald-400 font-display block">
                    SENA
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-3 font-mono">
              X = Diámetro de la cabeza del logosímbolo
            </p>
          </div>

          {/* Explanation */}
          <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
              Regla de Área de Reserva y Escala Mínima
            </h4>
            <p className="leading-relaxed">
              El área de protección garantiza que el logotipo no sea invadido por otros elementos gráficos, textos, fotografías o bordes. Ningún elemento debe situarse dentro del perímetro <strong>X</strong>.
            </p>
            <ul className="space-y-2 pt-1">
              <li className="flex items-start gap-2 neu-inset p-3 rounded-xl">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Tamaño mínimo digital:</strong> 40 px de ancho para asegurar la nitidez de la figura humana y la barra horizontal.</span>
              </li>
              <li className="flex items-start gap-2 neu-inset p-3 rounded-xl">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Tamaño mínimo impreso:</strong> 15 mm de base en documentos oficiales y papelería.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'usos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Usos Permitidos */}
          <div className="p-5 rounded-2xl neu-convex space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Usos Correctos Oficiales</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2 neu-inset p-3 rounded-xl">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Logotipo Verde SENA (#39A900) sobre fondo blanco o fondos claros neutros.</span>
              </li>
              <li className="flex items-center gap-2 neu-inset p-3 rounded-xl">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Logotipo en blanco puro sobre fondo Verde SENA oficial o modo oscuro.</span>
              </li>
              <li className="flex items-center gap-2 neu-inset p-3 rounded-xl">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Uso obligatorio en la cabecera superior izquierda de las plataformas oficiales.</span>
              </li>
            </ul>
          </div>

          {/* Usos Prohibidos */}
          <div className="p-5 rounded-2xl neu-convex space-y-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <X className="w-4 h-4 text-rose-600" />
              <span>Usos Prohibidos Inadmisibles</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2 neu-inset p-3 rounded-xl">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Deformar, comprimir o estirar las proporciones del imagotipo.</span>
              </li>
              <li className="flex items-center gap-2 neu-inset p-3 rounded-xl">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Cambiar el color verde por azul, rojo, amarillo u otro tono no corporativo.</span>
              </li>
              <li className="flex items-center gap-2 neu-inset p-3 rounded-xl">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Agregar sombras agresivas, degradados extraños o siluetas recortadas.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
