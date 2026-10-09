"use client";

import Link from "next/link";
import { products, type Product } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import { useI18n } from "@/context/I18nContext";
import { siteText } from "@/i18n/siteDictionary";

export default function ProductDetails({ product }: { product: Product }) {
  const { t, pick, money, lang } = useI18n();
  const s = siteText[lang];
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const name = pick(product.name);

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="text-sm font-medium text-pink-600 hover:underline"
      >
        {t("back")}
      </Link>

      <div className="mt-4 grid gap-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6 md:grid-cols-2 md:gap-10">
        <div className="relative">
          <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
            -{discount}%
          </span>
          <ProductImage
            image={product.image}
            emoji={product.emoji}
            name={name}
            emojiSize="text-9xl"
          />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{name}</h1>
          <p className="mt-3">
            <span className="text-3xl font-extrabold text-pink-600">
              {money(product.price)}
            </span>{" "}
            <span className="text-lg text-gray-400 line-through">
              {money(product.oldPrice)}
            </span>
          </p>
          <p className="mt-4 text-gray-600">{pick(product.description)}</p>

          <AddToCartButton
            slug={product.slug}
            name={name}
            price={product.price}
            emoji={product.emoji}
          />

          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>{t("shipping")}</li>
            <li>{t("securePay")}</li>
            <li>{t("easyReturns")}</li>
          </ul>
          <Link
            href="/info/shipping"
            className="mt-3 inline-block text-sm font-medium text-pink-600 hover:underline"
          >
            {s.shippingDetails}
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-extrabold">{s.related}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ProductImage
                  image={p.image}
                  emoji={p.emoji}
                  name={pick(p.name)}
                />
                <h3 className="mt-2 text-sm font-semibold">{pick(p.name)}</h3>
                <p className="text-sm font-extrabold text-pink-600">
                  {money(p.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
