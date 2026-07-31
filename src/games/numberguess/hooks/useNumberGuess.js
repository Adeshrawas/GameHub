import { useState, useCallback } from 'react';
import { compareGuess, validateGuessInput } from '../utils/guessLogic';

export const DIFFICULTIES = {
  easy: { id: 'easy', label: 'Easy', min: 1, max: 50, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  medium: { id: 'medium', label: 'Medium', min: 1, max: 100, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
  hard: { id: 'hard', label: 'Hard', min: 1, max: 200, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLocalStorageKey(difficulty) {
  return `numberguess_${difficulty}_best`;
}

export function useNumberGuess() {
  const [difficulty, setDifficulty] = useState('medium');
  const [range, setRange] = useState({ min: 1, max: 100 });
  const [target, setTarget] = useState(() => getRandomNumber(1, 100));
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(getLocalStorageKey('medium'));
      return saved ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  });

  // Load best score for given difficulty
  const loadBestScore = useCallback((diffKey) => {
    try {
      const saved = localStorage.getItem(getLocalStorageKey(diffKey));
      return saved ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  }, []);

  // Change Difficulty
  const selectDifficulty = useCallback((diffKey) => {
    const diffConfig = DIFFICULTIES[diffKey] || DIFFICULTIES.medium;
    setDifficulty(diffKey);
    setRange({ min: diffConfig.min, max: diffConfig.max });
    setTarget(getRandomNumber(diffConfig.min, diffConfig.max));
    setGuesses([]);
    setCurrentGuess('');
    setIsWon(false);
    setErrorMessage(null);
    setBestScore(loadBestScore(diffKey));
  }, [loadBestScore]);

  // Submit Guess
  const submitGuess = useCallback((e) => {
    if (e) e.preventDefault();
    if (isWon) return;

    const validation = validateGuessInput(currentGuess, range.min, range.max);

    if (!validation.isValid) {
      setErrorMessage(validation.error);
      return;
    }

    setErrorMessage(null);
    const numGuess = parseInt(currentGuess, 10);
    const hint = compareGuess(numGuess, target);

    const newGuessEntry = {
      id: Date.now(),
      guess: numGuess,
      hint,
    };

    setGuesses((prev) => [newGuessEntry, ...prev]);
    setCurrentGuess('');

    // Check Win
    if (hint === 'correct') {
      setIsWon(true);
      const totalUsed = guesses.length + 1;

      setBestScore((prevBest) => {
        if (prevBest === null || totalUsed < prevBest) {
          try {
            localStorage.setItem(getLocalStorageKey(difficulty), totalUsed.toString());
          } catch (err) {
            console.warn('Failed to save best score to localStorage', err);
          }
          return totalUsed;
        }
        return prevBest;
      });
    }
  }, [currentGuess, range, target, isWon, guesses.length, difficulty]);

  // Start New Game in same difficulty
  const startNewGame = useCallback(() => {
    const diffConfig = DIFFICULTIES[difficulty] || DIFFICULTIES.medium;
    setTarget(getRandomNumber(diffConfig.min, diffConfig.max));
    setGuesses([]);
    setCurrentGuess('');
    setIsWon(false);
    setErrorMessage(null);
  }, [difficulty]);

  const resetBestScore = useCallback(() => {
    setBestScore(null);
    try {
      localStorage.removeItem(getLocalStorageKey(difficulty));
    } catch (e) {
      console.warn('Failed to clear best score from localStorage', e);
    }
  }, [difficulty]);

  return {
    difficulty,
    range,
    guesses,
    currentGuess,
    isWon,
    errorMessage,
    bestScore,
    setCurrentGuess,
    selectDifficulty,
    submitGuess,
    startNewGame,
    resetBestScore,
  };
}
