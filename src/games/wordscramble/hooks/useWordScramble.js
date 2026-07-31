import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomWord } from '../utils/wordList';
import { scrambleWord } from '../utils/scrambleWord';

const LOCAL_STORAGE_KEY = 'wordscramble_best';

export function useWordScramble() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [scrambledWord, setScrambledWord] = useState(() => scrambleWord(currentWord));
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [wordHintsUsed, setWordHintsUsed] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]); // array of 0-based index
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSuccessFeedback, setIsSuccessFeedback] = useState(false);

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const timerRef = useRef(null);

  // Timer interval effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Update scrambled word whenever currentWord changes
  useEffect(() => {
    setScrambledWord(scrambleWord(currentWord));
    setRevealedLetters([]);
    setWordHintsUsed(0);
  }, [currentWord]);

  // Submit Guess
  const submitGuess = useCallback(
    (e) => {
      if (e) e.preventDefault();

      const normalizedGuess = guess.trim().toUpperCase();

      if (normalizedGuess === currentWord.toUpperCase()) {
        // Correct Guess!
        const basePoints = 100;
        const penalty = wordHintsUsed * 25;
        const pointsAwarded = Math.max(25, basePoints - penalty);

        setIsSuccessFeedback(true);
        setTimeout(() => setIsSuccessFeedback(false), 500);

        setScore((prevScore) => {
          const newScore = prevScore + pointsAwarded;

          setBestScore((prevBest) => {
            if (newScore > prevBest) {
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, newScore.toString());
              } catch (err) {
                console.warn('Failed to save wordscramble_best to localStorage', err);
              }
              return newScore;
            }
            return prevBest;
          });

          return newScore;
        });

        setWordsCompleted((prev) => prev + 1);
        const nextWord = getRandomWord(currentWord);
        setCurrentWord(nextWord);
        setGuess('');
      }
    },
    [guess, currentWord, wordHintsUsed]
  );

  // Use Hint: reveal next unrevealed letter in current word
  const useHint = useCallback(() => {
    const wordChars = currentWord.toUpperCase().split('');
    const unrevealedIndex = wordChars.findIndex((_, idx) => !revealedLetters.includes(idx));

    if (unrevealedIndex !== -1) {
      const nextRevealed = [...revealedLetters, unrevealedIndex];
      setRevealedLetters(nextRevealed);
      setHintsUsed((prev) => prev + 1);
      setWordHintsUsed((prev) => prev + 1);
    }
  }, [currentWord, revealedLetters]);

  // Start New Game
  const startNewGame = useCallback(() => {
    const firstWord = getRandomWord();
    setCurrentWord(firstWord);
    setScrambledWord(scrambleWord(firstWord));
    setGuess('');
    setScore(0);
    setHintsUsed(0);
    setWordHintsUsed(0);
    setRevealedLetters([]);
    setWordsCompleted(0);
    setElapsedTime(0);
  }, []);

  const resetBestScore = useCallback(() => {
    setBestScore(0);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear wordscramble_best from localStorage', e);
    }
  }, []);

  return {
    currentWord,
    scrambledWord,
    guess,
    score,
    hintsUsed,
    revealedLetters,
    wordsCompleted,
    elapsedTime,
    bestScore,
    isSuccessFeedback,
    setGuess,
    submitGuess,
    useHint,
    startNewGame,
    resetBestScore,
  };
}
