import React from 'react';

export default function ScrambledWord({ scrambledWord, currentWord, revealedLetters }) {
  if (!scrambledWord) return null;

  const scrambledChars = scrambledWord.split('');
  const targetChars = currentWord.toUpperCase().split('');

  return (
    <div className="w-full p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col items-center space-y-6">
      <span className="text-xs uppercase font-bold tracking-widest text-slate-500">
        Unscramble the Letters
      </span>

      {/* Scrambled Tile Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {scrambledChars.map((char, index) => (
          <div
            key={index}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border border-slate-900 shadow-md flex items-center justify-center text-xl sm:text-3xl font-black text-white transform transition-transform hover:scale-105 select-none"
          >
            {char}
          </div>
        ))}
      </div>

      {/* Revealed Hint Letter Track (if hints used) */}
      {revealedLetters.length > 0 && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-slate-500 uppercase font-semibold">Revealed Hint:</span>
          <div className="flex gap-1.5 font-mono text-base font-bold text-slate-900">
            {targetChars.map((char, idx) => (
              <span
                key={idx}
                className={`w-7 h-8 rounded border flex items-center justify-center ${
                  revealedLetters.includes(idx)
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-400'
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
