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
      <div className="w-full max-w-xl mx-auto p-6 rounded-3xl border border-slate-200 bg-white shadow-md flex flex-col items-center text-center space-y-5 animate-fade-in">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-900">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            Game Concluded
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            {isDraw ? (
              <span className="text-slate-900">It's a Draw! 🤝</span>
            ) : isPlayer1 ? (
              <span className="text-slate-900">Player 1 (Red) Wins! 🎉</span>
            ) : (
              <span className="text-slate-900">Player 2 (Yellow) Wins! 🎉</span>
            )}
          </h2>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-black border border-slate-900 shadow-md transition-all duration-200 cursor-pointer text-base"
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
        currentPlayer === 1 ? 'bg-white border-slate-900 ring-2 ring-slate-900 shadow-md' : 'bg-slate-50 border-slate-200 opacity-70'
      }`}>
        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-900 flex items-center justify-center text-white font-bold shadow-2xs">
          1
        </div>
        <div>
          <span className="text-xs uppercase font-bold text-slate-500 block">Player 1</span>
          <span className="text-sm font-black text-slate-900">Red ({stats.player1Wins} Wins)</span>
        </div>
      </div>

      {/* VS Badge */}
      <div className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-900 text-xs font-black text-white shadow-2xs">
        VS
      </div>

      {/* Player 2 Card */}
      <div className={`flex-1 p-3.5 rounded-2xl border flex items-center justify-end text-right gap-3 transition-all ${
        currentPlayer === 2 ? 'bg-white border-slate-900 ring-2 ring-slate-900 shadow-md' : 'bg-slate-50 border-slate-200 opacity-70'
      }`}>
        <div>
          <span className="text-xs uppercase font-bold text-slate-500 block">Player 2</span>
          <span className="text-sm font-black text-slate-900">Yellow ({stats.player2Wins} Wins)</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-900 flex items-center justify-center text-white font-bold shadow-2xs">
          2
        </div>
      </div>
    </div>
  );
}
