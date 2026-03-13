import React, { useState, useEffect, useRef } from 'react';
import { aboutMe } from '../../profile';
import profileImage from '../../KakaoTalk_20251231_004403559.jpg';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(node); return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const AboutMe = ({ onQuestionMarkClick }) => {
  const [ref, inView] = useInView(0.1);

  const t = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(18px)',
    transition: `all 0.7s ease ${delay}s`,
  });

  return (
    <section id="who-section" ref={ref} className="about-section">
      <div className="about-container">
        {/* Left */}
        <div className="about-left">
          <p style={{
            fontFamily: 'var(--f-mono)', fontSize: 11,
            letterSpacing: '0.2em', color: '#8a7a6a',
            textTransform: 'uppercase', marginBottom: 14, ...t(0.1),
          }}>01 — Who am I</p>

          <h2 style={{
            fontFamily: 'var(--f-serif)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 400, color: '#1a1108',
            lineHeight: 1.15, margin: '0 0 32px 0', ...t(0.2),
          }}>
            Building at the<br />
            <span style={{ fontStyle: 'italic', color: '#4a3112' }}>intersection</span> of<br />
            code & curiosity.{' '}
            <span
              onClick={onQuestionMarkClick}
              style={{
                cursor: 'pointer', display: 'inline-block',
                color: '#c2ae96', fontSize: '0.5em',
                transition: 'transform 0.3s ease', verticalAlign: 'super',
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.4) rotate(12deg)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              title="Easter egg!"
            >?</span>
          </h2>

          {aboutMe.description.map((p, i) => (
            <p key={i} style={{
              fontFamily: 'var(--f-mono)', fontSize: 14,
              lineHeight: 1.85, color: '#5a4a3a',
              maxWidth: 580, marginBottom: 16, ...t(0.35 + i * 0.12),
            }}>{p}</p>
          ))}

          {/* Interest tags */}
          <div style={{
            display: 'flex', gap: 10, flexWrap: 'wrap',
            marginTop: 20, ...t(0.6),
          }}>
            {['LLMs', 'HCI', 'Financial Computing'].map(tag => (
              <span key={tag} className="interest-tag">{tag}</span>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginTop: 32, ...t(0.65) }}>
            <div className="education-card">
              <p style={{
                fontFamily: 'var(--f-serif)', fontSize: 17,
                color: '#1a1108', margin: '0 0 4px 0',
              }}>University College London</p>
              <p style={{
                fontFamily: 'var(--f-mono)', fontSize: 13,
                color: '#4a3a2a', margin: '0 0 2px 0',
              }}>MEng Computer Science</p>
              <p style={{
                fontFamily: 'var(--f-mono)', fontSize: 12,
                color: '#8a7a6a', margin: 0,
              }}>2021 – 2027 · London, UK</p>
            </div>
          </div>
        </div>

        {/* Right — Profile Image */}
        <div className="about-right" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s',
        }}>
          <div className="about-image-wrapper">
            <img
              src={profileImage}
              alt="Hyunwoo Lee"
              className="about-image"
              id="about-me-image-not-dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
