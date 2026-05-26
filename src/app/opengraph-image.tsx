// ビルド時に Vercel/Next で生成される OG 画像。
// 1200x630。SNS リンク貼付時のカード画像。
// satori が日本語フォントを内蔵しないため、テキストは英字主体に、
// ビジュアルで「悪魔の実」感を伝える設計。

import { ImageResponse } from "next/og";

export const alt = "Devil Fruit Maker — Find the Devil Fruit meant for your name";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0b1020 0%, #1a0a40 45%, #2a0a55 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* 背景の柔らかい光 */}
        <div
          style={{
            position: "absolute",
            top: -150,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0) 60%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(14,165,233,0) 60%)",
            display: "flex",
          }}
        />

        {/* 左: テキスト */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingLeft: 80,
            paddingTop: 80,
            paddingBottom: 80,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.32em",
              opacity: 0.7,
              marginBottom: 24,
              display: "flex",
            }}
          >
            DEVIL FRUIT MAKER
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 28,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Find the Devil Fruit</span>
            <span>meant for your name.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.88,
              marginBottom: 18,
              display: "flex",
            }}
          >
            Type your name → meet your fruit.
          </div>
          <div
            style={{
              fontSize: 18,
              opacity: 0.55,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ONE PIECE inspired · fan-made · unofficial
          </div>
        </div>

        {/* 右: 悪魔の実ビジュアル */}
        <div
          style={{
            width: 520,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FruitArt />
        </div>
      </div>
    ),
    { ...size }
  );
}

function FruitArt() {
  // Satori が filter をサポートしないため、deboss は使わず
  // 「暗い渦巻き線 + 細い明るい縁線」の2層で凹みの雰囲気を出す
  const swirls: { cx: number; cy: number; r: number; s: number; flip?: boolean }[] = [
    { cx: 70, cy: 130, r: 15, s: 1.0 },
    { cx: 105, cy: 115, r: -20, s: 1.1, flip: true },
    { cx: 140, cy: 115, r: 30, s: 1.0 },
    { cx: 170, cy: 130, r: 50, s: 0.95, flip: true },
    { cx: 60, cy: 165, r: -10, s: 1.05 },
    { cx: 100, cy: 158, r: 50, s: 0.95, flip: true },
    { cx: 138, cy: 158, r: -25, s: 1.1 },
    { cx: 175, cy: 165, r: 20, s: 1.0, flip: true },
    { cx: 55, cy: 200, r: 65, s: 0.95 },
    { cx: 95, cy: 197, r: -40, s: 1.05, flip: true },
    { cx: 138, cy: 200, r: 30, s: 1.0 },
    { cx: 178, cy: 200, r: -15, s: 0.9, flip: true },
    { cx: 75, cy: 235, r: 75, s: 0.9 },
    { cx: 120, cy: 240, r: -25, s: 1.0, flip: true },
    { cx: 160, cy: 235, r: 40, s: 0.95 },
  ];

  return (
    <div
      style={{
        width: 460,
        height: 540,
        display: "flex",
      }}
    >
      <svg width="460" height="540" viewBox="0 0 240 280">
        <defs>
          <radialGradient id="og-body" cx="33%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="45%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#3c0e7a" />
          </radialGradient>
          <radialGradient id="og-rim" cx="50%" cy="55%" r="55%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </radialGradient>
          <radialGradient id="og-shine" cx="32%" cy="22%" r="20%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* 接地影 */}
        <ellipse cx="120" cy="265" rx="80" ry="8" fill="rgba(0,0,0,0.45)" />

        {/* 本体 */}
        <ellipse cx="120" cy="170" rx="95" ry="100" fill="url(#og-body)" />

        {/* 縁の暗さ */}
        <ellipse cx="120" cy="170" rx="95" ry="100" fill="url(#og-rim)" />

        {/* 渦巻き群（deboss不可なので 2層で凹み風） */}
        {swirls.map((d, i) => {
          const sx = d.flip ? -d.s : d.s;
          return (
            <g
              key={i}
              transform={`translate(${d.cx} ${d.cy}) rotate(${d.r}) scale(${sx} ${d.s})`}
            >
              {/* 暗い溝 */}
              <path
                d="M 5 2 Q 5 -6 -2 -6 Q -8 -6 -8 0 Q -8 5 -3 5 Q 1 5 1 1 Q 1 -1 -1 -1"
                fill="none"
                stroke="#1a032e"
                strokeWidth="2.8"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* 細いハイライト（下端側にズラす） */}
              <path
                d="M 5 3 Q 5 -5 -2 -5 Q -7 -5 -7 1"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="0.9"
                strokeLinecap="round"
                opacity="0.45"
              />
            </g>
          );
        })}

        {/* ハイライト（上から薄く） */}
        <ellipse cx="120" cy="170" rx="95" ry="100" fill="url(#og-shine)" />

        {/* アウトライン */}
        <ellipse
          cx="120"
          cy="170"
          rx="95"
          ry="100"
          fill="none"
          stroke="#2e1065"
          strokeWidth="1.6"
          opacity="0.6"
        />

        {/* ヘタ */}
        <path
          d="M 120 70 C 118 50, 122 35, 124 18"
          fill="none"
          stroke="#3f6212"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 124 18 q 16 0 22 12 q 3 9 -6 11"
          fill="none"
          stroke="#3f6212"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 124 18 q -14 -2 -18 8 q -3 9 5 11"
          fill="none"
          stroke="#3f6212"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle
          cx="142"
          cy="42"
          r="4"
          fill="none"
          stroke="#3f6212"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
