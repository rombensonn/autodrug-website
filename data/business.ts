export const business = {
  name: "Авто друг",
  city: "Балашиха",
  region: "Московская область",
  address: "Балашиха, Керамическая улица, 2Б",
  streetAddress: "Керамическая улица, 2Б",
  phoneDisplay: "+7 (929) 942-25-13",
  phoneHref: "tel:+79299422513",
  whatsappUrl:
    "https://wa.me/79299422513?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%20%D0%90%D0%B2%D1%82%D0%BE%20%D0%B4%D1%80%D1%83%D0%B3.",
  mapUrl: "https://yandex.com/maps/-/CPc5b6PC",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?text=%D0%91%D0%B0%D0%BB%D0%B0%D1%88%D0%B8%D1%85%D0%B0%2C%20%D0%9A%D0%B5%D1%80%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%202%D0%91",
  rating: "5.0",
  reviewsCount: 64,
  ratingsCount: 89,
  workTime: "Ежедневно 10:00-22:00",
  workTimeShort: "10:00-22:00",
  areaServed:
    "Работаем для клиентов из Балашихи, Железнодорожного, Ольгино и ближайших районов",
  payment: ["Наличные", "Карта", "Банковский перевод"],
  amenities: ["Парковка", "Wi-Fi", "Туалет", "Запчасти и автотовары"],
  guarantee:
    "Гарантия на выполненные работы - условия уточняются при заказе",
  consentVersion: "2026-05-08",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.ru"
} as const;

export const primaryCta = {
  repair: "Записаться на ремонт",
  estimate: "Рассчитать стоимость",
  call: "Позвонить сейчас",
  route: "Построить маршрут"
};
