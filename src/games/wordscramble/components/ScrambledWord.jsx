import React from 'react';

export default function ScrambledWord({ scrambledWord, currentWord, revealedLetters }) {
  if (!scrambledWord) return null;

  const scrambledChars = scrambledWord.split('');
  const targetChars = currentWord.toUpperCase().split('');

  return (
    <div className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl flex flex-col items-center space-y-6">
      <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
        Unscramble the Letters
      </span>

      {/* Scrambled Tile Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {scrambledChars.map((char, index) => (
          <div
            key={index}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-purple-600/20 border border-indigo-500/40 shadow-lg flex items-center justify-center text-xl sm:text-3xl font-black text-indigo-300 transform transition-transform hover:scale-110 select-none"
          >
            {char}
          </div>
        ))}
      </div>

      {/* Revealed Hint Letter Track (if hints used) */}
      {revealedLetters.length > 0 && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 uppercase font-semibold">Revealed Hint:</span>
          <div className="flex gap-1.5 font-mono text-base font-bold text-emerald-400">
            {targetChars.map((char, idx) => (
              <span
                key={idx}
                className={`w-7 h-8 rounded border flex items-center justify-center ${
                  revealedLetters.includes(idx)
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-600'
                }`}
              >
                {revealedLetters.includes(idx) ? char : '_'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
