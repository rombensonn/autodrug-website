import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-800 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
