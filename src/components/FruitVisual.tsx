// 悪魔の実のSVG。参考画像（バンプレストフィギュア等）を踏まえ、
// 表面の渦巻きレリーフ、立体的グラデーション、複数の形バリエーション、巻きひげのヘタを再現
"use client";

import type { FruitType } from "@/data/fruits";

interface Props {
  type: FruitType;
  /** 形のバリエーションを決定するためのキー（実IDなど）。同じキーなら毎回同じ形 */
  seed?: string;
  size?: number;
}

type Shape = "sphere" | "apple" | "pear" | "heart" | "cluster" | "spike";

// 系統別のベースカラー（メイン/ハイライト/シャドウ/渦溝/輪郭）
const COLOR_MAP: Record<
  FruitType,
  {
    base: string;
    light: string;
    dark: string;
    groove: string; // 渦巻きの溝の影
    outline: string;
  }
> = {
  paramecia: {
    base: "#9333ea",
    light: "#d8b4fe",
    dark: "#4c1d95",
    groove: "#3b0764",
    outline: "#2e1065",
  },
  zoan: {
    base: "#ea580c",
    light: "#fdba74",
    dark: "#7c2d12",
    groove: "#431407",
    outline: "#431407",
  },
  logia: {
    base: "#0ea5e9",
    light: "#bae6fd",
    dark: "#0c4a6e",
    groove: "#082f49",
    outline: "#0c4a6e",
  },
};

// 軽量ハッシュ（FNV-1a 簡易版）
function hash(s: string): number {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

const SHAPES: Shape[] = ["sphere", "apple", "pear", "heart", "cluster", "spike"];

function pickShape(type: FruitType, seed: string | undefined): Shape {
  if (!seed) return "sphere";
  // ロギアは spike or cluster が出やすく、ゾオンは apple/heart 寄り、パラミシアは全形候補
  const allowed: Shape[] =
    type === "logia"
      ? ["sphere", "spike", "cluster", "pear"]
      : type === "zoan"
      ? ["apple", "heart", "sphere", "pear"]
      : SHAPES;
  return allowed[hash(seed) % allowed.length];
}

// 渦巻き 1個を描く path（中央が原点、半径約8）
// 凹んだ溝のように見せるため、暗い太線＋細いハイライト線で構成する。
// symbol ではなく g で定義（symbol+use はクリップパス + 任意座標transformが不安定）
function SwirlDefs({ groove, light }: { groove: string; light: string }) {
  return (
    <>
      <g id="swirl">
        {/* 渦巻きの溝（暗い影） */}
        <path
          d="M 5 2 Q 5 -6 -2 -6 Q -8 -6 -8 0 Q -8 5 -3 5 Q 1 5 1 1 Q 1 -1 -1 -1"
          fill="none"
          stroke={groove}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* 渦巻きのフチに細いハイライト */}
        <path
          d="M 5 1 Q 5 -7 -2 -7 Q -9 -7 -9 0"
          fill="none"
          stroke={light}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>
      <g id="swirl-sm">
        <path
          d="M 3 1 Q 3 -4 -1 -4 Q -5 -4 -5 0 Q -5 3 -2 3 Q 0 3 0 1"
          fill="none"
          stroke={groove}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
    </>
  );
}

// 散布する渦巻きの座標群（実viewBoxの絶対座標 cx, cy）
// 形ごとに本体の領域が違うため、shape ごとに配置を変える
type Dot = { cx: number; cy: number; s: number; r: number; f: boolean; sm?: boolean };

const SWIRL_DOTS_BY_SHAPE: Record<Shape, Dot[]> = {
  sphere: [
    { cx: 65, cy: 130, s: 1.0, r: 20, f: false },
    { cx: 100, cy: 115, s: 1.1, r: -25, f: true },
    { cx: 135, cy: 115, s: 0.95, r: 35, f: false },
    { cx: 170, cy: 130, s: 1.0, r: 50, f: true },
    { cx: 55, cy: 165, s: 1.05, r: -10, f: false },
    { cx: 90, cy: 155, s: 0.85, r: 60, f: true, sm: true },
    { cx: 125, cy: 155, s: 1.1, r: -30, f: false },
    { cx: 160, cy: 160, s: 1.0, r: 25, f: true },
    { cx: 50, cy: 200, s: 0.95, r: 70, f: false, sm: true },
    { cx: 85, cy: 195, s: 1.1, r: -45, f: true },
    { cx: 125, cy: 200, s: 1.0, r: 30, f: false },
    { cx: 165, cy: 200, s: 0.9, r: -15, f: true },
    { cx: 70, cy: 235, s: 0.9, r: 80, f: false },
    { cx: 110, cy: 240, s: 1.0, r: -25, f: true },
    { cx: 150, cy: 235, s: 0.95, r: 40, f: false },
    { cx: 110, cy: 175, s: 0.7, r: 0, f: false, sm: true },
  ],
  apple: [
    { cx: 65, cy: 140, s: 1.0, r: 15, f: false },
    { cx: 100, cy: 130, s: 1.1, r: -20, f: true },
    { cx: 140, cy: 130, s: 1.0, r: 30, f: false },
    { cx: 175, cy: 145, s: 0.95, r: 55, f: true },
    { cx: 55, cy: 175, s: 1.05, r: -10, f: false },
    { cx: 95, cy: 170, s: 0.9, r: 50, f: true, sm: true },
    { cx: 130, cy: 170, s: 1.1, r: -30, f: false },
    { cx: 170, cy: 175, s: 1.0, r: 20, f: true },
    { cx: 50, cy: 210, s: 0.95, r: 65, f: false },
    { cx: 90, cy: 210, s: 1.1, r: -40, f: true },
    { cx: 130, cy: 215, s: 1.0, r: 30, f: false },
    { cx: 170, cy: 210, s: 0.9, r: -15, f: true },
    { cx: 75, cy: 245, s: 0.9, r: 75, f: false },
    { cx: 120, cy: 250, s: 1.0, r: -25, f: true },
    { cx: 160, cy: 245, s: 0.95, r: 35, f: false },
  ],
  pear: [
    { cx: 100, cy: 110, s: 0.75, r: 15, f: false, sm: true },
    { cx: 135, cy: 110, s: 0.75, r: -20, f: true, sm: true },
    { cx: 95, cy: 140, s: 0.85, r: 25, f: false },
    { cx: 138, cy: 138, s: 0.9, r: -30, f: true },
    { cx: 75, cy: 180, s: 1.0, r: 40, f: false },
    { cx: 115, cy: 175, s: 1.0, r: -20, f: true },
    { cx: 155, cy: 178, s: 0.95, r: 30, f: false },
    { cx: 60, cy: 215, s: 1.05, r: -5, f: false },
    { cx: 100, cy: 215, s: 1.1, r: 55, f: true },
    { cx: 140, cy: 218, s: 1.0, r: -35, f: false },
    { cx: 180, cy: 215, s: 1.0, r: 20, f: true },
    { cx: 80, cy: 250, s: 0.95, r: 70, f: false },
    { cx: 125, cy: 252, s: 1.0, r: -30, f: true },
    { cx: 165, cy: 250, s: 0.9, r: 45, f: false },
  ],
  heart: [
    { cx: 70, cy: 135, s: 0.9, r: -30, f: false, sm: true },
    { cx: 105, cy: 125, s: 1.0, r: 20, f: true },
    { cx: 140, cy: 125, s: 1.0, r: -25, f: false },
    { cx: 175, cy: 135, s: 0.9, r: 40, f: true, sm: true },
    { cx: 60, cy: 170, s: 1.0, r: 50, f: false },
    { cx: 100, cy: 165, s: 1.1, r: -15, f: true },
    { cx: 140, cy: 165, s: 1.1, r: 25, f: false },
    { cx: 180, cy: 170, s: 0.95, r: -45, f: true },
    { cx: 70, cy: 205, s: 1.0, r: 30, f: false },
    { cx: 115, cy: 205, s: 1.05, r: -25, f: true },
    { cx: 160, cy: 205, s: 1.0, r: 50, f: false },
    { cx: 95, cy: 235, s: 0.9, r: -30, f: true },
    { cx: 140, cy: 235, s: 0.95, r: 30, f: false },
    { cx: 120, cy: 260, s: 0.85, r: 0, f: false, sm: true },
  ],
  cluster: [
    { cx: 70, cy: 110, s: 0.7, r: 20, f: false, sm: true },
    { cx: 130, cy: 100, s: 0.7, r: -25, f: true, sm: true },
    { cx: 100, cy: 140, s: 0.75, r: 30, f: false, sm: true },
    { cx: 60, cy: 160, s: 0.75, r: -20, f: true, sm: true },
    { cx: 150, cy: 145, s: 0.7, r: 45, f: false, sm: true },
    { cx: 110, cy: 175, s: 0.75, r: -30, f: true, sm: true },
    { cx: 175, cy: 175, s: 0.7, r: 25, f: false, sm: true },
    { cx: 65, cy: 200, s: 0.75, r: 55, f: true, sm: true },
    { cx: 145, cy: 215, s: 0.75, r: -40, f: false, sm: true },
    { cx: 105, cy: 225, s: 0.75, r: 30, f: true, sm: true },
    { cx: 80, cy: 240, s: 0.7, r: -25, f: false, sm: true },
    { cx: 165, cy: 240, s: 0.7, r: 20, f: true, sm: true },
  ],
  spike: [
    { cx: 95, cy: 145, s: 0.7, r: 15, f: false, sm: true },
    { cx: 145, cy: 145, s: 0.7, r: -25, f: true, sm: true },
    { cx: 80, cy: 170, s: 0.8, r: 30, f: false },
    { cx: 120, cy: 165, s: 0.85, r: -10, f: true },
    { cx: 160, cy: 170, s: 0.75, r: 45, f: false, sm: true },
    { cx: 75, cy: 200, s: 0.9, r: -30, f: false },
    { cx: 120, cy: 200, s: 0.95, r: 30, f: true },
    { cx: 165, cy: 200, s: 0.85, r: -45, f: false },
    { cx: 90, cy: 230, s: 0.85, r: 60, f: true },
    { cx: 130, cy: 235, s: 0.85, r: -30, f: false },
    { cx: 105, cy: 250, s: 0.75, r: 10, f: true, sm: true },
  ],
};

// 各形のシルエット path（viewBox 0 0 240 280 で記述、上余白はヘタ用）
const SHAPE_PATHS: Record<Shape, string> = {
  // 球
  sphere:
    "M 120 80 C 65 80 35 120 35 175 C 35 235 75 270 120 270 C 165 270 205 235 205 175 C 205 120 175 80 120 80 Z",
  // 林檎（やや上が凹む）
  apple:
    "M 120 90 C 60 90 32 130 32 180 C 32 235 72 272 120 272 C 168 272 208 235 208 180 C 208 130 180 90 120 90 Z M 108 92 Q 120 100 132 92",
  // 洋ナシ（上が細く、下が膨らむ）
  pear:
    "M 120 80 C 95 80 80 105 82 130 C 84 145 78 158 70 172 C 50 195 45 230 70 252 C 95 272 145 272 170 252 C 195 230 190 195 170 172 C 162 158 156 145 158 130 C 160 105 145 80 120 80 Z",
  // ハート
  heart:
    "M 120 270 C 60 220 25 180 35 135 C 42 105 75 88 100 100 C 112 106 118 118 120 125 C 122 118 128 106 140 100 C 165 88 198 105 205 135 C 215 180 180 220 120 270 Z",
  // 葡萄房状（複数の球がクラスター状）
  cluster:
    "M 120 80 m -50 30 a 32 32 0 1 0 0.1 0 z m 60 -10 a 32 32 0 1 0 0.1 0 z m -90 50 a 36 36 0 1 0 0.1 0 z m 50 10 a 38 38 0 1 0 0.1 0 z m 60 -5 a 34 34 0 1 0 0.1 0 z m -85 70 a 36 36 0 1 0 0.1 0 z m 55 5 a 36 36 0 1 0 0.1 0 z",
  // トゲ状（雷型ロギア）
  spike:
    "M 120 80 L 90 130 L 50 120 L 75 165 L 35 175 L 80 195 L 45 230 L 95 220 L 95 265 L 120 235 L 145 265 L 145 220 L 195 230 L 160 195 L 205 175 L 165 165 L 190 120 L 150 130 Z",
};

export function FruitVisual({ type, seed, size = 220 }: Props) {
  const c = COLOR_MAP[type];
  const shape = pickShape(type, seed);
  const uid = `f${type}-${hash(seed || "") % 100000}`;

  return (
    <svg
      width={size}
      height={size * (280 / 240)}
      viewBox="0 0 240 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* 本体の立体感グラデーション */}
        <radialGradient id={`${uid}-body`} cx="33%" cy="28%" r="80%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="45%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </radialGradient>
        {/* 縁に少し沈むシャドウ */}
        <radialGradient id={`${uid}-rim`} cx="50%" cy="55%" r="55%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
        </radialGradient>
        {/* ハイライト */}
        <radialGradient id={`${uid}-shine`} cx="32%" cy="22%" r="22%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* 接地影 */}
        <radialGradient id={`${uid}-ground`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        <SwirlDefs groove={c.groove} light={c.light} />

        {/* シルエットをクリップとして使う（渦巻きを本体外にはみ出させない） */}
        <clipPath id={`${uid}-clip`}>
          <path d={SHAPE_PATHS[shape]} />
        </clipPath>
      </defs>

      {/* 接地影 */}
      <ellipse cx="120" cy="270" rx="80" ry="8" fill={`url(#${uid}-ground)`} />

      {/* 本体（ベース塗り） */}
      <path d={SHAPE_PATHS[shape]} fill={`url(#${uid}-body)`} />

      {/* 縁シャドウ（実本体に乗算） */}
      <path
        d={SHAPE_PATHS[shape]}
        fill={`url(#${uid}-rim)`}
        style={{ mixBlendMode: "multiply" }}
      />

      {/* 渦巻き散布（実本体の中でのみ表示） */}
      <g clipPath={`url(#${uid}-clip)`}>
        {SWIRL_DOTS_BY_SHAPE[shape].map((d, i) => {
          const useId = d.sm ? "swirl-sm" : "swirl";
          const scaleX = d.f ? -d.s : d.s;
          return (
            <use
              key={i}
              href={`#${useId}`}
              transform={`translate(${d.cx} ${d.cy}) rotate(${d.r}) scale(${scaleX} ${d.s})`}
            />
          );
        })}
      </g>

      {/* ハイライト（渦巻きの上に薄く） */}
      <path
        d={SHAPE_PATHS[shape]}
        fill={`url(#${uid}-shine)`}
        opacity="0.75"
      />

      {/* 本体アウトライン */}
      <path
        d={SHAPE_PATHS[shape]}
        fill="none"
        stroke={c.outline}
        strokeWidth="1.6"
        opacity="0.55"
      />

      {/* ヘタ（巻きひげ状） */}
      <Stem shape={shape} />
    </svg>
  );
}

function Stem({ shape }: { shape: Shape }) {
  // 形ごとにヘタの位置を微調整
  const topY =
    shape === "heart" ? 100 :
    shape === "spike" ? 80 :
    shape === "pear" ? 80 :
    shape === "cluster" ? 75 :
    shape === "apple" ? 92 : 80;
  const cx = 120;
  return (
    <g>
      {/* 主茎 */}
      <path
        d={`M ${cx} ${topY} C ${cx - 2} ${topY - 25}, ${cx + 4} ${topY - 45}, ${cx + 2} ${topY - 60}`}
        fill="none"
        stroke="#3f6212"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx} ${topY} C ${cx - 2} ${topY - 25}, ${cx + 4} ${topY - 45}, ${cx + 2} ${topY - 60}`}
        fill="none"
        stroke="#65a30d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* 巻きひげ（左） */}
      <path
        d={`M ${cx + 2} ${topY - 60} q -14 -2 -18 -12 q -3 -10 5 -12 q 7 -1 5 7`}
        fill="none"
        stroke="#3f6212"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* 巻きひげ（右） */}
      <path
        d={`M ${cx + 2} ${topY - 55} q 16 0 22 10 q 3 9 -5 11`}
        fill="none"
        stroke="#3f6212"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* 小巻きひげ */}
      <circle cx={cx + 22} cy={topY - 44} r="3.5" fill="none" stroke="#3f6212" strokeWidth="3" />
    </g>
  );
}
