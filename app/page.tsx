import { Metadata } from "next";
import { AlertTriangle, BatteryWarning, CheckCircle2, Droplets, Gauge, ShieldAlert, Wrench } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PricePreview } from "@/components/sections/PricePreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TireServiceBlock } from "@/components/sections/TireServiceBlock";
import { PartsHelp } from "@/components/sections/PartsHelp";
import { ReviewsSummary } from "@/components/sections/ReviewsSummary";
import { CarsWeService } from "@/components/sections/CarsWeService";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { ServiceQuiz } from "@/components/forms/ServiceQuiz";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section, SectionHeading } from "@/components/ui/section";
import { mainFaq } from "@/data/faq";
import { buildMetadata } from "@/data/seo";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Автосервис и шиномонтаж в Балашихе - Авто друг",
  description:
    "Автосервис «Авто друг» в Балашихе: диагностика, ремонт двигателя, подвески, тормозов, системы охлаждения и шиномонтаж R10-R24. Работаем ежедневно до 22:00."
});

const reasons = [
  { icon: Wrench, title: "машина стучит или тянет в сторону" },
  { icon: BatteryWarning, title: "загорелся Check Engine" },
  { icon: Droplets, title: "пора менять масло" },
  { icon: ShieldAlert, title: "плохо тормозит" },
  { icon: Gauge, title: "нужна сезонная переобувка" },
  { icon: AlertTriangle, title: "двигатель перегревается" },
  { icon: AlertTriangle, title: "появился шум в подвеске" },
  { icon: CheckCircle2, title: "нужна срочная диагностика" }
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={item.title}>
                <Icon aria-hidden className="h-6 w-6 text-primary" />
                <h2 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h2>
              </div>
            );
          })}
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
      <PartsHelp />
      <ReviewsSummary />
      <CarsWeService />
      <FAQSection faq={mainFaq} />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Заявка"
              title="Оставьте заявку, если хотите понять стоимость до визита"
              description="Опишите проблему, автомобиль и удобное время - мы свяжемся с вами и подскажем, с чего начать."
            />
            <ServiceQuiz />
          </div>
          <LeadForm />
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
