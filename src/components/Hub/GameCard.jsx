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
    <div className={`game-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
      game.isFeatured ? 'border-2 border-slate-900 bg-gradient-to-b from-slate-100/80 to-white shadow-sm' : 'bg-white border border-slate-200'
    }`}>
      {/* Featured Ribbon Badge */}
      {game.isFeatured && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white border border-slate-900 text-[10px] font-extrabold uppercase tracking-wider">
          <Star className="w-3 h-3 text-white fill-white" />
          <span>Featured</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
            <IconComponent className="w-5 h-5 text-slate-900" />
          </div>
          {!game.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {game.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          {game.name}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {game.description}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs text-slate-600">
          <Trophy className="w-3.5 h-3.5 text-slate-900" />
          <span className="font-semibold">{highScore !== null ? game.scoreFormat(highScore) : 'No score yet'}</span>
        </div>

        <Link
          to={game.path}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm transition-all duration-150 shadow-2xs hover:shadow-md cursor-pointer border border-slate-900"
        >
          <span>Play</span>
          <Play className="w-3.5 h-3.5 fill-current" />
        </Link>
      </div>
    </div>
  );
}
