import { checkWallCollision, checkSelfCollision } from './collisionCheck';

/**
 * Calculates the next head coordinate based on direction.
 * @param {{x: number, y: number}} head 
 * @param {'UP'|'DOWN'|'LEFT'|'RIGHT'} direction 
 * @returns {{x: number, y: number}}
 */
export function getNextHeadPosition(head, direction) {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return { ...head };
  }
}

/**
 * Spawns food at a random position not occupied by the snake.
 * @param {Array<{x: number, y: number}>} snake 
 * @param {number} gridCols 
 * @param {number} gridRows 
 * @returns {{x: number, y: number}}
 */
export function spawnFood(snake, gridCols = 20, gridRows = 20) {
  let newFood;
  let isOccupied = true;

  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * gridCols),
      y: Math.floor(Math.random() * gridRows)
    };
    isOccupied = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
  }

  return newFood;
}

/**
 * Executes a single game tick step.
 * @param {Array<{x: number, y: number}>} snake 
 * @param {'UP'|'DOWN'|'LEFT'|'RIGHT'} direction 
 * @param {{x: number, y: number}} food 
 * @param {number} gridCols 
 * @param {number} gridRows 
 * @returns {{ isCollision: boolean, newSnake: Array<{x: number, y: number}>, newFood: {x: number, y: number}, ateFood: boolean }}
 */
export function stepGame(snake, direction, food, gridCols = 20, gridRows = 20) {
  const head = snake[0];
  const nextHead = getNextHeadPosition(head, direction);

  // Check collision with walls or self
  if (
    checkWallCollision(nextHead, gridCols, gridRows) ||
    checkSelfCollision(nextHead, snake)
  ) {
    return {
      isCollision: true,
      newSnake: snake,
      newFood: food,
      ateFood: false
    };
  }

  // Check if food eaten
  const ateFood = nextHead.x === food.x && nextHead.y === food.y;
  let newSnake;
  let newFood = food;

  if (ateFood) {
    newSnake = [nextHead, ...snake];
    newFood = spawnFood(newSnake, gridCols, gridRows);
  } else {
    newSnake = [nextHead, ...snake.slice(0, -1)];
  }

  return {
    isCollision: false,
    newSnake,
    newFood,
    ateFood
  };
}
