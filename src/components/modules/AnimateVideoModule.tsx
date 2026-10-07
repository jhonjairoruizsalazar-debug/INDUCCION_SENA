import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Upload,
  Play,
  Pause,
  Download,
  Sparkles,
  RefreshCw,
  Film,
  Camera,
  Layers,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Maximize2
} from 'lucide-react';

interface AnimateVideoProps {
  onReturnToDashboard?: () => void;
}

const SAMPLE_SENA_PROMPTS = [
  'Aprendiz SENA trabajando en un laboratorio tecnológico con hologramas e iluminación cinemática suave',
  'Animación realista del escudo y emblema institucional del SENA con reflejos dorados y destellos sutiles',
  'Aprendices caminando por el campus universitario del SENA en un atardecer cálido y cinemático',
  'Primer plano de un prototipo robótico e innovador en movimiento fluido con luz verde institucional'
];

export const AnimateVideoModule: React.FC<AnimateVideoProps> = ({ onReturnToDashboard }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  
  // Status states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pollProgress, setPollProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pollTimerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido (JPG, PNG o WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('La imagen no debe superar los 10MB.');
      return;
    }

    setError(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setVideoUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUseShieldImage = async () => {
    try {
      setError(null);
      const res = await fetch('/escudo-sena.png');
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setMimeType('image/png');
        setVideoUrl(null);
        setPrompt('Animación solemne y tridimensional del Escudo Oficial del SENA con destellos de luz esmeralda y movimiento de cámara sutil.');
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      setError('No se pudo cargar la imagen del escudo.');
    }
  };

  const handleStartGeneration = async () => {
    if (!selectedImage) {
      setError('Debes subir o seleccionar una imagen antes de generar el video.');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      setVideoUrl(null);
      setPollProgress(10);
      setStatusMessage('Iniciando modelo Veo 3.1 (veo-3.1-fast-generate-preview)...');

      // 1. Start generation
      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType,
          prompt,
          aspectRatio,
        }),
      });

      const startData = await startRes.json();
      if (!startRes.ok || !startData.operationName) {
        throw new Error(startData.error || 'Error al iniciar la generación de video.');
      }

      const operationName = startData.operationName;
      setStatusMessage('Generando fotogramas de video con inteligencia artificial...');
      setPollProgress(25);

      // 2. Poll operation
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max (poll every 5s)

      pollTimerRef.current = setInterval(async () => {
        attempts++;
        try {
          const statusRes = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
          });

          const statusData = await statusRes.json();

          if (statusData.hasError) {
            clearInterval(pollTimerRef.current);
            throw new Error(statusData.error?.message || 'La generación del video falló.');
          }

          if (statusData.done) {
            clearInterval(pollTimerRef.current);
            setStatusMessage('Descargando y procesando el video generado...');
            setPollProgress(90);

            // 3. Download video
            const downloadRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName }),
            });

            if (!downloadRes.ok) {
              const errJson = await downloadRes.json().catch(() => ({}));
              throw new Error(errJson.error || 'Error al descargar el archivo de video.');
            }

            const videoBlob = await downloadRes.blob();
            const localUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(localUrl);
            setIsGenerating(false);
            setPollProgress(100);
            setStatusMessage('¡Video generado con éxito!');
          } else {
            // Reassuring animated progress updates
            const estimated = Math.min(25 + attempts * 3, 85);
            setPollProgress(estimated);
            const messages = [
              'Analizando composición, iluminación y profundidad de la imagen...',
              'Sintetizando movimiento fluido con el modelo Veo de Google...',
              'Renderizando transiciones y coherencia visual en alta definición...',
              'Finalizando detalles cinemáticos del clip institucional...'
            ];
            setStatusMessage(messages[attempts % messages.length]);
          }
        } catch (pollErr: any) {
          clearInterval(pollTimerRef.current);
          setIsGenerating(false);
          setError(pollErr.message || 'Error durante el procesamiento del video.');
        }

        if (attempts >= maxAttempts) {
          clearInterval(pollTimerRef.current);
          setIsGenerating(false);
          setError('El tiempo de espera para generar el video expiró. Intenta con un prompt más breve.');
        }
      }, 5000);
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message || 'No se pudo conectar con el servicio de video Veo.');
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Animador de Fotos con Veo (Google DeepMind)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Anima Imágenes en Video
            </h1>
            <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
              Transforma fotografías, símbolos del SENA o capturas de proyectos en videos cinemáticos de alta definición con el modelo <strong>veo-3.1-fast-generate-preview</strong>. Elige relación de aspecto 16:9 o 9:16.
            </p>
          </div>

          {onReturnToDashboard && (
            <button
              onClick={onReturnToDashboard}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            >
              ← Volver al Tablero
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Upload & Controls vs Video Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Video Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Upload Photo */}
          <div className="bg-white dark:bg-[#141b16] rounded-2xl p-6 border border-stone-200/80 dark:border-[#232f27] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#39A900]" />
                <span>1. Cargar Foto Inicial</span>
              </h2>
              <button
                type="button"
                onClick={handleUseShieldImage}
                className="text-xs font-bold text-[#39A900] hover:text-[#2d8500] hover:underline cursor-pointer"
              >
                Usar Escudo SENA oficial
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-950/5 dark:bg-stone-900/50 flex flex-col items-center p-4">
                <img
                  src={selectedImage}
                  alt="Foto a animar"
                  className="max-h-64 object-contain rounded-xl shadow-xs"
                />
                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Cambiar imagen
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#39A900] dark:hover:border-[#39A900] rounded-2xl p-8 text-center cursor-pointer transition-all bg-stone-50/50 dark:bg-stone-900/30 flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    Haz clic para subir una foto o imagen
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Formatos JPG, PNG, WebP (Hasta 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card: Video Controls & Aspect Ratio */}
          <div className="bg-white dark:bg-[#141b16] rounded-2xl p-6 border border-stone-200/80 dark:border-[#232f27] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#39A900]" />
              <span>2. Parámetros del Video</span>
            </h2>

            {/* Aspect Ratio Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Formato y Relación de Aspecto
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                    aspectRatio === '16:9'
                      ? 'border-[#39A900] bg-emerald-50/60 dark:bg-emerald-950/30 text-stone-900 dark:text-white font-bold'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="w-8 h-5 rounded border-2 border-current shrink-0 flex items-center justify-center text-[9px]">
                    16:9
                  </div>
                  <div>
                    <div className="text-xs font-bold">16:9 Horizontal</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">Pantallas & YouTube</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                    aspectRatio === '9:16'
                      ? 'border-[#39A900] bg-emerald-50/60 dark:bg-emerald-950/30 text-stone-900 dark:text-white font-bold'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="w-5 h-8 rounded border-2 border-current shrink-0 flex items-center justify-center text-[9px]">
                    9:16
                  </div>
                  <div>
                    <div className="text-xs font-bold">9:16 Vertical</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">Móviles & Stories</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Prompt Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>Descripción del movimiento (Prompt opcional)</span>
                <span className="text-[10px] font-normal text-stone-500">veo-3.1-fast-generate-preview</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ejemplo: Animación cinematográfica con cámara lenta, iluminación cálida y movimiento dinámico..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#39A900]/30 resize-none"
              />

              {/* Sample prompts tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SAMPLE_SENA_PROMPTS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(sample)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer text-left"
                  >
                    + {sample.slice(0, 42)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Button */}
            <button
              type="button"
              disabled={isGenerating || !selectedImage}
              onClick={handleStartGeneration}
              className={`w-full py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isGenerating || !selectedImage
                  ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
                  : 'bg-[#39A900] hover:bg-[#2d8500] text-white shadow-emerald-900/20 active:scale-[0.99]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generando Video con Veo...</span>
                </>
              ) : (
                <>
                  <Film className="w-4 h-4" />
                  <span>Generar Video con Veo 3.1</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generation Status & Video Player (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#141b16] rounded-2xl p-6 border border-stone-200/80 dark:border-[#232f27] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display flex items-center gap-2">
              <Video className="w-5 h-5 text-[#39A900]" />
              <span>Resultado del Video</span>
            </h2>

            {/* Live Progress Card when generating */}
            {isGenerating && (
              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#39A900]" />
                    <span>Procesando generación...</span>
                  </span>
                  <span>{pollProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#39A900] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${pollProgress}%` }}
                  />
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  "{statusMessage}"
                </p>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  El proceso toma normalmente entre 30 y 90 segundos.
                </div>
              </div>
            )}

            {/* Video Player Display */}
            {videoUrl ? (
              <div className="space-y-4">
                <div
                  className={`relative rounded-2xl overflow-hidden bg-black shadow-lg mx-auto flex items-center justify-center ${
                    aspectRatio === '9:16' ? 'max-w-xs aspect-[9/16]' : 'w-full aspect-[16/9]'
                  }`}
                >
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>

                {/* Video action buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={videoUrl}
                    download="sena-video-animado.mp4"
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#39A900] hover:bg-[#2d8500] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar MP4</span>
                  </a>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pausa' : 'Reproducir'}</span>
                  </button>
                </div>
              </div>
            ) : !isGenerating ? (
              <div className="border border-stone-200 dark:border-stone-800 rounded-2xl p-8 text-center bg-stone-50/50 dark:bg-stone-900/30 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
                  <Film className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Aún no se ha generado ningún video
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 max-w-xs">
                    Sube una foto a la izquierda y pulsa "Generar Video con Veo 3.1" para ver el resultado aquí.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Institutional Specs Card */}
          <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-[#18221b] border border-stone-200/80 dark:border-[#232f27] text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
            <div className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
              Especificaciones Técnicas
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Modelo: <code>veo-3.1-fast-generate-preview</code></li>
              <li>Resolución: 720p HD nativo</li>
              <li>Formatos soportados: 16:9 (Landscape) y 9:16 (Portrait)</li>
              <li>Descarga directa en formato MP4 compatible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
