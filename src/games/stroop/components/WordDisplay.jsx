import React from 'react';
import { Eye } from 'lucide-react';

export default function WordDisplay({ word, displayColor }) {
  if (!word || !displayColor) return null;

  return (
    <div className="w-full p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center space-y-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider">
        <Eye className="w-3.5 h-3.5 text-slate-900" />
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
