import { describe, it, expect } from 'vitest';
import { checkWallCollision, checkSelfCollision } from './collisionCheck';

describe('Snake - collisionCheck', () => {
  describe('checkWallCollision', () => {
    const gridCols = 20;
    const gridRows = 20;

    it('detects wall collision on all 4 boundaries', () => {
      expect(checkWallCollision({ x: -1, y: 10 }, gridCols, gridRows)).toBe(true); // Left
      expect(checkWallCollision({ x: 20, y: 10 }, gridCols, gridRows)).toBe(true); // Right
      expect(checkWallCollision({ x: 10, y: -1 }, gridCols, gridRows)).toBe(true); // Top
      expect(checkWallCollision({ x: 10, y: 20 }, gridCols, gridRows)).toBe(true); // Bottom
    });

    it('returns false for head position inside valid grid boundary', () => {
      expect(checkWallCollision({ x: 5, y: 5 }, gridCols, gridRows)).toBe(false);
      expect(checkWallCollision({ x: 0, y: 0 }, gridCols, gridRows)).toBe(false);
      expect(checkWallCollision({ x: 19, y: 19 }, gridCols, gridRows)).toBe(false);
    });
  });

  describe('checkSelfCollision', () => {
    it('detects self-collision when head overlaps a body segment', () => {
      const head = { x: 5, y: 5 };
      const body = [{ x: 5, y: 6 }, { x: 5, y: 5 }, { x: 4, y: 5 }];
      expect(checkSelfCollision(head, body)).toBe(true);
    });

    it('returns false when head does not overlap any body segment', () => {
      const head = { x: 5, y: 5 };
      const body = [{ x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }];
      expect(checkSelfCollision(head, body)).toBe(false);
    });
  });
});
