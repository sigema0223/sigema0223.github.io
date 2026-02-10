import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';

const ProjectsToss = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    // 순차적 등장 애니메이션
    const timer = setTimeout(() => {
      projects.forEach((project, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, project.id]);
        }, index * 100);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const hasSelection = !!selectedProjectData;

  return (
    <section 
      id="why-section" 
      className="projects-section-toss"
      style={{
        padding: '5px 6% 60px 8%',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        scrollMarginTop: '80px',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        boxSizing: 'border-box',
      }}
    >
      <div 
        className="projects-layout-toss"
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          gap: '48px',
          alignItems: 'stretch',
          justifyContent: hasSelection ? 'flex-start' : 'center',
        }}
      >
        {/* 왼쪽: 얇은 프로젝트 바 리스트 (고정 메뉴처럼) */}
        <div 
          className="projects-sidebar-toss"
          style={{
            flex: '0 0 420px',
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transform: hasSelection ? 'translateX(-16px)' : 'translateX(24px)',
            transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {projects.map((project) => {
            const isSelected = selectedProject === project.id;
            const isVisible = visibleItems.includes(project.id);
            
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleProjectClick(project.id)}
                className="project-item-toss"
                style={{
                  width: '100%',
                  background: isSelected
                    ? 'rgba(194, 174, 150, 0.5)'
                    : 'rgba(194, 174, 150, 0.25)',
                  padding: '10px 22px', // 좌우 패딩도 약간 늘려서 텍스트 여유 확보
                  borderRadius: '10px',
                  border: 'none',
                  boxShadow: isSelected
                    ? '0 4px 12px rgba(0, 0, 0, 0.18)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  borderLeft: `4px solid ${isSelected ? project.accentColor : 'var(--primary-color)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  fontFamily: '"Anonymous Pro", monospace',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '44px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span
                    className="projects-toss-title"
                    style={{
                      fontSize: '1.0rem',
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                  >
                    {project.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      color: '#444',
                    }}
                  >
                    {project.subtitle}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: '#555',
                    }}
                  >
                    {project.date}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 'bold',
                      color: '#777',
                      fontStyle: 'italic',
                    }}
                  >
                    {project.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 오른쪽: 선택된 프로젝트 상세 (한 페이지에 가득 차게) */}
        <div 
          className="projects-content-toss"
          style={{
            flex: hasSelection ? 1 : 0,
            /* 더 투명한 글래스 효과로 격자 배경이 비치도록 조정 */
            background: hasSelection ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
            backdropFilter: hasSelection ? 'blur(18px)' : 'none',
            WebkitBackdropFilter: hasSelection ? 'blur(18px)' : 'none',
            border: hasSelection ? '1px solid rgba(74, 49, 18, 0.06)' : 'none',
            borderRadius: hasSelection ? '14px' : '0',
            boxShadow: hasSelection ? '0 10px 32px rgba(0, 0, 0, 0.16)' : 'none',
            padding: hasSelection ? '32px 40px 64px' : '0',
            minHeight: hasSelection ? 'calc(100vh - 190px)' : '0',
            maxHeight: hasSelection ? 'calc(100vh - 190px)' : '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            opacity: hasSelection ? 1 : 0,
            transform: hasSelection ? 'translateX(0)' : 'translateX(40px)',
            pointerEvents: hasSelection ? 'auto' : 'none',
            transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {hasSelection && (
            <>
              {/* 스크롤되는 내용 영역 */}
              <div className="projects-content-toss-inner">
                <h2 
                  className="projects-toss-title"
                  style={{
                    fontSize: '1.9rem',
                    fontWeight: 'bold',
                    color: 'rgba(74, 49, 18, 0.9)',
                    marginBottom: '18px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {selectedProjectData.title}
                </h2>
                
                <p 
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'rgba(0, 0, 0, 0.75)',
                    marginBottom: '22px',
                    fontWeight: 'bold',
                  }}
                >
                  {selectedProjectData.overview}
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <h3 
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: 'rgba(74, 49, 18, 0.7)',
                      marginBottom: '10px',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Key Features
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedProjectData.keyFeatures.map((feature, idx) => {
                      const hasColon = feature.includes(':');
                      const featureTitle = hasColon ? feature.split(':')[0] : null;
                      const featureDesc = hasColon ? feature.split(':').slice(1).join(':').trim() : feature;
                      
                      return (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            marginBottom: '10px',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            color: 'rgba(0, 0, 0, 0.75)',
                            fontWeight: 'bold',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: selectedProjectData.accentColor,
                              marginTop: '8px',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            {featureTitle && (
                              <span style={{ color: selectedProjectData.accentColor }}>
                                {featureTitle}:
                              </span>
                            )}
                            <span style={{ marginLeft: featureTitle ? '4px' : '0' }}>
                              {featureDesc}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: 'rgba(74, 49, 18, 0.7)',
                      marginBottom: '10px',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Technologies
                  </h3>
                  <div 
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {selectedProjectData.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '6px 14px',
                          background: 'rgba(74, 49, 18, 0.06)',
                          borderRadius: '16px',
                          fontSize: '0.85rem',
                          color: 'rgba(74, 49, 18, 0.8)',
                          fontWeight: 'bold',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProjectData.media && selectedProjectData.media.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3 
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: 'rgba(74, 49, 18, 0.7)',
                        marginBottom: '10px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Product Screens
                    </h3>
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '16px',
                      }}
                    >
                      {selectedProjectData.media.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'transparent',
                            borderRadius: '10px',
                            overflow: 'hidden',
                          }}
                        >
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={`${selectedProjectData.title} ${idx + 1}`}
                              style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                              }}
                            />
                          ) : (
                            <div 
                              style={{
                                width: '100%',
                                height: '180px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                fontWeight: 'bold',
                              }}
                            >
                              Video
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 하단 고정 링크 영역 */}
              <div 
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '8px',
                }}
              >
                {selectedProjectData.github && (
                  <a
                    href={selectedProjectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 22px',
                      background: 'rgba(74, 49, 18, 0.06)',
                      color: 'rgba(74, 49, 18, 0.9)',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(74, 49, 18, 0.1)',
                    }}
                  >
                    <Github style={{ width: '16px', height: '16px' }} />
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProjectData.link && (
                  <a
                    href={selectedProjectData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 22px',
                      background: selectedProjectData.accentColor,
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    <ExternalLink style={{ width: '16px', height: '16px' }} />
                    <span>Website</span>
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
