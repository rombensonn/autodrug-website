import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { business } from "@/data/business";
import { getRelatedServices, ServiceCategory } from "@/data/services";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { LeadForm } from "@/components/forms/LeadForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { PriceTable } from "@/components/sections/PriceTable";
import { TrackedLink } from "@/components/ui/tracked-link";

export function ServicePageTemplate({ service }: { service: ServiceCategory }) {
  const related = getRelatedServices(service.relatedServices);

  return (
    <>
      <Section className="pb-12">
        <Breadcrumbs
          items={[
            { href: "/uslugi", label: "Услуги" },
            { href: `/uslugi/${service.slug}`, label: service.title }
          ]}
        />
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge>{business.city}, {business.streetAddress}</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">{service.longDescription}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-slate-950 px-4 py-3 text-lg font-black text-white">
                {service.priceFrom}
              </span>
              <Button asChild size="lg">
                <Link href="#lead-form">
                  Записаться
                  <ArrowRight aria-hidden className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <TrackedLink event="phone_click" href={business.phoneHref}>
                  Позвонить
                </TrackedLink>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-lift">
            <Image
              alt={`${service.title} в Балашихе - Авто друг`}
              className="h-72 w-full object-cover sm:h-96"
              height={720}
              priority
              src={service.image}
              width={960}
            />
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">Когда нужна услуга</h2>
            <div className="mt-6 grid gap-3">
              {service.symptoms.map((item) => (
                <div className="flex gap-3 rounded-lg bg-white p-4 shadow-soft" key={item}>
                  <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm font-semibold leading-6 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-950">Что входит</h2>
            <div className="mt-6 grid gap-3">
              {service.services.map((item) => (
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft" key={item.name}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="shrink-0 font-bold text-primary">{item.price}</p>
                  </div>
                  {item.description ? <p className="mt-2 text-sm text-slate-600">{item.description}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="mb-6 text-3xl font-bold text-slate-950">Цены</h2>
        <div className="rounded-lg border border-slate-200 bg-white shadow-soft">
          <div className="grid gap-3 p-4">
            {service.services.map((item) => (
              <div
                className="grid gap-2 rounded-md bg-slate-50 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                key={item.name}
              >
                <div>
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  {item.description ? <p className="mt-1 text-sm text-slate-600">{item.description}</p> : null}
                </div>
                <p className="font-bold text-primary">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 rounded-md bg-orange-50 p-4 text-sm leading-6 text-orange-900">
          Цены указаны от. Точная стоимость зависит от марки автомобиля, состояния
          узла и объема работ.
        </p>
      </Section>

      <Section muted>
        <h2 className="text-3xl font-bold text-slate-950">Как проходит работа</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {service.steps.map((step, index) => (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={step}>
              <span className="font-mono text-sm font-bold text-primary">0{index + 1}</span>
              <p className="mt-3 font-semibold leading-6 text-slate-900">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">Почему «Авто друг»</h2>
            <div className="mt-6 grid gap-3">
              {[
                "Говорим по делу и объясняем причину неисправности.",
                "Не навязываем лишний ремонт.",
                "Помогаем с запчастями, если не хотите искать сами.",
                "Работаем ежедневно до 22:00."
              ].map((item) => (
                <p className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-soft" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <LeadForm defaultService={service.title} />
        </div>
      </Section>

      <FAQSection faq={service.faq} title={`FAQ: ${service.title}`} />

      <Section>
        <CTASection
          title="Нужно понять стоимость до визита?"
          text="Опишите симптомы и автомобиль. Мастер подскажет, с чего начать диагностику, и сориентирует по срокам."
          label="Оставить заявку"
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-950">Похожие услуги</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm hover:border-primary hover:text-primary"
                href={`/uslugi/${item.slug}`}
                key={item.slug}
              >
                {item.title}
              </Link>
            ))}
            <Link className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm hover:border-primary hover:text-primary" href="/tseny">
              Прайс
            </Link>
            <Link className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm hover:border-primary hover:text-primary" href="/kontakty">
              Контакты
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
