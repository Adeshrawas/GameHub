import React from 'react';

/**
 * Card component with CSS 3D flip animation.
 *
 * - Face-down  : dark slate with "?"
 * - Face-up    : emoji value (after flip)
 * - Matched    : green-tinted, non-clickable
 *
 * The flip uses rotateY transform on the inner wrapper.
 * backface-visibility: hidden ensures only one face is visible at a time.
 */
export default function Card({ card, onClick, size }) {
  const { value, isFlipped, isMatched } = card;
  const revealed = isFlipped || isMatched;

  const baseStyle = {
    width : size,
    height: size,
    cursor: isMatched ? 'default' : 'pointer',
    perspective: '600px',
    flexShrink: 0,
  };

  const innerStyle = {
    position        : 'relative',
    width           : '100%',
    height          : '100%',
    transformStyle  : 'preserve-3d',
    transition      : 'transform 0.4s ease',
    transform       : revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const faceBase = {
    position           : 'absolute',
    inset              : 0,
    backfaceVisibility : 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    display            : 'flex',
    alignItems         : 'center',
    justifyContent     : 'center',
    borderRadius       : 8,
    userSelect         : 'none',
  };

  const fontSize = Math.max(12, Math.round(size * 0.42));

  return (
    <div style={baseStyle} onClick={isMatched ? undefined : onClick}>
      <div style={innerStyle}>

        {/* Front face — hidden (face-down) */}
        <div
          style={{
            ...faceBase,
            background: '#1e293b',
            border    : '1px solid #334155',
            fontSize  : Math.round(size * 0.28),
            color     : '#475569',
          }}
        >
          ?
        </div>

        {/* Back face — emoji (face-up) */}
        <div
          style={{
            ...faceBase,
            transform  : 'rotateY(180deg)',
            background : isMatched ? '#14532d' : '#1e3a5f',
            border     : `1px solid ${isMatched ? '#166534' : '#1e4d7e'}`,
            fontSize   : fontSize,
            boxShadow  : isMatched ? 'inset 0 0 0 1px rgba(74,222,128,0.18)' : 'none',
          }}
        >
          {value}
        </div>

      </div>
    </div>
  );
}
