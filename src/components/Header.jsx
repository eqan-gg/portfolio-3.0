import { useState, useEffect } from 'react';
import { content } from '../data/content';

const typingTexts = [
  'MERN Stack Developer',
  'Security Researcher',
  'UI/UX Enthusiast',
  'Bug Hunter',
];

const TypingText = ({ texts, className }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 80);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className={className}>
      {texts[textIndex].substring(0, charIndex)}
      <span className="typing-cursor">|</span>
    </span>
  );
};

const Header = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header-sidebar">
      <div className="header-top">
        <h1 className="header-name">
          <a href="/">
            <span className="name-gradient">{content.hero.name}</span>
          </a>
        </h1>
        <h2 className="header-title">
          <TypingText texts={typingTexts} className="typing-text" />
        </h2>
        <p className="header-tagline">{content.hero.tagline}</p>

        {/* Status indicator */}
        <div className="status-badge">
          <span className="status-dot" />
          <span className="status-text">Available for work</span>
        </div>

        <nav className="header-nav" aria-label="In-page navigation">
          <ul>
            {content.nav.map((link) => (
              <li key={link.name}>
                <a
                  className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  href={link.href}
                >
                  <span className="nav-indicator" />
                  <span className="nav-text">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="header-socials">
        <a href={content.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="22" height="22">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        <a href={content.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        </a>
        <a href={content.social.hackerone} target="_blank" rel="noopener noreferrer" aria-label="HackerOne" className="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M7.207 0c-.4836 0-.8774.1843-1.1823.5528-.3049.3685-.4573.8185-.4573 1.3498v20.1946c0 .5313.1524.9813.4573 1.3498.3049.3685.6987.553 1.1823.553.4836 0 .8774-.1845 1.1823-.553.3049-.3685.4573-.8185.4573-1.3498v-8.5539h6.3053v8.5539c0 .5313.1524.9813.4573 1.3498.3049.3685.6987.553 1.1823.553.4836 0 .8774-.1845 1.1823-.553.3049-.3685.4573-.8185.4573-1.3498V1.9026c0-.5313-.1524-.9813-.4573-1.3498C17.0613.1843 16.6675 0 16.1839 0c-.4836 0-.8774.1843-1.1823.5528-.3049.3685-.4573.8185-.4573 1.3498v8.1504H8.8467V1.9026c0-.5313-.1524-.9813-.4573-1.3498C8.0844.1843 7.6907 0 7.207 0z" />
          </svg>
        </a>
        <a href={`mailto:${content.social.email}`} aria-label="Email" className="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
          </svg>
        </a>
      </div>

      <style>{`
        .header-sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4rem 0;
          height: 100%;
          overflow-y: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        
        .header-sidebar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        /* ── Animated Gradient Name ── */
        .header-name a {
          text-decoration: none;
        }

        .name-gradient {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          background: linear-gradient(
            135deg,
            var(--text-bright) 0%,
            var(--accent) 40%,
            #00d68f 60%,
            var(--text-bright) 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .name-gradient:hover {
          animation-duration: 2s;
        }

        /* ── Typing Title ── */
        .header-title {
          margin-top: 0.75rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          min-height: 1.8em;
        }

        .typing-text {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .typing-cursor {
          color: var(--accent);
          font-weight: 300;
          animation: cursor-blink 0.8s steps(1) infinite;
        }

        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .header-tagline {
          margin-top: 1rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 300px;
          line-height: 1.6;
        }

        /* ── Status Badge ── */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding: 0.35rem 1rem;
          border-radius: 9999px;
          background: rgba(100, 255, 218, 0.06);
          border: 1px solid rgba(100, 255, 218, 0.15);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d68f;
          animation: pulse-dot 2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(0, 214, 143, 0.5);
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--accent);
          letter-spacing: 0.03em;
        }

        /* ── Nav Links with Indicator ── */
        .header-nav {
          margin-top: 4rem;
        }

        .header-nav ul {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          gap: 1rem;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .nav-indicator {
          display: block;
          width: 28px;
          height: 1px;
          background: var(--text-secondary);
          transition: all var(--transition);
        }

        .nav-text {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .nav-link:hover .nav-indicator,
        .nav-link.active .nav-indicator {
          width: 64px;
          background: var(--text-bright);
        }

        .nav-link:hover .nav-text,
        .nav-link.active .nav-text {
          color: var(--text-bright);
        }

        /* ── Social Icons ── */
        .header-socials {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .social-icon {
          color: var(--text-secondary);
          transition: color var(--transition-fast), transform var(--transition-fast), text-shadow var(--transition-fast);
        }

        .social-icon:hover {
          color: var(--text-bright);
          transform: translateY(-3px);
          filter: drop-shadow(0 0 6px rgba(100, 255, 218, 0.3));
        }

        /* ── Mobile ── */
        @media (max-width: 1024px) {
          .header-sidebar {
            padding: 3rem 0 2rem;
            height: auto;
          }

          .name-gradient {
            font-size: 2.5rem;
          }

          .header-nav {
            display: none;
          }

          .header-socials {
            margin-top: 2rem;
          }
        }

        @media (max-width: 480px) {
          .name-gradient {
            font-size: 2rem;
          }
          
          .header-title {
            font-size: 1rem;
          }

          .typing-text {
            font-size: 0.9rem;
          }

          .header-tagline {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
