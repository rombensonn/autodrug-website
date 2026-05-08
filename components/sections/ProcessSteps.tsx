import { ClipboardCheck, MessageSquareText, SearchCheck, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const steps = [
  {
    title: "Вы оставляете заявку или звоните",
    text: "Уточняем симптомы, автомобиль и удобное время.",
    icon: MessageSquareText
  },
  {
    title: "Мастер проводит диагностику",
    text: "Показывает проблемные места и объясняет причину.",
    icon: SearchCheck
  },
  {
    title: "Согласовываем стоимость и запчасти",
    text: "Ремонт начинается только после согласования.",
    icon: ClipboardCheck
  },
  {
    title: "Выполняем ремонт",
    text: "Проверяем результат и передаем автомобиль.",
    icon: Wrench
  }
];

export function ProcessSteps() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Процесс"
        title="Как проходит ремонт"
        description="Прозрачный порядок помогает заранее понять, что будет происходить с автомобилем."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={step.title}>
              <div className="flex items-center justify-between">
                <Icon aria-hidden className="h-6 w-6 text-primary" />
                <span className="font-mono text-sm font-bold text-slate-300">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
