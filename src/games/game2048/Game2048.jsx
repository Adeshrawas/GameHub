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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Tile Strategy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            2048
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto font-medium">
            Join matching numbers to reach the <strong className="text-slate-900 font-bold">2048 tile</strong>!
          </p>
        </div>

        {/* Score Header Bar */}
        <ScoreBar score={score} bestScore={bestScore} onRestart={restartGame} />

        {/* Game Grid Container + Modals */}
        <div className="relative w-full max-w-md">
          <Grid2048 grid={grid} touchHandlers={touchHandlers} />

          {/* Victory Modal Overlay */}
          {hasWon && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 shadow-md">
                <Trophy className="w-9 h-9 text-white" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                You Win! 🎉
              </h2>

              <p className="text-slate-600 text-sm mb-6 max-w-xs font-medium">
                You hit the legendary <strong className="text-slate-900 font-bold">2048 tile</strong>! Keep playing to aim for even higher tiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <button
                  onClick={continueGame}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-sm border border-slate-900 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-white" />
                  <span>Keep Playing</span>
                </button>

                <button
                  onClick={restartGame}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm border border-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-900" />
                  <span>New Game</span>
                </button>
              </div>
            </div>
          )}

          {/* Game Over Modal Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 z-20 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-900 text-white flex items-center justify-center mb-4 shadow-md">
                <Flame className="w-9 h-9 text-white" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                Game Over!
              </h2>

              <p className="text-slate-600 text-sm mb-6 font-medium">
                No valid moves left on the grid. Final Score: <strong className="text-slate-900 font-bold">{score}</strong>
              </p>

              <button
                onClick={restartGame}
                className="py-3 px-8 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-sm border border-slate-900 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>

        {/* On-Screen Arrow Controls (Touch & Click Support) */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={() => move('up')}
            className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Move Up (or press Up Arrow / W)"
          >
            <ArrowUp className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => move('left')}
              className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Move Left (or press Left Arrow / A)"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => move('down')}
              className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Move Down (or press Down Arrow / S)"
            >
              <ArrowDown className="w-6 h-6" />
            </button>

            <button
              onClick={() => move('right')}
              className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Move Right (or press Right Arrow / D)"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Keyboard & Touch Instruction Hint */}
        <p className="mt-4 text-slate-600 text-[11px] text-center font-medium">
          Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-mono text-[10px] font-bold">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-mono text-[10px] font-bold">WASD</kbd> or swipe on screen to move tiles.
        </p>
      </main>
    </div>
  );
}
