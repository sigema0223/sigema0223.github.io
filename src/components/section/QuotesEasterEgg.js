import React, { useState, useEffect } from 'react';
import { quotes } from '../../profile';
import Snowfall from '../layouts/Particles';

const QuotesEasterEgg = ({ isOpen, onClose }) => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (isOpen && !selectedQuote) {
      setPositions(quotes.map(() => ({
        top: Math.random() * 55 + 18,
        left: Math.random() * 65 + 14,
        rotation: (Math.random() - 0.5) * 18,
      })));
    }
  }, [isOpen, selectedQuote]);

  const handleClose = () => { setSelectedQuote(null); onClose(); };

  const handleSelect = (quote, index) => {
    if (selectedQuote) return;
    setSelectedQuote({ ...quote, index });
    setTimeout(() => {
      setPositions(prev => {
        const next = [...prev];
        next[index] = { top: 42, left: 7, rotation: 0 };
        return next;
      });
    }, 20);
  };

  const handleBack = () => {
    setSelectedQuote(null);
    setPositions(quotes.map(() => ({
      top: Math.random() * 55 + 18,
      left: Math.random() * 65 + 14,
      rotation: (Math.random() - 0.5) * 18,
    })));
  };

  if (!isOpen) return null;

  return (
    <div className="quotes-overlay">
      <div className="quotes-backdrop" onClick={handleClose} />
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <Snowfall count={40} />

        {/* Close */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: 24, right: 28, zIndex: 10,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: 40, height: 40,
          color: '#fff', fontSize: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--f-mono)',
        }}>✕</button>

        {/* Quote bubbles */}
        {quotes.map((q, i) => {
          const pos = positions[i];
          if (!pos) return null;
          const isSelected = selectedQuote?.index === i;
          const isOther = selectedQuote && !isSelected;

          return (
            <div
              key={i}
              onClick={() => handleSelect(q, i)}
              className="quote-bubble"
              style={{
                top: `${pos.top}%`, left: `${pos.left}%`,
                transform: isSelected
                  ? 'translateY(-50%) rotate(0deg) scale(1.25)'
                  : `translate(-50%,-50%) rotate(${pos.rotation}deg)`,
                cursor: selectedQuote ? 'default' : 'pointer',
                opacity: isOther ? 0.12 : 1,
                zIndex: isSelected ? 5 : 1,
                maxWidth: isSelected ? 300 : 250,
              }}
            >
              <p style={{ fontSize: isSelected ? 16 : 14 }}>
                "{q.text}"
              </p>
              {isSelected && q.author && (
                <p style={{
                  fontFamily: 'var(--f-mono)', fontSize: 11,
                  color: 'rgba(255,255,255,0.55)', marginTop: 8,
                }}>— {q.author}</p>
              )}
            </div>
          );
        })}

        {/* Explanation */}
        {selectedQuote && (
          <div style={{
            position: 'absolute', right: '8%', top: '50%',
            transform: 'translateY(-50%)', maxWidth: 420,
            animation: 'fadeSlideIn 0.6s ease 0.3s both',
          }}>
            <h3 style={{
              fontFamily: 'var(--f-serif)', fontSize: 22,
              color: '#fff', margin: '0 0 16px 0', fontWeight: 400,
            }}>My Thoughts</h3>
            <p style={{
              fontFamily: 'var(--f-mono)', fontSize: 13,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.9, whiteSpace: 'pre-line',
            }}>{selectedQuote.explanation}</p>
            <button onClick={handleBack} style={{
              marginTop: 20, background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 4, padding: '8px 20px',
              color: '#fff', cursor: 'pointer',
              fontFamily: 'var(--f-mono)', fontSize: 12,
            }}>← Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesEasterEgg;
