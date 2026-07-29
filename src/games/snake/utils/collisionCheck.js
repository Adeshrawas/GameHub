/**
 * Checks if snake head hits wall boundary.
 * @param {{x: number, y: number}} head 
 * @param {number} gridCols 
 * @param {number} gridRows 
 * @returns {boolean}
 */
export function checkWallCollision(head, gridCols = 20, gridRows = 20) {
  return head.x < 0 || head.x >= gridCols || head.y < 0 || head.y >= gridRows;
}

/**
 * Checks if snake head hits its own body segment.
 * @param {{x: number, y: number}} head 
 * @param {Array<{x: number, y: number}>} body 
 * @returns {boolean}
 */
export function checkSelfCollision(head, body) {
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}
