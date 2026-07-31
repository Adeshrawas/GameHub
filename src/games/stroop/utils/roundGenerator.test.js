import { describe, it, expect } from 'vitest';
import { generateStroopRound } from './roundGenerator';

describe('Stroop Test - roundGenerator', () => {
  it('guarantees display color is always different from word text meaning (50 test runs)', () => {
    for (let i = 0; i < 50; i++) {
      const round = generateStroopRound();
      expect(round.word.id).not.toBe(round.displayColor.id);
    }
  });

  it('includes the correct answer display color exactly once in the options array', () => {
    for (let i = 0; i < 20; i++) {
      const round = generateStroopRound();
      const matches = round.options.filter((opt) => opt.id === round.displayColor.id);
      expect(matches).toHaveLength(1);
    }
  });

  it('ensures options array has 4 items with no duplicate colors', () => {
    const round = generateStroopRound();
    expect(round.options).toHaveLength(4);

    const optionIds = round.options.map((opt) => opt.id);
    const uniqueIds = new Set(optionIds);
    expect(uniqueIds.size).toBe(4);
  });
});
