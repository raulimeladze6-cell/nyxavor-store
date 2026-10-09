"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { siteText } from "@/i18n/siteDictionary";
import { LEGAL_SLUGS } from "@/i18n/legalDictionary";
import { SITE } from "@/data/site";

export default function Footer() {
  const { t, lang } = useI18n();
  const s = siteText[lang];

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
          <p className="mb-3 font-semibold text-white">{s.help}</p>
          <ul className="space-y-2">
            {LEGAL_SLUGS.map((slug) => (
              <li key={slug}>
                <Link href={`/info/${slug}`} className="hover:text-white">
                  {s[slug]}
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
