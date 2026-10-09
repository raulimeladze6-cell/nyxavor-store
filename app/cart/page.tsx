"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { products } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, changeQuantity, clearCart, totalPrice } =
    useCart();
  const { t, pick, money } = useI18n();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold">{t("cartEmpty")}</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white"
        >
          {t("backToShop")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-extrabold">{t("cartTitle")}</h1>

      <ul className="divide-y rounded-2xl bg-white px-4 shadow-sm">
        {items.map((item) => {
          const product = products.find((p) => p.slug === item.slug);
          const name = product ? pick(product.name) : item.name;
          return (
            <li
              key={item.slug}
              className="flex flex-wrap items-center gap-3 py-4"
            >
              <span className="text-4xl">{item.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{name}</p>
                <p className="text-gray-600">{money(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(item.slug, -1)}
                  className="h-8 w-8 rounded-full border"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.slug, 1)}
                  className="h-8 w-8 rounded-full border"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.slug)}
                className="text-sm text-red-600"
              >
                {t("remove")}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t pt-4 text-xl font-bold">
        <span>{t("total")}</span>
        <span>{money(totalPrice)}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/checkout"
          className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-center font-bold text-white"
        >
          {t("checkout")}
        </Link>
        <button onClick={clearCart} className="rounded-full border px-6 py-3">
          {t("clearCart")}
        </button>
      </div>
    </main>
  );
}
