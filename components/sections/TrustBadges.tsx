import { Clock, CreditCard, MapPin, Star, Wrench } from "lucide-react";
import { business } from "@/data/business";

const badges = [
  { icon: Star, label: "Рейтинг 5.0", detail: "64 отзыва на Яндекс.Картах" },
  { icon: Clock, label: "До 22:00", detail: "ежедневно, без выходных" },
  { icon: Wrench, label: "Ремонт по факту", detail: "сначала диагностика" },
  { icon: CreditCard, label: "Оплата удобна", detail: "карта, наличные, перевод" },
  { icon: MapPin, label: "Балашиха", detail: business.streetAddress }
];

export function TrustBadges() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
            key={badge.label}
          >
            <Icon aria-hidden className="h-5 w-5 text-primary" />
            <p className="mt-3 font-bold text-slate-950">{badge.label}</p>
            <p className="mt-1 text-sm text-slate-600">{badge.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
