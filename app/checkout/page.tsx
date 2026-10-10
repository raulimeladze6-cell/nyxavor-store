"use client";

import { useState, FormEvent, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";
import { checkoutText } from "@/i18n/checkoutDictionary";
import { orderText } from "@/i18n/orderDictionary";

const COUNTRY_CODES = [
  "US",
  "CA",
  "GB",
  "IE",
  "DE",
  "FR",
  "ES",
  "IT",
  "NL",
  "BE",
  "AT",
  "CH",
  "SE",
  "NO",
  "DK",
  "FI",
  "PL",
  "CZ",
  "PT",
  "GR",
  "RO",
  "BG",
  "HU",
  "EE",
  "LV",
  "LT",
  "UA",
  "GE",
  "AM",
  "AZ",
  "KZ",
  "TR",
  "AE",
  "SA",
  "IL",
  "JP",
  "KR",
  "CN",
  "IN",
  "AU",
  "NZ",
  "BR",
  "MX",
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-pink-500 focus:outline-none";

type Status = "idle" | "sending" | "done" | "error";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, pick, money, lang, currency } = useI18n();
  const { user } = useAuth();

  const ck = checkoutText[lang];
  const od = orderText[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState("");

  const regionNames = new Intl.DisplayNames([lang], { type: "region" });
  const countries = COUNTRY_CODES.map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
  })).sort((a, b) => a.name.localeCompare(b.name, lang));

  if (status === "done") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center text-white">
        <p className="text-5xl">✅</p>
        <h1 className="mt-4 text-2xl font-bold">{od.successTitle}</h1>
        <p className="mt-3 text-gray-300">{od.successText}</p>
        {orderId && (
          <p className="mt-3 text-sm text-gray-400">
            {od.orderNumber}:{" "}
            <span className="font-mono font-semibold text-pink-400">
              {orderId}
            </span>
          </p>
        )}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/profile"
            className="inline-block rounded-full bg-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-600 transition"
          >
            {lang === "ka" ? "პროფილის ნახვა" : "View Profile"}
          </Link>
          <Link
            href="/"
            className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white"
          >
            {t("backToShop")}
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center text-white">
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!user) {
      alert(
        lang === "ka"
          ? "შეკვეთის გასაფორმებლად გთხოვთ გაიაროთ ავტორიზაცია!"
          : "Please log in to place an order!",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          totalAmount: totalPrice,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          country: form.get("country"),
          city: form.get("city"),
          postal: form.get("postal"),
          address: form.get("address"),
          notes: form.get("notes"),
          lang,
          currency,
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      setOrderId(result.orderId || "OK");
      clearCart();
      setStatus("done");
    } catch (err: any) {
      console.error("--- CHECKOUT ERROR ---", err);
      setStatus("error");
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-white">
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">{ck.title}</h1>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl bg-gray-800 p-4 shadow-sm sm:p-6 border border-gray-700">
            <h2 className="mb-4 text-lg font-bold text-pink-400">
              {ck.contact}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {ck.fullName}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  defaultValue={user?.email?.split("@")[0] || ""}
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {ck.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue={user?.email || ""}
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {ck.phone}
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl bg-gray-800 p-4 shadow-sm sm:p-6 border border-gray-700">
            <h2 className="mb-4 text-lg font-bold text-pink-400">
              {ck.shippingAddress}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {ck.country}
                <select
                  name="country"
                  required
                  defaultValue=""
                  autoComplete="country"
                  className={`${inputClass} mt-1 text-black`}
                >
                  <option value="" disabled>
                    {ck.selectCountry}
                  </option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {ck.city}
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {ck.postalCode}
                <input
                  name="postal"
                  required
                  autoComplete="postal-code"
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {ck.address}
                <input
                  name="address"
                  required
                  autoComplete="street-address"
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {ck.notes}
                <textarea
                  name="notes"
                  rows={3}
                  className={`${inputClass} mt-1 text-black`}
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-gray-800 p-4 shadow-sm sm:p-6 border border-gray-700">
          <h2 className="mb-4 text-lg font-bold text-pink-400">
            {ck.orderSummary}
          </h2>
          <ul className="divide-y divide-gray-700 text-sm">
            {items.map((item) => {
              const product = products.find((p) => p.slug === item.slug);
              const name = product ? pick(product.name) : item.name;
              return (
                <li key={item.slug} className="flex items-center gap-3 py-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="min-w-0 flex-1 text-gray-200">
                    {name}{" "}
                    <span className="text-gray-400">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-white">
                    {money(item.price * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4 text-lg font-bold">
            <span>{ck.subtotal}</span>
            <span className="text-pink-400">{money(totalPrice)}</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">{ck.shippingNote}</p>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg hover:scale-[1.02] disabled:opacity-60 transition"
          >
            {status === "sending" ? od.sending : od.placeOrder}
          </button>

          <p className="mt-3 text-xs font-semibold text-yellow-400">
            {od.demoNote}
          </p>

          {status === "error" && (
            <p className="mt-4 rounded-lg bg-red-900/50 p-3 text-sm text-red-200 border border-red-700">
              {od.errorText}
            </p>
          )}

          <p className="mt-4 text-xs text-gray-400">{ck.secureNote}</p>
        </aside>
      </form>
    </main>
  );
}
