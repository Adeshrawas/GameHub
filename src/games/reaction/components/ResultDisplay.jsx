import React from 'react';
import { Timer, Trophy, Zap } from 'lucide-react';

/**
 * Returns performance evaluation badge text and color styling.
 * @param {number|null} timeMs 
 * @returns {{ label: string, color: string }}
 */
export function getPerformanceRating(timeMs) {
  if (!timeMs) return { label: 'Ready', color: 'text-slate-900 border-slate-200 bg-slate-100' };

  if (timeMs < 200) {
    return { label: '⚡ Superhuman Speed!', color: 'text-slate-900 border-slate-900 bg-slate-900 text-white' };
  } else if (timeMs < 250) {
    return { label: '🚀 Lightning Fast!', color: 'text-slate-900 border-slate-300 bg-slate-100 font-bold' };
  } else if (timeMs < 320) {
    return { label: '⏱️ Good Reflexes', color: 'text-slate-900 border-slate-200 bg-slate-50 font-bold' };
  } else {
    return { label: '🐢 Needs Practice', color: 'text-slate-900 border-slate-200 bg-slate-50' };
  }
}

export default function ResultDisplay({ reactionTime, bestTime }) {
  const rating = getPerformanceRating(reactionTime);

  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3 mb-6">
      {/* Current Time */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Zap className="w-3.5 h-3.5 text-slate-900" />
          Last Time
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {reactionTime ? `${reactionTime} ms` : '—'}
        </span>
      </div>

      {/* Best Time */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Trophy className="w-3.5 h-3.5 text-slate-900" />
          Best Time
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {bestTime ? `${bestTime} ms` : '—'}
        </span>
      </div>
    </div>
  );
}
