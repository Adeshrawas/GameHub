import { describe, it, expect } from 'vitest';
import { checkWinner, checkDraw } from './winCheck';

describe('Tic Tac Toe - winCheck', () => {
  it('detects row win conditions (rows 1, 2, 3)', () => {
    // Row 1
    const board1 = ['X', 'X', 'X', null, 'O', null, null, null, 'O'];
    expect(checkWinner(board1).winner).toBe('X');

    // Row 2
    const board2 = [null, 'X', null, 'O', 'O', 'O', 'X', null, null];
    expect(checkWinner(board2).winner).toBe('O');

    // Row 3
    const board3 = [null, null, 'O', 'O', null, null, 'X', 'X', 'X'];
    expect(checkWinner(board3).winner).toBe('X');
  });

  it('detects column win conditions (cols 1, 2, 3)', () => {
    // Col 1
    const board1 = ['X', 'O', null, 'X', 'O', null, 'X', null, null];
    expect(checkWinner(board1).winner).toBe('X');

    // Col 2
    const board2 = ['X', 'O', null, null, 'O', 'X', null, 'O', 'X'];
    expect(checkWinner(board2).winner).toBe('O');

    // Col 3
    const board3 = ['O', null, 'X', null, 'O', 'X', null, null, 'X'];
    expect(checkWinner(board3).winner).toBe('X');
  });

  it('detects diagonal win conditions (2 diagonals)', () => {
    // Main diagonal [0, 4, 8]
    const board1 = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
    expect(checkWinner(board1).winner).toBe('X');

    // Anti diagonal [2, 4, 6]
    const board2 = [null, null, 'O', 'X', 'O', 'X', 'O', null, null];
    expect(checkWinner(board2).winner).toBe('O');
  });

  it('returns draw for a full board with no winner', () => {
    const fullBoard = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X'
    ];
    const { winner } = checkWinner(fullBoard);
    expect(winner).toBeNull();
    expect(checkDraw(fullBoard, winner)).toBe(true);
  });

  it('returns null winner and non-draw for an incomplete board with no winner', () => {
    const board = [
      'X', 'O', null,
      null, 'X', null,
      null, null, 'O'
    ];
    const { winner } = checkWinner(board);
    expect(winner).toBeNull();
    expect(checkDraw(board, winner)).toBe(false);
  });
});
