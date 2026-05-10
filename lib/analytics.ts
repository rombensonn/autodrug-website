import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

const allowedEvents = new Set([
  "page_view",
  "phone_click",
  "email_click",
  "whatsapp_click",
  "lead_submit",
  "route_click",
  "show_map_click"
]);

export async function trackServerEvent({
  event,
  page,
  metadata
}: {
  event: string;
  page?: string;
  metadata?: Record<string, string | number | boolean>;
}) {
  if (!env.ENABLE_LOCAL_ANALYTICS || !allowedEvents.has(event) || !process.env.DATABASE_URL) {
    return;
  }

  await prisma.analyticsEvent.create({
    data: {
      event,
      page: page?.slice(0, 200),
      metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined
    }
  });
}
