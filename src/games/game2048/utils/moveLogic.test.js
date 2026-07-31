import { describe, it, expect } from 'vitest';
import { slideAndMergeRow, moveGrid } from './moveLogic';

describe('2048 - moveLogic', () => {
  describe('slideAndMergeRow', () => {
    it('slides tiles without merging when no adjacent values match', () => {
      const { row } = slideAndMergeRow([0, 2, 0, 4]);
      expect(row).toEqual([2, 4, 0, 0]);
    });

    it('merges two equal adjacent tiles into doubled value', () => {
      const { row, scoreGained } = slideAndMergeRow([2, 2, 0, 4]);
      expect(row).toEqual([4, 4, 0, 0]);
      expect(scoreGained).toBe(4);
    });

    it('ensures a tile does NOT merge twice in a single move ([2, 2, 2, 2] -> [4, 4, 0, 0])', () => {
      const { row, scoreGained } = slideAndMergeRow([2, 2, 2, 2]);
      expect(row).toEqual([4, 4, 0, 0]);
      expect(scoreGained).toBe(8);
    });
  });

  describe('moveGrid in all 4 directions', () => {
    const initialGrid = [
      [2, 0, 0, 2],
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 2]
    ];

    it('moves LEFT correctly', () => {
      const { newGrid, moved } = moveGrid(initialGrid, 'left');
      expect(moved).toBe(true);
      expect(newGrid[0]).toEqual([4, 0, 0, 0]);
      expect(newGrid[2]).toEqual([2, 0, 0, 0]);
      expect(newGrid[3]).toEqual([2, 0, 0, 0]);
    });

    it('moves RIGHT correctly', () => {
      const { newGrid, moved } = moveGrid(initialGrid, 'right');
      expect(moved).toBe(true);
      expect(newGrid[0]).toEqual([0, 0, 0, 4]);
      expect(newGrid[2]).toEqual([0, 0, 0, 2]);
      expect(newGrid[3]).toEqual([0, 0, 0, 2]);
    });

    it('moves UP correctly', () => {
      const { newGrid, moved } = moveGrid(initialGrid, 'up');
      expect(moved).toBe(true);
      expect(newGrid[0]).toEqual([4, 0, 0, 4]);
      expect(newGrid[1]).toEqual([0, 0, 0, 0]);
    });

    it('moves DOWN correctly', () => {
      const { newGrid, moved } = moveGrid(initialGrid, 'down');
      expect(moved).toBe(true);
      expect(newGrid[3]).toEqual([4, 0, 0, 4]);
      expect(newGrid[2]).toEqual([0, 0, 0, 0]);
    });
  });
});
