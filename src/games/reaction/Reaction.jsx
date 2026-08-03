import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ReactionScreen from './components/ReactionScreen';
import ResultDisplay from './components/ResultDisplay';
import { useReaction } from './hooks/useReaction';
import { Sparkles, Timer, RotateCcw, History, Trash2 } from 'lucide-react';

export default function ReactionGame() {
  const {
    phase,
    reactionTime,
    bestTime,
    history,
    handleClickScreen,
    startWaitingPhase,
    resetStats
  } = useReaction();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Reaction Speed" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-10 flex flex-col items-center justify-center">
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Reflex Test</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Reaction Speed
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto font-medium">
            Test your reflex reaction time in milliseconds!
          </p>
        </div>

        {/* Score Header Display */}
        <ResultDisplay reactionTime={reactionTime} bestTime={bestTime} />

        {/* Interactive Click Area */}
        <ReactionScreen
          phase={phase}
          reactionTime={reactionTime}
          onClick={handleClickScreen}
        />

        {/* Attempt History Breakdown */}
        {history.length > 0 && (
          <div className="w-full max-w-md mt-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-600 font-semibold border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                <History className="w-3.5 h-3.5 text-slate-900" />
                Recent Attempts
              </span>
              <button
                onClick={resetStats}
                className="text-[11px] text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                title="Reset best score and history"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset Stats</span>
              </button>
            </div>

            <div className="flex items-center justify-start gap-2 overflow-x-auto py-1">
              {history.map((time, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[70px] p-2 rounded-xl bg-slate-50 border border-slate-200 text-center"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {time} ms
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
