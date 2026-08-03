import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BackToHub from './BackToHub';

describe('BackToHub Shared Component', () => {
  it('renders navigation header with brand and current game title', () => {
    render(
      <BrowserRouter>
        <BackToHub currentGameTitle="Tic-Tac-Toe" />
      </BrowserRouter>
    );

    expect(screen.getByText(/GameHub/i)).toBeInTheDocument();
    expect(screen.getByText('Tic-Tac-Toe')).toBeInTheDocument();
    expect(screen.getByText(/Back to Hub/i)).toBeInTheDocument();
  });
});
