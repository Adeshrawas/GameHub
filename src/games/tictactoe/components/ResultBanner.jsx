import React from 'react';
import { Trophy, RefreshCw, Layers, Award } from 'lucide-react';

export default function ResultBanner({ winner, isDraw, mode, onPlayAgain, onChangeMode }) {
  if (!winner && !isDraw) return null;

  let title = "It's a Draw!";
  let subtitle = "Well matched! Neither player was defeated.";
  let badgeColor = "bg-slate-100 text-slate-900 border-slate-200";
  let titleColor = "text-slate-900";

  if (winner === 'X') {
    title = mode === 'computer' ? 'You Win! 🎉' : 'Player X Wins! 🎉';
    subtitle = mode === 'computer' ? 'Great strategy! You beat the AI.' : 'Congratulations to Player X!';
  } else if (winner === 'O') {
    title = mode === 'computer' ? 'Computer Wins! 🤖' : 'Player O Wins! 🎉';
    subtitle = mode === 'computer' ? 'Better luck next time against the AI.' : 'Congratulations to Player O!';
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-6 rounded-3xl bg-white border border-slate-200 backdrop-blur-md shadow-xl text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-4 ${badgeColor}`}>
        <Award className="w-4 h-4 text-slate-900" />
        <span>Match Complete</span>
      </div>

      <h2 className={`text-2xl sm:text-3xl font-extrabold mb-1 ${titleColor}`}>
        {title}
      </h2>
      
      <p className="text-slate-600 text-xs sm:text-sm mb-6 font-medium">
        {subtitle}
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm border border-slate-900 shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <button
          onClick={onChangeMode}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm border border-slate-300 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Layers className="w-4 h-4 text-slate-900" />
          <span>Change Mode</span>
        </button>
      </div>
    </div>
  );
}
