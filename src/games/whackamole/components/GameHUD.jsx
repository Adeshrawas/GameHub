import React from 'react';
import { Trophy, Timer, Play, RotateCcw, Flame, Target } from 'lucide-react';

export default function GameHUD({
  score,
  bestScore,
  timeLeft,
  totalDuration = 30,
  isPlaying,
  combo = 0,
  onStart,
}) {
  const timePercentage = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));

  // Determine progress bar color based on time left
  let progressColor = 'from-emerald-500 to-teal-400';
  if (timeLeft <= 10 && timeLeft > 5) {
    progressColor = 'from-amber-500 to-yellow-400';
  } else if (timeLeft <= 5) {
    progressColor = 'from-rose-500 to-pink-500';
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6 flex flex-col gap-4">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Score Card */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Score
              </span>
              <span className="text-xl font-black text-slate-900">{score}</span>
            </div>
          </div>
          {combo > 2 && (
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-900 text-white text-xs font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5 text-white" />
              <span>x{combo}</span>
            </div>
          )}
        </div>

        {/* Best Score Card */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center space-x-2.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Best Score
            </span>
            <span className="text-xl font-black text-slate-900">{bestScore}</span>
          </div>
        </div>
      </div>

      {/* Timer & Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-700 font-semibold text-sm">
            <Timer className={`w-4 h-4 ${timeLeft <= 5 && isPlaying ? 'text-slate-900 animate-spin' : 'text-slate-900'}`} />
            <span>Time Remaining:</span>
            <span className={`font-mono font-bold text-base ${timeLeft <= 5 ? 'text-slate-900 animate-pulse' : 'text-slate-900'}`}>
              {timeLeft}s
            </span>
          </div>

          <button
            onClick={onStart}
            className="px-4 py-2 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all duration-200 bg-slate-900 hover:bg-black text-white border border-slate-900 shadow-2xs cursor-pointer"
          >
            {isPlaying ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{score > 0 || timeLeft < totalDuration ? 'Play Again' : 'Start Game'}</span>
              </>
            )}
          </button>
        </div>

        {/* Time Remaining Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-300 ease-linear rounded-full"
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
