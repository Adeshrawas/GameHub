import React from 'react';
import { X, Circle } from 'lucide-react';

export default function Cell({ value, onClick, isWinningCell, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        aspect-square rounded-2xl flex items-center justify-center text-4xl font-extrabold
        transition-all duration-300 transform border focus:outline-none focus:ring-2 focus:ring-amber-500/40
        ${
          isWinningCell
            ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-[1.03] z-10 animate-pulse'
            : value === null && !disabled
            ? 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60 active:scale-95'
            : 'bg-slate-900/70 border-slate-800/80 cursor-not-allowed'
        }
      `}
    >
      {value === 'X' && (
        <X className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 stroke-[3] drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-in zoom-in-75 duration-200" />
      )}
      {value === 'O' && (
        <Circle className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400 stroke-[3] drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-in zoom-in-75 duration-200" />
      )}
    </button>
  );
}
