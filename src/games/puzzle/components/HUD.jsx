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
  const timerColor = 'text-slate-900 font-bold';

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3
                    bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-2xs">

      {/* Level label */}
      <div className="text-slate-900 font-bold text-sm">
        Level {level.id}
        <span className="ml-2 text-slate-500 font-normal">
          {level.rows}×{level.cols}
        </span>
        {gameState === 'idle' && (
          <span className="ml-2 text-xs text-slate-500 italic">press Start</span>
        )}
        {gameState === 'paused' && (
          <span className="ml-2 text-xs text-slate-900 font-bold">⏸ Paused</span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm">

        {/* Moves */}
        <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
          <Move className="w-4 h-4 text-slate-900" />
          <span className="tabular-nums font-bold">{moves}</span>
          <span className="text-slate-500 text-xs font-normal">moves</span>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-1.5 ${timerColor} transition-colors`}>
          <Clock className="w-4 h-4 text-slate-900" />
          <span className="tabular-nums font-bold font-mono">{formatTime(time)}</span>
        </div>

        {/* Best */}
        {best && (
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            <Trophy className="w-3.5 h-3.5 text-slate-900" />
            <span>{best.moves}mv / {formatTime(best.time)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
