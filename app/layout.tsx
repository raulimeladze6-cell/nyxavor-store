import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AuthModal from "@/components/AuthModal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Nyxavor | Trending products at great prices",
  description:
    "Trending products across electronics, home, beauty, fashion and more",
  robots: SITE.demo ? { index: false, follow: false } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("nyxavor-theme");if(t!=="dark"&&t!=="comfort"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <I18nProvider>
          <AuthProvider>
            <CartProvider>
              <DemoBanner />
              <Header />
              {children}
              <Footer />
              <AuthModal />
            </CartProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
