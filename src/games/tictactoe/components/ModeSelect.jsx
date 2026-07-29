import React from 'react';
import { Bot, Users, Sparkles, Gamepad2 } from 'lucide-react';

export default function ModeSelect({ onSelectMode }) {
  return (
    <div className="w-full max-w-xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 text-center shadow-2xl relative overflow-hidden">
      {/* Glow effect background element */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wide mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Classic Strategy</span>
      </div>

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-lg shadow-amber-500/10">
        <Gamepad2 className="w-8 h-8" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
        Tic-Tac-Toe
      </h1>

      <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        Choose your game mode to get started. Play against smart AI or challenge a friend locally on the same device!
      </p>

      {/* Mode selection options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* vs Computer Card */}
        <button
          onClick={() => onSelectMode('computer')}
          className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300 flex flex-col items-center text-left hover:shadow-xl hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors mb-1">
            vs Computer
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed text-center">
            Test your skills against our smart AI bot.
          </p>
        </button>

        {/* vs Local Player Card */}
        <button
          onClick={() => onSelectMode('pvp')}
          className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 flex flex-col items-center text-left hover:shadow-xl hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-1">
            2 Players (Local)
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed text-center">
            Pass & play locally with a friend on one device.
          </p>
        </button>
      </div>
    </div>
  );
}
