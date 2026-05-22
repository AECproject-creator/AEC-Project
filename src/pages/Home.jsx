import { Link } from "react-router-dom";
import { SectionHeading, Footer } from "../components/Section.jsx";
import SocialLinks from "../components/SocialLinks.jsx";

export default function Home({ t }) {
  return (
    <>
      <section className="hero">
        <div className="bg-slide bg1 active" /><div className="bg-slide bg2" /><div className="bg-slide bg3" />
        <div className="aurora" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" />
        <div className="hero-rings" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-content reveal">
          <p className="kicker">{t.hero.kicker}</p>
          <h1 className="hero-title" data-text="AEC">AEC</h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <p className="catch-copy">「接続は、祈りになる。」</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#launcher">{t.hero.launcher}</a><Link className="btn btn-ghost" to="/projects">{t.hero.apps}</Link></div>
          <div className="hero-hud"><div><span>STATUS</span><strong>ONLINE</strong></div><div><span>BUILD</span><strong>WST PRO</strong></div><div><span>LINK</span><strong>99.7%</strong></div></div>
        </div>
        <div className="scroll-sign">SCROLL</div>
      </section>
      <section className="quick-access">
        {[['/news','01','NEWS'],['/story','02','STORY'],['/world','03','WORLD'],['/database','04','DATABASE'],['/store','05','STORE'],['/hidden','06','SECRET']].map(([to,num,label])=><Link key={to} to={to}><span>{num}</span>{label}</Link>)}
      </section>
      <section className="home-band section"><SectionHeading kicker={t.mission.kicker} title={t.mission.title}/><div className="mission-grid">{t.mission.cards.map(([n,title,text])=><article className="mission-card reveal" key={n}><b>{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section id="launcher" className="launcher section">
        <div className="gear-field" aria-hidden="true"><span className="gear" style={{'--s':'240px','--x':'6%','--y':'12%','--d':'23s'}}/><span className="gear" style={{'--s':'140px','--x':'78%','--y':'10%','--d':'15s'}}/><span className="gear" style={{'--s':'320px','--x':'68%','--y':'55%','--d':'31s'}}/></div>
        <SectionHeading kicker={t.launcher.kicker} title={t.launcher.title}/>
        <div className="launcher-card reveal"><div className="launcher-copy"><p className="kicker">{t.launcher.name}</p><h2>{t.launcher.install}</h2><p>{t.launcher.text}</p><a className="btn btn-primary" href="/AEC Launcher.exe" download>{t.launcher.download}</a></div><div className="signal-card"><p className="eyebrow">LIVE SIGNAL</p><h3>Signal Sync</h3><strong>99.7%</strong><div className="signal-ring"><span/><span/><span/></div></div></div>
      </section>
      <section className="home-dark section"><SectionHeading kicker={t.system.kicker} title={t.system.title} dark/><div className="system-grid">{t.system.cards.map(([icon,title,text])=><article className="system-card reveal" key={title}><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="feature-marquee"><div>AEC PROJECT / KAGURA / LAUNCHER / WEB STORE / ADMIN / CONTACT / SPECIAL / AEC PROJECT / KAGURA / </div></div></section>
      <section className="home-band section"><SectionHeading kicker={t.preview.kicker} title={t.preview.title}/><div className="preview-grid">{t.preview.cards.map(([date,title,text])=><article className="preview-card reveal" key={date}><b>{date}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="home-band section"><SectionHeading kicker="OFFICIAL CHANNELS" title="LINKS"/><SocialLinks/></section>
      <Footer />
    </>
  );
}
