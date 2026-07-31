/**
 * Pure flood fill algorithm to reveal connected 0-count empty cells and boundary numbered cells.
 * 
 * @param {Array<Array<Object>>} board - 2D board array
 * @param {number} startRow 
 * @param {number} startCol 
 * @returns {Array<Array<Object>>} New board copy with revealed cells
 */
export function floodFill(board, startRow, startCol) {
  const rows = board.length;
  const cols = board[0].length;

  // Deep copy board rows to ensure immutability
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  const queue = [[startRow, startCol]];

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;

    const cell = newBoard[r][c];

    if (cell.isRevealed || cell.isFlagged || cell.isMine) continue;

    // Reveal current cell
    cell.isRevealed = true;

    // If current cell is empty (0 adjacent mines), queue all 8 neighboring cells
    if (cell.adjacentCount === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (!newBoard[nr][nc].isRevealed && !newBoard[nr][nc].isFlagged) {
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }

  return newBoard;
}
