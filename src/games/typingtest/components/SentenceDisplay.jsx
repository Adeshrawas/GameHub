import React from 'react';

export default function SentenceDisplay({ targetSentence, typedText, isComplete }) {
  const characters = targetSentence.split('');
  const typedChars = typedText.split('');

  return (
    <div className="w-full p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm text-lg sm:text-2xl font-mono leading-relaxed select-none">
      <div className="flex flex-wrap items-center">
        {characters.map((char, index) => {
          let charStyle = 'text-slate-400';
          let cursorStyle = '';

          if (index < typedChars.length) {
            if (typedChars[index] === char) {
              // Correctly typed character
              charStyle = 'text-slate-900 bg-slate-200/80 rounded-sm font-bold';
            } else {
              // Incorrect character typed
              charStyle = 'text-slate-900 bg-slate-300 rounded-sm font-bold underline decoration-slate-900 decoration-2';
            }
          } else if (index === typedChars.length && !isComplete) {
            // Current cursor position
            cursorStyle = 'border-b-2 border-slate-900 bg-slate-100 animate-pulse text-slate-900 rounded-sm font-bold';
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
