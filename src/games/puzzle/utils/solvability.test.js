import { describe, it, expect } from 'vitest';
import { isSolvable } from './solvability';

describe('Sliding Puzzle - solvability', () => {
  describe('Odd Width Grid (3x3)', () => {
    it('returns true for a known solvable 3x3 board (even inversions)', () => {
      // Solved state: 0 inversions
      const board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
      expect(isSolvable(board, 3, 3)).toBe(true);
    });

    it('returns false for a known unsolvable 3x3 board (odd inversions)', () => {
      // 1 inversion (8 > 7)
      const board = [1, 2, 3, 4, 5, 6, 8, 7, 0];
      expect(isSolvable(board, 3, 3)).toBe(false);
    });
  });

  describe('Even Width Grid (4x4)', () => {
    it('returns true for a known solvable 4x4 board', () => {
      // Solved state: 0 inversions, blank at bottom row (row 1 from bottom, odd)
      const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
      expect(isSolvable(board, 4, 4)).toBe(true);
    });

    it('returns false for a known unsolvable 4x4 board', () => {
      // 1 inversion (15 > 14), blank at bottom row
      const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];
      expect(isSolvable(board, 4, 4)).toBe(false);
    });
  });
});
