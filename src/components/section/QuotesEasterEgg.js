import React, { useState, useEffect, useRef, useCallback } from 'react';
import Particles from 'react-particles-js';
import { quotes, background } from '../../profile';
import './QuotesEasterEgg.css';

const QuotesEasterEgg = ({ isOpen, onClose }) => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quotePositions, setQuotePositions] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const quoteRefs = useRef({});

  // 명언들을 랜덤하게 배치
  useEffect(() => {
    if (isOpen && quotes.length > 0 && !selectedQuote) {
      const positions = quotes.map(() => ({
        top: Math.random() * 70 + 10, // 10% ~ 80%
        left: Math.random() * 80 + 10, // 10% ~ 90%
        rotation: (Math.random() - 0.5) * 20, // -10도 ~ 10도
      }));
      setQuotePositions(positions);
    }
  }, [isOpen, selectedQuote]);

  // 눈 이펙트가 항상 흰색으로 유지되도록 필터 제거
  useEffect(() => {
    if (isOpen) {
      const removeFilters = () => {
        const particlesElement = document.querySelector('.quotes-particles');
        if (particlesElement) {
          // 요소 자체의 필터 제거
          particlesElement.style.setProperty('filter', 'none', 'important');
          particlesElement.style.setProperty('-webkit-filter', 'none', 'important');
          particlesElement.style.setProperty('-moz-filter', 'none', 'important');
          
          // 모든 하위 요소의 필터 제거
          const allChildren = particlesElement.querySelectorAll('*');
          allChildren.forEach(child => {
            if (child instanceof HTMLElement) {
              child.style.setProperty('filter', 'none', 'important');
              child.style.setProperty('-webkit-filter', 'none', 'important');
              child.style.setProperty('-moz-filter', 'none', 'important');
            }
          });
        }
      };

      // 즉시 실행
      removeFilters();
      
      // 약간의 지연 후 다시 실행 (Particles가 렌더링된 후)
      const timeout1 = setTimeout(removeFilters, 100);
      const timeout2 = setTimeout(removeFilters, 500);
      
      // MutationObserver로 클래스 변경 감지
      const particlesElement = document.querySelector('.quotes-particles');
      if (particlesElement) {
        const observer = new MutationObserver(removeFilters);
        observer.observe(particlesElement, {
          attributes: true,
          attributeFilter: ['class', 'style'],
          subtree: true
        });

        return () => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          observer.disconnect();
        };
      }
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [isOpen]);

  const handleQuoteClick = (quote, index, e) => {
    // 드래그가 발생했으면 클릭 무시
    if (hasDragged) {
      setHasDragged(false);
      return;
    }
    // 먼저 선택 상태를 설정하여 애니메이션 시작
    setSelectedQuote({ ...quote, index });
    // 그 다음 위치를 왼쪽 중앙으로 변경 (애니메이션 트리거)
    setTimeout(() => {
      setQuotePositions(prev => {
        const newPositions = [...prev];
        newPositions[index] = {
          ...newPositions[index],
          top: 50,
          left: 10,
          rotation: 0,
        };
        return newPositions;
      });
    }, 10);
  };

  const handleMouseDown = (index, e) => {
    e.stopPropagation();
    const rect = quoteRefs.current[index]?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
      setDragStartPos({ x: e.clientX, y: e.clientY });
      setDragging(index);
      setHasDragged(false);
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (dragging !== null && quoteRefs.current[dragging]) {
      // 드래그가 실제로 발생했는지 확인 (5px 이상 이동)
      const dragDistance = Math.sqrt(
        Math.pow(e.clientX - dragStartPos.x, 2) + 
        Math.pow(e.clientY - dragStartPos.y, 2)
      );
      
      if (dragDistance > 5) {
        setHasDragged(true);
      }
      
      const container = quoteRefs.current[dragging].parentElement;
      const containerRect = container.getBoundingClientRect();
      
      const newLeft = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
      const newTop = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;
      
      // 컨테이너 경계 내로 제한
      const clampedLeft = Math.max(0, Math.min(100, newLeft));
      const clampedTop = Math.max(0, Math.min(100, newTop));
      
      setQuotePositions(prev => {
        const newPositions = [...prev];
        newPositions[dragging] = {
          ...newPositions[dragging],
          left: clampedLeft,
          top: clampedTop,
        };
        return newPositions;
      });
    }
  }, [dragging, dragOffset, dragStartPos]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    // 다음 클릭을 위해 약간의 지연 후 리셋
    setTimeout(() => {
      setHasDragged(false);
    }, 100);
  }, []);

  useEffect(() => {
    if (dragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const handleClose = () => {
    setSelectedQuote(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`quotes-easter-egg ${isOpen ? 'open' : ''}`}>
      <div className="quotes-overlay" onClick={handleClose}></div>
      <div className="quotes-container">
        {isOpen && (
          <div className="quotes-particles particle">
            <Particles
              height="100%"
              width="100%"
              params={{
                "particles": {
                  "number": {
                    "value": 50,
                    "density": {
                      "enable": false
                    }
                  },
                  "color": {
                    "value": "#ffffff"
                  },
                  "opacity": {
                    "value": 0.8,
                    "random": true
                  },
                  "size": {
                    "value": 7,
                    "random": true,
                    "anim": {
                      "size_min": 2,
                      "enable": true
                    }
                  },
                  "move": {
                    "direction": "bottom",
                    "out_mode": "out",
                    "speed": 1.5
                  },
                  "line_linked": {
                    "enable": false
                  },
                  "shape": {
                    "type": "circle"
                  }
                },
                "interactivity": {
                  "events": {
                    "onclick": {
                      "enable": true,
                      "mode": "remove"
                    }
                  },
                  "modes": {
                    "remove": {
                      "particles_nb": 5
                    }
                  }
                }
              }}
            />
          </div>
        )}
        <button className="quotes-close-btn" onClick={handleClose}>
          ✕
        </button>
        
        <div className="quotes-scattered">
          {quotes.map((quote, index) => {
            const position = quotePositions[index];
            if (!position) return null;
            
            const isSelected = selectedQuote?.index === index;
            const isOther = selectedQuote && !isSelected;
            
            return (
              <div
                key={index}
                ref={el => quoteRefs.current[index] = el}
                className={`quote-item ${dragging === index ? 'dragging' : ''} ${isSelected ? 'selected' : ''} ${isOther ? 'fade-out' : ''}`}
                style={{
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                  transform: isSelected 
                    ? 'translateY(-50%) rotate(0deg) scale(1.5)' 
                    : `rotate(${position.rotation}deg)`,
                }}
                onMouseDown={(e) => !selectedQuote && handleMouseDown(index, e)}
                onClick={(e) => !selectedQuote && handleQuoteClick(quote, index, e)}
              >
                <p className="quote-text">"{quote.text}"</p>
              </div>
            );
          })}
          
          {selectedQuote && (
            <>
              <div className="quotes-selected-quote">
                <h2 className="quotes-selected-text">"{selectedQuote.text}"</h2>
                {selectedQuote.author && (
                  <p className="quotes-selected-author">- {selectedQuote.author}</p>
                )}
              </div>
              <div className="quotes-explanation">
                <h3>My Thoughts</h3>
                <p>{selectedQuote.explanation}</p>
              </div>
              <button 
                className="quotes-back-btn" 
                onClick={() => {
                  setSelectedQuote(null);
                  // 위치 재설정
                  if (isOpen && quotes.length > 0) {
                    const positions = quotes.map(() => ({
                      top: Math.random() * 70 + 10,
                      left: Math.random() * 80 + 10,
                      rotation: (Math.random() - 0.5) * 20,
                    }));
                    setQuotePositions(positions);
                  }
                }}
                title="Back to quotes"
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotesEasterEgg;

