import React, { useMemo } from 'react';
import Tile from './Tile';

/** Cell size in px for a given max grid dimension */
const CELL_SIZES = { 2: 130, 3: 110, 4: 95, 5: 80, 6: 68 };
const PAD = 5; // gap between tiles

/**
 * Renders the puzzle grid using absolute-positioned tiles.
 * Each tile is keyed by its VALUE so React preserves its DOM node across moves,
 * letting the CSS transform transition animate the slide.
 */
export default function Grid({ tiles, rows, cols, onTileClick }) {
  const maxDim   = Math.max(rows, cols);
  const cellSize = CELL_SIZES[maxDim] ?? 80;

  const width  = cols * cellSize;
  const height = rows * cellSize;

  // Pre-compute which tile indices are adjacent to the blank (movable)
  const blankIdx = tiles.indexOf(0);
  const movableSet = useMemo(() => {
    const set = new Set();
    const r = Math.floor(blankIdx / cols), c = blankIdx % cols;
    if (r > 0)        set.add(blankIdx - cols);
    if (r < rows - 1) set.add(blankIdx + cols);
    if (c > 0)        set.add(blankIdx - 1);
    if (c < cols - 1) set.add(blankIdx + 1);
    return set;
  }, [blankIdx, rows, cols]);

  return (
    <div
      style={{ position: 'relative', width, height }}
      className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-xl"
    >
      {tiles.map((value, idx) => {
        if (value === 0) return null; // blank cell — leave empty

        const row = Math.floor(idx / cols);
        const col = idx % cols;

        return (
          <Tile
            key={value}            // stable key = value → same DOM element moves visually
            value={value}
            row={row}
            col={col}
            cellSize={cellSize}
            pad={PAD}
            movable={movableSet.has(idx)}
            onClick={() => onTileClick(idx)}
          />
        );
      })}
    </div>
  );
}
