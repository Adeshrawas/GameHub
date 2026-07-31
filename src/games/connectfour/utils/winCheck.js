import { ROWS, COLS } from './dropToken';

const DIRECTIONS = [
  { dr: 0, dc: 1 },  // Horizontal
  { dr: 1, dc: 0 },  // Vertical
  { dr: 1, dc: 1 },  // Diagonal Down-Right
  { dr: -1, dc: 1 }, // Diagonal Up-Right
];

/**
 * Pure function to check if the last move resulted in 4-in-a-row.
 * 
 * @param {Array<Array<number|null>>} grid - 6x7 grid
 * @param {number} r - Row index of last move
 * @param {number} c - Column index of last move
 * @returns {{ winner: number, winningLine: Array<{r: number, c: number}> } | null}
 */
export function checkWin(grid, r, c) {
  if (r === null || c === null || r === undefined || c === undefined) return null;

  const player = grid[r][c];
  if (player === null) return null;

  for (const { dr, dc } of DIRECTIONS) {
    const line = [{ r, c }];

    // Count in positive direction
    let nr = r + dr;
    let nc = c + dc;
    while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === player) {
      line.push({ r: nr, c: nc });
      nr += dr;
      nc += dc;
    }

    // Count in negative direction
    nr = r - dr;
    nc = c - dc;
    while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === player) {
      line.push({ r: nr, c: nc });
      nr -= dr;
      nc -= dc;
    }

    if (line.length >= 4) {
      return {
        winner: player,
        winningLine: line,
      };
    }
  }

  return null;
}

/**
 * Checks if the Connect Four board is completely full with no moves left.
 * 
 * @param {Array<Array<number|null>>} grid 
 * @returns {boolean}
 */
export function checkGridFull(grid) {
  return grid[0].every((cell) => cell !== null);
}
