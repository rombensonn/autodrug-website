"use client";

import { CalendarCheck, MapPinned, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { business } from "@/data/business";
import { TrackedLink } from "@/components/ui/tracked-link";

const items = [
  {
    label: "Позвонить",
    href: business.phoneHref,
    icon: Phone,
    event: "phone_click"
  },
  {
    label: "WhatsApp",
    href: business.whatsappUrl,
    icon: MessageCircle,
    event: "whatsapp_click"
  },
  {
    label: "Заявка",
    href: "/kontakty#lead-form",
    icon: CalendarCheck,
    internal: true
  },
  {
    label: "Маршрут",
    href: business.mapUrl,
    icon: MapPinned,
    event: "route_click"
  }
];

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Быстрые действия"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-lift backdrop-blur md:hidden"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const className =
          "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-semibold text-slate-700 transition-[background-color,color,transform] duration-200 hover:bg-slate-50 active:translate-y-px";
        if (item.internal) {
          return (
            <Link className={className} href={item.href} key={item.label}>
              <Icon aria-hidden className="h-5 w-5 text-primary" />
              {item.label}
            </Link>
          );
        }
        return (
          <TrackedLink
            className={className}
            event={item.event || "phone_click"}
            href={item.href}
            key={item.label}
            rel="noopener noreferrer"
            target={item.href.startsWith("http") ? "_blank" : undefined}
          >
            <Icon aria-hidden className="h-5 w-5 text-primary" />
            {item.label}
          </TrackedLink>
        );
      })}
    </nav>
  );
}
