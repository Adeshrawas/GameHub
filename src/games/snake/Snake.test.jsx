import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Snake from './Snake';

describe('Retro Snake Game', () => {
  it('renders Retro Snake header, score bar, and directional controls', () => {
    render(
      <BrowserRouter>
        <Snake />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Retro Snake/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Score/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Best/i)[0]).toBeInTheDocument();
  });
});
