export const ROWS = 6;
export const COLS = 7;

/**
 * Creates an empty 6x7 grid filled with null.
 * 
 * @returns {Array<Array<number|null>>}
 */
export function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

/**
 * Pure function that places a player token in the lowest available row of a specified column.
 * 
 * @param {Array<Array<number|null>>} grid - 6x7 grid
 * @param {number} colIndex - Column index (0-6)
 * @param {number} player - Player ID (1 or 2)
 * @returns {{ newGrid: Array<Array<number|null>>, rowPlaced: number, colPlaced: number } | null}
 */
export function dropToken(grid, colIndex, player) {
  if (colIndex < 0 || colIndex >= COLS) return null;

  // Search from bottom row (5) up to top row (0) for first empty cell
  for (let r = ROWS - 1; r >= 0; r--) {
    if (grid[r][colIndex] === null) {
      const newGrid = grid.map((row) => [...row]);
      newGrid[r][colIndex] = player;
      return {
        newGrid,
        rowPlaced: r,
        colPlaced: colIndex,
      };
    }
  }

  // Column is full
  return null;
}
