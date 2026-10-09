"use client";

import { useI18n } from "@/context/I18nContext";
import { SITE } from "@/data/site";
import type { Lang } from "@/i18n/dictionary";

const TEXT: Record<Lang, string> = {
  en: "🧪 Demo store: products are samples and orders are not processed. Please don't enter real personal data.",
  ka: "🧪 სადემონსტრაციო მაღაზია: პროდუქტები სატესტოა და შეკვეთები არ მუშავდება. გთხოვთ, რეალური პირადი მონაცემები არ შეიყვანოთ.",
  ru: "🧪 Демо-магазин: товары — образцы, заказы не обрабатываются. Пожалуйста, не вводите реальные личные данные.",
  de: "🧪 Demo-Shop: Die Produkte sind Beispiele, Bestellungen werden nicht bearbeitet. Bitte geben Sie keine echten persönlichen Daten ein.",
  es: "🧪 Tienda de demostración: los productos son ejemplos y los pedidos no se procesan. No introduzcas datos personales reales.",
  fr: "🧪 Boutique de démonstration : les produits sont des exemples et les commandes ne sont pas traitées. Merci de ne pas saisir de données personnelles réelles.",
};

export default function DemoBanner() {
  const { lang } = useI18n();
  if (!SITE.demo) return null;

  return (
    <div className="bg-yellow-300 px-4 py-2 text-center text-xs font-semibold text-yellow-950">
      {TEXT[lang]}
    </div>
  );
}
