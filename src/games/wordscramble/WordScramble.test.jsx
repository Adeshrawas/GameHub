import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WordScramble from './WordScramble';

describe('WordScramble Game', () => {
  it('renders word scramble game header, input, and action buttons', () => {
    render(
      <BrowserRouter>
        <WordScramble />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Word Scramble/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/unscrambled/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Submit/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Reveal Letter/i })[0]).toBeInTheDocument();
  });
});
