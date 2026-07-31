import { useState, useCallback, useEffect } from 'react';
import { getRandomSentence } from '../utils/sentences';
import { calculateWPM, calculateAccuracy, calculateTypingStats } from '../utils/wpmCalculator';

const LOCAL_STORAGE_KEY = 'typingtest_best_wpm';

export function useTypingTest() {
  const [targetSentence, setTargetSentence] = useState(() => getRandomSentence());
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  const [bestWpm, setBestWpm] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      console.warn('Failed to load typingtest_best_wpm from localStorage', e);
      return 0;
    }
  });

  const handleInputChange = useCallback((value) => {
    if (isComplete) return;

    const now = Date.now();

    // Record startTime on first keystroke
    if (!startTime && value.length > 0) {
      setStartTime(now);
    }

    setTypedText(value);
    setTotalKeystrokes((prev) => prev + 1);

    // Check if sentence is fully typed and matches target
    if (value === targetSentence) {
      setEndTime(now);
      setIsComplete(true);

      const durationMs = now - (startTime || now);
      const finalWpm = calculateWPM(targetSentence.length, durationMs);

      setBestWpm((prevBest) => {
        if (finalWpm > prevBest) {
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, finalWpm.toString());
          } catch (e) {
            console.warn('Failed to save typingtest_best_wpm to localStorage', e);
          }
          return finalWpm;
        }
        return prevBest;
      });
    }
  }, [isComplete, startTime, targetSentence]);

  const resetTest = useCallback(() => {
    setTargetSentence((current) => getRandomSentence(current));
    setTypedText('');
    setStartTime(null);
    setEndTime(null);
    setIsComplete(false);
    setTotalKeystrokes(0);
  }, []);

  const resetBestWpm = useCallback(() => {
    setBestWpm(0);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove typingtest_best_wpm from localStorage', e);
    }
  }, []);

  // Compute live stats while typing or final stats when complete
  const liveStats = calculateTypingStats(
    targetSentence,
    typedText,
    startTime,
    endTime,
    totalKeystrokes
  );

  return {
    targetSentence,
    typedText,
    startTime,
    endTime,
    isComplete,
    bestWpm,
    totalKeystrokes,
    stats: liveStats,
    handleInputChange,
    resetTest,
    resetBestWpm
  };
}
