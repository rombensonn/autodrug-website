import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isTooFastSubmission, leadInputSchema } from "@/lib/leadSchema";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendCrmWebhookRu } from "@/lib/sendCrmWebhookRu";
import { sendEmailRu } from "@/lib/sendEmailRu";
import { sendTelegramNotice } from "@/lib/sendTelegramNotice";
import { trackServerEvent } from "@/lib/analytics";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const rateLimit = await checkRateLimit(request.headers, "lead");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Слишком много заявок. Попробуйте чуть позже." },
      { status: 429 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = leadInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Проверьте поля формы и согласие на обработку данных." },
      { status: 400 }
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  if (isTooFastSubmission(parsed.data.startedAt)) {
    return NextResponse.json(
      { success: false, error: "Форма отправлена слишком быстро. Попробуйте еще раз." },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      carBrand: parsed.data.carBrand,
      carModel: parsed.data.carModel,
      carYear: parsed.data.carYear,
      service: parsed.data.service,
      problem: parsed.data.problem,
      preferredDate: parsed.data.preferredDate,
      preferredTime: parsed.data.preferredTime,
      contactMethod: parsed.data.contactMethod,
      needsPartsHelp: parsed.data.needsPartsHelp,
      sourcePage: parsed.data.sourcePage,
      consentAccepted: parsed.data.consentAccepted,
      privacyAccepted: parsed.data.privacyAccepted,
      consentVersion: parsed.data.consentVersion
    }
  });

  await Promise.allSettled([
    sendTelegramNotice({
      id: lead.id,
      service: lead.service,
      sourcePage: lead.sourcePage,
      createdAt: lead.createdAt
    }),
    sendEmailRu(lead),
    sendCrmWebhookRu(lead),
    trackServerEvent({
      event: "lead_submit",
      page: lead.sourcePage || undefined,
      metadata: { service: lead.service || "unknown" }
    })
  ]);

  return NextResponse.json({ success: true, id: lead.id });
}
