import React from 'react';
import BackToHub from '../../components/shared/BackToHub';
import GameHUD from './components/GameHUD';
import HoleGrid from './components/HoleGrid';
import { useWhackAMole } from './hooks/useWhackAMole';
import { Sparkles, Trophy, RotateCcw, Zap } from 'lucide-react';

export default function WhackAMoleGame() {
  const {
    activeHole,
    score,
    timeLeft,
    isPlaying,
    bestScore,
    whackedHole,
    combo,
    startGame,
    whackMole,
    totalDuration,
  } = useWhackAMole();

  const isGameOver = !isPlaying && timeLeft === 0;
  const isNewHighScore = isGameOver && score > 0 && score >= bestScore;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-800">
      {/* Navigation Header */}
      <BackToHub currentGameTitle="Whack-a-Mole" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-10 flex flex-col items-center justify-center">
        {/* Title & Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wide mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Reflex Arcade</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Whack-a-Mole
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
            Click moles as fast as they pop up before time runs out!
          </p>
        </div>

        {/* Game HUD */}
        <GameHUD
          score={score}
          bestScore={bestScore}
          timeLeft={timeLeft}
          totalDuration={totalDuration}
          isPlaying={isPlaying}
          combo={combo}
          onStart={startGame}
        />

        {/* 3x3 Grid */}
        <HoleGrid
          activeHole={activeHole}
          whackedHole={whackedHole}
          onWhack={whackMole}
          isPlaying={isPlaying}
        />

        {/* Initial Prompt when idle */}
        {!isPlaying && timeLeft === totalDuration && (
          <div className="mt-6 text-center animate-pulse">
            <p className="text-amber-400/90 text-sm font-semibold">
              Click &quot;Start Game&quot; above to launch 30s countdown!
            </p>
          </div>
        )}

        {/* Game Over Modal / Overlay */}
        {isGameOver && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-black text-white mb-1">Game Over!</h2>
              
              {isNewHighScore ? (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold my-2 border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEW HIGH SCORE!</span>
                </div>
              ) : (
                <p className="text-slate-400 text-sm mb-4">Great effort!</p>
              )}

              <div className="w-full bg-slate-950/80 rounded-2xl p-4 my-4 border border-slate-800 flex justify-around">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold block">Final Score</span>
                  <span className="text-2xl font-black text-white">{score}</span>
                </div>
                <div className="w-px bg-slate-800" />
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold block">Best Score</span>
                  <span className="text-2xl font-black text-amber-400">{bestScore}</span>
                </div>
              </div>

              <button
                onClick={startGame}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-base flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg shadow-amber-500/20"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
