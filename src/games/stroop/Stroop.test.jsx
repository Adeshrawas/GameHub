import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Stroop from './Stroop';

describe('Stroop Challenge Game', () => {
  it('renders Stroop Color Test header and Start Test button', () => {
    render(
      <BrowserRouter>
        <Stroop />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Stroop/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Start Test/i })[0]).toBeInTheDocument();
  });
});
