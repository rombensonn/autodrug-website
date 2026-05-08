"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") return;

    const body = JSON.stringify({ event: "page_view", page: pathname });
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true
    });
  }, [pathname]);

  return null;
}
