import { projects } from "../data/siteData.js";
import { SubHero, Footer } from "../components/Section.jsx";
export default function Projects({ t }) { return <><SubHero kicker="application database" title="PROJECTS" lead={t.pages.projectsLead}/><section className="content section"><div className="project-list">{projects.map(([name,text,status])=><div className="project-row reveal" key={name}><strong>{name}</strong><p>{text}</p><span className="status-pill">{status}</span></div>)}</div></section><Footer/></> }
