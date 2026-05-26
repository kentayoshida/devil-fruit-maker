"use client";

import { useRef, useState } from "react";
import { ResultCard } from "@/components/ResultCard";
import { GachaReveal } from "@/components/GachaReveal";
import { TypeReveal } from "@/components/TypeReveal";
import { RarityReveal } from "@/components/RarityReveal";
import { matchFruit, type MatchResult } from "@/lib/matcher";
import { t } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import { shareOrDownload } from "@/lib/share";

// ステージ遷移管理
type Stage = "idle" | "spinning" | "type" | "rarity" | "result";

// レア度ごとの演出時間（タメ含む）
const RARITY_STAGE_DURATION: Record<MatchResult["rarity"], number> = {
  common: 900,
  uncommon: 1100,
  rare: 1500,
  legendary: 2400,
};
const SPINNING_DURATION = 1100;
const TYPE_DURATION = 1300;

export default function Home() {
  const [lang, setLang] = useLang();
  const [name, setName] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [reroll, setReroll] = useState(0);
  const [submittedName, setSubmittedName] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  /** 結果は先に計算して保持。ステージ遷移と独立して扱う */
  const [pendingResult, setPendingResult] = useState<MatchResult | null>(null);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  /** タイマーIDを保持してクリーンアップ */
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function reveal(targetName: string, rerollVal: number) {
    if (!targetName.trim()) return;
    clearTimers();
    const r = matchFruit(targetName, rerollVal);
    setPendingResult(r);
    setSubmittedName(targetName);
    setResult(null);
    setStage("spinning");

    // ステージ遷移スケジュール
    timersRef.current.push(
      setTimeout(() => setStage("type"), SPINNING_DURATION)
    );
    timersRef.current.push(
      setTimeout(
        () => setStage("rarity"),
        SPINNING_DURATION + TYPE_DURATION
      )
    );
    timersRef.current.push(
      setTimeout(() => {
        setResult(r);
        setStage("result");
      }, SPINNING_DURATION + TYPE_DURATION + RARITY_STAGE_DURATION[r.rarity])
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReroll(0);
    reveal(name, 0);
  }

  function onReroll() {
    const next = reroll + 1;
    setReroll(next);
    reveal(submittedName, next);
  }

  function onReset() {
    clearTimers();
    setResult(null);
    setPendingResult(null);
    setSubmittedName("");
    setReroll(0);
    setName("");
    setStage("idle");
  }

  async function onShare() {
    if (!cardRef.current || !result) return;
    try {
      const filename = `devil-fruit-${submittedName || "result"}.png`;
      const title = t(lang, "appTitle");
      const text = `${submittedName}${lang === "ja" ? "さんの悪魔の実は「" : "'s Devil Fruit: "}${result.name[lang]}${lang === "ja" ? "」" : ""}`;
      const outcome = await shareOrDownload({
        node: cardRef.current,
        filename,
        title,
        text,
      });
      setShareNotice(
        outcome === "shared"
          ? lang === "ja" ? "共有しました" : "Shared"
          : lang === "ja" ? "画像をダウンロードしました" : "Image downloaded"
      );
      setTimeout(() => setShareNotice(null), 2500);
    } catch (err) {
      console.error(err);
      setShareNotice(lang === "ja" ? "共有に失敗しました" : "Share failed");
      setTimeout(() => setShareNotice(null), 2500);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 text-white">
      {/* ヘッダー */}
      <header className="w-full max-w-md flex items-center justify-between">
        <div className="text-lg font-bold tracking-wide">
          {t(lang, "appTitle")}
        </div>
        <button
          onClick={() => setLang(lang === "ja" ? "en" : "ja")}
          className="text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-white/10"
        >
          {t(lang, "langSwitchTo")}
        </button>
      </header>

      <div className="w-full max-w-md mt-4 text-sm text-white/70">
        {t(lang, "appTagline")}
      </div>

      {/* 入力フォーム */}
      {stage === "idle" && (
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md mt-8 flex flex-col gap-3"
        >
          <label htmlFor="name" className="text-sm font-medium">
            {t(lang, "inputLabel")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t(lang, "inputPlaceholder")}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            autoComplete="off"
            autoCapitalize="off"
            inputMode="text"
            maxLength={50}
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 mt-2 rounded-xl font-semibold bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg active:scale-[0.98] transition"
          >
            {t(lang, "submit")}
          </button>
        </form>
      )}

      {/* ステージ1: ガチャ風スピン */}
      {stage === "spinning" && <GachaReveal lang={lang} />}

      {/* ステージ2: タイプ判定 */}
      {stage === "type" && pendingResult && (
        <TypeReveal type={pendingResult.type} lang={lang} />
      )}

      {/* ステージ3: レア度 */}
      {stage === "rarity" && pendingResult && (
        <RarityReveal
          rarity={pendingResult.rarity}
          type={pendingResult.type}
          lang={lang}
        />
      )}

      {/* ステージ4: 結果カード */}
      {stage === "result" && result && (
        <div className="w-full max-w-md mt-6 animate-pop-in relative">
          <div className="absolute inset-0 bg-white rounded-3xl animate-reveal-flash z-10" />
          <ResultCard
            ref={cardRef}
            result={result}
            name={submittedName}
            lang={lang}
          />

          {result.source === "canon" && result.user && (
            <p className="mt-3 text-center text-xs text-white/60">
              {t(lang, "canonUser")}: {result.user}
            </p>
          )}

          {/* アクションボタン */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={onShare}
              className="py-3 rounded-xl font-semibold bg-white text-slate-900 shadow active:scale-[0.98] transition"
            >
              {t(lang, "sharePng")}
            </button>
            <button
              onClick={onReroll}
              className="py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/10 active:scale-[0.98] transition"
            >
              {t(lang, "againButton")}
            </button>
          </div>

          <button
            onClick={onReset}
            className="mt-3 w-full py-2 text-sm text-white/60 hover:text-white"
          >
            ← {t(lang, "backToTop")}
          </button>

          {shareNotice && (
            <div className="mt-3 text-center text-xs text-emerald-300">
              {shareNotice}
            </div>
          )}
        </div>
      )}

      {/* About */}
      <section className="w-full max-w-md mt-12 text-xs text-white/60 space-y-2">
        <h2 className="text-sm font-semibold text-white/80">
          {t(lang, "aboutTitle")}
        </h2>
        <p className="leading-relaxed">{t(lang, "aboutBody")}</p>
      </section>

      {/* ディスクレーマー */}
      <footer className="w-full max-w-md mt-8 pt-6 border-t border-white/10 text-[10px] text-white/50 text-center pb-4">
        {t(lang, "disclaimer")}
      </footer>
    </main>
  );
}
