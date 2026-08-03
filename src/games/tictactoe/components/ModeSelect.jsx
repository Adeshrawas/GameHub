import React from 'react';
import { Bot, Users, Sparkles, Gamepad2 } from 'lucide-react';

export default function ModeSelect({ onSelectMode }) {
  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white text-center shadow-xl relative overflow-hidden">
      {/* Top badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wide mb-6">
        <Sparkles className="w-3.5 h-3.5 text-slate-900" />
        <span>Classic Strategy</span>
      </div>

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 flex items-center justify-center mx-auto mb-6 text-white shadow-md">
        <Gamepad2 className="w-8 h-8" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
        Tic-Tac-Toe
      </h1>

      <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed font-medium">
        Choose your game mode to get started. Play against smart AI or challenge a friend locally on the same device!
      </p>

      {/* Mode selection options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* vs Computer Card */}
        <button
          onClick={() => onSelectMode('computer')}
          className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all duration-200 flex flex-col items-center text-left shadow-2xs hover:shadow-md focus:outline-none cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            vs Computer
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed text-center">
            Test your skills against our smart AI bot.
          </p>
        </button>

        {/* vs Local Player Card */}
        <button
          onClick={() => onSelectMode('pvp')}
          className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all duration-200 flex flex-col items-center text-left shadow-2xs hover:shadow-md focus:outline-none cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            2 Players (Local)
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed text-center">
            Pass & play locally with a friend on one device.
          </p>
        </button>
      </div>
    </div>
  );
}
