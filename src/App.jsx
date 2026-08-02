import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HubGrid from './components/Hub/HubGrid';
import { Gamepad2 } from 'lucide-react';

// Lazy-load game components on demand to optimize initial load bundle size
const PuzzleGame = lazy(() => import('./games/puzzle'));
const MemoryGame = lazy(() => import('./games/memory'));
const TicTacToeGame = lazy(() => import('./games/tictactoe'));
const Game2048 = lazy(() => import('./games/game2048'));
const SnakeGame = lazy(() => import('./games/snake'));
const ReactionGame = lazy(() => import('./games/reaction'));
const WhackAMoleGame = lazy(() => import('./games/whackamole'));
const RPSGame = lazy(() => import('./games/rps'));
const TypingTestGame = lazy(() => import('./games/typingtest'));
const SimonSaysGame = lazy(() => import('./games/simonsays'));
const MinesweeperGame = lazy(() => import('./games/minesweeper'));
const StroopGame = lazy(() => import('./games/stroop'));
const NumberGuessGame = lazy(() => import('./games/numberguess'));
const ConnectFourGame = lazy(() => import('./games/connectfour'));
const WordScrambleGame = lazy(() => import('./games/wordscramble'));

function GameLoader() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-sky-200 border-t-sky-500 animate-spin" />
        <Gamepad2 className="w-6 h-6 text-sky-600 absolute" />
      </div>
      <p className="text-sm font-bold tracking-wider uppercase text-sky-700 animate-pulse">Loading Game...</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<GameLoader />}>
        <Routes>
          {/* Landing Hub Route */}
          <Route path="/" element={<HubGrid />} />

          {/* Dynamic / Explicit Mini-Game Routes */}
          <Route path="/games/puzzle" element={<PuzzleGame />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/tictactoe" element={<TicTacToeGame />} />
          <Route path="/games/game2048" element={<Game2048 />} />
          <Route path="/games/snake" element={<SnakeGame />} />
          <Route path="/games/reaction" element={<ReactionGame />} />
          <Route path="/games/whackamole" element={<WhackAMoleGame />} />
          <Route path="/games/rps" element={<RPSGame />} />
          <Route path="/games/typingtest" element={<TypingTestGame />} />
          <Route path="/games/simonsays" element={<SimonSaysGame />} />
          <Route path="/games/minesweeper" element={<MinesweeperGame />} />
          <Route path="/games/stroop" element={<StroopGame />} />
          <Route path="/games/numberguess" element={<NumberGuessGame />} />
          <Route path="/games/connectfour" element={<ConnectFourGame />} />
          <Route path="/games/wordscramble" element={<WordScrambleGame />} />

          {/* Catch-all fallback redirect to Hub */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
