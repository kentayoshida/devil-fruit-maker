# Devil Fruit Maker / 悪魔の実メーカー

ONE PIECE インスパイアのファンメイド・ジェネレーター。
あなたの名前から、決定的に「あなただけの悪魔の実」が判明します。

> 本アプリは『ONE PIECE』にインスパイアされたファンメイド・**非公式**のアプリです。
> 原作の著作権は尾田栄一郎氏および集英社に帰属します。

## 特徴

- **決定的マッチング**: 同じ名前を入力すれば常に同じ結果。「もう一度引く」で別の結果も試せる
- **3系統対応**: パラミシア（70%）/ ゾオン（20%）/ ロギア（10%）の原作比率
- **DB**: 原作カノンの実 約40種を収録、それ以外は名前のハッシュからオリジナル実を生成
- **日英対応**: ユーザーが切替可能、localStorage 保存
- **画像共有**: html-to-image でカードを PNG 化、Web Share API でシェア（フォールバック: ダウンロード）
- **スマホファースト**: 9:16 縦長カードレイアウト

## 開発

```bash
npm install
npm run dev   # http://localhost:3000
```

## デプロイ（Vercel + 独自ドメイン）

1. GitHub にリポジトリを push
2. Vercel で Import → ビルド設定はデフォルトで OK
3. `Settings → Domains` から独自ドメインを追加（DNS は CNAME or A レコードで Vercel を指す）
4. `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts` の `SITE_URL` を実ドメインに置換

## 技術スタック

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- html-to-image（クライアントサイドPNG生成）

## ライセンス

ソースコードは私的利用前提のファン作品です。商用利用は想定していません。
