// ステージ3: レア度の表示。レア度に応じて演出の派手さを変える
"use client";

import { useState } from "react";
import type { FruitType } from "@/data/fruits";
import type { MatchResult } from "@/lib/matcher";
import { rarityLabel, type Lang } from "@/lib/i18n";

// Imagen 4 で生成済みのレア度バッジ。未生成のものは onError で text フォールバック
const RARITY_IMAGE: Record<MatchResult["rarity"], string> = {
  common: "/rarity/common.png",
  uncommon: "/rarity/uncommon.png",
  rare: "/rarity/rare.png",
  legendary: "/rarity/legendary.png",
};

interface Props {
  rarity: MatchResult["rarity"];
  type: FruitType;
  lang: Lang;
}

const RARITY_STYLE: Record<
  MatchResult["rarity"],
  {
    label: string;
    color: string;
    glow: string;
    text: string;
    sparks: number;
    rings: number;
    rays: boolean;
    shake: boolean;
    bg: string;
  }
> = {
  common: {
    label: "★",
    color: "text-slate-200",
    glow: "shadow-slate-400/30",
    text: "text-slate-100",
    sparks: 0,
    rings: 0,
    rays: false,
    shake: false,
    bg: "from-slate-500/20 to-slate-700/20",
  },
  uncommon: {
    label: "★★",
    color: "text-emerald-300",
    glow: "shadow-emerald-400/50",
    text: "text-emerald-200",
    sparks: 4,
    rings: 0,
    rays: false,
    shake: false,
    bg: "from-emerald-500/30 to-emerald-700/20",
  },
  rare: {
    label: "★★★",
    color: "text-sky-300",
    glow: "shadow-sky-400/60",
    text: "text-sky-200",
    sparks: 8,
    rings: 1,
    rays: false,
    shake: false,
    bg: "from-sky-500/40 to-indigo-600/30",
  },
  legendary: {
    label: "★★★★",
    color: "text-amber-200",
    glow: "shadow-amber-400/80",
    text: "text-amber-100",
    sparks: 16,
    rings: 2,
    rays: true,
    shake: true,
    bg: "from-amber-400/50 via-orange-500/40 to-rose-600/40",
  },
};

export function RarityReveal({ rarity, lang }: Props) {
  const s = RARITY_STYLE[rarity];
  const label = rarityLabel(lang, rarity);
  // 画像読み込み失敗時はテキスト ★ にフォールバック
  const [imgFailed, setImgFailed] = useState(false);
  const useImage = !imgFailed;

  return (
    <div
      className={`mt-10 flex flex-col items-center gap-3 w-full max-w-md relative ${
        s.shake ? "animate-screen-shake" : ""
      }`}
    >
      {/* 背景グラデ */}
      <div
        className={`absolute inset-0 -m-10 rounded-full bg-gradient-to-br ${s.bg} blur-3xl ${
          rarity === "legendary" ? "animate-legendary-glow" : ""
        }`}
      />

      {/* レジェンド: 回転光線 */}
      {s.rays && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-80 animate-rays-rotate">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="0"
                    stroke="url(#ray-grad)"
                    strokeWidth="6"
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}
              <defs>
                <linearGradient id="ray-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(252,211,77,0)" />
                  <stop offset="100%" stopColor="rgba(252,211,77,0.9)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* 拡大リング */}
      {Array.from({ length: s.rings }, (_, i) => (
        <div
          key={i}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 ${
            rarity === "legendary" ? "border-amber-300" : "border-sky-300"
          } animate-ring-expand`}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* スパーク */}
      {Array.from({ length: s.sparks }, (_, i) => {
        const angle = (i * 360) / Math.max(s.sparks, 1);
        const rad = (angle * Math.PI) / 180;
        const dist = 80 + Math.random() * 40;
        const dx = Math.cos(rad) * dist;
        const dy = Math.sin(rad) * dist;
        const color =
          rarity === "legendary"
            ? i % 2 === 0
              ? "bg-amber-200"
              : "bg-orange-300"
            : rarity === "rare"
            ? "bg-sky-200"
            : "bg-emerald-200";
        return (
          <span
            key={i}
            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${color} animate-spark-fly`}
            style={
              {
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
                animationDelay: `${(i % 4) * 0.05}s`,
              } as React.CSSProperties
            }
          />
        );
      })}

      {/* 中央のレア度表示 */}
      <div
        className={`relative ${
          rarity === "common"
            ? "animate-rarity-fade"
            : "animate-stage-burst"
        }`}
      >
        <div className="text-[10px] tracking-[0.3em] text-white/60 text-center mb-1">
          {lang === "ja" ? "希少度" : "RARITY"}
        </div>
        {useImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={RARITY_IMAGE[rarity]}
            alt={label}
            width={160}
            height={160}
            onError={() => setImgFailed(true)}
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
              filter:
                rarity === "legendary"
                  ? "drop-shadow(0 0 24px rgba(252,211,77,0.55))"
                  : rarity === "rare"
                  ? "drop-shadow(0 0 18px rgba(125,211,252,0.45))"
                  : "drop-shadow(0 6px 12px rgba(0,0,0,0.4))",
            }}
          />
        ) : (
          <div
            className={`text-5xl ${s.color} text-center drop-shadow-2xl leading-tight`}
          >
            {s.label}
          </div>
        )}
        <div
          className={`mt-2 text-2xl font-black text-center tracking-widest ${s.text}`}
        >
          {label.toUpperCase()}
        </div>
        {rarity === "legendary" && (
          <div className="mt-2 text-xs text-amber-200/80 text-center tracking-[0.2em] animate-pulse">
            {lang === "ja" ? "—— 伝説 ——" : "—— LEGENDARY ——"}
          </div>
        )}
      </div>
    </div>
  );
}
