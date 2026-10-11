"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";

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

const PHONE_CODES = [
  { code: "+1", country: "United States / Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+995", country: "Georgia", flag: "🇬🇪" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
];

const inputClass =
  "w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition";

type Status = "idle" | "sending" | "done" | "error";
type PaymentMethod = "card" | "paypal";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, pick, money, lang, currency } = useI18n();
  const { user } = useAuth();

  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [phonePrefix, setPhonePrefix] = useState("+1");
  const [customPhonePrefix, setCustomPhonePrefix] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");

  const regionNames = new Intl.DisplayNames([lang], { type: "region" });
  const countries = COUNTRY_CODES.map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
  })).sort((a, b) => a.name.localeCompare(b.name, lang));

  if (status === "done") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center text-white">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-4xl text-emerald-400 border border-emerald-500/30 mb-4 animate-bounce">
          ✓
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("successTitle")}</h1>
        <p className="mt-3 text-gray-300">{t("successText")}</p>
        {orderId && (
          <p className="mt-4 inline-block rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 border border-gray-700">
            {t("orderNumber")}:{" "}
            <span className="font-mono font-bold text-pink-400">{orderId}</span>
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/profile"
            className="rounded-full bg-gray-800 border border-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-700 transition"
          >
            {t("account")}
          </Link>
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white hover:opacity-90 transition shadow-lg shadow-pink-500/20"
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
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold">{t("cartEmpty")}</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg"
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
      alert(t("loginRequired") || "Please log in to place an order!");
      setStatus("error");
      return;
    }

    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const finalPrefix =
      phonePrefix === "OTHER" ? customPhonePrefix : phonePrefix;
    const fullPhone = `${finalPrefix} ${form.get("phone")}`;
    const finalCountry =
      selectedCountry === "OTHER" ? customCountry : selectedCountry;

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          totalAmount: totalPrice,
          name: form.get("name"),
          email: form.get("email"),
          phone: fullPhone,
          country: finalCountry,
          city: form.get("city"),
          postal: form.get("postal"),
          address: form.get("address"),
          notes: form.get("notes"),
          paymentMethod,
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
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">
        {t("checkout")}
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="space-y-6 lg:col-span-2">
          {/* Contact Information */}
          <section className="rounded-2xl bg-gray-800 p-4 shadow-sm sm:p-6 border border-gray-700">
            <h2 className="mb-4 text-lg font-bold text-pink-400 flex items-center gap-2">
              <span>👤</span> {t("contact")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {t("fullName")}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  defaultValue={user?.email?.split("@")[0] || ""}
                  className={`${inputClass} mt-1`}
                  placeholder="John Doe"
                />
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {t("email")}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue={user?.email || ""}
                  className={`${inputClass} mt-1`}
                  placeholder="customer@example.com"
                />
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {t("phone")}
                <div className="mt-1 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="rounded-lg border border-gray-600 bg-gray-900 px-2 py-2 text-sm text-white focus:border-pink-500 focus:outline-none max-w-[130px]"
                    >
                      {PHONE_CODES.map((p) => (
                        <option
                          key={`${p.code}-${p.country}`}
                          value={p.code}
                          className="bg-gray-800 text-white"
                        >
                          {p.flag} {p.code}
                        </option>
                      ))}
                      <option
                        value="OTHER"
                        className="bg-gray-800 text-pink-400 font-semibold"
                      >
                        🌐 Other (+...)
                      </option>
                    </select>

                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="555 012 345"
                      className={inputClass}
                    />
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-2xl bg-gray-800 p-4 shadow-sm sm:p-6 border border-gray-700">
            <h2 className="mb-4 text-lg font-bold text-pink-400 flex items-center gap-2">
              <span>📍</span> {t("shippingAddress")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {t("country")}
                <select
                  name="country"
                  required
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  autoComplete="country"
                  className={`${inputClass} mt-1`}
                >
                  <option value="" disabled className="bg-gray-800">
                    {t("selectCountry")}
                  </option>
                  {countries.map((c) => (
                    <option
                      key={c.code}
                      value={c.name}
                      className="bg-gray-800 text-white"
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-gray-300">
                {t("city")}
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={`${inputClass} mt-1`}
                  placeholder="City"
                />
              </label>
              <label className="block text-sm font-medium text-gray-300">
                {t("postalCode")}
                <input
                  name="postal"
                  required
                  autoComplete="postal-code"
                  className={`${inputClass} mt-1`}
                  placeholder="ZIP / Postal Code"
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2 text-gray-300">
                {t("address")}
                <input
                  name="address"
                  required
                  placeholder="Street address, apartment, suite, etc."
                  autoComplete="street-address"
                  className={`${inputClass} mt-1`}
                />
              </label>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl bg-gray-800 p-4 shadow-sm sm:p-6 border border-gray-700 sticky top-4">
          <h2 className="mb-4 text-lg font-bold text-pink-400">
            {t("orderSummary")}
          </h2>
          <ul className="divide-y divide-gray-700 text-sm max-h-60 overflow-y-auto pr-1">
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
            <span>{t("total")}</span>
            <span className="text-pink-400">{money(totalPrice)}</span>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3.5 font-bold text-white shadow-lg transition"
          >
            {status === "sending" ? (
              <span>{t("sending")}</span>
            ) : (
              <span>{t("placeOrder")}</span>
            )}
          </button>
        </aside>
      </form>
    </main>
  );
}
