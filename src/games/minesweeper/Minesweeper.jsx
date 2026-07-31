import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import MineGrid from './components/MineGrid';
import GameHUD from './components/GameHUD';
import { useMinesweeper } from './hooks/useMinesweeper';
import { Bomb, HelpCircle, RefreshCw } from 'lucide-react';

export default function Minesweeper() {
  const {
    grid,
    isGameOver,
    isWin,
    flagsUsed,
    firstClickDone,
    elapsedTime,
    bestTime,
    mineCount,
    handleCellClick,
    handleCellContextMenu,
    resetGame,
    resetBestTime,
  } = useMinesweeper(8, 8, 10);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Minesweeper" />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bomb className="w-3.5 h-3.5" />
            Classic Puzzle
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">
            Minesweeper
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Clear all 54 safe cells without detonating any of the 10 hidden mines!
          </p>
        </div>

        {/* Status HUD */}
        <GameHUD
          flagsUsed={flagsUsed}
          mineCount={mineCount}
          elapsedTime={elapsedTime}
          bestTime={bestTime}
          isGameOver={isGameOver}
          isWin={isWin}
          onReset={resetGame}
        />

        {/* Mine Grid Arena */}
        <div className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex items-center justify-center">
          <MineGrid
            grid={grid}
            onCellClick={handleCellClick}
            onCellContextMenu={handleCellContextMenu}
          />
        </div>

        {/* Footer & Instructions */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Controls: <strong>Left-Click</strong> to reveal a tile. <strong>Right-Click</strong> to place/remove a flag. First click is always safe!</span>
          </div>

          {bestTime !== null && (
            <button
              onClick={resetBestTime}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors font-medium cursor-pointer"
              title="Reset best clear time record"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Best Time</span>
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
