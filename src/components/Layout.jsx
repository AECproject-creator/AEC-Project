import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";
import SocialLinks from "./SocialLinks.jsx";
import { navItems } from "../data/siteData.js";

const themes = [
  ["blue", "BLUE SYSTEM"],
  ["red", "RED ALERT"],
  ["kagura", "KAGURA MODE"]
];

export default function Layout({ children, lang, setLang, menuOpen, setMenuOpen, progress, theme, setTheme }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const current = location.pathname === "/" ? "HOME" : location.pathname.split("/")[1]?.toUpperCase() || "HOME";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const timer = setInterval(() => setClock(new Date()), 1000);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock", menuOpen);
    return () => document.body.classList.remove("lock");
  }, [menuOpen]);


  return (
    <>
      <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>
      <header className={`topbar ${scrolled ? "is-scrolled" : "is-top"}`}>
        <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">A</span>
          <span className="brand-text">AEC Project</span>
        </NavLink>
        <div className="header-status">
          <span>NODE STATUS : ONLINE</span>
          <b>{clock.toLocaleTimeString("ja-JP", { hour12: false })}</b>
        </div>
        <div className="location-chip">{current} / SYSTEM LINK {Math.round(progress)}%</div>
        <div className="theme-switch" aria-label="Theme switcher">
          {themes.map(([key, label]) => (
            <button key={key} type="button" className={theme === key ? "active" : ""} onClick={() => setTheme(key)}>{label}</button>
          ))}
        </div>
        <div className="language-switch" role="group" aria-label="Language">
          {[["ja", "日本語"], ["de", "DE"], ["en", "EN"]].map(([key, label]) => (
            <button key={key} type="button" className={lang === key ? "active" : ""} onClick={() => setLang(key)}>{label}</button>
          ))}
        </div>
      </header>

      <button className="menu-button" type="button" aria-label="MENU" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
        <i /><i /><i /><span>MENU</span>
      </button>

      <div className={`menu-screen ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="menu-screen__bg" type="button" aria-label="close menu" onClick={() => setMenuOpen(false)} />
        <div className="menu-panel">
          <div className="menu-header-line">
            <div className="menu-logo"><span className="brand-mark">A</span><span>AEC Project<small>ALL EARTH CONNECTION</small></span></div>
            <button className="close-text" type="button" onClick={() => setMenuOpen(false)}>CLOSE</button>
          </div>
          <div className="menu-rule" />
          <div className="vertical-menu-wrap">
            <nav className="vertical-menu" aria-label="Main menu">
              {navItems.map(([key, to, num]) => {
                const labelMap = {
                  home: "HOME",
                  news: "NEWS",
                  story: "STORY",
                  world: "WORLD",
                  database: "DATABASE",
                  projects: "PROJECTS",
                  kagura: "KAGURA",
                  store: "STORE",
                  special: "SPECIAL",
                  system: "SYSTEM",
                  contact: "CONTACT"
                };
                return <NavLink key={to} to={to} data-num={num} onClick={() => setMenuOpen(false)}>{labelMap[key] || key.toUpperCase()}</NavLink>;
              })}
            </nav>
          </div>
          <div className="official-row"><p>OFFICIAL</p><SocialLinks /></div>
          <div className="menu-lower">
            <div className="menu-info-card"><b>PROJECT</b><h3>AEC Terminal</h3><p>IP公式サイトとしての運営感、世界観、ストア、ニュース、隠しページを統合したアクセス端末。</p></div>
            <div className="menu-info-card"><b>SYSTEM</b><h3>Signal Transfer</h3><p>ページ遷移時にblackout / glitch / scanlineを挟み、接続先を切り替えます。</p></div>
          </div>
        </div>
      </div>

      {children}
      <button className="back-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FaArrowUp /></button>
    </>
  );
}
