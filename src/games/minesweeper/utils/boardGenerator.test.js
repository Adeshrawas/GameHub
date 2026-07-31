import { describe, it, expect } from 'vitest';
import { generateBoard, createEmptyBoard } from './boardGenerator';

describe('Minesweeper - boardGenerator', () => {
  it('places exact number of mines for given (rows, cols, mineCount)', () => {
    const rows = 8;
    const cols = 8;
    const mineCount = 10;
    const board = generateBoard(rows, cols, mineCount, 0, 0);

    let minesCounted = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c].isMine) minesCounted++;
      }
    }

    expect(minesCounted).toBe(mineCount);
  });

  it('calculates cell adjacentCount matching actual number of neighboring mines', () => {
    const rows = 6;
    const cols = 6;
    const board = generateBoard(rows, cols, 8, 2, 2);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c].isMine) continue;

        let expectedAdjacent = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
              expectedAdjacent++;
            }
          }
        }

        expect(board[r][c].adjacentCount).toBe(expectedAdjacent);
      }
    }
  });

  it('guarantees the first-clicked cell (safeRow, safeCol) is never a mine', () => {
    const safeRow = 3;
    const safeCol = 4;

    for (let i = 0; i < 20; i++) {
      const board = generateBoard(8, 8, 15, safeRow, safeCol);
      expect(board[safeRow][safeCol].isMine).toBe(false);
    }
  });
});
