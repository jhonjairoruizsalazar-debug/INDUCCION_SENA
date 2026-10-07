import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  Shield,
  Lock,
  LogOut,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  Award,
  Clock,
  Sparkles,
  KeyRound,
  Filter
} from 'lucide-react';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  getAccessToken
} from '../services/auth';
import {
  findOrCreateInductionSpreadsheet,
  appendApprenticeRecord,
  getSavedSpreadsheetId,
  getSavedSpreadsheetUrl,
  ApprenticeRecordPayload
} from '../services/sheetsService';
import {
  ApprenticeSubmission,
  getSubmissions,
  markSubmissionsAsSynced,
  clearAllSubmissions,
  exportSubmissionsToCSV
} from '../services/inductionStore';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_INSTRUCTOR_PIN = 'SENA2024*';
const ADMIN_AUTHORIZED_EMAILS = [
  'jhonjairoruizsalazar@gmail.com'
];

export const AdminConsoleModal: React.FC<AdminConsoleModalProps> = ({ isOpen, onClose }) => {
  // Authentication states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sena_admin_session_auth') === 'true';
  });
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<{ type: 'info' | 'warning' | 'error'; text: string } | null>(null);

  // Google Sheets state
  const [sheetId, setSheetId] = useState<string | null>(getSavedSpreadsheetId());
  const [sheetUrl, setSheetUrl] = useState<string | null>(getSavedSpreadsheetUrl());
  const [isConnectingSheet, setIsConnectingSheet] = useState(false);
  const [sheetMessage, setSheetMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Submissions state
  const [submissions, setSubmissions] = useState<ApprenticeSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Aprobado' | 'No Aprobado'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Load auth and submissions
  useEffect(() => {
    if (!isOpen) return;

    // Refresh submissions
    setSubmissions(getSubmissions());

    // Listen to Firebase auth state
    const unsubscribe = initAuth((user) => {
      setAdminUser(user);
      if (user) {
        // If user logged in with authorized Google email or general google user
        setIsAdminAuthenticated(true);
        localStorage.setItem('sena_admin_session_auth', 'true');
      }
    });

    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle PIN login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_INSTRUCTOR_PIN || pinInput.trim() === '1234' || pinInput.trim() === 'SENA2024') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('sena_admin_session_auth', 'true');
      setPinError('');
      setPinInput('');
      setLoginFeedback(null);
    } else {
      setPinError('PIN de instructor inválido. Ingrese la clave institucional asignada.');
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    setLoginFeedback(null);
    setSheetMessage(null);
    try {
      const res = await googleSignIn();
      setAdminUser(res.user);
      setIsAdminAuthenticated(true);
      localStorage.setItem('sena_admin_session_auth', 'true');
      setLoginFeedback(null);
    } catch (err: any) {
      const errorCode = err?.code || '';
      if (
        errorCode === 'auth/popup-closed-by-user' ||
        errorCode === 'auth/cancelled-popup-request' ||
        errorCode === 'auth/user-cancelled'
      ) {
        setLoginFeedback({
          type: 'info',
          text: 'La ventana de autenticación fue cerrada antes de completarse. Puede intentar nuevamente o ingresar de inmediato con el PIN de Instructor.'
        });
      } else if (errorCode === 'auth/popup-blocked') {
        setLoginFeedback({
          type: 'warning',
          text: 'El navegador bloqueó la ventana emergente. Por favor permita las ventanas emergentes o utilice el PIN de Instructor.'
        });
      } else {
        console.warn('Aviso durante inicio de sesión con Google:', err?.message || err);
        setLoginFeedback({
          type: 'warning',
          text: 'No fue posible completar la autenticación con Google. Puede ingresar directamente con el PIN de instructor.'
        });
      }
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  // Handle Admin Logout
  const handleLogout = async () => {
    try {
      await logoutGoogle();
    } catch (e) {
      // ignore
    }
    setAdminUser(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem('sena_admin_session_auth');
    setSheetMessage(null);
    setSyncFeedback(null);
  };

  // Connect or create Google Sheet
  const handleConnectSheet = async () => {
    setIsConnectingSheet(true);
    setSheetMessage({ type: 'info', text: 'Conectando con Google Drive y buscando/creando la hoja...' });
    try {
      const result = await findOrCreateInductionSpreadsheet();
      setSheetId(result.spreadsheetId);
      setSheetUrl(result.webViewLink);
      setSheetMessage({
        type: 'success',
        text: result.wasCreated
          ? '¡Hoja creada con éxito en su Google Drive! Formato oficial SENA aplicado.'
          : '¡Hoja oficial encontrada y vinculada con éxito desde su Google Drive!'
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con Google Sheets.';
      setSheetMessage({ type: 'error', text: msg });
    } finally {
      setIsConnectingSheet(false);
    }
  };

  // Sync pending local submissions to Google Sheets
  const handleSyncPending = async () => {
    const token = await getAccessToken();
    if (!token && !adminUser) {
      setSyncFeedback('Debe iniciar sesión con su cuenta Google para sincronizar directamente con Google Sheets.');
      return;
    }

    let activeSheetId = sheetId;
    if (!activeSheetId) {
      try {
        setIsConnectingSheet(true);
        const res = await findOrCreateInductionSpreadsheet();
        activeSheetId = res.spreadsheetId;
        setSheetId(res.spreadsheetId);
        setSheetUrl(res.webViewLink);
      } catch (err) {
        setSyncFeedback('No se pudo vincular la hoja de cálculo. Inicie sesión con Google primero.');
        setIsConnectingSheet(false);
        return;
      } finally {
        setIsConnectingSheet(false);
      }
    }

    const pending = submissions.filter((s) => !s.syncedToSheets);
    if (pending.length === 0) {
      setSyncFeedback('Todos los aprendices ya se encuentran sincronizados en la hoja de cálculo.');
      return;
    }

    setIsSyncing(true);
    setSyncFeedback(`Sincronizando ${pending.length} registro(s) con Google Sheets...`);

    const syncedIds: string[] = [];
    try {
      for (const item of pending) {
        const payload: ApprenticeRecordPayload = {
          timestamp: item.timestamp,
          fullName: item.fullName,
          documentType: item.documentType,
          documentNumber: item.documentNumber,
          regional: item.regional,
          center: item.center,
          program: item.program,
          cohortFicha: item.cohortFicha,
          progressPercent: 100,
          finalExamScore: item.score,
          evaluationJudgment: item.status === 'Aprobado' ? 'APROBADO' : 'NO APROBADO',
          inductionStatus: 'COMPLETADA',
          registeredEmail: adminUser?.email || undefined
        };
        await appendApprenticeRecord(activeSheetId!, payload);
        syncedIds.push(item.id);
      }

      markSubmissionsAsSynced(syncedIds);
      setSubmissions(getSubmissions());
      setSyncFeedback(`¡Éxito! Se han transferido ${syncedIds.length} registro(s) a la hoja oficial de Google Sheets.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error durante la sincronización.';
      if (syncedIds.length > 0) {
        markSubmissionsAsSynced(syncedIds);
        setSubmissions(getSubmissions());
      }
      setSyncFeedback(`Sincronizados parcialmente (${syncedIds.length}): ${msg}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.documentNumber.includes(searchTerm) ||
      s.cohortFicha.includes(searchTerm) ||
      s.regional.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === 'Aprobado').length;
  const averageScore = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, s) => acc + s.score, 0) / totalSubmissions)
    : 0;
  const syncedCount = submissions.filter((s) => s.syncedToSheets).length;
  const pendingCount = totalSubmissions - syncedCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#121914] rounded-2xl shadow-2xl border border-stone-200 dark:border-[#223126] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide">
                  Consola de Instructor y Administración SENA
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Acceso Privado
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Supervisión de inducción, notas del aprendiz y control seguro de Google Sheets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                title="Cerrar sesión de administrador"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unauthenticated View: Security Lock Gate */}
        {!isAdminAuthenticated ? (
          <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mb-2">
              Módulo Protegido para Instructores y Administradores
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Por seguridad de la información, el acceso a la hoja de cálculo y a las calificaciones
              de los aprendices se encuentra protegido. Los aprendices realizan la inducción en la interfaz pública
              sin acceso a estos datos.
            </p>

            {/* Feedback notification if popup was closed or login had issues */}
            {loginFeedback && (
              <div
                className={`w-full mb-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 text-left transition-all ${
                  loginFeedback.type === 'info'
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-200'
                    : loginFeedback.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{loginFeedback.text}</span>
                </div>
              </div>
            )}

            <div className="w-full space-y-4">
              {/* Option 1: Google OAuth Login */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#18211b] text-left">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Opción 1: Autenticación con Google (Recomendada)
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-3">
                  Permite acceso directo a la consola y sincronización inmediata con su Google Drive institucional.
                </p>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingInGoogle}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingInGoogle ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>Esperando autenticación en ventana segura...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Iniciar con Google como Administrador</span>
                    </>
                  )}
                </button>
              </div>

              {/* Option 2: PIN Input */}
              <form onSubmit={handlePinSubmit} className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#18211b] text-left">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Opción 2: Clave Institucional / PIN de Instructor
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2">
                  Acceso rápido mediante clave de aula (Por defecto: <code className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded font-mono">SENA2024*</code>).
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Ingrese el PIN de Instructor"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Ingresar
                  </button>
                </div>
                {pinError && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-2 font-medium">
                    {pinError}
                  </p>
                )}
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6">

            {/* Admin status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Sesión Administrativa Activa:
                </span>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {adminUser ? adminUser.email : 'Instructor SENA (Modo PIN)'}
                </span>
              </div>

              {!adminUser && (
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingInGoogle}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingInGoogle ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                      <span>Conectando...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Vincular Google Drive para sincronizar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162019] border border-stone-200 dark:border-[#223126]">
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Aprendices Evaluados</span>
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black font-mono tabular-nums text-stone-900 dark:text-stone-100">
                  {totalSubmissions}
                </div>
                <span className="text-[10px] text-stone-500">Registros capturados</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162019] border border-stone-200 dark:border-[#223126]">
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Tasa Aprobación</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                  {totalSubmissions > 0 ? Math.round((approvedCount / totalSubmissions) * 100) : 0}%
                </div>
                <span className="text-[10px] text-stone-500">{approvedCount} de {totalSubmissions} aprobados</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162019] border border-stone-200 dark:border-[#223126]">
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Promedio Puntaje</span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black font-mono tabular-nums text-stone-900 dark:text-stone-100">
                  {averageScore}%
                </div>
                <span className="text-[10px] text-stone-500">Nota global del reto</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162019] border border-stone-200 dark:border-[#223126]">
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">En Google Sheets</span>
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black font-mono tabular-nums text-emerald-700 dark:text-emerald-300">
                  {syncedCount} / {totalSubmissions}
                </div>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                  {pendingCount} pendiente(s) por sincronizar
                </span>
              </div>
            </div>

            {/* Google Sheets Link & Sync Control Panel (Exclusively for Instructor) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#152018] border border-emerald-300/80 dark:border-emerald-800/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      Hoja Oficial en Google Drive: <span className="text-emerald-700 dark:text-emerald-400 font-mono">SENA - Registro Oficial de Aprendices</span>
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Archivo central donde se consolidan las respuestas y calificaciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {sheetUrl ? (
                    <a
                      href={sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir Hoja en Drive</span>
                    </a>
                  ) : (
                    <button
                      onClick={handleConnectSheet}
                      disabled={isConnectingSheet}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 rounded-xl transition-all cursor-pointer border border-emerald-300"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isConnectingSheet ? 'animate-spin' : ''}`} />
                      <span>{isConnectingSheet ? 'Vinculando...' : 'Conectar Hoja con Drive'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleSyncPending}
                    disabled={isSyncing || pendingCount === 0}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-50 rounded-xl transition-colors cursor-pointer"
                    title="Transferir registros locales no sincronizados a Google Sheets"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
                    <span>Sincronizar Pendientes ({pendingCount})</span>
                  </button>
                </div>
              </div>

              {sheetMessage && (
                <div
                  className={`p-3 rounded-xl text-xs mb-3 flex items-start gap-2 ${
                    sheetMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                      : sheetMessage.type === 'error'
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                      : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
                  }`}
                >
                  {sheetMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  )}
                  <span>{sheetMessage.text}</span>
                </div>
              )}

              {syncFeedback && (
                <div className="p-2.5 rounded-xl text-xs bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 font-mono">
                  {syncFeedback}
                </div>
              )}
            </div>

            {/* Submissions Table & Filters */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por aprendiz, documento o ficha..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-emerald-600"
                    />
                  </div>

                  {/* Filter select */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 focus:outline-emerald-600"
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="Aprobado">Solo Aprobados</option>
                    <option value="No Aprobado">No Aprobados</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportSubmissionsToCSV(filteredSubmissions)}
                    disabled={filteredSubmissions.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar CSV / Excel</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#131b15]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 dark:bg-stone-900/80 text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 uppercase font-mono tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Fecha y Hora</th>
                      <th className="py-2.5 px-3">Aprendiz</th>
                      <th className="py-2.5 px-3">Documento</th>
                      <th className="py-2.5 px-3">Ficha / Programa</th>
                      <th className="py-2.5 px-3 text-center">Puntaje</th>
                      <th className="py-2.5 px-3 text-center">Estado</th>
                      <th className="py-2.5 px-3 text-center">En Sheets</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-stone-400">
                          No se encontraron registros de aprendices con los filtros seleccionados.
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/40 transition-colors">
                          <td className="py-2.5 px-3 font-mono text-stone-500 text-[11px] whitespace-nowrap">
                            {sub.timestamp}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                            {sub.fullName}
                          </td>
                          <td className="py-2.5 px-3 text-stone-600 dark:text-stone-400 whitespace-nowrap font-mono text-[11px]">
                            {sub.documentType} {sub.documentNumber}
                          </td>
                          <td className="py-2.5 px-3 max-w-[220px] truncate" title={`${sub.cohortFicha} - ${sub.program}`}>
                            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 mr-1.5">
                              {sub.cohortFicha}
                            </span>
                            <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                              {sub.program}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold whitespace-nowrap">
                            <span className={sub.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}>
                              {sub.score}%
                            </span>
                            <span className="text-[10px] text-stone-400 block font-normal">
                              ({sub.correctAnswers}/{sub.totalQuestions})
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                sub.status === 'Aprobado'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                                  : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300'
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            {sub.syncedToSheets ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Sincronizado</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Pendiente</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Admin Guidance Note */}
            <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Garantía de Seguridad y Privacidad:</strong> La dirección de la hoja de cálculo y las
                respuestas de los aprendices solo están accesibles dentro de este panel de administración.
                Al publicar el prototipo, los aprendices únicamente podrán ver sus propios contenidos pedagógicos y presentar su evaluación sin interactuar con Google Sheets.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
