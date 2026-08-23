import { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import { toast } from 'react-toastify';

const Contact = () => {
  const sectionRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(content.contact.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        toast.success('> Message sent successfully_');
      } else {
        toast.error('> Failed to send message_');
      }
    } catch (error) {
      toast.error('> System error. Try again later_');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section" aria-label="Contact">
      <div className="section-heading reveal">
        <h2 className="section-label-mobile font-mono accent-text">Contact</h2>
      </div>

      <div className="contact-body reveal">
        <h3 className="contact-heading">{content.contact.heading}</h3>
        <p className="contact-description">{content.contact.description}</p>
      </div>

      <form className="contact-form reveal reveal-delay-1" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              type="text"
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              type="email"
              id="contact-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to say?"
            rows="5"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Sending...' : 'Send Message'}
          {!loading && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" style={{ marginLeft: '0.5rem' }}>
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          )}
        </button>
      </form>

      <div className="contact-alt reveal reveal-delay-2">
        <p>
          Or reach me directly at{' '}
          <a href={`mailto:${content.contact.email}`} className="text-link">
            {content.contact.email}
          </a>
        </p>
      </div>

      <style>{`
        .contact-section {
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

        .contact-heading {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-bright);
          margin-bottom: 0.75rem;
        }

        .contact-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 2rem;
        }

        /* ── Form ── */
        .contact-form {
          background: rgba(17, 34, 64, 0.5);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          transition: border-color var(--transition);
        }

        .contact-form:focus-within {
          border-color: rgba(100, 255, 218, 0.2);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(10, 25, 47, 0.8);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(136, 146, 176, 0.5);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem;
          background: transparent;
          border: 1px solid var(--accent);
          border-radius: 6px;
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all var(--transition);
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--accent-dim);
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.15);
        }

        .submit-btn:disabled {
          opacity: 0.6;
        }

        .contact-alt {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .contact-section {
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

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .contact-form {
            padding: 1.25rem;
          }
          
          .contact-heading {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
