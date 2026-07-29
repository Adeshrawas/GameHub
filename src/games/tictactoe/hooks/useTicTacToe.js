import { useState, useEffect, useCallback } from 'react';
import { checkWinner, checkDraw } from '../utils/winCheck';
import { getComputerMove } from '../utils/computerMove';

const LOCAL_STORAGE_KEY = 'tictactoe_stats';

const initialStats = {
  wins: 0,
  losses: 0,
  draws: 0
};

export function useTicTacToe() {
  const [mode, setMode] = useState(null); // 'computer' | 'pvp' | null
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialStats;
    } catch {
      return initialStats;
    }
  });

  // Save stats to LocalStorage on update
  const updateStats = useCallback((result) => {
    setStats((prevStats) => {
      const newStats = { ...prevStats };
      if (result === 'X') {
        newStats.wins += 1;
      } else if (result === 'O') {
        newStats.losses += 1;
      } else if (result === 'draw') {
        newStats.draws += 1;
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStats));
      } catch (err) {
        console.error('Failed to save tictactoe_stats to LocalStorage:', err);
      }
      return newStats;
    });
  }, []);

  // Select game mode
  const selectMode = (chosenMode) => {
    setMode(chosenMode);
    resetGame();
  };

  // Switch mode back to selection
  const changeMode = () => {
    setMode(null);
    resetGame();
  };

  // Reset board state for a new match
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setIsComputerThinking(false);
  };

  // Clear stats
  const resetStats = () => {
    const fresh = { wins: 0, losses: 0, draws: 0 };
    setStats(fresh);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
    } catch (err) {
      console.error('Failed to reset tictactoe_stats:', err);
    }
  };

  // Perform a move
  const makeMove = useCallback((index) => {
    if (board[index] !== null || winner || isDraw || isComputerThinking) {
      return false;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    // Check for win
    const { winner: winSymbol, winningLine: line } = checkWinner(nextBoard);
    if (winSymbol) {
      setWinner(winSymbol);
      setWinningLine(line);
      updateStats(winSymbol);
      return true;
    }

    // Check for draw
    if (checkDraw(nextBoard, winSymbol)) {
      setIsDraw(true);
      updateStats('draw');
      return true;
    }

    // Switch turn
    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
    return true;
  }, [board, winner, isDraw, isComputerThinking, currentPlayer, updateStats]);

  // AI Move Effect (when mode === 'computer' & currentPlayer === 'O')
  useEffect(() => {
    if (mode !== 'computer' || currentPlayer !== 'O' || winner || isDraw) {
      return;
    }

    setIsComputerThinking(true);
    const timer = setTimeout(() => {
      const moveIndex = getComputerMove(board, 'O', 'X');
      if (moveIndex !== null) {
        const nextBoard = [...board];
        nextBoard[moveIndex] = 'O';
        setBoard(nextBoard);

        const { winner: winSymbol, winningLine: line } = checkWinner(nextBoard);
        if (winSymbol) {
          setWinner(winSymbol);
          setWinningLine(line);
          updateStats(winSymbol);
        } else if (checkDraw(nextBoard, winSymbol)) {
          setIsDraw(true);
          updateStats('draw');
        } else {
          setCurrentPlayer('X');
        }
      }
      setIsComputerThinking(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [mode, currentPlayer, board, winner, isDraw, updateStats]);

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    mode,
    stats,
    isComputerThinking,
    selectMode,
    makeMove,
    resetGame,
    changeMode,
    resetStats
  };
}
