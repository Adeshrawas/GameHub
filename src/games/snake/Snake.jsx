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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Retro Snake" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-10 flex flex-col items-center justify-center">
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Arcade Classic</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Retro Snake
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto font-medium">
            Eat green food pellets to grow your snake while avoiding walls and self-collision!
          </p>
        </div>

        {/* Score Header Bar */}
        <div className="w-full max-w-md mx-auto flex items-center justify-between gap-3 mb-6">
          <div className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Zap className="w-3 h-3 text-slate-900" />
              Score
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {score}
            </span>
          </div>

          <div className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Trophy className="w-3 h-3 text-slate-900" />
              Best
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {bestScore}
            </span>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={togglePause}
            disabled={isGameOver}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-black border border-slate-900 text-white shadow-2xs transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-5 h-5 fill-current text-white" /> : <Pause className="w-5 h-5 text-white" />}
          </button>

          {/* Restart Button */}
          <button
            onClick={restartGame}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-black border border-slate-900 text-white shadow-2xs transition-all duration-200 group cursor-pointer active:scale-95 flex items-center justify-center"
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
            <div className="absolute inset-0 z-20 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 shadow-md">
                <Pause className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Game Paused</h2>
              <p className="text-slate-600 text-xs mb-6 font-medium">Press Spacebar or click Resume to continue.</p>
              <button
                onClick={togglePause}
                className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm border border-slate-900 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Resume Game</span>
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 shadow-md">
                <Skull className="w-9 h-9 text-white" />
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-2">Game Over!</h2>
              <p className="text-slate-600 text-sm mb-6 font-medium">
                Your snake crashed! Final Score: <strong className="text-slate-900 font-bold">{score}</strong>
              </p>

              <button
                onClick={restartGame}
                className="py-3 px-8 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-sm border border-slate-900 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Directional Touch Pad Controls */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={() => changeDirection('UP')}
            className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Move Up (ArrowUp / W)"
          >
            <ArrowUp className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => changeDirection('LEFT')}
              className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Move Left (ArrowLeft / A)"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => changeDirection('DOWN')}
              className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Move Down (ArrowDown / S)"
            >
              <ArrowDown className="w-6 h-6" />
            </button>

            <button
              onClick={() => changeDirection('RIGHT')}
              className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Move Right (ArrowRight / D)"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Keyboard Instruction Hint */}
        <p className="mt-4 text-slate-600 text-[11px] text-center font-medium">
          Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-mono text-[10px] font-bold">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-mono text-[10px] font-bold">WASD</kbd> to steer. Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-mono text-[10px] font-bold">Spacebar</kbd> to pause.
        </p>
      </main>
    </div>
  );
}
