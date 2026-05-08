import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  muted = false,
  id
}: React.PropsWithChildren<{
  className?: string;
  muted?: boolean;
  id?: string;
}>) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        muted ? "bg-slate-50" : "bg-background",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-normal text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
