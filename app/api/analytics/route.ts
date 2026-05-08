import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { trackServerEvent } from "@/lib/analytics";

export const runtime = "nodejs";

const schema = z.object({
  event: z.enum([
    "page_view",
    "phone_click",
    "whatsapp_click",
    "lead_submit",
    "route_click",
    "show_map_click"
  ]),
  page: z.string().max(200).optional(),
  metadata: z
    .record(z.string(), z.union([z.string().max(80), z.number(), z.boolean()]))
    .optional()
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await trackServerEvent(parsed.data);
  return NextResponse.json({ success: true });
}
