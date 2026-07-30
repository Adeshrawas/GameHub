import React from 'react';

export default function Hole({ index, isActive, isWhacked, onClick, disabled }) {
  return (
    <div
      onClick={() => !disabled && onClick(index)}
      className={`relative w-full aspect-square rounded-2xl bg-gradient-to-b from-amber-950/80 to-slate-950 p-2 border border-amber-900/40 shadow-inner flex flex-col justify-end items-center overflow-hidden cursor-pointer select-none group transition-all duration-150 ${
        disabled ? 'cursor-not-allowed opacity-80' : 'hover:border-amber-500/50 hover:shadow-amber-900/20'
      }`}
    >
      {/* Hole Rim & Pit Shadow */}
      <div className="absolute inset-x-2 bottom-2 h-3/5 rounded-full bg-slate-950/90 shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)] border-t border-amber-950/80" />

      {/* Grass / Dirt Mound Backdrop */}
      <div className="absolute inset-x-1 bottom-1 h-1/3 rounded-b-xl bg-gradient-to-t from-emerald-950/90 via-amber-950/80 to-transparent pointer-events-none z-10" />

      {/* Mole Container */}
      <div
        className={`relative z-0 w-4/5 h-4/5 flex flex-col items-center justify-end transition-transform duration-200 ease-out ${
          isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-90'
        }`}
      >
        {/* Mole Character SVG */}
        <div className="relative w-full h-full flex items-end justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`moleGrad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6d28d9" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id={`snoutGrad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id={`helmetGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            {/* Mole Body / Head */}
            <path
              d="M 20 90 C 20 30, 80 30, 80 90 Z"
              fill={`url(#moleGrad-${index})`}
              stroke="#4c1d95"
              strokeWidth="3"
            />

            {/* Helmet / Hat */}
            <path
              d="M 22 42 C 22 18, 78 18, 78 42 Z"
              fill={`url(#helmetGrad-${index})`}
              stroke="#b45309"
              strokeWidth="2"
            />
            <rect x="18" y="40" width="64" height="6" rx="3" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="50" cy="30" r="5" fill="#fef08a" />

            {/* Ears */}
            <circle cx="24" cy="52" r="7" fill="#6d28d9" />
            <circle cx="24" cy="52" r="4" fill="#f472b6" />
            <circle cx="76" cy="52" r="7" fill="#6d28d9" />
            <circle cx="76" cy="52" r="4" fill="#f472b6" />

            {/* Eyes */}
            <circle cx="38" cy="54" r="5" fill="#ffffff" />
            <circle cx="62" cy="54" r="5" fill="#ffffff" />
            <circle cx="40" cy="54" r="2.5" fill="#0f172a" />
            <circle cx="60" cy="54" r="2.5" fill="#0f172a" />
            {/* Eye sparkle */}
            <circle cx="41" cy="53" r="1" fill="#ffffff" />
            <circle cx="61" cy="53" r="1" fill="#ffffff" />

            {/* Snout & Nose */}
            <ellipse cx="50" cy="66" rx="14" ry="10" fill={`url(#snoutGrad-${index})`} />
            <ellipse cx="50" cy="62" rx="6" ry="4" fill="#831843" />

            {/* Cute Cheeks */}
            <circle cx="32" cy="64" r="4" fill="#f472b6" opacity="0.6" />
            <circle cx="68" cy="64" r="4" fill="#f472b6" opacity="0.6" />

            {/* Paws */}
            <ellipse cx="30" cy="85" rx="8" ry="6" fill="#6d28d9" stroke="#4c1d95" strokeWidth="1.5" />
            <ellipse cx="70" cy="85" rx="8" ry="6" fill="#6d28d9" stroke="#4c1d95" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Hit / Whack Splash Animation */}
      {isWhacked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none animate-bounce">
          <div className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-sm rounded-full shadow-lg border-2 border-amber-200 transform -rotate-6 tracking-wider animate-in zoom-in duration-150">
            WHACK! +1
          </div>
          <div className="text-amber-300 text-xs font-extrabold tracking-widest mt-0.5 drop-shadow-md">
            ✨ POP!
          </div>
        </div>
      )}
    </div>
  );
}
