import { useEffect, useRef } from 'react';
import { content } from '../data/content';

const About = () => {
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

  // Highlight specific terms in a paragraph
  const highlightText = (text) => {
    let result = text;
    content.about.highlightedTerms.forEach(({ text: term, url }) => {
      if (result.includes(term)) {
        if (url) {
          result = result.replace(
            term,
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-link">${term}</a>`
          );
        } else {
          result = result.replace(term, `<span class="highlighted-term">${term}</span>`);
        }
      }
    });
    return result;
  };

  return (
    <section id="about" ref={sectionRef} className="about-section" aria-label="About me">
      <div className="section-heading reveal">
        <h2 className="section-label font-mono accent-text">About</h2>
      </div>

      <div className="about-body">
        {content.about.paragraphs.map((para, index) => (
          <p
            key={index}
            className={`about-paragraph reveal reveal-delay-${index + 1}`}
            dangerouslySetInnerHTML={{ __html: highlightText(para) }}
          />
        ))}
      </div>

      <style>{`
        .about-section {
          margin-bottom: 6rem;
          scroll-margin-top: 6rem;
        }

        .section-heading {
          margin-bottom: 2.5rem;
        }

        .section-label {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: none;
        }

        .about-paragraph {
          margin-bottom: 1.25rem;
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .about-paragraph:hover {
          color: var(--text-primary);
          transition: color var(--transition);
        }

        .highlighted-term {
          color: var(--text-bright);
          font-weight: 500;
          transition: color var(--transition-fast), text-shadow var(--transition-fast);
        }

        .highlighted-term:hover {
          color: var(--accent);
          text-shadow: 0 0 12px rgba(100, 255, 218, 0.3);
        }

        @media (max-width: 1024px) {
          .about-section {
            scroll-margin-top: 4rem;
            padding-top: 4rem;
          }

          .section-label {
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

export default About;
