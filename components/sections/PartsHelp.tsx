import { PackageSearch } from "lucide-react";
import { Section } from "@/components/ui/section";

export function PartsHelp() {
  return (
    <Section>
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-6 sm:p-8">
        <PackageSearch aria-hidden className="h-8 w-8 text-primary" />
        <h2 className="mt-5 text-3xl font-bold text-slate-950">Поможем с запчастями</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Не нужно тратить время на поиск деталей. Подскажем, что нужно заменить,
          поможем подобрать запчасти и согласуем варианты по цене.
        </p>
      </div>
    </Section>
  );
}
