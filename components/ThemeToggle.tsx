"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import type { Lang } from "@/i18n/dictionary";

type Theme = "light" | "dark" | "comfort";
const THEMES: Theme[] = ["light", "dark", "comfort"];
const ICONS: Record<Theme, string> = { light: "☀️", dark: "🌙", comfort: "🌿" };

const NAMES: Record<Lang, Record<Theme, string>> = {
  en: { light: "Light", dark: "Dark", comfort: "Comfort" },
  ka: { light: "ნათელი", dark: "მუქი", comfort: "კომფორტული" },
  ru: { light: "Светлая", dark: "Тёмная", comfort: "Комфортная" },
  de: { light: "Hell", dark: "Dunkel", comfort: "Komfort" },
  es: { light: "Claro", dark: "Oscuro", comfort: "Confort" },
  fr: { light: "Clair", dark: "Sombre", comfort: "Confort" },
};

export default function ThemeToggle() {
  const { lang } = useI18n();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "comfort" || current === "light") {
      setTheme(current);
    }
  }, []);

  const next = () => {
    const n = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(n);
    document.documentElement.setAttribute("data-theme", n);
    try {
      localStorage.setItem("nyxavor-theme", n);
    } catch {}
  };

  return (
    <button
      onClick={next}
      aria-label={NAMES[lang][theme]}
      title={NAMES[lang][theme]}
      className="rounded-full border bg-white px-2.5 py-1 text-base"
    >
      {ICONS[theme]}
    </button>
  );
}
