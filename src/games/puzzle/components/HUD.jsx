import React from 'react';
import { Clock, Move, Trophy } from 'lucide-react';

function pad(n) { return String(n).padStart(2, '0'); }
function formatTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

/**
 * HUD — shows level info, live move counter, timer, and personal best.
 * Visual cues:
 *   idle    → timer shows "00:00" dimmed
 *   playing → timer pulses green
 *   paused  → timer amber
 *   won     → green
 */
export default function HUD({ level, moves, time, best, gameState }) {
  const timerColor =
    gameState === 'playing' ? 'text-emerald-400' :
    gameState === 'paused'  ? 'text-amber-400'   :
    gameState === 'won'     ? 'text-emerald-400'  :
    'text-slate-600'; // idle

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3
                    bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">

      {/* Level label */}
      <div className="text-slate-300 font-semibold text-sm">
        Level {level.id}
        <span className="ml-2 text-slate-500 font-normal">
          {level.rows}×{level.cols}
        </span>
        {gameState === 'idle' && (
          <span className="ml-2 text-xs text-slate-600 italic">press Start</span>
        )}
        {gameState === 'paused' && (
          <span className="ml-2 text-xs text-amber-500 font-medium">⏸ Paused</span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm">

        {/* Moves */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <Move className="w-4 h-4 text-slate-500" />
          <span className="tabular-nums font-medium">{moves}</span>
          <span className="text-slate-600 text-xs">moves</span>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-1.5 ${timerColor} transition-colors`}>
          <Clock className="w-4 h-4" />
          <span className="tabular-nums font-medium font-mono">{formatTime(time)}</span>
        </div>

        {/* Best */}
        {best && (
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{best.moves}mv / {formatTime(best.time)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
