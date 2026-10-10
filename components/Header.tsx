"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { accountText } from "@/i18n/accountDictionary";
import SettingsPanel from "@/components/SettingsPanel";

export default function Header() {
  const { totalCount } = useCart();
  const { t, lang } = useI18n();
  const { user, openAuth } = useAuth();
  const a = accountText[lang];
  const [open, setOpen] = useState(false);

  const iconBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border bg-white text-lg hover:bg-gray-100";

  return (
    <>
      <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        {t("topBanner")}
      </div>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-6">
          <Link
            href="/"
            className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-lg font-extrabold tracking-wider text-transparent sm:text-2xl sm:tracking-widest"
          >
            NYXAVOR
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <Link
                href="/profile"
                aria-label={a.account}
                title={user.email ?? a.account}
                className={iconBtn}
              >
                <span className="text-sm font-bold">
                  {(user.email ?? "?").charAt(0).toUpperCase()}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => openAuth("login")}
                aria-label={a.signIn}
                title={a.signIn}
                className={iconBtn}
              >
                👤
              </button>
            )}

            <button
              onClick={() => setOpen(true)}
              aria-label={a.settings}
              title={a.settings}
              className={iconBtn}
            >
              ⚙️
            </button>

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

      {/* header-ის გარეთაა, რადგან backdrop-blur fixed ელემენტებს ამახინჯებს */}
      <SettingsPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
