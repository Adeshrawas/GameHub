import { useState, useEffect, useCallback, useRef } from 'react';
import { generateStroopRound } from '../utils/roundGenerator';

const LOCAL_STORAGE_KEY = 'stroop_best';
const GAME_DURATION = 30; // seconds

export function useStroop() {
  const [currentRound, setCurrentRound] = useState(() => generateStroopRound());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null); // 'correct' | 'wrong' | null

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const timerRef = useRef(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      // Game over when countdown finishes
      stopTimer();
      setIsPlaying(false);

      setScore((finalScore) => {
        setBestScore((prevBest) => {
          if (finalScore > prevBest) {
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, finalScore.toString());
            } catch (e) {
              console.warn('Failed to save stroop_best to localStorage', e);
            }
            return finalScore;
          }
          return prevBest;
        });
        return finalScore;
      });
    }

    return () => stopTimer();
  }, [isPlaying, timeLeft, stopTimer]);

  // Start new round
  const startGame = useCallback(() => {
    stopTimer();
    setCurrentRound(generateStroopRound());
    setScore(0);
    setStreak(0);
    setTimeLeft(GAME_DURATION);
    setLastFeedback(null);
    setIsPlaying(true);
  }, [stopTimer]);

  // Handle color option selection
  const handleSelectOption = useCallback(
    (selectedColorId) => {
      if (!isPlaying) return;

      const isCorrect = selectedColorId === currentRound.displayColor.id;

      if (isCorrect) {
        setScore((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        setLastFeedback('correct');
      } else {
        setStreak(0);
        setLastFeedback('wrong');
      }

      // Generate next round immediately
      setCurrentRound(generateStroopRound());
    },
    [isPlaying, currentRound]
  );

  const resetBestScore = useCallback(() => {
    setBestScore(0);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear stroop_best from localStorage', e);
    }
  }, []);

  return {
    word: currentRound.word,
    displayColor: currentRound.displayColor,
    options: currentRound.options,
    score,
    streak,
    timeLeft,
    isPlaying,
    bestScore,
    lastFeedback,
    startGame,
    handleSelectOption,
    resetBestScore,
  };
}
