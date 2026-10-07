import React, { useState } from 'react';
import { Heart, Trophy, Palette, Users, Sparkles, DollarSign, Shield, HandHeart, Award } from 'lucide-react';

interface ModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleWellness: React.FC<ModuleProps> = ({ onComplete, isCompleted }) => {
  const [pledged, setPledged] = useState(isCompleted);
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const wellnessDimensions = [
    {
      title: 'Salud Integral & Primeros Auxilios',
      icon: Heart,
      desc: 'Jornadas de vacunación, promoción de hábitos saludables, salud mental y atención básica de urgencias en enfermería del Centro.'
    },
    {
      title: 'Deporte & Actividad Física',
      icon: Trophy,
      desc: 'Torneos intercentros, Juegos Nacionales de Aprendices, acondicionamiento físico y escuelas deportivas formativas.'
    },
    {
      title: 'Arte, Cultura & Patrimonio',
      icon: Palette,
      desc: 'Talleres de danzas tradicionales, música, teatro, literatura y festivales culturales nacionales del SENA.'
    },
    {
      title: 'Liderazgo & Vocería',
      icon: Users,
      desc: 'Encuentros de voceros de ficha, escuelas de liderazgo juvenil y representación democrática en los consejos directivos.'
    },
    {
      title: 'Habilidades Socioemocionales',
      icon: Sparkles,
      desc: 'Fortalecimiento de la resiliencia, empatía, comunicación asertiva y resolución pacífica de conflictos.'
    },
    {
      title: 'Apoyos Socioeconómicos',
      icon: DollarSign,
      desc: 'Auxilios económicos para transporte, subsidio de alimentación, Fondo FIC (construcción) y apoyo de sostenimiento regular.'
    },
    {
      title: 'Consejería & Acompañamiento Psicosocial',
      icon: HandHeart,
      desc: 'Atención confidencial personalizada por psicólogos para orientar problemáticas familiares, académicas o emocionales.'
    },
    {
      title: 'Equidad, Inclusión & Diversidad',
      icon: Shield,
      desc: 'Ambientes seguros libres de discriminación por género, etnia, discapacidad o credo; enfoque diferencial garantizado.'
    }
  ];

  const decalogo = [
    '01. Respetar la dignidad de todas las personas sin distinción alguna.',
    '02. Portar el carné institucional y los uniformes reglamentarios con orgullo y pulcritud.',
    '03. Cuidar con esmero las instalaciones, herramientas, maquinarias y recursos naturales del SENA.',
    '04. Actuar con absoluta honestidad académica, rechazando el plagio y la trampa.',
    '05. Cumplir con puntualidad los horarios de formación y compromisos adquiridos.',
    '06. Promover el diálogo asertivo y la resolución pacífica de cualquier desacuerdo.',
    '07. Participar activamente en las jornadas de formación integral, cultura y deporte.',
    '08. Mantener una actitud proactiva de liderazgo, innovación y espíritu emprendedor.',
    '09. Proteger la confidencialidad y buen uso de las plataformas digitales institucionales.',
    '10. Ser embajador ejemplar de los valores del SENA dentro y fuera de los ambientes de formación.'
  ];

  const handlePledge = () => {
    setPledged(true);
    onComplete();
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">Módulo 05</span>
          <span aria-hidden="true">·</span>
          <span>Desarrollo Humano & Ética</span>
          <span aria-hidden="true">·</span>
          <span>15 min estimados</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-display">
          Bienestar al Aprendiz & Decálogo Institucional
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
          El SENA no solo capacita tu mente y tus manos; cuida tu bienestar integral, apoya tu permanencia y te convoca a vivir con los valores éticos del Decálogo del Aprendiz.
        </p>
      </div>

      {/* Wellness Strategic Dimensions */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Acompañamiento Integral
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            Los Ejes Estratégicos de Bienestar al Aprendiz
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Cada Centro de Formación cuenta con un equipo multidisciplinario de Bienestar dedicado a respaldar tu permanencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessDimensions.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeDimension === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveDimension(idx)}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  isSelected
                    ? 'neu-convex ring-2 ring-emerald-500/80 scale-[1.02]'
                    : 'neu-btn text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center mb-3">
                  <Icon className="w-4.5 h-4.5 text-emerald-700 dark:text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-1 font-display">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Apoyos Socioeconómicos Feature Highlight */}
      <section className="neu-convex rounded-3xl p-6 sm:p-8 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/60 dark:border-white/5">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
              Oportunidades de Permanencia
            </span>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
              Apoyos de Sostenimiento y Monitorías
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full neu-inset">
            Convocatorias Periódicas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="neu-inset p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2 font-display">
              1. Apoyo Regular SENA
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Auxilio mensual para aprendices de estratos 1 y 2 o SISBÉN que no cuenten con contrato de aprendizaje, para cubrir gastos de alimentación y transporte.
            </p>
          </div>

          <div className="neu-inset p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2 font-display">
              2. Fondo FIC (Construcción)
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Fondo de la Industria de la Construcción dirigido exclusivamente a aprendices matriculados en programas del sector edificación y obras civiles.
            </p>
          </div>

          <div className="neu-inset p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2 font-display">
              3. Monitorías Remuneradas
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Reconocimiento económico a los mejores promedios que apoyan labores técnicas, laboratorios o proyectos tecnológicos en su Centro.
            </p>
          </div>
        </div>
      </section>

      {/* Decálogo del Aprendiz SENA & Virtual Pledge */}
      <section className="neu-flat rounded-3xl p-6 sm:p-8 transition-all">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full neu-inset">
            Código de Honor y Convivencia
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 font-display mt-2">
            El Decálogo del Aprendiz SENA
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Los diez mandamientos de conducta ética que distinguen a un colombiano formado en el SENA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
          {decalogo.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 neu-inset rounded-2xl text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-1.5" />
              <span className="leading-relaxed font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Commitment Pledge Box */}
        <div className="p-7 neu-convex rounded-3xl text-center max-w-xl mx-auto space-y-4 shadow-md">
          <div className="w-14 h-14 rounded-2xl neu-inset mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award className="w-7 h-7" />
          </div>
          <h4 className="text-base font-black text-stone-900 dark:text-stone-100 font-display">
            Pacto de Honor del Aprendiz SENA
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
            "Yo asumo con orgullo el compromiso de formarme con integridad, honrar el nombre de la institución y poner mi talento al servicio de Colombia."
          </p>

          <button
            onClick={handlePledge}
            disabled={pledged}
            className={`px-6 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              pledged
                ? 'neu-inset text-emerald-700 dark:text-emerald-300 cursor-default'
                : 'neu-btn-green'
            }`}
          >
            {pledged ? '✓ Compromiso Ético Firmado' : 'Firmar Compromiso y Completar Módulo'}
          </button>
        </div>
      </section>
    </div>
  );
};
