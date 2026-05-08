import { Metadata } from "next";
import { business } from "@/data/business";

export const defaultSeo = {
  title: "Автосервис и шиномонтаж в Балашихе - Авто друг",
  description:
    "Автосервис «Авто друг» в Балашихе: диагностика, ремонт двигателя, подвески, тормозов, системы охлаждения и шиномонтаж R10-R24. Работаем ежедневно до 22:00."
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/hero-auto-service.jpg"
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const base = business.siteUrl.replace(/\/$/, "");
  const url = `${base}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(base),
    alternates: {
      canonical: url,
      languages: {
        "ru-RU": url
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${business.name} - автосервис в Балашихе`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
