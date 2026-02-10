import React, { useEffect, useState, useRef } from 'react';
import { aboutMe } from '../../profile';

const AboutMe = ({ onQuestionMarkClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    const windowHeight = window.innerHeight;
                    // 스크롤을 조금만 내려도 보이도록 설정
                    if (scrollPosition > windowHeight * 0.3) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        
        const updateOverlaySize = () => {
            if (imageRef.current && overlayRef.current) {
                const img = imageRef.current;
                const overlay = overlayRef.current;
                overlay.style.width = img.offsetWidth + 'px';
                overlay.style.height = img.offsetHeight + 'px';
                overlay.style.top = img.offsetTop + 'px';
                overlay.style.left = img.offsetLeft + 'px';
            }
        };

        const removeFilters = () => {
            if (imageRef.current) {
                imageRef.current.style.setProperty('filter', 'none', 'important');
                imageRef.current.style.setProperty('-webkit-filter', 'none', 'important');
                imageRef.current.style.setProperty('-moz-filter', 'none', 'important');
            }
            const wrapper = document.getElementById('about-me-image-not-dark');
            if (wrapper) {
                wrapper.style.setProperty('filter', 'none', 'important');
                wrapper.style.setProperty('-webkit-filter', 'none', 'important');
                wrapper.style.setProperty('-moz-filter', 'none', 'important');
            }
            const rightContainer = document.querySelector('.about-me-right');
            if (rightContainer) {
                rightContainer.style.setProperty('filter', 'none', 'important');
                rightContainer.style.setProperty('-webkit-filter', 'none', 'important');
                rightContainer.style.setProperty('-moz-filter', 'none', 'important');
            }
        };

        if (imageRef.current) {
            imageRef.current.addEventListener('load', () => {
                updateOverlaySize();
                removeFilters();
            });
            updateOverlaySize();
            removeFilters();
        }

        // 다크모드 변경 감지
        const observer = new MutationObserver(() => {
            removeFilters();
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // 지속적으로 필터 제거 (다크모드 전환 시 즉시 반영)
        const filterCheckInterval = setInterval(() => {
            removeFilters();
        }, 100);

        window.addEventListener('resize', updateOverlaySize);
        return () => {
            window.removeEventListener('resize', updateOverlaySize);
            observer.disconnect();
            clearInterval(filterCheckInterval);
            if (imageRef.current) {
                imageRef.current.removeEventListener('load', updateOverlaySize);
            }
        };
    }, []);

    const handleQuestionMarkClick = (e) => {
        e.preventDefault();
        if (onQuestionMarkClick) {
            onQuestionMarkClick();
        }
    };

    // 제목을 분리하여 "?"를 클릭 가능하게 만들기
    const titleParts = aboutMe.title.split('?');
    const titleBeforeQuestion = titleParts[0];
    const questionMark = '?';

    return (
        <div className={`AboutMe ${isVisible ? 'visible' : ''}`}>
            <div className="about-me-container">
                <div className="about-me-left">
                    <h2>
                        {titleBeforeQuestion}
                        <span 
                            className="question-mark-clickable" 
                            onClick={handleQuestionMarkClick}
                            title="Click to see quotes"
                        >
                            {questionMark}
                        </span>
                    </h2>
                    <div className="about-content">
                        {aboutMe.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    
                    <div className="education-section">
                        <div className="education-item">
                            <h3 className="education-institution">University College London (UCL)</h3>
                            <p className="education-degree">MEng Computer Science</p>
                            <p className="education-period">Sep 2021 - Jun 2027</p>
                            <p className="education-location">London, United Kingdom</p>
                        </div>
                        <div className="education-item">
                            <h3 className="education-institution">Mander Portman Woodward Birmingham</h3>
                            <p className="education-degree">A-level</p>
                            <p className="education-period">Sep 2019 - Jun 2020</p>
                            <p className="education-location">Birmingham, United Kingdom</p>
                        </div>
                    </div>
                </div>
                <div className="about-me-right">
                    
                    <div className="about-me-image-wrapper" id="about-me-image-not-dark">
                        <img 
                            ref={imageRef}
                            src="KakaoTalk_20251231_004403559.jpg" 
                            alt="About me"
                            className="about-me-image"
                            id="about-me-image"
                        />
                        <div ref={overlayRef} className="about-me-image-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;

