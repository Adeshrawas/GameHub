export const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect when learning to type with speed and precision.",
  "Coding requires patience, attention to detail, and creative problem solving.",
  "Great achievements are built on small daily habits repeated consistently.",
  "Technology empowers developers to build incredible user experiences.",
  "Stay curious and keep exploring new horizons in software design.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Simplicity is the soul of efficiency in modern application development.",
  "Bright stars illuminate the dark night sky over quiet mountains.",
  "Clean code always looks like it was written by someone who cares.",
  "Innovation distinguishes between a leader and a follower.",
  "Continuous learning keeps your mind sharp and ready for any challenge.",
  "Focus on the process and the results will naturally follow.",
  "A journey of a thousand miles begins with a single confident step.",
  "Design is not just what it looks like, design is how it works.",
  "Reflexes and muscle memory improve through dedicated focus and practice."
];

/**
 * Returns a random sentence from the SENTENCES collection.
 * 
 * @param {string} [currentSentence] - Optional sentence to avoid immediate duplicate
 * @returns {string}
 */
export function getRandomSentence(currentSentence = '') {
  const filtered = SENTENCES.filter(s => s !== currentSentence);
  const pool = filtered.length > 0 ? filtered : SENTENCES;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
