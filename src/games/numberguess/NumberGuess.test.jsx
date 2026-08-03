import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NumberGuess from './NumberGuess';

describe('Number Guessing Game', () => {
  it('renders Number Guessing header, difficulty buttons, and guess input', () => {
    render(
      <BrowserRouter>
        <NumberGuess />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Number Guessing/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Easy/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Medium/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Hard/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Guess/i })[0]).toBeInTheDocument();
  });
});
