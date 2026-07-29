import React from 'react';
import { Timer, Trophy, Zap } from 'lucide-react';

/**
 * Returns performance evaluation badge text and color styling.
 * @param {number|null} timeMs 
 * @returns {{ label: string, color: string }}
 */
export function getPerformanceRating(timeMs) {
  if (!timeMs) return { label: 'Ready', color: 'text-slate-400 border-slate-700 bg-slate-800' };

  if (timeMs < 200) {
    return { label: '⚡ Superhuman Speed!', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
  } else if (timeMs < 250) {
    return { label: '🚀 Lightning Fast!', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
  } else if (timeMs < 320) {
    return { label: '⏱️ Good Reflexes', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' };
  } else {
    return { label: '🐢 Needs Practice', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' };
  }
}

export default function ResultDisplay({ reactionTime, bestTime }) {
  const rating = getPerformanceRating(reactionTime);

  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3 mb-6">
      {/* Current Time */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Zap className="w-3.5 h-3.5" />
          Last Time
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {reactionTime ? `${reactionTime} ms` : '—'}
        </span>
      </div>

      {/* Best Time */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Trophy className="w-3.5 h-3.5" />
          Best Time
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-amber-300 tracking-tight">
          {bestTime ? `${bestTime} ms` : '—'}
        </span>
      </div>
    </div>
  );
}
