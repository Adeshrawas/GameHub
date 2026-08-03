import React from 'react';
import { Clock, Trophy, Flame, Play, RotateCcw, Sparkles } from 'lucide-react';

export default function GameHUD({
  score,
  streak,
  timeLeft,
  bestScore,
  isPlaying,
  onStartGame,
}) {
  if (!isPlaying && score > 0) {
    const isNewBest = score >= bestScore && score > 0;

    return (
      <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xl flex flex-col items-center text-center space-y-6 animate-fade-in">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            Time's Up!
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {isNewBest ? '🎉 New High Score!' : 'Game Over!'}
          </h2>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-black text-slate-900">{score}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 mt-1">Final Score</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-black text-slate-900">{bestScore}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 mt-1">Best Score</span>
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-black border border-slate-900 shadow-md transition-all duration-200 cursor-pointer text-base"
        >
          <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {/* Score */}
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center space-x-3 shadow-2xs">
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Score</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{score}</span>
          </div>
        </div>

        {/* Streak */}
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center space-x-3 shadow-2xs">
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Streak</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{streak}</span>
          </div>
        </div>

        {/* Time Left */}
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center space-x-3 shadow-2xs">
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Time</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {!isPlaying && score === 0 && (
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={onStartGame}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-black border border-slate-900 shadow-md transition-all duration-200 cursor-pointer text-base"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Test</span>
          </button>
        </div>
      )}
    </div>
  );
}
