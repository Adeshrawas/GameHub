/**
 * Compares a player's numeric guess against the secret target number.
 * 
 * @param {number} guess - The numeric guess
 * @param {number} target - The secret target number
 * @returns {'high' | 'low' | 'correct'}
 */
export function compareGuess(guess, target) {
  const numericGuess = Number(guess);
  const numericTarget = Number(target);

  if (numericGuess > numericTarget) {
    return 'high';
  }
  if (numericGuess < numericTarget) {
    return 'low';
  }
  return 'correct';
}

/**
 * Validates whether an input is a valid integer within [min, max].
 * 
 * @param {string|number} input 
 * @param {number} min 
 * @param {number} max 
 * @returns {{ isValid: boolean, error: string|null }}
 */
export function validateGuessInput(input, min = 1, max = 100) {
  if (input === '' || input === null || input === undefined) {
    return { isValid: false, error: 'Please enter a number.' };
  }

  const num = Number(input);

  if (isNaN(num) || !Number.isInteger(num)) {
    return { isValid: false, error: 'Please enter a valid whole number.' };
  }

  if (num < min || num > max) {
    return { isValid: false, error: `Please enter a number between ${min} and ${max}.` };
  }

  return { isValid: true, error: null };
}
