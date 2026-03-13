import React, { useState, useEffect, useRef } from 'react';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(node); return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const Contact = () => {
  const [ref, inView] = useInView(0.12);

  const items = [
    { label: 'Email', value: 'hyunwoo.lee.21@ucl.ac.uk', href: 'mailto:hyunwoo.lee.21@ucl.ac.uk' },
    { label: 'LinkedIn', value: 'linkedin.com/in/hyunwoo-lee-cs/', href: 'https://www.linkedin.com/in/hyunwoo-lee-cs/' },
    { label: 'GitHub', value: 'github.com/sigema0223', href: 'https://github.com/sigema0223' },
    { label: 'Phone (KR)', value: '+82 10-8542-3556', href: 'tel:+821085423556' },
    { label: 'Phone (UK)', value: '+44 7470 816755', href: 'tel:+447470816755' },
  ];

  return (
    <section id="contact-section" ref={ref} className="contact-section">
      <p style={{
        fontFamily: 'var(--f-mono)', fontSize: 11,
        letterSpacing: '0.2em', color: '#8a7a6a',
        textTransform: 'uppercase', marginBottom: 16,
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.6s ease 0.1s',
      }}>03 — Get in touch</p>

      <h2 style={{
        fontFamily: 'var(--f-serif)',
        fontSize: 'clamp(32px, 5vw, 56px)',
        fontWeight: 400, color: '#1a1108',
        margin: '0 0 48px 0', lineHeight: 1.15,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease 0.2s',
      }}>
        Let's create<br />
        something <span style={{ fontStyle: 'italic', color: '#4a3112' }}>meaningful</span>.
      </h2>

      <div style={{ maxWidth: 520 }}>
        {items.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            target={item.label.includes('Phone') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="contact-link"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(14px)',
              transition: `all 0.6s ease ${0.3 + i * 0.08}s, padding-left 0.3s ease`,
            }}
          >
            <span className="label">{item.label}</span>
            <span className="value">{item.value}</span>
          </a>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--f-mono)', fontSize: 11,
        color: '#b0a090', marginTop: 64,
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.6s ease 0.9s',
      }}>© Hyunwoo Lee — Designed with care.</p>
    </section>
  );
};

export default Contact;
