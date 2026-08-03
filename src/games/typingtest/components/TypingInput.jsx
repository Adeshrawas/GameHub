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
            w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-300
            text-slate-900 text-lg sm:text-xl font-mono placeholder:text-slate-400
            focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10
            disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-2xs
            ${isComplete ? 'border-slate-900 ring-2 ring-slate-900/10' : ''}
          `}
        />
      </div>
      
      {!value && !disabled && !isComplete && (
        <p className="text-xs text-slate-600 font-medium mt-2 text-center">
          💡 Timer starts automatically on your first keystroke!
        </p>
      )}
    </div>
  );
}
