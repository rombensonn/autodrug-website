import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/section";
import { business } from "@/data/business";
import { buildMetadata } from "@/data/seo";

export const metadata: Metadata = buildMetadata({
  title: "Согласие на обработку персональных данных - Авто друг",
  description:
    "Согласие пользователя на обработку персональных данных для обработки заявки в автосервис «Авто друг».",
  path: "/personal-data-consent"
});

const items = [
  {
    title: "Оператор",
    text: `${business.legal.operatorName}, ИНН ${business.legal.inn}, ОГРНИП ${business.legal.ogrnip}. Адрес автосервиса: ${business.address}.`
  },
  {
    title: "Цели обработки",
    text:
      "Обработка заявки, обратная связь, запись на ремонт, уточнение стоимости и сроков, помощь с подбором запчастей."
  },
  {
    title: "Персональные данные",
    text:
      "Имя, телефон, марка и модель автомобиля, год выпуска, выбранная услуга, описание проблемы, удобная дата и время, предпочтительный способ связи."
  },
  {
    title: "Действия с данными",
    text:
      "Сбор, запись, систематизация, хранение, уточнение, использование, передача российским сервисам при необходимости обработки заявки, блокирование, удаление и уничтожение."
  },
  {
    title: "Срок действия согласия",
    text:
      "Согласие действует до достижения целей обработки или до его отзыва пользователем."
  },
  {
    title: "Отзыв согласия",
    text:
      `Отозвать согласие можно по телефону ${business.phoneDisplay} или через e-mail владельца сайта: ${business.legal.personalDataEmail}.`
  }
];

export default function PersonalDataConsentPage() {
  return (
    <Section>
      <Breadcrumbs
        items={[
          {
            href: "/personal-data-consent",
            label: "Согласие на обработку персональных данных"
          }
        ]}
      />
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black leading-tight text-slate-950">
          Согласие на обработку персональных данных
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Нажимая чекбокс в форме заявки, пользователь подтверждает согласие на
          обработку персональных данных для связи с автосервисом и обработки
          обращения.
        </p>
      </div>
      <div className="mt-10 grid gap-5">
        {items.map((item) => (
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={item.title}>
            <h2 className="text-2xl font-bold text-slate-950">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}
