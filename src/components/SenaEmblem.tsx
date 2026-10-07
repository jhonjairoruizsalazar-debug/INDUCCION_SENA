import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Official SENA Logosymbol (Vector SVG)
 * Exact vector path exported from Adobe Illustrator provided by SENA
 */
export const SenaLogosymbol: React.FC<LogoProps> = ({
  className = 'w-10 h-10',
  variant = 'color'
}) => {
  const fillColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#0F172A' : '#39A900';

  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logotipo Oficial SENA"
    >
      <path
        fill={fillColor}
        d="M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z"
      />
    </svg>
  );
};

/**
 * Official SENA Escudo (Vector representation of the 3 sectors)
 */
export const SenaEscudo: React.FC<{ className?: string; useImage?: boolean }> = ({
  className = 'w-16 h-16',
  useImage = true
}) => {
  if (useImage) {
    return (
      <img
        src="/escudo-sena.png"
        alt="Escudo Oficial SENA"
        className={`object-contain ${className}`}
        loading="lazy"
        onError={(e) => {
          // Fallback to SVG if image fails to load
          e.currentTarget.style.display = 'none';
          const next = e.currentTarget.nextElementSibling;
          if (next) (next as HTMLElement).style.display = 'block';
        }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 140 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Escudo Oficial SENA"
    >
      {/* Shield border */}
      <path
        d="M10 20C40 20 70 10 70 10C70 10 100 20 130 20C130 90 70 145 70 145C70 145 10 90 10 20Z"
        fill="#FFFFFF"
        stroke="#39A900"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      
      {/* Shield Header Green Banner */}
      <path
        d="M13 22C41 22 70 13 70 13C70 13 99 22 127 22C127 42 124 55 124 55H16C16 55 13 42 13 22Z"
        fill="#39A900"
      />
      <text
        x="70"
        y="42"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="17"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="2"
      >
        SENA
      </text>

      {/* Internal partition lines */}
      <line x1="70" y1="55" x2="70" y2="140" stroke="#39A900" strokeWidth="2.5" />
      <line x1="16" y1="95" x2="124" y2="95" stroke="#39A900" strokeWidth="2.5" />

      {/* Sector 1 (Top Left): Cogwheel / Industria (Sector Secundario) */}
      <g transform="translate(42, 75)">
        <circle cx="0" cy="0" r="12" fill="#F8FAFC" stroke="#047857" strokeWidth="3" />
        <circle cx="0" cy="0" r="5" fill="#047857" />
        {/* Gear teeth */}
        <path d="M-2 -15 H2 V-11 H-2 Z" fill="#047857" />
        <path d="M-2 11 H2 V15 H-2 Z" fill="#047857" />
        <path d="M-15 -2 V2 H-11 V-2 Z" fill="#047857" />
        <path d="M11 -2 V2 H15 V-2 Z" fill="#047857" />
      </g>

      {/* Sector 2 (Top Right): Coffee branch / Caduceo (Sector Primario y Agropecuario) */}
      <g transform="translate(98, 75)">
        <path d="M-12 10 Q 0 -5 12 -10" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="-6" cy="3" r="3.5" fill="#DC2626" />
        <circle cx="0" cy="-2" r="3.5" fill="#DC2626" />
        <circle cx="6" cy="-7" r="3.5" fill="#16A34A" />
      </g>

      {/* Sector 3 (Bottom): Anchor & Caduceus / Comercio y Servicios (Sector Terciario) */}
      <g transform="translate(70, 118)">
        <circle cx="0" cy="-12" r="3.5" fill="#0284C7" />
        <line x1="0" y1="-8" x2="0" y2="12" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <line x1="-7" y1="-3" x2="7" y2="-3" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <path d="M-10 4 C -7 12 7 12 10 4" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/**
 * SENA Flag representation
 */
export const SenaBandera: React.FC<{ className?: string }> = ({ className = 'w-16 h-10' }) => {
  return (
    <div className={`relative border border-stone-200 rounded overflow-hidden shadow-xs bg-white flex items-center justify-center ${className}`}>
      <SenaLogosymbol className="w-1/2 h-1/2" variant="color" />
    </div>
  );
};
