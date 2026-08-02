import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ScrambledWord from './components/ScrambledWord';
import GuessInput from './components/GuessInput';
import GameHUD from './components/GameHUD';
import { useWordScramble } from './hooks/useWordScramble';
import { Sparkles, HelpCircle, RefreshCw } from 'lucide-react';

export default function WordScramble() {
  const {
    currentWord,
    scrambledWord,
    guess,
    score,
    hintsUsed,
    revealedLetters,
    wordsCompleted,
    elapsedTime,
    bestScore,
    isSuccessFeedback,
    setGuess,
    submitGuess,
    useHint,
    startNewGame,
    resetBestScore,
  } = useWordScramble();

  const canUseHint = revealedLetters.length < currentWord.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Top Header Navigation */}
      <BackToHub currentGameTitle="Word Scramble" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Anagram Word Solver
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Word Scramble
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Unscramble the letters to discover the secret word! Solve words quickly for bonus points.
          </p>
        </div>

        {/* Status Dashboard */}
        <GameHUD
          score={score}
          wordsCompleted={wordsCompleted}
          hintsUsed={hintsUsed}
          elapsedTime={elapsedTime}
          bestScore={bestScore}
          onNewGame={startNewGame}
        />

        {/* Game Arena */}
        <div className={`w-full max-w-xl space-y-6 transition-all duration-300 ${
          isSuccessFeedback ? 'scale-105 ring-4 ring-emerald-400 rounded-3xl' : ''
        }`}>
          <ScrambledWord
            scrambledWord={scrambledWord}
            currentWord={currentWord}
            revealedLetters={revealedLetters}
          />

          <GuessInput
            value={guess}
            onChange={setGuess}
            onSubmit={submitGuess}
            onUseHint={useHint}
            canUseHint={canUseHint}
          />
        </div>

        {/* Footer Rules */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Rules: Unscramble each word. Using a letter hint costs 25 points from that word's reward.</span>
          </div>

          {bestScore > 0 && (
            <button
              onClick={resetBestScore}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors font-medium cursor-pointer"
              title="Reset high score record"
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
