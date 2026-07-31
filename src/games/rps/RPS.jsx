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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <BackToHub currentGameTitle="Rock Paper Scissors" />

      {/* Main Game Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-start space-y-8">
        
        {/* Title & Banner */}
        <div className="text-center space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Gamepad2 className="w-3.5 h-3.5" />
            Arcade Battle
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Rock Paper Scissors
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Challenge the AI! Build your win streak and set a new personal record.
          </p>
        </div>

        {/* Score & Streak Dashboard */}
        <div className="w-full max-w-xl grid grid-cols-2 gap-4">
          {/* Current Streak */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                Current Streak
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                {currentStreak}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
          </div>

          {/* Best Streak */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-purple-400" />
                Best Streak
              </span>
              <div className="text-3xl sm:text-4xl font-black text-purple-400 mt-1">
                {bestStreak}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Game Arena Section */}
        <div className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl relative">
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
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Rules: <strong>Rock</strong> beats Scissors, <strong>Scissors</strong> beats Paper, <strong>Paper</strong> beats Rock.</span>
          </div>

          {(currentStreak > 0 || bestStreak > 0) && (
            <button
              onClick={resetAllStats}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors text-xs font-medium cursor-pointer"
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
