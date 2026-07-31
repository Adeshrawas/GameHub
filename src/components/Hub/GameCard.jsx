import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy, Grid, Brain, Gamepad2, Sparkles, Zap, Timer, Target, Scissors, Keyboard, Bomb, Eye, Hash, CircleDot, Star } from 'lucide-react';

const ICON_MAP = { Grid, Brain, Gamepad2, Sparkles, Zap, Timer, Target, Scissors, Keyboard, Bomb, Eye, Hash, CircleDot };

export default function GameCard({ game }) {
  const [highScore, setHighScore] = useState(null);

  useEffect(() => {
    if (!game.storageKey) return;
    try {
      const v = localStorage.getItem(game.storageKey);
      if (v !== null) setHighScore(v);
    } catch (e) { /* ignore */ }
  }, [game.storageKey]);

  const IconComponent = ICON_MAP[game.iconName] || Gamepad2;

  return (
    <div className={`game-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${
      game.isFeatured ? 'border border-indigo-500/40 bg-slate-900/90 shadow-xl shadow-indigo-500/10' : ''
    }`}>
      {/* Featured Ribbon Badge */}
      {game.isFeatured && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>Featured</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
            <IconComponent className="w-5 h-5 text-indigo-400" />
          </div>
          {!game.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-400 border border-slate-700/60">
              {game.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
          {game.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {game.description}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium">{highScore !== null ? game.scoreFormat(highScore) : 'No score yet'}</span>
        </div>

        <Link
          to={game.path}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all duration-150 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          <span>Play</span>
          <Play className="w-3.5 h-3.5 fill-current" />
        </Link>
      </div>
    </div>
  );
}
