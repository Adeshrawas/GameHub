import React from 'react';
import { ArrowUpRight, ArrowDownRight, CheckCircle2, History, Sparkles, Trophy } from 'lucide-react';

const HINT_CONFIG = {
  high: {
    label: 'Too High',
    badge: 'bg-slate-100 text-slate-900 border-slate-300 font-bold',
    icon: ArrowUpRight,
  },
  low: {
    label: 'Too Low',
    badge: 'bg-slate-100 text-slate-900 border-slate-300 font-bold',
    icon: ArrowDownRight,
  },
  correct: {
    label: 'Correct!',
    badge: 'bg-slate-900 text-white border-slate-900 font-bold',
    icon: CheckCircle2,
  },
};

export default function HintDisplay({ guesses, isWon, totalGuesses, bestScore, onNewGame }) {
  if (isWon) {
    return (
      <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-md flex flex-col items-center text-center space-y-6 animate-fade-in">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            Victory!
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Correct Guess!
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            You found the secret number in <strong>{totalGuesses}</strong> {totalGuesses === 1 ? 'attempt' : 'attempts'}!
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-3xl font-black text-slate-900">{totalGuesses}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 mt-1">Guesses Used</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-3xl font-black text-slate-900">{bestScore !== null ? bestScore : totalGuesses}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 mt-1">Fewest Guesses</span>
          </div>
        </div>

        <button
          onClick={onNewGame}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-black border border-slate-900 shadow-md transition-all duration-200 cursor-pointer text-base"
        >
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  if (guesses.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 text-xs font-medium">
        Make your first guess to receive hints!
      </div>
    );
  }

  const latestGuess = guesses[0];
  const latestMeta = HINT_CONFIG[latestGuess.hint] || HINT_CONFIG.low;
  const LatestIcon = latestMeta.icon;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Latest Hint Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${latestMeta.badge} animate-fade-in`}>
        <div className="flex items-center space-x-3">
          <LatestIcon className="w-6 h-6 text-slate-900" />
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider block text-slate-700">Latest Guess: {latestGuess.guess}</span>
            <span className="text-lg font-black text-slate-900">{latestMeta.label}</span>
          </div>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white border border-slate-300 text-slate-900">
          Attempt #{guesses.length}
        </span>
      </div>

      {/* Full History Scroll List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 px-1">
          <span className="flex items-center gap-1">
            <History className="w-3.5 h-3.5 text-slate-900" />
            Guess History ({guesses.length})
          </span>
        </div>

        {guesses.map((item, index) => {
          const meta = HINT_CONFIG[item.hint] || HINT_CONFIG.low;
          const IconComp = meta.icon;
          const attemptNum = guesses.length - index;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-sm font-mono shadow-2xs"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500 font-sans font-medium">#{attemptNum}</span>
                <span className="text-base font-bold text-slate-900">{item.guess}</span>
              </div>

              <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-xs font-sans font-bold ${meta.badge}`}>
                <IconComp className="w-3.5 h-3.5" />
                <span>{meta.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
