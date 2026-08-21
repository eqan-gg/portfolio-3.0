import { useState, useEffect, useRef } from 'react';
import { content } from '../data/content';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('react');
  const sectionRef = useRef(null);
  
  const [projectsData, setProjectsData] = useState({
    react: content.projects.react,
    wordpress: content.projects.wordpress,
  });

  useEffect(() => {
    setProjectsData({
      react: content.projects.react,
      wordpress: content.projects.wordpress,
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const currentProjects = projectsData[activeTab];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(currentProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjectsData((prev) => ({
      ...prev,
      [activeTab]: items,
    }));
  };

  return (
    <section id="projects" ref={sectionRef} className="projects-section" aria-label="Projects">
      <div className="section-heading reveal">
        <h2 className="section-label-mobile font-mono accent-text">Projects</h2>
      </div>

      {/* Tabs and Drag indicator */}
      <div className="project-tabs-container reveal">
        <div className="project-tabs">
          <button
            className={`tab-btn ${activeTab === 'react' ? 'active' : ''}`}
            onClick={() => setActiveTab('react')}
          >
            React & Web Apps
          </button>
          <button
            className={`tab-btn ${activeTab === 'wordpress' ? 'active' : ''}`}
            onClick={() => setActiveTab('wordpress')}
          >
            WordPress
          </button>
        </div>
        <div className="drag-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <polyline points="5 9 2 12 5 15" />
            <polyline points="9 5 12 2 15 5" />
            <polyline points="19 9 22 12 19 15" />
            <polyline points="9 19 12 22 15 19" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="12" y1="2" x2="12" y2="22" />
          </svg>
          Drag to reorder
        </div>
      </div>

      {/* Project Cards with Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`droppable-${activeTab}`}>
          {(provided) => (
            <div
              className="projects-list card-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentProjects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`project-draggable-wrapper ${snapshot.isDragging ? 'is-dragging' : ''}`}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`project-card card-item reveal`}
                        style={{ animationDelay: `${(index % 4) * 0.1}s` }}
                        aria-label={`${project.title} (opens in new tab)`}
                      >
                        <div className="project-card-inner">
                          <div className="project-header">
                            <h3 className="project-title">
                              {project.title}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="external-arrow"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </h3>
                            {project.type && (
                              <span className="project-badge">{project.type}</span>
                            )}
                            {project.featured && (
                              <span className="project-badge featured">Featured</span>
                            )}
                          </div>

                          <p className="project-description">{project.description}</p>

                          <div className="project-meta">
                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-link"
                                aria-label={`${project.title} GitHub repo`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                              </a>
                            )}
                          </div>

                          <div className="project-tech-stack">
                            {project.techStack.map((tech, i) => (
                              <span key={i} className="tech-pill">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <style>{`
        .projects-section {
          margin-bottom: 6rem;
          scroll-margin-top: 6rem;
        }

        .section-label-mobile {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: none;
        }

        /* ── Tabs & Indicator ── */
        .project-tabs-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .project-tabs {
          display: flex;
          gap: 0.5rem;
        }

        .drag-indicator {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          opacity: 0.7;
          background: rgba(136, 146, 176, 0.1);
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
        }

        .tab-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--border);
          transition: all var(--transition);
        }

        .tab-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .tab-btn.active {
          color: var(--accent);
          background: var(--accent-dim);
          border-color: transparent;
        }

        /* ── Project Card ── */
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .project-draggable-wrapper {
          border-radius: 8px;
          transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease;
        }

        .project-draggable-wrapper.is-dragging {
          z-index: 100;
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .project-draggable-wrapper.is-dragging .project-card {
          background: rgba(17, 34, 64, 0.85);
          border: 1px solid rgba(100, 255, 218, 0.3);
        }

        .project-card {
          display: block;
          text-decoration: none;
          padding: 1.5rem;
          border-radius: 8px;
          transition: all var(--transition);
          position: relative;
          background: transparent;
          border: 1px solid transparent;
        }

        .project-card:hover {
          background: rgba(17, 34, 64, 0.7);
          box-shadow:
            inset 0 1px 0 0 rgba(148, 163, 184, 0.08),
            0 4px 24px rgba(0, 0, 0, 0.12);
        }

        .project-card-inner {
          position: relative;
          z-index: 2;
        }

        .project-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }

        .project-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: color var(--transition-fast);
        }

        .project-card:hover .project-title {
          color: var(--accent);
          text-shadow: 0 0 12px rgba(100, 255, 218, 0.25);
        }

        .external-arrow {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }

        .project-card:hover .external-arrow {
          transform: translate(3px, -3px);
        }

        .project-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
          background: rgba(136, 146, 176, 0.1);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-badge.featured {
          background: var(--accent-dim);
          color: var(--accent);
        }

        .project-description {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .project-meta {
          margin-bottom: 0.75rem;
        }

        .github-link {
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          display: inline-flex;
          position: relative;
          z-index: 10;
        }

        .github-link:hover {
          color: var(--accent);
        }

        .project-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        @media (max-width: 1024px) {
          .projects-section {
            scroll-margin-top: 4rem;
            padding-top: 4rem;
          }

          .section-label-mobile {
            display: block;
            position: sticky;
            top: 0;
            z-index: 10;
            background: rgba(10, 25, 47, 0.85);
            backdrop-filter: blur(8px);
            padding: 1.25rem 1.5rem;
            margin: 0 -1.5rem 2rem;
            font-size: 0.8rem;
          }

          .project-tabs-container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
