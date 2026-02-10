import React, { useState, useEffect } from 'react';

const NavigationBar = () => {
    const [activeSection, setActiveSection] = useState('header-section');

    const scrollToSection = (sectionId) => {
        if (sectionId === 'contact-section') {
            // Contact 섹션일 때는 페이지 맨 아래로 스크롤
            window.scrollTo({
                top: document.documentElement.scrollHeight - window.innerHeight,
                behavior: 'smooth'
            });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80; // 네비게이션 바 높이 고려
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['header-section', 'who-section', 'why-section', 'when-section', 'contact-section'];
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const sectionTop = section.offsetTop;
                    if (scrollPosition >= sectionTop) {
                        setActiveSection(sections[i]);
                        break;
                    }
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
        { id: 'when-section', label: 'When?' },
        { id: 'contact-section', label: 'How?' }
    ];

    return (
        <nav className="navigation-bar">
            <div className="nav-container">
                {menuItems.map((item) => (
                    <div key={item.label} className="nav-item-wrapper">
                        <button 
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => item.id && scrollToSection(item.id)}
                        >
                            {item.label}
                        </button>
                        {item.id && (
                            <div className={`nav-toggle ${activeSection === item.id ? 'active' : ''}`}>
                                <div className="toggle-arrow"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBar;

