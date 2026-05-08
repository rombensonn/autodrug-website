import Link from "next/link";
import { business } from "@/data/business";
import { footerNavigation } from "@/data/navigation";
import { serviceCategories } from "@/data/services";
import { TrackedLink } from "@/components/ui/tracked-link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 pb-24 pt-12 text-white md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-black text-white">
              АД
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
            <p>{business.workTime}</p>
            <p>{business.areaServed}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
