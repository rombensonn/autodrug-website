"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { business } from "@/data/business";
import { mainNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { publicAsset } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link aria-label="Авто друг, главная" className="flex items-center gap-3" href="/">
          <span className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white shadow-soft">
            <Image
              alt="Логотип автосервиса Авто друг"
              className="object-contain"
              fill
              priority
              sizes="48px"
              src={publicAsset(business.logo)}
              unoptimized
            />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black text-slate-950">Авто друг</span>
            <span className="hidden text-xs text-slate-500 sm:block">Балашиха</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основное меню">
          {mainNavigation.map((item) => (
            <Link
              className="rounded-md px-1 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-bold text-slate-950 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-900 transition-[background-color,border-color,transform] duration-200 hover:border-primary/30 hover:bg-slate-50 active:translate-y-px lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-soft motion-safe:animate-soft-scale lg:hidden">
          <nav className="grid gap-2" aria-label="Мобильное меню">
            {mainNavigation.map((item) => (
              <Link
                className="rounded-md px-3 py-3 text-base font-semibold text-slate-800 transition-colors duration-200 hover:bg-slate-50"
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
