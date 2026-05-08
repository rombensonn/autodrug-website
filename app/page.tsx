import { Metadata } from "next";
import { AlertTriangle, BatteryWarning, CheckCircle2, Droplets, Fan, Gauge, ShieldAlert, Wrench } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PricePreview } from "@/components/sections/PricePreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TireServiceBlock } from "@/components/sections/TireServiceBlock";
import { GallerySection } from "@/components/sections/GallerySection";
import { PartsHelp } from "@/components/sections/PartsHelp";
import { ReviewsSummary } from "@/components/sections/ReviewsSummary";
import { CarsWeService } from "@/components/sections/CarsWeService";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section, SectionHeading } from "@/components/ui/section";
import { mainFaq } from "@/data/faq";
import { buildMetadata } from "@/data/seo";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Автосервис и шиномонтаж в Балашихе - Авто друг",
  description:
    "Автосервис «Авто друг» в Балашихе: диагностика, ремонт двигателя, подвески, тормозов, кондиционера и шиномонтаж R10-R24. Работаем ежедневно до 22:00."
});

const reasons = [
  {
    icon: Wrench,
    title: "машина стучит или тянет в сторону",
    detail: "проверим подвеску, рулевое и крепления"
  },
  {
    icon: BatteryWarning,
    title: "загорелся Check Engine",
    detail: "считаем ошибки и объясним причину"
  },
  {
    icon: Droplets,
    title: "пора менять масло",
    detail: "подберем фильтры и масло под автомобиль"
  },
  {
    icon: ShieldAlert,
    title: "плохо тормозит",
    detail: "оценим колодки, диски, жидкость и суппорты"
  },
  {
    icon: Gauge,
    title: "нужна сезонная переобувка",
    detail: "шиномонтаж R10-R24, балансировка и ремонт"
  },
  {
    icon: Fan,
    title: "не работает кондиционер",
    detail: "диагностика, заправка и поиск утечек"
  },
  {
    icon: AlertTriangle,
    title: "появился шум в подвеске",
    detail: "найдем источник стука до лишнего ремонта"
  },
  {
    icon: CheckCircle2,
    title: "нужна срочная диагностика",
    detail: "подскажем ближайшее свободное окно"
  }
];

const benefits = [
  "Не навязываем лишнее.",
  "Объясняем проблему простыми словами.",
  "Помогаем с запчастями.",
  "Работаем ежедневно до 22:00.",
  "Срочные работы в день обращения.",
  "Оплата картой и наличными."
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(mainFaq)} />
      <Hero />

      <Section muted>
        <SectionHeading
          eyebrow="Когда стоит обратиться"
          title="Не ждите, пока мелкая неисправность станет дорогим ремонтом"
          description="Если не знаете точную причину, просто опишите симптомы. Мастер подскажет, с чего начать диагностику."
        />
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg bg-slate-950 p-6 text-white shadow-lift">
            <p className="text-sm font-bold uppercase tracking-normal text-orange-200">
              Быстрая первичная оценка
            </p>
            <h3 className="mt-4 text-2xl font-black leading-tight">
              Опишите симптом, а мастер предложит понятный первый шаг
            </h3>
            <p className="mt-4 leading-7 text-slate-300">
              Не нужно угадывать поломку по звуку. Сначала фиксируем симптомы,
              затем проверяем узел и согласовываем работу до ремонта.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-100">
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                1. Что происходит с автомобилем
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                2. Когда проявляется проблема
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                3. Что проверить в первую очередь
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {reasons.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/30 hover:shadow-lift motion-safe:hover:-translate-y-1"
                  key={item.title}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                      <Icon aria-hidden className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-black leading-snug text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Ремонт по факту"
          title="Сначала диагностика - потом согласование работ"
          description="Сначала мастер проводит диагностику, показывает проблемные места, объясняет причину неисправности и согласует стоимость. Ремонт начинается только после согласования."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={item}>
              <CheckCircle2 aria-hidden className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-xl font-bold text-slate-950">{item}</h2>
            </div>
          ))}
        </div>
      </Section>

      <ServicesGrid />
      <PricePreview />
      <ProcessSteps />
      <TireServiceBlock />
      <GallerySection />
      <PartsHelp />
      <ReviewsSummary />
      <CarsWeService />
      <FAQSection faq={mainFaq} />

      <Section className="bg-slate-50">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-lg bg-slate-950 p-6 text-white shadow-lift sm:p-8 lg:sticky lg:top-24">
            <p className="text-sm font-bold uppercase tracking-normal text-orange-200">
              Заявка
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Опишите проблему - мастер подскажет следующий шаг
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Оставьте телефон, автомобиль и симптомы. Мы свяжемся с вами в
              выбранном канале связи, сориентируем по диагностике и свободному
              времени.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-100">
              {[
                "Не передаем данные в WhatsApp URL",
                "Сначала диагностика, потом согласование",
                "Поможем с запчастями, если нужно"
              ].map((item) => (
                <div
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3"
                  key={item}
                >
                  <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <LeadForm
            title="Оставьте заявку"
            subtitle="Заполните форму, чтобы мастер понял симптомы, автомобиль и удобное время для связи."
          />
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
