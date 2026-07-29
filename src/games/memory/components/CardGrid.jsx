import React from 'react';
import Card from './Card';

/** Card size in px based on the largest grid dimension */
const CARD_SIZE_MAP = {
  2: 100, 3: 92, 4: 84, 5: 76, 6: 68,
  7: 60,  8: 54, 9: 48, 10: 44, 12: 38,
};
const GAP = 4; // px between cards

function getCardSize(maxDim) {
  return CARD_SIZE_MAP[maxDim] ?? 38;
}

/**
 * Renders the full card grid.
 * Cards are laid out in a CSS grid with fixed column widths.
 * Each Card is keyed by its stable `id` (assigned on deck creation)
 * so React never unmounts/remounts a card between state changes.
 */
export default function CardGrid({ cards, rows, cols, onCardClick }) {
  const maxDim  = Math.max(rows, cols);
  const size    = getCardSize(maxDim);
  const totalW  = cols * size + (cols - 1) * GAP;

  return (
    <div
      style={{
        display             : 'grid',
        gridTemplateColumns : `repeat(${cols}, ${size}px)`,
        gap                 : GAP,
        width               : totalW,
      }}
    >
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          card={card}
          size={size}
          onClick={() => onCardClick(idx)}
        />
      ))}
    </div>
  );
}
