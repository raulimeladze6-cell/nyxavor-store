import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Nyxavor | Gadgets & Accessories",
  description: "Gadgets and accessories at the best prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
