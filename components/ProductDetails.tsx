"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import { useI18n } from "@/context/I18nContext";

export default function ProductDetails({ product }: { product: Product }) {
  const { t, pick, money } = useI18n();
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const name = pick(product.name);

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
        </div>
      </div>
    </main>
  );
}
