import type { Lang } from "@/i18n/dictionary";

const en = {
  placeOrder: "Place demo order",
  sending: "Sending...",
  successTitle: "Demo order received",
  successText:
    "Thank you! This is a demo store, so no payment was taken and nothing will be shipped.",
  orderNumber: "Order number",
  errorText: "Something went wrong. Please check your details and try again.",
  demoNote: "Demo mode: no payment is taken.",
};

export type OrderKey = keyof typeof en;

export const orderText: Record<Lang, Record<OrderKey, string>> = {
  en,
  ka: {
    placeOrder: "დემო შეკვეთის გაგზავნა",
    sending: "იგზავნება...",
    successTitle: "დემო შეკვეთა მიღებულია",
    successText:
      "გმადლობთ! ეს სადემონსტრაციო მაღაზიაა, ამიტომ თანხა არ ჩამოგეჭრათ და არაფერი გაიგზავნება.",
    orderNumber: "შეკვეთის ნომერი",
    errorText: "შეცდომა მოხდა. შეამოწმეთ მონაცემები და სცადეთ თავიდან.",
    demoNote: "დემო რეჟიმი: თანხა არ ჩამოიჭრება.",
  },
  ru: {
    placeOrder: "Отправить демо-заказ",
    sending: "Отправка...",
    successTitle: "Демо-заказ получен",
    successText:
      "Спасибо! Это демо-магазин, поэтому оплата не списывалась и ничего не будет отправлено.",
    orderNumber: "Номер заказа",
    errorText: "Что-то пошло не так. Проверьте данные и попробуйте снова.",
    demoNote: "Демо-режим: оплата не списывается.",
  },
  de: {
    placeOrder: "Demo-Bestellung senden",
    sending: "Wird gesendet...",
    successTitle: "Demo-Bestellung erhalten",
    successText:
      "Danke! Dies ist ein Demo-Shop, es wurde keine Zahlung abgebucht und nichts wird versendet.",
    orderNumber: "Bestellnummer",
    errorText:
      "Etwas ist schiefgelaufen. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.",
    demoNote: "Demo-Modus: Es wird nichts abgebucht.",
  },
  es: {
    placeOrder: "Enviar pedido de prueba",
    sending: "Enviando...",
    successTitle: "Pedido de prueba recibido",
    successText:
      "¡Gracias! Esta es una tienda de demostración: no se cobró ningún pago y no se enviará nada.",
    orderNumber: "Número de pedido",
    errorText: "Algo salió mal. Revisa tus datos e inténtalo de nuevo.",
    demoNote: "Modo demo: no se cobra ningún pago.",
  },
  fr: {
    placeOrder: "Envoyer la commande de test",
    sending: "Envoi...",
    successTitle: "Commande de test reçue",
    successText:
      "Merci ! Ceci est une boutique de démonstration : aucun paiement n'a été prélevé et rien ne sera expédié.",
    orderNumber: "Numéro de commande",
    errorText:
      "Une erreur s'est produite. Vérifiez vos informations et réessayez.",
    demoNote: "Mode démo : aucun paiement n'est prélevé.",
  },
};
