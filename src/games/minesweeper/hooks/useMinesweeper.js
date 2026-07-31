import { useState, useEffect, useCallback, useRef } from 'react';
import { createEmptyBoard, generateBoard } from '../utils/boardGenerator';
import { floodFill } from '../utils/floodFill';

const LOCAL_STORAGE_KEY = 'minesweeper_best_time';
const DEFAULT_ROWS = 8;
const DEFAULT_COLS = 8;
const DEFAULT_MINES = 10;

export function useMinesweeper(rows = DEFAULT_ROWS, cols = DEFAULT_COLS, mineCount = DEFAULT_MINES) {
  const [grid, setGrid] = useState(() => createEmptyBoard(rows, cols));
  const [firstClickDone, setFirstClickDone] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [flagsUsed, setFlagsUsed] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [bestTime, setBestTime] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved !== null ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  });

  const timerRef = useRef(null);

  // Stop timer helper
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Timer interval effect
  useEffect(() => {
    if (firstClickDone && !isGameOver && !isWin) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [firstClickDone, isGameOver, isWin, stopTimer]);

  // Helper to check win condition: all non-mine cells revealed
  const checkWinCondition = useCallback((currentGrid) => {
    const totalCells = rows * cols;
    let revealedCount = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (currentGrid[r][c].isRevealed && !currentGrid[r][c].isMine) {
          revealedCount++;
        }
      }
    }

    if (revealedCount === totalCells - mineCount) {
      setIsWin(true);
      stopTimer();

      // Flag all mines automatically on victory
      setGrid((prevGrid) =>
        prevGrid.map((row) =>
          row.map((cell) => (cell.isMine ? { ...cell, isFlagged: true } : cell))
        )
      );

      // Record best time
      setElapsedTime((finalTime) => {
        setBestTime((prevBest) => {
          if (prevBest === null || finalTime < prevBest) {
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, finalTime.toString());
            } catch (e) {
              console.warn('Failed to save minesweeper_best_time to localStorage', e);
            }
            return finalTime;
          }
          return prevBest;
        });
        return finalTime;
      });
    }
  }, [rows, cols, mineCount, stopTimer]);

  // Handle Left Click (reveal cell)
  const handleCellClick = useCallback((r, c) => {
    if (isGameOver || isWin) return;

    let currentGrid = grid;

    // First click setup: generate board ensuring (r, c) is safe
    if (!firstClickDone) {
      currentGrid = generateBoard(rows, cols, mineCount, r, c);
      setFirstClickDone(true);
    }

    const cell = currentGrid[r][c];

    // Ignore if cell is flagged or already revealed
    if (cell.isFlagged || cell.isRevealed) return;

    // Hit a mine -> Game Over
    if (cell.isMine) {
      setIsGameOver(true);
      stopTimer();

      // Reveal all mines on game over
      setGrid(
        currentGrid.map((row) =>
          row.map((item) => (item.isMine ? { ...item, isRevealed: true } : item))
        )
      );
      return;
    }

    // Flood fill if 0-count, otherwise reveal single cell
    let updatedGrid;
    if (cell.adjacentCount === 0) {
      updatedGrid = floodFill(currentGrid, r, c);
    } else {
      updatedGrid = currentGrid.map((rowArr, rowIdx) =>
        rowArr.map((colCell, colIdx) =>
          rowIdx === r && colIdx === c ? { ...colCell, isRevealed: true } : colCell
        )
      );
    }

    setGrid(updatedGrid);
    checkWinCondition(updatedGrid);
  }, [grid, firstClickDone, isGameOver, isWin, rows, cols, mineCount, stopTimer, checkWinCondition]);

  // Handle Right Click (toggle flag)
  const handleCellContextMenu = useCallback((e, r, c) => {
    e.preventDefault();
    if (isGameOver || isWin) return;

    const cell = grid[r][c];
    if (cell.isRevealed) return;

    // Toggle flag status
    const newFlagState = !cell.isFlagged;

    // Prevent adding flags if max mines reached (optional safety limit)
    if (newFlagState && flagsUsed >= mineCount) return;

    const updatedGrid = grid.map((rowArr, rowIdx) =>
      rowArr.map((colCell, colIdx) =>
        rowIdx === r && colIdx === c ? { ...colCell, isFlagged: newFlagState } : colCell
      )
    );

    setGrid(updatedGrid);
    setFlagsUsed((prev) => (newFlagState ? prev + 1 : prev - 1));
  }, [grid, isGameOver, isWin, flagsUsed, mineCount]);

  // Reset / Restart Game
  const resetGame = useCallback(() => {
    stopTimer();
    setGrid(createEmptyBoard(rows, cols));
    setFirstClickDone(false);
    setIsGameOver(false);
    setIsWin(false);
    setFlagsUsed(0);
    setElapsedTime(0);
  }, [rows, cols, stopTimer]);

  const resetBestTime = useCallback(() => {
    setBestTime(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear minesweeper_best_time from localStorage', e);
    }
  }, []);

  return {
    grid,
    isGameOver,
    isWin,
    flagsUsed,
    firstClickDone,
    elapsedTime,
    bestTime,
    mineCount,
    handleCellClick,
    handleCellContextMenu,
    resetGame,
    resetBestTime,
  };
}
