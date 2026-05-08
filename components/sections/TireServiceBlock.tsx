import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

const items = [
  "снятие и установка колес",
  "балансировка",
  "низкопрофильная резина",
  "RUNFLAT",
  "ремонт бескамерных покрышек",
  "замена и ремонт камер",
  "правка дисков",
  "сезонное хранение"
];

export function TireServiceBlock() {
  return (
    <Section muted>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-normal text-primary">
            Шиномонтаж R10-R24
          </p>
          <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            Переобувка, балансировка и ремонт шин
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Работаем с легковыми автомобилями, низкопрофильной резиной и RUNFLAT.
            В сезон лучше записаться заранее, чтобы выбрать удобное время.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-800" key={item}>
                <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-primary" />
                {item}
              </div>
            ))}
          </div>
          <Button asChild className="mt-8" size="lg">
            <Link href="/uslugi/shinomontazh#lead-form">Записаться на шиномонтаж</Link>
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-lift">
          <Image
            alt="Шиномонтаж R10-R24 в автосервисе Авто друг"
            className="h-full w-full object-cover"
            height={720}
            loading="lazy"
            src="/images/tire-service.jpg"
            width={960}
          />
        </div>
      </div>
    </Section>
  );
}
