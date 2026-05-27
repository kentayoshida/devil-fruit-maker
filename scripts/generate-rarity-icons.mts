// 4つのレア度（common/uncommon/rare/legendary）バッジ画像を Imagen 4 で生成。
// public/rarity/{rarity}.png として保存（白背景は透過化）。
//
// 使い方:
//   npm run generate-rarity-icons              # 既存はスキップ
//   npm run generate-rarity-icons -- --force   # 上書き

import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(ROOT, "public", "rarity");
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

// 各レア度別の高品質バッジプロンプト。star count を強調して指示
const TARGETS: { id: string; prompt: string }[] = [
  {
    id: "common",
    prompt: [
      "A simple fantasy game rarity badge centered on a pure white background.",
      "Design: a single five-pointed star at the center, polished silver-gray finish,",
      "surrounded by a thin minimalist circular border.",
      "Color palette: muted cool silver, pale steel gray, very subtle highlights.",
      "Style: clean and understated, low-key, 3D rendered with soft shadows, simple gloss.",
      "Composition: single emblem filling about 75% of the frame, no text, no numbers, no characters.",
    ].join(" "),
  },
  {
    id: "uncommon",
    prompt: [
      "A fantasy game rarity badge centered on a pure white background.",
      "Design: exactly TWO identical five-pointed stars placed side by side at the center,",
      "with a thin ornamental circular border featuring small leaf-like accents.",
      "Color palette: vibrant emerald green and bright lime green with soft glowing sparkles.",
      "Style: 3D rendered emblem with glossy polished finish, gentle inner glow, more refined than common.",
      "Composition: single emblem filling about 80% of the frame, no text, no numbers, no characters.",
    ].join(" "),
  },
  {
    id: "rare",
    prompt: [
      "A fantasy game rarity badge centered on a pure white background.",
      "Design: exactly THREE five-pointed stars arranged in a gentle arc at the center,",
      "ornate circular border with crystal accents, soft light rays radiating outward.",
      "Color palette: brilliant sapphire blue, royal azure, electric cyan highlights.",
      "Style: high-quality 3D rendered emblem with glossy crystalline finish, prominent inner glow,",
      "magical and dignified, more elaborate than uncommon.",
      "Composition: single emblem filling about 80% of the frame, no text, no numbers, no characters.",
    ].join(" "),
  },
  {
    id: "legendary",
    prompt: [
      "A premium fantasy game rarity badge centered on a pure white background.",
      "Design: exactly FOUR brilliant five-pointed stars arranged in a crown formation at the center,",
      "intricate baroque circular border with ornate filigree, multiple light rays bursting outward,",
      "sparkles and prismatic flares scattered around.",
      "Color palette: rich golden yellow, warm amber, prismatic rainbow highlights with red and orange undertones.",
      "Style: top-tier 3D rendered emblem with intense glossy metallic finish, dramatic glow, opulent,",
      "the most elaborate and impressive of all rarity tiers.",
      "Composition: single emblem filling about 80% of the frame, no text, no numbers, no characters.",
    ].join(" "),
  },
];

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
