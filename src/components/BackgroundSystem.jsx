import { useEffect, useRef, useState } from "react";

export default function BackgroundSystem({ theme, isMobile = false }) {
  const [ripples, setRipples] = useState([]);
  const [fps, setFps] = useState(60);
  const idRef = useRef(0);
  const lightRef = useRef(null);
  const coordRef = useRef(null);

  useEffect(() => {
    const onPointerMove = (event) => {
      if (isMobile) return;
      if (lightRef.current) lightRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      if (coordRef.current) coordRef.current.textContent = `COORD: ${Math.round(event.clientX)} / ${Math.round(event.clientY)}`;
    };
    const onPointerDown = (event) => {
      const id = idRef.current++;
      setRipples((items) => [...items.slice(-8), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== id)), 900);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setFps(30);
      return undefined;
    }
    let last = performance.now();
    let frames = 0;
    let raf = 0;
    const tick = (now) => {
      frames += 1;
      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  return (
    <div className={`background-system theme-${theme}`} aria-hidden="true">
      <div className="rain-particles">
        {Array.from({ length: isMobile ? 22 : 72 }).map((_, index) => (
          <span key={index} style={{ "--x": `${(index * 13) % 100}%`, "--delay": `${-(index % 12) * 0.32}s`, "--speed": `${0.9 + (index % 7) * 0.18}s` }} />
        ))}
      </div>
      <div className="matrix-rain">
        {Array.from({ length: isMobile ? 10 : 28 }).map((_, index) => (
          <i key={index} style={{ "--x": `${index * (isMobile ? 10 : 3.7)}%`, "--delay": `${-(index % 9) * 0.7}s`, "--speed": `${6 + (index % 7)}s` }}>0101 AEC NODE SIGNAL</i>
        ))}
      </div>
      <div className="signal-lines"><span /><span /><span /><span /></div>
      <div className="dynamic-light" ref={lightRef} />
      <div className="hud-overlay">
        <span>NODE: AEC-2042</span>
        <span ref={coordRef}>COORD: 50 / 50</span>
        <span>FPS: {fps}</span>
        <span>SIGNAL: STABLE</span>
      </div>
      {ripples.map((ripple) => (
        <span key={ripple.id} className="tap-ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </div>
  );
}
