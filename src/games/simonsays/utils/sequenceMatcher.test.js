import { describe, it, expect } from 'vitest';
import { validateSequence } from './sequenceMatcher';

describe('Simon Says - sequenceMatcher', () => {
  it('returns success and isComplete = true for a full correct sequence match', () => {
    const sequence = ['red', 'blue', 'green'];
    const playerInput = ['red', 'blue', 'green'];
    const result = validateSequence(sequence, playerInput);

    expect(result.isCorrect).toBe(true);
    expect(result.mismatchIndex).toBeNull();
    expect(result.isComplete).toBe(true);
  });

  it('returns isCorrect = true and isComplete = false for a partial correct match', () => {
    const sequence = ['red', 'blue', 'green'];
    const playerInput = ['red', 'blue'];
    const result = validateSequence(sequence, playerInput);

    expect(result.isCorrect).toBe(true);
    expect(result.mismatchIndex).toBeNull();
    expect(result.isComplete).toBe(false);
  });

  it('returns failure with the correct mismatch index when input is wrong', () => {
    const sequence = ['red', 'blue', 'green'];
    const playerInput = ['red', 'yellow']; // Wrong at index 1
    const result = validateSequence(sequence, playerInput);

    expect(result.isCorrect).toBe(false);
    expect(result.mismatchIndex).toBe(1);
    expect(result.isComplete).toBe(false);
  });
});
