// 名前から悪魔の実を決定するロジック
// - 名前ハッシュをシードに、決定的にタイプ・カノン/オリジナル選択・具体の実を決める
// - salt（リロール）で別の結果に切り替えられる
// - 全候補は事前生成済みの 70 種から選択。画像パスも返却

import {
  GENERATED_FRUITS,
  type GeneratedFruit,
} from "@/data/generated-fruits";
import type { FruitType } from "@/data/fruits";
import { hashName, SeededRandom } from "@/lib/hash";

export interface MatchResult {
  id: string;
  source: "canon" | "original";
  type: FruitType;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  name: { ja: string; en: string };
  ability: { ja: string; en: string };
  user?: string;
  paletteIndex: number;
  /** 画像のパス（public 配下からの絶対パス） */
  imagePath: string;
}

// タイプ比率: パラミシア 70 / ゾオン 20 / ロギア 10（原作に忠実）
const TYPE_WEIGHTS: { value: FruitType; weight: number }[] = [
  { value: "paramecia", weight: 70 },
  { value: "zoan", weight: 20 },
  { value: "logia", weight: 10 },
];

// カノン:オリジナル = 25:75
const CANON_PROBABILITY = 0.25;

// 系統 × source ごとに事前計算（実行時の filter コスト削減）
const POOLS: Record<FruitType, { canon: GeneratedFruit[]; original: GeneratedFruit[] }> = {
  paramecia: { canon: [], original: [] },
  zoan: { canon: [], original: [] },
  logia: { canon: [], original: [] },
};
for (const f of GENERATED_FRUITS) {
  POOLS[f.type][f.source].push(f);
}

export function matchFruit(name: string, reroll: number = 0): MatchResult {
  const seed = hashName(name, reroll);
  const rng = new SeededRandom(seed);

  // 1) タイプ決定
  const type = rng.weightedPick(TYPE_WEIGHTS);

  // 2) source 決定（候補が無ければ反対側へフォールバック）
  let source: "canon" | "original" = rng.next() < CANON_PROBABILITY ? "canon" : "original";
  if (POOLS[type][source].length === 0) {
    source = source === "canon" ? "original" : "canon";
  }

  // 3) ID選択
  const fruit = rng.pick(POOLS[type][source]);
  return toResult(fruit);
}

function toResult(f: GeneratedFruit): MatchResult {
  return {
    id: f.id,
    source: f.source,
    type: f.type,
    rarity: f.rarity,
    name: f.name,
    ability: f.ability,
    user: f.user,
    paletteIndex: f.paletteIndex,
    imagePath: `/fruits/${f.id}.png`,
  };
}
