"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  LANGS,
  RATES,
  DEFAULT_CURRENCY,
  Lang,
  Currency,
  getTranslation,
} from "@/i18n/masterDictionary"; // 👈 შემოგვაქვს masterDictionary-დან!

type Localized = { en: string } & Partial<Record<Lang, string>>;

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: (key: string) => string;
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
        setCurrencyState(DEFAULT_CURRENCY[browser] || "USD");
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

  // 💡 აი აქ ვიძახებთ masterDictionary-ს უსაფრთხო თარგმნის ფუნქციას!
  const t = (key: string) => getTranslation(lang, key);

  // 💡 პროდუქტის სახელის/აღწერის არჩევა ენის მიხედვით
  const pick = (text: Localized) => text[lang] ?? text.en;

  // 💡 ვალუტის გადაყვანა და ფორმატირება
  const money = (usd: number) => {
    const rate = RATES[currency] ?? 1;
    return new Intl.NumberFormat(lang, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(usd * rate);
  };

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
