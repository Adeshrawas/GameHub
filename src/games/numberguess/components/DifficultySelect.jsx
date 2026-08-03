import React from 'react';
import { DIFFICULTIES } from '../hooks/useNumberGuess';

export default function DifficultySelect({ difficulty, onSelectDifficulty, disabled }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Object.values(DIFFICULTIES).map((diff) => {
        const isSelected = difficulty === diff.id;

        return (
          <button
            key={diff.id}
            onClick={() => !disabled && onSelectDifficulty(diff.id)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 cursor-pointer
              ${isSelected
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-200 shadow-2xs'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <span>{diff.label} ({diff.min}-{diff.max})</span>
          </button>
        );
      })}
    </div>
  );
}
