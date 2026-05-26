// ステージ2: タイプ判定（パラミシア/ゾオン/ロギア）の表示
"use client";

import { TYPE_INFO } from "@/data/fruits";
import type { FruitType } from "@/data/fruits";
import { t, type Lang } from "@/lib/i18n";

interface Props {
  type: FruitType;
  lang: Lang;
}

const TYPE_BG: Record<FruitType, string> = {
  paramecia: "from-fuchsia-600 via-violet-700 to-purple-900",
  zoan: "from-orange-500 via-amber-700 to-red-900",
  logia: "from-sky-500 via-cyan-700 to-blue-900",
};

const TYPE_ICON: Record<FruitType, string> = {
  paramecia: "✦",
  zoan: "❖",
  logia: "❂",
};

export function TypeReveal({ type, lang }: Props) {
  const info = TYPE_INFO[type];

  return (
    <div className="mt-10 flex flex-col items-center gap-5 w-full max-w-md relative overflow-hidden">
      {/* 系統カラーの背景 */}
      <div
        className={`absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br ${TYPE_BG[type]} opacity-25 blur-xl`}
      />
      {/* 横切るスイープ光 */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-type-sweep" />
      </div>

      <div className="relative animate-stage-burst flex flex-col items-center gap-2">
        <div className="text-[10px] tracking-[0.3em] text-white/60">
          {lang === "ja" ? "判定タイプ" : "TYPE"}
        </div>
        <div
          className={`text-7xl font-black bg-gradient-to-br ${TYPE_BG[type]} bg-clip-text text-transparent drop-shadow-2xl leading-none`}
        >
          {TYPE_ICON[type]}
        </div>
        <div className="text-3xl font-bold text-white mt-1">
          {info.label[lang]}
        </div>
        <div className="text-sm text-white/70">{info.subtitle[lang]}</div>
      </div>

      <p className="relative mt-3 text-xs text-white/50">
        {t(lang, "submitting")}
      </p>
    </div>
  );
}
