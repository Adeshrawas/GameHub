import React from 'react';
import { Trophy, Zap, RotateCcw } from 'lucide-react';

export default function ScoreBar({ score, bestScore, onRestart }) {
  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-between gap-3 mb-6">
      {/* Current Score Box */}
      <div className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Zap className="w-3 h-3 text-slate-900" />
          Score
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {score}
        </span>
      </div>

      {/* Best Score Box */}
      <div className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Trophy className="w-3 h-3 text-slate-900" />
          Best
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {bestScore}
        </span>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="p-3.5 rounded-2xl bg-slate-900 hover:bg-black border border-slate-900 text-white shadow-2xs transition-all duration-200 group cursor-pointer active:scale-95 flex items-center justify-center"
        title="Start New Game"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-90 duration-300" />
      </button>
    </div>
  );
}
