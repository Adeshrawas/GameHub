import React from 'react';

const COLOR_CONFIG = [
  {
    id: 'green',
    label: 'Green',
    cornerClass: 'rounded-tl-full',
    normalStyle: 'bg-emerald-600/80 border-emerald-500/60 text-emerald-100 hover:bg-emerald-500',
    activeStyle: 'bg-emerald-300 border-emerald-100 text-slate-950 scale-105 z-10 shadow-[0_0_60px_rgba(52,211,153,1)] brightness-150 ring-4 ring-emerald-300'
  },
  {
    id: 'red',
    label: 'Red',
    cornerClass: 'rounded-tr-full',
    normalStyle: 'bg-rose-600/80 border-rose-500/60 text-rose-100 hover:bg-rose-500',
    activeStyle: 'bg-rose-300 border-rose-100 text-slate-950 scale-105 z-10 shadow-[0_0_60px_rgba(251,113,133,1)] brightness-150 ring-4 ring-rose-300'
  },
  {
    id: 'yellow',
    label: 'Yellow',
    cornerClass: 'rounded-bl-full',
    normalStyle: 'bg-amber-500/80 border-amber-400/60 text-amber-100 hover:bg-amber-400',
    activeStyle: 'bg-amber-200 border-amber-100 text-slate-950 scale-105 z-10 shadow-[0_0_60px_rgba(253,224,71,1)] brightness-150 ring-4 ring-amber-200'
  },
  {
    id: 'blue',
    label: 'Blue',
    cornerClass: 'rounded-br-full',
    normalStyle: 'bg-cyan-600/80 border-cyan-500/60 text-cyan-100 hover:bg-cyan-500',
    activeStyle: 'bg-cyan-200 border-cyan-100 text-slate-950 scale-105 z-10 shadow-[0_0_60px_rgba(103,232,249,1)] brightness-150 ring-4 ring-cyan-200'
  }
];

export default function ColorPad({ activeColor, onColorClick, disabled, phase }) {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto p-3 rounded-full bg-slate-900 border-4 border-slate-800 shadow-2xl flex items-center justify-center">
      {/* 2x2 Circular Color Pads Grid */}
      <div className="w-full h-full grid grid-cols-2 gap-3 rounded-full overflow-hidden p-1">
        {COLOR_CONFIG.map((pad) => {
          const isActive = activeColor === pad.id;

          return (
            <button
              key={pad.id}
              onClick={() => !disabled && onColorClick(pad.id)}
              disabled={disabled}
              aria-label={`Color pad ${pad.label}`}
              className={`
                relative w-full h-full transition-all duration-150 border-2 backdrop-blur-sm cursor-pointer
                ${pad.cornerClass}
                ${isActive ? pad.activeStyle : pad.normalStyle}
                ${disabled ? 'cursor-not-allowed opacity-80' : 'active:scale-95'}
              `}
            />
          );
        })}
      </div>

      {/* Central Arcade Hub Ring */}
      <div className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950 border-4 border-slate-800 shadow-inner flex flex-col items-center justify-center p-2 z-20 pointer-events-none">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">SIMON</div>
        <div className={`w-3 h-3 rounded-full my-1 transition-all ${
          phase === 'playback' ? 'bg-amber-400 animate-ping' :
          phase === 'playerTurn' ? 'bg-emerald-400 animate-pulse' :
          phase === 'gameOver' ? 'bg-rose-500' : 'bg-slate-700'
        }`} />
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {phase === 'playback' ? 'WATCH' : phase === 'playerTurn' ? 'REPEAT' : phase === 'gameOver' ? 'LOST' : 'READY'}
        </div>
      </div>
    </div>
  );
}
