export const CURRENCY = "₾";

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice: number;
  emoji: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: "wireless-earbuds",
    name: "უსადენო ყურსასმენები",
    price: 59,
    oldPrice: 89,
    emoji: "🎧",
    description:
      "Bluetooth 5.3, ხმაურის შემცირება, 24 საათიანი ბატარეა ქეისთან ერთად.",
  },
  {
    slug: "smart-watch",
    name: "ჭკვიანი საათი",
    price: 129,
    oldPrice: 179,
    emoji: "⌚",
    description: "გულისცემის მონიტორინგი, ნაბიჯების მთვლელი, წყალგაუმტარი.",
  },
  {
    slug: "power-bank",
    name: "პაუერბანკი 20000mAh",
    price: 49,
    oldPrice: 69,
    emoji: "🔋",
    description: "სწრაფი დამუხტვა, 2 USB პორტი და Type-C.",
  },
  {
    slug: "phone-stand",
    name: "ტელეფონის სადგამი",
    price: 19,
    oldPrice: 29,
    emoji: "📱",
    description: "რეგულირებადი კუთხე, ალუმინის კორპუსი, არ სრიალებს.",
  },
  {
    slug: "led-lamp",
    name: "LED მაგიდის ლამპა",
    price: 39,
    oldPrice: 55,
    emoji: "💡",
    description: "3 განათების რეჟიმი, USB დამუხტვა, თვალისთვის უსაფრთხო.",
  },
  {
    slug: "car-charger",
    name: "ავტომობილის დამტენი",
    price: 25,
    oldPrice: 35,
    emoji: "🚗",
    description: "ორმაგი პორტი, სწრაფი დამუხტვა 36W.",
  },
];
