import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { PriceTable } from "@/components/sections/PriceTable";

export function PricePreview() {
  return (
    <Section id="prices" muted>
      <SectionHeading
        eyebrow="Цены"
        title="Популярные услуги и цены"
        description="Если не знаете точную причину, опишите симптомы - мастер подскажет, с чего начать диагностику."
      />
      <PriceTable compact />
      <div className="mt-8 flex flex-col gap-3 rounded-lg bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-slate-200">
          Не знаете точную причину? Опишите симптомы - мастер подскажет, с чего
          начать диагностику.
        </p>
        <Button asChild>
          <Link href="#lead-form">
            Описать симптомы
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
