import { useState, useEffect, useCallback } from 'react';
import { determineWinner, CHOICES } from '../utils/determineWinner';

const LOCAL_STORAGE_KEY = 'rps_best_streak';

export function useRPS() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      console.warn('Failed to load rps_best_streak from localStorage', e);
      return 0;
    }
  });

  const playRound = useCallback((choice) => {
    if (!CHOICES.includes(choice)) return;

    // Pick computer choice randomly
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    const compChoice = CHOICES[randomIndex];

    // Determine outcome
    const outcome = determineWinner(choice, compChoice);

    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(outcome);

    // Update streak based on outcome
    if (outcome === 'win') {
      setCurrentStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        setBestStreak((prevBest) => {
          if (newStreak > prevBest) {
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, newStreak.toString());
            } catch (e) {
              console.warn('Failed to save rps_best_streak to localStorage', e);
            }
            return newStreak;
          }
          return prevBest;
        });
        return newStreak;
      });
    } else if (outcome === 'lose') {
      setCurrentStreak(0);
    }
    // On 'draw', currentStreak remains unchanged
  }, []);

  const resetRound = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  }, []);

  const resetAllStats = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setCurrentStreak(0);
    setBestStreak(0);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear rps_best_streak from localStorage', e);
    }
  }, []);

  return {
    playerChoice,
    computerChoice,
    result,
    currentStreak,
    bestStreak,
    playRound,
    resetRound,
    resetAllStats,
  };
}
