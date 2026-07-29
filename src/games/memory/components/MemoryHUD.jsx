import React from 'react';
import { Clock, Move, Trophy } from 'lucide-react';

function pad(n) { return String(n).padStart(2, '0'); }
function fmtTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

export default function MemoryHUD({ level, moves, matchedCount, time, best, gameState }) {
  const timerColor =
    gameState === 'playing' ? 'text-emerald-400' :
    gameState === 'paused'  ? 'text-amber-400'   :
    gameState === 'won'     ? 'text-emerald-400'  :
    'text-slate-600';

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3
                    bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">

      {/* Level label */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-slate-200">Level {level.id}</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-500">{level.rows}×{level.cols}</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-400 text-xs">{matchedCount}/{level.pairCount} pairs</span>

        {gameState === 'idle' && (
          <span className="ml-1 text-xs text-slate-600 italic">press Start</span>
        )}
        {gameState === 'paused' && (
          <span className="ml-1 text-xs text-amber-500 font-medium">⏸ Paused</span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm">

        <div className="flex items-center gap-1.5 text-slate-300">
          <Move className="w-4 h-4 text-slate-500" />
          <span className="tabular-nums font-medium">{moves}</span>
          <span className="text-slate-600 text-xs">tries</span>
        </div>

        <div className={`flex items-center gap-1.5 transition-colors ${timerColor}`}>
          <Clock className="w-4 h-4" />
          <span className="tabular-nums font-medium font-mono">{fmtTime(time)}</span>
        </div>

        {best && (
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{best.moves}tr / {fmtTime(best.time)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
