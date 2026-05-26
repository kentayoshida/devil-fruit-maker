// 悪魔の実をイメージしたSVG。系統ごとに配色とパターンを変える
// (原作の独特な渦巻きパターンを模した抽象的なファンアート)

import type { FruitType } from "@/data/fruits";

interface Props {
  type: FruitType;
  size?: number;
}

const COLOR_MAP: Record<FruitType, { stops: [string, string, string]; swirl: string }> = {
  paramecia: {
    stops: ["#a855f7", "#d946ef", "#7c3aed"],
    swirl: "#fef3c7",
  },
  zoan: {
    stops: ["#f59e0b", "#ea580c", "#b45309"],
    swirl: "#fff7ed",
  },
  logia: {
    stops: ["#0ea5e9", "#22d3ee", "#0369a1"],
    swirl: "#ecfeff",
  },
};

export function FruitVisual({ type, size = 200 }: Props) {
  const c = COLOR_MAP[type];
  const id = `fruit-${type}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={c.stops[1]} />
          <stop offset="60%" stopColor={c.stops[0]} />
          <stop offset="100%" stopColor={c.stops[2]} />
        </radialGradient>
        <radialGradient id={`${id}-shine`} cx="35%" cy="30%" r="20%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* 実本体 */}
      <ellipse cx="100" cy="110" rx="78" ry="82" fill={`url(#${id}-body)`} />

      {/* 渦巻きパターン（悪魔の実の特徴的な紋様） */}
      <g stroke={c.swirl} strokeWidth="3" fill="none" opacity="0.85" strokeLinecap="round">
        <path d="M 60 90 Q 100 60, 140 90 Q 150 110, 130 130 Q 100 145, 75 130 Q 55 115, 70 100" />
        <path d="M 75 105 Q 100 90, 125 105 Q 130 118, 115 128 Q 100 135, 85 128 Q 75 120, 85 110" />
        <path d="M 90 115 Q 100 108, 110 115 Q 113 122, 105 125 Q 97 125, 93 120" />
      </g>

      {/* ハイライト */}
      <ellipse cx="78" cy="80" rx="22" ry="14" fill={`url(#${id}-shine)`} />

      {/* ヘタ */}
      <path
        d="M 100 28 Q 95 18, 100 14 Q 105 18, 100 28"
        fill="#3f6212"
        stroke="#1a2e05"
        strokeWidth="1.5"
      />
      <path
        d="M 100 28 Q 110 22, 116 26 Q 112 32, 100 32 Z"
        fill="#65a30d"
        stroke="#1a2e05"
        strokeWidth="1.5"
      />
    </svg>
  );
}
