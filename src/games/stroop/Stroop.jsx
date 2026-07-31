import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import WordDisplay from './components/WordDisplay';
import ColorOptions from './components/ColorOptions';
import GameHUD from './components/GameHUD';
import { useStroop } from './hooks/useStroop';
import { Eye, HelpCircle, RefreshCw } from 'lucide-react';

export default function Stroop() {
  const {
    word,
    displayColor,
    options,
    score,
    streak,
    timeLeft,
    isPlaying,
    bestScore,
    startGame,
    handleSelectOption,
    resetBestScore,
  } = useStroop();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <BackToHub currentGameTitle="Stroop Test" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title Banner */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Eye className="w-3.5 h-3.5" />
            Cognitive Color Matcher
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Stroop Test
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Select the swatch matching the <strong>font color</strong> of the word, NOT what the word reads!
          </p>
        </div>

        {/* HUD Dashboard */}
        <GameHUD
          score={score}
          streak={streak}
          timeLeft={timeLeft}
          bestScore={bestScore}
          isPlaying={isPlaying}
          onStartGame={startGame}
        />

        {/* Game Arena */}
        {isPlaying && (
          <div className="w-full space-y-6 animate-fade-in max-w-xl">
            <WordDisplay word={word} displayColor={displayColor} />
            <ColorOptions
              options={options}
              onSelectOption={handleSelectOption}
              disabled={!isPlaying}
            />
          </div>
        )}

        {/* Footer & Rules */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Rule: Ignore the text meaning. Match the visual ink color before time runs out!</span>
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
