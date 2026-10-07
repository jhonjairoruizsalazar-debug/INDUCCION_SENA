import React, { useState } from 'react';
import { SenaEscudo, SenaLogosymbol, SenaBandera } from '../SenaEmblem';
import { SenaLogoManual } from '../SenaLogoManual';
import { HimnoPlayer } from '../HimnoPlayer';
import { CheckCircle, HelpCircle } from 'lucide-react';

interface ModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleIdentity: React.FC<ModuleProps> = ({ onComplete, isCompleted }) => {
  const [activeSector, setActiveSector] = useState<'industrial' | 'agro' | 'servicios'>('industrial');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checkpointPassed, setCheckpointPassed] = useState(isCompleted);

  const handleCheckpointSubmit = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === 1) {
      setCheckpointPassed(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">Módulo 01</span>
          <span aria-hidden="true">·</span>
          <span>Apropiación Institucional</span>
          <span aria-hidden="true">·</span>
          <span>15 min estimados</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-display">
          Identidad, Historia, Símbolos e Himno Institucional
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Comprende el origen de la institución más querida por los colombianos, fundada en 1957 para impulsar la dignidad del trabajador y el progreso técnico del país.
        </p>
      </div>

      {/* Origin & Historical Genesis */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
              Génesis y Propósito
            </span>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display">
              La visión de Rodolfo Martínez Tono (1957)
            </h3>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
              El Servicio Nacional de Aprendizaje SENA nació el <strong>21 de junio de 1957</strong> bajo el <strong>Decreto Ley 118</strong>. Su gestor intelectual, el doctor <strong>Rodolfo Martínez Tono</strong>, concibió una entidad tripartita (Gobierno, Trabajadores y Empleadores) inspirada en los modelos de formación técnica de posguerra de Europa y Brasil (SENAI).
            </p>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
              Desde entonces, el SENA es una entidad pública, autónoma y de gratuidad absoluta en todas sus ofertas, dedicada a sembrar conocimiento productivo y valores en cada rincón del territorio nacional.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4.5 neu-inset rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1 font-display">
                  Misión Institucional
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  Invertir en el desarrollo social y técnico de los trabajadores colombianos, ejecutando la formación profesional integral para su incorporación al aparato productivo.
                </p>
              </div>

              <div className="p-4.5 neu-inset rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400 mb-1 font-display">
                  Visión Institucional
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  Consolidarse como la entidad referente en formación integral para el trabajo y el desarrollo humano, reconocida nacional e internacionalmente por su innovación y pertinencia.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Founder Spotlight */}
          <div className="w-full lg:w-72 neu-convex rounded-2xl p-6 shrink-0 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl neu-inset flex items-center justify-center mb-3">
              <SenaLogosymbol className="w-12 h-12" variant="color" />
            </div>
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
              Dr. Rodolfo Martínez Tono
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
              1927 – 2015 · Fundador
            </p>
            <blockquote className="text-xs italic text-stone-600 dark:text-stone-400 mt-3 pt-3 border-t border-stone-200/60 dark:border-white/5">
              "El SENA es el camino para que la juventud colombiana conquiste su futuro a través del trabajo digno y la técnica."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Interactive Símbolos SENA Explorer */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Heráldica e Identidad Visual
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            Los Símbolos Patrios e Institucionales del SENA
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Haz clic en los diferentes componentes para explorar el significado profundo de nuestros emblemas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Escudo Desglosado */}
          <div className="neu-convex rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-center mb-4">
                <SenaEscudo className="w-24 h-28 filter drop-shadow-sm" />
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 text-center font-display">
                El Escudo del SENA
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 text-center mt-1 mb-4">
                Refleja los tres sectores vitales de la economía nacional colombiana:
              </p>

              {/* Sector selector buttons */}
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setActiveSector('industrial')}
                  className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer ${
                    activeSector === 'industrial'
                      ? 'neu-btn-green font-bold text-white shadow-xs'
                      : 'neu-btn text-stone-700 dark:text-stone-300'
                  }`}
                >
                  ⚙️ Sector Secundario (Industria y Construcción)
                </button>
                <button
                  onClick={() => setActiveSector('agro')}
                  className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer ${
                    activeSector === 'agro'
                      ? 'neu-btn-green font-bold text-white shadow-xs'
                      : 'neu-btn text-stone-700 dark:text-stone-300'
                  }`}
                >
                  🌱 Sector Primario (Agropecuario y Café)
                </button>
                <button
                  onClick={() => setActiveSector('servicios')}
                  className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer ${
                    activeSector === 'servicios'
                      ? 'neu-btn-green font-bold text-white shadow-xs'
                      : 'neu-btn text-stone-700 dark:text-stone-300'
                  }`}
                >
                  ⚓ Sector Terciario (Comercio y Servicios)
                </button>
              </div>
            </div>

            <div className="mt-4 p-3.5 neu-inset rounded-xl text-xs text-stone-700 dark:text-stone-300">
              {activeSector === 'industrial' && (
                <p>
                  <strong>Rueda Dentada:</strong> Simboliza la fuerza industrial, la manufactura, la mecánica, la tecnología y la transformación de materias primas.
                </p>
              )}
              {activeSector === 'agro' && (
                <p>
                  <strong>Caduceo y Rama de Café:</strong> Representa la fertilidad del campo colombiano, la vocación agropecuaria y la riqueza natural del país.
                </p>
              )}
              {activeSector === 'servicios' && (
                <p>
                  <strong>Ancla y Timón:</strong> Representa las actividades marítimas, fluviales, el comercio formal, las finanzas y el sector terciario de servicios.
                </p>
              )}
            </div>
          </div>

          {/* Card 2: La Bandera */}
          <div className="neu-convex rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-center mb-4">
                <SenaBandera className="w-36 h-24 shadow-md" />
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 text-center font-display">
                La Bandera Institucional
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 text-center mt-1 mb-3">
                Blanco puro con el escudo central
              </p>
              <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300 neu-inset p-3.5 rounded-xl">
                <p>
                  <strong>Color Blanco:</strong> Representa la paz, la serenidad, la transparencia ética y la libertad de pensamiento dentro de las aulas.
                </p>
                <p>
                  <strong>Emblema Central:</strong> Refuerza el compromiso de todos los aprendices con el desarrollo equitativo de Colombia.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono text-center pt-3 border-t border-stone-200/60 dark:border-white/5">
              Uso oficial en actos solemnes y ceremonias de grado
            </div>
          </div>

          {/* Card 3: Logosímbolo */}
          <div className="neu-convex rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 neu-inset rounded-2xl flex items-center justify-center p-2 shadow-inner">
                  <SenaLogosymbol className="w-16 h-16" variant="color" />
                </div>
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 text-center font-display">
                El Logosímbolo
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 text-center mt-1 mb-3">
                El aprendiz en marcha hacia adelante
              </p>
              <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300 neu-inset p-3.5 rounded-xl">
                <p>
                  <strong>La Figura Humana:</strong> El ser humano como eje central del aprendizaje y artífice de su propio destino profesional.
                </p>
                <p>
                  <strong>El Sendero y Obstáculo:</strong> La barra horizontal representa las dificultades que el aprendiz supera con disciplina para avanzar hacia el éxito.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono text-center pt-3 border-t border-stone-200/60 dark:border-white/5">
              Color institucional: Verde SENA (#39A900)
            </div>
          </div>
        </div>
      </section>

      {/* Manual de Identidad Visual del Logotipo SENA */}
      <SenaLogoManual />

      {/* Interactive Himno del SENA Player with Web Audio API synthesis & karaoke */}
      <HimnoPlayer />

      {/* Module 1 Checkpoint */}
      <section className="neu-flat rounded-3xl p-6 sm:p-7 transition-all">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
              Reto de Validación del Módulo 01
            </h4>
            <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 mb-3">
              ¿Cuál es la fecha oficial de creación del SENA y quién fue su fundador principal?
            </p>

            <div className="space-y-2">
              {[
                '20 de Julio de 1810 por Simón Bolívar.',
                '21 de Junio de 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118.',
                '1 de Enero de 2000 por el Ministerio de Tecnologías.'
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleCheckpointSubmit(i)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedAnswer === i
                      ? i === 1
                        ? 'neu-btn-green font-bold text-white'
                        : 'neu-btn-coral font-bold text-white'
                      : 'neu-btn text-stone-800 dark:text-stone-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {checkpointPassed && (
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-bold neu-inset p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>¡Excelente! Has validado el Módulo 01: Identidad y Símbolos SENA.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
