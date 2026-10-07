import React, { useState } from 'react';
import { ApprenticeProfile } from '../../types';
import { POPULAR_PROGRAMS, REGIONALS_LIST } from '../../data/senaData';
import { getApprenticeAttempts } from '../../services/inductionStore';
import {
  User,
  CreditCard,
  GraduationCap,
  Hash,
  Sun,
  Building2,
  Mail,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';

interface EvaluationRegistrationProps {
  currentProfile: ApprenticeProfile;
  onStartEvaluation: (profile: ApprenticeProfile) => void;
  onCancel?: () => void;
}

const DOCUMENT_TYPES = [
  { value: 'C.C.', label: 'Cédula de Ciudadanía (C.C.)' },
  { value: 'T.I.', label: 'Tarjeta de Identidad (T.I.)' },
  { value: 'C.E.', label: 'Cédula de Extranjería (C.E.)' },
  { value: 'P.P.T.', label: 'Permiso por Protección Temporal (P.P.T.)' }
];

const JORNADAS = [
  { value: 'Mañana', label: 'Diurna / Mañana (06:00 - 12:00)' },
  { value: 'Tarde', label: 'Tarde (12:00 - 18:00)' },
  { value: 'Noche', label: 'Nocturna (18:00 - 22:00)' },
  { value: 'Mixta', label: 'Mixta / Fines de Semana' },
  { value: 'Virtual', label: 'Virtual / 100% en Línea' }
];

export const EvaluationRegistration: React.FC<EvaluationRegistrationProps> = ({
  currentProfile,
  onStartEvaluation,
  onCancel
}) => {
  const [fullName, setFullName] = useState(currentProfile.fullName || '');
  const [documentType, setDocumentType] = useState(currentProfile.documentType || 'C.C.');
  const [documentNumber, setDocumentNumber] = useState(currentProfile.documentNumber || '');
  const [program, setProgram] = useState(currentProfile.program || POPULAR_PROGRAMS[0]);
  const [cohortFicha, setCohortFicha] = useState(currentProfile.cohortFicha || '2874912');
  const [jornada, setJornada] = useState(currentProfile.jornada || 'Mañana');
  const [center, setCenter] = useState(currentProfile.center || 'Centro de Formación de Talento Humano en Salud');
  const [regional, setRegional] = useState(currentProfile.regional || 'Regional Distrito Capital');
  const [email, setEmail] = useState(currentProfile.email || '');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Previous attempts check
  const previousAttempts = documentNumber ? getApprenticeAttempts(documentNumber) : [];

  const handleValidate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 4) {
      newErrors.fullName = 'Ingrese el nombre completo del aprendiz (mínimo 4 caracteres).';
    }
    if (!documentNumber.trim() || documentNumber.trim().length < 5) {
      newErrors.documentNumber = 'Ingrese un número de documento válido.';
    }
    if (!program.trim()) {
      newErrors.program = 'Seleccione o ingrese su programa de formación.';
    }
    if (!cohortFicha.trim() || cohortFicha.trim().length < 4) {
      newErrors.cohortFicha = 'Ingrese el número de ficha (mínimo 4 dígitos).';
    }
    if (!center.trim()) {
      newErrors.center = 'Indique su Centro de Formación SENA.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    const updatedProfile: ApprenticeProfile = {
      ...currentProfile,
      fullName: fullName.trim(),
      documentType,
      documentNumber: documentNumber.trim(),
      program: program.trim(),
      cohortFicha: cohortFicha.trim(),
      jornada,
      center: center.trim(),
      regional,
      email: email.trim() || undefined
    };

    onStartEvaluation(updatedProfile);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header Banner - Kahoot & Duolingo Inspiration */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#39A900] via-[#047857] to-[#064e3b] p-6 sm:p-8 text-white shadow-xl mb-8">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-[#f59e0b]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-emerald-100">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Módulo de Evaluación Gamificada SENA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Registro del Aprendiz & Reto Normativo
            </h1>
            <p className="text-sm text-emerald-50/90 leading-relaxed">
              Completa tus datos oficiales antes de iniciar. Cada intento queda registrado en la base de datos institucional y se sincroniza con la hoja de cálculo del instructor en tiempo real.
            </p>
          </div>

          {/* Gamification perks pill */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-left space-y-2 text-xs">
            <div className="font-extrabold text-amber-300 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Reglas de Puntuación</span>
            </div>
            <ul className="space-y-1 text-emerald-100/90 font-medium text-[11px]">
              <li>✨ +100 pts por acierto</li>
              <li>⚡ +50 pts rapidez (&lt; 10s)</li>
              <li>🔥 +100 pts por rachas x5</li>
              <li>🏆 +250 pts bonus perfección</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="bg-white dark:bg-[#111713] rounded-3xl border border-stone-200 dark:border-[#232f27] p-6 sm:p-8 shadow-md">
        {/* Previous Attempts Alert if any */}
        {previousAttempts.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">
                Historial de intentos detectado ({previousAttempts.length} intento{previousAttempts.length > 1 ? 's' : ''}):
              </span>
              <p className="text-emerald-700 dark:text-emerald-300 mt-0.5">
                Mejor puntaje registrado:{' '}
                <strong>
                  {Math.max(...previousAttempts.map((a) => a.gamifiedPoints || 0))} pts (
                  {Math.max(...previousAttempts.map((a) => a.score))}%)
                </strong>
                . Este nuevo intento se asociará a tu historial para el ranking.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nombre Completo */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Nombre Completo del Aprendiz <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan David Restrepo Salazar"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                  errors.fullName
                    ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>}
            </div>

            {/* Tipo de Documento */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Tipo de Documento <span className="text-red-500">*</span></span>
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                {DOCUMENT_TYPES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Número de Documento */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Número de Documento <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="Ej. 1020304050"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                  errors.documentNumber
                    ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100'
                }`}
              />
              {errors.documentNumber && (
                <p className="text-[11px] text-red-500 font-medium">{errors.documentNumber}</p>
              )}
            </div>

            {/* Programa de Formación */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Programa de Formación <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                list="programs-list"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                placeholder="Ej. Tecnólogo en Análisis y Desarrollo de Software (ADSO)"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                  errors.program
                    ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100'
                }`}
              />
              <datalist id="programs-list">
                {POPULAR_PROGRAMS.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
              {errors.program && <p className="text-[11px] text-red-500 font-medium">{errors.program}</p>}
            </div>

            {/* Número de Ficha */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Número de Ficha de Caracterización <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={cohortFicha}
                onChange={(e) => setCohortFicha(e.target.value)}
                placeholder="Ej. 2874912"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                  errors.cohortFicha
                    ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100'
                }`}
              />
              {errors.cohortFicha && (
                <p className="text-[11px] text-red-500 font-medium">{errors.cohortFicha}</p>
              )}
            </div>

            {/* Jornada */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Jornada de Formación <span className="text-red-500">*</span></span>
              </label>
              <select
                value={jornada}
                onChange={(e) => setJornada(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                {JORNADAS.map((j) => (
                  <option key={j.value} value={j.value}>
                    {j.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Centro de Formación */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Centro de Formación <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                placeholder="Ej. Centro de Gestión de Mercados, Logística y TIC"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                  errors.center
                    ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-stone-900 dark:text-stone-100'
                }`}
              />
              {errors.center && <p className="text-[11px] text-red-500 font-medium">{errors.center}</p>}
            </div>

            {/* Correo Electrónico (Opcional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Correo Electrónico <span className="text-stone-400 font-normal">(Opcional)</span></span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej. aprendiz@soy.sena.edu.co"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-[#2a382f] bg-stone-50 dark:bg-[#18211b] text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          {/* Action button bar */}
          <div className="pt-4 border-t border-stone-100 dark:border-[#1e2821] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#39A900]" />
              <span>Cronómetro en tiempo real sin cuenta regresiva. ¡La velocidad otorga bonificaciones!</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-[#2a382f] text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#1e2821] transition-all cursor-pointer"
                >
                  Volver al Tablero
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-black shadow-lg shadow-[#39A900]/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>Comenzar Evaluación Gamificada</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
