import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HubGrid from './components/Hub/HubGrid';
import PuzzleGame from './games/puzzle';
import MemoryGame from './games/memory';
import TicTacToeGame from './games/tictactoe';
import Game2048 from './games/game2048';
import SnakeGame from './games/snake';
import ReactionGame from './games/reaction';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Hub Landing Route */}
        <Route path="/" element={<HubGrid />} />

        {/* Dynamic / Explicit Mini-Game Routes */}
        <Route path="/games/puzzle" element={<PuzzleGame />} />
        <Route path="/games/memory" element={<MemoryGame />} />
        <Route path="/games/tictactoe" element={<TicTacToeGame />} />
        <Route path="/games/game2048" element={<Game2048 />} />
        <Route path="/games/snake" element={<SnakeGame />} />
        <Route path="/games/reaction" element={<ReactionGame />} />

        {/* Catch-all fallback redirect to Hub */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
