/**
 * Calculates Words Per Minute (WPM) based on character count and duration.
 * Standard formula: (characters typed / 5) / (time in minutes)
 * 
 * @param {number} charCount - Number of characters typed (or length of target sentence)
 * @param {number} timeInMs - Duration in milliseconds
 * @returns {number} Rounded WPM
 */
export function calculateWPM(charCount, timeInMs) {
  if (!charCount || charCount <= 0 || !timeInMs || timeInMs <= 0) {
    return 0;
  }
  const timeInMinutes = timeInMs / 1000 / 60;
  const words = charCount / 5;
  const wpm = words / timeInMinutes;
  return Math.max(0, Math.round(wpm));
}

/**
 * Calculates typing accuracy percentage.
 * Formula: (correct characters / total characters typed) * 100
 * 
 * @param {number} correctChars - Number of correct characters
 * @param {number} totalTyped - Total number of keystrokes / typed characters
 * @returns {number} Rounded accuracy percentage (0-100)
 */
export function calculateAccuracy(correctChars, totalTyped) {
  if (!totalTyped || totalTyped <= 0) {
    return 100;
  }
  const accuracy = (correctChars / totalTyped) * 100;
  return Math.min(100, Math.max(0, Math.round(accuracy)));
}

/**
 * Helper to compute full typing statistics given the target sentence, typed text, and timestamps.
 * 
 * @param {string} targetSentence 
 * @param {string} typedText 
 * @param {number} startTime 
 * @param {number} endTime 
 * @param {number} totalKeystrokes - optional tracking of total keystrokes (including backspaces)
 * @returns {{ wpm: number, accuracy: number, timeInSeconds: number, correctChars: number }}
 */
export function calculateTypingStats(targetSentence = '', typedText = '', startTime = null, endTime = null, totalKeystrokes = null) {
  if (!startTime) {
    return { wpm: 0, accuracy: 100, timeInSeconds: 0, correctChars: 0 };
  }

  const durationMs = (endTime || Date.now()) - startTime;
  const timeInSeconds = Math.max(0.1, durationMs / 1000);

  let correctChars = 0;
  const minLength = Math.min(targetSentence.length, typedText.length);
  for (let i = 0; i < minLength; i++) {
    if (targetSentence[i] === typedText[i]) {
      correctChars++;
    }
  }

  // If totalKeystrokes is provided, use it for accuracy; otherwise use typedText.length
  const totalAttempts = totalKeystrokes && totalKeystrokes > 0 ? totalKeystrokes : typedText.length;
  const accuracy = calculateAccuracy(correctChars, totalAttempts);
  
  // WPM is calculated using total correct characters typed matching target length
  const wpm = calculateWPM(typedText.length, durationMs);

  return {
    wpm,
    accuracy,
    timeInSeconds: parseFloat(timeInSeconds.toFixed(1)),
    correctChars
  };
}
