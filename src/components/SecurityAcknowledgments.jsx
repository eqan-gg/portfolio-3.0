import { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import PdfModal from './PdfModal';

const SecurityAcknowledgments = () => {
  const sectionRef = useRef(null);
  const [pdfModal, setPdfModal] = useState({ isOpen: false, url: '', title: '' });

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

  const openPdf = (url, title) => {
    setPdfModal({ isOpen: true, url, title });
  };

  return (
    <section id="security" ref={sectionRef} className="security-section" aria-label="Security Acknowledgments">
      <div className="section-heading reveal">
        <h2 className="section-label-mobile font-mono accent-text">Security</h2>
      </div>

      <p className="security-intro reveal">{content.security.intro}</p>

      <div className="security-list card-list">
        {content.security.items.map((item, index) => {
          const CardTag = item.link ? 'a' : 'div';
          const linkProps = item.link
            ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
            : {};

          return (
            <CardTag
              key={item.id}
              className={`security-card card-item reveal reveal-delay-${(index % 4) + 1}`}
              {...linkProps}
              aria-label={item.link ? `${item.org} — ${item.title} (opens in new tab)` : undefined}
            >
              <div className="security-card-inner">
                <div className="security-icon-wrap">
                  <span className="security-icon" role="img" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>

                <div className="security-content">
                  <div className="security-header">
                    <h3 className="security-org">
                      {item.org}
                      {item.link && (
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
                      )}
                    </h3>
                    {item.severity && (
                      <span className="severity-badge">{item.severity}</span>
                    )}
                  </div>
                  <p className="security-title-text">{item.title}</p>
                  <p className="security-desc">{item.description}</p>

                  {/* View Letter Button */}
                  {item.hasDocument && item.pdfLink && (
                    <button
                      className="view-letter-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openPdf(item.pdfLink, `${item.org} — Acknowledgment Letter`);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      View Letter
                    </button>
                  )}
                </div>
              </div>
            </CardTag>
          );
        })}
      </div>

      {/* PDF Modal */}
      <PdfModal
        isOpen={pdfModal.isOpen}
        onClose={() => setPdfModal({ isOpen: false, url: '', title: '' })}
        pdfUrl={pdfModal.url}
        title={pdfModal.title}
      />

      <style>{`
        .security-section {
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

        .security-intro {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
          font-style: italic;
        }

        .security-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .security-card {
          display: block;
          text-decoration: none;
          padding: 1.5rem;
          border-radius: 8px;
          transition: all var(--transition);
          color: inherit;
        }

        .security-card:hover {
          background: rgba(17, 34, 64, 0.7);
          box-shadow:
            inset 0 1px 0 0 rgba(148, 163, 184, 0.08),
            0 4px 24px rgba(0, 0, 0, 0.12);
        }

        .security-card-inner {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .security-icon-wrap {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(100, 255, 218, 0.06);
          border: 1px solid rgba(100, 255, 218, 0.1);
          font-size: 1.25rem;
          transition: all var(--transition);
        }

        .security-card:hover .security-icon-wrap {
          background: rgba(100, 255, 218, 0.12);
          border-color: rgba(100, 255, 218, 0.25);
          box-shadow: 0 0 16px rgba(100, 255, 218, 0.1);
        }

        .security-content {
          flex: 1;
        }

        .security-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
          flex-wrap: wrap;
        }

        .security-org {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: color var(--transition-fast);
        }

        .security-card:hover .security-org {
          color: var(--accent);
          text-shadow: 0 0 12px rgba(100, 255, 218, 0.25);
        }

        .external-arrow {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }

        .security-card:hover .external-arrow {
          transform: translate(3px, -3px);
        }

        .severity-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
          background: rgba(255, 193, 7, 0.12);
          color: #ffc107;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .security-title-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          margin-bottom: 0.5rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .security-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 0.5rem;
        }

        /* ── View Letter Button ── */
        .view-letter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.5rem;
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          border: 1px solid rgba(100, 255, 218, 0.25);
          background: rgba(100, 255, 218, 0.06);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all var(--transition);
          position: relative;
          z-index: 5;
        }

        .view-letter-btn:hover {
          background: rgba(100, 255, 218, 0.15);
          border-color: var(--accent);
          box-shadow: 0 0 16px rgba(100, 255, 218, 0.12);
          transform: translateY(-1px);
        }

        @media (max-width: 1024px) {
          .security-section {
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

        @media (max-width: 480px) {
          .security-card {
            padding: 1rem;
          }

          .security-card-inner {
            gap: 1rem;
          }

          .security-icon-wrap {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }

          .security-org {
            font-size: 0.95rem;
          }

          .security-desc {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SecurityAcknowledgments;
