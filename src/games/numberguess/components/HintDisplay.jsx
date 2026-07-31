import React from 'react';
import { ArrowUpRight, ArrowDownRight, CheckCircle2, History, Sparkles, Trophy } from 'lucide-react';

const HINT_CONFIG = {
  high: {
    label: 'Too High',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: ArrowUpRight,
  },
  low: {
    label: 'Too Low',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: ArrowDownRight,
  },
  correct: {
    label: 'Correct!',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle2,
  },
};

export default function HintDisplay({ guesses, isWon, totalGuesses, bestScore, onNewGame }) {
  if (isWon) {
    return (
      <div className="w-full max-w-md mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-slate-900/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-6 animate-fade-in">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Victory!
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
            Correct Guess!
          </h2>
          <p className="text-sm text-slate-400">
            You found the secret number in <strong>{totalGuesses}</strong> {totalGuesses === 1 ? 'attempt' : 'attempts'}!
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/30 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-emerald-400">{totalGuesses}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">Guesses Used</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-purple-500/30 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-purple-400">{bestScore !== null ? bestScore : totalGuesses}</span>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">Fewest Guesses</span>
          </div>
        </div>

        <button
          onClick={onNewGame}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base"
        >
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  if (guesses.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
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
          <LatestIcon className="w-6 h-6" />
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider block">Latest Guess: {latestGuess.guess}</span>
            <span className="text-lg font-black">{latestMeta.label}</span>
          </div>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-800">
          Attempt #{guesses.length}
        </span>
      </div>

      {/* Full History Scroll List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <History className="w-3.5 h-3.5 text-slate-400" />
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
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-mono"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 font-sans">#{attemptNum}</span>
                <span className="text-base font-bold text-slate-100">{item.guess}</span>
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
