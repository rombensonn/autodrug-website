import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.ru";
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function publicAsset(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
    const repositoryName =
      process.env.NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY || "autodrug-website";

    return `/${repositoryName}${normalized}`;
  }

  return normalized;
}

export function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Moscow"
  }).format(new Date(value));
}

export function safeTrim(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
