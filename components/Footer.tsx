"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { LEGAL_SLUGS } from "@/i18n/legalDictionary";
import { SITE } from "@/data/site";

export default function Footer() {
  const { t } = useI18n();

  const openSupportChat = () => {
    if (typeof window !== "undefined" && (window as any).$crisp) {
      (window as any).$crisp.push(["do", "chat:open"]);
    }
  };

  return (
    <footer className="mt-10 bg-gray-900 px-6 py-10 text-sm text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
        <div>
          <p className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-xl font-extrabold tracking-widest text-transparent">
            {SITE.name.toUpperCase()}
          </p>
          <p className="mt-2">{SITE.email}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">{t("help")}</p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={openSupportChat}
                className="flex items-center gap-2 transition-colors text-left font-medium text-pink-400 hover:text-pink-300"
              >
                <span>💬</span> {t("help")}
              </button>
            </li>
            {LEGAL_SLUGS.map((slug) => (
              <li key={slug}>
                <Link href={`/info/${slug}`} className="hover:text-white">
                  {t(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center">{t("footer")}</p>
    </footer>
  );
}
