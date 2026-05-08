import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/section";
import { business } from "@/data/business";
import { buildMetadata } from "@/data/seo";
import { breadcrumbsJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Контакты автосервиса Авто друг в Балашихе",
  description:
    "Адрес, телефон, график работы и маршрут до автосервиса «Авто друг» в Балашихе: Керамическая улица, 2Б. Работаем ежедневно до 22:00.",
  path: "/kontakty"
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/kontakty" }
        ])}
      />
      <Section>
        <Breadcrumbs items={[{ href: "/kontakty", label: "Контакты" }]} />
        <div className="max-w-4xl">
          <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Контакты автосервиса “Авто друг”
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Автосервис находится в Балашихе на Керамической улице, 2Б. Работаем
            ежедневно с 10:00 до 22:00. Можно записаться заранее или уточнить
            возможность срочного визита по телефону {business.phoneDisplay}.
          </p>
        </div>
      </Section>
      <ContactSection withFormSlot={<LeadForm />} />
    </>
  );
}
