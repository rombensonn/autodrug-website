import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="hover:text-primary" href="/">
            Главная
          </Link>
        </li>
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.href}>
            <ChevronRight aria-hidden className="h-4 w-4" />
            <Link className="hover:text-primary" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
