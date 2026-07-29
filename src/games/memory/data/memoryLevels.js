/**
 * 30 Memory Match levels — pairs increase steadily.
 * rows × cols is always even (guaranteed by construction).
 * Grid shapes vary to keep different difficulty at the same pair count.
 */
export const memoryLevels = [
  { id:  1, rows: 2, cols: 2,  pairCount:  2 },
  { id:  2, rows: 2, cols: 4,  pairCount:  4 },
  { id:  3, rows: 3, cols: 4,  pairCount:  6 },
  { id:  4, rows: 4, cols: 4,  pairCount:  8 },
  { id:  5, rows: 4, cols: 5,  pairCount: 10 },
  { id:  6, rows: 4, cols: 6,  pairCount: 12 },
  { id:  7, rows: 3, cols: 8,  pairCount: 12 }, // wider shape
  { id:  8, rows: 4, cols: 7,  pairCount: 14 },
  { id:  9, rows: 5, cols: 6,  pairCount: 15 },
  { id: 10, rows: 4, cols: 8,  pairCount: 16 },
  { id: 11, rows: 6, cols: 6,  pairCount: 18 },
  { id: 12, rows: 4, cols: 9,  pairCount: 18 }, // wide shape
  { id: 13, rows: 5, cols: 8,  pairCount: 20 },
  { id: 14, rows: 4, cols: 10, pairCount: 20 }, // wider
  { id: 15, rows: 6, cols: 7,  pairCount: 21 },
  { id: 16, rows: 6, cols: 8,  pairCount: 24 },
  { id: 17, rows: 5, cols: 10, pairCount: 25 },
  { id: 18, rows: 6, cols: 9,  pairCount: 27 },
  { id: 19, rows: 7, cols: 8,  pairCount: 28 },
  { id: 20, rows: 6, cols: 10, pairCount: 30 },
  { id: 21, rows: 6, cols: 10, pairCount: 30 }, // same grid, re-shuffle
  { id: 22, rows: 8, cols: 8,  pairCount: 32 },
  { id: 23, rows: 7, cols: 10, pairCount: 35 },
  { id: 24, rows: 7, cols: 10, pairCount: 35 }, // same grid, harder
  { id: 25, rows: 8, cols: 9,  pairCount: 36 },
  { id: 26, rows: 8, cols: 9,  pairCount: 36 }, // same grid, re-shuffle
  { id: 27, rows: 8, cols: 10, pairCount: 40 },
  { id: 28, rows: 8, cols: 10, pairCount: 40 },
  { id: 29, rows: 8, cols: 10, pairCount: 40 },
  { id: 30, rows: 8, cols: 10, pairCount: 40 }, // final boss
];
