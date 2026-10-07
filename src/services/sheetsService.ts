import { getAccessToken } from './auth';

export interface ApprenticeRecordPayload {
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  regional: string;
  center: string;
  program: string;
  cohortFicha: string;
  progressPercent: number;
  finalExamScore?: number;
  evaluationJudgment: 'APROBADO' | 'NO APROBADO' | 'EN CURSO';
  inductionStatus: 'COMPLETADA' | 'EN PROGRESO';
  registeredEmail?: string;
}

export interface DriveFileInfo {
  id: string;
  name: string;
  webViewLink?: string;
}

const STORAGE_SPREADSHEET_KEY = 'sena_induction_sheet_id';
const STORAGE_SPREADSHEET_URL_KEY = 'sena_induction_sheet_url';
export const DEFAULT_SHEET_TITLE = 'SENA - Registro Oficial de Aprendices en Inducción';

export const getSavedSpreadsheetId = (): string | null => {
  return localStorage.getItem(STORAGE_SPREADSHEET_KEY);
};

export const getSavedSpreadsheetUrl = (): string | null => {
  return localStorage.getItem(STORAGE_SPREADSHEET_URL_KEY);
};

export const setSavedSpreadsheetInfo = (id: string, url: string) => {
  localStorage.setItem(STORAGE_SPREADSHEET_KEY, id);
  localStorage.setItem(STORAGE_SPREADSHEET_URL_KEY, url);
};

/**
 * Searches in user's Drive for an existing spreadsheet with matching name, or creates one.
 */
export async function findOrCreateInductionSpreadsheet(
  customTitle = DEFAULT_SHEET_TITLE
): Promise<{ spreadsheetId: string; webViewLink: string; wasCreated: boolean }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Sesión no autorizada con Google. Por favor inicia sesión con tu cuenta de Google.');
  }

  // 1. Check if we have a valid saved spreadsheet ID in local storage
  const savedId = getSavedSpreadsheetId();
  if (savedId) {
    try {
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${savedId}?fields=spreadsheetId,spreadsheetUrl,properties.title`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        const url = checkData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${savedId}/edit`;
        setSavedSpreadsheetInfo(savedId, url);
        return {
          spreadsheetId: savedId,
          webViewLink: url,
          wasCreated: false
        };
      }
    } catch (e) {
      // If check failed or not found, proceed to search Drive
    }
  }

  // 2. Query Google Drive for an existing sheet file
  const q = `name = '${customTitle}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`;
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,webViewLink)`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      const existingFile = searchData.files[0];
      setSavedSpreadsheetInfo(existingFile.id, existingFile.webViewLink);
      return {
        spreadsheetId: existingFile.id,
        webViewLink: existingFile.webViewLink,
        wasCreated: false
      };
    }
  }

  // 3. Create a brand new Google Spreadsheet with structured headers and styling
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: customTitle,
        locale: 'es_CO',
        timeZone: 'America/Bogota'
      },
      sheets: [
        {
          properties: {
            title: 'Aprendices Inducción',
            gridProperties: {
              frozenRowCount: 1
            }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Error al crear la hoja en Google Drive: ${errorText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const webViewLink = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Write header row
  const headerValues = [
    [
      'Fecha y Hora (Registro)',
      'Documento Tipo',
      'Número de Documento',
      'Nombre Completo del Aprendiz',
      'Regional SENA',
      'Centro de Formación',
      'Programa de Formación',
      'Ficha de Caracterización',
      '% Avance Inducción',
      'Puntaje Reto Evaluativo',
      'Juicio de Evaluación (A/D)',
      'Estado de Inducción',
      'Correo Google Vinculado',
      'Norma Base'
    ]
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices Inducción!A1:N1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: headerValues
      })
    }
  );

  // Apply SENA Green Header Style & Formatting
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 14
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.223,
                    green: 0.662,
                    blue: 0.0
                  },
                  textFormat: {
                    foregroundColor: {
                      red: 1.0,
                      green: 1.0,
                      blue: 1.0
                    },
                    fontSize: 10,
                    bold: true
                  },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
            }
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: 0,
                gridProperties: {
                  frozenRowCount: 1
                }
              },
              fields: 'gridProperties.frozenRowCount'
            }
          }
        ]
      })
    });
  } catch (formatErr) {
    console.warn('Could not apply visual formatting to sheet:', formatErr);
  }

  setSavedSpreadsheetInfo(spreadsheetId, webViewLink);

  return {
    spreadsheetId,
    webViewLink,
    wasCreated: true
  };
}

/**
 * Appends a new apprentice induction record to the Google Sheet.
 */
export async function appendApprenticeRecord(
  spreadsheetId: string,
  record: ApprenticeRecordPayload
): Promise<{ updatedRange: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Token de acceso no disponible. Inicia sesión con Google.');
  }

  const rowValues = [
    [
      record.timestamp,
      record.documentType,
      record.documentNumber,
      record.fullName,
      record.regional,
      record.center,
      record.program,
      record.cohortFicha,
      `${record.progressPercent}%`,
      record.finalExamScore !== undefined ? `${record.finalExamScore}%` : 'N/A',
      record.evaluationJudgment,
      record.inductionStatus,
      record.registeredEmail || 'N/A',
      'Acuerdo 009 de 2024'
    ]
  ];

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Aprendices Inducción'!A:N:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: rowValues
      })
    }
  );

  if (!appendRes.ok) {
    const errorText = await appendRes.text();
    throw new Error(`Error al registrar en Google Sheets: ${errorText}`);
  }

  const result = await appendRes.json();
  return {
    updatedRange: result.updates?.updatedRange || 'Aprendices Inducción'
  };
}

/**
 * Reads existing rows from the spreadsheet to show induction records in the app.
 */
export async function fetchInductionRecords(
  spreadsheetId: string
): Promise<{ headers: string[]; rows: string[][] }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Sesión de Google no iniciada.');
  }

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Aprendices Inducción'!A1:N100`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al leer hoja de cálculo: ${err}`);
  }

  const data = await res.json();
  const allValues: string[][] = data.values || [];
  if (allValues.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = allValues[0];
  const rows = allValues.slice(1);
  return { headers, rows };
}
