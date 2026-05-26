// 日英の文言辞書と、言語コンテキスト

export type Lang = "ja" | "en";

export const TRANSLATIONS = {
  ja: {
    appTitle: "悪魔の実メーカー",
    appTagline: "あなたの名前から、あなただけの悪魔の実が判明する。",
    inputLabel: "あなたの名前",
    inputPlaceholder: "例：モンキー・D・ルフィ",
    submit: "悪魔の実を食べる",
    submitting: "実が選ばれています…",
    rerollLabel: "別の実を試す",
    yourFruit: "あなたにぴったりの悪魔の実",
    type: "系統",
    rarity: "希少度",
    ability: "能力",
    canonNote: "原作にも登場する実",
    originalNote: "あなた専用のオリジナル実",
    sharePng: "画像として保存・共有",
    shareLink: "リンクをコピー",
    shareLinkCopied: "リンクをコピーしました",
    backToTop: "もう一度、別の名前で",
    disclaimer:
      "本アプリは『ONE PIECE』にインスパイアされたファンメイドの非公式アプリです。原作の著作権は尾田栄一郎氏および集英社に帰属します。",
    rarityCommon: "コモン",
    rarityUncommon: "アンコモン",
    rarityRare: "レア",
    rarityLegendary: "レジェンド",
    canonUser: "原作の使い手",
    langSwitchTo: "English",
    invalidInput: "名前を入力してください",
    againButton: "もう一度引く",
    aboutTitle: "このアプリについて",
    aboutBody:
      "あなたの名前から決定的なロジックで悪魔の実を選びます。同じ名前を入れれば、いつでも同じ実に出会えます。「もう一度引く」で別の実も試せます。",
  },
  en: {
    appTitle: "Devil Fruit Maker",
    appTagline: "Find the Devil Fruit that was meant for your name.",
    inputLabel: "Your Name",
    inputPlaceholder: "e.g. Monkey D. Luffy",
    submit: "Eat a Devil Fruit",
    submitting: "Choosing your fruit…",
    rerollLabel: "Try another fruit",
    yourFruit: "Your perfect Devil Fruit",
    type: "Type",
    rarity: "Rarity",
    ability: "Ability",
    canonNote: "From the original story",
    originalNote: "An original fruit just for you",
    sharePng: "Save / share as image",
    shareLink: "Copy link",
    shareLinkCopied: "Link copied",
    backToTop: "Try with another name",
    disclaimer:
      "This is a fan-made, unofficial app inspired by ONE PIECE. All rights belong to Eiichiro Oda and Shueisha.",
    rarityCommon: "Common",
    rarityUncommon: "Uncommon",
    rarityRare: "Rare",
    rarityLegendary: "Legendary",
    canonUser: "Canon user",
    langSwitchTo: "日本語",
    invalidInput: "Please enter your name",
    againButton: "Roll again",
    aboutTitle: "About this app",
    aboutBody:
      "Your name is hashed deterministically to find a Devil Fruit. Type the same name again and you'll always meet the same fruit. Hit 'Roll again' to try a different one.",
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS["ja"];

export function t(lang: Lang, key: TranslationKey): string {
  return TRANSLATIONS[lang][key];
}

export function rarityLabel(
  lang: Lang,
  rarity: "common" | "uncommon" | "rare" | "legendary"
): string {
  const map = {
    common: "rarityCommon",
    uncommon: "rarityUncommon",
    rare: "rarityRare",
    legendary: "rarityLegendary",
  } as const;
  return t(lang, map[rarity]);
}
