import { describe, it, expect } from 'vitest';
import { createEmptyGrid, dropToken } from './dropToken';
import { getComputerMove } from './getComputerMove';

describe('Connect Four - getComputerMove AI', () => {
  it('takes the winning move when 3-in-a-row AI tokens exist', () => {
    let grid = createEmptyGrid();
    // AI (2) has 3 in a row horizontally at bottom row
    grid[5][0] = 2;
    grid[5][1] = 2;
    grid[5][2] = 2;

    const move = getComputerMove(grid, 2, 1);
    expect(move).toBe(3); // Completes 4 in a row at col 3
  });

  it('blocks player winning move when player has 3-in-a-row', () => {
    let grid = createEmptyGrid();
    // Player (1) has 3 in a row vertically at col 1
    grid[5][1] = 1;
    grid[4][1] = 1;
    grid[3][1] = 1;

    const move = getComputerMove(grid, 2, 1);
    expect(move).toBe(1); // Blocks col 1
  });

  it('prefers center column (col 3) on empty board', () => {
    const grid = createEmptyGrid();
    const move = getComputerMove(grid, 2, 1);
    expect(move).toBe(3);
  });
});
