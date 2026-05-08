"use client";

import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

export function FAQSection({
  faq,
  title = "Вопросы и ответы",
  description = "Собрали частые вопросы, которые помогают понять порядок работ до визита."
}: {
  faq: { question: string; answer: string }[];
  title?: string;
  description?: string;
}) {
  return (
    <Section muted>
      <SectionHeading eyebrow="FAQ" title={title} description={description} />
      <div className="grid gap-3">
        {faq.map((item) => (
          <details
            className="group rounded-lg border border-slate-200 bg-white p-5 shadow-soft"
            key={item.question}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-slate-950">
              {item.question}
              <ChevronDown
                aria-hidden
                className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
