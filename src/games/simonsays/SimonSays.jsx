import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ColorPad from './components/ColorPad';
import GameStatus from './components/GameStatus';
import { useSimonSays } from './hooks/useSimonSays';
import { Brain, HelpCircle, RefreshCw } from 'lucide-react';

export default function SimonSays() {
  const {
    round,
    phase,
    score,
    bestScore,
    activeColor,
    startGame,
    handleColorClick,
    resetBestScore
  } = useSimonSays();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Simon Says" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Brain className="w-3.5 h-3.5" />
            Memory Sequence Challenge
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Simon Says
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Memorize the flashing sequence and repeat it back in exact order!
          </p>
        </div>

        {/* Status Dashboard */}
        <GameStatus
          round={round}
          phase={phase}
          score={score}
          bestScore={bestScore}
          onStartGame={startGame}
        />

        {/* Color Pad Arena */}
        <div className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex items-center justify-center">
          <ColorPad
            activeColor={activeColor}
            onColorClick={handleColorClick}
            disabled={phase !== 'playerTurn'}
            phase={phase}
          />
        </div>

        {/* Footer & Rules */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Rules: Watch the flashing sequence carefully, then click the colors in the exact same order.</span>
          </div>

          {bestScore > 0 && (
            <button
              onClick={resetBestScore}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors font-medium cursor-pointer"
              title="Reset best score record"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Best Score</span>
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
