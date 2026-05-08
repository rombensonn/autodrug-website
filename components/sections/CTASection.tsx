import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection({
  title,
  text,
  href = "#lead-form",
  label = "Записаться"
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
      </div>
      <Button asChild className="mt-4 shrink-0 sm:mt-0">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}
