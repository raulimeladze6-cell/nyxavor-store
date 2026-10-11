"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { products } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, changeQuantity, clearCart, totalPrice } =
    useCart();
  const { t, pick, money, lang } = useI18n();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // 0.10 = 10%
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess("");

    if (promoCode.trim().toUpperCase() === "NYX10") {
      setDiscount(0.1);
      setPromoSuccess(
        t("promoSuccess") || "🎉 10% promo code applied successfully!",
      );
    } else {
      setPromoError(t("promoError") || "Invalid promo code");
    }
  };

  const finalPrice = totalPrice * (1 - discount);
  const savedAmount = totalPrice * discount;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center text-white">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold">{t("cartEmpty")}</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg"
        >
          {t("backToShop")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 text-white">
      <h1 className="mb-6 text-2xl font-extrabold">{t("cartTitle")}</h1>

      <ul className="divide-y divide-gray-700 rounded-2xl bg-gray-800 px-4 shadow-sm border border-gray-700">
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
                <p className="font-medium text-gray-200">{name}</p>
                <p className="text-gray-400">{money(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(item.slug, -1)}
                  className="h-8 w-8 rounded-full border border-gray-600 bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition"
                >
                  −
                </button>
                <span className="w-6 text-center text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => changeQuantity(item.slug, 1)}
                  className="h-8 w-8 rounded-full border border-gray-600 bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.slug)}
                className="text-sm text-red-400 hover:text-red-300 transition"
              >
                {t("remove")}
              </button>
            </li>
          );
        })}
      </ul>

      {/* პრომო კოდის ველი */}
      <div className="mt-6 rounded-2xl bg-gray-800 p-4 shadow-sm border border-gray-700">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          {t("promoCodeLabel")}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder={t("promoPlaceholder")}
            className="flex-1 rounded-xl border border-gray-600 bg-gray-900 px-4 py-2 text-sm text-white uppercase focus:border-pink-500 focus:outline-none"
          />
          <button
            onClick={handleApplyPromo}
            className="rounded-xl bg-pink-600 hover:bg-pink-500 px-5 py-2 text-sm font-bold text-white transition"
          >
            {t("apply")}
          </button>
        </div>
        {promoError && (
          <p className="mt-2 text-xs font-semibold text-red-400">
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="mt-2 text-xs font-semibold text-emerald-400">
            {promoSuccess}
          </p>
        )}
      </div>

      {/* ჯამური თანხის სექცია */}
      <div className="mt-6 rounded-2xl bg-gray-800 p-4 shadow-sm space-y-2 border border-gray-700">
        <div className="flex justify-between text-sm text-gray-300">
          <span>{t("subtotal")}</span>
          <span>{money(totalPrice)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm font-bold text-emerald-400">
            <span>{t("discountLabel")}</span>
            <span>-{money(savedAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-700 pt-3 text-xl font-extrabold text-white">
          <span>{t("total")}</span>
          <span className={discount > 0 ? "text-pink-400" : ""}>
            {money(finalPrice)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/checkout"
          className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-center font-bold text-white shadow-lg hover:opacity-90 transition"
        >
          {t("checkout")}
        </Link>
        <button
          onClick={clearCart}
          className="rounded-full border border-gray-600 bg-gray-800 px-6 py-3 font-semibold text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          {t("clearCart")}
        </button>
      </div>
    </main>
  );
}
