import { describe, it, expect } from 'vitest';
import { determineWinner } from '../determineWinner';

describe('determineWinner', () => {
  it('should return "draw" when choices are identical (3 cases)', () => {
    expect(determineWinner('rock', 'rock')).toBe('draw');
    expect(determineWinner('paper', 'paper')).toBe('draw');
    expect(determineWinner('scissors', 'scissors')).toBe('draw');
  });

  it('should return "win" when player wins (3 cases)', () => {
    expect(determineWinner('rock', 'scissors')).toBe('win');
    expect(determineWinner('paper', 'rock')).toBe('win');
    expect(determineWinner('scissors', 'paper')).toBe('win');
  });

  it('should return "lose" when player loses (3 cases)', () => {
    expect(determineWinner('rock', 'paper')).toBe('lose');
    expect(determineWinner('paper', 'scissors')).toBe('lose');
    expect(determineWinner('scissors', 'rock')).toBe('lose');
  });

  it('should be case insensitive', () => {
    expect(determineWinner('ROCK', 'Scissors')).toBe('win');
  });
});
