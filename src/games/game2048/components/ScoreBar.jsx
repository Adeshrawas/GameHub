import React from 'react';
import { Trophy, Zap, RotateCcw } from 'lucide-react';

export default function ScoreBar({ score, bestScore, onRestart }) {
  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-between gap-3 mb-6">
      {/* Current Score Box */}
      <div className="flex-1 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Zap className="w-3 h-3" />
          Score
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {score}
        </span>
      </div>

      {/* Best Score Box */}
      <div className="flex-1 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center text-center">
        <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
          <Trophy className="w-3 h-3" />
          Best
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-amber-300 tracking-tight">
          {bestScore}
        </span>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 shadow-xl transition-all duration-200 group active:scale-95 flex items-center justify-center"
        title="Start New Game"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-90 duration-300" />
      </button>
    </div>
  );
}
