import React from 'react';

export default function SentenceDisplay({ targetSentence, typedText, isComplete }) {
  const characters = targetSentence.split('');
  const typedChars = typedText.split('');

  return (
    <div className="w-full glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-xl text-lg sm:text-2xl font-mono leading-relaxed select-none">
      <div className="flex flex-wrap items-center">
        {characters.map((char, index) => {
          let charStyle = 'text-slate-500';
          let cursorStyle = '';

          if (index < typedChars.length) {
            if (typedChars[index] === char) {
              // Correctly typed character
              charStyle = 'text-emerald-400 bg-emerald-500/10 rounded-sm font-semibold';
            } else {
              // Incorrect character typed
              charStyle = 'text-rose-400 bg-rose-500/20 rounded-sm font-semibold underline decoration-rose-500 decoration-2';
            }
          } else if (index === typedChars.length && !isComplete) {
            // Current cursor position
            cursorStyle = 'border-b-2 border-indigo-400 bg-indigo-500/20 animate-pulse text-indigo-200 rounded-sm';
          }

          // Special visualization for space character errors or spaces in general
          const isSpace = char === ' ';

          return (
            <span
              key={index}
              className={`transition-colors duration-150 ${charStyle} ${cursorStyle} relative`}
            >
              {isSpace ? (
                <span className="inline-block w-3">&nbsp;</span>
              ) : (
                char
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
