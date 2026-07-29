import React, { useState, useEffect, useRef } from 'react';
import BackToHub from '../../components/shared/BackToHub';
import { memoryLevels } from './data/memoryLevels';
import { useMemoryGame } from './hooks/useMemoryGame';
import CardGrid from './components/CardGrid';
import MemoryHUD from './components/MemoryHUD';
import {
  ChevronLeft, ChevronRight, RotateCcw,
  Play, Pause, LogOut, Lock,
  Trophy, Clock, Move,
} from 'lucide-react';

/* ── Utils ─────────────────────────────────────────────── */
function pad(n) { return String(n).padStart(2, '0'); }
function fmtTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

/* ── Win Modal ─────────────────────────────────────────── */
function WinModal({ level, moves, time, isNewBest, isLastLevel, onNext, onReplay }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-2xl font-extrabold text-white mb-1">All Pairs Found!</h2>
        <p className="text-slate-400 text-sm mb-6">
          Level {level.id} — {level.rows}×{level.cols} · {level.pairCount} pairs
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-800 rounded-xl p-3 flex flex-col items-center">
            <Move className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xl font-bold text-white tabular-nums">{moves}</span>
            <span className="text-xs text-slate-500">tries</span>
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
            <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                            bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
              <Trophy className="w-4 h-4" /> All 30 Done!
            </div>
          ) : (
            <button
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                         bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold
                         transition-colors"
            >
              Next Level <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Memory Page ──────────────────────────────────── */
export default function Memory() {
  /* ── Level index ── */
  const [levelIdx, setLevelIdx] = useState(0);

  /* ── Unlock tracking (0-based highest unlocked index) ── */
  const [maxUnlocked, setMaxUnlocked] = useState(() => {
    try {
      const v = localStorage.getItem('memory_max_unlocked');
      return v !== null ? parseInt(v, 10) : 0;
    } catch { return 0; }
  });

  const level   = memoryLevels[levelIdx];
  const isFirst = levelIdx === 0;
  const isLast  = levelIdx === memoryLevels.length - 1;
  const nextLocked = levelIdx + 1 > maxUnlocked;

  const {
    cards, moves, matchedCount, isLocked,
    gameState, time, best, isNewBest,
    handleCardClick, start, pause, resume, quit, reset,
  } = useMemoryGame(level);

  /* ── Unlock next level when current is won ── */
  const didUnlock = useRef(false);
  useEffect(() => {
    if (gameState === 'won' && !didUnlock.current) {
      didUnlock.current = true;
      const nextIdx = levelIdx + 1;
      if (nextIdx < memoryLevels.length && nextIdx > maxUnlocked) {
        setMaxUnlocked(nextIdx);
        try { localStorage.setItem('memory_max_unlocked', String(nextIdx)); } catch {}
      }
    }
    if (gameState !== 'won') didUnlock.current = false;
  }, [gameState, levelIdx, maxUnlocked]);

  /* ── Navigation ── */
  const goPrev = () => {
    if (!isFirst) setLevelIdx(i => i - 1);
  };
  const goNext = () => {
    if (!isLast && !nextLocked) setLevelIdx(i => i + 1);
  };
  const handleWinNext = () => {
    if (!isLast) setLevelIdx(i => i + 1);
  };

  /* ── Control buttons ── */
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
            <LogOut className="w-4 h-4" /> Quit
          </button>
          <button
            onClick={start}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl
                       bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold
                       transition-colors shadow"
          >
            <Play className="w-4 h-4 fill-current" /> Start
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
            <LogOut className="w-4 h-4" /> Quit
          </button>
          <button
            onClick={pause}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 border border-slate-700
                       text-slate-200 text-sm font-medium transition-colors"
          >
            <Pause className="w-4 h-4" /> Pause
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
            <LogOut className="w-4 h-4" /> Quit
          </button>
          <button
            onClick={resume}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl
                       bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold
                       transition-colors shadow"
          >
            <Play className="w-4 h-4 fill-current" /> Resume
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <BackToHub currentGameTitle="Memory Match" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-5">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-white">Memory Match</h1>
          <p className="text-slate-500 text-sm mt-1">
            Find all {level.pairCount} matching pairs
          </p>
        </div>

        {/* Level navigator */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800
                       disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center min-w-[130px]">
            <p className="text-sm font-semibold text-white">
              Level {level.id}
              <span className="text-slate-500 font-normal ml-1">/ {memoryLevels.length}</span>
            </p>
            <p className="text-xs text-slate-500">{level.rows}×{level.cols} · {level.pairCount} pairs</p>
          </div>

          <button
            onClick={goNext}
            disabled={isLast || nextLocked}
            title={nextLocked ? `Complete Level ${levelIdx + 1} to unlock` : 'Next level'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800
                       disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {nextLocked
              ? <Lock className="w-4 h-4" />
              : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Unlocked progress hint */}
        <p className="text-xs text-slate-600 -mt-2">
          {maxUnlocked + 1} of {memoryLevels.length} levels unlocked
        </p>

        {/* HUD */}
        <div className="w-full" style={{ maxWidth: 'max(340px, min(720px, 95vw))' }}>
          <MemoryHUD
            level={level}
            moves={moves}
            matchedCount={matchedCount}
            time={time}
            best={best}
            gameState={gameState}
          />
        </div>

        {/* Progress bar */}
        <div className="w-full" style={{ maxWidth: 'max(340px, min(720px, 95vw))' }}>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${(matchedCount / level.pairCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Grid with overlays */}
        {cards.length > 0 && (
          <div className="relative">

            {/* Blur grid when paused */}
            <div style={{
              filter    : gameState === 'paused' ? 'blur(6px)' : 'none',
              transition: 'filter 0.2s',
              pointerEvents: gameState !== 'playing' ? 'none' : 'auto',
            }}>
              <CardGrid
                cards={cards}
                rows={level.rows}
                cols={level.cols}
                onCardClick={handleCardClick}
              />
            </div>

            {/* Paused overlay */}
            {gameState === 'paused' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                <div className="bg-slate-900/90 px-6 py-4 rounded-xl border border-slate-700 text-center">
                  <p className="text-amber-400 font-bold text-lg tracking-wide">⏸ PAUSED</p>
                  <p className="text-slate-500 text-xs mt-1">Press Resume to continue</p>
                </div>
              </div>
            )}

            {/* Idle overlay */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-950/75">
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

        {/* Controls */}
        <Controls />

        {/* Restart button (always visible) */}
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2 rounded-xl
                     bg-slate-900 hover:bg-slate-800 border border-slate-800
                     text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart Level
        </button>

      </main>

      {/* Win modal */}
      {gameState === 'won' && (
        <WinModal
          level={level}
          moves={moves}
          time={time}
          isNewBest={isNewBest}
          isLastLevel={isLast}
          onNext={handleWinNext}
          onReplay={reset}
        />
      )}
    </div>
  );
}
