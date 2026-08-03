import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App & Hub Integration', () => {
  it('renders GameHub homepage header and search input', () => {
    render(<App />);

    expect(screen.getAllByText(/GameHub/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Search games.../i)).toBeInTheDocument();
  });

  it('filters games when category pill is clicked', () => {
    render(<App />);

    const puzzlePill = screen.getByRole('button', { name: /Brain/i });
    fireEvent.click(puzzlePill);

    expect(screen.getByText(/Sliding Puzzle/i)).toBeInTheDocument();
  });

  it('filters games when search query is typed', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search games.../i);
    fireEvent.change(searchInput, { target: { value: 'Snake' } });

    expect(screen.getByText(/Retro Snake/i)).toBeInTheDocument();
  });
});
