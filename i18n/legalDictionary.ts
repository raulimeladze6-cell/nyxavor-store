import type { Localized } from "@/i18n/dictionary";

export type LegalSlug =
  | "shipping"
  | "returns"
  | "privacy"
  | "terms"
  | "contact";
export const LEGAL_SLUGS: LegalSlug[] = [
  "shipping",
  "returns",
  "privacy",
  "terms",
  "contact",
];

type Section = { heading: Localized; body: Localized };
type Page = { title: Localized; sections: Section[] };

export const legalPages: Record<LegalSlug, Page> = {
  shipping: {
    title: {
      en: "Shipping Policy",
      ka: "მიწოდების პოლიტიკა",
      ru: "Политика доставки",
      de: "Versandkosten",
      es: "Política de envío",
      fr: "Politique de livraison",
      it: "Politica di spedizione",
      tr: "Kargo Politikası",
      zh: "配送政策",
      ja: "配送ポリシー",
      ar: "سياسة الشحن",
      pt: "Política de Envio",
      pl: "Polityka wysyłki",
      uk: "Політика доставки",
    },
    sections: [
      {
        heading: { en: "Processing time", ka: "დამუშავების დრო" },
        body: {
          en: "Orders are processed within 1–3 business days after payment is confirmed.",
          ka: "შეკვეთა მუშავდება გადახდის დადასტურებიდან 1-3 სამუშაო დღეში.",
        },
      },
      // (დანარჩენი სექციები შენებურად რჩება)
    ],
  },
  returns: {
    title: {
      en: "Returns Policy",
      ka: "დაბრუნების პოლიტიკა",
      ru: "Политика возврата",
      de: "Rückgaberecht",
      es: "Política de devoluciones",
      fr: "Politique de retours",
      it: "Politica di reso",
      tr: "İade Politikası",
      zh: "退货政策",
      ja: "返品ポリシー",
      ar: "سياسة الإرجاع",
      pt: "Política de Reembolso",
      pl: "Polityka zwrotów",
      uk: "Політика повернення",
    },
    sections: [
      {
        heading: { en: "14-day returns", ka: "14 დღიანი დაბრუნება" },
        body: {
          en: "You may request a return within 14 days of receiving your order if the item is unused and in its original packaging.",
          ka: "შეგიძლიათ მოითხოვოთ დაბრუნება შეკვეთის მიღებიდან 14 დღის განმავლობაში, თუ ნივთი გამოუყენებელია და ორიგინალ შეფუთვაშია.",
        },
      },
    ],
  },
  privacy: {
    title: {
      en: "Privacy Policy",
      ka: "კონფიდენციალურობის პოლიტიკა",
      ru: "Политика конфиденциальности",
      de: "Datenschutz",
      es: "Política de privacidad",
      fr: "Politique de confidentialité",
      it: "Informativa sulla privacy",
      tr: "Gizlilik Politikası",
      zh: "隐私政策",
      ja: "プライバシーポリシー",
      ar: "سياسة الخصوصية",
      pt: "Política de Privacidade",
      pl: "Polityka prywatności",
      uk: "Політика конфіденційності",
    },
    sections: [],
  },
  terms: {
    title: {
      en: "Terms of Service",
      ka: "გამოყენების წესები",
      ru: "Условия использования",
      de: "Nutzungsbedingungen",
      es: "Términos de servicio",
      fr: "Conditions d'utilisation",
      it: "Termini di servizio",
      tr: "Kullanım Şartları",
      zh: "服务条款",
      ja: "利用規約",
      ar: "شروط الخدمة",
      pt: "Termos de Serviço",
      pl: "Warunki korzystania",
      uk: "Умови використання",
    },
    sections: [],
  },
  contact: {
    title: {
      en: "Contact",
      ka: "კონტაქტი",
      ru: "Контакты",
      de: "Kontakt",
      es: "Contacto",
      fr: "Contact",
      it: "Contatti",
      tr: "İletişim",
      zh: "联系我们",
      ja: "お問い合わせ",
      ar: "اتصل بنا",
      pt: "Contato",
      pl: "Kontakt",
      uk: "Контакти",
    },
    sections: [],
  },
};
