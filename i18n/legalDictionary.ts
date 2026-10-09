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
    title: { en: "Shipping Policy", ka: "მიწოდების პოლიტიკა" },
    sections: [
      {
        heading: { en: "Processing time", ka: "დამუშავების დრო" },
        body: {
          en: "Orders are processed within 1–3 business days after payment is confirmed.",
          ka: "შეკვეთა მუშავდება გადახდის დადასტურებიდან 1-3 სამუშაო დღეში.",
        },
      },
      {
        heading: { en: "Delivery time", ka: "მიწოდების ვადა" },
        body: {
          en: "Delivery usually takes 10–25 business days depending on the destination and the carrier. Delivery times are estimates and are not guaranteed.",
          ka: "მიწოდებას, როგორც წესი, 10-25 სამუშაო დღე სჭირდება, დანიშნულების ადგილისა და გადამზიდველის მიხედვით. ვადები სავარაუდოა და გარანტირებული არ არის.",
        },
      },
      {
        heading: { en: "Shipping costs", ka: "მიწოდების ღირებულება" },
        body: {
          en: "Shipping costs, if any, are shown before you pay.",
          ka: "მიწოდების ღირებულება (ასეთის არსებობისას) გადახდამდე გამოჩნდება.",
        },
      },
      {
        heading: { en: "Customs and duties", ka: "საბაჟო" },
        body: {
          en: "International orders may be subject to import duties, taxes or customs fees charged by your country. These are the customer's responsibility unless stated otherwise at checkout.",
          ka: "საერთაშორისო შეკვეთებზე თქვენს ქვეყანაში შეიძლება დაწესდეს იმპორტის გადასახადი ან საბაჟო მოსაკრებელი. ისინი მყიდველის ვალდებულებაა, თუ შეკვეთის გაფორმებისას სხვა რამ არ არის მითითებული.",
        },
      },
      {
        heading: { en: "Tracking", ka: "თვალყურის დევნება" },
        body: {
          en: "When your order ships, we send tracking information by email.",
          ka: "შეკვეთის გაგზავნისას ემაილზე მიიღებთ თვალთვალის ინფორმაციას.",
        },
      },
    ],
  },
  returns: {
    title: { en: "Returns Policy", ka: "დაბრუნების პოლიტიკა" },
    sections: [
      {
        heading: { en: "14-day returns", ka: "14 დღიანი დაბრუნება" },
        body: {
          en: "You may request a return within 14 days of receiving your order if the item is unused and in its original packaging.",
          ka: "შეგიძლიათ მოითხოვოთ დაბრუნება შეკვეთის მიღებიდან 14 დღის განმავლობაში, თუ ნივთი გამოუყენებელია და ორიგინალ შეფუთვაშია.",
        },
      },
      {
        heading: {
          en: "Damaged or wrong items",
          ka: "დაზიანებული ან არასწორი ნივთი",
        },
        body: {
          en: "If your item arrives damaged, defective or different from your order, contact us within 14 days with photos and we will offer a replacement or a refund.",
          ka: "თუ ნივთი დაზიანებული, დეფექტური ან შეკვეთისგან განსხვავებული მოგივიდათ, 14 დღეში მოგვწერეთ ფოტოებით და შემოგთავაზებთ ჩანაცვლებას ან თანხის დაბრუნებას.",
        },
      },
      {
        heading: { en: "How to return", ka: "როგორ დააბრუნოთ" },
        body: {
          en: "Email us at {email} with your order number. We will reply with return instructions. Please do not send items back without contacting us first.",
          ka: "მოგვწერეთ {email}-ზე შეკვეთის ნომრით. პასუხად გამოგიგზავნით ინსტრუქციას. ნივთს ჩვენთან წინასწარ კონტაქტის გარეშე ნუ გამოგვიგზავნით.",
        },
      },
      {
        heading: { en: "Refunds", ka: "თანხის დაბრუნება" },
        body: {
          en: "Approved refunds are issued to the original payment method within 14 business days after we receive and inspect the return.",
          ka: "დამტკიცებული თანხა უბრუნდება გადახდის თავდაპირველ საშუალებას დაბრუნებული ნივთის მიღებიდან და შემოწმებიდან 14 სამუშაო დღეში.",
        },
      },
    ],
  },
  privacy: {
    title: { en: "Privacy Policy", ka: "კონფიდენციალურობის პოლიტიკა" },
    sections: [
      {
        heading: { en: "What we collect", ka: "რას ვაგროვებთ" },
        body: {
          en: "When you place an order we collect your name, email, phone number and shipping address. Your cart and your language and currency choices are stored in your browser.",
          ka: "შეკვეთისას ვაგროვებთ თქვენს სახელს, ემაილს, ტელეფონს და მიწოდების მისამართს. კალათა, ენისა და ვალუტის არჩევანი ინახება თქვენს ბრაუზერში.",
        },
      },
      {
        heading: { en: "How we use it", ka: "როგორ ვიყენებთ" },
        body: {
          en: "We use this information only to process and deliver your order, provide customer support and meet legal obligations.",
          ka: "ამ ინფორმაციას ვიყენებთ მხოლოდ შეკვეთის დასამუშავებლად და მისაწოდებლად, მომხმარებელთა მხარდაჭერისა და კანონისმიერი ვალდებულებების შესასრულებლად.",
        },
      },
      {
        heading: { en: "Sharing", ka: "გაზიარება" },
        body: {
          en: "We share the necessary details with our payment provider and with shipping and fulfillment partners so that your order can be delivered. We do not sell your personal data.",
          ka: "აუცილებელ მონაცემებს ვუზიარებთ გადახდის პროვაიდერს და მიწოდების/შესრულების პარტნიორებს, რათა შეკვეთა მოგაწოდოთ. პერსონალურ მონაცემებს არ ვყიდით.",
        },
      },
      {
        heading: { en: "Payments", ka: "გადახდა" },
        body: {
          en: "Card details are handled by our payment provider and are not stored on our servers.",
          ka: "ბარათის მონაცემებს ამუშავებს გადახდის პროვაიდერი და ჩვენს სერვერებზე არ ინახება.",
        },
      },
      {
        heading: { en: "Your rights", ka: "თქვენი უფლებები" },
        body: {
          en: "You can ask us to access, correct or delete your personal data by emailing {email}.",
          ka: "შეგიძლიათ მოგვთხოვოთ თქვენი მონაცემების ნახვა, შესწორება ან წაშლა ემაილზე {email}.",
        },
      },
    ],
  },
  terms: {
    title: { en: "Terms of Service", ka: "გამოყენების წესები" },
    sections: [
      {
        heading: { en: "Using this site", ka: "საიტის გამოყენება" },
        body: {
          en: "By using this site and placing an order you agree to these terms.",
          ka: "საიტით სარგებლობით და შეკვეთის გაფორმებით ეთანხმებით ამ წესებს.",
        },
      },
      {
        heading: { en: "Orders and prices", ka: "შეკვეთები და ფასები" },
        body: {
          en: "Prices are shown in the currency you select, converted from our base currency (USD) at approximate rates; the amount charged is confirmed at payment. We may cancel an order if a product is unavailable or a price was shown in error, and you will be refunded in full.",
          ka: "ფასები ნაჩვენებია თქვენ მიერ არჩეულ ვალუტაში და გადათვლილია ჩვენი საბაზისო ვალუტიდან (USD) მიახლოებითი კურსით; ჩამოჭრილი თანხა გადახდისას დადასტურდება. შეკვეთა შეიძლება გავაუქმოთ, თუ პროდუქტი მიუწვდომელია ან ფასი შეცდომით იყო მითითებული; ამ შემთხვევაში თანხა სრულად დაგიბრუნდებათ.",
        },
      },
      {
        heading: { en: "Product information", ka: "პროდუქტის აღწერა" },
        body: {
          en: "We try to describe and photograph products accurately, but colors and details may vary slightly.",
          ka: "ვცდილობთ, პროდუქტები ზუსტად აღვწეროთ და გადავიღოთ, თუმცა ფერები და დეტალები შეიძლება ოდნავ განსხვავდებოდეს.",
        },
      },
      {
        heading: { en: "Liability", ka: "პასუხისმგებლობა" },
        body: {
          en: "To the extent permitted by law, we are not liable for indirect losses. Nothing here limits your statutory consumer rights.",
          ka: "კანონით დაშვებულ ფარგლებში არ ვართ პასუხისმგებელი არაპირდაპირ ზარალზე. ეს წესები არ ზღუდავს მომხმარებლის კანონისმიერ უფლებებს.",
        },
      },
      {
        heading: { en: "Changes", ka: "ცვლილებები" },
        body: {
          en: "We may update these terms; the version published on this page applies.",
          ka: "წესები შეიძლება განახლდეს; მოქმედებს ამ გვერდზე გამოქვეყნებული ვერსია.",
        },
      },
    ],
  },
  contact: {
    title: { en: "Contact", ka: "კონტაქტი" },
    sections: [
      {
        heading: { en: "Get in touch", ka: "დაგვიკავშირდით" },
        body: {
          en: "Email: {email}. We aim to reply within 2 business days.",
          ka: "ემაილი: {email}. ვცდილობთ, 2 სამუშაო დღეში გიპასუხოთ.",
        },
      },
    ],
  },
};
