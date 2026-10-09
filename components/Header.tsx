"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { LANGS, CURRENCIES, Lang, Currency } from "@/i18n/dictionary";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { totalCount } = useCart();
  const { t, lang, setLang, currency, setCurrency } = useI18n();

  const selectClass =
    "rounded-full border bg-white px-1.5 py-1 text-xs font-medium sm:px-2 sm:text-sm";

  return (
    <>
      <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        {t("topBanner")}
      </div>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-6">
          <Link
            href="/"
            className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-base font-extrabold tracking-wider text-transparent sm:text-2xl sm:tracking-widest"
          >
            NYXAVOR
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className={selectClass}
              aria-label="Language"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={selectClass}
              aria-label="Currency"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <ThemeToggle />

            <Link
              href="/cart"
              className="relative rounded-full bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:px-4"
            >
              🛒 <span className="hidden sm:inline">{t("cart")}</span>
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
