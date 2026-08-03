import React from 'react';
import { Bot, Users, CircleDot, Sparkles } from 'lucide-react';

export default function ModeSelect({ onSelectMode }) {
  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col items-center text-center space-y-8 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider">
          <CircleDot className="w-3.5 h-3.5 text-slate-900" />
          Game Mode
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Select Mode
        </h2>
        <p className="text-sm text-slate-600 font-medium">
          Choose whether to challenge the computer AI or play against a local friend.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* vs Computer */}
        <button
          onClick={() => onSelectMode('computer')}
          className="group relative p-6 rounded-2xl border border-slate-200 hover:border-slate-900 bg-white hover:bg-slate-50 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:-translate-y-1 shadow-2xs hover:shadow-md"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">vs Computer</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Play against AI bot</p>
          </div>
        </button>

        {/* Pass & Play */}
        <button
          onClick={() => onSelectMode('pvp')}
          className="group relative p-6 rounded-2xl border border-slate-200 hover:border-slate-900 bg-white hover:bg-slate-50 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:-translate-y-1 shadow-2xs hover:shadow-md"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Pass & Play</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Local 2-Player mode</p>
          </div>
        </button>
      </div>
    </div>
  );
}
