/**
 * Returns the 4-connected neighbour indices of `idx` in a rows×cols grid.
 */
function getNeighbors(idx, rows, cols) {
  const r = Math.floor(idx / cols);
  const c = idx % cols;
  const n = [];
  if (r > 0)        n.push(idx - cols); // up
  if (r < rows - 1) n.push(idx + cols); // down
  if (c > 0)        n.push(idx - 1);    // left
  if (c < cols - 1) n.push(idx + 1);    // right
  return n;
}

/**
 * Generate a guaranteed-solvable puzzle by starting from the solved state
 * and making `numMoves` random legal tile slides.
 *
 * Solved state: [1, 2, ..., rows*cols-1, 0]  (0 = blank at the end)
 *
 * @param {number} rows
 * @param {number} cols
 * @param {number} numMoves  - number of random slides to apply
 * @returns {number[]}       - shuffled tile array
 */
export function shuffle(rows, cols, numMoves) {
  const size = rows * cols;

  // Start from solved state
  const tiles = Array.from({ length: size }, (_, i) => (i < size - 1 ? i + 1 : 0));
  let blankIdx = size - 1; // blank starts at last cell
  let prevBlank = -1;      // track previous blank position to avoid immediate undo

  for (let i = 0; i < numMoves; i++) {
    // Get neighbours but exclude the position the blank just came from
    const candidates = getNeighbors(blankIdx, rows, cols).filter(n => n !== prevBlank);
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];

    // Slide chosen tile into blank
    [tiles[blankIdx], tiles[chosen]] = [tiles[chosen], tiles[blankIdx]];
    prevBlank = blankIdx;
    blankIdx  = chosen;
  }

  return tiles;
}

/**
 * Returns the canonical solved state for a rows×cols puzzle.
 */
export function solvedState(rows, cols) {
  const size = rows * cols;
  return Array.from({ length: size }, (_, i) => (i < size - 1 ? i + 1 : 0));
}
