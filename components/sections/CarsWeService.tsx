import { CarFront } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const cars = [
  "отечественные",
  "китайские",
  "корейские",
  "японские",
  "европейские",
  "импортные легковые"
];

export function CarsWeService() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Автомобили"
        title="С какими автомобилями работаем"
        description="Принимаем разные марки и возрастные автомобили. Если деталь нужна под заказ, подскажем варианты и сроки."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((item) => (
          <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft" key={item}>
            <CarFront aria-hidden className="h-6 w-6 text-primary" />
            <p className="text-lg font-bold text-slate-950">{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
