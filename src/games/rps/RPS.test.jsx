import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RPS from './RPS';

describe('Rock Paper Scissors Game', () => {
  it('renders RPS title, move buttons, and streak metrics', () => {
    render(
      <BrowserRouter>
        <RPS />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Rock Paper Scissors/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Current Streak/i)).toBeInTheDocument();
    expect(screen.getByText(/Best Streak/i)).toBeInTheDocument();
    expect(screen.getAllByText('Rock')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Paper')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Scissors')[0]).toBeInTheDocument();
  });
});
