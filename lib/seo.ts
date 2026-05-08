import { business } from "@/data/business";
import { ServiceCategory } from "@/data/services";
import { absoluteUrl } from "@/lib/utils";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    image: [
      absoluteUrl("/images/hero-auto-service.jpg"),
      absoluteUrl("/images/tire-service.jpg"),
      absoluteUrl("/images/engine-repair.jpg")
    ],
    telephone: business.phoneDisplay,
    url: absoluteUrl("/"),
    priceRange: "₽₽",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: `${business.city}, ${business.region}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      streetAddress: business.streetAddress,
      addressCountry: "RU"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "10:00",
        closes: "22:00"
      }
    ]
  };
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function serviceJsonLd(service: ServiceCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.h1,
    description: service.seoDescription,
    areaServed: `${business.city}, ${business.region}`,
    provider: {
      "@type": "AutoRepair",
      name: business.name,
      telephone: business.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        addressLocality: business.city,
        streetAddress: business.streetAddress,
        addressCountry: "RU"
      }
    },
    offers: service.offerPrice
      ? {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: service.offerPrice,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/uslugi/${service.slug}`)
        }
      : undefined
  };
}

export function breadcrumbsJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}
