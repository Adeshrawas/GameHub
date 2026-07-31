import { describe, it, expect } from 'vitest';
import { checkGameOver } from './gameOverCheck';

describe('2048 - gameOverCheck', () => {
  it('returns false when an empty cell exists in grid', () => {
    const grid = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2, 4],
      [8, 16, 32, 0] // 0 at bottom-right
    ];
    expect(checkGameOver(grid)).toBe(false);
  });

  it('returns false when grid is full but adjacent equal tiles exist', () => {
    const grid = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2, 4],
      [8, 16, 32, 32] // adjacent matching 32s
    ];
    expect(checkGameOver(grid)).toBe(false);
  });

  it('returns true when grid is completely full with no possible merges', () => {
    const grid = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2]
    ];
    expect(checkGameOver(grid)).toBe(true);
  });
});
