import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import DifficultySelect from './components/DifficultySelect';
import GuessInput from './components/GuessInput';
import HintDisplay from './components/HintDisplay';
import { useNumberGuess } from './hooks/useNumberGuess';
import { Target, Trophy, RotateCcw, HelpCircle, RefreshCw } from 'lucide-react';

export default function NumberGuess() {
  const {
    difficulty,
    range,
    guesses,
    currentGuess,
    isWon,
    errorMessage,
    bestScore,
    setCurrentGuess,
    selectDifficulty,
    submitGuess,
    startNewGame,
    resetBestScore,
  } = useNumberGuess();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <BackToHub currentGameTitle="Number Guessing Game" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Banner */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Target className="w-3.5 h-3.5" />
            Logic & Deduction
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Number Guessing
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Guess the secret number between <strong>{range.min}</strong> and <strong>{range.max}</strong> in as few attempts as possible!
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="w-full space-y-4">
          <DifficultySelect
            difficulty={difficulty}
            onSelectDifficulty={selectDifficulty}
            disabled={guesses.length > 0 && !isWon}
          />

          {/* Best Score Bar */}
          <div className="max-w-md mx-auto flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>Fewest Guesses ({difficulty.toUpperCase()}): <strong className="text-purple-300">{bestScore !== null ? `${bestScore} attempts` : 'None yet'}</strong></span>
            </div>

            {bestScore !== null && (
              <button
                onClick={resetBestScore}
                className="flex items-center space-x-1 text-slate-500 hover:text-rose-400 transition-colors text-xs font-medium cursor-pointer"
                title="Reset best score for this difficulty"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Game Arena */}
        <div className="w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl space-y-6">
          {!isWon && (
            <div className="space-y-4">
              <GuessInput
                value={currentGuess}
                onChange={setCurrentGuess}
                onSubmit={submitGuess}
                range={range}
                disabled={isWon}
                errorMessage={errorMessage}
                isWon={isWon}
              />

              <div className="flex justify-end">
                <button
                  onClick={startNewGame}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors text-xs font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Game (Reroll Number)</span>
                </button>
              </div>
            </div>
          )}

          <HintDisplay
            guesses={guesses}
            isWon={isWon}
            totalGuesses={guesses.length}
            bestScore={bestScore}
            onNewGame={startNewGame}
          />
        </div>

        {/* Footer Rules */}
        <div className="w-full max-w-2xl pt-4 border-t border-slate-800/60 flex items-center justify-center gap-2 text-xs text-slate-400">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span>Tip: Use binary search strategy (guess middle numbers) to find the target in minimum steps!</span>
        </div>

      </main>
    </div>
  );
}
