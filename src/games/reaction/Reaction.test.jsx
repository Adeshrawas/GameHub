import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Reaction from './Reaction';

describe('Reaction Speed Game', () => {
  it('renders Reaction Speed header, time metrics, and click to start screen', () => {
    render(
      <BrowserRouter>
        <Reaction />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Reaction Speed/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Last Time/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Best Time/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Click to Start/i)[0]).toBeInTheDocument();
  });
});
