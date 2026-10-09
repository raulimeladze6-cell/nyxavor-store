"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { products } from "@/data/products";
import { checkoutText } from "@/i18n/checkoutDictionary";

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

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const { t, pick, money, lang } = useI18n();
  const ck = checkoutText[lang];
  const [submitted, setSubmitted] = useState(false);

  const regionNames = new Intl.DisplayNames([lang], { type: "region" });
  const countries = COUNTRY_CODES.map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
  })).sort((a, b) => a.name.localeCompare(b.name, lang));

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">{ck.title}</h1>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-bold">{ck.contact}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2">
                {ck.fullName}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm font-medium">
                {ck.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm font-medium">
                {ck.phone}
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={`${inputClass} mt-1`}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-bold">{ck.shippingAddress}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2">
                {ck.country}
                <select
                  name="country"
                  required
                  defaultValue=""
                  autoComplete="country"
                  className={`${inputClass} mt-1`}
                >
                  <option value="" disabled>
                    {ck.selectCountry}
                  </option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                {ck.city}
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm font-medium">
                {ck.postalCode}
                <input
                  name="postal"
                  required
                  autoComplete="postal-code"
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                {ck.address}
                <input
                  name="address"
                  required
                  autoComplete="street-address"
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                {ck.notes}
                <textarea
                  name="notes"
                  rows={3}
                  className={`${inputClass} mt-1`}
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold">{ck.orderSummary}</h2>
          <ul className="divide-y text-sm">
            {items.map((item) => {
              const product = products.find((p) => p.slug === item.slug);
              const name = product ? pick(product.name) : item.name;
              return (
                <li key={item.slug} className="flex items-center gap-3 py-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="min-w-0 flex-1">
                    {name}{" "}
                    <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold">
                    {money(item.price * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg font-bold">
            <span>{ck.subtotal}</span>
            <span>{money(totalPrice)}</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">{ck.shippingNote}</p>

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg hover:scale-[1.02]"
          >
            {ck.payButton}
          </button>

          {submitted && (
            <p className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
              {ck.notReady}
            </p>
          )}

          <p className="mt-4 text-xs text-gray-500">{ck.secureNote}</p>
        </aside>
      </form>
    </main>
  );
}
