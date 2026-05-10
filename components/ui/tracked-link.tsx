"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

type TrackedLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    event: string;
    page?: string;
    internal?: boolean;
  }
>;

export function TrackedLink({
  href,
  event,
  page,
  internal,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  function track() {
    if (
      process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true" ||
      process.env.NEXT_PUBLIC_DISABLE_LOCAL_ANALYTICS === "true"
    ) {
      return;
    }

    const body = JSON.stringify({ event, page: page || window.location.pathname });
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", blob);
      return;
    }
    void fetch("/api/analytics", {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
      keepalive: true
    });
  }

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (eventObject) => {
    track();
    onClick?.(eventObject);
  };

  if (internal) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
