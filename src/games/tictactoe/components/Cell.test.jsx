import { render, screen } from '@testing-library/react';
import Cell from './Cell';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom';

test('renders a button element', () => {
  render(
    <Cell
      value={null}
      onClick={() => {}}
      isWinningCell={false}
      disabled={false}
    />
  );
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
