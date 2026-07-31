import React from 'react';

export default function Column({
  colIndex,
  colCells,
  onColumnClick,
  onHover,
  isHovered,
  currentPlayer,
  winningLine,
  disabled,
}) {
  const isWinningCell = (r, c) => {
    if (!winningLine) return false;
    return winningLine.some((pt) => pt.r === r && pt.c === c);
  };

  return (
    <div
      onClick={() => !disabled && onColumnClick(colIndex)}
      onMouseEnter={() => !disabled && onHover(colIndex)}
      onMouseLeave={() => onHover(null)}
      className={`
        flex flex-col items-center gap-2 p-1.5 rounded-2xl transition-colors duration-150 cursor-pointer
        ${isHovered && !disabled ? 'bg-slate-800/60' : 'hover:bg-slate-800/30'}
        ${disabled ? 'cursor-not-allowed' : ''}
      `}
    >
      {/* Top Preview Token Slot */}
      <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center">
        {isHovered && !disabled && (
          <div
            className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-dashed transition-all duration-150 animate-bounce ${
              currentPlayer === 1
                ? 'bg-rose-500/40 border-rose-400'
                : 'bg-amber-400/40 border-amber-300'
            }`}
          />
        )}
      </div>

      {/* 6 Vertical Column Cells (Row 0 top to Row 5 bottom) */}
      {colCells.map((val, r) => {
        const isWinTile = isWinningCell(r, colIndex);

        return (
          <div
            key={r}
            className={`
              w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
              ${
                val === 1
                  ? 'bg-rose-500 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                  : val === 2
                  ? 'bg-amber-400 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)]'
                  : 'bg-slate-950 border-slate-800/80 shadow-inner'
              }
              ${isWinTile ? 'ring-4 ring-white animate-pulse scale-110 z-10' : ''}
            `}
          />
        );
      })}
    </div>
  );
}
