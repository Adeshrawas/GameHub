import { describe, it, expect } from 'vitest';
import { createEmptyBoard } from './boardGenerator';
import { floodFill } from './floodFill';

describe('Minesweeper - floodFill', () => {
  it('reveals connected 0-count cells and stops at boundary cells with adjacentCount > 0', () => {
    // 4x4 Grid setup:
    // M 1 0 0
    // 1 1 0 0
    // 0 0 0 0
    // 0 0 0 0
    const board = createEmptyBoard(4, 4);
    board[0][0].isMine = true;
    board[0][1].adjacentCount = 1;
    board[1][0].adjacentCount = 1;
    board[1][1].adjacentCount = 1;

    // Start fill at (3,3) which has adjacentCount = 0
    const filled = floodFill(board, 3, 3);

    // All connected 0-count cells should be revealed
    expect(filled[3][3].isRevealed).toBe(true);
    expect(filled[2][2].isRevealed).toBe(true);
    expect(filled[1][2].isRevealed).toBe(true);
    expect(filled[0][2].isRevealed).toBe(true);
    expect(filled[0][3].isRevealed).toBe(true);

    // Boundary numbered cells (adjacentCount > 0) should be revealed
    expect(filled[0][1].isRevealed).toBe(true);
    expect(filled[1][0].isRevealed).toBe(true);
    expect(filled[1][1].isRevealed).toBe(true);

    // Mine cell (0,0) should NOT be revealed
    expect(filled[0][0].isRevealed).toBe(false);
  });

  it('only reveals itself when starting cell has adjacentCount > 0 (no flood expansion)', () => {
    const board = createEmptyBoard(3, 3);
    board[0][0].isMine = true;
    board[0][1].adjacentCount = 1;
    board[1][0].adjacentCount = 1;
    board[1][1].adjacentCount = 1;

    // Start fill directly on cell (0,1) which has adjacentCount = 1
    const filled = floodFill(board, 0, 1);

    // Only (0,1) should be revealed
    expect(filled[0][1].isRevealed).toBe(true);
    expect(filled[0][2].isRevealed).toBe(false);
    expect(filled[1][1].isRevealed).toBe(false);
    expect(filled[2][2].isRevealed).toBe(false);
  });
});
