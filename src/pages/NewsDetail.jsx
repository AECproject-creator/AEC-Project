import { Link, useParams } from "react-router-dom";
import news from "../data/news.json";
import { SubHero, Footer } from "../components/Section.jsx";

export default function NewsDetail() {
  const { id } = useParams();
  const item = news.find((entry) => entry.id === id) || news[0];
  return (
    <>
      <SubHero kicker={`${item.category} / ${item.date}`} title={item.id} lead={item.title} />
      <section className="content section">
        <article className="detail-panel reveal">
          <span className="label">{item.category}</span>
          <h2>{item.title}</h2>
          <p>{item.body || item.text}</p>
          <Link className="btn btn-primary" to="/news">BACK TO NEWS</Link>
        </article>
      </section>
      <Footer />
    </>
  );
}
