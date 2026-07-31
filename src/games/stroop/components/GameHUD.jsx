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
      <div className="w-full max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 to-slate-900/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-6 animate-fade-in">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Time's Up!
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
            {isNewBest ? '🎉 New High Score!' : 'Game Over!'}
          </h2>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-indigo-500/30 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-black text-indigo-400">{score}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">Final Score</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-purple-500/30 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-black text-purple-400">{bestScore}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">Best Score</span>
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base"
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
        <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-3 shadow-md">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Score</span>
            <span className="text-xl sm:text-2xl font-black text-indigo-400">{score}</span>
          </div>
        </div>

        {/* Streak */}
        <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-3 shadow-md">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Streak</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">{streak}</span>
          </div>
        </div>

        {/* Time Left */}
        <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-3 shadow-md">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Time</span>
            <span className="text-xl sm:text-2xl font-black text-rose-400">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {!isPlaying && score === 0 && (
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={onStartGame}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Test</span>
          </button>
        </div>
      )}
    </div>
  );
}
