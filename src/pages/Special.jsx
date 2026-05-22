import { Link } from "react-router-dom";
import { SubHero, Footer } from "../components/Section.jsx";
export default function Special({ t }) {
  return (
    <>
      <SubHero kicker="special archive" title="SPECIAL" lead={t.pages.specialLead}/>
      <section className="content section">
        <div className="card-grid">
          <article className="info-card reveal"><span className="label">wallpaper</span><h2>Wallpaper Download</h2><p>公式壁紙やスマホ背景を配置できます。</p><a className="text-link" href="/special/wallpaper-aec.txt" download>DOWNLOAD</a></article>
          <article className="info-card reveal"><span className="label">icon pack</span><h2>Icon Pack</h2><p>SNSアイコン、アプリアイコン、端末風素材を配置できます。</p><a className="text-link" href="/special/icon-pack.txt" download>DOWNLOAD</a></article>
          <article className="info-card reveal"><span className="label">music</span><h2>Music Preview</h2><p>Ambient / Cyber / 和風の試聴導線を追加できます。</p><button className="text-link" type="button">PLAY PREVIEW</button></article>
          <article className="info-card reveal"><span className="label">trailer</span><h2>Trailer Archive</h2><p>ティザーPV、Project PV、Opening PVを整理できます。</p><Link className="text-link" to="/kagura">OPEN PV</Link></article>
          <article className="info-card reveal"><span className="label">ARG</span><h2>Secret Video</h2><p>パスワード解除後に見える限定映像の枠。</p><Link className="text-link" to="/hidden">ACCESS</Link></article>
          <article className="info-card reveal"><span className="label">hidden file</span><h2>Hidden File</h2><p>暗号、QR、ログなどのARG素材を配置できます。</p><a className="text-link" href="/special/hidden-file.txt" download>DOWNLOAD</a></article>
        </div>
      </section>
      <Footer />
    </>
  );
}
