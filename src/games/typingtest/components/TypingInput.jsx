import React, { useRef, useEffect } from 'react';
import { Keyboard } from 'lucide-react';

export default function TypingInput({ value, onChange, disabled, isComplete }) {
  const inputRef = useRef(null);

  // Keep input focused automatically
  useEffect(() => {
    if (!disabled && !isComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, isComplete]);

  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-500">
          <Keyboard className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isComplete}
          placeholder={isComplete ? 'Test completed! Press Try Again to restart.' : 'Start typing here...'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className={`
            w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80
            text-slate-100 text-lg sm:text-xl font-mono placeholder:text-slate-500
            focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
            disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-inner
            ${isComplete ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' : ''}
          `}
        />
      </div>
      
      {!value && !disabled && !isComplete && (
        <p className="text-xs text-slate-400 mt-2 text-center">
          💡 Timer starts automatically on your first keystroke!
        </p>
      )}
    </div>
  );
}
