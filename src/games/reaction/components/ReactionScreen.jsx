import React from 'react';
import { Play, Clock, Zap, AlertTriangle, RefreshCw, Award } from 'lucide-react';
import { getPerformanceRating } from './ResultDisplay';

export default function ReactionScreen({ phase, reactionTime, onClick }) {
  const rating = getPerformanceRating(reactionTime);

  return (
    <div
      onClick={onClick}
      className={`
        w-full max-w-md mx-auto aspect-[4/3] rounded-3xl border-2 flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer
        transition-all duration-300 transform active:scale-[0.99] shadow-2xl relative overflow-hidden
        ${
          phase === 'idle'
            ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200'
            : phase === 'waiting'
            ? 'bg-rose-950/90 border-rose-800 text-rose-200 animate-pulse'
            : phase === 'ready'
            ? 'bg-emerald-500 border-emerald-300 text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.7)] scale-[1.02]'
            : phase === 'tooSoon'
            ? 'bg-amber-950/90 border-amber-700 text-amber-200'
            : 'bg-indigo-950/90 border-indigo-800 text-indigo-100'
        }
      `}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Phase 1: IDLE */}
      {phase === 'idle' && (
        <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 shadow-md">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Click to Start</h2>
          <p className="text-slate-600 text-xs max-w-xs font-medium">
            When the screen turns green, click as fast as you can!
          </p>
        </div>
      )}

      {/* Phase 2: WAITING (Red Screen) */}
      {phase === 'waiting' && (
        <div className="flex flex-col items-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 animate-bounce">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Wait for Green...
          </h2>
          <p className="text-white/80 text-xs font-medium">
            Don't click yet! Hold your focus.
          </p>
        </div>
      )}

      {/* Phase 3: READY (Green Screen) */}
      {phase === 'ready' && (
        <div className="flex flex-col items-center animate-in zoom-in-95 duration-100">
          <div className="w-20 h-20 rounded-full bg-slate-950/20 flex items-center justify-center mb-4 animate-ping">
            <Zap className="w-10 h-10 fill-slate-950 text-slate-950" />
          </div>
          <h2 className="text-4xl font-black text-slate-950 tracking-wider uppercase mb-1">
            CLICK NOW!
          </h2>
          <p className="text-slate-900/80 font-bold text-xs">
            Tap anywhere as fast as possible!
          </p>
        </div>
      )}

      {/* Phase 4: TOO SOON (False Start) */}
      {phase === 'tooSoon' && (
        <div className="flex flex-col items-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Too Soon!
          </h2>
          <p className="text-slate-600 text-xs mb-4 font-medium">
            You clicked before the screen turned green.
          </p>
          <span className="inline-flex items-center text-xs text-slate-900 font-bold underline underline-offset-4">
            Click to try again
          </span>
        </div>
      )}

      {/* Phase 5: CLICKED (Result Screen) */}
      {phase === 'clicked' && (
        <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-3">
            <Award className="w-7 h-7 text-white" />
          </div>

          <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 tracking-tight">
            {reactionTime} <span className="text-2xl text-slate-900 font-bold">ms</span>
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-bold border mb-4 bg-slate-100 border-slate-200 text-slate-900">
            {rating.label}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs border border-slate-900 shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
