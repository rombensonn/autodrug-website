"use client";

import { CreditCard, MapPinned, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrackedLink } from "@/components/ui/tracked-link";

export function ContactSection({ withFormSlot }: { withFormSlot?: React.ReactNode }) {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <Section id="contacts">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Контакты"
            title="Авто друг на Заводской улице"
            description="Автосервис находится в Балашихе на Заводской улице, 7А. Работаем ежедневно с 10:00 до 22:00."
          />
          <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-lg font-bold text-slate-950">{business.name}</p>
            <p className="text-slate-700">{business.address}</p>
            <p className="text-slate-700">{business.workTime}</p>
            <p className="text-slate-700">{business.areaServed}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <TrackedLink event="phone_click" href={business.phoneHref}>
                  <Phone aria-hidden className="h-4 w-4" />
                  Позвонить
                </TrackedLink>
              </Button>
              <Button asChild variant="outline">
                <TrackedLink
                  event="whatsapp_click"
                  href={business.whatsappUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  WhatsApp
                </TrackedLink>
              </Button>
              {telegramUrl ? (
                <Button asChild variant="outline">
                  <a href={telegramUrl} rel="noopener noreferrer" target="_blank">
                    Telegram
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <TrackedLink
                  event="route_click"
                  href={business.mapUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MapPinned aria-hidden className="h-4 w-4" />
                  Построить маршрут
                </TrackedLink>
              </Button>
            </div>
            <div className="grid gap-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <CreditCard aria-hidden className="h-4 w-4 text-primary" />
                Оплата картой, наличными и банковским переводом
              </p>
              <p>Есть парковка, Wi-Fi, туалет, предварительная запись.</p>
            </div>
          </div>
        </div>

        <div className="grid self-start gap-6">
          <div className="self-start overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-4">
              <div>
                <h3 className="text-lg font-black text-slate-950">Карта проезда</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {business.address}
                </p>
              </div>
              <MapPinned aria-hidden className="h-7 w-7 shrink-0 text-primary" />
            </div>
            <div className="relative aspect-[16/10] min-h-80 max-h-[460px]">
              <iframe
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                src={business.mapEmbedUrl}
                title="Карта проезда до Авто друг"
              />
            </div>
          </div>
          {withFormSlot}
        </div>
      </div>
    </Section>
  );
}
