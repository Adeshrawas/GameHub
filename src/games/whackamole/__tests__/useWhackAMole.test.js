import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWhackAMole } from '../hooks/useWhackAMole';

describe('useWhackAMole hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default state values', () => {
    const { result } = renderHook(() => useWhackAMole());

    expect(result.current.activeHole).toBeNull();
    expect(result.current.score).toBe(0);
    expect(result.current.timeLeft).toBe(30);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.bestScore).toBe(0);
  });

  it('starts game and begins countdown and pop-up loop', () => {
    const { result } = renderHook(() => useWhackAMole());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.isPlaying).toBe(true);
    expect(result.current.score).toBe(0);
    expect(result.current.timeLeft).toBe(30);

    // Fast-forward 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(29);
  });

  it('increments score and clears activeHole on successful whack', () => {
    const { result } = renderHook(() => useWhackAMole());

    act(() => {
      result.current.startGame();
    });

    // Advance time until activeHole is set
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    const currentHole = result.current.activeHole;
    expect(currentHole).not.toBeNull();

    act(() => {
      result.current.whackMole(currentHole);
    });

    expect(result.current.score).toBe(1);
    expect(result.current.activeHole).toBeNull();
  });

  it('prevents double-scoring on the same mole', () => {
    const { result } = renderHook(() => useWhackAMole());

    act(() => {
      result.current.startGame();
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    const currentHole = result.current.activeHole;
    expect(currentHole).not.toBeNull();

    // Double click fast
    act(() => {
      result.current.whackMole(currentHole);
      result.current.whackMole(currentHole);
    });

    expect(result.current.score).toBe(1);
  });

  it('ends game and updates best score when countdown reaches 0', () => {
    const { result } = renderHook(() => useWhackAMole());

    act(() => {
      result.current.startGame();
    });

    // Score a point
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    const hole = result.current.activeHole;
    if (hole !== null) {
      act(() => {
        result.current.whackMole(hole);
      });
    }

    // Fast-forward remaining countdown
    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.bestScore).toBe(result.current.score);
    expect(localStorage.getItem('whackamole_best')).toBe(result.current.score.toString());
  });
});
