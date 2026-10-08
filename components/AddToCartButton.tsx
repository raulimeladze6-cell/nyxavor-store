"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = { slug: string; name: string; price: number; emoji: string };

export default function AddToCartButton(props: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(props);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
    >
      {added ? "✓ დაემატა" : "კალათაში დამატება"}
    </button>
  );
}
