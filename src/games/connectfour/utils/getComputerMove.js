import { COLS, dropToken } from './dropToken';
import { checkWin } from './winCheck';

/**
 * Pure function to calculate the AI's column move in Connect Four.
 * Strategy:
 * 1. Win: If AI can complete 4-in-a-row this turn, take it!
 * 2. Block: If Human can complete 4-in-a-row next turn, block it!
 * 3. Preference: Prefer central columns [3, 2, 4, 1, 5, 0, 6] for maximum tactical reach.
 * 4. Fallback: Any valid column.
 * 
 * @param {Array<Array<number|null>>} grid - 6x7 grid
 * @param {number} [aiPlayer=2] - AI player ID
 * @param {number} [humanPlayer=1] - Human player ID
 * @returns {number|null} Column index (0-6) or null if grid is full
 */
export function getComputerMove(grid, aiPlayer = 2, humanPlayer = 1) {
  const validCols = [];
  for (let c = 0; c < COLS; c++) {
    if (grid[0][c] === null) {
      validCols.push(c);
    }
  }

  if (validCols.length === 0) return null;

  // 1. Check if AI can WIN this move
  for (const c of validCols) {
    const res = dropToken(grid, c, aiPlayer);
    if (res) {
      const win = checkWin(res.newGrid, res.rowPlaced, res.colPlaced);
      if (win && win.winner === aiPlayer) {
        return c;
      }
    }
  }

  // 2. Check if Human can WIN next move -> BLOCK THEM
  for (const c of validCols) {
    const res = dropToken(grid, c, humanPlayer);
    if (res) {
      const win = checkWin(res.newGrid, res.rowPlaced, res.colPlaced);
      if (win && win.winner === humanPlayer) {
        return c;
      }
    }
  }

  // 3. Prefer central columns
  const preferredOrder = [3, 2, 4, 1, 5, 0, 6];
  for (const c of preferredOrder) {
    if (validCols.includes(c)) {
      return c;
    }
  }

  // 4. Fallback
  return validCols[0];
}
