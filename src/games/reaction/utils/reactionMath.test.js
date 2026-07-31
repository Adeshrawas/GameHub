import { describe, it, expect } from 'vitest';
import { calculateReactionTime, calculateAverageReactionTime } from './reactionMath';

describe('Reaction Timer - reactionMath', () => {
  it('calculateReactionTime computes exact elapsed milliseconds', () => {
    const startTime = 1000;
    const endTime = 1250;
    expect(calculateReactionTime(startTime, endTime)).toBe(250);
  });

  it('calculateReactionTime handles invalid or zero values gracefully', () => {
    expect(calculateReactionTime(null, 1000)).toBe(0);
    expect(calculateReactionTime(1200, 1000)).toBe(0);
  });

  it('calculateAverageReactionTime computes rounded average', () => {
    expect(calculateAverageReactionTime([200, 300, 250])).toBe(250);
    expect(calculateAverageReactionTime([])).toBe(0);
  });
});
