import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { ApprenticeProfile } from '../types';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  getAccessToken
} from '../services/auth';
import {
  findOrCreateInductionSpreadsheet,
  appendApprenticeRecord,
  fetchInductionRecords,
  getSavedSpreadsheetUrl,
  getSavedSpreadsheetId,
  ApprenticeRecordPayload,
  DEFAULT_SHEET_TITLE
} from '../services/sheetsService';
import {
  FileSpreadsheet,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  LogOut,
  UserCheck,
  Send,
  Database,
  ShieldCheck,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  progressPercent: number;
  finalExamPassed: boolean;
}

export const DriveSyncModal: React.FC<DriveSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  progressPercent,
  finalExamPassed
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isLoadingSheet, setIsLoadingSheet] = useState<boolean>(false);
  const [isSubmittingRecord, setIsSubmittingRecord] = useState<boolean>(false);
  const [sheetId, setSheetId] = useState<string | null>(getSavedSpreadsheetId());
  const [sheetUrl, setSheetUrl] = useState<string | null>(getSavedSpreadsheetUrl());
  const [recordedRows, setRecordedRows] = useState<string[][]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasToken(!!token);
      },
      () => {
        setCurrentUser(null);
        setHasToken(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // When authenticated, check if sheet exists and load rows
  useEffect(() => {
    if (isOpen && hasToken && currentUser) {
      handleEnsureSpreadsheet(false);
    }
  }, [isOpen, hasToken]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setIsAuthenticating(true);
      setFeedbackMessage(null);
      const res = await googleSignIn();
      if (res?.user && res.accessToken) {
        setCurrentUser(res.user);
        setHasToken(true);
        setFeedbackMessage({
          type: 'success',
          text: `Sesión iniciada con éxito como ${res.user.displayName || res.user.email}`
        });
        // Now ensure sheet
        await handleEnsureSpreadsheet(false);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        console.warn('Inicio de sesión cancelado o ventana cerrada.');
        setFeedbackMessage({
          type: 'info',
          text: 'Ventana de inicio de sesión cerrada por el usuario.'
        });
      } else {
        console.warn('Error al conectar con Google:', err?.message || err);
        setFeedbackMessage({
          type: 'error',
          text: err?.message || 'Error al conectar con Google. Revisa la ventana emergente.'
        });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setHasToken(false);
      setRecordedRows([]);
      setFeedbackMessage({
        type: 'info',
        text: 'Sesión cerrada correctamente.'
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleEnsureSpreadsheet = async (forceNotification = true) => {
    try {
      setIsLoadingSheet(true);
      const res = await findOrCreateInductionSpreadsheet(DEFAULT_SHEET_TITLE);
      setSheetId(res.spreadsheetId);
      setSheetUrl(res.webViewLink);

      if (forceNotification) {
        setFeedbackMessage({
          type: 'success',
          text: res.wasCreated
            ? '¡Hoja de cálculo creada exitosamente en tu Google Drive!'
            : 'Hoja de cálculo vinculada correctamente desde tu Google Drive.'
        });
      }

      // Load records
      const records = await fetchInductionRecords(res.spreadsheetId);
      setRecordedRows(records.rows);
    } catch (err: any) {
      console.error(err);
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'Error al conectar con la hoja en Google Drive.'
      });
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleSaveCurrentApprentice = async () => {
    if (!sheetId) {
      await handleEnsureSpreadsheet(false);
    }
    const currentSheetId = sheetId || getSavedSpreadsheetId();
    if (!currentSheetId) {
      setFeedbackMessage({
        type: 'error',
        text: 'Primero debes vincular o crear la hoja de cálculo en Google Drive.'
      });
      return;
    }

    try {
      setIsSubmittingRecord(true);
      setFeedbackMessage(null);

      const record: ApprenticeRecordPayload = {
        timestamp: new Date().toLocaleString('es-CO', {
          dateStyle: 'medium',
          timeStyle: 'medium'
        }),
        fullName: profile.fullName,
        documentType: profile.documentType,
        documentNumber: profile.documentNumber,
        regional: profile.regional,
        center: profile.center,
        program: profile.program,
        cohortFicha: profile.cohortFicha,
        progressPercent,
        evaluationJudgment: finalExamPassed ? 'APROBADO' : progressPercent >= 80 ? 'APROBADO' : 'EN CURSO',
        inductionStatus: progressPercent >= 80 ? 'COMPLETADA' : 'EN PROGRESO',
        registeredEmail: currentUser?.email || 'N/A'
      };

      await appendApprenticeRecord(currentSheetId, record);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#39A900', '#047857', '#10B981']
      });

      setFeedbackMessage({
        type: 'success',
        text: `¡Aprendiz ${profile.fullName} registrado con éxito en la hoja de cálculo de Google Drive!`
      });

      // Reload rows
      const updated = await fetchInductionRecords(currentSheetId);
      setRecordedRows(updated.rows);
    } catch (err: any) {
      console.error(err);
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'Error al registrar al aprendiz en Google Sheets.'
      });
    } finally {
      setIsSubmittingRecord(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl neu-convex rounded-3xl p-6 sm:p-8 my-auto transition-all bg-white dark:bg-[#141b16] border border-stone-200 dark:border-[#232f27] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 font-display">
                  Registro de Inducción en Google Drive
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Google Sheets Oficial
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Almacena y gestiona en tiempo real la lista de aprendices que han presentado la inducción en tu cuenta.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-[#1d2620] hover:bg-stone-200 dark:hover:bg-[#28362d] flex items-center justify-center text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMessage && (
          <div
            className={`my-4 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs font-medium animate-fadeIn ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80'
                : feedbackMessage.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800/80'
                : 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 border border-sky-200 dark:border-sky-800/80'
            }`}
          >
            {feedbackMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />}
            {feedbackMessage.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />}
            {feedbackMessage.type === 'info' && <Info className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" />}
            <span className="flex-1">{feedbackMessage.text}</span>
          </div>
        )}

        {/* Auth Step */}
        {!hasToken || !currentUser ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-200 dark:border-emerald-800/50 shadow-inner">
              <FolderOpen className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto">
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Conectar con tu cuenta de Google
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Para guardar el registro en un archivo de Google Sheets dentro de tu Google Drive personal o institucional, autoriza la conexión con permiso de tu usuario.
              </p>
            </div>

            {/* Official Material Google Sign-In Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleGoogleLogin}
                disabled={isAuthenticating}
                className="gsi-material-button neu-btn cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dadce0',
                  color: '#3c4043',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block', width: '20px', height: '20px' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span>{isAuthenticating ? 'Conectando con Google...' : 'Iniciar sesión con Google'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Permisos seguros otorgados por el usuario para Google Sheets y Google Drive</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* User Session Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-[#1a231d] border border-stone-200 dark:border-[#253229]">
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || ''}
                    className="w-10 h-10 rounded-full border border-emerald-500 shadow-xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {currentUser.displayName || 'Usuario Google'}
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-semibold px-2 py-0.2 rounded-full">
                      Conectado
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono block">
                    {currentUser.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-200 dark:hover:bg-[#253229] rounded-xl transition-colors cursor-pointer"
                  title="Cerrar sesión de Google"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Desconectar</span>
                </button>
              </div>
            </div>

            {/* Target Drive File Info */}
            <div className="p-4 rounded-2xl neu-flat bg-stone-50/70 dark:bg-[#18211b] border border-stone-200 dark:border-[#26352a]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Archivo en Drive: {DEFAULT_SHEET_TITLE}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {sheetId
                      ? `ID: ${sheetId.slice(0, 16)}... | Pestaña: 'Aprendices Inducción'`
                      : 'Listo para sincronizar o crear el archivo de registro en tu cuenta.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {sheetUrl && (
                    <a
                      href={sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir en Google Sheets</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleEnsureSpreadsheet(true)}
                    disabled={isLoadingSheet}
                    className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#27362b] transition-colors cursor-pointer"
                    title="Actualizar datos de la hoja"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingSheet ? 'animate-spin text-emerald-600' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Current Apprentice Data Ready to Save */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#151c17] border border-stone-200 dark:border-[#28382c] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                    Datos del Aprendiz Actual
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {progressPercent}% Inducción
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-[#1c2620]">
                  <span className="text-[10px] text-stone-400 block">Nombre</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 truncate block">
                    {profile.fullName}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-[#1c2620]">
                  <span className="text-[10px] text-stone-400 block">Documento</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 font-mono">
                    {profile.documentType} {profile.documentNumber}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-[#1c2620]">
                  <span className="text-[10px] text-stone-400 block">Ficha</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 font-mono">
                    {profile.cohortFicha}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-[#1c2620]">
                  <span className="text-[10px] text-stone-400 block">Juicio</span>
                  <span
                    className={`font-bold ${
                      finalExamPassed || progressPercent >= 80
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {finalExamPassed ? 'Aprobado (A)' : progressPercent >= 80 ? 'Aprobado (A)' : 'En Progreso'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Haz clic para enviar y anexar una fila en la hoja de Google Drive:
                </span>

                <button
                  onClick={handleSaveCurrentApprentice}
                  disabled={isSubmittingRecord}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black text-white neu-btn-green rounded-xl cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isSubmittingRecord ? 'animate-bounce' : ''}`} />
                  <span>{isSubmittingRecord ? 'Guardando en Drive...' : 'Registrar Aprendiz en Google Sheets'}</span>
                </button>
              </div>
            </div>

            {/* Existing Records in Sheet Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-stone-500" />
                  <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Historial de Registros en la Hoja ({recordedRows.length} aprendices)
                  </h4>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">
                  Sincronizado con Drive
                </span>
              </div>

              <div className="border border-stone-200 dark:border-[#27362c] rounded-2xl overflow-hidden bg-white dark:bg-[#131a15] max-h-52 overflow-y-auto">
                {recordedRows.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-500 dark:text-stone-400">
                    Aún no hay registros en la hoja de cálculo. Haz clic en "Registrar Aprendiz" para agregar el primero.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead className="bg-stone-100 dark:bg-[#1a231d] text-stone-700 dark:text-stone-300 font-bold sticky top-0">
                      <tr>
                        <th className="p-2 border-b border-stone-200 dark:border-[#28362d]">Fecha</th>
                        <th className="p-2 border-b border-stone-200 dark:border-[#28362d]">Aprendiz</th>
                        <th className="p-2 border-b border-stone-200 dark:border-[#28362d]">Doc</th>
                        <th className="p-2 border-b border-stone-200 dark:border-[#28362d]">Ficha</th>
                        <th className="p-2 border-b border-stone-200 dark:border-[#28362d]">Avance</th>
                        <th className="p-2 border-b border-stone-200 dark:border-[#28362d]">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-[#202c23]">
                      {recordedRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-[#19221b] transition-colors">
                          <td className="p-2 font-mono text-stone-500 whitespace-nowrap">{row[0] || '-'}</td>
                          <td className="p-2 font-bold text-stone-800 dark:text-stone-200">{row[3] || '-'}</td>
                          <td className="p-2 font-mono">{row[2] || '-'}</td>
                          <td className="p-2 font-mono">{row[7] || '-'}</td>
                          <td className="p-2 font-mono font-bold text-emerald-700 dark:text-emerald-400">{row[8] || '-'}</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                              {row[11] || 'REGISTRADO'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Acuerdo 009 de 2024 · Inducción Institucional SENA</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-[#1c2620] hover:bg-stone-200 dark:hover:bg-[#253229] font-bold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
