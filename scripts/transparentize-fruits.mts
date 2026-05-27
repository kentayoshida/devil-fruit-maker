// public/fruits/*.png の白背景を透過化する。生成済みファイルへの後処理用。
// 使い方: npm run transparentize-fruits

import sharp from "sharp";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(ROOT, "public", "fruits");

async function whitenToTransparent(input: Buffer): Promise<Buffer> {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minRGB = Math.min(r, g, b);
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

const files = readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".png"));
console.log(`📁 ${files.length} files in ${OUTPUT_DIR}`);

let ok = 0;
for (const fname of files) {
  const path = join(OUTPUT_DIR, fname);
  const buf = readFileSync(path);
  // 既に透過済みかチェック（中央でなく端のピクセルがアルファ0なら）
  const meta = await sharp(buf).metadata();
  const probe = await sharp(buf)
    .extract({ left: 2, top: 2, width: 2, height: 2 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = probe.info.channels;
  const alpha = ch === 4 ? probe.data[3] : 255;
  if (alpha === 0) {
    process.stdout.write(`⏭  ${fname} (already transparent)\n`);
    continue;
  }
  const out = await whitenToTransparent(buf);
  writeFileSync(path, out);
  process.stdout.write(`✓  ${fname.padEnd(28)} ${meta.width}x${meta.height} → ${(out.length / 1024).toFixed(0)} KB\n`);
  ok++;
}
console.log(`\n✅ ${ok} files processed`);
