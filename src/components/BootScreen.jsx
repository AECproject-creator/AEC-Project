import { useEffect, useState } from "react";

const steps = [
  "BOOT...",
  "CHECK SYSTEM...",
  "AEC CONNECTING...",
  "NODE LINK...",
  "SIGNAL DETECT...",
  "ACCESS PERMISSION...",
  "TERMINAL READY",
  "TAP TO START"
];

export default function BootScreen({ onStart }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 7));
      setIndex((value) => Math.min(steps.length - 1, value + 1));
    }, 430);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-noise" />
      <div className="boot-pulse" />
      <div className="boot-panel">
        <p className="kicker">AEC / KAGURA TERMINAL</p>
        <h1>AEC</h1>
        <div className="boot-logo-ring" aria-hidden="true"><span /><span /><span /></div>
        <div className="boot-log">
          {steps.slice(0, index + 1).map((step) => <p key={step}>{step}</p>)}
        </div>
        <div className="boot-meta">
          <span>NODE COUNT: {Math.min(2042, 900 + progress * 11)}</span>
          <span>SIGNAL: {Math.min(99, Math.round(progress))}%</span>
        </div>
        <div className="boot-bar"><i style={{ width: `${progress}%` }} /></div>
        <button className="tap-start" type="button" onClick={onStart}>TAP TO START</button>
      </div>
    </div>
  );
}
