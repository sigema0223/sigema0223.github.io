import React, { useState, useEffect } from 'react';

const NavigationBar = () => {
  const [activeSection, setActiveSection] = useState('header-section');
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['header-section', 'who-section', 'why-section', 'contact-section'];
      const scrollPosition = window.scrollY + 150;
      const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

      // Progress
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      if (atBottom) {
        setActiveSection('contact-section');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'header-section', label: 'What?' },
    { id: 'who-section', label: 'Who?' },
    { id: 'why-section', label: 'Why?' },
    { id: 'contact-section', label: 'How?' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Vertical right nav */}
      <nav className="nav-vertical">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                fontSize: isActive ? 16 : 14,
                color: isActive ? '#4a3112' : '#b5a898',
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <span>{item.label}</span>
              <div
                className="nav-line"
                style={{
                  width: isActive ? 24 : 12,
                  background: isActive ? '#4a3112' : '#c2ae96',
                }}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default NavigationBar;
