import React from 'react';
import Hole from './Hole';

export default function HoleGrid({ activeHole, whackedHole, onWhack, isPlaying }) {
  const holes = Array.from({ length: 9 }, (_, index) => index);

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {holes.map((index) => (
          <Hole
            key={index}
            index={index}
            isActive={activeHole === index}
            isWhacked={whackedHole === index}
            onClick={onWhack}
            disabled={!isPlaying}
          />
        ))}
      </div>
    </div>
  );
}
