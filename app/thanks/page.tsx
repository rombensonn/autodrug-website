import { Metadata } from "next";
import Link from "next/link";
import { MapPinned, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { TrackedLink } from "@/components/ui/tracked-link";
import { business } from "@/data/business";
import { buildMetadata } from "@/data/seo";

export const metadata: Metadata = buildMetadata({
  title: "Заявка отправлена - Авто друг",
  description: "Спасибо. Мы получили вашу заявку и свяжемся с вами в выбранном канале связи.",
  path: "/thanks"
});

export default function ThanksPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h1 className="text-4xl font-black text-slate-950">Заявка отправлена</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Спасибо. Мы получили вашу заявку и свяжемся с вами в выбранном канале связи.
        </p>
        <p className="mt-3 text-slate-600">
          Если вопрос срочный, вы можете позвонить напрямую: {business.phoneDisplay}.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <TrackedLink event="phone_click" href={business.phoneHref}>
              <Phone aria-hidden className="h-4 w-4" />
              Позвонить сейчас
            </TrackedLink>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Вернуться на главную</Link>
          </Button>
          <Button asChild variant="outline">
            <TrackedLink event="route_click" href={business.mapUrl} rel="noopener noreferrer" target="_blank">
              <MapPinned aria-hidden className="h-4 w-4" />
              Построить маршрут
            </TrackedLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
