import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { serviceCategories } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.replace(/\/$/, "");
  const staticPages = [
    "",
    "/uslugi",
    "/tseny",
    "/otzyvy",
    "/kontakty",
    "/privacy",
    "/thanks"
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7
    })),
    ...serviceCategories.map((service) => ({
      url: `${base}/uslugi/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85
    }))
  ];
}
