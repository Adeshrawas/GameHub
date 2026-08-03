import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import ChoiceButtons from './components/ChoiceButtons';
import ResultDisplay from './components/ResultDisplay';
import { useRPS } from './hooks/useRPS';
import { Flame, Trophy, RefreshCw, HelpCircle, Gamepad2 } from 'lucide-react';

export default function RPS() {
  const {
    playerChoice,
    computerChoice,
    result,
    currentStreak,
    bestStreak,
    playRound,
    resetRound,
    resetAllStats
  } = useRPS();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Top Header Navigation */}
      <BackToHub currentGameTitle="Rock Paper Scissors" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title & Banner */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Gamepad2 className="w-3.5 h-3.5 text-slate-900" />
            Arcade Battle
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Rock Paper Scissors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Challenge the AI! Build your win streak and set a new personal record.
          </p>
        </div>

        {/* Score & Streak Dashboard */}
        <div className="w-full max-w-xl grid grid-cols-2 gap-4">
          {/* Current Streak */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs relative overflow-hidden group">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-slate-900" />
                Current Streak
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                {currentStreak}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
              <Flame className="w-6 h-6" />
            </div>
          </div>

          {/* Best Streak */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs relative overflow-hidden group">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-slate-900" />
                Best Streak
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                {bestStreak}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Game Arena Section */}
        <div className="w-full p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm relative">
          {!result ? (
            <ChoiceButtons onSelectChoice={playRound} />
          ) : (
            <ResultDisplay
              playerChoice={playerChoice}
              computerChoice={computerChoice}
              result={result}
              onPlayAgain={resetRound}
            />
          )}
        </div>

        {/* Rules & Footer Actions */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Rules: <strong>Rock</strong> beats Scissors, <strong>Scissors</strong> beats Paper, <strong>Paper</strong> beats Rock.</span>
          </div>

          {(currentStreak > 0 || bestStreak > 0) && (
            <button
              onClick={resetAllStats}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium cursor-pointer"
              title="Reset best streak record"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Stats</span>
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
