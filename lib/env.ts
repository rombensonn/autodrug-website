import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://example.ru"),
  DATABASE_URL: z.string().min(1).optional(),
  ADMIN_PASSWORD: z.string().optional(),
  SESSION_SECRET: z.string().optional(),
  IP_HASH_SALT: z.string().optional(),
  RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().positive().default(300),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(5),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((value) => value !== "false"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  LEADS_EMAIL_TO: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  CRM_WEBHOOK_URL: z.string().url().optional().or(z.literal("")),
  CRM_SEND_PERSONAL_DATA: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  ENABLE_LOCAL_ANALYTICS: z
    .string()
    .optional()
    .transform((value) => value !== "false")
});

export const env = envSchema.parse(process.env);

export function requireProductionSecret(name: "SESSION_SECRET" | "IP_HASH_SALT") {
  const value = process.env[name];
  if (env.NODE_ENV === "production" && (!value || value.length < 24)) {
    throw new Error(`${name} must be set to a long random value in production.`);
  }
  return value || `dev-${name.toLowerCase()}-salt`;
}
