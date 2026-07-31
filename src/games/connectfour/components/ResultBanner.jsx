import React from 'react';
import { Trophy, RotateCcw, Sparkles, Equal, User } from 'lucide-react';

export default function ResultBanner({
  winner,
  isDraw,
  currentPlayer,
  onPlayAgain,
  stats,
}) {
  if (winner || isDraw) {
    const isPlayer1 = winner === 1;

    return (
      <div className="w-full max-w-xl mx-auto glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-5 animate-fade-in">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Game Concluded
          </div>
          <h2 className="text-3xl font-black tracking-tight">
            {isDraw ? (
              <span className="text-amber-300">It's a Draw! 🤝</span>
            ) : isPlayer1 ? (
              <span className="text-rose-400">Player 1 (Red) Wins! 🎉</span>
            ) : (
              <span className="text-amber-400">Player 2 (Yellow) Wins! 🎉</span>
            )}
          </h2>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base"
        >
          <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  // Active Turn Indicator Banner
  return (
    <div className="w-full max-w-xl mx-auto flex items-center justify-between gap-4">
      {/* Player 1 Card */}
      <div className={`flex-1 p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
        currentPlayer === 1 ? 'bg-rose-500/10 border-rose-500/40 ring-2 ring-rose-400' : 'bg-slate-900/40 border-slate-800 opacity-60'
      }`}>
        <div className="w-8 h-8 rounded-full bg-rose-500 border border-rose-400 flex items-center justify-center text-white font-bold shadow-md">
          1
        </div>
        <div>
          <span className="text-xs uppercase font-bold text-slate-400 block">Player 1</span>
          <span className="text-sm font-black text-rose-400">Red ({stats.player1Wins} Wins)</span>
        </div>
      </div>

      {/* VS Badge */}
      <div className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-black text-slate-400">
        VS
      </div>

      {/* Player 2 Card */}
      <div className={`flex-1 p-3.5 rounded-2xl border flex items-center justify-end text-right gap-3 transition-all ${
        currentPlayer === 2 ? 'bg-amber-500/10 border-amber-500/40 ring-2 ring-amber-400' : 'bg-slate-900/40 border-slate-800 opacity-60'
      }`}>
        <div>
          <span className="text-xs uppercase font-bold text-slate-400 block">Player 2</span>
          <span className="text-sm font-black text-amber-400">Yellow ({stats.player2Wins} Wins)</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-amber-400 border border-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md">
          2
        </div>
      </div>
    </div>
  );
}
