import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { PriceTable } from "@/components/sections/PriceTable";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/section";
import { priceFaq } from "@/data/faq";
import { buildMetadata } from "@/data/seo";
import { priceGroups } from "@/data/services";
import { breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Цены на ремонт авто и шиномонтаж в Балашихе - Авто друг",
  description:
    "Прайс автосервиса «Авто друг»: шиномонтаж, диагностика, ремонт двигателя, подвески, тормозов, трансмиссии, промывка системы охлаждения и чистка форсунок. Цены от.",
  path: "/tseny"
});

export default function PricesPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(priceFaq)} />
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Цены", href: "/tseny" }
        ])}
      />
      <Section>
        <Breadcrumbs items={[{ href: "/tseny", label: "Цены" }]} />
        <div className="max-w-4xl">
          <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Цены на ремонт автомобиля и шиномонтаж
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Ниже указаны цены от. Точная стоимость зависит от марки автомобиля,
            состояния узла и объема работ. Перед ремонтом мастер согласует цену.
          </p>
        </div>
      </Section>
      <Section muted>
        <PriceTable />
        <div className="mt-8 grid gap-5">
          {priceGroups.slice(0, 4).map((group) => (
            <CTASection
              href="/kontakty#lead-form"
              key={group.slug}
              label="Уточнить стоимость"
              text="Опишите автомобиль и задачу, чтобы мастер сориентировал по диагностике и срокам."
              title={`Нужна запись на ${group.title.toLowerCase()}?`}
            />
          ))}
        </div>
      </Section>
      <Section>
        <LeadForm
          title="Уточнить стоимость"
          subtitle="Заполните форму, если хотите получить ориентир по стоимости до визита."
        />
      </Section>
      <FAQSection faq={priceFaq} title="FAQ по ценам" />
    </>
  );
}
