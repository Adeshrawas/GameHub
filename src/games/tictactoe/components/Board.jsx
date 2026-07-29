import React from 'react';
import Cell from './Cell';

export default function Board({ board, onCellClick, winningLine, disabled }) {
  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-square grid grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl shadow-black/60 relative">
      {board.map((value, index) => {
        const isWinningCell = winningLine ? winningLine.includes(index) : false;
        return (
          <Cell
            key={index}
            value={value}
            onClick={() => onCellClick(index)}
            isWinningCell={isWinningCell}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}
