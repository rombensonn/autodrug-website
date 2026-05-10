import Link from "next/link";
import Image from "next/image";
import { business } from "@/data/business";
import { footerNavigation, legalFooterNavigation } from "@/data/navigation";
import { serviceCategories } from "@/data/services";
import { TrackedLink } from "@/components/ui/tracked-link";
import { publicAsset } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 pb-24 pt-12 text-white md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link className="flex items-center gap-3" href="/">
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white shadow-soft">
              <Image
                alt="Логотип автосервиса Авто друг"
                className="object-contain"
                fill
                sizes="56px"
                src={publicAsset(business.logo)}
                unoptimized
              />
            </span>
            <span className="text-xl font-black">Авто друг</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Автосервис и шиномонтаж в Балашихе. Сначала диагностика, потом
            согласование работ и только затем ремонт.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Информация о ценах носит ознакомительный характер. Точную стоимость
            уточняйте у мастера после диагностики.
          </p>
          <div className="mt-5 grid gap-1 text-xs leading-5 text-slate-400">
            <p>{business.legal.operatorName}</p>
            <p>
              ИНН {business.legal.inn}, ОГРНИП {business.legal.ogrnip}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-slate-400">
            Меню
          </h2>
          <ul className="mt-4 grid gap-3">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-slate-200 transition-colors duration-200 hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-slate-400">
            Услуги
          </h2>
          <ul className="mt-4 grid gap-3">
            {serviceCategories.slice(0, 8).map((service) => (
              <li key={service.slug}>
                <Link
                  className="text-sm text-slate-200 transition-colors duration-200 hover:text-white"
                  href={`/uslugi/${service.slug}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-slate-400">
            Контакты
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-200">
            <p>{business.name}</p>
            <p>{business.address}</p>
            <TrackedLink
              className="font-bold text-white transition-colors duration-200 hover:text-primary"
              event="phone_click"
              href={business.phoneHref}
            >
              {business.phoneDisplay}
            </TrackedLink>
            <TrackedLink
              className="font-bold text-white transition-colors duration-200 hover:text-primary"
              event="email_click"
              href={business.emailHref}
            >
              {business.emailDisplay}
            </TrackedLink>
            <p>{business.workTime}</p>
            <p>{business.areaServed}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-xs leading-5 text-slate-400 lg:flex-row lg:items-center lg:justify-between">
            <p>Правовая информация и персональные данные</p>
            <ul className="grid gap-2 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 lg:justify-end">
              {legalFooterNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="font-medium text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
