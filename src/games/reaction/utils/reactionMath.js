/**
 * Pure math helper to calculate elapsed reaction time in milliseconds.
 * 
 * @param {number} startTime 
 * @param {number} endTime 
 * @returns {number}
 */
export function calculateReactionTime(startTime, endTime) {
  if (!startTime || !endTime || endTime < startTime) {
    return 0;
  }
  return endTime - startTime;
}

/**
 * Pure math helper to calculate average reaction time from history.
 * 
 * @param {number[]} history 
 * @returns {number}
 */
export function calculateAverageReactionTime(history = []) {
  if (!history || history.length === 0) return 0;
  const sum = history.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / history.length);
}
