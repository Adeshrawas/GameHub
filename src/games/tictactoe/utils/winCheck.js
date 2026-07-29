// Winning line index combinations (3 rows, 3 cols, 2 diagonals)
export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

/**
 * Checks if there is a winner on the board.
 * @param {(string|null)[]} board Array of 9 cells
 * @returns {{ winner: string|null, winningLine: number[]|null }}
 */
export function checkWinner(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningLine: combo
      };
    }
  }

  return {
    winner: null,
    winningLine: null
  };
}

/**
 * Checks if the game ended in a draw.
 * @param {(string|null)[]} board Array of 9 cells
 * @param {string|null} winner Current winner symbol or null
 * @returns {boolean}
 */
export function checkDraw(board, winner) {
  if (winner) return false;
  return board.every((cell) => cell !== null);
}
