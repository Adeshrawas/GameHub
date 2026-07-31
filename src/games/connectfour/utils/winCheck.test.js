import { describe, it, expect } from 'vitest';
import { createEmptyGrid } from './dropToken';
import { checkWin } from './winCheck';

describe('Connect Four - winCheck', () => {
  it('detects horizontal 4-in-a-row win correctly', () => {
    const grid = createEmptyGrid();
    grid[5][1] = 1;
    grid[5][2] = 1;
    grid[5][3] = 1;
    grid[5][4] = 1; // Last move at (5,4)

    const win = checkWin(grid, 5, 4);
    expect(win).not.toBeNull();
    expect(win.winner).toBe(1);
    expect(win.winningLine).toHaveLength(4);
  });

  it('detects vertical 4-in-a-row win correctly', () => {
    const grid = createEmptyGrid();
    grid[5][0] = 2;
    grid[4][0] = 2;
    grid[3][0] = 2;
    grid[2][0] = 2; // Last move at (2,0)

    const win = checkWin(grid, 2, 0);
    expect(win).not.toBeNull();
    expect(win.winner).toBe(2);
  });

  it('detects diagonal down-right 4-in-a-row win correctly', () => {
    const grid = createEmptyGrid();
    grid[1][1] = 1;
    grid[2][2] = 1;
    grid[3][3] = 1;
    grid[4][4] = 1; // Last move at (4,4)

    const win = checkWin(grid, 4, 4);
    expect(win).not.toBeNull();
    expect(win.winner).toBe(1);
  });

  it('detects diagonal up-right 4-in-a-row win correctly', () => {
    const grid = createEmptyGrid();
    grid[4][1] = 2;
    grid[3][2] = 2;
    grid[2][3] = 2;
    grid[1][4] = 2; // Last move at (1,4)

    const win = checkWin(grid, 1, 4);
    expect(win).not.toBeNull();
    expect(win.winner).toBe(2);
  });

  it('returns null for near-miss (3-in-a-row)', () => {
    const grid = createEmptyGrid();
    grid[5][0] = 1;
    grid[5][1] = 1;
    grid[5][2] = 1;

    const win = checkWin(grid, 5, 2);
    expect(win).toBeNull();
  });

  it('does NOT false-positive on mixed player tokens in the same line (e.g., [1, 1, 2, 1])', () => {
    const grid = createEmptyGrid();
    grid[5][0] = 1;
    grid[5][1] = 1;
    grid[5][2] = 2; // Interrupted by player 2
    grid[5][3] = 1;

    const win = checkWin(grid, 5, 3);
    expect(win).toBeNull();
  });
});
