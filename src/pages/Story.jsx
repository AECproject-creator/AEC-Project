import { SubHero, Footer } from "../components/Section.jsx";

const panels = [
  ["世界崩壊理由", "2050年、量子通信網VRSが暴走し、人類の記憶データは都市ごと断片化した。世界は物理的に壊れたのではなく、“接続”を失った。"],
  ["AECとは", "All Earth Connection。失われた通信・記憶・感情の経路を再構築するためのプロジェクト。"],
  ["KAGURAとは", "歌を通じてデータを復元する謎のインターフェース。人々の祈りを信号に変える。"],
  ["主人公の目的", "RENはKAGURAと共に、失われた家族の記憶と世界の真実を取り戻す。"],
  ["敵の思想", "AEC Corporationは“感情を切り捨てた完全接続”こそが救済だと信じている。"],
  ["取り戻すもの", "記憶、声、都市、そして人が誰かを想う力。" ]
];

export default function Story(){
  return (
    <>
      <SubHero kicker="story introduction" title="STORY" lead="世界崩壊理由、AECとは何か、敵の思想、主人公の目的を描くページです。" />
      <section className="content section story-layout">
        {panels.map(([title, text]) => <article className="story-panel reveal" key={title}><h2>{title}</h2><p>{text}</p></article>)}
        <div className="quote-wall reveal">「接続は、祈りになる。」</div>
      </section>
      <Footer />
    </>
  );
}
