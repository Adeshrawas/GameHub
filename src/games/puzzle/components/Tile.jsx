import React from 'react';

/**
 * A single sliding puzzle tile.
 *
 * Uses absolute positioning + CSS transform so React can key by VALUE,
 * keeping the DOM element alive across moves → CSS transition animates the slide.
 *
 * @param {number}   value    – tile number (1-based); never 0 (blank is not rendered)
 * @param {number}   row      – current row in the grid (0-based)
 * @param {number}   col      – current column in the grid (0-based)
 * @param {number}   cellSize – size of each cell in px
 * @param {number}   pad      – inner padding so tiles don't touch
 * @param {boolean}  movable  – true if this tile is adjacent to the blank
 * @param {function} onClick  – callback when tile is clicked
 */
export default function Tile({ value, row, col, cellSize, pad, movable, onClick }) {
  const tileSize = cellSize - pad * 2;
  const fontSize = Math.max(13, Math.round(tileSize * 0.32));

  return (
    <div
      onClick={movable ? onClick : undefined}
      style={{
        position  : 'absolute',
        width     : tileSize,
        height    : tileSize,
        transform : `translate(${col * cellSize + pad}px, ${row * cellSize + pad}px)`,
        transition: 'transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fontSize  : fontSize,
        cursor    : movable ? 'pointer' : 'default',
        userSelect: 'none',
        willChange: 'transform',
      }}
      className={[
        'flex items-center justify-center rounded-lg font-bold select-none',
        movable
          ? 'bg-slate-900 hover:bg-black text-white border border-slate-900 shadow-2xs hover:shadow-md active:scale-95'
          : 'bg-white text-slate-900 border border-slate-200 shadow-2xs',
      ].join(' ')}
    >
      {value}
    </div>
  );
}
