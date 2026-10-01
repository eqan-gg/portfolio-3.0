import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const mainRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    const main = mainRef.current;
    const ring = ringRef.current;
    const cursor = { x: -100, y: -100, targetX: -100, targetY: -100 };
    let frame = 0;
    let visible = false;

    document.body.classList.add('custom-cursor-active');

    const animate = () => {
      cursor.x += (cursor.targetX - cursor.x) * 0.22;
      cursor.y += (cursor.targetY - cursor.y) * 0.22;
      const closeEnough = Math.abs(cursor.targetX - cursor.x) + Math.abs(cursor.targetY - cursor.y) < 0.2;
      if (closeEnough) {
        cursor.x = cursor.targetX;
        cursor.y = cursor.targetY;
      }

      const position = `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`;
      main.style.transform = `${position} scale(${main.dataset.hovering === 'true' ? 1.5 : 1})`;
      ring.style.transform = `${position} scale(${main.dataset.hovering === 'true' ? 1.8 : 1})`;
      if (!closeEnough) frame = requestAnimationFrame(animate);
      else frame = 0;
    };

    const scheduleFrame = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      cursor.targetX = event.clientX;
      cursor.targetY = event.clientY;
      if (!visible) {
        visible = true;
        main.style.opacity = '1';
        ring.style.opacity = '1';
      }
      scheduleFrame();
    };

    const handlePointerOver = (event) => {
      const interactive = event.target.closest('a, button, [role="button"], input, textarea, select, .interactive');
      main.dataset.hovering = String(Boolean(interactive));
      scheduleFrame();
    };

    const handlePointerLeave = () => {
      visible = false;
      main.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={mainRef} className="custom-cursor-main" aria-hidden="true">
        <span className="cursor-symbol">&lt;/&gt;</span>
      </div>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />

      <style>{`
        .custom-cursor-main,
        .custom-cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
        }

        .custom-cursor-main {
          z-index: 99999;
          transition: opacity 0.2s ease;
          mix-blend-mode: difference;
        }

        .cursor-symbol {
          color: #64ffda;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);
          user-select: none;
        }

        .custom-cursor-ring {
          z-index: 99998;
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(100, 255, 218, 0.35);
          border-radius: 50%;
          transition: opacity 0.2s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-main,
          .custom-cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
