import { useEffect, useCallback } from 'react';

const PdfModal = ({ isOpen, onClose, pdfUrl, title }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pdf-modal-header">
          <div className="pdf-modal-title-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" className="pdf-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h3 className="pdf-modal-title">{title}</h3>
          </div>
          <div className="pdf-modal-actions">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-action-btn"
              title="Open in new tab"
              aria-label="Open acknowledgment in a new tab"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href={pdfUrl}
              download
              className="pdf-action-btn"
              title="Download PDF"
              aria-label="Download acknowledgment PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M10 2a.75.75 0 01.75.75v7.69l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 0110 2z" />
                <path d="M3.5 13.5a.75.75 0 01.75.75v2A.75.75 0 005 17h10a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0115 18.5H5a2.25 2.25 0 01-2.25-2.25v-2a.75.75 0 01.75-.75z" />
              </svg>
            </a>
            <button onClick={onClose} className="pdf-close-btn" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Embed */}
        <div className="pdf-modal-body">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title={title}
            className="pdf-iframe"
          />
        </div>
      </div>

      <style>{`
        .pdf-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 100000;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: pdf-fade-in 0.2s ease;
        }

        @keyframes pdf-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .pdf-modal-container {
          width: 100%;
          max-width: 800px;
          height: 85vh;
          max-height: 85vh;
          background: var(--bg-secondary, #112240);
          border: 1px solid rgba(100, 255, 218, 0.15);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(100, 255, 218, 0.05);
          animation: pdf-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes pdf-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .pdf-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(136, 146, 176, 0.1);
          background: rgba(10, 25, 47, 0.5);
          flex-shrink: 0;
        }

        .pdf-modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .pdf-icon {
          color: var(--accent, #64ffda);
          flex-shrink: 0;
        }

        .pdf-modal-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-bright, #e6f1ff);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pdf-modal-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pdf-action-btn,
        .pdf-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text-secondary, #8892b0);
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .pdf-action-btn:hover,
        .pdf-close-btn:hover {
          background: rgba(100, 255, 218, 0.08);
          color: var(--accent, #64ffda);
        }

        .pdf-modal-body {
          flex: 1;
          overflow: hidden;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: #fff;
        }

        @media (max-width: 768px) {
          .pdf-modal-overlay {
            padding: 0.5rem;
          }

          .pdf-modal-container {
            height: 92vh;
            max-height: 92vh;
            border-radius: 12px;
          }

          .pdf-modal-title {
            font-size: 0.8rem;
            max-width: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default PdfModal;
