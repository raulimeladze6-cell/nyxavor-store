"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

type Props = { slug: string; name: string; price: number; emoji: string };

export default function AddToCartButton(props: Props) {
  const { addItem } = useCart();
  const { t } = useI18n();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(props);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg hover:scale-[1.02] sm:w-auto"
    >
      {added ? t("added") : t("addToCart")}
    </button>
  );
}
