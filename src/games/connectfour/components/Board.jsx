import React from 'react';
import Column from './Column';
import { COLS, ROWS } from '../utils/dropToken';

export default function Board({
  grid,
  onColumnClick,
  hoveredCol,
  onHover,
  currentPlayer,
  winningLine,
  disabled,
}) {
  return (
    <div className="p-3 sm:p-4 rounded-3xl bg-indigo-950/80 border-4 border-indigo-800/80 shadow-2xl backdrop-blur-xl flex items-center justify-center">
      <div className="flex gap-1 sm:gap-2 bg-blue-950/90 p-2 sm:p-3 rounded-2xl border-2 border-indigo-700/60 shadow-inner">
        {Array.from({ length: COLS }).map((_, c) => {
          // Extract column cells from top row (0) to bottom row (5)
          const colCells = Array.from({ length: ROWS }).map((_, r) => grid[r][c]);

          return (
            <Column
              key={c}
              colIndex={c}
              colCells={colCells}
              onColumnClick={onColumnClick}
              onHover={onHover}
              isHovered={hoveredCol === c}
              currentPlayer={currentPlayer}
              winningLine={winningLine}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}
