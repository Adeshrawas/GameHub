import { describe, it, expect } from 'vitest';
import { compareGuess, validateGuessInput } from './guessLogic';

describe('Number Guessing Game - guessLogic', () => {
  describe('compareGuess', () => {
    it('returns "low" when guess is below target', () => {
      expect(compareGuess(25, 50)).toBe('low');
    });

    it('returns "high" when guess is above target', () => {
      expect(compareGuess(75, 50)).toBe('high');
    });

    it('returns "correct" when guess equals target', () => {
      expect(compareGuess(50, 50)).toBe('correct');
    });
  });

  describe('validateGuessInput boundary tests', () => {
    const min = 1;
    const max = 100;

    it('accepts exact boundary values (min and max)', () => {
      expect(validateGuessInput(min, min, max).isValid).toBe(true);
      expect(validateGuessInput(max, min, max).isValid).toBe(true);
    });

    it('rejects values just beyond boundary boundaries', () => {
      expect(validateGuessInput(min - 1, min, max).isValid).toBe(false);
      expect(validateGuessInput(max + 1, min, max).isValid).toBe(false);
    });

    it('rejects invalid or non-integer inputs', () => {
      expect(validateGuessInput('invalid', min, max).isValid).toBe(false);
      expect(validateGuessInput('', min, max).isValid).toBe(false);
      expect(validateGuessInput(3.14, min, max).isValid).toBe(false);
    });
  });
});
