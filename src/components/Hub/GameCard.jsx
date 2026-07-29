import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy, Grid, Brain, Gamepad2, Sparkles, Zap, Timer } from 'lucide-react';

const ICON_MAP = { Grid, Brain, Gamepad2, Sparkles, Zap, Timer };

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
    <div className="game-card rounded-xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
            <IconComponent className="w-5 h-5 text-slate-300" />
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            {game.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2">
          {game.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {game.description}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs text-slate-500">
          <Trophy className="w-3.5 h-3.5 text-slate-500" />
          <span>{highScore !== null ? game.scoreFormat(highScore) : 'No score yet'}</span>
        </div>

        <Link
          to={game.path}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium text-sm transition-colors duration-150"
        >
          <span>Play</span>
          <Play className="w-3.5 h-3.5 fill-current" />
        </Link>
      </div>
    </div>
  );
}
