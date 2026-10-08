"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalCount } = useCart();

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-xl font-bold tracking-widest">
        NYXAVOR
      </Link>
      <Link
        href="/cart"
        className="relative rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        🛒 კალათა
        {totalCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white">
            {totalCount}
          </span>
        )}
      </Link>
    </header>
  );
}
