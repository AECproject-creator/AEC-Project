import { useState } from "react";
import { terms, timeline } from "../data/siteData.js";
import { SubHero, Footer } from "../components/Section.jsx";

export default function World(){
  const [term, setTerm] = useState(terms[0]);
  return (
    <>
      <SubHero kicker="world database" title="WORLD" lead="用語、組織、AI、時代背景、年表、マップをまとめた世界観データベース。" />
      <section className="content section">
        <div className="database-ui reveal"><p>ACCESS LOG / SUBJECT DATA</p><h2>TERMINAL DATABASE</h2><pre>AI MONITOR: ACTIVE\nACCESS LEVEL: 02\nLOCKED NODE: /hidden</pre></div>
        <div className="world-split">
          <div className="term-grid">
            {terms.map(([name, desc]) => <button className="term-card reveal" key={name} title={desc} onClick={() => setTerm([name, desc])}><b>{name}</b><span>{desc}</span></button>)}
          </div>
          <div className="tooltip-panel reveal"><p className="label">SELECTED TERM</p><h2>{term[0]}</h2><p>{term[1]}</p></div>
        </div>
        <div className="world-map reveal"><span>AEC NETWORK MAP</span><i className="node n1"/><i className="node n2"/><i className="node n3"/><i className="node n4"/><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M20 30 L60 42 L74 70 L45 76 Z" /></svg></div>
        <div className="timeline reveal">{timeline.map(([year,text])=><div className="timeline-item" key={year}><h3>{year}</h3><p>{text}</p></div>)}</div>
      </section>
      <Footer />
    </>
  );
}
