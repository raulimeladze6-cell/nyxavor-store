"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SettingsContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("ka");
  const [currency, setCurrencyState] = useState("EUR");

  useEffect(() => {
    // საიტის ჩატვირთვისას ვამოწმებთ შენახულ მნიშვნელობებს
    const savedLang = localStorage.getItem("app_lang");
    const savedCurr = localStorage.getItem("app_currency");
    if (savedLang) setLanguageState(savedLang);
    if (savedCurr) setCurrencyState(savedCurr);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem("app_currency", curr);
  };

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
