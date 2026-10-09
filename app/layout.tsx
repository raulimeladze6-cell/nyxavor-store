import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Nyxavor | Trending products at great prices",
  description:
    "Trending products across electronics, home, beauty, fashion and more",
  robots: SITE.demo ? { index: false, follow: false } : undefined,
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("nyxavor-theme");
    if (t !== "dark" && t !== "comfort" && t !== "light") {
      t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <I18nProvider>
          <CartProvider>
            <DemoBanner />
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
