/**
 * Checks if the game is over (no empty cells and no adjacent tiles can be merged).
 * @param {number[][]} grid 4x4 2D array
 * @returns {boolean}
 */
export function checkGameOver(grid) {
  // 1. Check for any empty cell
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return false;
    }
  }

  // 2. Check horizontal matches
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[r][c] === grid[r][c + 1]) return false;
    }
  }

  // 3. Check vertical matches
  for (let r = 0; r < 0 + 3; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === grid[r + 1][c]) return false;
    }
  }

  // No valid moves remain
  return true;
}

/**
 * Checks if grid contains a 2048 tile (or higher).
 * @param {number[][]} grid 4x4 2D array
 * @returns {boolean}
 */
export function check2048Tile(grid) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] >= 2048) return true;
    }
  }
  return false;
}
