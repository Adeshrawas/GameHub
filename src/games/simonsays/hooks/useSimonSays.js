import { useState, useEffect, useCallback, useRef } from 'react';
import { validateSequence } from '../utils/sequenceMatcher';

export const COLORS = ['green', 'red', 'yellow', 'blue'];

const LOCAL_STORAGE_KEY = 'simonsays_best';

// Synthesize retro arcade tones for each color button
const TONES = {
  green: 329.63,  // E4
  red: 261.63,    // C4
  yellow: 220.00, // A3
  blue: 164.81    // E3
};

function playTone(freq, type = 'sine', duration = 0.3) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio context errors if blocked by browser policy
  }
}

export function useSimonSays() {
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'playback' | 'playerTurn' | 'gameOver'
  const [score, setScore] = useState(0);
  const [activeColor, setActiveColor] = useState(null);

  const [bestScore, setBestScore] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      console.warn('Failed to load simonsays_best from localStorage', e);
      return 0;
    }
  });

  const timeoutsRef = useRef([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  // Flash color helper with sound
  const flashColor = useCallback((color, duration = 400) => {
    setActiveColor(color);
    if (TONES[color]) {
      playTone(TONES[color], 'sine', duration / 1000);
    }
    const t = setTimeout(() => {
      setActiveColor(null);
    }, duration);
    timeoutsRef.current.push(t);
  }, []);

  // Sequence playback effect
  useEffect(() => {
    if (phase !== 'playback' || sequence.length === 0) return;

    clearAllTimeouts();
    setActiveColor(null);

    const FLASH_TIME = 500;
    const GAP_TIME = 200;

    sequence.forEach((color, index) => {
      const startDelay = index * (FLASH_TIME + GAP_TIME) + 400;

      const t1 = setTimeout(() => {
        flashColor(color, FLASH_TIME);
      }, startDelay);

      timeoutsRef.current.push(t1);
    });

    // After full sequence playback ends, switch to player turn
    const totalDuration = sequence.length * (FLASH_TIME + GAP_TIME) + 500;
    const tEnd = setTimeout(() => {
      setPlayerInput([]);
      setPhase('playerTurn');
    }, totalDuration);

    timeoutsRef.current.push(tEnd);

    return () => clearAllTimeouts();
  }, [phase, sequence, flashColor, clearAllTimeouts]);

  // Start new game
  const startGame = useCallback(() => {
    clearAllTimeouts();
    const firstColor = getRandomColor();
    setSequence([firstColor]);
    setPlayerInput([]);
    setRound(1);
    setScore(0);
    setPhase('playback');
  }, [clearAllTimeouts]);

  // Handle player color selection
  const handleColorClick = useCallback((colorId) => {
    if (phase !== 'playerTurn') return;

    // Flash clicked color briefly for tactile feedback
    flashColor(colorId, 250);

    const newPlayerInput = [...playerInput, colorId];
    const validation = validateSequence(sequence, newPlayerInput);

    // Check if player clicked wrong color
    if (!validation.isCorrect) {
      playTone(110, 'sawtooth', 0.5); // Buzz error sound
      const finalScore = Math.max(0, round - 1);
      setScore(finalScore);
      setPhase('gameOver');

      setBestScore((prevBest) => {
        if (finalScore > prevBest) {
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, finalScore.toString());
          } catch (e) {
            console.warn('Failed to save simonsays_best to localStorage', e);
          }
          return finalScore;
        }
        return prevBest;
      });
      return;
    }

    // Correct step
    setPlayerInput(newPlayerInput);

    // If full sequence matched successfully
    if (validation.isComplete) {
      const currentScore = round;
      setScore(currentScore);

      setBestScore((prevBest) => {
        if (currentScore > prevBest) {
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, currentScore.toString());
          } catch (e) {
            console.warn('Failed to save simonsays_best to localStorage', e);
          }
          return currentScore;
        }
        return prevBest;
      });

      // Advance to next round
      const nextRound = round + 1;
      setRound(nextRound);
      const nextSequence = [...sequence, getRandomColor()];
      setSequence(nextSequence);

      // Short pause before starting next playback
      const tNext = setTimeout(() => {
        setPhase('playback');
      }, 900);
      timeoutsRef.current.push(tNext);
    }
  }, [phase, playerInput, sequence, round, flashColor]);

  const resetBestScore = useCallback(() => {
    setBestScore(0);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove simonsays_best from localStorage', e);
    }
  }, []);

  return {
    sequence,
    playerInput,
    round,
    phase,
    score,
    bestScore,
    activeColor,
    startGame,
    handleColorClick,
    resetBestScore
  };
}
