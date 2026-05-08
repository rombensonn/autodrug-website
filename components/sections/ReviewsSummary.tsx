import Link from "next/link";
import { Star } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";

const summaries = [
  "Быстро приняли и сделали диагностику",
  "Не навязывали лишние работы",
  "Помогли с запчастями",
  "Решили срочную поломку",
  "Адекватные цены",
  "Шиномонтаж на высоте"
];

export function ReviewsSummary() {
  return (
    <Section muted id="reviews">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Отзывы"
            title="Что часто отмечают клиенты"
            description="Не копируем отзывы дословно и не выдумываем имена. Это короткие смысловые выжимки по отзывам на Яндекс.Картах."
          />
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <Star aria-hidden className="h-8 w-8 fill-orange-400 text-orange-400" />
              <div>
                <p className="text-3xl font-black text-slate-950">{business.rating}</p>
                <p className="text-sm text-slate-600">
                  {business.reviewsCount} отзыва, {business.ratingsCount} оценок
                </p>
                <p className="text-xs text-slate-500">по данным Яндекс.Карт</p>
              </div>
            </div>
            <Button asChild className="mt-5 w-full" variant="outline">
              <Link href={business.mapUrl} rel="noopener noreferrer" target="_blank">
                Посмотреть отзывы на Яндекс.Картах
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {summaries.map((item) => (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={item}>
              <p className="text-sm font-bold uppercase tracking-normal text-primary">
                Часто отмечают в отзывах
              </p>
              <p className="mt-3 text-lg font-bold text-slate-950">«{item}»</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-lg font-bold">Запишитесь на удобное время - работаем ежедневно до 22:00.</p>
      </div>
    </Section>
  );
}
