import type { Localized } from "@/i18n/dictionary";

export type Product = {
  slug: string;
  name: Localized;
  price: number; // USD
  oldPrice: number; // USD
  emoji: string;
  image?: string;
  description: Localized;
};

export const products: Product[] = [
  {
    slug: "wireless-earbuds",
    name: { en: "Wireless Earbuds", ka: "უსადენო ყურსასმენები" },
    price: 22,
    oldPrice: 33,
    emoji: "🎧",
    description: {
      en: "Bluetooth 5.3, noise reduction, 24-hour battery life with the charging case.",
      ka: "Bluetooth 5.3, ხმაურის შემცირება, 24 საათიანი ბატარეა ქეისთან ერთად.",
    },
  },
  {
    slug: "smart-watch",
    name: { en: "Smart Watch", ka: "ჭკვიანი საათი" },
    price: 48,
    oldPrice: 66,
    emoji: "⌚",
    description: {
      en: "Heart-rate monitor, step counter, water resistant.",
      ka: "გულისცემის მონიტორინგი, ნაბიჯების მთვლელი, წყალგაუმტარი.",
    },
  },
  {
    slug: "power-bank",
    name: { en: "Power Bank 20000mAh", ka: "პაუერბანკი 20000mAh" },
    price: 18,
    oldPrice: 26,
    emoji: "🔋",
    description: {
      en: "Fast charging, 2 USB ports and Type-C.",
      ka: "სწრაფი დამუხტვა, 2 USB პორტი და Type-C.",
    },
  },
  {
    slug: "phone-stand",
    name: { en: "Phone Stand", ka: "ტელეფონის სადგამი" },
    price: 7,
    oldPrice: 11,
    emoji: "📱",
    description: {
      en: "Adjustable angle, aluminium body, non-slip.",
      ka: "რეგულირებადი კუთხე, ალუმინის კორპუსი, არ სრიალებს.",
    },
  },
  {
    slug: "led-lamp",
    name: { en: "LED Desk Lamp", ka: "LED მაგიდის ლამპა" },
    price: 14,
    oldPrice: 20,
    emoji: "💡",
    description: {
      en: "3 lighting modes, USB charging, eye-friendly light.",
      ka: "3 განათების რეჟიმი, USB დამუხტვა, თვალისთვის უსაფრთხო.",
    },
  },
  {
    slug: "car-charger",
    name: { en: "Car Charger", ka: "ავტომობილის დამტენი" },
    price: 9,
    oldPrice: 13,
    emoji: "🚗",
    description: {
      en: "Dual port, 36W fast charging.",
      ka: "ორმაგი პორტი, სწრაფი დამუხტვა 36W.",
    },
  },
];
