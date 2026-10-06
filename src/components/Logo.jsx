import React from 'react';

export default function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3.5 group select-none">
      {/* Exact Vector Emblem based on mockup */}
      <div className="w-16 h-12 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 120 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* --- Background High-Rise Buildings --- */}
          {/* Taller Center Building */}
          <polygon points="46,18 64,10 64,65 46,65" fill="#112038" />
          {/* Taller Building Window Accents */}
          <polygon points="51,23 59,19 59,28 51,32" fill="#E6A620" />
          <polygon points="51,36 59,32 59,42 51,46" fill="#E6A620" />
          <polygon points="51,50 59,46 59,56 51,60" fill="#E6A620" />

          {/* Right Lower Building */}
          <polygon points="65,29 78,24 78,65 65,65" fill="#1A2D4A" />
          {/* Right Building Windows */}
          <polygon points="69,34 74,32 74,40 69,42" fill="#E6A620" />
          <polygon points="69,45 74,43 74,51 69,53" fill="#E6A620" />
          <polygon points="69,56 74,54 74,62 69,64" fill="#E6A620" />

          {/* Left Angle High-Rise Shadow Edge */}
          <polygon points="40,32 46,28 46,65 40,65" fill="#0C1728" />

          {/* --- Foreground Pitched Roofs --- */}
          {/* Outer Gold Roof (Top / Outer Layer) */}
          <path
            d="M8 72 L47 30 L55 30 L93 72 L86 72 L47 35 L15 72 Z"
            fill="#E6A620"
          />

          {/* Inner Navy Roof Peak */}
          <path
            d="M16 72 L47 38 L51 38 L81 72 L73 72 L47 44 L24 72 Z"
            fill="#112038"
          />

          {/* 4-Pane Square Window Beneath Roof */}
          <rect x="40" y="55" width="6.5" height="6.5" fill="#E6A620" rx="0.5" />
          <rect x="48.5" y="55" width="6.5" height="6.5" fill="#E6A620" rx="0.5" />
          <rect x="40" y="63.5" width="6.5" height="6.5" fill="#E6A620" rx="0.5" />
          <rect x="48.5" y="63.5" width="6.5" height="6.5" fill="#E6A620" rx="0.5" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span className="font-extrabold text-[22px] tracking-tight text-[#112038] leading-none">
          ROSABE
        </span>
        <span className="font-extrabold text-[12px] text-[#112038] tracking-[0.14em] leading-tight mt-0.5">
          CONSTRUCTION
        </span>
        <span className="text-[7px] font-bold text-slate-500 tracking-[0.18em] uppercase leading-none mt-1">
          QUALITY • SAFETY • LASTING SPACES
        </span>
      </div>
    </a>
  );
}