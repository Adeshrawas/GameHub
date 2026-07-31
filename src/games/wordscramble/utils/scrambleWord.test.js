import { describe, it, expect } from 'vitest';
import { scrambleWord } from './scrambleWord';

describe('Word Scramble - scrambleWord', () => {
  it('contains exactly the same letters and character counts as the original word', () => {
    const word = 'JAVASCRIPT';
    const scrambled = scrambleWord(word);

    const sortLetters = (str) => str.toUpperCase().split('').sort().join('');
    expect(sortLetters(scrambled)).toBe(sortLetters(word));
  });

  it('guarantees scrambled result never equals original word for multi-letter words', () => {
    const words = ['REACT', 'PUZZLE', 'MATRIX', 'VECTOR', 'SNAKE'];

    words.forEach((w) => {
      for (let i = 0; i < 10; i++) {
        const scrambled = scrambleWord(w);
        expect(scrambled).not.toBe(w.toUpperCase());
      }
    });
  });

  it('handles single-letter or all-identical letter words safely without infinite loops', () => {
    expect(scrambleWord('A')).toBe('A');
    expect(scrambleWord('AAAA')).toBe('AAAA');
    expect(scrambleWord('')).toBe('');
  });
});
