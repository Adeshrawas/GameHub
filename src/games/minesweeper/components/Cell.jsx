import React from 'react';
import { Flag, Bomb } from 'lucide-react';

const NUMBER_COLORS = {
  1: 'text-blue-400 font-extrabold',
  2: 'text-emerald-400 font-extrabold',
  3: 'text-rose-400 font-extrabold',
  4: 'text-purple-400 font-extrabold',
  5: 'text-amber-400 font-extrabold',
  6: 'text-cyan-400 font-extrabold',
  7: 'text-pink-400 font-extrabold',
  8: 'text-slate-300 font-extrabold',
};

export default function Cell({ cell, onClick, onContextMenu }) {
  const { isMine, adjacentCount, isRevealed, isFlagged } = cell;

  // Click handler wrapper
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onContextMenu(e);
  };

  if (isRevealed) {
    if (isMine) {
      return (
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 animate-pulse">
          <Bomb className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      );
    }

    return (
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-center text-base sm:text-lg font-mono shadow-inner select-none">
        {adjacentCount > 0 && (
          <span className={NUMBER_COLORS[adjacentCount] || 'text-slate-300'}>
            {adjacentCount}
          </span>
        )}
      </div>
    );
  }

  // Unrevealed state
  return (
    <button
      onClick={handleClick}
      onContextMenu={handleRightClick}
      aria-label={`Cell row ${cell.row + 1} column ${cell.col + 1}`}
      className={`
        w-9 h-9 sm:w-11 sm:h-11 rounded-lg border backdrop-blur-md flex items-center justify-center transition-all duration-150
        bg-slate-800/90 border-slate-700/80 hover:bg-slate-700 hover:border-slate-600 shadow-md cursor-pointer
        active:scale-95
      `}
    >
      {isFlagged && (
        <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 animate-bounce" />
      )}
    </button>
  );
}
