import { useState, useEffect, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [smoothPosition, setSmoothPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    document.body.classList.add('custom-cursor-active');
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, handleMouseMove, handleMouseLeave]);

  // Smooth lerp animation
  useEffect(() => {
    if (isMobile) return;

    let animationFrame;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, position.x, 0.15),
        y: lerp(prev.y, position.y, 0.15),
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, isMobile]);

  // Detect hovering on interactive elements
  useEffect(() => {
    if (isMobile) return;

    const handleHover = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .interactive');
      setIsHovering(!!target);
    };

    document.addEventListener('mouseover', handleHover);
    return () => document.removeEventListener('mouseover', handleHover);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor — the </> symbol */}
      <div
        className="custom-cursor-main"
        style={{
          left: `${smoothPosition.x}px`,
          top: `${smoothPosition.y}px`,
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <span className="cursor-symbol">&lt;/&gt;</span>
      </div>

      {/* Cursor ring */}
      <div
        className="custom-cursor-ring"
        style={{
          left: `${smoothPosition.x}px`,
          top: `${smoothPosition.y}px`,
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
        }}
      />

      <style>{`
        .custom-cursor-main {
          position: fixed;
          z-index: 99999;
          pointer-events: none;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease;
          mix-blend-mode: difference;
        }

        .cursor-symbol {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: #64ffda;
          text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);
          user-select: none;
          letter-spacing: -0.5px;
        }

        .custom-cursor-ring {
          position: fixed;
          z-index: 99998;
          pointer-events: none;
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(100, 255, 218, 0.35);
          border-radius: 50%;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease,
                      border-color 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
