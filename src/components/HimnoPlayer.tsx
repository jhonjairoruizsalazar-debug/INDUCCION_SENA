import React, { useState, useEffect, useRef } from 'react';
import { HYMN_VERSES } from '../data/senaData';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export const HimnoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  // Web Audio API Synth reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Melodic notes sequence simulating the triumphant march cadence of Himno SENA
  const melodyNotes = [
    261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 349.23,
    392.00, 440.00, 523.25, 440.00, 392.00, 349.23, 329.63, 261.63
  ];
  const noteIndexRef = useRef(0);

  const playNote = (freq: number) => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch (e) {
      // AudioContext policy catch
    }
  };

  const startAudioSynth = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    noteIndexRef.current = 0;
    oscillatorIntervalRef.current = setInterval(() => {
      const freq = melodyNotes[noteIndexRef.current % melodyNotes.length];
      playNote(freq);
      noteIndexRef.current++;
    }, 700);
  };

  const stopAudioSynth = () => {
    if (oscillatorIntervalRef.current) {
      clearInterval(oscillatorIntervalRef.current);
      oscillatorIntervalRef.current = null;
    }
  };

  useEffect(() => {
    let verseTimer: NodeJS.Timeout;
    let lineTimer: NodeJS.Timeout;

    if (isPlaying) {
      startAudioSynth();

      lineTimer = setInterval(() => {
        setCurrentLineIndex((prev) => (prev + 1) % 4);
      }, 1500);

      verseTimer = setInterval(() => {
        setCurrentVerseIndex((prev) => (prev + 1) % HYMN_VERSES.length);
      }, 6000);
    } else {
      stopAudioSynth();
    }

    return () => {
      clearInterval(verseTimer);
      clearInterval(lineTimer);
      stopAudioSynth();
    };
  }, [isPlaying, isMuted, volume]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentVerseIndex(0);
    setCurrentLineIndex(0);
    stopAudioSynth();
  };

  const currentVerse = HYMN_VERSES[currentVerseIndex];

  return (
    <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-900/60 dark:border-emerald-800/40">
      {/* Header with Protocol Note */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-emerald-900/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Símbolo Cívico Institucional
            </span>
            <span className="text-[10px] bg-emerald-900/70 border border-emerald-700/80 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
              Protocolo Solemne
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display mt-1 text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-emerald-400" />
            <span>Himno del SENA</span>
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            Letra: Jesús René Bermúdez · Música: Daniel Marlez · Canto oficial de la juventud trabajadora
          </p>
        </div>

        {/* Audio Player Controls */}
        <div className="flex items-center gap-3 bg-stone-900/90 p-2 rounded-xl border border-emerald-800/60 shadow-inner">
          <button
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-lg text-xs font-bold transition-all shadow-md"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pausar' : 'Entonar Himno'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            title="Reiniciar Himno"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-stone-700">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-stone-300 hover:text-emerald-400 transition-colors"
              title={isMuted ? 'Activar Sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              title={`Volumen: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>
      </div>

      {/* Synchronized Karaoke / Interactive Stanza Display */}
      <div className="my-6 p-6 rounded-xl bg-stone-900/80 border border-emerald-800/60 text-center relative overflow-hidden">
        {isPlaying && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Audio Activo</span>
          </div>
        )}

        <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
          {currentVerse.type}
        </span>

        <div className="mt-4 space-y-2 max-w-xl mx-auto">
          {currentVerse.lyrics.map((line, lIdx) => {
            const isLineActive = isPlaying && currentLineIndex === lIdx;
            return (
              <p
                key={lIdx}
                className={`text-base sm:text-lg font-medium transition-all duration-300 ${
                  isLineActive
                    ? 'text-emerald-300 font-bold scale-105 drop-shadow-[0_2px_10px_rgba(52,211,153,0.4)]'
                    : 'text-stone-300 opacity-80'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>

      {/* Stanza Navigation Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {HYMN_VERSES.map((verse, idx) => {
          const isSelected = currentVerseIndex === idx;
          return (
            <button
              key={verse.type}
              onClick={() => {
                setCurrentVerseIndex(idx);
                setCurrentLineIndex(0);
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-emerald-950 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                  : 'bg-stone-900/60 border-stone-800 hover:bg-stone-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase ${
                    isSelected ? 'text-emerald-400' : 'text-stone-400'
                  }`}
                >
                  {verse.type}
                </span>
                {isSelected && <Sparkles className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-stone-300 truncate">
                {verse.lyrics[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Protocol & Civic Etiquette Notice */}
      <div className="mt-6 pt-4 border-t border-emerald-900/80 flex items-center justify-between text-[11px] text-stone-400">
        <span className="italic">
          "En todo acto oficial, los aprendices se pondrán de pie en posición de respeto para entonar el Himno del SENA."
        </span>
        <span className="font-mono text-emerald-400 shrink-0 hidden sm:inline">
          Formación Integral con Amor Patrio
        </span>
      </div>
    </div>
  );
};
