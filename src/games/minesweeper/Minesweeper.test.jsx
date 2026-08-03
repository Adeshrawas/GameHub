import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Minesweeper from './Minesweeper';

describe('Minesweeper Game', () => {
  it('renders Minesweeper title, status HUD, and grid', () => {
    render(
      <BrowserRouter>
        <Minesweeper />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Minesweeper/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Flags Left/i)).toBeInTheDocument();
    expect(screen.getByText(/SWEEPING/i)).toBeInTheDocument();
  });
});
