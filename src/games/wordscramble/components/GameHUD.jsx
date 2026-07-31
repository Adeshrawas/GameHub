import React from 'react';
import { Trophy, Clock, Lightbulb, CheckCircle, RotateCcw } from 'lucide-react';

export default function GameHUD({
  score,
  wordsCompleted,
  hintsUsed,
  elapsedTime,
  bestScore,
  onNewGame,
}) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {/* Score */}
        <div className="glass-panel p-3 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center text-center shadow-md">
          <Trophy className="w-4 h-4 text-indigo-400 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-indigo-400">{score}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
        </div>

        {/* Words Solved */}
        <div className="glass-panel p-3 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center text-center shadow-md">
          <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-emerald-400">{wordsCompleted}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Solved</span>
        </div>

        {/* Hints Used */}
        <div className="glass-panel p-3 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center text-center shadow-md">
          <Lightbulb className="w-4 h-4 text-amber-400 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-amber-400">{hintsUsed}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Hints</span>
        </div>

        {/* Timer */}
        <div className="glass-panel p-3 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center text-center shadow-md">
          <Clock className="w-4 h-4 text-rose-400 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-rose-400">{elapsedTime}s</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Time</span>
        </div>
      </div>

      {/* High Score Bar */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-purple-400" />
          <span>All-Time Best Score: <strong className="text-purple-300">{bestScore} pts</strong></span>
        </div>

        <button
          onClick={onNewGame}
          className="flex items-center space-x-1 text-slate-500 hover:text-indigo-400 transition-colors text-xs font-medium cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
