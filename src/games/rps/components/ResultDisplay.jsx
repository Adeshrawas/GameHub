import React from 'react';
import { RotateCcw, Trophy, Frown, Equal, Sparkles } from 'lucide-react';

const CHOICE_META = {
  rock: { label: 'Rock', emoji: '🪨', color: 'text-slate-900', bg: 'border-slate-200 bg-white' },
  paper: { label: 'Paper', emoji: '📄', color: 'text-slate-900', bg: 'border-slate-200 bg-white' },
  scissors: { label: 'Scissors', emoji: '✂️', color: 'text-slate-900', bg: 'border-slate-200 bg-white' }
};

export default function ResultDisplay({ playerChoice, computerChoice, result, onPlayAgain }) {
  if (!result || !playerChoice || !computerChoice) return null;

  const playerMeta = CHOICE_META[playerChoice] || CHOICE_META.rock;
  const computerMeta = CHOICE_META[computerChoice] || CHOICE_META.rock;

  const outcomeConfig = {
    win: {
      title: 'VICTORY!',
      subtitle: `${playerMeta.label} beats ${computerMeta.label}! Streak increased!`,
      textColor: 'text-slate-900',
      bgColor: 'bg-white border-slate-900',
      glow: 'shadow-md',
      icon: Trophy,
      badgeText: '+1 Win Streak'
    },
    lose: {
      title: 'DEFEAT!',
      subtitle: `${computerMeta.label} beats ${playerMeta.label}. Streak reset.`,
      textColor: 'text-slate-900',
      bgColor: 'bg-white border-slate-200',
      glow: 'shadow-sm',
      icon: Frown,
      badgeText: 'Streak Reset'
    },
    draw: {
      title: 'DRAW!',
      subtitle: `Both chose ${playerMeta.label}. Streak maintained!`,
      textColor: 'text-slate-900',
      bgColor: 'bg-white border-slate-200',
      glow: 'shadow-sm',
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
        <div className={`sm:col-span-3 flex flex-col items-center p-6 rounded-2xl border transition-all ${playerMeta.bg} ${result === 'win' ? 'ring-2 ring-slate-900 shadow-md' : 'shadow-2xs'}`}>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-2">You Chose</span>
          <div className="text-6xl my-2 transform transition-transform hover:scale-105">{playerMeta.emoji}</div>
          <span className={`text-lg font-extrabold tracking-wider ${playerMeta.color}`}>{playerMeta.label}</span>
        </div>

        {/* VS / Outcome Center Badge */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center py-2">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-900 flex items-center justify-center shadow-2xs">
            <span className="text-sm font-black tracking-widest text-white">VS</span>
          </div>
        </div>

        {/* Computer Card */}
        <div className={`sm:col-span-3 flex flex-col items-center p-6 rounded-2xl border transition-all ${computerMeta.bg} ${result === 'lose' ? 'ring-2 ring-slate-900 shadow-md' : 'shadow-2xs'}`}>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-2">Computer Chose</span>
          <div className="text-6xl my-2 transform transition-transform hover:scale-105">{computerMeta.emoji}</div>
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
        <p className="text-sm text-slate-600 font-medium">{outcome.subtitle}</p>
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border border-slate-900 bg-slate-900 text-white mt-1">
          {outcome.badgeText}
        </span>
      </div>

      {/* Play Again Action Button */}
      <button
        onClick={onPlayAgain}
        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-black border border-slate-900 shadow-md transition-all duration-200 cursor-pointer text-base"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
        <span>Play Again</span>
      </button>
    </div>
  );
}
