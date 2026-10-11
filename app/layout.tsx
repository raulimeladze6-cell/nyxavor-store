import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AuthModal from "@/components/AuthModal";
import SocialProofPopup from "@/components/SocialProofPopup";
import SpinWheelModal from "@/components/SpinWheelModal";
import { SITE } from "@/data/site";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Nyxavor Store | Trending products at great prices",
    template: "%s | Nyxavor Store",
  },
  description:
    "Trending products across electronics, home, beauty, fashion and more at Nyxavor Store.",
  keywords: [
    "Nyxavor",
    "Online Store",
    "Batumi",
    "Shopping",
    "Discounts",
    "Electronics",
  ],
  authors: [{ name: "Nyxavor Empire" }],
  metadataBase: new URL("https://nyxavor-store.vercel.app"), // შეცვალე შენი რეალური Vercel/Custom დომენით
  robots: SITE.demo ? { index: false, follow: false } : undefined,

  // Open Graph (Facebook, Messenger, WhatsApp, Instagram, Telegram)
  openGraph: {
    title: "Nyxavor Store | Trending products at great prices",
    description:
      "Discover exclusive deals, discounts, and high-quality trending products at Nyxavor Store!",
    url: "https://nyxavor-store.vercel.app", // შეცვალე შენი Vercel დომენით
    siteName: "Nyxavor Store",
    images: [
      {
        url: "/og-image.jpg", // ფოტო უნდა ჩააგდო public/og-image.jpg ფოლდერში
        width: 1200,
        height: 630,
        alt: "Nyxavor Store Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Nyxavor Store | Trending products at great prices",
    description:
      "Discover exclusive deals and trending products at Nyxavor Store!",
    images: ["/og-image.jpg"],
  },

  // Favicon & Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
              <SocialProofPopup />
              <SpinWheelModal />
              <Analytics />
              <SpeedInsights />
            </CartProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
