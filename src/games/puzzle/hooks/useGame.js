import { useState, useEffect, useCallback, useRef } from 'react';
import { shuffle } from '../utils/shuffle';

/* ── Helpers ───────────────────────────────────────────── */

function isAdjacent(a, b, cols) {
  const rA = Math.floor(a / cols), cA = a % cols;
  const rB = Math.floor(b / cols), cB = b % cols;
  return Math.abs(rA - rB) + Math.abs(cA - cB) === 1;
}

function checkWin(tiles) {
  const n = tiles.length;
  for (let i = 0; i < n - 1; i++) if (tiles[i] !== i + 1) return false;
  return tiles[n - 1] === 0;
}

function readBest(levelId) {
  try {
    const raw = localStorage.getItem(`puzzle_level${levelId}_best`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveBest(levelId, moves, time) {
  try {
    localStorage.setItem(`puzzle_level${levelId}_best`, JSON.stringify({ moves, time }));
  } catch {}
}

/* ── Hook ──────────────────────────────────────────────── */
/**
 * gameState:
 *   'idle'    – puzzle shown, timer/moves haven't started → show Start
 *   'playing' – timer running, moves counting             → show Pause + Quit
 *   'paused'  – timer stopped, board blurred              → show Resume + Quit
 *   'won'     – puzzle solved                             → win modal
 */
export function useGame(level) {
  const { id, rows, cols, shuffleMoves } = level;

  const [tiles,     setTiles]     = useState([]);
  const [moves,     setMoves]     = useState(0);
  const [time,      setTime]      = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [best,      setBest]      = useState(null);

  const timeRef  = useRef(0);
  const movesRef = useRef(0);

  useEffect(() => { timeRef.current  = time;  }, [time]);
  useEffect(() => { movesRef.current = moves; }, [moves]);

  /* ── Init / reset ── */
  const reset = useCallback(() => {
    setTiles(shuffle(rows, cols, shuffleMoves));
    setMoves(0);
    setTime(0);
    setGameState('idle');
    timeRef.current  = 0;
    movesRef.current = 0;
    setBest(readBest(id));
  }, [id, rows, cols, shuffleMoves]);

  useEffect(() => { reset(); }, [reset]);

  /* ── Timer (only while 'playing') ── */
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

  /* ── Controls ── */
  const start  = useCallback(() => setGameState('playing'), []);
  const pause  = useCallback(() => setGameState('paused'),  []);
  const resume = useCallback(() => setGameState('playing'), []);
  // quit = reset to idle (shuffle new board)
  const quit   = useCallback(() => reset(), [reset]);

  /* ── Tile click ── */
  const handleClick = useCallback((clickedIdx) => {
    if (gameState !== 'playing') return;

    setTiles(prev => {
      const blankIdx = prev.indexOf(0);
      if (!isAdjacent(clickedIdx, blankIdx, cols)) return prev;

      const next = [...prev];
      [next[clickedIdx], next[blankIdx]] = [next[blankIdx], next[clickedIdx]];

      const newMoves = movesRef.current + 1;

      Promise.resolve().then(() => {
        setMoves(newMoves);
        movesRef.current = newMoves;

        if (checkWin(next)) {
          setGameState('won');
          const t = timeRef.current;
          const prevBest = readBest(id);
          if (!prevBest || newMoves < prevBest.moves ||
              (newMoves === prevBest.moves && t < prevBest.time)) {
            saveBest(id, newMoves, t);
            setBest({ moves: newMoves, time: t });
          }
        }
      });

      return next;
    });
  }, [gameState, cols, id]);

  return { tiles, moves, time, gameState, best, handleClick, start, pause, resume, quit, reset };
}
