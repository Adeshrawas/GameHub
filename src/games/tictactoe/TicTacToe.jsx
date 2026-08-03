import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ModeSelect from './components/ModeSelect';
import Board from './components/Board';
import ResultBanner from './components/ResultBanner';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Bot, Users, RotateCcw, Trophy, X, Circle, Sparkles, Trash2 } from 'lucide-react';

export default function TicTacToe() {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    mode,
    stats,
    isComputerThinking,
    selectMode,
    makeMove,
    resetGame,
    changeMode,
    resetStats
  } = useTicTacToe();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Top Header */}
      <BackToHub currentGameTitle="Tic-Tac-Toe" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col justify-center items-center">
        {mode === null ? (
          <ModeSelect onSelectMode={selectMode} />
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            {/* Game Header Bar */}
            <div className="w-full max-w-md flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-900 shadow-2xs">
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
                  className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4 transition-colors font-medium"
                >
                  Change
                </button>
              </div>

              <button
                onClick={resetGame}
                className="group flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black border border-slate-900 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                title="Restart current match"
              >
                <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-90 duration-200" />
                <span>Restart</span>
              </button>
            </div>

            {/* Score Stats Bar */}
            <div className="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-2 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
              <div className="p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider mb-0.5">
                  {mode === 'computer' ? 'Player (X)' : 'Player X'}
                </p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.wins}</p>
              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Draws
                </p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.draws}</p>
              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider mb-0.5">
                  {mode === 'computer' ? 'Computer (O)' : 'Player O'}
                </p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.losses}</p>
              </div>
            </div>

            {/* Current Turn Badge */}
            {!winner && !isDraw && (
              <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-2xs">
                {isComputerThinking ? (
                  <span className="flex items-center space-x-2 text-xs font-semibold text-slate-900 animate-pulse">
                    <Bot className="w-4 h-4 animate-spin" />
                    <span>Computer is thinking...</span>
                  </span>
                ) : (
                  <>
                    <span className="text-xs font-semibold text-slate-600">Current Turn:</span>
                    <span className="flex items-center space-x-1.5 font-bold text-sm text-slate-900">
                      {currentPlayer === 'X' ? (
                        <span className="text-slate-900 flex items-center font-black">
                          <X className="w-4 h-4 mr-1 stroke-[3]" /> Player X
                        </span>
                      ) : (
                        <span className="text-slate-900 flex items-center font-black">
                          <Circle className="w-4 h-4 mr-1 stroke-[3]" /> {mode === 'computer' ? 'Computer' : 'Player O'}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Game Board */}
            <Board
              board={board}
              onCellClick={makeMove}
              winningLine={winningLine}
              disabled={Boolean(winner || isDraw || isComputerThinking)}
            />

            {/* Result Banner */}
            <ResultBanner
              winner={winner}
              isDraw={isDraw}
              mode={mode}
              onPlayAgain={resetGame}
              onChangeMode={changeMode}
            />

            {/* Reset Stats Option */}
            <div className="mt-8 text-center">
              <button
                onClick={resetStats}
                className="inline-flex items-center space-x-1 text-[11px] text-slate-600 hover:text-slate-900 transition-colors font-medium cursor-pointer"
                title="Reset saved stats in LocalStorage"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset Local Stats</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
