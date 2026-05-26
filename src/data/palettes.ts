// 悪魔の実のカラーパレット。系統ごとに複数色を用意し、
// カノン実は ID から固定色を、オリジナル実はシードから選択する

export interface Palette {
  base: string;
  light: string;
  dark: string;
  groove: string;
  outline: string;
  /** カードのアクセント色（tailwind gradient 用 hex 2色） */
  cardFrom: string;
  cardTo: string;
}

// パラミシア（超人系）— 多様な色を用意（原作も色幅広い）
export const PARAMECIA_PALETTES: Palette[] = [
  // 紫（ゴム/イト/カゲ）
  { base: "#9333ea", light: "#d8b4fe", dark: "#4c1d95", groove: "#2e1065", outline: "#1e0a45", cardFrom: "#a855f7", cardTo: "#7e22ce" },
  // ピンク（メロメロ/ホロホロ）
  { base: "#ec4899", light: "#fbcfe8", dark: "#9d174d", groove: "#500724", outline: "#831843", cardFrom: "#f472b6", cardTo: "#db2777" },
  // 赤（ヒトヒト/オペオペ）
  { base: "#dc2626", light: "#fca5a5", dark: "#7f1d1d", groove: "#450a0a", outline: "#7f1d1d", cardFrom: "#ef4444", cardTo: "#b91c1c" },
  // 青（ハナハナ/ドアドア）
  { base: "#2563eb", light: "#bfdbfe", dark: "#1e3a8a", groove: "#172554", outline: "#1e3a8a", cardFrom: "#3b82f6", cardTo: "#1d4ed8" },
  // 緑（トゲトゲ/スパスパ）
  { base: "#16a34a", light: "#bbf7d0", dark: "#14532d", groove: "#052e16", outline: "#14532d", cardFrom: "#22c55e", cardTo: "#15803d" },
  // 茶（バクバク/ボムボム）
  { base: "#92400e", light: "#fcd34d", dark: "#451a03", groove: "#1c0a01", outline: "#451a03", cardFrom: "#b45309", cardTo: "#78350f" },
  // 灰（スベスベ/ヨミヨミ）
  { base: "#6b7280", light: "#e5e7eb", dark: "#1f2937", groove: "#0f172a", outline: "#1f2937", cardFrom: "#9ca3af", cardTo: "#4b5563" },
  // ティール（アワアワ/グラグラ）
  { base: "#0891b2", light: "#a5f3fc", dark: "#164e63", groove: "#083344", outline: "#164e63", cardFrom: "#06b6d4", cardTo: "#0e7490" },
];

// ゾオン（動物系）— 動物色（赤・茶・オレンジ・黄褐色など）
export const ZOAN_PALETTES: Palette[] = [
  // 赤（ヒトヒト/サクラ）
  { base: "#e11d48", light: "#fda4af", dark: "#881337", groove: "#450a0a", outline: "#881337", cardFrom: "#f43f5e", cardTo: "#be123c" },
  // オレンジ（イヌ/トリ）
  { base: "#ea580c", light: "#fdba74", dark: "#7c2d12", groove: "#431407", outline: "#431407", cardFrom: "#f97316", cardTo: "#c2410c" },
  // 茶（ウシ/ゾウ）
  { base: "#78350f", light: "#fcd34d", dark: "#1c1917", groove: "#0c0a09", outline: "#1c1917", cardFrom: "#a16207", cardTo: "#713f12" },
  // 黄褐色（ライオン/ジャッカル）
  { base: "#ca8a04", light: "#fde68a", dark: "#713f12", groove: "#422006", outline: "#713f12", cardFrom: "#eab308", cardTo: "#a16207" },
  // 紫（幻獣・モデル：八岐大蛇）
  { base: "#7e22ce", light: "#e9d5ff", dark: "#3b0764", groove: "#1e0a45", outline: "#3b0764", cardFrom: "#a855f7", cardTo: "#6b21a8" },
  // 暗赤（ネコ豹/狼）
  { base: "#9f1239", light: "#fda4af", dark: "#500724", groove: "#3f0a18", outline: "#500724", cardFrom: "#be123c", cardTo: "#831843" },
  // 青緑（リュウ/水生獣）
  { base: "#0d9488", light: "#99f6e4", dark: "#134e4a", groove: "#042f2e", outline: "#134e4a", cardFrom: "#14b8a6", cardTo: "#115e59" },
];

// ロギア（自然系）— 自然要素を反映
export const LOGIA_PALETTES: Palette[] = [
  // 青（ヒエヒエ）
  { base: "#0ea5e9", light: "#bae6fd", dark: "#0c4a6e", groove: "#082f49", outline: "#0c4a6e", cardFrom: "#38bdf8", cardTo: "#0284c7" },
  // 赤橙（メラメラ/マグマグ）
  { base: "#dc2626", light: "#fed7aa", dark: "#7c2d12", groove: "#431407", outline: "#7c2d12", cardFrom: "#f97316", cardTo: "#b91c1c" },
  // 黄（ピカピカ/ゴロゴロ）
  { base: "#facc15", light: "#fef9c3", dark: "#854d0e", groove: "#422006", outline: "#854d0e", cardFrom: "#fde047", cardTo: "#ca8a04" },
  // 黒（ヤミヤミ）
  { base: "#1f2937", light: "#6b7280", dark: "#030712", groove: "#000000", outline: "#030712", cardFrom: "#374151", cardTo: "#030712" },
  // 灰白（モクモク/ユキユキ）
  { base: "#94a3b8", light: "#f1f5f9", dark: "#334155", groove: "#1e293b", outline: "#334155", cardFrom: "#cbd5e1", cardTo: "#64748b" },
  // 緑（ガスガス）
  { base: "#65a30d", light: "#d9f99d", dark: "#3f6212", groove: "#1a2e05", outline: "#3f6212", cardFrom: "#84cc16", cardTo: "#4d7c0f" },
  // 砂色（スナスナ）
  { base: "#d97706", light: "#fde68a", dark: "#78350f", groove: "#422006", outline: "#78350f", cardFrom: "#f59e0b", cardTo: "#b45309" },
];

// カノン実 ID → 推奨パレットインデックスのマッピング（原作の見た目に近い色）
// 一覧に無い ID はシードから選択される
export const CANON_PALETTE_INDEX: Record<string, number> = {
  // パラミシア
  "gomu-gomu": 0, // 紫
  "bara-bara": 1, // ピンク（バギー実）
  "sube-sube": 6, // 灰
  "bomu-bomu": 5, // 茶
  "kiro-kiro": 5, // 茶
  "hana-hana": 2, // 赤紫→赤
  "doru-doru": 6, // 灰
  "baku-baku": 0, // 紫
  "mane-mane": 0, // 紫
  "supa-supa": 6, // 灰
  "yomi-yomi": 6, // 灰
  "horo-horo": 0, // 紫
  "suke-suke": 6, // 灰
  "nikyu-nikyu": 1, // ピンク
  "doa-doa": 3, // 青
  "awa-awa": 7, // ティール
  "gura-gura": 4, // 緑（厳密には紫だが多様化）
  "noro-noro": 0, // 紫
  "doku-doku": 0, // 紫
  "ope-ope": 2, // 赤
  "mero-mero": 1, // ピンク
  "fuwa-fuwa": 7, // ティール
  "ito-ito": 7, // 青系
  // ロギア（実在の色に近い）
  "moku-moku": 4, // 灰白
  "mera-mera": 1, // 赤橙
  "suna-suna": 6, // 砂色
  "goro-goro": 2, // 黄
  "hie-hie": 0, // 青
  "pika-pika": 2, // 黄
  "magu-magu": 1, // 赤橙
  "yami-yami": 3, // 黒
  "gasu-gasu": 5, // 緑
  "yuki-yuki": 4, // 灰白
  // ゾオン
  "hito-hito": 0, // 赤
  "tori-tori-falcon": 1, // オレンジ
  "neko-neko-leopard": 5, // 暗赤
  "uo-uo-seiryu": 6, // 青緑
  "tori-tori-phoenix": 1, // オレンジ
  "hito-hito-nika": 1, // オレンジ（ニカ）
  "ryu-ryu-pteranodon": 2, // 茶
  "zou-zou-mammoth": 2, // 茶
  "inu-inu-jackal": 3, // 黄褐色
  "uma-uma": 0, // 赤
};

export function getPalette(
  type: "paramecia" | "zoan" | "logia",
  paletteIndex: number
): Palette {
  const pals =
    type === "paramecia"
      ? PARAMECIA_PALETTES
      : type === "zoan"
      ? ZOAN_PALETTES
      : LOGIA_PALETTES;
  return pals[paletteIndex % pals.length];
}

export function paletteCount(type: "paramecia" | "zoan" | "logia"): number {
  return type === "paramecia"
    ? PARAMECIA_PALETTES.length
    : type === "zoan"
    ? ZOAN_PALETTES.length
    : LOGIA_PALETTES.length;
}
