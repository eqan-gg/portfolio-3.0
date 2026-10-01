import { useEffect, useRef } from 'react';

const SpotlightCursor = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine) and (min-width: 1025px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    const spotlight = spotlightRef.current;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;

      frame = requestAnimationFrame(() => {
        spotlight.style.setProperty('--spotlight-x', `${pointerX}px`);
        spotlight.style.setProperty('--spotlight-y', `${pointerY}px`);
        frame = 0;
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} className="spotlight-overlay" aria-hidden="true" />
      <style>{`
        .spotlight-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(650px circle at var(--spotlight-x, 50vw) var(--spotlight-y, 50vh), rgba(100, 255, 218, 0.06), rgba(0, 214, 143, 0.03) 40%, transparent 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .spotlight-overlay { display: none; }
        }
      `}</style>
    </>
  );
};

export default SpotlightCursor;
