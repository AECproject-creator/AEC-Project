import { useState } from "react";
import { Link } from "react-router-dom";
import { SubHero, Footer } from "../components/Section.jsx";
import { databaseLogs, organizations, terms, timeline } from "../data/siteData.js";

export default function Secret(){
  const [code, setCode] = useState("");
  const unlocked = code.trim() === "2042";
  return (
    <>
      <SubHero kicker="secret node" title="HIDDEN" lead="ACCESS CODE REQUIRED" />
      <section className="content section">
        <div className="secret-panel reveal">
          <p className="kicker">LOCKED / BASE64 / NODE</p>
          <h2>{unlocked ? "ACCESS GRANTED" : "ENTER CODE"}</h2>
          <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="ACCESS CODE" />
          {unlocked ? (
            <div className="secret-unlocked">
              <p>NODE 2042 OPEN。/system /node /network /database への接続が許可されました。</p>
              <div className="secret-link-grid">
                <Link className="btn btn-primary" to="/system">SYSTEM</Link>
                <Link className="btn btn-ghost" to="/node">NODE</Link>
                <Link className="btn btn-ghost" to="/network">NETWORK</Link>
                <Link className="btn btn-ghost" to="/database">DATABASE</Link>
              </div>
              <pre>01000001 01000101 01000011{"\n"}base64: QUVDIE5PREUgMjA0Mg=={"\n"}hex: 41 45 43 20 32 30 34 32</pre>
            </div>
          ) : (
            <p>ヒントは開発者コンソール、またはSPECIALファイルに隠されています。</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export function SystemNode(){
  return (
    <>
      <SubHero kicker="system monitor" title="SYSTEM" lead="AEC Corporation監視画面。" />
      <section className="content section">
        <div className="database-ui reveal">
          <p>SYSTEM LOG</p>
          <h2>NODE STATUS : ONLINE</h2>
          <pre>RED_ALERT=false{"\n"}SIGNAL=99.7%{"\n"}VRS_NOISE=12.4%{"\n"}AEC_NODE=FOUND{"\n"}NULL_CHOIR_TRACE=ACTIVE</pre>
        </div>
        <div className="card-grid">
          <article className="info-card reveal"><span className="label">AI</span><h2>監視AI</h2><p>接続世界を監視し、異常な感情波形を検知します。</p></article>
          <article className="info-card reveal"><span className="label">LOCK</span><h2>アクセス権限</h2><p>LEVEL 03以上で深層ノードに接続可能。</p></article>
          <article className="info-card reveal"><span className="label">ERROR</span><h2>Fake Error</h2><p>404やERROR画面も世界観の一部として機能します。</p></article>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function NodeAccess(){
  return (
    <>
      <SubHero kicker="node access" title="NODE" lead="接続世界図と暗号ログ。" />
      <section className="content section">
        <div className="world-map reveal">
          <span>NODE ACCESS MAP</span>
          <svg viewBox="0 0 100 60" aria-hidden="true">
            <path d="M10 40 C 25 10, 42 50, 60 20 S 85 35, 92 12" />
            <path d="M12 18 C 28 34, 42 10, 75 45" />
          </svg>
          <i className="node n1"/><i className="node n2"/><i className="node n3"/><i className="node n4"/>
        </div>
        <div className="database-ui reveal">
          <p>HEX STREAM</p>
          <h2>4b 41 47 55 52 41</h2>
          <pre>base64: S0FHVVJB{"\n"}hex: 41 45 43{"\n"}binary: 01001011 01000001</pre>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function NetworkAccess(){
  return (
    <>
      <SubHero kicker="network monitor" title="NETWORK" lead="AEC接続ネットワークの状態監視。" />
      <section className="content section">
        <div className="database-ui reveal">
          <p>NETWORK TRACE</p>
          <h2>SIGNAL ROUTE / ACTIVE</h2>
          <pre>terminal.aec-project.com → node-aec-2042{"\n"}db.aec-project.com → archive shard 07{"\n"}signal.aec-project.com → unstable but connected</pre>
        </div>
        <div className="card-grid">
          {organizations.map(([name, text]) => (
            <article className="info-card reveal" key={name}><span className="label">ORG</span><h2>{name}</h2><p>{text}</p></article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export function DatabaseTerminal(){
  return (
    <>
      <SubHero kicker="terminal database" title="DATABASE" lead="SUBJECT DATA / ACCESS LOG / NODE INFO" />
      <section className="content section">
        <div className="database-ui reveal">
          <p>ACCESS LOG</p>
          <h2>AEC DATABASE</h2>
          <pre>{databaseLogs.map(([type, line]) => `${type}: ${line}`).join("\n")}</pre>
        </div>
        <div className="term-grid">
          {terms.map(([name, text]) => (
            <article className="info-card reveal tooltip-card" key={name}><span className="label">TERM</span><h2>{name}</h2><p>{text}</p></article>
          ))}
        </div>
        <div className="timeline reveal">
          {timeline.map(([year, text]) => <div className="timeline-item" key={year}><h3>{year}</h3><p>{text}</p></div>)}
        </div>
      </section>
      <Footer />
    </>
  );
}

export function AccessGate(){
  return (
    <>
      <SubHero kicker="access terminal" title="ACCESS" lead="権限確認端末。" />
      <section className="content section">
        <div className="secret-panel reveal">
          <p className="kicker">ACCESS LEVEL CHECK</p>
          <h2>LEVEL 02 / LIMITED</h2>
          <p>深層ノードへ接続するには、ACCESS CODE 2042 を /hidden で入力してください。</p>
          <Link className="btn btn-primary" to="/hidden">OPEN HIDDEN NODE</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
