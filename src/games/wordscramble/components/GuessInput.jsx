import React, { useRef, useEffect } from 'react';
import { Send, Lightbulb } from 'lucide-react';

export default function GuessInput({ value, onChange, onSubmit, onUseHint, canUseHint }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto space-y-3">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Type your unscrambled guess..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="w-full pl-5 pr-32 py-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-lg sm:text-xl font-mono uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all shadow-2xs"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          <button
            type="submit"
            disabled={!value.trim()}
            className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-black border border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <span>Submit</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hint Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onUseHint}
          disabled={!canUseHint}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5 text-slate-900" />
          <span>Reveal Letter (-25 pts)</span>
        </button>
      </div>
    </form>
  );
}
