import { WINNING_COMBINATIONS } from './winCheck';

/**
 * Calculates computer's move index based on AI rules:
 * 1. Win: If computer can win in 1 move, do it.
 * 2. Block: If player is about to win in 1 move, block it.
 * 3. Center: Take center cell (index 4) if available.
 * 4. Random: Pick a random open cell.
 * 
 * @param {(string|null)[]} board Array of 9 cells
 * @param {string} computerSymbol Symbol used by computer (default 'O')
 * @param {string} playerSymbol Symbol used by player (default 'X')
 * @returns {number|null} Index of chosen cell (0-8) or null if full
 */
export function getComputerMove(board, computerSymbol = 'O', playerSymbol = 'X') {
  const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return null;

  // Helper to check if placing symbol at an index completes a win
  const findWinningSpot = (symbol) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      const values = [board[a], board[b], board[c]];
      const symbolCount = values.filter((v) => v === symbol).length;
      const nullCount = values.filter((v) => v === null).length;

      if (symbolCount === 2 && nullCount === 1) {
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }
    return null;
  };

  // Rule 1: Can computer win?
  const winMove = findWinningSpot(computerSymbol);
  if (winMove !== null) return winMove;

  // Rule 2: Must block player win?
  const blockMove = findWinningSpot(playerSymbol);
  if (blockMove !== null) return blockMove;

  // Rule 3: Take center if available
  if (board[4] === null) return 4;

  // Rule 4: Pick random available cell
  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}
