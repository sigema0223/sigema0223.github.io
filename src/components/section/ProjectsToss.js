import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/projects';

function useInView(threshold = 0.06) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(node); return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const ProjectsToss = () => {
  const [ref, inView] = useInView(0.06);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  const data = projects.find(p => p.id === selectedProject);
  const hasSelection = !!data;

  useEffect(() => {
    if (inView && visibleItems.length === 0) {
      projects.forEach((p, i) => {
        setTimeout(() => setVisibleItems(prev => [...prev, p.id]), i * 80);
      });
    }
  }, [inView]);

  return (
    <section id="why-section" ref={ref} className="projects-section">
      {/* Title */}
      <div style={{
        width: '100%', maxWidth: 1500, marginBottom: 40,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s ease 0.15s',
      }}>
        <p style={{
          fontFamily: 'var(--f-mono)', fontSize: 11,
          letterSpacing: '0.2em', color: '#8a7a6a',
          textTransform: 'uppercase', marginBottom: 14,
        }}>02 — What I've built</p>
        <h2 style={{
          fontFamily: 'var(--f-serif)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 400, color: '#1a1108', margin: 0,
        }}>
          Projects & <span style={{ fontStyle: 'italic' }}>Experiences</span>
        </h2>
      </div>

      <div className="projects-layout" style={{
        justifyContent: hasSelection ? 'flex-start' : 'center',
        flexWrap: 'wrap',
      }}>
        {/* Left sidebar */}
        <div className="projects-sidebar" style={{
          transform: hasSelection ? 'translateX(-12px)' : 'translateX(20px)',
        }}>
          {projects.map(proj => {
            const isActive = selectedProject === proj.id;
            const isVisible = visibleItems.includes(proj.id);
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(isActive ? null : proj.id)}
                className={`project-bar ${isActive ? 'active' : ''}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className="title">{proj.title}</span>
                  <span className="subtitle">{proj.subtitle}</span>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div className="date">{proj.date}</div>
                  <div className="category">{proj.category}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right detail */}
        <div className={`project-detail ${hasSelection ? 'open' : 'closed'}`}>
          {data && (
            <>
              <div style={{ overflowY: 'auto', flex: 1, paddingRight: 8 }} className="detail-scroll">
                <div key={data.id} style={{ animation: 'fadeSlideIn 0.4s ease' }}>
                  <h3 style={{ marginBottom: 8 }}>{data.title}</h3>
                  <p className="meta" style={{ marginBottom: 20 }}>
                    {data.category} · {data.date}
                  </p>

                  <p className="overview" style={{ marginBottom: 28 }}>
                    {data.overview}
                  </p>

                  {/* Key Features */}
                  <div style={{ marginBottom: 28 }}>
                    <p className="section-label" style={{ marginBottom: 16 }}>
                      Key Highlights
                    </p>
                    {data.keyFeatures.map((f, i) => {
                      const colonIdx = f.indexOf(':');
                      const title = colonIdx > -1 ? f.slice(0, colonIdx) : null;
                      const desc = colonIdx > -1 ? f.slice(colonIdx + 1).trim() : f;
                      return (
                        <div key={i} style={{
                          display: 'flex', gap: 12,
                          marginBottom: 12, alignItems: 'flex-start',
                        }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: '#4a3112', marginTop: 8, flexShrink: 0,
                          }} />
                          <p className="feature-text">
                            {title && (
                              <span className="feature-title">{title}:</span>
                            )}
                            {title ? ' ' : ''}{desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Technologies */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {data.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Product Screens */}
                  {data.media && data.media.length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <p className="section-label" style={{ marginBottom: 12 }}>
                        Product Screens
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: data.media.length > 1 ? '1fr 1fr' : '1fr',
                        gap: 12,
                      }}>
                        {data.media.map((item, idx) => (
                          <div key={idx} style={{ borderRadius: 8, overflow: 'hidden' }}>
                            {item.type === 'image' && (
                              <img
                                src={item.url}
                                alt={`${data.title} ${idx + 1}`}
                                style={{
                                  width: '100%', height: 'auto',
                                  display: 'block', borderRadius: 8,
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 10, marginTop: 14, flexShrink: 0 }}>
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub →
                  </a>
                )}
                {data.link && (
                  <a href={data.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Website ↗
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsToss;
