import React from 'react';

// ──────────────────────────────────────────
// Letter Hover Helper
// ──────────────────────────────────────────
export default function LetterHover({ text }) {
  return (
    <span className="letter-hover-group">
      {text.split('').map((char, i) => (
        <span key={i} className="letter-hover">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
