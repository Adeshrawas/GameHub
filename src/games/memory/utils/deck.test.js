import { describe, it, expect } from 'vitest';
import { generateDeck } from './deck';

describe('Memory Match - deck generation', () => {
  it('generates the correct total number of cards for a given pairCount', () => {
    const deck = generateDeck(6);
    expect(deck).toHaveLength(12);
  });

  it('ensures every value appears exactly twice', () => {
    const pairCount = 8;
    const deck = generateDeck(pairCount);
    const counts = {};

    deck.forEach((card) => {
      counts[card.value] = (counts[card.value] || 0) + 1;
    });

    expect(Object.keys(counts)).toHaveLength(pairCount);
    Object.values(counts).forEach((count) => {
      expect(count).toBe(2);
    });
  });

  it('shuffles the deck across multiple runs', () => {
    const pairCount = 10;
    const runs = Array.from({ length: 5 }, () =>
      generateDeck(pairCount).map((card) => card.value).join(',')
    );

    // At least two runs out of 5 should differ from each other due to random shuffling
    const allIdentical = runs.every((run) => run === runs[0]);
    expect(allIdentical).toBe(false);
  });
});
