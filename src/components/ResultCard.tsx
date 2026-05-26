// 結果カード。html-to-image でこの DOM をそのまま PNG 化する
"use client";

import { forwardRef } from "react";
import { FruitVisual } from "./FruitVisual";
import { TYPE_INFO } from "@/data/fruits";
import type { MatchResult } from "@/lib/matcher";
import { rarityLabel, t, type Lang } from "@/lib/i18n";

interface Props {
  result: MatchResult;
  name: string;
  lang: Lang;
}

const RARITY_COLOR = {
  common: "bg-slate-200 text-slate-700",
  uncommon: "bg-emerald-200 text-emerald-800",
  rare: "bg-sky-200 text-sky-800",
  legendary: "bg-amber-200 text-amber-900",
};

export const ResultCard = forwardRef<HTMLDivElement, Props>(function ResultCard(
  { result, name, lang },
  ref
) {
  const typeInfo = TYPE_INFO[result.type];

  return (
    <div
      ref={ref}
      className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      style={{ aspectRatio: "9 / 16" }}
    >
      {/* 背景の系統カラー */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${typeInfo.color} opacity-25`}
      />
      {/* テクスチャ */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.4) 0, transparent 40%)",
        }}
      />

      <div className="relative h-full flex flex-col p-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div className="text-xs tracking-[0.3em] opacity-80">
            DEVIL FRUIT MAKER
          </div>
          <div
            className={`text-[10px] font-semibold tracking-widest px-2 py-1 rounded ${RARITY_COLOR[result.rarity]}`}
          >
            {rarityLabel(lang, result.rarity).toUpperCase()}
          </div>
        </div>

        {/* タイトル: あなたにぴったりの */}
        <div className="mt-3 text-sm opacity-90">
          {name && (
            <span className="font-semibold mr-1">
              {name}
              {lang === "ja" ? "さんの" : "'s"}
            </span>
          )}
          {t(lang, "yourFruit")}
        </div>

        {/* フルーツ画像 */}
        <div className="flex-1 flex items-center justify-center my-2">
          <div className="drop-shadow-2xl">
            <FruitVisual type={result.type} seed={result.name.en} size={220} />
          </div>
        </div>

        {/* 実の名前 */}
        <div className="text-center">
          <div className="text-2xl font-bold leading-tight">
            {result.name[lang]}
          </div>
          <div className="mt-1 text-xs opacity-70">
            {lang === "ja" ? result.name.en : result.name.ja}
          </div>
        </div>

        {/* タイプバッジ */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${typeInfo.color} text-white`}
          >
            {typeInfo.label[lang]}
          </span>
          <span className="text-xs opacity-70">
            {typeInfo.subtitle[lang]}
          </span>
        </div>

        {/* 能力 */}
        <div className="mt-3 rounded-xl bg-black/30 backdrop-blur-sm p-3">
          <div className="text-[10px] tracking-[0.2em] opacity-70 mb-1">
            {t(lang, "ability").toUpperCase()}
          </div>
          <p className="text-sm leading-relaxed">{result.ability[lang]}</p>
        </div>

        {/* フッター */}
        <div className="mt-3 flex items-center justify-between text-[10px] opacity-60">
          <span>
            {result.source === "canon"
              ? t(lang, "canonNote")
              : t(lang, "originalNote")}
          </span>
          <span>devil-fruit-maker</span>
        </div>
      </div>
    </div>
  );
});
