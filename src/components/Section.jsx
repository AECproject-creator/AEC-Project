import { Link } from "react-router-dom";

export function SectionHeading({ kicker, title, dark = false }) {
  return <div className={`section-heading reveal ${dark ? "section-heading--dark" : ""}`}><p>{kicker}</p><h2>{title}</h2></div>;
}

export function Footer() {
  return (
    <footer className="final-footer">
      <div className="footer-inner">
        <p className="kicker">AEC Corporation / SYSTEM ACTIVE</p>
        <h2>AEC Project</h2>
        <p>© AEC PROJECT / AEC Corporation / WST PRODUCTION</p>
        <div className="legal-links">
          <Link to="/contact">CONTACT</Link><Link to="/store">STORE</Link><Link to="/admin">ADMIN</Link><Link to="/hidden">SECRET</Link>
        </div>
      </div>
    </footer>
  );
}

export function SubHero({ kicker, title, lead }) {
  return <section className="sub-hero section"><div className="reveal"><p className="kicker">{kicker}</p><h1>{title}</h1><p>{lead}</p></div></section>;
}
