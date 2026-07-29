/**
 * Slides non-zero elements to the left and merges identical adjacent tiles once per move.
 * @param {number[]} row Single row of length 4
 * @returns {{ row: number[], scoreGained: number }}
 */
export function slideAndMergeRow(row) {
  // 1. Filter out zeroes
  const nonZeroes = row.filter((val) => val !== 0);
  const merged = [];
  let scoreGained = 0;
  let skipNext = false;

  for (let i = 0; i < nonZeroes.length; i++) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    if (i < nonZeroes.length - 1 && nonZeroes[i] === nonZeroes[i + 1]) {
      const mergedVal = nonZeroes[i] * 2;
      merged.push(mergedVal);
      scoreGained += mergedVal;
      skipNext = true;
    } else {
      merged.push(nonZeroes[i]);
    }
  }

  // 2. Pad with trailing zeroes up to length 4
  while (merged.length < 4) {
    merged.push(0);
  }

  return { row: merged, scoreGained };
}

/**
 * Transposes a 4x4 2D array (rows become columns and vice versa).
 * @param {number[][]} grid 
 * @returns {number[][]}
 */
export function transpose(grid) {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

/**
 * Checks if two 4x4 grids are identical.
 * @param {number[][]} g1 
 * @param {number[][]} g2 
 * @returns {boolean}
 */
export function areGridsEqual(g1, g2) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (g1[r][c] !== g2[r][c]) return false;
    }
  }
  return true;
}

/**
 * Moves grid tiles in the specified direction ('left', 'right', 'up', 'down').
 * @param {number[][]} grid Current 4x4 grid
 * @param {'left'|'right'|'up'|'down'} direction 
 * @returns {{ newGrid: number[][], scoreGained: number, moved: boolean }}
 */
export function moveGrid(grid, direction) {
  let tempGrid = grid.map((row) => [...row]);
  let totalScore = 0;

  if (direction === 'left') {
    for (let r = 0; r < 4; r++) {
      const { row, scoreGained } = slideAndMergeRow(tempGrid[r]);
      tempGrid[r] = row;
      totalScore += scoreGained;
    }
  } else if (direction === 'right') {
    for (let r = 0; r < 4; r++) {
      const reversed = [...tempGrid[r]].reverse();
      const { row, scoreGained } = slideAndMergeRow(reversed);
      tempGrid[r] = row.reverse();
      totalScore += scoreGained;
    }
  } else if (direction === 'up') {
    let transposed = transpose(tempGrid);
    for (let r = 0; r < 4; r++) {
      const { row, scoreGained } = slideAndMergeRow(transposed[r]);
      transposed[r] = row;
      totalScore += scoreGained;
    }
    tempGrid = transpose(transposed);
  } else if (direction === 'down') {
    let transposed = transpose(tempGrid);
    for (let r = 0; r < 4; r++) {
      const reversed = [...transposed[r]].reverse();
      const { row, scoreGained } = slideAndMergeRow(reversed);
      transposed[r] = row.reverse();
      totalScore += scoreGained;
    }
    tempGrid = transpose(transposed);
  }

  const moved = !areGridsEqual(grid, tempGrid);

  return {
    newGrid: tempGrid,
    scoreGained: totalScore,
    moved
  };
}
