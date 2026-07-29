import { useState, useEffect, useCallback, useRef } from 'react';
import { createInitialGrid, spawnRandomTile } from '../utils/spawnTile';
import { moveGrid } from '../utils/moveLogic';
import { checkGameOver, check2048Tile } from '../utils/gameOverCheck';

const BEST_SCORE_KEY = 'game2048_best';
const ALT_BEST_SCORE_KEY = '2048_highscore';

export function use2048() {
  const [grid, setGrid] = useState(() => createInitialGrid());
  const [score, setScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(BEST_SCORE_KEY) || localStorage.getItem(ALT_BEST_SCORE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const touchStartPos = useRef(null);

  // Update high score in state and LocalStorage
  const updateBestScore = useCallback((newScore) => {
    setBestScore((prevBest) => {
      if (newScore > prevBest) {
        try {
          localStorage.setItem(BEST_SCORE_KEY, newScore.toString());
          localStorage.setItem(ALT_BEST_SCORE_KEY, newScore.toString());
        } catch (err) {
          console.error('Failed to save 2048 high score:', err);
        }
        return newScore;
      }
      return prevBest;
    });
  }, []);

  // Execute direction move
  const move = useCallback(
    (direction) => {
      if (isGameOver) return;

      const { newGrid, scoreGained, moved } = moveGrid(grid, direction);

      if (!moved) return;

      const updatedScore = score + scoreGained;
      setScore(updatedScore);
      updateBestScore(updatedScore);

      // Check win condition
      if (!hasWon && !keepPlaying && check2048Tile(newGrid)) {
        setHasWon(true);
      }

      // Spawn new tile on valid move
      const { grid: gridWithTile } = spawnRandomTile(newGrid);
      setGrid(gridWithTile);

      // Check game over
      if (checkGameOver(gridWithTile)) {
        setIsGameOver(true);
      }
    },
    [grid, score, isGameOver, hasWon, keepPlaying, updateBestScore]
  );

  // Restart game
  const restartGame = useCallback(() => {
    setGrid(createInitialGrid());
    setScore(0);
    setHasWon(false);
    setIsGameOver(false);
    setKeepPlaying(false);
  }, []);

  // Continue playing after reaching 2048
  const continueGame = useCallback(() => {
    setKeepPlaying(true);
    setHasWon(false);
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid scrolling the window when using arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          move('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          move('right');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          move('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          move('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch Swipe handlers for Mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartPos.current || !e.changedTouches || e.changedTouches.length === 0) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartPos.current.x;
    const deltaY = endY - touchStartPos.current.y;

    const threshold = 30; // Min px swipe distance

    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        move(deltaX > 0 ? 'right' : 'left');
      } else {
        move(deltaY > 0 ? 'down' : 'up');
      }
    }

    touchStartPos.current = null;
  };

  return {
    grid,
    score,
    bestScore,
    hasWon,
    isGameOver,
    move,
    restartGame,
    continueGame,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    }
  };
}
