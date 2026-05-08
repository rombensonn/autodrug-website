import { z } from "zod";
import { business } from "@/data/business";
import { countPhoneDigits } from "@/lib/phone";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().max(300).optional()
);

export const contactMethodSchema = z.enum(["phone", "whatsapp", "telegram"]);

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Укажите телефон")
  .max(30, "Телефон слишком длинный")
  .refine((value) => /^[\d\s()+-]+$/.test(value) && countPhoneDigits(value) >= 10, {
    message: "Введите корректный номер телефона"
  });

export const leadInputSchema = z.object({
  name: optionalText,
  phone: phoneSchema,
  carBrand: optionalText,
  carModel: optionalText,
  carYear: optionalText,
  service: optionalText,
  problem: z
    .string()
    .trim()
    .min(5, "Опишите проблему хотя бы в нескольких словах")
    .max(2000, "Описание слишком длинное"),
  preferredDate: optionalText,
  preferredTime: optionalText,
  contactMethod: contactMethodSchema.optional(),
  needsPartsHelp: z.coerce.boolean().default(false),
  sourcePage: optionalText,
  consentAccepted: z.boolean().refine((value) => value, {
    message: "Нужно согласие на обработку персональных данных"
  }),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "Нужно подтвердить ознакомление с политикой конфиденциальности"
  }),
  consentVersion: z.string().optional().default(business.consentVersion),
  company: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.coerce.number().optional()
});

export const publicLeadSchema = leadInputSchema.omit({
  company: true,
  startedAt: true
});

export type LeadInput = z.infer<typeof publicLeadSchema>;
export type LeadFormInput = z.input<typeof leadInputSchema>;

export function isTooFastSubmission(startedAt?: number) {
  if (!startedAt) return false;
  return Date.now() - startedAt < 2500;
}
