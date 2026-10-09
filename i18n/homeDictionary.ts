import type { Lang } from "@/i18n/dictionary";
import type { Category } from "@/data/products";

const en = {
  heroTitle: "Everything you need, in one place",
  heroSubtitle: "Trending products at great prices",
  popular: "🔥 Popular products",
  all: "All",
  search: "Search products...",
  noResults: "No products found",
};

export type HomeKey = keyof typeof en;

export const homeText: Record<Lang, Record<HomeKey, string>> = {
  en,
  ka: {
    heroTitle: "ყველაფერი, რაც გჭირდება, ერთ ადგილას",
    heroSubtitle: "პოპულარული პროდუქტები კარგ ფასად",
    popular: "🔥 პოპულარული პროდუქტები",
    all: "ყველა",
    search: "პროდუქტის ძებნა...",
    noResults: "პროდუქტი ვერ მოიძებნა",
  },
  ru: {
    heroTitle: "Всё, что вам нужно, в одном месте",
    heroSubtitle: "Популярные товары по выгодным ценам",
    popular: "🔥 Популярные товары",
    all: "Все",
    search: "Поиск товаров...",
    noResults: "Товары не найдены",
  },
  de: {
    heroTitle: "Alles, was Sie brauchen, an einem Ort",
    heroSubtitle: "Trendprodukte zu tollen Preisen",
    popular: "🔥 Beliebte Produkte",
    all: "Alle",
    search: "Produkte suchen...",
    noResults: "Keine Produkte gefunden",
  },
  es: {
    heroTitle: "Todo lo que necesitas, en un solo lugar",
    heroSubtitle: "Productos de moda a buenos precios",
    popular: "🔥 Productos populares",
    all: "Todos",
    search: "Buscar productos...",
    noResults: "No se encontraron productos",
  },
  fr: {
    heroTitle: "Tout ce dont vous avez besoin, au même endroit",
    heroSubtitle: "Produits tendance à petits prix",
    popular: "🔥 Produits populaires",
    all: "Tous",
    search: "Rechercher des produits...",
    noResults: "Aucun produit trouvé",
  },
};

export const categoryNames: Record<Lang, Record<Category, string>> = {
  en: {
    electronics: "Electronics",
    home: "Home & Kitchen",
    beauty: "Beauty & Care",
    fashion: "Fashion",
    sports: "Sports & Outdoors",
    kids: "Kids & Toys",
    pets: "Pets",
    auto: "Auto",
  },
  ka: {
    electronics: "ელექტრონიკა",
    home: "სახლი და სამზარეულო",
    beauty: "სილამაზე და მოვლა",
    fashion: "მოდა",
    sports: "სპორტი და ბუნება",
    kids: "ბავშვები და სათამაშოები",
    pets: "შინაური ცხოველები",
    auto: "ავტო",
  },
  ru: {
    electronics: "Электроника",
    home: "Дом и кухня",
    beauty: "Красота и уход",
    fashion: "Одежда и мода",
    sports: "Спорт и отдых",
    kids: "Детям и игрушки",
    pets: "Зоотовары",
    auto: "Авто",
  },
  de: {
    electronics: "Elektronik",
    home: "Haus & Küche",
    beauty: "Beauty & Pflege",
    fashion: "Mode",
    sports: "Sport & Outdoor",
    kids: "Kinder & Spielzeug",
    pets: "Haustiere",
    auto: "Auto",
  },
  es: {
    electronics: "Electrónica",
    home: "Hogar y cocina",
    beauty: "Belleza y cuidado",
    fashion: "Moda",
    sports: "Deportes y aire libre",
    kids: "Niños y juguetes",
    pets: "Mascotas",
    auto: "Auto",
  },
  fr: {
    electronics: "Électronique",
    home: "Maison et cuisine",
    beauty: "Beauté et soins",
    fashion: "Mode",
    sports: "Sport et plein air",
    kids: "Enfants et jouets",
    pets: "Animaux",
    auto: "Auto",
  },
};
