export const business = {
  name: "Авто друг",
  city: "Балашиха",
  region: "Московская область",
  address: "Балашиха, Заводская улица, 7А",
  streetAddress: "Заводская улица, 7А",
  phoneDisplay: "+7 (929) 942-25-13",
  phoneHref: "tel:+79299422513",
  emailDisplay: "g30107@gmail.com",
  emailHref: "mailto:g30107@gmail.com",
  whatsappUrl:
    "https://wa.me/79299422513?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%20%D0%90%D0%B2%D1%82%D0%BE%20%D0%B4%D1%80%D1%83%D0%B3.",
  mapUrl:
    "https://yandex.ru/maps/?text=%D0%91%D0%B0%D0%BB%D0%B0%D1%88%D0%B8%D1%85%D0%B0%2C%20%D0%97%D0%B0%D0%B2%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%207%D0%90",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?mode=search&text=%D0%91%D0%B0%D0%BB%D0%B0%D1%88%D0%B8%D1%85%D0%B0%2C%20%D0%97%D0%B0%D0%B2%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%207%D0%90&z=16",
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
  legal: {
    operatorName: "ИП Гиголашвили Бесик Гайозович",
    inn: "501210670335",
    ogrnip: "312501203300033",
    registrationDate: "02.02.2012",
    egripExtractDate: "08.05.2026",
    egripExtractNumber: "ИЭ9965-26-43866405",
    registrationAuthority: "Межрайонная инспекция Федеральной налоговой службы №23 по Московской области",
    registrationAuthorityAddress:
      "144000, Россия, Московская область, г. Электросталь, ул. Советская, 26А",
    taxAuthority: "Межрайонная инспекция Федеральной налоговой службы №20 по Московской области",
    mainOkved:
      "45.20 Техническое обслуживание и ремонт автотранспортных средств",
    personalDataEmail: "g30107@gmail.com"
  },
  consentVersion: "2026-05-10",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://autodrug.online",
  logo: "/images/logo.png"
} as const;

export const primaryCta = {
  repair: "Записаться на ремонт",
  estimate: "Рассчитать стоимость",
  call: "Позвонить сейчас",
  route: "Построить маршрут"
};
