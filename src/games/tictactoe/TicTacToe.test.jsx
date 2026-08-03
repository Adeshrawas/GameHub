import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicTacToe from './TicTacToe';

describe('TicTacToe Game', () => {
  it('renders mode select initially', () => {
    render(
      <BrowserRouter>
        <TicTacToe />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Tic-Tac-Toe/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Choose your game mode/i)).toBeInTheDocument();
    expect(screen.getByText(/vs Computer/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Players \(Local\)/i)).toBeInTheDocument();
  });

  it('starts 2-Player game when Pass & Play is selected', () => {
    render(
      <BrowserRouter>
        <TicTacToe />
      </BrowserRouter>
    );

    const pvpButton = screen.getByText(/2 Players \(Local\)/i);
    fireEvent.click(pvpButton);

    expect(screen.getAllByText(/Player X/i)[0]).toBeInTheDocument();
  });
});
