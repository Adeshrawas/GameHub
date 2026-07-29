import React from 'react';
import Tile2048 from './Tile2048';

export default function Grid2048({ grid, touchHandlers }) {
  return (
    <div
      {...touchHandlers}
      className="w-full max-w-md mx-auto aspect-square grid grid-cols-4 gap-2.5 sm:gap-3.5 p-3.5 sm:p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative select-none touch-pan-y"
    >
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Tile2048 key={`${r}-${c}`} value={value} />
        ))
      )}
    </div>
  );
}
