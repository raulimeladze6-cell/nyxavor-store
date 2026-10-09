"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  dictionary,
  LANGS,
  RATES,
  DEFAULT_CURRENCY,
  Lang,
  Currency,
  Key,
  Localized,
} from "@/i18n/dictionary";

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: (key: Key) => string;
  pick: (text: Localized) => string;
  money: (usd: number) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const isLang = (v: string | null): v is Lang => LANGS.some((l) => l.code === v);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("nyxavor-lang");
      const savedCur = localStorage.getItem("nyxavor-currency");
      const browser = navigator.language.slice(0, 2);

      if (isLang(savedLang)) {
        setLangState(savedLang);
      } else if (isLang(browser)) {
        setLangState(browser);
        setCurrencyState(DEFAULT_CURRENCY[browser]);
      }
      if (savedCur && savedCur in RATES) setCurrencyState(savedCur as Currency);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("nyxavor-lang", l);
    } catch {}
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("nyxavor-currency", c);
    } catch {}
  };

  const t = (key: Key) => dictionary[lang][key];
  const pick = (text: Localized) => text[lang] ?? text.en;
  const money = (usd: number) =>
    new Intl.NumberFormat(lang, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(usd * RATES[currency]);

  return (
    <I18nContext.Provider
      value={{ lang, setLang, currency, setCurrency, t, pick, money }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n უნდა გამოიყენო I18nProvider-ის შიგნით");
  return ctx;
}
