"use client";

import { useState } from "react";
import { CreditCard, MapPinned, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrackedLink } from "@/components/ui/tracked-link";

export function ContactSection({ withFormSlot }: { withFormSlot?: React.ReactNode }) {
  const [showMap, setShowMap] = useState(false);
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  function handleShowMap() {
    setShowMap(true);
    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") return;

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event: "show_map_click", page: window.location.pathname }),
      keepalive: true
    });
  }

  return (
    <Section id="contacts">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Контакты"
            title="Авто друг на Керамической улице"
            description="Автосервис находится в Балашихе на Керамической улице, 2Б. Работаем ежедневно с 10:00 до 22:00."
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

        <div className="grid gap-6">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-soft">
            {showMap ? (
              <iframe
                className="h-80 w-full rounded-md border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={business.mapEmbedUrl}
                title="Карта проезда до Авто друг"
              />
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-6 text-center">
                <MapPinned aria-hidden className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-bold text-slate-950">Карта загружается только после клика</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                  Так страница не отправляет запросы к картографическому сервису до
                  вашего действия.
                </p>
                <Button className="mt-5" onClick={handleShowMap} type="button">
                  Показать карту
                </Button>
              </div>
            )}
          </div>
          {withFormSlot}
        </div>
      </div>
    </Section>
  );
}
