import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleGauge, Disc3, ShieldCheck, Timer, Wrench } from "lucide-react";
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

const highlights = [
  { icon: Disc3, title: "R10-R24", text: "легковые колеса разных размеров" },
  { icon: CircleGauge, title: "RUNFLAT", text: "аккуратно работаем с жесткой боковиной" },
  { icon: ShieldCheck, title: "Без лишнего", text: "согласуем ремонт до начала работ" },
  { icon: Timer, title: "По записи", text: "удобнее выбрать время в сезон" }
];

export function TireServiceBlock() {
  return (
    <Section className="bg-white">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-lift">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-6 text-white sm:p-8 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-normal text-orange-200">
              Шиномонтаж R10-R24
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
              Переобувка, балансировка и ремонт шин без сезонной суеты
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Работаем с легковыми автомобилями, низкопрофильной резиной и RUNFLAT.
              Если колесо бьет, спускает или нужен сезонный комплект, запишитесь
              на удобное окно заранее.
            </p>
            <div className="mt-8 grid gap-3">
              <Button asChild className="w-full justify-center whitespace-nowrap" size="lg">
                <Link href="/uslugi/shinomontazh#lead-form">
                  Записаться на шиномонтаж
                  <ArrowRight aria-hidden className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild className="w-full justify-center whitespace-nowrap" size="lg" variant="secondary">
                <Link href="#prices">Посмотреть цены</Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={item.title}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-primary">
                        <Icon aria-hidden className="h-5 w-5" />
                      </span>
                      <p className="text-lg font-black text-slate-950">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                  <Wrench aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-black text-slate-950">Что делаем</h3>
                  <p className="text-sm text-slate-500">основные работы по колесам</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800" key={item}>
                    <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
