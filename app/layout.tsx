import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import { YandexMetrica } from "@/components/layout/YandexMetrica";
import { defaultSeo } from "@/data/seo";

export const metadata: Metadata = {
  ...defaultSeo,
  applicationName: "Авто друг"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:shadow-lift"
          href="#main"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBottomBar />
        <PageViewTracker />
        <YandexMetrica />
      </body>
    </html>
  );
}
