"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { business } from "@/data/business";
import { mainNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link aria-label="Авто друг, главная" className="flex items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-lg font-black text-white">
            АД
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black text-slate-950">Авто друг</span>
            <span className="hidden text-xs text-slate-500 sm:block">Балашиха</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основное меню">
          {mainNavigation.map((item) => (
            <Link
              className="text-sm font-semibold text-slate-700 hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <TrackedLink
            aria-label={`Позвонить ${business.phoneDisplay}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 hover:text-primary"
            event="phone_click"
            href={business.phoneHref}
          >
            <Phone aria-hidden className="h-4 w-4" />
            {business.phoneDisplay}
          </TrackedLink>
          <Button asChild>
            <Link href="/kontakty#lead-form">Записаться</Link>
          </Button>
        </div>

        <button
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-soft lg:hidden">
          <nav className="grid gap-2" aria-label="Мобильное меню">
            {mainNavigation.map((item) => (
              <Link
                className="rounded-md px-3 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2">
              <Button asChild>
                <Link href="/kontakty#lead-form" onClick={() => setOpen(false)}>
                  Записаться
                </Link>
              </Button>
              <Button asChild variant="outline">
                <TrackedLink event="phone_click" href={business.phoneHref}>
                  Позвонить
                </TrackedLink>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
