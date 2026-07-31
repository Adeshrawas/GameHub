export const WORD_LIST = [
  'REACT', 'JAVASCRIPT', 'PUZZLE', 'MEMORY', 'ARCADE', 'SNAKE',
  'REACTION', 'MATRIX', 'VECTOR', 'ROCKET', 'CYBER', 'NEON',
  'CANVAS', 'SIGNAL', 'SHUFFLE', 'SCORE', 'STREAK', 'LEGEND',
  'SOLVER', 'DYNAMIC', 'SYSTEM', 'OBJECT', 'LOGIC', 'WIZARD',
  'BATTLE', 'PLAYER', 'ACTION', 'MASTER', 'SILVER', 'GOLDEN'
];

/**
 * Returns a random word from WORD_LIST, avoiding immediate duplicate if possible.
 * 
 * @param {string} [currentWord] 
 * @returns {string}
 */
export function getRandomWord(currentWord = '') {
  const filtered = WORD_LIST.filter((w) => w !== currentWord);
  const pool = filtered.length > 0 ? filtered : WORD_LIST;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
