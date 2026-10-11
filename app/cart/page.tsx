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
        lang === "ka"
          ? "🎉 10%-იანი ფასდაკლების კოდი გააქტიურებულია!"
          : "🎉 10% promo code applied successfully!",
      );
    } else {
      setPromoError(
        lang === "ka" ? "არასწორი პრომო კოდი" : "Invalid promo code",
      );
    }
  };

  const finalPrice = totalPrice * (1 - discount);
  const savedAmount = totalPrice * discount;

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

      {/* პრომო კოდის ველი */}
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          {lang === "ka" ? "პრომო კოდი" : "Promo Code"}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder={lang === "ka" ? "მაგ: NYX10" : "e.g. NYX10"}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm uppercase focus:border-pink-500 focus:outline-none"
          />
          <button
            onClick={handleApplyPromo}
            className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-bold text-white hover:bg-gray-800"
          >
            {lang === "ka" ? "გამოყენება" : "Apply"}
          </button>
        </div>
        {promoError && (
          <p className="mt-2 text-xs font-semibold text-red-500">
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="mt-2 text-xs font-semibold text-green-600">
            {promoSuccess}
          </p>
        )}
      </div>

      {/* ჯამური თანხის სექცია */}
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{lang === "ka" ? "ქვეჯამი:" : "Subtotal:"}</span>
          <span>{money(totalPrice)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm font-bold text-green-600">
            <span>
              {lang === "ka" ? "ფასდაკლება (10%):" : "Discount (10%):"}
            </span>
            <span>-{money(savedAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-3 text-xl font-extrabold text-gray-900">
          <span>{t("total")}</span>
          <span className={discount > 0 ? "text-pink-600" : ""}>
            {money(finalPrice)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/checkout"
          className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-center font-bold text-white shadow-lg hover:brightness-105"
        >
          {t("checkout")}
        </Link>
        <button
          onClick={clearCart}
          className="rounded-full border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          {t("clearCart")}
        </button>
      </div>
    </main>
  );
}
