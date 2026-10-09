"use client";

import Link from "next/link";
import { products } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import { useI18n } from "@/context/I18nContext";

export default function Home() {
  const { t, pick, money } = useI18n();

  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 px-4 py-14 text-center text-white sm:py-20">
        <p className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
          {t("badge")}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-3 text-base sm:text-lg">{t("heroSubtitle")}</p>
        <a
          href="#products"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-bold text-pink-600 shadow-lg hover:scale-105"
        >
          {t("shopNow")}
        </a>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 py-6 text-center text-sm font-semibold sm:grid-cols-3 sm:px-6">
        <div className="rounded-xl bg-white p-3 shadow-sm">{t("shipping")}</div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          {t("securePay")}
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          {t("easyReturns")}
        </div>
      </section>

      <main id="products" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="mb-6 text-2xl font-extrabold">{t("hotDeals")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => {
            const discount = Math.round((1 - p.price / p.oldPrice) * 100);
            const name = pick(p.name);
            return (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="relative rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  -{discount}%
                </span>
                <ProductImage image={p.image} emoji={p.emoji} name={name} />
                <h3 className="mt-3 text-sm font-semibold sm:text-base">
                  {name}
                </h3>
                <p className="mt-1">
                  <span className="text-lg font-extrabold text-pink-600">
                    {money(p.price)}
                  </span>{" "}
                  <span className="text-sm text-gray-400 line-through">
                    {money(p.oldPrice)}
                  </span>
                </p>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-900 px-6 py-8 text-center text-sm text-gray-400">
        {t("footer")}
      </footer>
    </>
  );
}
