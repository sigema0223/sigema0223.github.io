import React, { useEffect, useState } from 'react';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;

          if (scrollPosition > windowHeight * 1.1) {
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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`contact-container ${isVisible ? 'visible' : ''}`}>
      <div className="col-12 d-none d-md-block offset-md-1 col-md-4 Photo" id="not-dark2"></div>
      <h1>Contact</h1>
      <p className={`contact-item from-top ${isVisible ? 'visible' : ''}`}>
        Email: <a href="mailto:hyunwoo.lee.21@ucl.ac.uk">hyunwoo.lee.21@ucl.ac.uk</a>
      </p>
      <p className={`contact-item from-left ${isVisible ? 'visible' : ''}`}>
        LinkedIn: <a href="https://www.linkedin.com/in/hyunwoo-lee-cs/" target="_blank" rel="noopener noreferrer">linkedin.com/in/hyunwoo-lee-cs/</a>
      </p>
      <p className={`contact-item from-right ${isVisible ? 'visible' : ''}`}>
        GitHub: <a href="https://github.com/sigema0223" target="_blank" rel="noopener noreferrer">github.com/sigema0223</a>
      </p>
      <p className={`contact-item from-bottom ${isVisible ? 'visible' : ''}`}>
        Phone (KR): <a href="tel:+821085423556">+82 10-8542-3556</a>
      </p>
      <p className={`contact-item from-top ${isVisible ? 'visible' : ''}`}>
        Phone (UK): <a href="tel:+447470816755">+44 7470 816755</a>
      </p>
    </section>
  );
}

export default Contact;
