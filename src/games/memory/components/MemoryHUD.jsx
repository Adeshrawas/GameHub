import React from 'react';
import { Clock, Move, Trophy } from 'lucide-react';

function pad(n) { return String(n).padStart(2, '0'); }
function fmtTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

export default function MemoryHUD({ level, moves, matchedCount, time, best, gameState }) {
  const timerColor = 'text-slate-900 font-bold';

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3
                    bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-2xs text-slate-900">

      {/* Level label */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-bold text-slate-900">Level {level.id}</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-500 font-medium">{level.rows}×{level.cols}</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-900 text-xs font-bold">{matchedCount}/{level.pairCount} pairs</span>

        {gameState === 'idle' && (
          <span className="ml-1 text-xs text-slate-500 italic">press Start</span>
        )}
        {gameState === 'paused' && (
          <span className="ml-1 text-xs text-slate-900 font-bold">⏸ Paused</span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 text-sm">

        <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
          <Move className="w-4 h-4 text-slate-900" />
          <span className="tabular-nums font-bold">{moves}</span>
          <span className="text-slate-500 text-xs font-normal">tries</span>
        </div>

        <div className={`flex items-center gap-1.5 transition-colors ${timerColor}`}>
          <Clock className="w-4 h-4 text-slate-900" />
          <span className="tabular-nums font-bold font-mono">{fmtTime(time)}</span>
        </div>

        {best && (
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            <Trophy className="w-3.5 h-3.5 text-slate-900" />
            <span>{best.moves}tr / {fmtTime(best.time)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
