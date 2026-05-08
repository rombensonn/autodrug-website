"use client";

import { useMemo, useState } from "react";
import { priceGroups } from "@/data/services";
import { cn } from "@/lib/utils";

const filterLabels = [
  { slug: "all", title: "Все" },
  { slug: "shinomontazh", title: "Шиномонтаж" },
  { slug: "dvigatel", title: "Двигатель" },
  { slug: "tormoza", title: "Тормоза" },
  { slug: "podveska", title: "Подвеска" },
  { slug: "diagnostika", title: "Диагностика" },
  { slug: "ohlazhdenie", title: "Охлаждение" },
  { slug: "transmissiya", title: "Трансмиссия" },
  { slug: "prochie", title: "Прочее" }
];

export function PriceTable({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("all");
  const groups = useMemo(() => {
    const selected = active === "all" ? priceGroups : priceGroups.filter((group) => group.slug === active);
    return compact ? selected.map((group) => ({ ...group, items: group.items.slice(0, 5) })) : selected;
  }, [active, compact]);

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Фильтр цен">
        {filterLabels.map((filter) => (
          <button
            className={cn(
              "min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold transition-colors",
              active === filter.slug
                ? "border-primary bg-primary text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}
            key={filter.slug}
            onClick={() => setActive(filter.slug)}
            type="button"
          >
            {filter.title}
          </button>
        ))}
      </div>

      <div className={cn("grid gap-6", groups.length > 1 ? "lg:grid-cols-2" : "")}>
        {groups.map((group) => (
          <div className="rounded-lg border border-slate-200 bg-white shadow-soft" key={group.slug}>
            <div className="border-b border-slate-200 p-5">
              <h3 className="text-xl font-bold text-slate-950">{group.title}</h3>
            </div>
            <div className="hidden md:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Работа</th>
                    <th className="w-32 px-5 py-3 font-semibold">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item) => (
                    <tr className="border-t border-slate-100" key={`${group.slug}-${item.name}`}>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-slate-900">{item.name}</span>
                        {item.description ? (
                          <span className="mt-1 block text-slate-500">{item.description}</span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-950">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 p-4 md:hidden">
              {group.items.map((item) => (
                <div className="rounded-md border border-slate-100 bg-slate-50 p-4" key={`${group.slug}-${item.name}`}>
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  {item.description ? <p className="mt-1 text-sm text-slate-600">{item.description}</p> : null}
                  <p className="mt-3 font-bold text-primary">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-md bg-orange-50 p-4 text-sm leading-6 text-orange-900">
        Цены указаны от. Точная стоимость зависит от марки автомобиля, состояния
        узла и объема работ.
      </p>
    </div>
  );
}
