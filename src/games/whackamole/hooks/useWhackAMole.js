import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'whackamole_best';
const GAME_DURATION = 30; // seconds
const GRID_SIZE = 9; // 3x3 grid

export function useWhackAMole() {
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // Visual feedback states for hit animations
  const [whackedHole, setWhackedHole] = useState(null);
  const [combo, setCombo] = useState(0);

  const countdownTimerRef = useRef(null);
  const popupTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const lastHoleRef = useRef(null);

  // Helper to pick a random hole distinct from the previous one if possible
  const getRandomHole = useCallback(() => {
    let randomHole;
    do {
      randomHole = Math.floor(Math.random() * GRID_SIZE);
    } while (randomHole === lastHoleRef.current && GRID_SIZE > 1);
    
    lastHoleRef.current = randomHole;
    return randomHole;
  }, []);

  // Clear all pending timers
  const clearTimers = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Handle Game Over logic
  const handleGameOver = useCallback(() => {
    clearTimers();
    setIsPlaying(false);
    setActiveHole(null);
    setCombo(0);

    setScore((finalScore) => {
      setBestScore((currentBest) => {
        if (finalScore > currentBest) {
          try {
            localStorage.setItem(STORAGE_KEY, finalScore.toString());
          } catch {
            // Ignore storage write errors
          }
          return finalScore;
        }
        return currentBest;
      });
      return finalScore;
    });
  }, [clearTimers]);

  const activeHoleRef = useRef(null);

  const updateActiveHole = useCallback((hole) => {
    activeHoleRef.current = hole;
    setActiveHole(hole);
  }, []);

  // Main mole popup loop
  const scheduleNextMole = useCallback(() => {
    // Randomize pop-up frequency between 800ms and 1200ms
    const interval = Math.floor(Math.random() * 400) + 800; // 800ms - 1200ms

    popupTimeoutRef.current = setTimeout(() => {
      const nextHole = getRandomHole();
      updateActiveHole(nextHole);

      // Mole remains visible for ~700ms before retreating
      const visibleDuration = 700;

      hideTimeoutRef.current = setTimeout(() => {
        updateActiveHole(null);
        // Schedule the subsequent mole pop-up
        scheduleNextMole();
      }, visibleDuration);
    }, interval);
  }, [getRandomHole, updateActiveHole]);

  // Start / Restart game action
  const startGame = useCallback(() => {
    clearTimers();

    setScore(0);
    setTimeLeft(GAME_DURATION);
    updateActiveHole(null);
    setWhackedHole(null);
    setCombo(0);
    setIsPlaying(true);
    lastHoleRef.current = null;

    // Start 30-second countdown timer
    countdownTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Schedule initial mole pop-up
    scheduleNextMole();
  }, [clearTimers, scheduleNextMole, updateActiveHole]);

  // Check game over when timeLeft hits 0
  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      handleGameOver();
    }
  }, [timeLeft, isPlaying, handleGameOver]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  // Handle clicking a hole
  const whackMole = useCallback(
    (holeIndex) => {
      if (!isPlaying) return;

      // If clicked hole is the currently active mole hole
      if (holeIndex !== null && holeIndex === activeHoleRef.current) {
        // Prevent double-scoring: immediately clear active hole ref and cancel hide timeout
        activeHoleRef.current = null;
        setActiveHole(null);

        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }

        // Increment score
        setScore((prev) => prev + 1);
        setCombo((prev) => prev + 1);

        // Trigger transient hit animation state
        setWhackedHole(holeIndex);
        setTimeout(() => setWhackedHole(null), 400);

        // Immediately schedule next mole pop-up to keep gameplay responsive
        if (popupTimeoutRef.current) {
          clearTimeout(popupTimeoutRef.current);
        }
        scheduleNextMole();
      }
    },
    [isPlaying, scheduleNextMole]
  );

  return {
    activeHole,
    score,
    timeLeft,
    isPlaying,
    bestScore,
    whackedHole,
    combo,
    startGame,
    whackMole,
    totalDuration: GAME_DURATION,
  };
}
