/**
 * Finds all empty cells in a 4x4 grid and places a new tile (90% chance of 2, 10% chance of 4).
 * @param {number[][]} grid 4x4 2D array
 * @returns {{ grid: number[][], spawned: boolean }}
 */
export function spawnRandomTile(grid) {
  const newGrid = grid.map((row) => [...row]);
  const emptyCells = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (newGrid[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }

  if (emptyCells.length === 0) {
    return { grid: newGrid, spawned: false };
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { r, c } = emptyCells[randomIndex];

  // 90% chance of 2, 10% chance of 4
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;

  return { grid: newGrid, spawned: true };
}

/**
 * Initializes a fresh 4x4 grid with 2 starting tiles.
 * @returns {number[][]}
 */
export function createInitialGrid() {
  let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  grid = spawnRandomTile(grid).grid;
  grid = spawnRandomTile(grid).grid;

  return grid;
}
