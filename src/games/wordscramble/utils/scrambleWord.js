/**
 * Pure function to scramble/shuffle letters of a word.
 * Guarantees that the scrambled output differs from the original word
 * for words with length > 1 (unless all letters are identical).
 * 
 * @param {string} word 
 * @returns {string} Scrambled word string
 */
export function scrambleWord(word) {
  if (!word || typeof word !== 'string') return '';
  const upper = word.toUpperCase();
  if (upper.length <= 1) return upper;

  let scrambled = upper;
  let attempts = 0;

  while (scrambled === upper && attempts < 30) {
    const letters = upper.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    scrambled = letters.join('');
    attempts++;
  }

  // Fallback: If still identical after 30 attempts (e.g. anagram edge cases), swap first two distinct chars
  if (scrambled === upper) {
    const letters = upper.split('');
    for (let i = 1; i < letters.length; i++) {
      if (letters[i] !== letters[0]) {
        [letters[0], letters[i]] = [letters[i], letters[0]];
        scrambled = letters.join('');
        break;
      }
    }
  }

  return scrambled;
}
