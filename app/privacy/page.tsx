import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/section";
import { business } from "@/data/business";
import { buildMetadata } from "@/data/seo";

export const metadata: Metadata = buildMetadata({
  title: "Политика обработки персональных данных - Авто друг",
  description:
    "Политика обработки персональных данных сайта автосервиса «Авто друг» в Балашихе.",
  path: "/privacy"
});

const sections = [
  {
    title: "Оператор",
    text:
      `Оператор: ${business.legal.operatorName}. ИНН: ${business.legal.inn}. ОГРНИП: ${business.legal.ogrnip}. Дата регистрации: ${business.legal.registrationDate}. E-mail для обращений по ПДн: ${business.legal.personalDataEmail}. Адрес автосервиса: ${business.address}.`
  },
  {
    title: "Сведения о деятельности",
    text:
      `Основной вид деятельности по ЕГРИП: ${business.legal.mainOkved}. Сведения взяты из выписки ЕГРИП от 08.05.2026.`
  },
  {
    title: "Цели обработки",
    text:
      "Обработка заявки, обратная связь, запись на ремонт, уточнение стоимости и сроков, помощь с подбором запчастей."
  },
  {
    title: "Состав данных",
    text:
      "Имя, телефон, марка автомобиля, модель автомобиля, год выпуска, описание проблемы, выбранная услуга, удобная дата, удобное время и способ связи."
  },
  {
    title: "Правовое основание",
    text: "Правовое основание обработки - согласие пользователя."
  },
  {
    title: "Срок хранения",
    text: "До достижения цели обработки или до отзыва согласия."
  },
  {
    title: "Место хранения",
    text: "Сервер и база данных на территории Российской Федерации."
  },
  {
    title: "Передача третьим лицам",
    text:
      "По умолчанию персональные данные не передаются зарубежным сервисам. Передача возможна только в случаях, предусмотренных законом, или при использовании российских сервисов, необходимых для обработки заявки."
  },
  {
    title: "Cookies и карты",
    text:
      "Сайт использует технические cookies для работы админ-панели. Если включена Яндекс.Метрика, это указывается владельцем сайта отдельно. В блоке контактов может загружаться карта Яндекса; при отображении карты браузер обращается к стороннему картографическому сервису."
  },
  {
    title: "Отзыв согласия",
    text:
      "Отозвать согласие можно по телефону автосервиса или через обращение по e-mail, указанному владельцем сайта."
  }
];

export default function PrivacyPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ href: "/privacy", label: "Политика конфиденциальности" }]} />
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black leading-tight text-slate-950">
          Политика обработки персональных данных
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Документ описывает, какие данные собираются через формы сайта и как они
          используются для обработки заявок автосервиса.
        </p>
      </div>
      <div className="mt-10 grid gap-5">
        {sections.map((section) => (
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={section.title}>
            <h2 className="text-2xl font-bold text-slate-950">{section.title}</h2>
            <p className="mt-3 leading-7 text-slate-700">{section.text}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}
