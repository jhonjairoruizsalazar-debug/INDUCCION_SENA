# Plan de Trabajo: Separación Segura de Roles y Consola de Instructor SENA

Este plan establece una arquitectura de dos perfiles para el prototipo de inducción: una experiencia 100% limpia y enfocada para los aprendices (sin exposición de enlaces ni accesos a Google Drive / Sheets), y un panel administrativo protegido exclusivo para el instructor con visualización de resultados y sincronización centralizada de la hoja de cálculo.

### User Review & Critical Decisions

> [!IMPORTANT]
> El usuario indicó la necesidad de publicar el prototipo para que los aprendices realicen las pruebas de inducción sin ver ni tener acceso a la hoja de cálculo en Drive, reservando dicho acceso únicamente al administrador. Para resolver esta necesidad se adoptan las siguientes decisiones y configuraciones:

- **Ocultamiento Total para Aprendices**: Se retiran todos los botones y menciones de "Registro Drive", "Sheets" y "Guardar en Drive" del Header, Sidebar, Banner principal, Modal de Certificado y pantalla de resultados del Examen Final. El aprendiz solo interactúa con sus módulos pedagógicos, simulador de casos y prueba final.
- **Acceso Administrativo Híbrido Protegido**: Acceso al panel de control mediante un botón discreto en la barra de navegación o pie de página ("Acceso Instructor / Coordinador") protegido por validación de identidad dual:
  1. *Identificación por Correo Google Autorizado*: El instructor inicia sesión con su cuenta Google (`jhonjairoruizsalazar@gmail.com` o correos institucionales autorizados).
  2. *Código PIN de Contingencia*: Un PIN de acceso rápido configurable (por defecto `SENA2024*`) para acceso directo en sesiones de aula presencial o cuando no se desee iniciar sesión Google en equipos compartidos.
- **Captura y Sincronización Automática de Resultados**: Cuando el aprendiz completa la inducción y aprueba el examen final, el sistema genera la constancia digital y registra su intento y respuestas en el almacén de registros del prototipo. El instructor, al ingresar a su consola, sincroniza y consolida estos registros en su hoja oficial de Google Sheets en Drive con un solo clic o de forma automática.

---

### 1. Overview & Core Concept

- **What It Does**: Transforma el aplicativo en una plataforma de doble rol:
  1. **Modo Aprendiz**: Portal interactivo de inducción basado en el Acuerdo 009 de 2024, carné virtual 3D, navegación de deberes/derechos y evaluación final con expedición de certificado oficial de 40 horas.
  2. **Modo Administrador / Instructor**: Panel de control protegido donde el docente visualiza la tabla consolidada de aprendices evaluados, puntajes, fechas, estado de aprobación, exportación a Excel/CSV y vinculación directa y segura con Google Drive / Sheets.
- **Target Audience / Persona**:
  - *Aprendices SENA*: Nuevos estudiantes en etapa de inducción que requieren realizar sus actividades sin distracciones ni riesgos de manipular la base de datos central.
  - *Instructor / Administrador (`Jhon Jairo Ruiz Salazar`)*: Responsable del seguimiento, verificación de asistencia y control de notas en su Google Drive institucional.
- **Key Value**: Garantiza la seguridad, integridad y privacidad de la información (evitando que los aprendices vean las respuestas o datos personales de otros compañeros) a la vez que simplifica la publicación masiva del enlace web.

---

### 2. User Experience & Visual Design

#### A. Flujo del Aprendiz (Experiencia Segura y Libre de Fugas de Información)
1. El estudiante ingresa al enlace público del prototipo.
2. Diligencia su ficha inicial (Nombres, Tipo de Documento, Regional, Centro y Programa de Formación).
3. Navega por los módulos interactivos del reglamento (Derechos, Deberes, Faltas y Procedimientos).
4. Presenta el Reto Evaluativo Final.
5. Al aprobar, recibe su felicitación con efectos visuales y su certificado descargable/imprimible en PDF.
6. En segundo plano, el sistema emite el comprobante de presentación sin solicitar permisos de Google Drive al aprendiz ni mostrar enlaces hacia la hoja de cálculo.

#### B. Flujo del Instructor / Administrador
1. En la parte inferior de la barra de navegación o pie de página, el instructor pulsa el enlace discreto con icono de candado *"Acceso Instructor"*.
2. Se despliega una ventana de autenticación con diseño institucional SENA:
   - Inicio de sesión directo con Google (con la cuenta autorizada).
   - Opcionalmente, ingreso rápido mediante PIN de instructor.
3. Al autenticarse, se activa la **Consola de Control del Instructor**:
   - Resumen estadístico: Total de aprendices evaluados, tasa de aprobación, promedio de aciertos y fichas activas.
   - Tabla interactiva de resultados: Búsqueda por documento, filtrado por ficha o regional y detalle de respuestas.
   - Centro de Enlace con Google Drive: Visualización del estado de la hoja de cálculo oficial (`Induccion_SENA_Reglamento_2024`), enlace directo a la hoja (solo visible para el instructor) y botón de sincronización masiva en un clic.
   - Acciones de descarga: Exportar listado en formato Excel / CSV para archivo local.
   - Botón de cierre de sesión seguro para volver al modo público del aprendiz.

#### C. Identidad Visual y Estilo
- **Paleta Institucional SENA**: Tonos verde esmeralda profundo (`#00324D`, `#39A900`, `emerald-700`, `emerald-800`), fondo marfil pulcro (`#FDFBF7`) y modo oscuro de alto contraste (`#0c140e`).
- **Disciplina Visual**: Eliminación de insignias flotantes innecesarias y tarjetas anidadas; tipografía jerarquizada con números tabulares (`font-mono tabular-nums`) para puntuaciones, documentos y horas formativas.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Retirar completamente los controles de Google Sheets del entorno del aprendiz**
  - *Enfoque*: Ningún aprendiz ve botones de sincronización con Google Drive ni se le solicita autorizar OAuth de Google para realizar la inducción.
  - *Razón*: Evita que un aprendiz pueda leer las notas de sus compañeros, borrar accidentalmente filas de la hoja compartida o frustrarse con solicitudes de permisos de Google.
  - *Alternativa descartada*: Dejar un botón con advertencia o permisos restringidos en la hoja (inseguro e ineficiente).

- **Decisión 2: Panel Administrativo Integrado y Protegido**
  - *Enfoque*: Un componente modal/vista de gestión accesible mediante candado con autenticación Google del administrador (`jhonjairoruizsalazar@gmail.com`) o PIN maestro de instructor.
  - *Razón*: Permite que el mismo aplicativo web publicado sirva a los aprendices y a la vez sirva de centro de comando para el docente desde cualquier dispositivo.
  - *Alternativa descartada*: Crear dos páginas web completamente separadas (complicaría el despliegue y mantenimiento del prototipo).

- **Decisión 3: Pipeline de Registro de Evaluaciones Desacoplado**
  - *Enfoque*: Cada vez que un aprendiz finaliza la inducción o el examen, el registro se almacena de forma local estructurada (`localStorage`) y, cuando el administrador inicia sesión en su consola, puede sincronizar y consolidar todos los intentos en su Google Sheet oficial con un solo clic.
  - *Razón*: Asegura que ningún aprendiz pierda su registro incluso con intermitencias de red y mantiene completamente a salvo las credenciales del docente.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROTOTIPO INDUCCIÓN SENA                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│        PERFIL APRENDIZ        │             │      CONSOLA INSTRUCTOR       │
│     (Público y Protegido)     │             │     (Protegido con Clave/     │
├───────────────────────────────┤             │      Google OAuth Admin)      │
│ • Datos del Aprendiz          │             ├───────────────────────────────┤
│ • Módulos Acuerdo 009 de 2024 │             │ • Métricas de Aprobación      │
│ • Evaluación Final & Casos    │             │ • Tabla de Respuestas         │
│ • Descarga Certificado PDF    │             │ • Enlace Seguro a Hoja Sheets │
│ • CERO botones de Sheets/Drive│             │ • Sincronización Masiva       │
└───────────────┬───────────────┘             │ • Exportar CSV/Excel          │
                │                             └───────────────┬───────────────┘
                │ Guarda intento                              │ Conecta y sincroniza
                ▼                                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       REPOSITORIO LOCAL DE REGISTROS                        │
│                 (Almacén estructurado de aprendices evaluados)              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ (Vía Google Sheets API del Admin)
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GOOGLE DRIVE / GOOGLE SHEETS OFICIAL                     │
│               Archivo: "Induccion_SENA_Reglamento_2024" (Privado)           │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Entidades de Datos
1. **ApprenticeSubmission**:
   - `id`: Identificador único del intento.
   - `timestamp`: Fecha y hora de finalización.
   - `fullName`, `documentType`, `documentNumber`: Datos del aprendiz.
   - `regional`, `center`, `program`, `cohortFicha`: Datos académicos.
   - `score`: Calificación obtenida (ej. 100%).
   - `correctAnswers`: Respuestas correctas vs totales.
   - `status`: Estado (`Aprobado` / `No Aprobado`).
   - `syncedToSheets`: Booleano que indica si ya está en la hoja de Drive.

2. **AdminSession**:
   - `isAuthenticated`: Estado de acceso.
   - `adminEmail`: Correo Google verificado.
   - `spreadsheetId`: Identificador del archivo en Drive.
   - `spreadsheetUrl`: Enlace web a la hoja.

---

### 5. Plan de Ejecución (Paso a Paso)

1. **Limpieza de la Interfaz del Aprendiz**:
   - Retirar del `Header.tsx` el botón *"Registro Drive"*.
   - Retirar del `Sidebar.tsx` la opción *"Registro en Drive (Sheets)"*.
   - Retirar del Hero banner en `App.tsx` el botón *"Registrar en Google Sheets"*.
   - Retirar de `FinalExam.tsx` y `CertificateModal.tsx` los botones de guardado manual en Drive.
2. **Creación del Almacén de Registros de Inducción (`src/services/inductionStore.ts`)**:
   - Funciones para guardar automáticamente cada intento al aprobar el examen.
   - Soporte de consulta, filtrado y conteo de estados de sincronización.
3. **Construcción del Panel Administrativo de Instructor (`src/components/AdminConsoleModal.tsx`)**:
   - Modal con pestaña de login (Google Auth del administrador + PIN institucional `SENA2024*`).
   - Pestaña de Control: Conexión con Google Drive, creación/enlace de la hoja institucional.
   - Pestaña de Aprendices: Tabla en vivo con las respuestas, notas, filtros y botón "Sincronizar todo con Google Sheets".
   - Exportación directa a CSV.
4. **Integración Discreta en el Aplicativo**:
   - Agregar acceso discreto en el pie del Sidebar y en el Footer de la aplicación con icono de candado ("Acceso Instructor").
   - Conexión del flujo de examen: Al aprobar, se guarda silenciosamente en el almacén local para sincronización centralizada.
5. **Verificación y Compilación**:
   - Comprobar que no queden enlaces o botones visibles para los aprendices.
   - Ejecutar `compile_applet` y validar que no existan errores de TypeScript ni advertencias.
