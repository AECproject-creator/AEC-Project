# AEC / KAGURA TERMINAL SITE v4
## 音・Character除外版 / Mobile & Deploy Stabilized

この版は、ユーザー指定に合わせて **Audio Manager** と **Characterページ** を除外し、Mobile表示・Vercel配信・背景演出・SECRET/ARG・DATABASEを強化した版です。

## 主な修正

- Audio Manager削除
- Characterページ/ルート削除
- Mobile Lenis停止
- `100dvh` 対応
- Canvas / 背景レイヤー `pointer-events: none`
- z-index整理
- Mobile Menu閉時の `opacity / visibility / pointer-events` 整理
- 雨Particle追加
- Matrix / Signal line / HUD / Dynamic Light維持
- BOOT Sequence強化
- `/hidden`, `/system`, `/node`, `/network`, `/access`, `/database` 強化
- NEWS JSON管理維持
- Vercel SPA rewrite対応

## 起動

```bash
npm install
npm run dev
```

## build

```bash
npm run build
npm run preview
```

## Vercel

`vercel.json` あり。直URLリロード対策済み。

## Stripe

`src/data/siteData.js` の `stripeLinks` を本物のStripe Payment Linkに差し替えてください。


## Build確認

このパッケージは作成時に以下を実行し、成功を確認済みです。

```bash
npm install
npm run build
```

生成確認済み：

```txt
dist/
```

主なchunk：

```txt
vendor
animation
three
ThreeScene
index
```

## 注意

`node_modules` はZIPに含めていません。解凍後に `npm install` を実行してください。
