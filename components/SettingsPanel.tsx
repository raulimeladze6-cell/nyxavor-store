"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { LANGS, CURRENCIES, Lang, Currency } from "@/i18n/dictionary";
import { accountText } from "@/i18n/accountDictionary";
import { siteText } from "@/i18n/siteDictionary";
import { LEGAL_SLUGS } from "@/i18n/legalDictionary";

type Theme = "light" | "dark" | "comfort";

const THEMES: {
  id: Theme;
  icon: string;
  key: "themeLight" | "themeDark" | "themeComfort";
}[] = [
  { id: "light", icon: "☀️", key: "themeLight" },
  { id: "dark", icon: "🌙", key: "themeDark" },
  { id: "comfort", icon: "🌿", key: "themeComfort" },
];

const selectClass =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm";

export default function SettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang, setLang, currency, setCurrency } = useI18n();
  const { user, signOut, openAuth } = useAuth();
  const a = accountText[lang];
  const s = siteText[lang];
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    if (!open) return;
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark" || current === "comfort") {
      setThemeState(current);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const setTheme = (th: Theme) => {
    setThemeState(th);
    document.documentElement.setAttribute("data-theme", th);
    try {
      localStorage.setItem("nyxavor-theme", th);
    } catch {}
  };

  const goAuth = (mode: "login" | "register") => {
    onClose();
    openAuth(mode);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[55] bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={a.settings}
        className="fixed inset-x-2 top-2 z-[60] max-h-[calc(100vh-1rem)] overflow-y-auto rounded-2xl border bg-white p-5 shadow-2xl sm:inset-x-auto sm:right-4 sm:top-4 sm:w-96"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">⚙️ {a.settings}</h2>
          <button
            onClick={onClose}
            aria-label={a.close}
            className="rounded-full px-2 py-1 text-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* ანგარიში */}
        <section className="mb-5 rounded-xl bg-gray-100 p-4">
          <p className="mb-2 text-sm font-bold">{a.account}</p>
          {user ? (
            <>
              <p className="text-xs text-gray-500">{a.signedInAs}</p>
              <p className="break-all text-sm font-semibold">{user.email}</p>
              <button
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className="mt-3 w-full rounded-full border px-4 py-2 text-sm font-semibold hover:bg-white"
              >
                {a.signOut}
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => goAuth("login")}
                className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-2 text-sm font-bold text-white"
              >
                {a.signIn}
              </button>
              <button
                onClick={() => goAuth("register")}
                className="flex-1 rounded-full border px-3 py-2 text-sm font-semibold hover:bg-white"
              >
                {a.register}
              </button>
            </div>
          )}
        </section>

        {/* ენა და ვალუტა */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            {a.language}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className={selectClass}
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            {a.currency}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={selectClass}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* თემა */}
        <section className="mb-5">
          <p className="mb-2 text-sm font-medium">{a.theme}</p>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setTheme(th.id)}
                className={`rounded-xl border px-2 py-2 text-xs font-semibold ${
                  theme === th.id
                    ? "bg-gray-900 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <span className="block text-lg">{th.icon}</span>
                {a[th.key]}
              </button>
            ))}
          </div>
        </section>

        {/* ინფორმაცია */}
        <section>
          <p className="mb-2 text-sm font-medium">{s.help}</p>
          <ul className="space-y-1 text-sm">
            {LEGAL_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/info/${slug}`}
                  onClick={onClose}
                  className="block rounded-lg px-2 py-2 text-pink-600 hover:bg-gray-100"
                >
                  {s[slug]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
