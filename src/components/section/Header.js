import React, { useState, useEffect, useRef } from 'react';
import { header } from '../../profile';

// Typewriter hook
function useTypewriter(texts, speed = 50, pause = 2400) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timer;
    if (!deleting && charIdx <= current.length) {
      timer = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timer = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c - 1); }, speed / 2);
    } else {
      setDeleting(false); setIdx(i => (i + 1) % texts.length); setCharIdx(0);
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return display;
}

// InView hook
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const Header = () => {
  const [ref, inView] = useInView(0.1);
  const typed = useTypewriter(
    ['LLMs & AI Research', 'Human-Computer Interaction', 'Financial Computing', 'Full-Stack Development'],
    50, 2400
  );

  const t = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section id="header-section" ref={ref} className="header-section">
      {/* Decorative circles */}
      {[500, 360, 240].map((size, i) => (
        <div key={i} className="header-circle" style={{
          right: `${-8 + i * 5}%`, top: `${15 + i * 5}%`,
          width: size, height: size,
          border: `1px solid rgba(74,49,18,${0.06 - i * 0.015})`,
          opacity: inView ? 1 : 0,
          transform: inView ? 'scale(1)' : 'scale(0.8)',
          transitionDelay: `${0.3 + i * 0.2}s`,
        }} />
      ))}

      <p style={{
        fontFamily: 'var(--f-mono)', fontSize: 12,
        letterSpacing: '0.2em', color: '#8a7a6a',
        textTransform: 'uppercase', marginBottom: 20, ...t(0.2),
      }}>
        Portfolio
      </p>

      <h1 style={{
        ...t(0.3),
        transform: inView ? 'translateY(0)' : 'translateY(45px)',
        transition: 'all 1s cubic-bezier(0.22,1,0.36,1) 0.3s',
      }}>
        {header.name}
      </h1>

      <p style={{
        fontFamily: 'var(--f-mono)', fontSize: 'clamp(13px, 1.4vw, 16px)',
        color: '#6a5a4a', marginTop: 14, ...t(0.6),
      }}>
        and this is my portfolio...
      </p>

      {/* Typewriter */}
      <div style={{
        marginTop: 36, fontFamily: 'var(--f-mono)',
        fontSize: 'clamp(14px, 1.5vw, 18px)', color: '#4a3112',
        opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.9s',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ color: '#c2ae96', fontSize: 18 }}>→</span>
        <span>{typed}</span>
        <span className="typewriter-cursor" />
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: inView ? 0.4 : 0, transition: 'opacity 1s ease 1.3s',
      }}>
        <span style={{
          fontFamily: 'var(--f-mono)', fontSize: 10,
          letterSpacing: '0.15em', color: '#8a7a6a',
        }}>SCROLL</span>
        <div className="scroll-hint-line" />
      </div>
    </section>
  );
};

export default Header;
