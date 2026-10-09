"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { legalPages, LegalSlug } from "@/i18n/legalDictionary";
import { SITE } from "@/data/site";

export default function LegalContent({ slug }: { slug: LegalSlug }) {
  const { pick, t } = useI18n();
  const page = legalPages[slug];
  const fill = (text: string) => text.split("{email}").join(SITE.email);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-pink-600 hover:underline"
      >
        {t("back")}
      </Link>
      <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">
        {pick(page.title)}
      </h1>

      <div className="mt-6 space-y-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        {page.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold">{pick(s.heading)}</h2>
            <p className="mt-2 text-gray-600">{fill(pick(s.body))}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
