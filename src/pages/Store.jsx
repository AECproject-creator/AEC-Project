import { stripeLinks } from "../data/siteData.js";
import { SubHero, Footer } from "../components/Section.jsx";
const products=[
  ["Basic","$5","",stripeLinks.basic,["サブスク形式","いつでもキャンセル","Quiz Arenaでのプレミアムリワード受け取り"]],
  ["Plus","$12","BEST VALUE",stripeLinks.plus,["サブスク形式","いつでもキャンセル","Quiz Arenaでのプレミアムリワード受け取り","KAGURAのライブチケット込","KAGURAでの限定リワード"]],
  ["Unreal","$20","ULTIMATE",stripeLinks.unreal,["サブスク形式","いつでもキャンセル","KAGURAライブチケット込","コラボライブも対象","NexCでの動画ダウンロード","NexCでの広告が全て消える"]]
];
export default function Store({ t }) { return <><SubHero kicker="web store" title="STORE" lead={t.pages.storeLead}/><section className="content section"><div className="store-banner reveal"><h2>{t.store.bannerTitle}</h2><p>{t.store.bannerText}</p></div><div className="pricing-grid">{products.map(([name,price,tag,href,features])=><article className={`price-card reveal ${tag==='BEST VALUE'?'featured':''} ${tag==='ULTIMATE'?'ultimate':''}`} key={name}>{tag&&<span className="badge">{tag}</span>}<h3>{name}</h3><div className="price">{price} <span>/month</span></div><ul>{features.map(f=><li key={f}>{f}</li>)}</ul><a className="btn" href={href} target="_blank" rel="noreferrer">{t.store.purchase}</a></article>)}</div><p className="stripe-note reveal">{t.store.note}</p></section><Footer/></> }
