import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import { formatDateTime } from "@/lib/utils";

type EmailLead = {
  id: number;
  name?: string | null;
  phone: string;
  carBrand?: string | null;
  carModel?: string | null;
  carYear?: string | null;
  service?: string | null;
  problem: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  contactMethod?: string | null;
  needsPartsHelp: boolean;
  sourcePage?: string | null;
  createdAt: Date;
};

export async function sendEmailRu(lead: EmailLead) {
  if (!env.SMTP_HOST || !env.SMTP_FROM || !env.LEADS_EMAIL_TO) return;

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
        : undefined
  });

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: env.LEADS_EMAIL_TO,
    subject: `Новая заявка Авто друг #${lead.id}`,
    text: [
      `ID: ${lead.id}`,
      `Дата: ${formatDateTime(lead.createdAt)}`,
      `Имя: ${lead.name || "не указано"}`,
      `Телефон: ${lead.phone}`,
      `Авто: ${[lead.carBrand, lead.carModel, lead.carYear].filter(Boolean).join(" ") || "не указано"}`,
      `Услуга: ${lead.service || "не указана"}`,
      `Проблема: ${lead.problem}`,
      `Удобно: ${[lead.preferredDate, lead.preferredTime].filter(Boolean).join(" ") || "не указано"}`,
      `Способ связи: ${lead.contactMethod || "не указан"}`,
      `Нужна помощь с запчастями: ${lead.needsPartsHelp ? "да" : "нет"}`,
      `Источник: ${lead.sourcePage || "не указан"}`
    ].join("\n")
  });
}
