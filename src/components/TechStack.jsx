import { useEffect, useRef } from 'react';
import { content } from '../data/content';

const TechStack = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const techs = content.techStack;
  // Split into two rows for dual marquee
  const mid = Math.ceil(techs.length / 2);
  const row1 = techs.slice(0, mid);
  const row2 = techs.slice(mid);

  return (
    <section id="techstack" ref={sectionRef} className="techstack-section" aria-label="Tech Stack">
      <div className="section-heading reveal">
        <h2 className="section-label-mobile font-mono accent-text">Tech Stack</h2>
      </div>

      <div className="techstack-intro reveal">
        <p className="techstack-subtitle">Technologies & tools I work with</p>
      </div>

      {/* Animated Marquee Row 1 — left to right */}
      <div className="marquee-container reveal reveal-delay-1">
        <div className="marquee-track marquee-left">
          {[...row1, ...row1].map((tech, i) => (
            <div key={`r1-${i}`} className="tech-card" style={{ '--tech-color': tech.color }}>
              <i className={`${tech.icon} tech-icon`} />
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Marquee Row 2 — right to left */}
      <div className="marquee-container reveal reveal-delay-2">
        <div className="marquee-track marquee-right">
          {[...row2, ...row2].map((tech, i) => (
            <div key={`r2-${i}`} className="tech-card" style={{ '--tech-color': tech.color }}>
              <i className={`${tech.icon} tech-icon`} />
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Static Grid below for accessibility/no-motion users */}
      <div className="techstack-grid reveal reveal-delay-3">
        {techs.map((tech, i) => (
          <div key={`grid-${i}`} className="tech-grid-item" style={{ '--tech-color': tech.color }}>
            <i className={`${tech.icon} tech-grid-icon`} />
            <span className="tech-grid-name">{tech.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .techstack-section {
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

        .techstack-subtitle {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        /* ── Marquee ── */
        .marquee-container {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          margin-bottom: 0.75rem;
        }

        .marquee-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          will-change: transform;
        }

        .marquee-left {
          animation: marquee-scroll-left 35s linear infinite;
        }

        .marquee-right {
          animation: marquee-scroll-right 40s linear infinite;
        }

        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        .tech-card {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.1rem;
          border-radius: 10px;
          background: rgba(17, 34, 64, 0.6);
          border: 1px solid var(--border);
          white-space: nowrap;
          flex-shrink: 0;
          transition: all var(--transition);
          user-select: none;
        }

        .tech-card:hover {
          border-color: var(--tech-color, var(--accent));
          background: rgba(17, 34, 64, 0.9);
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.08), inset 0 1px 0 rgba(148, 163, 184, 0.06);
          transform: translateY(-2px);
        }

        .tech-icon {
          font-size: 1.3rem;
          color: var(--tech-color, var(--accent));
          transition: all var(--transition-fast);
        }

        .tech-card:hover .tech-icon {
          filter: drop-shadow(0 0 6px var(--tech-color));
          transform: scale(1.15);
        }

        .tech-name {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }

        /* ── Static Grid (hidden by default, shown for reduced-motion) ── */
        .techstack-grid {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-container {
            display: none;
          }

          .techstack-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
          }

          .tech-grid-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            background: rgba(17, 34, 64, 0.6);
            border: 1px solid var(--border);
          }

          .tech-grid-icon {
            font-size: 1.2rem;
            color: var(--tech-color, var(--accent));
          }

          .tech-grid-name {
            font-size: 0.8rem;
            color: var(--text-primary);
          }
        }

        @media (max-width: 1024px) {
          .techstack-section {
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
        }
      `}</style>
    </section>
  );
};

export default TechStack;
