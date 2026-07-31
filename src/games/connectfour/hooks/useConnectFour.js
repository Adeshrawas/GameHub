import { useState, useEffect, useCallback } from 'react';
import { createEmptyGrid, dropToken } from '../utils/dropToken';
import { checkWin, checkGridFull } from '../utils/winCheck';
import { getComputerMove } from '../utils/getComputerMove';

const LOCAL_STORAGE_KEY = 'connectfour_stats';

export function useConnectFour() {
  const [mode, setMode] = useState(null); // null | 'computer' | 'pvp'
  const [grid, setGrid] = useState(() => createEmptyGrid());
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 = Red (Player), 2 = Yellow (AI/P2)
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { player1Wins: 0, player2Wins: 0, draws: 0 };
    } catch {
      return { player1Wins: 0, player2Wins: 0, draws: 0 };
    }
  });

  const makeMove = useCallback((colIndex, player) => {
    if (winner || isDraw) return false;

    const result = dropToken(grid, colIndex, player);
    if (!result) return false; // Column full

    const { newGrid, rowPlaced, colPlaced } = result;
    setGrid(newGrid);

    // Check Win
    const winResult = checkWin(newGrid, rowPlaced, colPlaced);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.winningLine);

      setStats((prev) => {
        const nextStats = {
          ...prev,
          player1Wins: winResult.winner === 1 ? prev.player1Wins + 1 : prev.player1Wins,
          player2Wins: winResult.winner === 2 ? prev.player2Wins + 1 : prev.player2Wins,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextStats));
        } catch (e) {
          console.warn('Failed to save connectfour_stats', e);
        }
        return nextStats;
      });
      return true;
    }

    // Check Draw
    if (checkGridFull(newGrid)) {
      setIsDraw(true);
      setStats((prev) => {
        const nextStats = { ...prev, draws: prev.draws + 1 };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextStats));
        } catch (e) {
          console.warn('Failed to save connectfour_stats', e);
        }
        return nextStats;
      });
      return true;
    }

    // Switch Turn
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    return true;
  }, [grid, winner, isDraw]);

  // Handle player column click
  const handleColumnClick = useCallback((colIndex) => {
    if (isComputerThinking) return;
    makeMove(colIndex, currentPlayer);
  }, [isComputerThinking, makeMove, currentPlayer]);

  // Computer AI Turn Automation
  useEffect(() => {
    if (mode === 'computer' && currentPlayer === 2 && !winner && !isDraw) {
      setIsComputerThinking(true);
      const timer = setTimeout(() => {
        const aiCol = getComputerMove(grid, 2, 1);
        if (aiCol !== null) {
          makeMove(aiCol, 2);
        }
        setIsComputerThinking(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [mode, currentPlayer, winner, isDraw, grid, makeMove]);

  const selectMode = useCallback((selectedMode) => {
    setMode(selectedMode);
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setHoveredCol(null);
  }, []);

  const changeMode = useCallback(() => {
    setMode(null);
  }, []);

  const resetGame = useCallback(() => {
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setHoveredCol(null);
  }, []);

  const resetStats = useCallback(() => {
    const emptyStats = { player1Wins: 0, player2Wins: 0, draws: 0 };
    setStats(emptyStats);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear connectfour_stats', e);
    }
  }, []);

  return {
    mode,
    grid,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    hoveredCol,
    isComputerThinking,
    stats,
    selectMode,
    changeMode,
    setHoveredCol,
    handleColumnClick,
    resetGame,
    resetStats,
  };
}
