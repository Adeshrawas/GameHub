export const STROOP_COLORS = [
  { id: 'red', name: 'RED', textClass: 'text-rose-500', bgClass: 'bg-rose-500', borderClass: 'border-rose-500' },
  { id: 'blue', name: 'BLUE', textClass: 'text-blue-500', bgClass: 'bg-blue-500', borderClass: 'border-blue-500' },
  { id: 'green', name: 'GREEN', textClass: 'text-emerald-500', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-500' },
  { id: 'yellow', name: 'YELLOW', textClass: 'text-amber-400', bgClass: 'bg-amber-400', borderClass: 'border-amber-400' },
  { id: 'purple', name: 'PURPLE', textClass: 'text-purple-500', bgClass: 'bg-purple-500', borderClass: 'border-purple-500' },
  { id: 'orange', name: 'ORANGE', textClass: 'text-orange-500', bgClass: 'bg-orange-500', borderClass: 'border-orange-500' },
];

/**
 * Generates a single Stroop Test round.
 * Guarantees that the text word and the font color are different.
 * Returns 4 shuffled options containing the correct display color.
 * 
 * @returns {{ word: Object, displayColor: Object, options: Array<Object> }}
 */
export function generateStroopRound() {
  // 1. Pick a random word color object
  const wordIndex = Math.floor(Math.random() * STROOP_COLORS.length);
  const word = STROOP_COLORS[wordIndex];

  // 2. Pick a display color object different from the word text
  const availableDisplayColors = STROOP_COLORS.filter((c) => c.id !== word.id);
  const displayColorIndex = Math.floor(Math.random() * availableDisplayColors.length);
  const displayColor = availableDisplayColors[displayColorIndex];

  // 3. Form 4 option swatches including the correct display color
  const otherColors = STROOP_COLORS.filter((c) => c.id !== displayColor.id);
  // Shuffle other colors and take 3
  const shuffledOthers = [...otherColors].sort(() => Math.random() - 0.5);
  const selectedOptions = [displayColor, ...shuffledOthers.slice(0, 3)];

  // Shuffle final 4 options
  for (let i = selectedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedOptions[i], selectedOptions[j]] = [selectedOptions[j], selectedOptions[i]];
  }

  return {
    word,
    displayColor,
    options: selectedOptions,
  };
}
