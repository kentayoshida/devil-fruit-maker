// ガチャ風の演出。生成済みの悪魔の実画像を高速でシャッフル表示
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FruitVisual } from "./FruitVisual";
import { GENERATED_FRUITS } from "@/data/generated-fruits";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface Props {
  lang: Lang;
}

// 軽量ハッシュベースのシャッフル順序生成
function shuffleOrder<T>(arr: readonly T[], seed: number): T[] {
  const a = arr.slice();
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 0x01000193) ^ i) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function GachaReveal({ lang }: Props) {
  const [tick, setTick] = useState(0);

  // この演出インスタンスごとに違う順序で並べる（前回と同じ流れに見せない）
  const order = useMemo(
    () => shuffleOrder(GENERATED_FRUITS, Date.now() >>> 0),
    []
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let count = 0;
    const step = () => {
      count++;
      setTick(count);
      timer = setTimeout(step, 90);
    };
    timer = setTimeout(step, 70);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 全画像を裏で preload してチラつき防止（初回マウント時に一度だけ）
  const preloadedRef = useRef(false);
  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    for (const f of GENERATED_FRUITS) {
      const img = new Image();
      img.src = `/fruits/${f.id}.png`;
    }
  }, []);

  const fruit = order[tick % order.length];

  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      <div className="relative">
        {/* 後光：回転する光のリング */}
        <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-fuchsia-500/40 via-amber-300/40 to-sky-400/40 blur-2xl animate-spin-slow" />
        {/* 中央の白いきらめき */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-white/30 blur-2xl animate-pulse" />
        </div>
        {/* 切り替わる実：生成画像があれば img、なければ SVG にフォールバック */}
        <div className="relative animate-jitter">
          <FruitVisual
            type={fruit.type}
            seed={fruit.id}
            paletteIndex={fruit.paletteIndex}
            imagePath={`/fruits/${fruit.id}.png`}
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
