import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import news from "../data/news.json";
import { SubHero, Footer } from "../components/Section.jsx";

const filters = ["ALL", "UPDATE", "PV", "EVENT", "SYSTEM"];

export default function News({ t }) {
  const [filter, setFilter] = useState("ALL");
  const filtered = useMemo(() => filter === "ALL" ? news : news.filter((item) => item.category === filter), [filter]);

  return (
    <>
      <SubHero kicker="latest information" title="NEWS" lead={t.pages.newsLead} />
      <section className="content section">
        <div className="news-ticker reveal"><span>BREAKING</span><p>{news[0]?.title}</p></div>
        <div className="filter-row reveal">
          {filters.map((item) => <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="card-grid">
          {filtered.map((n) => (
            <article className="info-card reveal" key={n.id}>
              <time>{n.date}</time>
              <span className="label">{n.category}</span>
              <h2>{n.title}</h2>
              <p>{n.text}</p>
              <Link className="text-link" to={`/news/${n.id}`}>READ DETAIL</Link>
            </article>
          ))}
        </div>
        <div className="timeline reveal">
          <div className="timeline-item"><h3>Phase 01</h3><p>公式サイトUI・メニュー・画面遷移を制作。</p></div>
          <div className="timeline-item"><h3>Phase 02</h3><p>KAGURA、Launcher、Store、キャラクターの詳細化。</p></div>
          <div className="timeline-item"><h3>Phase 03</h3><p>本物のCMS、ニュース投稿、管理者機能と接続。</p></div>
        </div>
      </section>
      <Footer />
    </>
  );
}
