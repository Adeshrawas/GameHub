import { describe, it, expect } from 'vitest';
import { calculateWPM, calculateAccuracy, calculateTypingStats } from '../wpmCalculator';

describe('wpmCalculator', () => {
  it('calculateWPM correctly computes words per minute', () => {
    // 250 characters typed in 60,000ms (1 minute) = 50 WPM
    expect(calculateWPM(250, 60000)).toBe(50);
    // 50 characters in 30,000ms (0.5 minute) = 20 WPM
    expect(calculateWPM(50, 30000)).toBe(20);
    // Edge cases: 0 time or 0 chars
    expect(calculateWPM(0, 60000)).toBe(0);
    expect(calculateWPM(250, 0)).toBe(0);
  });

  it('calculateAccuracy correctly computes accuracy percentage', () => {
    expect(calculateAccuracy(50, 50)).toBe(100);
    expect(calculateAccuracy(40, 50)).toBe(80);
    expect(calculateAccuracy(0, 50)).toBe(0);
    expect(calculateAccuracy(0, 0)).toBe(100);
  });

  it('calculateTypingStats computes combined metrics', () => {
    const target = 'Hello World';
    const typed = 'Hello World';
    const startTime = 100000;
    const endTime = 112000; // 12 seconds
    // 11 chars in 12s -> (11/5) / (12/60) = 2.2 / 0.2 = 11 WPM
    const stats = calculateTypingStats(target, typed, startTime, endTime);
    expect(stats.wpm).toBe(11);
    expect(stats.accuracy).toBe(100);
    expect(stats.timeInSeconds).toBe(12.0);
  });
});
