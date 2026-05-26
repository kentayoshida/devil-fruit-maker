// オリジナル悪魔の実生成用の語幹データ
// 系統ごとに「○○ + ○○ + の実」の○○部分の候補と、それに対応する効能テンプレートを定義

export interface Stem {
  ja: string; // 例: "キラ" → キラキラの実
  en: string; // 例: "Sparkle" → Sparkle-Sparkle Fruit
  ability: { ja: string; en: string };
}

// パラミシア（超人系）— 多様な物質・現象・抽象概念
export const PARAMECIA_STEMS: Stem[] = [
  {
    ja: "キラ", en: "Sparkle",
    ability: {
      ja: "全身から眩い輝きを放ち、相手の視界を奪う。",
      en: "Emit blinding sparkles that overwhelm your enemy's sight.",
    },
  },
  {
    ja: "モチ", en: "Mochi",
    ability: {
      ja: "全身を餅に変え、伸びる粘着体で相手を絡め取る。",
      en: "Become stretchy, sticky mochi that ensnares anything it touches.",
    },
  },
  {
    ja: "ペタ", en: "Stick",
    ability: {
      ja: "触れた物体を自在にくっつけたり剥がしたりできる。",
      en: "Stick and unstick anything you touch at will.",
    },
  },
  {
    ja: "コロ", en: "Roll",
    ability: {
      ja: "あらゆる物体を勝手に転がし、慣性を自由に操る。",
      en: "Send any object rolling on its own and bend inertia to your will.",
    },
  },
  {
    ja: "ヒラ", en: "Flutter",
    ability: {
      ja: "体を紙のように薄く軽くし、風に乗って漂う。",
      en: "Flatten your body like paper and ride the wind.",
    },
  },
  {
    ja: "ジワ", en: "Seep",
    ability: {
      ja: "あらゆる隙間から染み込むように移動できる。",
      en: "Seep through any crack like water finding its way.",
    },
  },
  {
    ja: "クル", en: "Spin",
    ability: {
      ja: "あらゆる物を渦のように回転させ、巻き込む。",
      en: "Spin anything into a vortex that drags everything in.",
    },
  },
  {
    ja: "ピン", en: "Snap",
    ability: {
      ja: "指先で弾いた衝撃を増幅して打撃に変える。",
      en: "Amplify any finger-flick into a devastating strike.",
    },
  },
  {
    ja: "シズ", en: "Hush",
    ability: {
      ja: "周囲のあらゆる音を消し去り、無音の戦場を作る。",
      en: "Silence every sound around you and create a battlefield of stillness.",
    },
  },
  {
    ja: "カガ", en: "Mirror",
    ability: {
      ja: "あらゆる表面を鏡にして、行き来できる空間を作る。",
      en: "Turn any surface into a mirror you can step through.",
    },
  },
  {
    ja: "コト", en: "Word",
    ability: {
      ja: "発した言葉を実体化させ、文字の塊として相手に叩き込む。",
      en: "Materialize spoken words and hurl them at foes as solid letters.",
    },
  },
  {
    ja: "オモ", en: "Memo",
    ability: {
      ja: "触れた相手の記憶を一時的に書き換えられる。",
      en: "Temporarily rewrite the memories of anyone you touch.",
    },
  },
  {
    ja: "ミガ", en: "Polish",
    ability: {
      ja: "触れた物を磨き上げ、刃や鎧として強化する。",
      en: "Polish anything you touch into a blade or armor.",
    },
  },
  {
    ja: "シャ", en: "Shutter",
    ability: {
      ja: "視界を写真として固定し、瞬間を切り取って攻撃に変える。",
      en: "Freeze moments like photographs and hurl them back as attacks.",
    },
  },
  {
    ja: "カミ", en: "Paper",
    ability: {
      ja: "あらゆる物を紙に変え、自在に折って武器化する。",
      en: "Turn anything into paper and fold it into weapons.",
    },
  },
  {
    ja: "ハネ", en: "Spring",
    ability: {
      ja: "触れた箇所をバネに変え、相手を弾き飛ばす。",
      en: "Turn anything you touch into a spring that launches its target.",
    },
  },
  {
    ja: "ヌキ", en: "Pull",
    ability: {
      ja: "あらゆる物の中心部だけを抜き取って空洞にできる。",
      en: "Extract the core of anything, leaving only a hollow shell.",
    },
  },
  {
    ja: "ツナ", en: "Link",
    ability: {
      ja: "離れた2点を糸でつなぎ、距離を無視して引き寄せられる。",
      en: "Tether two distant points with a thread and reel them together instantly.",
    },
  },
  {
    ja: "オリ", en: "Cage",
    ability: {
      ja: "視線を向けた空間に檻を生み出して相手を閉じ込められる。",
      en: "Conjure cages in any space you gaze upon, trapping foes inside.",
    },
  },
  {
    ja: "ツヤ", en: "Gloss",
    ability: {
      ja: "あらゆる物を艶やかにし、攻撃を滑らせて受け流す。",
      en: "Coat anything in a gloss so smooth that attacks slide right off.",
    },
  },
  {
    ja: "シミ", en: "Stain",
    ability: {
      ja: "触れた相手にシミを残し、シミを通じて遠隔操作できる。",
      en: "Leave stains on foes and control them remotely through those marks.",
    },
  },
  {
    ja: "ナミ", en: "Wave",
    ability: {
      ja: "空気を波打たせて衝撃波を放ち、遠距離まで届かせる。",
      en: "Ripple the air into long-range shockwaves.",
    },
  },
  {
    ja: "ホシ", en: "Star",
    ability: {
      ja: "空中に小さな星を浮かべて、戦況を見渡せる位置から狙撃する。",
      en: "Float tiny stars overhead and snipe from a bird's-eye view.",
    },
  },
  {
    ja: "ユメ", en: "Dream",
    ability: {
      ja: "触れた相手を夢の世界に閉じ込め、現実から切り離す。",
      en: "Trap foes inside a dream and sever them from reality.",
    },
  },
  {
    ja: "オト", en: "Tone",
    ability: {
      ja: "音を物質化して衝撃に変え、振動で相手を打ち砕く。",
      en: "Materialize sound into shockwaves that pulverize from afar.",
    },
  },
  {
    ja: "ナワ", en: "Rope",
    ability: {
      ja: "見えないロープを生成し、空間を移動・捕縛できる。",
      en: "Spin invisible ropes for swinging through space or binding foes.",
    },
  },
  {
    ja: "ハコ", en: "Box",
    ability: {
      ja: "あらゆる物を箱に圧縮して仕舞い、好きな場所に取り出せる。",
      en: "Pack anything into a box and unpack it anywhere later.",
    },
  },
  {
    ja: "メモ", en: "Note",
    ability: {
      ja: "書いた内容を現実に反映させる、ノートそのものの能力。",
      en: "Anything you write into your notebook becomes reality.",
    },
  },
  {
    ja: "オク", en: "Send",
    ability: {
      ja: "触れた物を瞬時に遠隔地へ転送できる配送能力。",
      en: "Teleport anything you touch to a chosen distant location.",
    },
  },
  {
    ja: "シゴ", en: "Task",
    ability: {
      ja: "相手に「仕事」を強制し、達成するまで他の行動を取れなくする。",
      en: "Assign tasks to foes—they can do nothing else until the job is done.",
    },
  },
];

// ゾオン（動物系）— 動物名
export const ZOAN_STEMS: Stem[] = [
  // 通常種
  { ja: "サル", en: "Monkey",
    ability: { ja: "猿に変身し、樹上戦と知恵を兼ね備える。", en: "Become a monkey—agile in trees and clever in tactics." } },
  { ja: "クマ", en: "Bear",
    ability: { ja: "巨大な熊に変身し、圧倒的な腕力を得る。", en: "Become a massive bear with overpowering strength." } },
  { ja: "ワニ", en: "Crocodile",
    ability: { ja: "鰐に変身し、強靱な顎で何でも噛み砕く。", en: "Become a crocodile whose jaws crush anything." } },
  { ja: "サメ", en: "Shark",
    ability: { ja: "鮫に変身し、水中での圧倒的な俊敏さを得る。", en: "Become a shark, unmatched in speed beneath the waves." } },
  { ja: "オオカミ", en: "Wolf",
    ability: { ja: "狼に変身し、集団戦術と鋭い嗅覚を得る。", en: "Become a wolf—pack tactics and a piercing sense of smell." } },
  { ja: "ウサギ", en: "Rabbit",
    ability: { ja: "兎に変身し、爆発的な跳躍力を得る。", en: "Become a rabbit with explosive leaping power." } },
  { ja: "タカ", en: "Hawk",
    ability: { ja: "鷹に変身し、上空からの完璧な視野を得る。", en: "Become a hawk with perfect aerial vision." } },
  { ja: "フクロウ", en: "Owl",
    ability: { ja: "梟に変身し、闇夜と静寂を支配する。", en: "Become an owl, master of darkness and silence." } },
  { ja: "ライオン", en: "Lion",
    ability: { ja: "獅子に変身し、王者の威圧と爪を得る。", en: "Become a lion with regal presence and lethal claws." } },
  { ja: "トラ", en: "Tiger",
    ability: { ja: "虎に変身し、一撃必殺の前足を振るう。", en: "Become a tiger with a forepaw that ends fights in one blow." } },
  // 古代種
  { ja: "リュウ モデル：ティラノサウルス", en: "Dragon, Model: Tyrannosaurus",
    ability: { ja: "ティラノサウルスに変身し、古代の王として君臨する。", en: "Become a Tyrannosaurus, prehistoric king of the apex." } },
  { ja: "ウオ モデル：メガロドン", en: "Fish, Model: Megalodon",
    ability: { ja: "古代鮫メガロドンに変身し、海の覇者となる。", en: "Become a Megalodon and rule the ancient seas." } },
  { ja: "リュウ モデル：トリケラトプス", en: "Dragon, Model: Triceratops",
    ability: { ja: "トリケラトプスに変身し、三本角で全てを貫く。", en: "Become a Triceratops, charging with three impaling horns." } },
  // 幻獣種
  { ja: "イヌ モデル：ケルベロス", en: "Dog, Model: Cerberus",
    ability: { ja: "三つ首の地獄の番犬ケルベロスに変身する。", en: "Become Cerberus, three-headed guardian of the underworld." } },
  { ja: "ウマ モデル：ペガサス", en: "Horse, Model: Pegasus",
    ability: { ja: "翼ある天馬ペガサスに変身し、天空を駆ける。", en: "Become Pegasus, the winged horse that rides the heavens." } },
  { ja: "ヘビ モデル：ヤマタノオロチ", en: "Snake, Model: Yamata-no-Orochi",
    ability: { ja: "八岐大蛇に変身し、八つの首で全方位を制圧する。", en: "Become Yamata-no-Orochi, eight-headed serpent of legend." } },
  { ja: "トリ モデル：朱雀", en: "Bird, Model: Vermilion Bird",
    ability: { ja: "南方を守る朱雀に変身し、紅蓮の翼で空を焼く。", en: "Become the Vermilion Bird and scorch the skies with crimson wings." } },
  { ja: "リュウ モデル：白龍", en: "Dragon, Model: White Dragon",
    ability: { ja: "白龍に変身し、雪と氷を従える神聖な存在となる。", en: "Become a White Dragon, sacred lord of snow and ice." } },
  { ja: "ネコ モデル：化け猫", en: "Cat, Model: Bakeneko",
    ability: { ja: "妖怪化け猫に変身し、人を惑わす怪異の力を得る。", en: "Become a Bakeneko, mystical cat that bewilders humans." } },
];

// ロギア（自然系）— 自然現象・物質
export const LOGIA_STEMS: Stem[] = [
  { ja: "アメ", en: "Rain",
    ability: { ja: "全身を雨に変え、空から無数の雨粒として降り注ぐ。", en: "Become living rain, falling as countless drops from above." } },
  { ja: "カゼ", en: "Wind",
    ability: { ja: "全身を風に変え、姿無く全方位から吹き付ける。", en: "Become living wind, formless and striking from every direction." } },
  { ja: "ホノ", en: "Blaze",
    ability: { ja: "全身を青き焔に変え、より高温で対象を焼き尽くす。", en: "Become living blue blaze—hotter than mere flame." } },
  { ja: "イシ", en: "Stone",
    ability: { ja: "全身を石に変え、無類の防御と岩石攻撃を放つ。", en: "Become living stone—unbreakable defense and rolling assaults." } },
  { ja: "ミズ", en: "Water",
    ability: { ja: "全身を水流に変え、あらゆる場所に流れ込む。", en: "Become living water, flowing into every space." } },
  { ja: "クモ", en: "Cloud",
    ability: { ja: "全身を雲に変え、上空に潜み雷雨を呼ぶ。", en: "Become a living cloud—hide in the sky and call down storms." } },
  { ja: "ハイ", en: "Ash",
    ability: { ja: "全身を灰に変え、視界を奪う粉塵となって舞う。", en: "Become living ash, blinding clouds drifting on the air." } },
  { ja: "セキ", en: "Stoneblast",
    ability: { ja: "全身を礫に変え、衝撃でも砕けず鋭い破片を放つ。", en: "Become living shards—shatter-proof and razor-sharp." } },
  { ja: "ホシ", en: "Stardust",
    ability: { ja: "全身を星屑に変え、宇宙塵となって降り注ぐ。", en: "Become living stardust raining from above." } },
  { ja: "シオ", en: "Brine",
    ability: { ja: "全身を塩に変え、触れた水分を結晶化させる。", en: "Become living salt—crystallize any moisture you touch." } },
  { ja: "ナミ", en: "Tide",
    ability: { ja: "全身を潮流に変え、満ち引きを自在に操る。", en: "Become a living tide, summoning floods and ebbs." } },
  { ja: "カミナリ", en: "Thunderclap",
    ability: { ja: "全身を雷鳴に変え、音速の閃光となって駆ける。", en: "Become living thunder—a flash that travels at sound's speed." } },
];
