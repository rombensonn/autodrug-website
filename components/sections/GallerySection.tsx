import Image from "next/image";
import { Camera, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const gallery = [
  {
    src: "/images/gallery/auto-service-bay-3.jpg",
    alt: "Рабочая зона автосервиса Авто друг в Балашихе",
    title: "Рабочая зона",
    description: "Оборудование для шиномонтажа, балансировки и ремонта колес."
  },
  {
    src: "/images/gallery/tire-service-work-1.jpg",
    alt: "Мастер выполняет шиномонтаж в автосервисе Авто друг",
    title: "Шиномонтаж",
    description: "Снятие, установка и обслуживание колес в день обращения по записи."
  },
  {
    src: "/images/gallery/tire-service-equipment-2.jpg",
    alt: "Оборудование для правки дисков в автосервисе Авто друг",
    title: "Правка дисков",
    description: "Оцениваем геометрию литых и штампованных дисков перед работой."
  }
];

const facts = ["Реальная зона сервиса", "Оборудование для шиномонтажа", "Фото без постановки"];

export function GallerySection() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <SectionHeading
            eyebrow="Галерея"
            title="Как выглядит сервис внутри"
            description="Показываем реальные фотографии рабочей зоны, чтобы было понятно, куда вы приезжаете и на каком оборудовании выполняются работы."
          />
          <div className="grid gap-3">
            {facts.map((item) => (
              <div
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold text-slate-900 shadow-sm"
                key={item}
              >
                <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="relative aspect-[4/3]">
              <Image
                alt={gallery[0].alt}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={gallery[0].src}
              />
            </div>
            <GalleryCaption title={gallery[0].title} description={gallery[0].description} />
          </article>

          <div className="grid gap-4">
            {gallery.slice(1).map((item) => (
              <article
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft"
                key={item.src}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    alt={item.alt}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    src={item.src}
                  />
                </div>
                <GalleryCaption title={item.title} description={item.description} compact />
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function GalleryCaption({
  title,
  description,
  compact = false
}: {
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "p-4" : "p-5"}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-50 text-primary">
          <Camera aria-hidden className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-black text-slate-950">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
