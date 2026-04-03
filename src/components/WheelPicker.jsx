import React, { useRef, useEffect } from 'react';
import './WheelPicker.css';

export default function WheelPicker({ label, items, value, onChange }) {
  const scrollRef = useRef(null);
  const itemHeight = 40; // matches CSS row height

  // Handle snapping scroll
  const handleScroll = (e) => {
    // Determine which item is centered
    const y = e.target.scrollTop;
    const index = Math.round(y / itemHeight);
    if (items[index] && items[index] !== value) {
      onChange(items[index]);
    }
  };

  // Sync scroll position if 'value' changes externally
  useEffect(() => {
    if (scrollRef.current) {
      const index = items.indexOf(value);
      if (index !== -1) {
        scrollRef.current.scrollTop = index * itemHeight;
      }
    }
  }, [value, items]);

  return (
    <div className="wheel-picker-wrapper">
      <div className="wheel-picker-label">{label}</div>
      <div className="wheel-picker-mask">
        <div className="wheel-picker-indicator" />
        <div className="wheel-picker" onScroll={handleScroll} ref={scrollRef}>
          <div className="wheel-spacer" />
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`wheel-item ${item === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(item);
                if(scrollRef.current) scrollRef.current.scrollTop = i * itemHeight;
              }}
            >
              {item}
            </div>
          ))}
          <div className="wheel-spacer" />
        </div>
      </div>
    </div>
  );
}
