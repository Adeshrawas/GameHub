import { useState, useEffect, useCallback, useRef } from 'react';
import { generateDeck } from '../utils/deck';

/* ── LocalStorage helpers ─────────────────────────────── */
function readBest(levelId) {
  try {
    const raw = localStorage.getItem(`memory_level${levelId}_best`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveBest(levelId, moves, time) {
  try {
    localStorage.setItem(`memory_level${levelId}_best`, JSON.stringify({ moves, time }));
  } catch {}
}

/* ── Hook ─────────────────────────────────────────────── */
/**
 * gameState: 'idle' | 'playing' | 'paused' | 'won'
 *
 * 'idle'    – deck shown face-down, timer at 00:00, no clicks
 * 'playing' – timer running, cards clickable
 * 'paused'  – timer frozen, cards blurred and unclickable
 * 'won'     – all pairs matched, win modal fires
 */
export function useMemoryGame(level) {
  const { id, pairCount } = level;

  const [cards,          setCards]          = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [moves,          setMoves]          = useState(0);
  const [matchedCount,   setMatchedCount]   = useState(0);
  const [isLocked,       setIsLocked]       = useState(false);
  const [gameState,      setGameState]      = useState('idle');
  const [time,           setTime]           = useState(0);
  const [best,           setBest]           = useState(null);
  const [isNewBest,      setIsNewBest]      = useState(false);

  const timeoutRef      = useRef(null);
  const matchedCountRef = useRef(0);
  const timeRef         = useRef(0);

  useEffect(() => { timeRef.current = time; }, [time]);

  /* ── Timer (only while playing) ── */
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTime(t => {
        const next = t + 1;
        timeRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  /* ── Reset / init ── */
  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCards(generateDeck(pairCount));
    setFlippedIndices([]);
    setMoves(0);
    setMatchedCount(0);
    matchedCountRef.current = 0;
    setIsLocked(false);
    setGameState('idle');
    setTime(0);
    timeRef.current = 0;
    setBest(readBest(id));
    setIsNewBest(false);
  }, [id, pairCount]);

  useEffect(() => { reset(); }, [reset]);

  /* ── Cleanup on unmount ── */
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  /* ── Controls ── */
  const start  = useCallback(() => setGameState('playing'), []);
  const pause  = useCallback(() => setGameState('paused'),  []);
  const resume = useCallback(() => setGameState('playing'), []);
  const quit   = useCallback(() => reset(), [reset]); // reset back to idle

  /* ── Card click ── only active when playing ── */
  const handleCardClick = useCallback((idx) => {
    if (gameState !== 'playing') return; // blocks idle, paused, won
    if (isLocked) return;
    if (cards[idx].isFlipped || cards[idx].isMatched) return;

    /* First flip */
    if (flippedIndices.length === 0) {
      setCards(prev => prev.map((c, i) => i === idx ? { ...c, isFlipped: true } : c));
      setFlippedIndices([idx]);
      return;
    }

    /* Second flip */
    const [firstIdx] = flippedIndices;
    const newCards = cards.map((c, i) => i === idx ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    setFlippedIndices([firstIdx, idx]);
    const newMoves = moves + 1;
    setMoves(newMoves);
    setIsLocked(true);

    const isMatch = newCards[firstIdx].value === newCards[idx].value;

    timeoutRef.current = setTimeout(() => {
      if (isMatch) {
        setCards(prev =>
          prev.map((c, i) =>
            (i === firstIdx || i === idx) ? { ...c, isFlipped: true, isMatched: true } : c
          )
        );
        const newCount = matchedCountRef.current + 1;
        matchedCountRef.current = newCount;
        setMatchedCount(newCount);

        if (newCount === pairCount) {
          setGameState('won');
          const elapsed = timeRef.current;
          const prev    = readBest(id);
          const newRecord =
            !prev ||
            newMoves < prev.moves ||
            (newMoves === prev.moves && elapsed < prev.time);
          if (newRecord) {
            saveBest(id, newMoves, elapsed);
            setBest({ moves: newMoves, time: elapsed });
            setIsNewBest(true);
          } else {
            setIsNewBest(false);
          }
        }
      } else {
        setCards(prev =>
          prev.map((c, i) =>
            (i === firstIdx || i === idx) ? { ...c, isFlipped: false } : c
          )
        );
      }
      setFlippedIndices([]);
      setIsLocked(false);
    }, 800);
  }, [gameState, isLocked, cards, flippedIndices, moves, pairCount, id]);

  return {
    cards, flippedIndices, moves, matchedCount,
    isLocked, gameState, time, best, isNewBest,
    handleCardClick, start, pause, resume, quit, reset,
  };
}
