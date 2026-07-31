/**
 * 30-level progression: 2×2 → 6×6
 * shuffleMoves: number of legal random moves from solved state (guarantees solvability)
 *
 * Grid sizes used: 2×2, 2×3, 3×3, 3×4, 4×4, 4×5, 5×5, 5×6, 6×6
 */
export const levels = [
  // ── 2×2 (3 tiles) ───────────────────────────────────────
  { id:  1, rows: 2, cols: 2, shuffleMoves: 8   },
  { id:  2, rows: 2, cols: 2, shuffleMoves: 20  },

  // ── 2×3 (5 tiles) ───────────────────────────────────────
  { id:  3, rows: 2, cols: 3, shuffleMoves: 20  },
  { id:  4, rows: 2, cols: 3, shuffleMoves: 40  },

  // ── 3×3 (8 tiles) ───────────────────────────────────────
  { id:  5, rows: 3, cols: 3, shuffleMoves: 30  },
  { id:  6, rows: 3, cols: 3, shuffleMoves: 60  },
  { id:  7, rows: 3, cols: 3, shuffleMoves: 100 },

  // ── 3×4 (11 tiles) ──────────────────────────────────────
  { id:  8, rows: 3, cols: 4, shuffleMoves: 50  },
  { id:  9, rows: 3, cols: 4, shuffleMoves: 90  },
  { id: 10, rows: 3, cols: 4, shuffleMoves: 140 },

  // ── 4×4 (15 tiles) ──────────────────────────────────────
  { id: 11, rows: 4, cols: 4, shuffleMoves: 80  },
  { id: 12, rows: 4, cols: 4, shuffleMoves: 140 },
  { id: 13, rows: 4, cols: 4, shuffleMoves: 200 },
  { id: 14, rows: 4, cols: 4, shuffleMoves: 260 },

  // ── 4×5 (19 tiles) ──────────────────────────────────────
  { id: 15, rows: 4, cols: 5, shuffleMoves: 120 },
  { id: 16, rows: 4, cols: 5, shuffleMoves: 200 },
  { id: 17, rows: 4, cols: 5, shuffleMoves: 300 },
  { id: 18, rows: 4, cols: 5, shuffleMoves: 360 },

  // ── 5×5 (24 tiles) ──────────────────────────────────────
  { id: 19, rows: 5, cols: 5, shuffleMoves: 150 },
  { id: 20, rows: 5, cols: 5, shuffleMoves: 250 },
  { id: 21, rows: 5, cols: 5, shuffleMoves: 380 },
  { id: 22, rows: 5, cols: 5, shuffleMoves: 450 },

  // ── 5×6 (29 tiles) ──────────────────────────────────────
  { id: 23, rows: 5, cols: 6, shuffleMoves: 200 },
  { id: 24, rows: 5, cols: 6, shuffleMoves: 320 },
  { id: 25, rows: 5, cols: 6, shuffleMoves: 450 },
  { id: 26, rows: 5, cols: 6, shuffleMoves: 520 },

  // ── 6×6 (35 tiles) ──────────────────────────────────────
  { id: 27, rows: 6, cols: 6, shuffleMoves: 280 },
  { id: 28, rows: 6, cols: 6, shuffleMoves: 420 },
  { id: 29, rows: 6, cols: 6, shuffleMoves: 600 },
  { id: 30, rows: 6, cols: 6, shuffleMoves: 750 },
];
