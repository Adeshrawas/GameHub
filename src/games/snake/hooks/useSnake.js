import { useState, useEffect, useCallback, useRef } from 'react';
import { stepGame, spawnFood } from '../utils/gameLoop';

const GRID_COLS = 20;
const GRID_ROWS = 20;
const INITIAL_SPEED = 140;
const MIN_SPEED = 60;
const BEST_SCORE_KEY = 'snake_best';
const ALT_BEST_SCORE_KEY = 'snake_highscore';

const initialSnake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

export function useSnake() {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(() => spawnFood(initialSnake, GRID_COLS, GRID_ROWS));
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const lastExecutedDirection = useRef('RIGHT');

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(BEST_SCORE_KEY) || localStorage.getItem(ALT_BEST_SCORE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const updateBestScore = useCallback((newScore) => {
    setBestScore((prevBest) => {
      if (newScore > prevBest) {
        try {
          localStorage.setItem(BEST_SCORE_KEY, newScore.toString());
          localStorage.setItem(ALT_BEST_SCORE_KEY, newScore.toString());
        } catch (err) {
          console.error('Failed to save snake best score:', err);
        }
        return newScore;
      }
      return prevBest;
    });
  }, []);

  // Prevent 180-degree instant reversal
  const changeDirection = useCallback((newDir) => {
    const last = lastExecutedDirection.current;
    const isOpposite =
      (newDir === 'UP' && last === 'DOWN') ||
      (newDir === 'DOWN' && last === 'UP') ||
      (newDir === 'LEFT' && last === 'RIGHT') ||
      (newDir === 'RIGHT' && last === 'LEFT');

    if (!isOpposite) {
      setDirection(newDir);
    }
  }, []);

  // Restart game
  const restartGame = useCallback(() => {
    const freshSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    setSnake(freshSnake);
    setDirection('RIGHT');
    lastExecutedDirection.current = 'RIGHT';
    setFood(spawnFood(freshSnake, GRID_COLS, GRID_ROWS));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
  }, []);

  // Toggle pause state
  const togglePause = useCallback(() => {
    if (!isGameOver) {
      setIsPaused((prev) => !prev);
    }
  }, [isGameOver]);

  // Main game tick effect
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const timer = setInterval(() => {
      setSnake((currentSnake) => {
        setDirection((currentDir) => {
          lastExecutedDirection.current = currentDir;
          
          setFood((currentFood) => {
            const { isCollision, newSnake, newFood, ateFood } = stepGame(
              currentSnake,
              currentDir,
              currentFood,
              GRID_COLS,
              GRID_ROWS
            );

            if (isCollision) {
              setIsGameOver(true);
              return currentFood;
            }

            if (ateFood) {
              setScore((prevScore) => {
                const nextScore = prevScore + 10;
                updateBestScore(nextScore);
                return nextScore;
              });
              setSpeed((prevSpeed) => Math.max(MIN_SPEED, prevSpeed - 2));
            }

            setSnake(newSnake);
            return newFood;
          });

          return currentDir;
        });

        return currentSnake;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isGameOver, isPaused, speed, updateBestScore]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection('RIGHT');
          break;
        case ' ':
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, togglePause]);

  return {
    snake,
    direction,
    food,
    score,
    bestScore,
    isGameOver,
    isPaused,
    speed,
    changeDirection,
    togglePause,
    restartGame,
    gridCols: GRID_COLS,
    gridRows: GRID_ROWS
  };
}
