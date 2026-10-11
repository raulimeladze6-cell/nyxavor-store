"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { LANGS, CURRENCIES, Lang, Currency } from "@/i18n/masterDictionary";
import { LEGAL_SLUGS, legalPages } from "@/i18n/legalDictionary";

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

export default function SettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang, setLang, currency, setCurrency, t } = useI18n();
  const { user, signOut, openAuth } = useAuth();
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

  const openLiveChat = () => {
    onClose();
    if (typeof window !== "undefined" && (window as any).$crisp) {
      (window as any).$crisp.push(["do", "chat:open"]);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("settings")}
        className="fixed inset-x-2 top-2 z-[60] max-h-[calc(100vh-1rem)] overflow-y-auto rounded-2xl border border-gray-700/50 bg-[#121214] text-white p-5 shadow-2xl sm:inset-x-auto sm:right-4 sm:top-4 sm:w-96"
        style={{ color: "#ffffff" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">
            ⚙️ {t("settings")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-full px-2.5 py-1 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* ანგარიში */}
        <section className="mb-5 rounded-xl bg-gray-900/90 border border-gray-800 p-4 text-white">
          <p className="mb-2 text-sm font-bold text-white">{t("account")}</p>
          {user ? (
            <>
              <p className="text-xs text-gray-300">{t("signedInAs")}</p>
              <p className="break-all text-sm font-semibold text-white mt-0.5">
                {user.email}
              </p>
              <button
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className="mt-3 w-full rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition"
              >
                {t("signOut")}
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => goAuth("login")}
                className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-2 text-sm font-bold text-white shadow hover:opacity-95 transition"
              >
                {t("signIn")}
              </button>
              <button
                onClick={() => goAuth("register")}
                className="flex-1 rounded-full border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition"
              >
                {t("register")}
              </button>
            </div>
          )}
        </section>

        {/* ენა და ვალუტა */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium text-gray-200">
            {t("language")}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-[#1e293b] px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 cursor-pointer"
              style={{ color: "#ffffff", backgroundColor: "#1e293b" }}
            >
              {LANGS.map((l) => (
                <option
                  key={l.code}
                  value={l.code}
                  style={{ color: "#ffffff", backgroundColor: "#121214" }}
                >
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-gray-200">
            {t("currency")}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-[#1e293b] px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 cursor-pointer"
              style={{ color: "#ffffff", backgroundColor: "#1e293b" }}
            >
              {CURRENCIES.map((c) => (
                <option
                  key={c}
                  value={c}
                  style={{ color: "#ffffff", backgroundColor: "#121214" }}
                >
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* იერსახე (თემა) */}
        <section className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-200">{t("theme")}</p>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setTheme(th.id)}
                className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                  theme === th.id
                    ? "border-pink-500 bg-gray-800 text-white shadow"
                    : "border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <span className="block text-lg">{th.icon}</span>
                {t(th.key)}
              </button>
            ))}
          </div>
        </section>

        {/* მხარდაჭერა / Help */}
        <section>
          <p className="mb-2 text-sm font-medium text-gray-200">{t("help")}</p>
          <ul className="space-y-1 text-sm">
            <li>
              <button
                onClick={openLiveChat}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 font-semibold text-pink-400 hover:bg-gray-800/60 text-left transition"
              >
                <span>💬</span> {t("help")}
              </button>
            </li>
            {LEGAL_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/info/${slug}`}
                  onClick={onClose}
                  className="block rounded-lg px-2 py-2 text-pink-400 hover:bg-gray-800/60 transition"
                >
                  {legalPages[slug]?.title[lang] ||
                    legalPages[slug]?.title["en"] ||
                    t(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
