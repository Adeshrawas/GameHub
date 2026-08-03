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
        style: 'bg-slate-900 border-slate-900 text-white',
        face: '😎',
      };
    }
    if (isGameOver) {
      return {
        text: 'GAME OVER',
        style: 'bg-slate-900 border-slate-900 text-white',
        face: '😵',
      };
    }
    return {
      text: 'SWEEPING...',
      style: 'bg-white border-slate-300 text-slate-900 hover:bg-slate-100',
      face: '😃',
    };
  };

  const status = getStatusBadge();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Top HUD Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Flags Remaining */}
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center space-x-3 shadow-2xs">
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Flags Left</span>
            <span className="text-xl font-black text-slate-900">{flagsRemaining}</span>
          </div>
        </div>

        {/* Status Center Button */}
        <button
          onClick={onReset}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-2xs ${status.style}`}
          title="Reset game"
        >
          <span className="text-2xl mb-0.5">{status.face}</span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest">{status.text}</span>
        </button>

        {/* Timer */}
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center space-x-3 shadow-2xs">
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Time</span>
            <span className="text-xl font-black text-slate-900">{elapsedTime}s</span>
          </div>
        </div>
      </div>

      {/* High Score / Best Time */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-slate-900" />
          <span>Best Clear Time: <strong className="text-slate-900">{bestTime !== null ? `${bestTime}s` : 'None yet'}</strong></span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 font-bold transition-colors text-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
