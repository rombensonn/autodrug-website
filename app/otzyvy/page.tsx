import { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ReviewsSummary } from "@/components/sections/ReviewsSummary";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { business } from "@/data/business";
import { buildMetadata } from "@/data/seo";
import { breadcrumbsJsonLd } from "@/lib/seo";

const points = [
  "быстро приняли",
  "сделали в день обращения",
  "помогли с запчастями",
  "не навязывали лишнее",
  "объяснили причину",
  "адекватные цены",
  "хороший шиномонтаж",
  "работают с разными марками авто"
];

export const metadata: Metadata = buildMetadata({
  title: "Отзывы об автосервисе Авто друг в Балашихе",
  description:
    "Отзывы об автосервисе «Авто друг»: рейтинг 5.0, 64 отзыва на Яндекс.Картах. Часто отмечают скорость, честный подход и шиномонтаж.",
  path: "/otzyvy"
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Отзывы", href: "/otzyvy" }
        ])}
      />
      <Section>
        <Breadcrumbs items={[{ href: "/otzyvy", label: "Отзывы" }]} />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Отзывы об автосервисе “Авто друг”
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              На странице только смысловые выжимки: мы не выдумываем имена клиентов
              и не копируем длинные отзывы полностью.
            </p>
            <Button asChild className="mt-6">
              <Link href={business.mapUrl} rel="noopener noreferrer" target="_blank">
                Посмотреть отзывы на Яндекс.Картах
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <Star aria-hidden className="h-10 w-10 fill-orange-400 text-orange-400" />
              <div>
                <p className="text-4xl font-black text-slate-950">{business.rating}</p>
                <p className="text-slate-700">{business.reviewsCount} отзыва</p>
                <p className="text-sm text-slate-500">по данным Яндекс.Карт</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section muted>
        <h2 className="text-3xl font-bold text-slate-950">Часто отмечают в отзывах</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div className="rounded-lg border border-slate-200 bg-white p-5 font-bold text-slate-950 shadow-soft" key={point}>
              {point}
            </div>
          ))}
        </div>
      </Section>
      <ReviewsSummary />
      <Section>
        <CTASection
          title="Хотите записаться на удобное время?"
          text="Работаем ежедневно до 22:00. Срочные работы возможны при наличии свободного окна и запчастей."
          href="/kontakty#lead-form"
          label="Оставить заявку"
        />
      </Section>
    </>
  );
}
