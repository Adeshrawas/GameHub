import React from 'react';

/**
 * Returns Tailwind style classes based on the tile's numerical value.
 * @param {number} value Tile value
 * @returns {string} Tailwind CSS class string
 */
function getTileStyles(value) {
  switch (value) {
    case 2:
      return 'bg-slate-800/90 text-slate-200 border-slate-700/60';
    case 4:
      return 'bg-cyan-950/90 text-cyan-300 border-cyan-800/60 shadow-cyan-950/50';
    case 8:
      return 'bg-cyan-900/90 text-cyan-200 border-cyan-600/70 shadow-lg shadow-cyan-900/30';
    case 16:
      return 'bg-teal-900/90 text-teal-200 border-teal-600/70 shadow-lg shadow-teal-900/40';
    case 32:
      return 'bg-emerald-900/90 text-emerald-200 border-emerald-500/80 shadow-lg shadow-emerald-900/40';
    case 64:
      return 'bg-amber-900/90 text-amber-200 border-amber-600/80 shadow-lg shadow-amber-900/50';
    case 128:
      return 'bg-orange-800/90 text-orange-200 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]';
    case 256:
      return 'bg-rose-900/90 text-rose-100 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]';
    case 512:
      return 'bg-purple-900/90 text-purple-100 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]';
    case 1024:
      return 'bg-indigo-900/90 text-indigo-100 border-indigo-400 shadow-[0_0_25px_rgba(129,140,248,0.6)]';
    case 2048:
      return 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.8)] font-black animate-pulse';
    default:
      return 'bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.8)] font-black';
  }
}

/**
 * Returns text sizing based on string length of tile value.
 * @param {number} value 
 * @returns {string}
 */
function getFontSize(value) {
  if (value >= 1000) {
    return 'text-lg sm:text-2xl';
  } else if (value >= 100) {
    return 'text-xl sm:text-3xl';
  }
  return 'text-2xl sm:text-4xl';
}

export default function Tile2048({ value }) {
  if (value === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-slate-950/70 border border-slate-900/90 shadow-inner" />
    );
  }

  const styles = getTileStyles(value);
  const fontSize = getFontSize(value);

  return (
    <div
      className={`
        aspect-square rounded-2xl border flex items-center justify-center font-extrabold select-none
        transition-all duration-200 transform scale-100 animate-in zoom-in-75 duration-150
        ${styles} ${fontSize}
      `}
    >
      {value}
    </div>
  );
}
