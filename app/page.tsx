"use client";

import { useState } from "react";
import Link from "next/link";
import { products, CATEGORIES, Category } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import { useI18n } from "@/context/I18nContext";
import { homeText, categoryNames } from "@/i18n/homeDictionary";
import { siteText } from "@/i18n/siteDictionary";

type Sort = "default" | "low" | "high" | "discount";

export default function Home() {
  const { t, pick, money, lang } = useI18n();
  const h = homeText[lang];
  const s = siteText[lang];
  const cats = categoryNames[lang];

  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("default");

  // ფასდაკლება (0-დან 1-მდე). თუ რეალური ძველი ფასი არ არის, ფასდაკლება 0-ია.
  const discountOf = (p: (typeof products)[number]) => {
    const old = p.oldPrice;
    return typeof old === "number" && old > p.price ? 1 - p.price / old : 0;
  };

  const visible = products
    .filter((p) => {
      const matchCategory = category === "all" || p.category === category;
      const matchQuery = pick(p.name)
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchCategory && matchQuery;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "discount") return discountOf(b) - discountOf(a);
      return 0;
    });

  const chipClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-gray-900 text-white"
        : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"
    }`;

  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 px-4 py-14 text-center text-white sm:py-20">
        <p className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
          {t("badge")}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          {h.heroTitle}
        </h1>
        <p className="mt-3 text-base sm:text-lg">{h.heroSubtitle}</p>
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

      <main
        id="products"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-10 sm:px-6"
      >
        <h2 className="mb-4 text-2xl font-extrabold">{h.popular}</h2>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={h.search}
            className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-sm focus:border-pink-500 focus:outline-none"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label={s.sortBy}
            className="rounded-full border border-gray-300 bg-white px-4 py-3 text-sm sm:w-64"
          >
            <option value="default">{s.sortDefault}</option>
            <option value="low">{s.sortPriceLow}</option>
            <option value="high">{s.sortPriceHigh}</option>
            <option value="discount">{s.sortDiscount}</option>
          </select>
        </div>

        <div className="mb-6 flex gap-2 no-scrollbar overflow-x-auto pb-2 ">
          <button
            onClick={() => setCategory("all")}
            className={chipClass(category === "all")}
          >
            {h.all}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={chipClass(category === c)}
            >
              {cats[c]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-10 text-center text-gray-500">{h.noResults}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((p) => {
              const discount = Math.round(discountOf(p) * 100);
              const hasDiscount = discount > 0;
              const name = pick(p.name);
              return (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className="relative rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {hasDiscount && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  )}
                  <ProductImage image={p.image} emoji={p.emoji} name={name} />
                  <p className="mt-3 text-xs text-gray-500">
                    {cats[p.category]}
                  </p>
                  <h3 className="text-sm font-semibold sm:text-base">{name}</h3>
                  <p className="mt-1">
                    <span className="text-lg font-extrabold text-pink-600">
                      {money(p.price)}
                    </span>
                    {hasDiscount && p.oldPrice !== undefined && (
                      <>
                        {" "}
                        <span className="text-sm text-gray-400 line-through">
                          {money(p.oldPrice)}
                        </span>
                      </>
                    )}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
