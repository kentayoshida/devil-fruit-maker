// 原作カノンの悪魔の実データ（ファン向け参考データ）
// 日英表記は VIZ Media 公式英訳および一般的なファン表記に基づく
// 効能説明は原作描写を簡潔に要約したもの

export type FruitType = "paramecia" | "zoan" | "logia";
export type ZoanModel =
  | "carnivorous"
  | "ancient"
  | "mythical"
  | null; // ゾオン以外は null

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export interface CanonFruit {
  id: string;
  type: FruitType;
  zoanModel?: ZoanModel;
  rarity: Rarity;
  name: { ja: string; en: string };
  ability: { ja: string; en: string };
  // 主要な使い手（参考）
  user?: string;
}

export const CANON_FRUITS: CanonFruit[] = [
  // === パラミシア（超人系） ===
  {
    id: "gomu-gomu",
    type: "paramecia",
    rarity: "legendary",
    name: { ja: "ゴムゴムの実", en: "Gum-Gum Fruit" },
    ability: {
      ja: "全身がゴムのように伸び縮みする。打撃・銃弾を受け流す。",
      en: "Your body stretches and rebounds like rubber, deflecting bullets and blunt force.",
    },
    user: "モンキー・D・ルフィ",
  },
  {
    id: "bara-bara",
    type: "paramecia",
    rarity: "common",
    name: { ja: "バラバラの実", en: "Chop-Chop Fruit" },
    ability: {
      ja: "体をバラバラに分離させ、空中で自在に操れる。斬撃が効かない。",
      en: "Split your body into floating parts that you can control freely. Slashes pass through you.",
    },
    user: "バギー",
  },
  {
    id: "sube-sube",
    type: "paramecia",
    rarity: "common",
    name: { ja: "スベスベの実", en: "Smooth-Smooth Fruit" },
    ability: {
      ja: "肌がツルツルになり、あらゆる攻撃を滑らせて受け流す。",
      en: "Your skin becomes so slippery that attacks slide off harmlessly.",
    },
    user: "アルビダ",
  },
  {
    id: "bomu-bomu",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "ボムボムの実", en: "Bomb-Bomb Fruit" },
    ability: {
      ja: "体のあらゆる部分を爆発させられる。本人は爆発に耐性がある。",
      en: "Detonate any part of your body at will. You're immune to your own blasts.",
    },
    user: "Mr.5",
  },
  {
    id: "kiro-kiro",
    type: "paramecia",
    rarity: "common",
    name: { ja: "キロキロの実", en: "Kilo-Kilo Fruit" },
    ability: {
      ja: "1〜10000kgまで体重を自在に変化させられる。",
      en: "Change your body weight at will, anywhere from 1 to 10,000 kg.",
    },
    user: "ミス・バレンタイン",
  },
  {
    id: "hana-hana",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "ハナハナの実", en: "Flower-Flower Fruit" },
    ability: {
      ja: "体のどんな部分も、どんな場所にでも花のように咲かせられる。",
      en: "Sprout copies of any body part anywhere within sight, like blooming flowers.",
    },
    user: "ニコ・ロビン",
  },
  {
    id: "doru-doru",
    type: "paramecia",
    rarity: "common",
    name: { ja: "ドルドルの実", en: "Wax-Wax Fruit" },
    ability: {
      ja: "体から鋼鉄並みに硬化するロウを無限に生成できる。",
      en: "Produce endless wax that hardens as strong as steel.",
    },
    user: "Mr.3",
  },
  {
    id: "baku-baku",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "バクバクの実", en: "Munch-Munch Fruit" },
    ability: {
      ja: "あらゆる物体を食べて、自分の体と一体化・武器化できる。",
      en: "Eat anything and fuse it with your body or weapons.",
    },
    user: "ワポル",
  },
  {
    id: "mane-mane",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "マネマネの実", en: "Clone-Clone Fruit" },
    ability: {
      ja: "右手で触れた相手の顔・体・声を完璧に模倣できる。",
      en: "Perfectly mimic the face, body, and voice of anyone your right hand has touched.",
    },
    user: "Mr.2 ボン・クレー",
  },
  {
    id: "supa-supa",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "スパスパの実", en: "Dice-Dice Fruit" },
    ability: {
      ja: "全身を刃物に変えられる人間刃物。鋼鉄をも切り裂く。",
      en: "Turn any part of your body into razor-sharp blades that cut through steel.",
    },
    user: "Mr.1",
  },
  {
    id: "yomi-yomi",
    type: "paramecia",
    rarity: "rare",
    name: { ja: "ヨミヨミの実", en: "Revive-Revive Fruit" },
    ability: {
      ja: "死後一度だけ魂を蘇らせ、また肉体を離れて行動できる。",
      en: "Resurrect once after death and later project your soul outside your body.",
    },
    user: "ブルック",
  },
  {
    id: "horo-horo",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "ホロホロの実", en: "Hollow-Hollow Fruit" },
    ability: {
      ja: "実体・空中浮遊・通り抜け可能な幽霊を生み出し、相手の戦意を奪う。",
      en: "Conjure ghosts that pass through walls and drain enemies of their will to fight.",
    },
    user: "ペローナ",
  },
  {
    id: "suke-suke",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "スケスケの実", en: "Clear-Clear Fruit" },
    ability: {
      ja: "自分と触れたものを透明化できる。完全な不可視能力。",
      en: "Make yourself and anything you touch completely invisible.",
    },
    user: "アブサロム",
  },
  {
    id: "nikyu-nikyu",
    type: "paramecia",
    rarity: "rare",
    name: { ja: "ニキュニキュの実", en: "Paw-Paw Fruit" },
    ability: {
      ja: "肉球で触れたものを、痛み・空気・物体まで弾き飛ばせる。",
      en: "Repel anything you touch with your paw pads—pain, air, even matter itself.",
    },
    user: "バーソロミュー・くま",
  },
  {
    id: "doa-doa",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "ドアドアの実", en: "Door-Door Fruit" },
    ability: {
      ja: "あらゆる場所をドアにして通り抜けられる。空気にも開通可能。",
      en: "Turn any surface—even air—into a door you can pass through.",
    },
    user: "ブルーノ",
  },
  {
    id: "awa-awa",
    type: "paramecia",
    rarity: "common",
    name: { ja: "アワアワの実", en: "Bubble-Bubble Fruit" },
    ability: {
      ja: "全身から泡を発し、触れた相手の力を洗い落とす。",
      en: "Produce soapy bubbles that scrub away the strength of anything they touch.",
    },
    user: "カリファ",
  },
  {
    id: "gura-gura",
    type: "paramecia",
    rarity: "legendary",
    name: { ja: "グラグラの実", en: "Tremor-Tremor Fruit" },
    ability: {
      ja: "空気・大地・海ごと震わせ、世界をも破壊する地震を起こす。",
      en: "Generate world-shaking quakes through air, land, and sea.",
    },
    user: "エドワード・ニューゲート（白ひげ）",
  },
  {
    id: "noro-noro",
    type: "paramecia",
    rarity: "uncommon",
    name: { ja: "ノロノロの実", en: "Slow-Slow Fruit" },
    ability: {
      ja: "光線を浴びせた相手を30秒間スローにする。",
      en: "Fire beams that slow anything they hit to a crawl for 30 seconds.",
    },
    user: "フォクシー",
  },
  {
    id: "doku-doku",
    type: "paramecia",
    rarity: "rare",
    name: { ja: "ドクドクの実", en: "Venom-Venom Fruit" },
    ability: {
      ja: "致死性の毒を自在に生成・操作できる毒人間。",
      en: "Create and command lethal poisons of every grade.",
    },
    user: "マゼラン",
  },
  {
    id: "ope-ope",
    type: "paramecia",
    rarity: "legendary",
    name: { ja: "オペオペの実", en: "Op-Op Fruit" },
    ability: {
      ja: "空間「ROOM」内で何でも自由に切り分け・移動・入れ替えできる究極の手術能力。",
      en: "Inside your ROOM you can dissect, swap, and rearrange anything—ultimate surgical power.",
    },
    user: "トラファルガー・ロー",
  },
  {
    id: "mero-mero",
    type: "paramecia",
    rarity: "rare",
    name: { ja: "メロメロの実", en: "Love-Love Fruit" },
    ability: {
      ja: "相手の邪な感情を利用し、視線で石化させる魅惑の能力。",
      en: "Turn anyone with impure thoughts about you to stone with a single glance.",
    },
    user: "ボア・ハンコック",
  },
  {
    id: "fuwa-fuwa",
    type: "paramecia",
    rarity: "rare",
    name: { ja: "フワフワの実", en: "Float-Float Fruit" },
    ability: {
      ja: "生物以外の物体を浮かせて自在に操れる。自身も空を飛べる。",
      en: "Levitate non-living matter and ride the skies at will.",
    },
    user: "金獅子のシキ",
  },
  {
    id: "ito-ito",
    type: "paramecia",
    rarity: "rare",
    name: { ja: "イトイトの実", en: "String-String Fruit" },
    ability: {
      ja: "極細にして極限まで硬い糸を生成し、人形のように相手を操れる。",
      en: "Spin razor-strong threads to slice foes or puppet them like marionettes.",
    },
    user: "ドンキホーテ・ドフラミンゴ",
  },
  {
    id: "moku-moku",
    type: "logia",
    rarity: "uncommon",
    name: { ja: "モクモクの実", en: "Smoke-Smoke Fruit" },
    ability: {
      ja: "全身を煙に変え、攻撃を実体ごとすり抜けさせる。空中移動も可能。",
      en: "Become living smoke—physical attacks phase right through you, and you glide through the air.",
    },
    user: "スモーカー",
  },
  {
    id: "mera-mera",
    type: "logia",
    rarity: "rare",
    name: { ja: "メラメラの実", en: "Flame-Flame Fruit" },
    ability: {
      ja: "全身を炎そのものに変え、操る。万物を焼き尽くす超高温。",
      en: "Transform into living flame and unleash temperatures that incinerate anything.",
    },
    user: "ポートガス・D・エース／サボ",
  },
  {
    id: "suna-suna",
    type: "logia",
    rarity: "rare",
    name: { ja: "スナスナの実", en: "Sand-Sand Fruit" },
    ability: {
      ja: "全身が砂となり、水分を吸い尽くす干乾びの右手を持つ。",
      en: "Become living sand whose right hand drains every drop of moisture it touches.",
    },
    user: "サー・クロコダイル",
  },
  {
    id: "goro-goro",
    type: "logia",
    rarity: "legendary",
    name: { ja: "ゴロゴロの実", en: "Rumble-Rumble Fruit" },
    ability: {
      ja: "雷そのものとなり、最速で空を駆け、2億ボルトの稲妻を落とす。",
      en: "Become living lightning, flash across the sky, and call down 200-million-volt bolts.",
    },
    user: "エネル",
  },
  {
    id: "hie-hie",
    type: "logia",
    rarity: "rare",
    name: { ja: "ヒエヒエの実", en: "Ice-Ice Fruit" },
    ability: {
      ja: "全身を氷に変え、海ごと凍らせる絶対零度の能力。",
      en: "Become living ice and freeze entire seas at absolute zero.",
    },
    user: "クザン（青雉）",
  },
  {
    id: "pika-pika",
    type: "logia",
    rarity: "legendary",
    name: { ja: "ピカピカの実", en: "Glint-Glint Fruit" },
    ability: {
      ja: "全身を光に変え、光速で移動し、レーザー光を放つ。",
      en: "Become living light, travel at light-speed, and fire searing lasers.",
    },
    user: "ボルサリーノ（黄猿）",
  },
  {
    id: "magu-magu",
    type: "logia",
    rarity: "legendary",
    name: { ja: "マグマグの実", en: "Magma-Magma Fruit" },
    ability: {
      ja: "全身をマグマに変え、炎をも焼き尽くす上位の熱を放つ。",
      en: "Become living magma—hotter than fire itself and burning through anything.",
    },
    user: "サカズキ（赤犬）",
  },
  {
    id: "yami-yami",
    type: "logia",
    rarity: "legendary",
    name: { ja: "ヤミヤミの実", en: "Dark-Dark Fruit" },
    ability: {
      ja: "全てを呑み込む闇を操り、他者の悪魔の実能力をも無効化・吸収する。",
      en: "Command an all-devouring darkness that nullifies and absorbs other Devil Fruit powers.",
    },
    user: "マーシャル・D・ティーチ（黒ひげ）",
  },
  {
    id: "gasu-gasu",
    type: "logia",
    rarity: "rare",
    name: { ja: "ガスガスの実", en: "Gas-Gas Fruit" },
    ability: {
      ja: "あらゆる気体を生成・操作し、毒ガスや爆発性ガスも自在に扱う。",
      en: "Generate and control any gas—including poison and explosive mixtures.",
    },
    user: "シーザー・クラウン",
  },
  {
    id: "yuki-yuki",
    type: "logia",
    rarity: "uncommon",
    name: { ja: "ユキユキの実", en: "Snow-Snow Fruit" },
    ability: {
      ja: "全身を雪に変え、辺り一面を吹雪で覆う。",
      en: "Become living snow and bury everything around you in blizzards.",
    },
    user: "モネ",
  },
  // === ゾオン（動物系） ===
  {
    id: "hito-hito",
    type: "zoan",
    zoanModel: "carnivorous",
    rarity: "uncommon",
    name: { ja: "ヒトヒトの実", en: "Human-Human Fruit" },
    ability: {
      ja: "動物が人間の知能と姿を獲得する。三段変形が可能。",
      en: "Grant any animal human intellect and form, with three transformation stages.",
    },
    user: "トニートニー・チョッパー",
  },
  {
    id: "tori-tori-falcon",
    type: "zoan",
    zoanModel: "carnivorous",
    rarity: "uncommon",
    name: { ja: "トリトリの実 モデル：ハヤブサ", en: "Bird-Bird Fruit, Model: Falcon" },
    ability: {
      ja: "ハヤブサに変身し、高速で空を飛べる。",
      en: "Become a peregrine falcon and dive through the skies at terrifying speed.",
    },
    user: "ペル",
  },
  {
    id: "neko-neko-leopard",
    type: "zoan",
    zoanModel: "carnivorous",
    rarity: "rare",
    name: { ja: "ネコネコの実 モデル：豹", en: "Cat-Cat Fruit, Model: Leopard" },
    ability: {
      ja: "豹に変身し、しなやかな筋肉と俊敏さを得る。",
      en: "Become a leopard with sleek muscles and devastating agility.",
    },
    user: "ロブ・ルッチ",
  },
  {
    id: "uo-uo-seiryu",
    type: "zoan",
    zoanModel: "mythical",
    rarity: "legendary",
    name: { ja: "ウオウオの実 モデル：青龍", en: "Fish-Fish Fruit, Model: Azure Dragon" },
    ability: {
      ja: "青龍（東洋の龍）に変身し、火・風・雷を巻き起こす最強の幻獣。",
      en: "Become an Azure Dragon, summoning fire, wind, and lightning at will.",
    },
    user: "カイドウ",
  },
  {
    id: "tori-tori-phoenix",
    type: "zoan",
    zoanModel: "mythical",
    rarity: "legendary",
    name: { ja: "トリトリの実 モデル：不死鳥", en: "Bird-Bird Fruit, Model: Phoenix" },
    ability: {
      ja: "不死鳥に変身し、青き再生の炎で何度でも蘇る。",
      en: "Become a phoenix, regenerating endlessly from sapphire flames.",
    },
    user: "マルコ",
  },
  {
    id: "hito-hito-nika",
    type: "zoan",
    zoanModel: "mythical",
    rarity: "legendary",
    name: { ja: "ヒトヒトの実 モデル：ニカ", en: "Human-Human Fruit, Model: Nika" },
    ability: {
      ja: "太陽の神ニカに変身し、世界を漫画のように自在に歪める解放の能力。",
      en: "Transform into the Sun God Nika—bending reality like a cartoon, freeing the world with laughter.",
    },
    user: "モンキー・D・ルフィ（覚醒）",
  },
  {
    id: "ryu-ryu-pteranodon",
    type: "zoan",
    zoanModel: "ancient",
    rarity: "rare",
    name: { ja: "リュウリュウの実 モデル：プテラノドン", en: "Dragon-Dragon Fruit, Model: Pteranodon" },
    ability: {
      ja: "プテラノドンに変身し、巨大な翼で空を支配する古代種。",
      en: "Become a pteranodon and rule the skies on prehistoric wings.",
    },
    user: "キング",
  },
  {
    id: "zou-zou-mammoth",
    type: "zoan",
    zoanModel: "ancient",
    rarity: "rare",
    name: { ja: "ゾウゾウの実 モデル：マンモス", en: "Elephant-Elephant Fruit, Model: Mammoth" },
    ability: {
      ja: "マンモスに変身し、原始の巨体で全てを薙ぎ倒す。",
      en: "Become a mammoth—primordial mass that levels everything in its path.",
    },
    user: "ジャック",
  },
  {
    id: "inu-inu-jackal",
    type: "zoan",
    zoanModel: "carnivorous",
    rarity: "uncommon",
    name: { ja: "イヌイヌの実 モデル：ジャッカル", en: "Dog-Dog Fruit, Model: Jackal" },
    ability: {
      ja: "ジャッカルに変身し、砂漠で無類の耐久と俊足を得る。",
      en: "Become a jackal with endurance and speed unmatched in the desert.",
    },
    user: "チャカ",
  },
  {
    id: "uma-uma",
    type: "zoan",
    zoanModel: "carnivorous",
    rarity: "common",
    name: { ja: "ウマウマの実", en: "Horse-Horse Fruit" },
    ability: {
      ja: "馬に変身できる。スタミナと脚力に優れる。",
      en: "Transform into a horse—endurance and powerful legs all around.",
    },
    user: "パッパグの仲間",
  },
];

// 系統ごとの注釈（UIで表示）
export const TYPE_INFO: Record<
  FruitType,
  {
    label: { ja: string; en: string };
    subtitle: { ja: string; en: string };
    description: { ja: string; en: string };
    color: string; // tailwind 用
    accent: string;
  }
> = {
  paramecia: {
    label: { ja: "パラミシア", en: "Paramecia" },
    subtitle: { ja: "超人系", en: "Superhuman" },
    description: {
      ja: "最も種類が多い系統。体や周囲の物質を超常的に操る、自在性の高い能力。",
      en: "The most diverse type—grants bizarre powers over one's body or the surroundings.",
    },
    color: "from-violet-500 to-fuchsia-500",
    accent: "violet",
  },
  zoan: {
    label: { ja: "ゾオン", en: "Zoan" },
    subtitle: { ja: "動物系", en: "Animal" },
    description: {
      ja: "動物に変身する系統。三段変形と高い身体能力を得る。古代種・幻獣種はレア。",
      en: "Turns the user into an animal with three forms. Ancient and Mythical models are rare.",
    },
    color: "from-amber-500 to-orange-600",
    accent: "amber",
  },
  logia: {
    label: { ja: "ロギア", en: "Logia" },
    subtitle: { ja: "自然系", en: "Natural Element" },
    description: {
      ja: "自然そのものになる最強系統。実体攻撃が無効化される代わりに数は最も少ない。",
      en: "Become an element of nature itself—physical attacks phase through you. Rarest of the three.",
    },
    color: "from-sky-500 to-cyan-400",
    accent: "sky",
  },
};
