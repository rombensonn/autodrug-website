import Link from "next/link";
import {
  Car,
  CircleGauge,
  Droplets,
  Fan,
  Gauge,
  Paintbrush,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import { serviceCategories } from "@/data/services";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

const icons = [Car, CircleGauge, Droplets, Settings, ShieldCheck, Wrench, Gauge, Fan, Sparkles, Paintbrush];

export function ServicesGrid() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Услуги"
        title="От шиномонтажа до сложного ремонта"
        description="Карточки ведут на отдельные SEO-страницы с симптомами, этапами, ценами и FAQ."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card
              className="group transition-transform hover:-translate-y-1 hover:shadow-lift"
              key={service.slug}
            >
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-primary">
                  <Icon aria-hidden className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{service.title}</h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">
                  {service.shortDescription}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="font-bold text-slate-950">{service.priceFrom}</span>
                  <Link
                    className="text-sm font-bold text-primary hover:underline"
                    href={`/uslugi/${service.slug}`}
                  >
                    Подробнее
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
