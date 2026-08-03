import React, { useRef, useEffect } from 'react';
import { Target, Send } from 'lucide-react';

export default function GuessInput({
  value,
  onChange,
  onSubmit,
  range,
  disabled,
  errorMessage,
  isWon,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && !isWon && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, isWon]);

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto space-y-2">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-500">
          <Target className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="number"
          min={range.min}
          max={range.max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isWon}
          placeholder={`Enter a number between ${range.min} & ${range.max}...`}
          className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-lg font-mono placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/30 disabled:opacity-50 transition-all shadow-inner"
        />

        <button
          type="submit"
          disabled={disabled || isWon || !value}
          className="absolute right-2.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-black border border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <span>Guess</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {errorMessage && (
        <p className="text-xs text-rose-400 font-medium text-center animate-fade-in">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
