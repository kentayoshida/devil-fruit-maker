"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

const KEY = "devil-fruit-maker:lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "ja";
  const stored = window.localStorage.getItem(KEY);
  if (stored === "ja" || stored === "en") return stored;
  const nav = window.navigator.language.toLowerCase();
  if (nav.startsWith("ja")) return "ja";
  return "ja"; // 日本語をデフォルト
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("ja");

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, l);
    }
  };

  return [lang, setLang];
}
