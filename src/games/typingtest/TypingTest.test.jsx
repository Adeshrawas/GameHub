import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TypingTest from './TypingTest';

describe('TypingTest Game', () => {
  it('renders Speed Typing Test header and input field', () => {
    render(
      <BrowserRouter>
        <TypingTest />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Typing/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Start typing here/i)).toBeInTheDocument();
    expect(screen.getByText(/New Sentence/i)).toBeInTheDocument();
  });
});
