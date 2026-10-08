"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CURRENCY } from "@/data/products";

export default function CartPage() {
  const { items, removeItem, changeQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold">კალათა ცარიელია</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          მაღაზიაში დაბრუნება
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">თქვენი კალათა</h1>

      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center gap-4 py-4">
            <span className="text-4xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600">
                {item.price} {CURRENCY}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQuantity(item.slug, -1)}
                className="h-8 w-8 rounded border"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => changeQuantity(item.slug, 1)}
                className="h-8 w-8 rounded border"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.slug)}
              className="text-red-600"
            >
              წაშლა
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t pt-4 text-xl font-bold">
        <span>სულ:</span>
        <span>
          {totalPrice.toFixed(2)} {CURRENCY}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href="/checkout"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          შეკვეთის გაფორმება
        </Link>
        <button onClick={clearCart} className="rounded-lg border px-6 py-3">
          გასუფთავება
        </button>
      </div>
    </main>
  );
}
