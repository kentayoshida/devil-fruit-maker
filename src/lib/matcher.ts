// 名前から悪魔の実を決定するロジック
// - 名前ハッシュをシードに、決定的にタイプ・カノン/オリジナル選択・具体の実を決める
// - salt（リロール）で別の結果に切り替えられる

import { CANON_FRUITS, type CanonFruit, type FruitType } from "@/data/fruits";
import {
  PARAMECIA_STEMS,
  ZOAN_STEMS,
  LOGIA_STEMS,
  type Stem,
} from "@/data/stems";
import { CANON_PALETTE_INDEX, paletteCount } from "@/data/palettes";
import { hashName, SeededRandom } from "@/lib/hash";

export interface MatchResult {
  source: "canon" | "original";
  type: FruitType;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  name: { ja: string; en: string };
  ability: { ja: string; en: string };
  user?: string; // カノンのときのみ
  /** カラーパレットのインデックス（系統内） */
  paletteIndex: number;
}

// タイプ比率: パラミシア 70% / ゾオン 20% / ロギア 10%（原作に忠実）
const TYPE_WEIGHTS: { value: FruitType; weight: number }[] = [
  { value: "paramecia", weight: 70 },
  { value: "zoan", weight: 20 },
  { value: "logia", weight: 10 },
];

// カノン vs オリジナルの比率（オリジナル多めにして「自分専用」感を出す）
const CANON_PROBABILITY = 0.25; // 25%で実在の実、75%でオリジナル

export function matchFruit(name: string, reroll: number = 0): MatchResult {
  const seed = hashName(name, reroll);
  const rng = new SeededRandom(seed);

  // 1) タイプ決定
  const type = rng.weightedPick(TYPE_WEIGHTS);

  // 2) カノン or オリジナル
  const useCanon = rng.next() < CANON_PROBABILITY;

  if (useCanon) {
    const canonOfType = CANON_FRUITS.filter((f) => f.type === type);
    if (canonOfType.length > 0) {
      const fruit = rng.pick(canonOfType);
      return canonToResult(fruit, rng);
    }
    // 該当タイプのカノンが無ければオリジナルにフォールバック
  }

  // 3) オリジナル生成
  return generateOriginal(type, rng);
}

function canonToResult(f: CanonFruit, rng: SeededRandom): MatchResult {
  // カノン実は ID で固定色、無ければシードから
  const idx =
    CANON_PALETTE_INDEX[f.id] ?? rng.nextInt(paletteCount(f.type));
  return {
    source: "canon",
    type: f.type,
    rarity: f.rarity,
    name: f.name,
    ability: f.ability,
    user: f.user,
    paletteIndex: idx,
  };
}

function generateOriginal(type: FruitType, rng: SeededRandom): MatchResult {
  const stems: readonly Stem[] =
    type === "paramecia"
      ? PARAMECIA_STEMS
      : type === "zoan"
      ? ZOAN_STEMS
      : LOGIA_STEMS;

  const stem = rng.pick(stems);

  // 名称組み立て
  // パラミシア/ロギア: "○○○○の実" / "○○-○○ Fruit"
  // ゾオン: モデル付きの場合は "○○○○の実 モデル：xxx" / "○○-○○ Fruit, Model: xxx"
  const ja = formatJa(type, stem);
  const en = formatEn(type, stem);

  // レア度: ロギアは rare 以上、幻獣・古代種は legendary、それ以外は uncommon〜rare
  const rarity = determineOriginalRarity(type, stem, rng);

  // オリジナルはシードからパレットを選ぶ
  const paletteIndex = rng.nextInt(paletteCount(type));

  return {
    source: "original",
    type,
    rarity,
    name: { ja, en },
    ability: stem.ability,
    paletteIndex,
  };
}

function formatJa(type: FruitType, stem: Stem): string {
  if (type === "zoan" && stem.ja.includes(" モデル：")) {
    // "リュウ モデル：ティラノサウルス" → "リュウリュウの実 モデル：ティラノサウルス"
    const [base, model] = stem.ja.split(" モデル：");
    return `${base}${base}の実 モデル：${model}`;
  }
  return `${stem.ja}${stem.ja}の実`;
}

function formatEn(type: FruitType, stem: Stem): string {
  if (type === "zoan" && stem.en.includes(", Model: ")) {
    const [base, model] = stem.en.split(", Model: ");
    return `${base}-${base} Fruit, Model: ${model}`;
  }
  return `${stem.en}-${stem.en} Fruit`;
}

function determineOriginalRarity(
  type: FruitType,
  stem: Stem,
  rng: SeededRandom
): MatchResult["rarity"] {
  if (type === "zoan") {
    if (stem.ja.includes("モデル：")) {
      const isMythical =
        stem.ja.includes("ケルベロス") ||
        stem.ja.includes("ペガサス") ||
        stem.ja.includes("ヤマタノオロチ") ||
        stem.ja.includes("朱雀") ||
        stem.ja.includes("白龍") ||
        stem.ja.includes("化け猫");
      return isMythical ? "legendary" : "rare";
    }
    // 通常ゾオン
    return rng.next() < 0.3 ? "rare" : "uncommon";
  }
  if (type === "logia") {
    return rng.next() < 0.3 ? "legendary" : "rare";
  }
  // パラミシア
  const r = rng.next();
  if (r < 0.05) return "legendary";
  if (r < 0.25) return "rare";
  if (r < 0.65) return "uncommon";
  return "common";
}
