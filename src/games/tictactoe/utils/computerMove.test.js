import { describe, it, expect } from 'vitest';
import { getComputerMove } from './computerMove';

describe('Tic Tac Toe - computerMove AI', () => {
  it('takes a winning move when available for computer (O)', () => {
    // Computer (O) has 2 in a row at indices 0 and 1 -> index 2 is winning spot
    const board = [
      'O', 'O', null,
      'X', 'X', null,
      null, null, null
    ];
    const move = getComputerMove(board, 'O', 'X');
    expect(move).toBe(2);
  });

  it('blocks player (X) winning move when computer cannot win directly', () => {
    // Player (X) has 2 in a row at indices 3 and 4 -> index 5 must be blocked
    const board = [
      'O', null, null,
      'X', 'X', null,
      null, null, null
    ];
    const move = getComputerMove(board, 'O', 'X');
    expect(move).toBe(5);
  });

  it('picks a valid empty cell when no direct win or block is required', () => {
    const board = [
      'X', null, null,
      null, 'O', null,
      null, null, 'X'
    ];
    const move = getComputerMove(board, 'O', 'X');
    expect(move).not.toBeNull();
    expect(board[move]).toBeNull();
  });
});
