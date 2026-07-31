import React from 'react';
import { Bot, Users, CircleDot, Sparkles } from 'lucide-react';

export default function ModeSelect({ onSelectMode }) {
  return (
    <div className="w-full max-w-lg mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-8 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <CircleDot className="w-3.5 h-3.5" />
          Game Mode
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-tight">
          Select Mode
        </h2>
        <p className="text-sm text-slate-400">
          Choose whether to challenge the computer AI or play against a local friend.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* vs Computer */}
        <button
          onClick={() => onSelectMode('computer')}
          className="group relative p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 bg-slate-950/60 hover:bg-indigo-950/30 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">vs Computer</h3>
            <p className="text-xs text-slate-400 mt-1">Play against AI bot</p>
          </div>
        </button>

        {/* Pass & Play */}
        <button
          onClick={() => onSelectMode('pvp')}
          className="group relative p-6 rounded-2xl border border-slate-800 hover:border-rose-500/50 bg-slate-950/60 hover:bg-rose-950/30 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Pass & Play</h3>
            <p className="text-xs text-slate-400 mt-1">Local 2-Player mode</p>
          </div>
        </button>
      </div>
    </div>
  );
}
