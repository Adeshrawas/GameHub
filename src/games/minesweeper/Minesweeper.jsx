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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Minesweeper" />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bomb className="w-3.5 h-3.5 text-slate-900" />
            Classic Puzzle
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Minesweeper
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
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
        <div className="w-full p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">
          <MineGrid
            grid={grid}
            onCellClick={handleCellClick}
            onCellContextMenu={handleCellContextMenu}
          />
        </div>

        {/* Footer & Instructions */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Controls: <strong>Left-Click</strong> to reveal a tile. <strong>Right-Click</strong> to place/remove a flag. First click is always safe!</span>
          </div>

          {bestTime !== null && (
            <button
              onClick={resetBestTime}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium cursor-pointer"
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
