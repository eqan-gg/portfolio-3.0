import { useState, useEffect, useCallback } from 'react';

const SpotlightCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  return (
    <div
      className="spotlight-overlay"
      style={{
        background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100, 255, 218, 0.06), rgba(0, 214, 143, 0.03) 40%, transparent 70%)`,
      }}
    >
      <style>{`
        .spotlight-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          transition: background 0.15s ease;
        }
      `}</style>
    </div>
  );
};

export default SpotlightCursor;
