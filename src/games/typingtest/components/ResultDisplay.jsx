import React from 'react';
import { RotateCcw, Trophy, Zap, Target, Clock, Sparkles } from 'lucide-react';

export default function ResultDisplay({ stats, bestWpm, onTryAgain, isComplete }) {
  const { wpm, accuracy, timeInSeconds } = stats;

  if (isComplete) {
    const isNewBest = wpm > 0 && wpm >= bestWpm;

    return (
      <div className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 to-slate-900/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Test Complete!
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            {isNewBest ? '🎉 New Personal Record!' : 'Great Typing!'}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
          {/* WPM */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-indigo-500/30 flex flex-col items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400 mb-1" />
            <span className="text-3xl sm:text-5xl font-black text-indigo-300">{wpm}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">WPM</span>
          </div>

          {/* Accuracy */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-emerald-500/30 flex flex-col items-center justify-center">
            <Target className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-3xl sm:text-5xl font-black text-emerald-300">{accuracy}%</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">Accuracy</span>
          </div>

          {/* Time */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex flex-col items-center justify-center">
            <Clock className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-3xl sm:text-5xl font-black text-amber-300">{timeInSeconds}s</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">Time</span>
          </div>
        </div>

        {/* Best WPM Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold">
          <Trophy className="w-4 h-4 text-purple-400" />
          <span>All-Time Best: <strong>{bestWpm} WPM</strong></span>
        </div>

        {/* Try Again Action Button */}
        <button
          onClick={onTryAgain}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base"
        >
          <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  // Live statistics banner while typing
  return (
    <div className="w-full grid grid-cols-3 gap-3 max-w-xl">
      <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 block">Speed</span>
          <span className="text-xl sm:text-2xl font-black text-indigo-400">{wpm} <span className="text-xs font-medium text-slate-400">WPM</span></span>
        </div>
        <Zap className="w-5 h-5 text-indigo-400/60 hidden sm:block" />
      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 block">Accuracy</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400">{accuracy}%</span>
        </div>
        <Target className="w-5 h-5 text-emerald-400/60 hidden sm:block" />
      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 block">Best WPM</span>
          <span className="text-xl sm:text-2xl font-black text-purple-400">{bestWpm}</span>
        </div>
        <Trophy className="w-5 h-5 text-purple-400/60 hidden sm:block" />
      </div>
    </div>
  );
}
