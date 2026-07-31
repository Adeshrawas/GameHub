import React from 'react';
import { Flag, Clock, Trophy, RotateCcw, Smile, Frown, Sparkles } from 'lucide-react';

export default function GameHUD({
  flagsUsed,
  mineCount,
  elapsedTime,
  bestTime,
  isGameOver,
  isWin,
  onReset,
}) {
  const flagsRemaining = Math.max(0, mineCount - flagsUsed);

  const getStatusBadge = () => {
    if (isWin) {
      return {
        text: 'VICTORY!',
        style: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        face: '😎',
      };
    }
    if (isGameOver) {
      return {
        text: 'GAME OVER',
        style: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        face: '😵',
      };
    }
    return {
      text: 'SWEEPING...',
      style: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
      face: '😃',
    };
  };

  const status = getStatusBadge();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Top HUD Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Flags Remaining */}
        <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-3 shadow-md">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Flags Left</span>
            <span className="text-xl font-black text-slate-100">{flagsRemaining}</span>
          </div>
        </div>

        {/* Status Center Button */}
        <button
          onClick={onReset}
          className={`glass-panel p-3 rounded-2xl border flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md ${status.style}`}
          title="Reset game"
        >
          <span className="text-2xl mb-0.5">{status.face}</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">{status.text}</span>
        </button>

        {/* Timer */}
        <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-3 shadow-md">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Time</span>
            <span className="text-xl font-black text-amber-400">{elapsedTime}s</span>
          </div>
        </div>
      </div>

      {/* High Score / Best Time */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-purple-400" />
          <span>Best Clear Time: <strong className="text-purple-300">{bestTime !== null ? `${bestTime}s` : 'None yet'}</strong></span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-slate-500 hover:text-indigo-400 transition-colors font-medium cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
