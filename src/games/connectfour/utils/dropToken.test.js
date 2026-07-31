import { describe, it, expect } from 'vitest';
import { createEmptyGrid, dropToken } from './dropToken';

describe('Connect Four - dropToken', () => {
  it('places token at bottom row (row 5) when dropping into an empty column', () => {
    const grid = createEmptyGrid();
    const result = dropToken(grid, 3, 1);

    expect(result).not.toBeNull();
    expect(result.rowPlaced).toBe(5);
    expect(result.colPlaced).toBe(3);
    expect(result.newGrid[5][3]).toBe(1);
  });

  it('stacks token in lowest available empty row when column already has tokens', () => {
    let grid = createEmptyGrid();

    // Drop 1 token at col 0 -> lands on row 5
    const res1 = dropToken(grid, 0, 1);
    grid = res1.newGrid;

    // Drop 2nd token at col 0 -> lands on row 4
    const res2 = dropToken(grid, 0, 2);
    expect(res2.rowPlaced).toBe(4);
    expect(res2.newGrid[4][0]).toBe(2);
    expect(res2.newGrid[5][0]).toBe(1);
  });

  it('returns null and leaves original grid unmodified when dropping into a full column', () => {
    let grid = createEmptyGrid();

    // Fill column 0 completely (6 rows)
    for (let r = 0; r < 6; r++) {
      const res = dropToken(grid, 0, 1);
      grid = res.newGrid;
    }

    // Try dropping 7th token into column 0
    const result = dropToken(grid, 0, 2);
    expect(result).toBeNull();
  });
});
