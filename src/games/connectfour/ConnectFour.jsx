import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ModeSelect from './components/ModeSelect';
import Board from './components/Board';
import ResultBanner from './components/ResultBanner';
import { useConnectFour } from './hooks/useConnectFour';
import { Gamepad2, HelpCircle, RefreshCw, Bot, Users, RotateCcw } from 'lucide-react';

export default function ConnectFour() {
  const {
    mode,
    grid,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    hoveredCol,
    isComputerThinking,
    stats,
    selectMode,
    changeMode,
    setHoveredCol,
    handleColumnClick,
    resetGame,
    resetStats,
  } = useConnectFour();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Top Header Navigation */}
      <BackToHub currentGameTitle="Connect Four" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Gamepad2 className="w-3.5 h-3.5 text-slate-900" />
            Strategic Token Drop
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Connect Four
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Take turns dropping tokens. First to align 4 in a row horizontally, vertically, or diagonally wins!
          </p>
        </div>

        {mode === null ? (
          <ModeSelect onSelectMode={selectMode} />
        ) : (
          <div className="w-full flex flex-col items-center space-y-6 animate-fade-in">
            {/* Mode Header Controls */}
            <div className="w-full max-w-xl flex items-center justify-between px-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-900 font-bold shadow-2xs">
                  {mode === 'computer' ? (
                    <>
                      <Bot className="w-3.5 h-3.5 text-slate-900" />
                      <span>vs Computer</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3.5 h-3.5 text-slate-900" />
                      <span>2 Players (Local)</span>
                    </>
                  )}
                </span>
                <button
                  onClick={changeMode}
                  className="text-slate-600 hover:text-slate-900 underline underline-offset-4 transition-colors cursor-pointer font-bold"
                >
                  Change Mode
                </button>
              </div>

              <button
                onClick={resetGame}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black border border-slate-900 text-white font-bold transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>

            {/* Turn & Result Dashboard Banner */}
            <ResultBanner
              winner={winner}
              isDraw={isDraw}
              currentPlayer={currentPlayer}
              onPlayAgain={resetGame}
              stats={stats}
            />

            {/* AI Thinking Indicator */}
            {isComputerThinking && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold animate-pulse">
                <Bot className="w-4 h-4 animate-spin text-slate-900" />
                <span>Computer is calculating optimal move...</span>
              </div>
            )}

            {/* Game Arena Board */}
            <div className="w-full flex justify-center">
              <Board
                grid={grid}
                onColumnClick={handleColumnClick}
                hoveredCol={hoveredCol}
                onHover={setHoveredCol}
                currentPlayer={currentPlayer}
                winningLine={winningLine}
                disabled={Boolean(winner || isDraw || isComputerThinking)}
              />
            </div>
          </div>
        )}

        {/* Footer Rules & Reset Stats */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Rules: Click a column to drop a token. Tokens automatically fall to the lowest open row.</span>
          </div>

          {(stats.player1Wins > 0 || stats.player2Wins > 0 || stats.draws > 0) && (
            <button
              onClick={resetStats}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-bold cursor-pointer"
              title="Reset scorecard stats"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Scorecard</span>
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
