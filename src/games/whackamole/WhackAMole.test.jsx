import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WhackAMole from './WhackAMole';

describe('WhackAMole Game', () => {
  it('renders Whack A Mole header, score cards, and Start Game button', () => {
    render(
      <BrowserRouter>
        <WhackAMole />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Whack-a-Mole/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Start Game/i })[0]).toBeInTheDocument();
  });
});
