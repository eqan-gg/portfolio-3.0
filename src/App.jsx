import CustomCursor from './components/CustomCursor';
import SpotlightCursor from './components/SpotlightCursor';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import SecurityAcknowledgments from './components/SecurityAcknowledgments';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="portfolio-root">
      {/* Effects */}
      <CustomCursor />
      <SpotlightCursor />

      {/* Skip to content link */}
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      {/* Two-column layout */}
      <div className="layout-container">
        <div className="layout-inner">
          {/* Left — Sticky Header */}
          <div className="col-left">
            <Header />
          </div>

          {/* Right — Scrolling Content */}
          <main id="content" className="col-right">
            <About />
            <Projects />
            <TechStack />
            <SecurityAcknowledgments />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>

      <style>{`
        .portfolio-root {
          position: relative;
        }

        .skip-link {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          transform: translateX(-100%);
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          color: var(--bg-primary);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 0 0 4px 0;
          z-index: 99999;
        }

        .skip-link:focus-visible {
          transform: translateX(0);
        }

        .layout-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 2;
        }

        .layout-inner {
          display: flex;
          gap: 1rem;
        }

        /* Left column — sticky on desktop */
        .col-left {
          position: sticky;
          top: 0;
          width: 48%;
          height: 100vh;
          max-height: 100vh;
          flex-shrink: 0;
          padding-right: 2rem;
        }

        /* Right column — scrolling content */
        .col-right {
          width: 52%;
          padding: 6rem 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .layout-inner {
            flex-direction: column;
            gap: 0;
          }

          .col-left {
            position: relative;
            width: 100%;
            height: auto;
            max-height: none;
            padding-right: 0;
          }

          .col-right {
            width: 100%;
            padding-top: 2rem;
          }
        }

        @media (min-width: 1025px) {
          .layout-container {
            padding: 0 3rem;
          }
        }

        @media (min-width: 1400px) {
          .layout-container {
            padding: 0 6rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
