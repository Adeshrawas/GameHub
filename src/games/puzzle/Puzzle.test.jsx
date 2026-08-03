import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Puzzle from './Puzzle';

describe('Sliding Puzzle Game', () => {
  it('renders Sliding Puzzle header, level selector, and Start button', () => {
    render(
      <BrowserRouter>
        <Puzzle />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Sliding Puzzle/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Select level/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Start/i })[0]).toBeInTheDocument();
  });
});
