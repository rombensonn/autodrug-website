import { env } from "@/lib/env";

type CrmLead = Record<string, unknown>;

export async function sendCrmWebhookRu(lead: CrmLead) {
  if (!env.CRM_WEBHOOK_URL || !env.CRM_SEND_PERSONAL_DATA) return;

  await fetch(env.CRM_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      source: "autodrug-website",
      dataResidencyRequired: "RU",
      lead
    })
  });
}
