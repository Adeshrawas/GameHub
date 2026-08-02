import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import SentenceDisplay from './components/SentenceDisplay';
import TypingInput from './components/TypingInput';
import ResultDisplay from './components/ResultDisplay';
import { useTypingTest } from './hooks/useTypingTest';
import { RotateCcw, Keyboard, Trophy, RefreshCw } from 'lucide-react';

export default function TypingTest() {
  const {
    targetSentence,
    typedText,
    startTime,
    isComplete,
    bestWpm,
    stats,
    handleInputChange,
    resetTest,
    resetBestWpm
  } = useTypingTest();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Typing Speed Test" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Keyboard className="w-3.5 h-3.5" />
            Speed & Accuracy Test
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Typing Speed Test
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Type the sentence accurately as fast as you can. Timer starts on your first keystroke!
          </p>
        </div>

        {/* Live Metrics Dashboard */}
        <ResultDisplay
          stats={stats}
          bestWpm={bestWpm}
          onTryAgain={resetTest}
          isComplete={isComplete}
        />

        {/* Typing Arena */}
        {!isComplete && (
          <div className="w-full space-y-6 animate-fade-in">
            {/* Target Sentence Display */}
            <SentenceDisplay
              targetSentence={targetSentence}
              typedText={typedText}
              isComplete={isComplete}
            />

            {/* Input Box */}
            <TypingInput
              value={typedText}
              onChange={handleInputChange}
              isComplete={isComplete}
            />

            {/* Reset / New Sentence Action */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <button
                onClick={resetTest}
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Sentence</span>
              </button>

              {bestWpm > 0 && (
                <button
                  onClick={resetBestWpm}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors font-medium cursor-pointer"
                  title="Reset high score"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Best WPM</span>
                </button>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
