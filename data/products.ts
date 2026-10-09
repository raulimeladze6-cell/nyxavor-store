import type { Localized } from "@/i18n/dictionary";

export type Category =
  | "electronics"
  | "home"
  | "beauty"
  | "fashion"
  | "sports"
  | "kids"
  | "pets"
  | "auto";

export const CATEGORIES: Category[] = [
  "electronics",
  "home",
  "beauty",
  "fashion",
  "sports",
  "kids",
  "pets",
  "auto",
];

export type Product = {
  slug: string;
  category: Category;
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
    category: "electronics",
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
    category: "electronics",
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
    category: "electronics",
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
    category: "electronics",
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
    category: "home",
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
    slug: "portable-blender",
    category: "home",
    name: { en: "Portable Blender", ka: "პორტატული ბლენდერი" },
    price: 16,
    oldPrice: 24,
    emoji: "🥤",
    description: {
      en: "Compact USB-rechargeable blender for smoothies on the go.",
      ka: "კომპაქტური, USB-ით დამუხტვადი ბლენდერი სმუზისთვის.",
    },
  },
  {
    slug: "face-roller",
    category: "beauty",
    name: { en: "Jade Face Roller", ka: "ნეფრიტის სახის როლერი" },
    price: 8,
    oldPrice: 13,
    emoji: "💆",
    description: {
      en: "Manual facial massage roller for a daily skincare routine.",
      ka: "სახის მასაჟის ხელის როლერი ყოველდღიური მოვლისთვის.",
    },
  },
  {
    slug: "crossbody-bag",
    category: "fashion",
    name: { en: "Crossbody Bag", ka: "მხარზე გადასაკიდი ჩანთა" },
    price: 19,
    oldPrice: 29,
    emoji: "👜",
    description: {
      en: "Lightweight everyday bag with an adjustable strap.",
      ka: "მსუბუქი ყოველდღიური ჩანთა რეგულირებადი ღვედით.",
    },
  },
  {
    slug: "sunglasses",
    category: "fashion",
    name: { en: "Polarized Sunglasses", ka: "პოლარიზებული მზის სათვალე" },
    price: 12,
    oldPrice: 19,
    emoji: "🕶️",
    description: {
      en: "Polarized lenses with UV protection and a lightweight frame.",
      ka: "პოლარიზებული ლინზები UV დაცვით და მსუბუქი ჩარჩო.",
    },
  },
  {
    slug: "yoga-mat",
    category: "sports",
    name: { en: "Yoga Mat", ka: "იოგას ხალიჩა" },
    price: 15,
    oldPrice: 24,
    emoji: "🧘",
    description: {
      en: "Non-slip exercise mat for yoga, stretching and workouts.",
      ka: "არასრიალა ხალიჩა იოგასთვის, გაჭიმვისა და ვარჯიშისთვის.",
    },
  },
  {
    slug: "kids-puzzle",
    category: "kids",
    name: { en: "Wooden Puzzle", ka: "ხის პაზლი" },
    price: 9,
    oldPrice: 14,
    emoji: "🧩",
    description: {
      en: "Colorful wooden puzzle for creative play.",
      ka: "ფერადი ხის პაზლი შემოქმედებითი თამაშისთვის.",
    },
  },
  {
    slug: "pet-glove",
    category: "pets",
    name: {
      en: "Pet Grooming Glove",
      ka: "შინაური ცხოველის საკრეჭი ხელთათმანი",
    },
    price: 8,
    oldPrice: 12,
    emoji: "🐾",
    description: {
      en: "Gentle grooming glove for removing loose fur.",
      ka: "რბილი ხელთათმანი ბალნის მოსაშორებლად.",
    },
  },
  {
    slug: "car-charger",
    category: "auto",
    name: { en: "Car Charger", ka: "ავტომობილის დამტენი" },
    price: 9,
    oldPrice: 13,
    emoji: "🚗",
    description: {
      en: "Dual port, 36W fast charging.",
      ka: "ორმაგი პორტი, სწრაფი დამუხტვა 36W.",
    },
  },
  {
    slug: "car-vacuum",
    category: "auto",
    name: {
      en: "Portable Car Vacuum",
      ka: "ავტომობილის პორტატული მტვერსასრუტი",
    },
    price: 21,
    oldPrice: 32,
    emoji: "🧹",
    description: {
      en: "Handheld cordless vacuum for the car interior.",
      ka: "უსადენო ხელის მტვერსასრუტი ავტომობილის სალონისთვის.",
    },
  },
];
