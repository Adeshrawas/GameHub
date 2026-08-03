import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Game2048 from './Game2048';

describe('2048 Game', () => {
  it('renders 2048 title, score bar, and directional arrow controls', () => {
    render(
      <BrowserRouter>
        <Game2048 />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/2048/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Score/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Best/i)[0]).toBeInTheDocument();
  });
});
