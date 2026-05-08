import { createHmac } from "crypto";
import { requireProductionSecret } from "@/lib/env";

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

export function hashIp(ip: string) {
  const salt = requireProductionSecret("IP_HASH_SALT");
  return createHmac("sha256", salt).update(ip).digest("hex");
}
