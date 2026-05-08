import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { TrackedLink } from "@/components/ui/tracked-link";

const facts = [
  { icon: Star, label: "Рейтинг 5.0" },
  { icon: MessageCircle, label: "64 отзыва" },
  { icon: Clock, label: "Работаем до 22:00" },
  { icon: ArrowRight, label: "Шиномонтаж R10-R24" }
];

export function Hero() {
  return (
    <section className="container-grid bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <Badge>
            <MapPin aria-hidden className="mr-2 h-4 w-4" />
            Балашиха, Керамическая ул., 2Б
          </Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            Автосервис и шиномонтаж в Балашихе - ремонт без лишних навязанных
            работ
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            Диагностика, ремонт двигателя, подвески, тормозов, трансмиссии,
            кондиционера и шиномонтаж R10-R24. Работаем ежедневно с 10:00 до
            22:00 на Керамической улице, 2Б.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#lead-form">
                Записаться на ремонт
                <ArrowRight aria-hidden className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#prices">Рассчитать стоимость</Link>
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="ghost">
              <TrackedLink event="phone_click" href={business.phoneHref}>
                <Phone aria-hidden className="h-4 w-4" />
                Позвонить сейчас
              </TrackedLink>
            </Button>
            <Button asChild variant="ghost">
              <TrackedLink
                event="whatsapp_click"
                href={business.whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                Написать в WhatsApp
              </TrackedLink>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-soft"
                  key={fact.label}
                >
                  <Icon aria-hidden className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-bold text-slate-900">{fact.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative lg:self-start">
          <QuickLeadForm />
        </div>
      </div>
    </section>
  );
}
