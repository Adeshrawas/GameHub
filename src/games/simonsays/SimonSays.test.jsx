import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SimonSays from './SimonSays';

describe('SimonSays Game', () => {
  it('renders Simon Says header and Start Game button', () => {
    render(
      <BrowserRouter>
        <SimonSays />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Simon Says/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Start Game/i })[0]).toBeInTheDocument();
  });
});
