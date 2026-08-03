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
        <div className="p-3 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <Trophy className="w-4 h-4 text-slate-900 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-slate-900">{score}</span>
          <span className="text-[10px] uppercase font-bold text-slate-500">Score</span>
        </div>

        {/* Words Solved */}
        <div className="p-3 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <CheckCircle className="w-4 h-4 text-slate-900 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-slate-900">{wordsCompleted}</span>
          <span className="text-[10px] uppercase font-bold text-slate-500">Solved</span>
        </div>

        {/* Hints Used */}
        <div className="p-3 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <Lightbulb className="w-4 h-4 text-slate-900 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-slate-900">{hintsUsed}</span>
          <span className="text-[10px] uppercase font-bold text-slate-500">Hints</span>
        </div>

        {/* Timer */}
        <div className="p-3 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <Clock className="w-4 h-4 text-slate-900 mb-1" />
          <span className="text-lg sm:text-2xl font-black text-slate-900">{elapsedTime}s</span>
          <span className="text-[10px] uppercase font-bold text-slate-500">Time</span>
        </div>
      </div>

      {/* High Score Bar */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-slate-900" />
          <span>All-Time Best Score: <strong className="text-slate-900">{bestScore} pts</strong></span>
        </div>

        <button
          onClick={onNewGame}
          className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 font-bold transition-colors text-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
