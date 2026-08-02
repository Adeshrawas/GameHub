import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ScoreBar from './components/ScoreBar';
import Grid2048 from './components/Grid2048';
import { use2048 } from './hooks/use2048';
import {
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Trophy,
  RotateCcw,
  Play,
  Flame
} from 'lucide-react';

export default function Game2048() {
  const {
    grid,
    score,
    bestScore,
    hasWon,
    isGameOver,
    move,
    restartGame,
    continueGame,
    touchHandlers
  } = use2048();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Header Navigation */}
      <BackToHub currentGameTitle="2048" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-10 flex flex-col items-center justify-center">
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tile Strategy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            2048
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
            Join matching numbers to reach the <strong className="text-amber-400 font-semibold">2048 tile</strong>!
          </p>
        </div>

        {/* Score Header Bar */}
        <ScoreBar score={score} bestScore={bestScore} onRestart={restartGame} />

        {/* Game Grid Container + Modals */}
        <div className="relative w-full max-w-md">
          <Grid2048 grid={grid} touchHandlers={touchHandlers} />

          {/* Victory Modal Overlay */}
          {hasWon && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-xl shadow-amber-500/20 animate-bounce">
                <Trophy className="w-9 h-9" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-amber-400 mb-2">
                You Win! 🎉
              </h2>

              <p className="text-slate-300 text-sm mb-6 max-w-xs">
                You hit the legendary <strong className="text-amber-300">2048 tile</strong>! Keep playing to aim for even higher tiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <button
                  onClick={continueGame}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Keep Playing</span>
                </button>

                <button
                  onClick={restartGame}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Game</span>
                </button>
              </div>
            </div>
          )}

          {/* Game Over Modal Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-4 shadow-xl shadow-rose-500/20">
                <Flame className="w-9 h-9" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-rose-400 mb-2">
                Game Over!
              </h2>

              <p className="text-slate-400 text-sm mb-6">
                No valid moves left on the grid. Final Score: <strong className="text-white">{score}</strong>
              </p>

              <button
                onClick={restartGame}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>

        {/* On-Screen Arrow Controls (Touch & Click Support) */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={() => move('up')}
            className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-cyan-500/20 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-md active:scale-95"
            title="Move Up (or press Up Arrow / W)"
          >
            <ArrowUp className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => move('left')}
              className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-cyan-500/20 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Move Left (or press Left Arrow / A)"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => move('down')}
              className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-cyan-500/20 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Move Down (or press Down Arrow / S)"
            >
              <ArrowDown className="w-6 h-6" />
            </button>

            <button
              onClick={() => move('right')}
              className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-cyan-500/20 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Move Right (or press Right Arrow / D)"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Keyboard & Touch Instruction Hint */}
        <p className="mt-4 text-slate-500 text-[11px] text-center">
          Use <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">WASD</kbd> or swipe on screen to move tiles.
        </p>
      </main>
    </div>
  );
}
