import React from 'react';
import { Eye, Hand, Trophy, Play, RotateCcw, AlertTriangle } from 'lucide-react';

export default function GameStatus({ round, phase, score, bestScore, onStartGame }) {
  const getPhaseBadge = () => {
    switch (phase) {
      case 'playback':
        return {
          title: 'Watch the sequence',
          subtitle: 'Pay close attention to the order of flashing colors',
          color: 'text-slate-900 border-slate-300 bg-slate-100',
          icon: Eye
        };
      case 'playerTurn':
        return {
          title: 'Your Turn!',
          subtitle: 'Repeat the exact color sequence from memory',
          color: 'text-slate-900 border-slate-900 bg-slate-900 text-white',
          icon: Hand
        };
      case 'gameOver':
        return {
          title: 'Game Over!',
          subtitle: `Wrong sequence. You survived ${score} ${score === 1 ? 'round' : 'rounds'}!`,
          color: 'text-slate-900 border-slate-300 bg-slate-100',
          icon: AlertTriangle
        };
      default:
        return {
          title: 'Ready to Test Your Memory?',
          subtitle: 'Click Start Game to begin sequence playback',
          color: 'text-slate-900 border-slate-200 bg-slate-50',
          icon: Play
        };
    }
  };

  const badge = getPhaseBadge();
  const IconComponent = badge.icon;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center space-y-5">
      {/* Score Dashboard Header */}
      <div className="w-full grid grid-cols-2 gap-4">
        {/* Current Round */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block">Round</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{phase === 'idle' ? 0 : round}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 font-bold">
            #{phase === 'idle' ? 0 : round}
          </div>
        </div>

        {/* Best Score */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block">Best Round</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{bestScore}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
            <Trophy className="w-5 h-5 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Phase Banner */}
      <div className={`w-full p-4 rounded-2xl border flex flex-col items-center text-center space-y-1 transition-all ${badge.color}`}>
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5" />
          <span className="text-lg font-bold tracking-wide">{badge.title}</span>
        </div>
        <p className="text-xs opacity-90">{badge.subtitle}</p>
      </div>

      {/* Action Buttons (Start / Play Again) */}
      {(phase === 'idle' || phase === 'gameOver') && (
        <button
          onClick={onStartGame}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-black border border-slate-900 shadow-md transition-all duration-200 cursor-pointer text-base"
        >
          {phase === 'gameOver' ? (
            <>
              <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
              <span>Play Again</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Start Game</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
