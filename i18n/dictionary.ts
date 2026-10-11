export type Lang =
  | "en"
  | "ka"
  | "ru"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "tr"
  | "zh"
  | "ja"
  | "ar"
  | "pt"
  | "pl"
  | "uk";

export type Currency =
  | "USD"
  | "EUR"
  | "GBP"
  | "GEL"
  | "TRY"
  | "AED"
  | "JPY"
  | "CNY"
  | "UAH"
  | "PLN";

export type Localized = { en: string } & Partial<Record<Lang, string>>;

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ka", label: "ქართული" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "tr", label: "Türkçe" },
  { code: "zh", label: "中文 (Chinese)" },
  { code: "ja", label: "日本語 (Japanese)" },
  { code: "ar", label: "العربية (Arabic)" },
  { code: "pt", label: "Português" },
  { code: "pl", label: "Polski" },
  { code: "uk", label: "Українська" },
];

export const CURRENCIES: Currency[] = [
  "USD",
  "EUR",
  "GBP",
  "GEL",
  "TRY",
  "AED",
  "JPY",
  "CNY",
  "UAH",
  "PLN",
];

// მიახლოებითი კურსები (1 USD = ?)
export const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  GEL: 2.7,
  TRY: 32.5,
  AED: 3.67,
  JPY: 155.0,
  CNY: 7.25,
  UAH: 41.0,
  PLN: 4.0,
};

export const DEFAULT_CURRENCY: Record<Lang, Currency> = {
  en: "USD",
  ka: "GEL",
  ru: "USD",
  de: "EUR",
  es: "EUR",
  fr: "EUR",
  it: "EUR",
  tr: "TRY",
  zh: "CNY",
  ja: "JPY",
  ar: "USD",
  pt: "EUR",
  pl: "PLN",
  uk: "UAH",
};

const en = {
  topBanner: "🔥 Sale on all products, order today!",
  cart: "Cart",
  badge: "⚡ New collection",
  heroTitle: "Gadgets & Accessories",
  heroSubtitle: "Best prices, fast delivery",
  shopNow: "Shop now",
  shipping: "🚚 Fast delivery",
  securePay: "🔒 Secure payment",
  easyReturns: "↩️ Easy returns",
  hotDeals: "🔥 Hot deals",
  addToCart: "Add to cart",
  added: "✓ Added",
  back: "← Back",
  cartTitle: "Your cart",
  cartEmpty: "Your cart is empty",
  backToShop: "Back to shop",
  total: "Total:",
  checkout: "Checkout",
  clearCart: "Clear cart",
  remove: "Remove",
  footer: "© 2026 Nyxavor. All rights reserved.",
};

export type Key = keyof typeof en;

// დამხმარე თარგმანები დანარჩენი ენებისთვის (რომ აპმა არ დაარტყას ერორი, ინგლისურით ივსება ნაგულისხმევად)
const baseLangDict = (overrides: Partial<Record<Key, string>>) => ({
  ...en,
  ...overrides,
});

export const dictionary: Record<Lang, Record<Key, string>> = {
  en,
  ka: {
    topBanner: "🔥 ფასდაკლებები ყველა პროდუქტზე, შეუკვეთე დღესვე!",
    cart: "კალათა",
    badge: "⚡ ახალი კოლექცია",
    heroTitle: "გაჯეტები და აქსესუარები",
    heroSubtitle: "საუკეთესო ფასები, სწრაფი მიწოდება",
    shopNow: "იყიდე ახლავე",
    shipping: "🚚 სწრაფი მიწოდება",
    securePay: "🔒 უსაფრთხო გადახდა",
    easyReturns: "↩️ მარტივი დაბრუნება",
    hotDeals: "🔥 ცხელი შეთავაზებები",
    addToCart: "კალათაში დამატება",
    added: "✓ დაემატა",
    back: "← უკან",
    cartTitle: "თქვენი კალათა",
    cartEmpty: "კალათა ცარიელია",
    backToShop: "მაღაზიაში დაბრუნება",
    total: "სულ:",
    checkout: "შეკვეთის გაფორმება",
    clearCart: "გასუფთავება",
    remove: "წაშლა",
    footer: "© 2026 Nyxavor. ყველა უფლება დაცულია.",
  },
  ru: baseLangDict({
    topBanner: "🔥 Скидки на все товары, заказывайте сегодня!",
    cart: "Корзина",
    badge: "⚡ Новая коллекция",
    heroTitle: "Гаджеты и аксессуары",
    heroSubtitle: "Лучшие цены, быстрая доставка",
    shopNow: "Купить сейчас",
    total: "Итого:",
    checkout: "Оформить заказ",
    cartEmpty: "Корзина пуста",
  }),
  de: baseLangDict({
    topBanner: "🔥 Rabatte auf alle Produkte, jetzt bestellen!",
    cart: "Warenkorb",
    heroTitle: "Gadgets & Zubehör",
    checkout: "Zur Kasse",
  }),
  es: baseLangDict({
    topBanner: "🔥 Descuentos en todos los productos, ¡pide hoy!",
    cart: "Carrito",
    checkout: "Finalizar compra",
  }),
  fr: baseLangDict({
    topBanner: "🔥 Remises sur tous les produits, commandez aujourd'hui !",
    cart: "Panier",
    checkout: "Commander",
  }),
  it: baseLangDict({
    topBanner: "🔥 Sconti su tutti i prodotti, ordina oggi!",
    cart: "Carrello",
    checkout: "Procedi al checkout",
  }),
  tr: baseLangDict({
    topBanner: "🔥 Tüm ürünlerde indirim, bugün sipariş verin!",
    cart: "Sepet",
    checkout: "Siparişi Tamamла",
  }),
  zh: baseLangDict({
    topBanner: "🔥 所有商品特惠，今天订购！",
    cart: "购物车",
    checkout: "结账",
  }),
  ja: baseLangDict({
    topBanner: "🔥 全商品セール中、今すぐ注文！",
    cart: "カート",
    checkout: "レジに進む",
  }),
  ar: baseLangDict({
    topBanner: "🔥 خصم على جميع المنتجات، اطلب اليوم!",
    cart: "عربة التسوق",
    checkout: "إتمام الشراء",
  }),
  pt: baseLangDict({
    topBanner: "🔥 Descontos em todos os produtos, peçajá!",
    cart: "Carrinho",
    checkout: "Finalizar compra",
  }),
  pl: baseLangDict({
    topBanner: "🔥 Zniżki na wszystkie produkty, zamów dzisiaj!",
    cart: "Koszyk",
    checkout: "Do kasy",
  }),
  uk: baseLangDict({
    topBanner: "🔥 Знижки на всі товари, замовляйте сьогодні!",
    cart: "Кошиק",
    checkout: "Оформити замовлення",
  }),
};
