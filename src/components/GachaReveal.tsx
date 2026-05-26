// ガチャ風の演出。複数のカラフルな実が高速で切り替わり、
// 中央の光が広がって最後に消える（その後、親が結果カードを描画）
"use client";

import { useEffect, useState } from "react";
import { FruitVisual } from "./FruitVisual";
import { paletteCount } from "@/data/palettes";
import type { FruitType } from "@/data/fruits";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface Props {
  lang: Lang;
}

const SPIN_TYPES: FruitType[] = ["paramecia", "zoan", "logia"];
const SPIN_SHAPES_SEEDS = [
  "spin-a",
  "spin-b",
  "spin-c",
  "spin-d",
  "spin-e",
  "spin-f",
];

export function GachaReveal({ lang }: Props) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let count = 0;
    const step = () => {
      count++;
      setTick(count);
      // 一定速度で素早く切替（ステージ1なので短時間）
      timer = setTimeout(step, 90);
    };
    timer = setTimeout(step, 70);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const type = SPIN_TYPES[tick % SPIN_TYPES.length];
  const paletteIdx = (tick * 3) % paletteCount(type);
  const seed = SPIN_SHAPES_SEEDS[tick % SPIN_SHAPES_SEEDS.length];

  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      <div className="relative">
        {/* 後光：回転する光のリング */}
        <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-fuchsia-500/40 via-amber-300/40 to-sky-400/40 blur-2xl animate-spin-slow" />
        {/* 中央の白いきらめき */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-white/30 blur-2xl animate-pulse" />
        </div>
        {/* 切り替わる実 */}
        <div className="relative animate-jitter">
          <FruitVisual
            type={type}
            seed={seed}
            paletteIndex={paletteIdx}
            size={200}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-base font-semibold tracking-wide text-white/90">
          {t(lang, "submitting")}
        </p>
        <div className="mt-2 flex justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
