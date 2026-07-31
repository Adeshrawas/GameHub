/**
 * Creates an empty grid of cell objects.
 * 
 * @param {number} rows 
 * @param {number} cols 
 * @returns {Array<Array<{row: number, col: number, isMine: boolean, adjacentCount: number, isRevealed: boolean, isFlagged: boolean}>>}
 */
export function createEmptyBoard(rows = 8, cols = 8) {
  const board = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        isMine: false,
        adjacentCount: 0,
        isRevealed: false,
        isFlagged: false,
      });
    }
    board.push(row);
  }
  return board;
}

/**
 * Generates a Minesweeper board with mines placed randomly,
 * ensuring (safeRow, safeCol) is never a mine.
 * 
 * @param {number} rows 
 * @param {number} cols 
 * @param {number} mineCount 
 * @param {number|null} safeRow 
 * @param {number|null} safeCol 
 * @returns {Array<Array<Object>>}
 */
export function generateBoard(rows = 8, cols = 8, mineCount = 10, safeRow = null, safeCol = null) {
  const board = createEmptyBoard(rows, cols);
  const totalCells = rows * cols;
  const maxMines = Math.min(mineCount, totalCells - (safeRow !== null && safeCol !== null ? 1 : 0));

  let minesPlaced = 0;
  while (minesPlaced < maxMines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    // Skip if cell is the safe cell or already a mine
    if ((r === safeRow && c === safeCol) || board[r][c].isMine) {
      continue;
    }

    board[r][c].isMine = true;
    minesPlaced++;
  }

  // Calculate adjacent mine counts for each cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;

      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (board[nr][nc].isMine) {
              count++;
            }
          }
        }
      }
      board[r][c].adjacentCount = count;
    }
  }

  return board;
}
