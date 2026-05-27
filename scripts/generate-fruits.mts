// Imagen 4 Standard を呼び出して悪魔の実画像を事前生成するスクリプト
//
// 使い方:
//   1. プロジェクトルートに .env.local を作成: GEMINI_API_KEY=xxxxx
//   2. npm run generate-fruits                          # 既存はスキップ、未生成のみ
//   3. npm run generate-fruits -- --sample              # サンプル5枚だけ
//   4. npm run generate-fruits -- --only gomu-gomu,mera-mera
//   5. npm run generate-fruits -- --force               # 既存も上書き
//
// 生成物: public/fruits/{id}.png (512x512)

import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { GENERATED_FRUITS, type GeneratedFruit, type Shape } from "../src/data/generated-fruits";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(ROOT, "public", "fruits");
const ENV_FILE = join(ROOT, ".env.local");

// --- .env.local 読み込み ---
function loadEnv() {
  if (!existsSync(ENV_FILE)) {
    console.error(`❌ .env.local が見つかりません: ${ENV_FILE}`);
    console.error("   GEMINI_API_KEY=xxxxx の1行を書いてください");
    process.exit(1);
  }
  const lines = readFileSync(ENV_FILE, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"]+)"?\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}
loadEnv();

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY が未設定です");
  process.exit(1);
}

// --- CLI 引数 ---
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const SAMPLE = args.includes("--sample");
const ONLY_IDX = args.indexOf("--only");
const ONLY_IDS = ONLY_IDX !== -1 ? args[ONLY_IDX + 1].split(",") : null;

// --- 出力ディレクトリ ---
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`📋 ${GENERATED_FRUITS.length} 個の実をロード`);

// --- プロンプトビルダー ---
const SHAPE_DESC: Record<Shape, string> = {
  sphere: "a perfectly round spherical shape, like a smooth orb",
  apple: "an apple-like shape, slightly squat with a soft top indentation",
  pear: "a tear-drop pear shape, narrow at the top and bulbous at the bottom",
  heart: "a clear heart shape with two upper lobes meeting at a point at the bottom",
  "grape-cluster": "a cluster of several round bulbs joined together like a grape bunch",
  spiked: "a spiky, jagged silhouette with multiple sharp protrusions around the body",
  egg: "a smooth oval egg shape",
  mushroom: "a mushroom shape with a wide rounded cap and a short stubby stem",
  banana: "a curved crescent banana shape",
  starfruit: "a star-fruit shape with five distinct ridged lobes",
  cube: "a soft rounded-corner cube or boxy shape",
  fang: "a curved fang or tooth-like shape with a pointed tip",
  fan: "a flat folding-fan shape, wide at the top and narrow at the base",
  lantern: "a paper-lantern shape, tall and rounded with subtle vertical ribs",
  "spiral-shell": "a spiral seashell shape with concentric whorls",
  "twin-lobed": "a peach-like twin-lobed shape with a central cleft",
};

// 系統ごとの特徴ヒント。3タイプの「らしさ」を画像に反映させる
const TYPE_HINT: Record<GeneratedFruit["type"], string> = {
  // パラミシア（超人系）: 多様な形と色、奇異で抽象的な印象
  paramecia:
    "The fruit has a peculiar mystical aura, abstract and otherworldly, with no animal or elemental traits.",
  // ゾオン（動物系）: 動物の体の一部を連想させる微細なディテール
  zoan:
    "The surface subtly hints at animal anatomy through texture details (such as fine scales, fur-like fuzz, ridged horns, ear-shaped bumps, or claw-like protrusions) while keeping the overall fruit silhouette.",
  // ロギア（自然系）: 自然要素のテクスチャ・素材感
  logia:
    "The body looks as if literally made of a natural element matching its color (flickering flames, frosted ice crystals, drifting mist, jagged lightning, sandy grains, or stormy clouds) integrated seamlessly into the figurine surface.",
};

function buildPrompt(f: GeneratedFruit): string {
  const shapeDesc = SHAPE_DESC[f.visual.shape] ?? "a rounded shape";
  const accent = f.visual.accent ? `, ${f.visual.accent}` : "";
  return [
    `A stylized fantasy fruit collectible figurine, photographed on a pure plain white background.`,
    `Shape: ${shapeDesc}.`,
    `Color: ${f.visual.color} body${accent}.`,
    `Surface: smooth glossy material entirely covered with deep embossed swirling spiral pattern repeating across the whole body.`,
    `The spirals look like grooves carved into the surface, creating a tactile relief texture.`,
    TYPE_HINT[f.type],
    `Top: a single short curly green vine-like stem with one small tendril curl.`,
    `Lighting: soft top-left studio light producing gentle highlights and clean shadows.`,
    `Style: high-quality 3D rendered figurine, clean aesthetic, anime-influenced fan art.`,
    `Composition: centered single object filling about 75% of frame, no other elements.`,
    `Strictly no text, no logos, no characters, no human, no background scenery, only the fruit.`,
  ].join(" ");
}

// --- ターゲット決定 ---
let targets: GeneratedFruit[] = GENERATED_FRUITS;
if (ONLY_IDS) {
  targets = targets.filter((f) => ONLY_IDS.includes(f.id));
} else if (SAMPLE) {
  // 3系統 + 形バリエーション
  const sampleIds = [
    "gomu-gomu",     // パラミシア sphere 紫 legendary
    "mera-mera",     // ロギア spiked 赤橙 rare
    "ope-ope",       // パラミシア heart 赤 legendary
    "uo-uo-seiryu",  // ゾオン spiral 青緑 legendary
    "hito-hito",     // ゾオン mushroom 赤 uncommon
  ];
  targets = targets.filter((f) => sampleIds.includes(f.id));
}

console.log(`🎯 生成対象: ${targets.length} 個`);

// --- 白背景 → 透過 PNG ---
// 明るい白に近い画素を完全透過、グレー領域をなだらかに半透明化
// (Imagen の白背景は完全な #ffffff ではなくアンチエイリアスのグレー縁取りあり)
async function whitenToTransparent(input: Buffer): Promise<Buffer> {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels; // 4 expected
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minRGB = Math.min(r, g, b);
    // 白に近いほど透明、純色は不変
    // minRGB が 240 以上で完全透明、220 以下で不変、その間は線形
    if (minRGB >= 240) {
      data[i + 3] = 0;
    } else if (minRGB > 220) {
      const t = (minRGB - 220) / 20; // 0..1
      data[i + 3] = Math.round(data[i + 3] * (1 - t));
    }
  }
  return await sharp(data, {
    raw: { width: info.width, height: info.height, channels: ch as 1 | 2 | 3 | 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// --- AI クライアント ---
const ai = new GoogleGenAI({ apiKey });
const MODEL = "imagen-4.0-generate-001"; // Imagen 4 Standard

let okCount = 0;
let skipCount = 0;
let failCount = 0;

for (const f of targets) {
  const outFile = join(OUTPUT_DIR, `${f.id}.png`);
  if (existsSync(outFile) && !FORCE) {
    console.log(`⏭  skip ${f.id} (already exists)`);
    skipCount++;
    continue;
  }
  const prompt = buildPrompt(f);
  process.stdout.write(`🎨 ${f.id.padEnd(22)} (${f.visual.shape.padEnd(14)} / ${f.visual.color.slice(0, 30).padEnd(30)}) ... `);
  try {
    const response = await ai.models.generateImages({
      model: MODEL,
      prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "1:1",
      },
    });
    const imgB64 = response?.generatedImages?.[0]?.image?.imageBytes;
    if (!imgB64) throw new Error("no image bytes in response");
    const buf = Buffer.from(imgB64, "base64");
    // 1024→512 にリサイズ → 白背景を透過化
    const resizedBuf = await sharp(buf).resize(512, 512).png().toBuffer();
    const transparent = await whitenToTransparent(resizedBuf);
    writeFileSync(outFile, transparent);
    process.stdout.write(`✓ ${(transparent.length / 1024).toFixed(0)} KB\n`);
    okCount++;
    // ふんわりレート制限
    await new Promise((r) => setTimeout(r, 400));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    process.stdout.write(`✗ ${msg}\n`);
    failCount++;
  }
}

console.log("");
console.log(`✅ 完了: ${okCount} 作成 / ${skipCount} スキップ / ${failCount} 失敗`);
console.log(`📁 ${OUTPUT_DIR}`);
