import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import SnakeCanvas from './components/SnakeCanvas';
import { useSnake } from './hooks/useSnake';
import {
  Sparkles,
  Zap,
  Trophy,
  RotateCcw,
  Pause,
  Play,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Skull
} from 'lucide-react';

export default function SnakeGame() {
  const {
    snake,
    direction,
    food,
    score,
    bestScore,
    isGameOver,
    isPaused,
    speed,
    changeDirection,
    togglePause,
    restartGame,
    gridCols,
    gridRows
  } = useSnake();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-300">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Retro Snake" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-10 flex flex-col items-center justify-center">
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arcade Classic</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Retro Snake
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
            Eat green food pellets to grow your snake while avoiding walls and self-collision!
          </p>
        </div>

        {/* Score Header Bar */}
        <div className="w-full max-w-md mx-auto flex items-center justify-between gap-3 mb-6">
          <div className="flex-1 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center text-center">
            <span className="text-[10px] sm:text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Zap className="w-3 h-3" />
              Score
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {score}
            </span>
          </div>

          <div className="flex-1 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center text-center">
            <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Trophy className="w-3 h-3" />
              Best
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-300 tracking-tight">
              {bestScore}
            </span>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={togglePause}
            disabled={isGameOver}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-rose-400 shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-5 h-5 fill-current text-emerald-400" /> : <Pause className="w-5 h-5 text-amber-400" />}
          </button>

          {/* Restart Button */}
          <button
            onClick={restartGame}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-rose-400 shadow-xl transition-all duration-200 group active:scale-95 flex items-center justify-center"
            title="Restart Match"
          >
            <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-90 duration-300" />
          </button>
        </div>

        {/* Canvas Render Area + Overlays */}
        <div className="relative w-full max-w-md">
          <SnakeCanvas
            snake={snake}
            food={food}
            gridCols={gridCols}
            gridRows={gridRows}
          />

          {/* Paused Overlay */}
          {isPaused && !isGameOver && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-xl">
                <Pause className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Game Paused</h2>
              <p className="text-slate-400 text-xs mb-6">Press Spacebar or click Resume to continue.</p>
              <button
                onClick={togglePause}
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Resume Game</span>
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-4 shadow-xl shadow-rose-500/20 animate-pulse">
                <Skull className="w-9 h-9" />
              </div>

              <h2 className="text-3xl font-black text-rose-400 mb-2">Game Over!</h2>
              <p className="text-slate-400 text-sm mb-6">
                Your snake crashed! Final Score: <strong className="text-white font-bold">{score}</strong>
              </p>

              <button
                onClick={restartGame}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Directional Touch Pad Controls */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={() => changeDirection('UP')}
            className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-rose-500/20 border border-slate-800 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-all shadow-md active:scale-95"
            title="Move Up (ArrowUp / W)"
          >
            <ArrowUp className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => changeDirection('LEFT')}
              className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-rose-500/20 border border-slate-800 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Move Left (ArrowLeft / A)"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => changeDirection('DOWN')}
              className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-rose-500/20 border border-slate-800 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Move Down (ArrowDown / S)"
            >
              <ArrowDown className="w-6 h-6" />
            </button>

            <button
              onClick={() => changeDirection('RIGHT')}
              className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-rose-500/20 border border-slate-800 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Move Right (ArrowRight / D)"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Keyboard Instruction Hint */}
        <p className="mt-4 text-slate-500 text-[11px] text-center">
          Use <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">WASD</kbd> to steer. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">Spacebar</kbd> to pause.
        </p>
      </main>
    </div>
  );
}
