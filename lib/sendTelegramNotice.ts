import { env } from "@/lib/env";
import { formatDateTime } from "@/lib/utils";

type TelegramLeadNotice = {
  id: number;
  service?: string | null;
  sourcePage?: string | null;
  createdAt: Date;
};

export async function sendTelegramNotice(lead: TelegramLeadNotice) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const text = [
    "Новая заявка на сайте Авто друг.",
    `ID заявки: ${lead.id}`,
    `Услуга: ${lead.service || "не указана"}`,
    `Источник: ${lead.sourcePage || "не указан"}`,
    `Дата: ${formatDateTime(lead.createdAt)}`,
    "",
    "Откройте админ-панель сайта для просмотра деталей"
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text
    })
  });
}
