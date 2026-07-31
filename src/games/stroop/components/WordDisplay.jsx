import React from 'react';
import { Eye } from 'lucide-react';

export default function WordDisplay({ word, displayColor }) {
  if (!word || !displayColor) return null;

  return (
    <div className="w-full glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center space-y-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-semibold uppercase tracking-wider">
        <Eye className="w-3.5 h-3.5 text-indigo-400" />
        Click the TEXT COLOR (Not the Word)
      </div>

      <div className="my-4 transition-transform transform hover:scale-105 duration-200">
        <span className={`text-5xl sm:text-7xl font-black tracking-widest drop-shadow-lg ${displayColor.textClass}`}>
          {word.name}
        </span>
      </div>
    </div>
  );
}
