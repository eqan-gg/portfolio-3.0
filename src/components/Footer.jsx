import { content } from '../data/content';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p className="footer-text">
        {content.footer.credit}
      </p>
      <p className="footer-sub">
        Built with{' '}
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-link">
          React
        </a>{' '}
        &{' '}
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="text-link">
          Vite
        </a>
        . Deployed on{' '}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-link">
          Vercel
        </a>
        .
      </p>

      <style>{`
        .site-footer {
          padding: 3rem 0 4rem;
          text-align: left;
        }

        .footer-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 0.35rem;
          font-weight: 500;
        }

        .footer-sub {
          font-size: 0.78rem;
          color: rgba(136, 146, 176, 0.6);
          line-height: 1.6;
        }

        .footer-sub .text-link {
          font-weight: 400;
        }

        @media (max-width: 1024px) {
          .site-footer {
            text-align: center;
            padding: 2rem 1.5rem 4rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
