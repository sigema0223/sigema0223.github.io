import React, { useEffect, useState } from 'react';
import Snowfall from './components/layouts/Particles';
import NavigationBar from './components/layouts/NavigationBar';
import Header from './components/section/Header';
import AboutMe from './components/section/AboutMe';
import Contact from './components/section/Contact';
import ProjectsToss from './components/section/ProjectsToss';
import QuotesEasterEgg from './components/section/QuotesEasterEgg';
import './styles/style.css';

function App() {
  const [isQuotesOpen, setIsQuotesOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -300, y: -300 });

  // Mouse glow
  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="App" style={{ background: 'var(--c-bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Noise SVG filter */}
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="noise-overlay" style={{ filter: 'url(#noise)' }} />

      {/* Mouse glow */}
      <div className="mouse-glow" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Snow */}
      <Snowfall />

      {/* Navigation */}
      <NavigationBar />

      {/* Sections */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <Header />
        <AboutMe onQuestionMarkClick={() => setIsQuotesOpen(true)} />
        <ProjectsToss />
        <Contact />
      </div>

      {/* Easter egg */}
      <QuotesEasterEgg isOpen={isQuotesOpen} onClose={() => setIsQuotesOpen(false)} />
    </div>
  );
}

export default App;
