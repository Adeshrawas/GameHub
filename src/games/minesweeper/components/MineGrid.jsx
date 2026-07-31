import React from 'react';
import Cell from './Cell';

export default function MineGrid({ grid, onCellClick, onCellContextMenu }) {
  if (!grid || grid.length === 0) return null;

  const cols = grid[0].length;

  return (
    <div
      className="inline-grid gap-1.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((rowArr, r) =>
        rowArr.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            cell={cell}
            onClick={() => onCellClick(r, c)}
            onContextMenu={(e) => onCellContextMenu(e, r, c)}
          />
        ))
      )}
    </div>
  );
}
