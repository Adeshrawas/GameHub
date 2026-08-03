import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameCard from './GameCard';

const mockGame = {
  id: 'tictactoe',
  name: 'Tic-Tac-Toe',
  category: 'Strategy',
  description: 'Classic 3x3 grid battle vs AI or local friend.',
  path: '/tictactoe',
  isFeatured: true,
  iconName: 'Grid',
};

describe('GameCard Component', () => {
  it('renders game details, featured tag, and Play button', () => {
    render(
      <BrowserRouter>
        <GameCard game={mockGame} />
      </BrowserRouter>
    );

    expect(screen.getByText('Tic-Tac-Toe')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });
});
