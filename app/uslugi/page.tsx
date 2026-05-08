import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/data/seo";
import { serviceCategories } from "@/data/services";
import { breadcrumbsJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Услуги автосервиса в Балашихе - Авто друг",
  description:
    "Услуги автосервиса «Авто друг»: шиномонтаж, диагностика, ремонт двигателя, подвески, тормозов, трансмиссии и кондиционера в Балашихе.",
  path: "/uslugi"
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Услуги", href: "/uslugi" }
        ])}
      />
      <Section>
        <Breadcrumbs items={[{ href: "/uslugi", label: "Услуги" }]} />
        <div className="max-w-4xl">
          <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Услуги автосервиса и шиномонтажа в Балашихе
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Сначала диагностика - потом согласование работ. Выберите услугу, чтобы
            посмотреть симптомы, этапы ремонта, цены от и FAQ.
          </p>
        </div>
      </Section>
      <ServicesGrid />
      <Section muted>
        <CTASection
          title="Не нашли нужную услугу?"
          text="Опишите проблему с автомобилем. Мастер подскажет, с чего начать диагностику."
          href="/kontakty#lead-form"
          label="Оставить заявку"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service) => (
            <Link
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 font-bold text-slate-900 shadow-sm hover:border-primary hover:text-primary"
              href={`/uslugi/${service.slug}`}
              key={service.slug}
            >
              {service.title}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
