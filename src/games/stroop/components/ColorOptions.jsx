import React from 'react';

export default function ColorOptions({ options, onSelectOption, disabled }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-4">
      {options.map((color) => (
        <button
          key={color.id}
          onClick={() => !disabled && onSelectOption(color.id)}
          disabled={disabled}
          className={`
            group relative flex items-center justify-center p-5 sm:p-6 rounded-2xl border backdrop-blur-md
            transition-all duration-200 shadow-lg cursor-pointer
            ${color.bgClass} bg-opacity-20 hover:bg-opacity-30 border-opacity-40
            ${disabled ? 'opacity-50 cursor-not-allowed scale-100' : 'hover:-translate-y-1 active:scale-95'}
          `}
        >
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${color.bgClass} ring-2 ring-white/30`} />
            <span className={`text-base sm:text-xl font-black tracking-wider uppercase ${color.textClass}`}>
              {color.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
