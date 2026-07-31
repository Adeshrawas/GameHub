/**
 * Pure function to validate player input sequence against expected target sequence.
 * 
 * @param {string[]} sequence Target sequence of color IDs
 * @param {string[]} playerInput Player's input sequence of color IDs
 * @returns {{ isCorrect: boolean, mismatchIndex: number | null, isComplete: boolean }}
 */
export function validateSequence(sequence = [], playerInput = []) {
  for (let i = 0; i < playerInput.length; i++) {
    if (playerInput[i] !== sequence[i]) {
      return {
        isCorrect: false,
        mismatchIndex: i,
        isComplete: false
      };
    }
  }

  const isComplete = playerInput.length === sequence.length && sequence.length > 0;

  return {
    isCorrect: true,
    mismatchIndex: null,
    isComplete
  };
}
