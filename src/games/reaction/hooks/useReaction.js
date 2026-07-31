import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateReactionTime } from '../utils/reactionMath';

const BEST_SCORE_KEY = 'reaction_best';
const ALT_BEST_SCORE_KEY = 'reaction_highscore';

export function useReaction() {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'clicked' | 'tooSoon'
  const [reactionTime, setReactionTime] = useState(null);
  const [history, setHistory] = useState([]);

  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const [bestTime, setBestTime] = useState(() => {
    try {
      const saved = localStorage.getItem(BEST_SCORE_KEY) || localStorage.getItem(ALT_BEST_SCORE_KEY);
      return saved ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  });

  const updateBestTime = useCallback((timeMs) => {
    setBestTime((prevBest) => {
      if (prevBest === null || timeMs < prevBest) {
        try {
          localStorage.setItem(BEST_SCORE_KEY, timeMs.toString());
          localStorage.setItem(ALT_BEST_SCORE_KEY, timeMs.toString());
        } catch (err) {
          console.error('Failed to save reaction_best to LocalStorage:', err);
        }
        return timeMs;
      }
      return prevBest;
    });
  }, []);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Initiate the waiting phase timer
  const startWaitingPhase = useCallback(() => {
    setPhase('waiting');
    setReactionTime(null);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const randomDelay = Math.floor(Math.random() * 4000) + 1000; // 1000ms - 5000ms

    timerRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setPhase('ready');
    }, randomDelay);
  }, []);

  // Handle user clicks on the reaction screen
  const handleClickScreen = useCallback(() => {
    if (phase === 'idle') {
      startWaitingPhase();
    } else if (phase === 'waiting') {
      // False start! Clicked before green screen
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setPhase('tooSoon');
    } else if (phase === 'ready') {
      // Valid reaction! Calculate elapsed time
      const elapsed = calculateReactionTime(startTimeRef.current, Date.now());
      setReactionTime(elapsed);
      setPhase('clicked');

      setHistory((prev) => [elapsed, ...prev.slice(0, 4)]);
      updateBestTime(elapsed);
    } else if (phase === 'clicked' || phase === 'tooSoon') {
      // Restart test
      startWaitingPhase();
    }
  }, [phase, startWaitingPhase, updateBestTime]);

  // Reset statistics
  const resetStats = useCallback(() => {
    setBestTime(null);
    setHistory([]);
    try {
      localStorage.removeItem(BEST_SCORE_KEY);
      localStorage.removeItem(ALT_BEST_SCORE_KEY);
    } catch (err) {
      console.error('Failed to reset reaction stats:', err);
    }
  }, []);

  return {
    phase,
    reactionTime,
    bestTime,
    history,
    handleClickScreen,
    startWaitingPhase,
    resetStats
  };
}
