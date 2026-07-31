import React from 'react';
import { RotateCcw, Trophy, Frown, Equal, Sparkles } from 'lucide-react';

const CHOICE_META = {
  rock: { label: 'Rock', emoji: '🪨', color: 'text-amber-400', bg: 'border-amber-500/30 bg-amber-500/10' },
  paper: { label: 'Paper', emoji: '📄', color: 'text-cyan-400', bg: 'border-cyan-500/30 bg-cyan-500/10' },
  scissors: { label: 'Scissors', emoji: '✂️', color: 'text-purple-400', bg: 'border-purple-500/30 bg-purple-500/10' }
};

export default function ResultDisplay({ playerChoice, computerChoice, result, onPlayAgain }) {
  if (!result || !playerChoice || !computerChoice) return null;

  const playerMeta = CHOICE_META[playerChoice] || CHOICE_META.rock;
  const computerMeta = CHOICE_META[computerChoice] || CHOICE_META.rock;

  const outcomeConfig = {
    win: {
      title: 'VICTORY!',
      subtitle: `${playerMeta.label} beats ${computerMeta.label}! Streak increased!`,
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/40',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
      icon: Trophy,
      badgeText: '+1 Win Streak'
    },
    lose: {
      title: 'DEFEAT!',
      subtitle: `${computerMeta.label} beats ${playerMeta.label}. Streak reset.`,
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/40',
      glow: 'shadow-[0_0_40px_rgba(244,63,94,0.3)]',
      icon: Frown,
      badgeText: 'Streak Reset'
    },
    draw: {
      title: 'DRAW!',
      subtitle: `Both chose ${playerMeta.label}. Streak maintained!`,
      textColor: 'text-amber-300',
      bgColor: 'bg-amber-500/10 border-amber-500/40',
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.25)]',
      icon: Equal,
      badgeText: 'Streak Intact'
    }
  };

  const outcome = outcomeConfig[result] || outcomeConfig.draw;
  const OutcomeIcon = outcome.icon;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-6 animate-fade-in">
      {/* Side-by-Side Choice Arena */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-7 gap-4 items-center">
        {/* Player Card */}
        <div className={`sm:col-span-3 flex flex-col items-center p-6 rounded-2xl border backdrop-blur-md transition-all ${playerMeta.bg} ${result === 'win' ? 'ring-2 ring-emerald-400 shadow-lg' : ''}`}>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-2">You Chose</span>
          <div className="text-6xl my-2 transform transition-transform hover:scale-110">{playerMeta.emoji}</div>
          <span className={`text-lg font-extrabold tracking-wider ${playerMeta.color}`}>{playerMeta.label}</span>
        </div>

        {/* VS / Outcome Center Badge */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center py-2">
          <div className="w-12 h-12 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-md">
            <span className="text-sm font-black tracking-widest text-indigo-400">VS</span>
          </div>
        </div>

        {/* Computer Card */}
        <div className={`sm:col-span-3 flex flex-col items-center p-6 rounded-2xl border backdrop-blur-md transition-all ${computerMeta.bg} ${result === 'lose' ? 'ring-2 ring-rose-400 shadow-lg' : ''}`}>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-2">Computer Chose</span>
          <div className="text-6xl my-2 transform transition-transform hover:scale-110">{computerMeta.emoji}</div>
          <span className={`text-lg font-extrabold tracking-wider ${computerMeta.color}`}>{computerMeta.label}</span>
        </div>
      </div>

      {/* Outcome Banner */}
      <div className={`w-full p-6 rounded-2xl border flex flex-col items-center text-center space-y-2 transition-all ${outcome.bgColor} ${outcome.glow}`}>
        <div className="flex items-center gap-2">
          <OutcomeIcon className={`w-7 h-7 ${outcome.textColor}`} />
          <h2 className={`text-2xl sm:text-3xl font-black tracking-wider ${outcome.textColor}`}>
            {outcome.title}
          </h2>
        </div>
        <p className="text-sm text-slate-300 font-medium">{outcome.subtitle}</p>
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mt-1 ${outcome.bgColor} ${outcome.textColor}`}>
          {outcome.badgeText}
        </span>
      </div>

      {/* Play Again Action Button */}
      <button
        onClick={onPlayAgain}
        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
        <span>Play Again</span>
      </button>
    </div>
  );
}
