import React, { useState, useEffect, useRef } from 'react';
import BackToHub from '../../components/shared/BackToHub';
import { levels } from './data/levels';
import { useGame } from './hooks/useGame';
import Grid from './components/Grid';
import HUD from './components/HUD';
import {
  Play, Pause, RotateCcw, ChevronRight,
  Trophy, Clock, Move, Lock, LogOut,
} from 'lucide-react';

/* ── Utils ─────────────────────────────────────────────── */
function pad(n) { return String(n).padStart(2, '0'); }
function fmtTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

/* ── Win Modal ─────────────────────────────────────────── */
function WinModal({ level, moves, time, best, isLastLevel, onNext, onReplay }) {
  const isNewBest = best && best.moves === moves && best.time === time;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-2xl font-extrabold text-white mb-1">Level Complete!</h2>
        <p className="text-slate-400 text-sm mb-6">
          Level {level.id} — {level.rows}×{level.cols} grid
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-800 rounded-xl p-3 flex flex-col items-center">
            <Move className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xl font-bold text-white tabular-nums">{moves}</span>
            <span className="text-xs text-slate-500">moves</span>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 flex flex-col items-center">
            <Clock className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xl font-bold text-white font-mono tabular-nums">{fmtTime(time)}</span>
            <span className="text-xs text-slate-500">time</span>
          </div>
        </div>

        {isNewBest && (
          <div className="flex items-center justify-center gap-2 mb-5 text-amber-400 text-sm font-medium">
            <Trophy className="w-4 h-4" />
            <span>New personal best!</span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onReplay}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium
                       border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Replay
          </button>

          {isLastLevel ? (
            <div className="flex-1 flex items-center justify-center py-2.5 rounded-xl
                            bg-slate-700 text-slate-400 text-sm font-medium border border-slate-600">
              🏆 All Done!
            </div>
          ) : (
            <button
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                         bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold
                         transition-colors"
            >
              Next Level
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Puzzle Page ──────────────────────────────────── */
export default function Puzzle() {
  /* ── Level index (current level being played) ── */
  const [levelIdx, setLevelIdx] = useState(0);

  /* ── Unlock state: highest unlocked level index (0-based) ── */
  const [maxUnlocked, setMaxUnlocked] = useState(() => {
    try {
      const v = localStorage.getItem('puzzle_max_unlocked');
      return v !== null ? parseInt(v, 10) : 0;
    } catch { return 0; }
  });

  const level = levels[levelIdx];

  const {
    tiles, moves, time, gameState, best,
    handleClick, start, pause, resume, quit, reset,
  } = useGame(level);

  /* ── Unlock next level when current one is won ── */
  const didUnlock = useRef(false);
  useEffect(() => {
    if (gameState === 'won' && !didUnlock.current) {
      didUnlock.current = true;
      const nextIdx = levelIdx + 1;
      if (nextIdx < levels.length && nextIdx > maxUnlocked) {
        setMaxUnlocked(nextIdx);
        try { localStorage.setItem('puzzle_max_unlocked', String(nextIdx)); } catch {}
      }
    }
    if (gameState !== 'won') didUnlock.current = false;
  }, [gameState, levelIdx, maxUnlocked]);

  /* ── Level selection (only unlocked levels) ── */
  const handleSelectLevel = (idx) => {
    if (idx > maxUnlocked) return; // locked — do nothing
    setLevelIdx(idx);
    // useGame will re-init automatically via the reset effect when level changes
  };

  /* ── Win modal handlers ── */
  const handleNext = () => {
    if (levelIdx < levels.length - 1) {
      setLevelIdx(levelIdx + 1);
    }
  };
  const handleReplay = () => reset();

  /* ── Control buttons based on gameState ── */
  const Controls = () => {
    if (gameState === 'idle') {
      return (
        <div className="flex gap-3">
          <button
            onClick={quit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 border border-slate-700
                       text-slate-400 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Quit
          </button>
          <button
            onClick={start}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl
                       bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold
                       transition-colors shadow"
          >
            <Play className="w-4 h-4 fill-current" />
            Start
          </button>
        </div>
      );
    }

    if (gameState === 'playing') {
      return (
        <div className="flex gap-3">
          <button
            onClick={quit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 border border-slate-700
                       text-slate-400 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Quit
          </button>
          <button
            onClick={pause}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 border border-slate-700
                       text-slate-200 text-sm font-medium transition-colors"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        </div>
      );
    }

    if (gameState === 'paused') {
      return (
        <div className="flex gap-3">
          <button
            onClick={quit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 border border-slate-700
                       text-slate-400 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Quit
          </button>
          <button
            onClick={resume}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl
                       bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold
                       transition-colors shadow"
          >
            <Play className="w-4 h-4 fill-current" />
            Resume
          </button>
        </div>
      );
    }

    return null; // won — modal handles everything
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <BackToHub currentGameTitle="Sliding Puzzle" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-5">

        {/* Page title */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-white">Sliding Puzzle</h1>
          <p className="text-slate-500 text-sm mt-1">
            Slide tiles into order — {level.rows * level.cols - 1} tiles to sort
          </p>
        </div>

        {/* HUD */}
        <div className="w-full max-w-lg">
          <HUD level={level} moves={moves} time={time} best={best} gameState={gameState} />
        </div>

        {/* Level selector */}
        <div className="w-full max-w-lg">
          <p className="text-xs text-slate-600 mb-2 text-center">
            Select level —&nbsp;
            <span className="text-slate-500">
              {maxUnlocked + 1} of {levels.length} unlocked
            </span>
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {levels.map((l, i) => {
              const locked  = i > maxUnlocked;
              const current = i === levelIdx;
              return (
                <button
                  key={l.id}
                  onClick={() => handleSelectLevel(i)}
                  disabled={locked}
                  title={locked ? `Complete Level ${i} to unlock` : `${l.rows}×${l.cols} grid`}
                  className={[
                    'py-1.5 rounded-lg text-xs font-semibold tabular-nums transition-colors',
                    locked
                      ? 'bg-slate-900 text-slate-700 border border-slate-800 cursor-not-allowed'
                      : current
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700',
                  ].join(' ')}
                >
                  {locked ? <Lock className="w-3 h-3 mx-auto" /> : l.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid with paused overlay */}
        {tiles.length > 0 && (
          <div className="relative">
            <div style={{ filter: gameState === 'paused' ? 'blur(6px)' : 'none', transition: 'filter 0.2s' }}>
              <Grid
                tiles={tiles}
                rows={level.rows}
                cols={level.cols}
                onTileClick={handleClick}
              />
            </div>

            {/* Paused overlay */}
            {gameState === 'paused' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl">
                <div className="bg-slate-900/90 px-6 py-4 rounded-xl border border-slate-700 text-center">
                  <p className="text-amber-400 font-bold text-lg tracking-wide">⏸ PAUSED</p>
                  <p className="text-slate-500 text-xs mt-1">Press Resume to continue</p>
                </div>
              </div>
            )}

            {/* Idle overlay — Start prompt */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-slate-950/70">
                <button
                  onClick={start}
                  className="flex flex-col items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/20 transition-colors">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <span className="text-sm font-medium">Click to Start</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Control buttons */}
        <Controls />

      </main>

      {/* Win modal */}
      {gameState === 'won' && (
        <WinModal
          level={level}
          moves={moves}
          time={time}
          best={best}
          isLastLevel={levelIdx === levels.length - 1}
          onNext={handleNext}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
}
