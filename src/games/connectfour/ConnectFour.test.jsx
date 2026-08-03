import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConnectFour from './ConnectFour';

describe('Connect Four Game', () => {
  it('renders mode select initially for Connect Four', () => {
    render(
      <BrowserRouter>
        <ConnectFour />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Connect Four/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Select Mode/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/vs Computer/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Pass & Play/i)[0]).toBeInTheDocument();
  });
});
