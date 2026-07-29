import React from 'react';
import { Trophy, RefreshCw, Layers, Award } from 'lucide-react';

export default function ResultBanner({ winner, isDraw, mode, onPlayAgain, onChangeMode }) {
  if (!winner && !isDraw) return null;

  let title = "It's a Draw!";
  let subtitle = "Well matched! Neither player was defeated.";
  let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
  let titleColor = "text-slate-200";

  if (winner === 'X') {
    title = mode === 'computer' ? 'You Win! 🎉' : 'Player X Wins! 🎉';
    subtitle = mode === 'computer' ? 'Great strategy! You beat the AI.' : 'Congratulations to Player X!';
    badgeColor = "bg-amber-500/20 text-amber-400 border-amber-500/30";
    titleColor = "text-amber-400";
  } else if (winner === 'O') {
    title = mode === 'computer' ? 'Computer Wins! 🤖' : 'Player O Wins! 🎉';
    subtitle = mode === 'computer' ? 'Better luck next time against the AI.' : 'Congratulations to Player O!';
    badgeColor = "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    titleColor = "text-cyan-400";
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-4 ${badgeColor}`}>
        <Award className="w-4 h-4" />
        <span>Match Complete</span>
      </div>

      <h2 className={`text-2xl sm:text-3xl font-extrabold mb-1 ${titleColor}`}>
        {title}
      </h2>
      
      <p className="text-slate-400 text-xs sm:text-sm mb-6">
        {subtitle}
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <button
          onClick={onChangeMode}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95"
        >
          <Layers className="w-4 h-4" />
          <span>Change Mode</span>
        </button>
      </div>
    </div>
  );
}
