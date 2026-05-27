// 3タイプ（パラミシア/ゾオン/ロギア）のエンブレム画像を Imagen 4 で生成。
// public/types/{paramecia,zoan,logia}.png として保存（白背景は透過化）。
//
// 使い方:
//   npm run generate-type-icons              # 既存はスキップ
//   npm run generate-type-icons -- --force   # 上書き

import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(ROOT, "public", "types");
const ENV_FILE = join(ROOT, ".env.local");

if (!existsSync(ENV_FILE)) {
  console.error(`❌ .env.local が見つかりません`);
  process.exit(1);
}
for (const line of readFileSync(ENV_FILE, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"]+)"?\s*$/);
  if (m) process.env[m[1]] = m[2];
}
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY が未設定です");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// --- プロンプト ---
const TARGETS: { id: string; prompt: string }[] = [
  {
    id: "paramecia",
    prompt: [
      "A mystical fantasy emblem badge icon, centered on a pure white background.",
      "Theme: supernatural body manipulation and reality-bending powers.",
      "Design: ornamental circular crest with a bold swirling spiral motif at the center,",
      "rendered in rich royal violet, deep purple, and bright magenta hues with subtle pink highlights.",
      "Style: high-quality 3D rendered emblem with glossy metallic finish, fantasy game UI icon aesthetic,",
      "intricate ornamental edges, soft inner glow, elegant flowing curves.",
      "Composition: a single emblem filling about 80% of the frame, no text, no characters, no human.",
    ].join(" "),
  },
  {
    id: "zoan",
    prompt: [
      "A mystical fantasy emblem badge icon, centered on a pure white background.",
      "Theme: animalistic transformation, primal beast power.",
      "Design: ornamental circular crest featuring stylized animal motifs such as fangs, claws, or fierce silhouette",
      "abstracted into ornamental curves, rendered in fiery orange, deep crimson, and warm amber hues.",
      "Style: high-quality 3D rendered emblem with glossy metallic finish, dynamic and powerful, fantasy game UI icon aesthetic,",
      "bold ornamental edges, inner heat glow, primal energy.",
      "Composition: a single emblem filling about 80% of the frame, no text, no characters, no human.",
    ].join(" "),
  },
  {
    id: "logia",
    prompt: [
      "A mystical fantasy emblem badge icon, centered on a pure white background.",
      "Theme: elemental nature mastery (flames, lightning, mist, water, wind).",
      "Design: ornamental circular crest with swirling elemental motifs blending wind currents, lightning bolts, and water waves",
      "in vibrant azure blue, electric cyan, and accent gold hues.",
      "Style: high-quality 3D rendered emblem with glossy crystalline finish, ethereal mystical glow, fantasy game UI icon aesthetic,",
      "elegant ornamental edges, radiant inner light, atmospheric.",
      "Composition: a single emblem filling about 80% of the frame, no text, no characters, no human.",
    ].join(" "),
  },
];

// --- 白→透過 ---
async function whitenToTransparent(input: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const minRGB = Math.min(data[i], data[i + 1], data[i + 2]);
    if (minRGB >= 240) {
      data[i + 3] = 0;
    } else if (minRGB > 220) {
      const t = (minRGB - 220) / 20;
      data[i + 3] = Math.round(data[i + 3] * (1 - t));
    }
  }
  return await sharp(data, {
    raw: { width: info.width, height: info.height, channels: ch as 1 | 2 | 3 | 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const ai = new GoogleGenAI({ apiKey });
const MODEL = "imagen-4.0-generate-001";

for (const t of TARGETS) {
  const outFile = join(OUTPUT_DIR, `${t.id}.png`);
  if (existsSync(outFile) && !FORCE) {
    console.log(`⏭  skip ${t.id} (already exists)`);
    continue;
  }
  process.stdout.write(`🎨 ${t.id.padEnd(10)} ... `);
  try {
    const response = await ai.models.generateImages({
      model: MODEL,
      prompt: t.prompt,
      config: { numberOfImages: 1, aspectRatio: "1:1" },
    });
    const imgB64 = response?.generatedImages?.[0]?.image?.imageBytes;
    if (!imgB64) throw new Error("no image bytes");
    const buf = Buffer.from(imgB64, "base64");
    const resized = await sharp(buf).resize(640, 640).png().toBuffer();
    const transparent = await whitenToTransparent(resized);
    writeFileSync(outFile, transparent);
    process.stdout.write(`✓ ${(transparent.length / 1024).toFixed(0)} KB\n`);
    await new Promise((r) => setTimeout(r, 400));
  } catch (err) {
    process.stdout.write(`✗ ${err instanceof Error ? err.message : err}\n`);
  }
}

console.log(`\n📁 ${OUTPUT_DIR}`);
