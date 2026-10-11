"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

type PurchaseNotice = {
  id: number;
  name: string;
  city: string;
  product: string;
  timeAgo: string;
  emoji: string;
};

// საერთაშორისო + ადგილობრივი მონაცემები
const dataByLang = {
  ka: [
    { name: "Alex", city: "London", product: "E88 PRO Drone", emoji: "🚁" },
    { name: "გიორგი", city: "ბათუმი", product: "E88 PRO Drone", emoji: "🚁" },
    {
      name: "Sophia",
      city: "New York",
      product: "Wireless Earbuds",
      emoji: "🎧",
    },
    {
      name: "ლუკა",
      city: "თბილისი",
      product: "Smart Watch Ultra",
      emoji: "⌚",
    },
    { name: "Marco", city: "Rome", product: "Gaming Mouse Pad", emoji: "🖱️" },
    { name: "ანა", city: "ქუთაისი", product: "Baby Nail Trimmer", emoji: "👶" },
    {
      name: "Lukas",
      city: "Berlin",
      product: "Smart Watch Ultra",
      emoji: "⌚",
    },
  ],
  en: [
    { name: "Alex", city: "London", product: "E88 PRO Drone", emoji: "🚁" },
    {
      name: "Sophia",
      city: "New York",
      product: "Wireless Earbuds",
      emoji: "🎧",
    },
    { name: "Marco", city: "Rome", product: "Gaming Mouse Pad", emoji: "🖱️" },
    {
      name: "Lukas",
      city: "Berlin",
      product: "Smart Watch Ultra",
      emoji: "⌚",
    },
    {
      name: "Elena",
      city: "Madrid",
      product: "Baby Nail Trimmer",
      emoji: "👶",
    },
    { name: "Kenji", city: "Tokyo", product: "Wireless Earbuds", emoji: "🎧" },
  ],
};

export default function SocialProofPopup() {
  const { lang } = useI18n();
  const [current, setCurrent] = useState<PurchaseNotice | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const dataset =
        dataByLang[lang as keyof typeof dataByLang] || dataByLang.en;
      const randomItem = dataset[Math.floor(Math.random() * dataset.length)];
      const randomTime = Math.floor(Math.random() * 10) + 1;

      const timeText =
        lang === "ka" ? `${randomTime} წუთის წინ` : `${randomTime} mins ago`;

      setCurrent({
        id: Date.now(),
        name: randomItem.name,
        city: randomItem.city,
        product: randomItem.product,
        timeAgo: timeText,
        emoji: randomItem.emoji,
      });

      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, [lang]);

  if (!current || !visible) return null;

  const justPurchasedText =
    lang === "ka" ? "ახლახან შეიძინა" : "Just purchased";

  return (
    <div className="fixed bottom-12 left-5 z-40 max-w-xs animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 rounded-2xl bg-gray-900/90 p-3.5 border border-gray-800 shadow-2xl backdrop-blur-md text-white">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-2xl border border-pink-500/20">
          {current.emoji}
        </div>
        <div className="space-y-0.5 text-xs">
          <p className="font-bold text-white">
            {current.name}{" "}
            <span className="text-gray-400 font-normal">({current.city})</span>
          </p>
          <p className="text-pink-400 font-semibold">{current.product}</p>
          <p className="text-[10px] text-gray-400">
            {justPurchasedText} • {current.timeAgo}
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-auto text-gray-500 hover:text-white text-xs font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
