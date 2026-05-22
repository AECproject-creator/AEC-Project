import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import BootScreen from "./components/BootScreen.jsx";
import Layout from "./components/Layout.jsx";
import SEO from "./components/SEO.jsx";
import RouteShell from "./components/RouteShell.jsx";
import BackgroundSystem from "./components/BackgroundSystem.jsx";
import TransitionLayer from "./components/TransitionLayer.jsx";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import Story from "./pages/Story.jsx";
import World from "./pages/World.jsx";
import Projects from "./pages/Projects.jsx";
import Kagura from "./pages/Kagura.jsx";
import Store from "./pages/Store.jsx";
import Admin from "./pages/Admin.jsx";
import Contact from "./pages/Contact.jsx";
import Special from "./pages/Special.jsx";
import Secret, { SystemNode, NodeAccess, NetworkAccess, DatabaseTerminal, AccessGate } from "./pages/Secret.jsx";
import { Staff, Cast, Episodes, OnAir, Goods, Event } from "./pages/AnimeInfo.jsx";
import NotFound from "./pages/NotFound.jsx";
import { translations } from "./data/translations.js";

const ThreeScene = lazy(() => import("./components/ThreeScene.jsx"));

const pageMeta = {
  "/": ["AEC Project / KAGURA", "接続は、祈りになる。AEC / KAGURA official terminal site."],
  "/news": ["NEWS | AEC Project", "AEC Projectの最新情報。"],
  "/story": ["STORY | AEC Project", "世界崩壊理由、AEC、KAGURA、主人公の目的。"],
  "/world": ["WORLD | AEC Project", "用語辞典、組織、AI、年表、マップ。"],
  "/projects": ["PROJECTS | AEC Project", "開発中のアプリ一覧。"],
  "/kagura": ["KAGURA | AEC Project", "KAGURA専用ページ。"],
  "/store": ["STORE | AEC Project", "Stripeリンク差し替え式Web Store。"],
  "/special": ["SPECIAL | AEC Project", "壁紙、ARG、隠しページなど。"],
  "/contact": ["CONTACT | AEC Project", "お問い合わせフォーム。"],
  "/hidden": ["SECRET NODE | AEC Project", "隠しノード。"],
  "/system": ["SYSTEM | AEC Project", "システム監視画面。"],
  "/node": ["NODE ACCESS | AEC Project", "ノードアクセス端末。"],
  "/network": ["NETWORK | AEC Project", "接続ネットワーク監視端末。"],
  "/access": ["ACCESS | AEC Project", "アクセス権限確認端末。"],
  "/database": ["DATABASE | AEC Project", "AEC Database Terminal."]
};

function Frame({ children }) {
  return <RouteShell>{children}</RouteShell>;
}

export default function App() {
  const location = useLocation();
  const [lang, setLang] = useState(() => localStorage.getItem("aec-language") || "ja");
  const [theme, setTheme] = useState(() => localStorage.getItem("aec-theme") || "blue");
  const [menuOpen, setMenuOpen] = useState(false);
  const [booted, setBooted] = useState(() => sessionStorage.getItem("aec-booted") === "1");
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768 || window.matchMedia?.("(pointer: coarse)").matches);
  const t = useMemo(() => translations[lang] || translations.ja, [lang]);
  const meta = pageMeta[location.pathname] || ["AEC Project / KAGURA", "AEC Project official site."];

  useEffect(() => {
    localStorage.setItem("aec-language", lang);
    document.documentElement.lang = lang === "de" ? "de" : lang === "en" ? "en" : "ja";
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("aec-theme", theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768 || window.matchMedia?.("(pointer: coarse)").matches);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const updateProgress = () => {
      ScrollTrigger.update();
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, Math.max(0, (window.scrollY / max) * 100)));
    };

    if (isMobile) {
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
      return () => window.removeEventListener("scroll", updateProgress);
    }

    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, touchMultiplier: 1.05 });
    let raf = 0;
    const tick = (time) => { lenis.raf(time); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    lenis.on("scroll", updateProgress);
    updateProgress();
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [isMobile]);

  useEffect(() => {
    setMenuOpen(false);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    const ctx = gsap.context(() => {
      gsap.from(".sub-hero h1,.hero-title", { y: 20, opacity: 0, filter: "blur(6px)", duration: 0.42, ease: "power3.out" });
      if (!isMobile) {
        gsap.utils.toArray(".reveal").forEach((item) => {
          gsap.fromTo(item, { y: 24, opacity: 0.001 }, { y: 0, opacity: 1, duration: 0.48, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 90%", once: true } });
        });
        gsap.to(".hero-grid", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".hero-rings", { yPercent: -12, rotate: 20, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      }
    });
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (!menuOpen) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".vertical-menu a", { y: 22, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.04, duration: 0.42, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, [menuOpen]);

  useEffect(() => {
    console.info("%cAEC NODE OPEN", "color:#54f5ff;font-size:20px;font-weight:bold");
    console.info("ACCESS HINT: /hidden  CODE: 2042");
  }, []);

  if (!booted) {
    return <BootScreen onStart={() => { sessionStorage.setItem("aec-booted", "1"); setBooted(true); }} />;
  }

  return (
    <ErrorBoundary>
      <SEO title={meta[0]} description={meta[1]} />
      {!isMobile && <Suspense fallback={null}><ThreeScene /></Suspense>}
      <BackgroundSystem theme={theme} isMobile={isMobile} />
      <div className="noise" aria-hidden="true" /><div className="scanline" aria-hidden="true" />
      <TransitionLayer />
      <Layout lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} progress={progress} theme={theme} setTheme={setTheme}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Frame><Home t={t} /></Frame>} />
            <Route path="/news" element={<Frame><News t={t} /></Frame>} />
            <Route path="/news/:id" element={<Frame><NewsDetail /></Frame>} />
            <Route path="/story" element={<Frame><Story /></Frame>} />
            <Route path="/world" element={<Frame><World /></Frame>} />
            <Route path="/projects" element={<Frame><Projects t={t} /></Frame>} />
            <Route path="/kagura" element={<Frame><Kagura t={t} /></Frame>} />
            <Route path="/store" element={<Frame><Store t={t} /></Frame>} />
            <Route path="/admin" element={<Frame><Admin t={t} /></Frame>} />
            <Route path="/contact" element={<Frame><Contact t={t} /></Frame>} />
            <Route path="/special" element={<Frame><Special t={t} /></Frame>} />
            <Route path="/staff" element={<Frame><Staff /></Frame>} />
            <Route path="/cast" element={<Frame><Cast /></Frame>} />
            <Route path="/episode" element={<Frame><Episodes /></Frame>} />
            <Route path="/onair" element={<Frame><OnAir /></Frame>} />
            <Route path="/goods" element={<Frame><Goods /></Frame>} />
            <Route path="/event" element={<Frame><Event /></Frame>} />
            <Route path="/hidden" element={<Frame><Secret /></Frame>} />
            <Route path="/system" element={<Frame><SystemNode /></Frame>} />
            <Route path="/node" element={<Frame><NodeAccess /></Frame>} />
            <Route path="/network" element={<Frame><NetworkAccess /></Frame>} />
            <Route path="/access" element={<Frame><AccessGate /></Frame>} />
            <Route path="/database" element={<Frame><DatabaseTerminal /></Frame>} />
            <Route path="*" element={<Frame><NotFound /></Frame>} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  );
}
