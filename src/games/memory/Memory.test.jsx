import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Memory from './Memory';

describe('Memory Match Game', () => {
  it('renders Memory Match title, level navigator, and Start button', () => {
    render(
      <BrowserRouter>
        <Memory />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Memory Match/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Level 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Start/i })[0]).toBeInTheDocument();
  });
});
