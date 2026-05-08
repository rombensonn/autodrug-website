import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function FinalCTA() {
  return (
    <Section muted>
      <div className="rounded-lg bg-slate-950 p-6 text-white shadow-lift sm:p-8 lg:p-10">
        <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          Оставьте заявку, если хотите понять стоимость до визита
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
          Опишите проблему, автомобиль и удобное время - мы свяжемся с вами и
          подскажем, с чего начать.
        </p>
        <Button asChild className="mt-7" size="lg">
          <Link href="#lead-form">
            Оставить заявку
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
