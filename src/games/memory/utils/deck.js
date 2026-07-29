/**
 * Pool of 45 unique emoji symbols — supports up to 45 pairs (90 cards).
 * Level 27-30 use 40 pairs so this pool covers all 30 levels.
 */
const SYMBOLS = [
  '🎮', '🎯', '🎲', '🎸', '🎺', '🎻', '🎨', '🎭', '🎪',
  '🎡', '🎢', '🎠', '🎃', '🎄', '🎆', '🎇', '🎊', '🎉',
  '🎋', '🎍', '🥁', '🎤', '🎧', '🎼', '📻', '📺', '📷',
  '📹', '🎬', '💾', '💿', '📀', '💻', '📱', '⌚',
  '🦄', '🐉', '🦋', '🌈', '⭐', '🌙', '☀️', '🌊', '🍎', '🏆',
];

/**
 * Returns a shuffled flat array of card objects for `pairCount` unique pairs.
 * Each value appears exactly twice.
 *
 * @param {number} pairCount
 * @returns {{ id: number, value: string, isFlipped: boolean, isMatched: boolean }[]}
 */
export function generateDeck(pairCount) {
  if (pairCount > SYMBOLS.length) {
    throw new Error(`pairCount ${pairCount} exceeds symbol pool (${SYMBOLS.length})`);
  }

  const selected = SYMBOLS.slice(0, pairCount);
  const doubled  = [...selected, ...selected];

  // Fisher-Yates shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled.map((value, id) => ({ id, value, isFlipped: false, isMatched: false }));
}
