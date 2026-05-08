"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { business } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type QuickValues = {
  phone: string;
  problem: string;
  consentAccepted: boolean;
  company?: string;
  startedAt?: number;
};

const quickLeadSchema = z.object({
  phone: z.string().trim().min(7, "Укажите телефон").max(30, "Телефон слишком длинный"),
  problem: z
    .string()
    .trim()
    .min(5, "Опишите проблему хотя бы в нескольких словах")
    .max(2000, "Описание слишком длинное"),
  consentAccepted: z.boolean().refine((value) => value, {
    message: "Нужно согласие на обработку персональных данных"
  }),
  company: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().optional()
});

export function QuickLeadForm({ service }: { service?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const startedAt = useMemo(() => Date.now(), []);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<QuickValues>({
    resolver: zodResolver(quickLeadSchema),
    defaultValues: {
      consentAccepted: false,
      startedAt
    }
  });

  async function onSubmit(values: QuickValues) {
    setServerError("");
    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
      setServerError(
        "Это статическая версия сайта на GitHub Pages. Форма не отправляет персональные данные. Позвоните или напишите в WhatsApp."
      );
      return;
    }

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...values,
        service,
        sourcePage: pathname,
        contactMethod: "phone",
        consentVersion: business.consentVersion,
        startedAt
      })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setServerError(payload?.error || "Не удалось отправить заявку.");
      return;
    }

    router.push("/thanks");
  }

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-lift"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-bold text-slate-950">Получить ориентир по стоимости</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Оставьте телефон и пару слов о проблеме. Не передаем данные в WhatsApp или
        зарубежные сервисы.
      </p>
      {process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true" ? (
        <p className="mt-3 rounded-md bg-orange-50 p-3 text-sm leading-6 text-orange-900">
          Статическая версия на GitHub Pages: форма не отправляет персональные данные.
        </p>
      ) : null}

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800">Телефон *</span>
        <Input autoComplete="tel" inputMode="tel" type="tel" {...register("phone")} />
        {errors.phone?.message ? (
          <span className="mt-1 block text-sm text-red-600">{errors.phone.message}</span>
        ) : null}
      </label>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800">Проблема *</span>
        <Textarea
          className="min-h-24"
          placeholder="Например: нужен шиномонтаж, стук спереди, плохо тормозит"
          {...register("problem")}
        />
        {errors.problem?.message ? (
          <span className="mt-1 block text-sm text-red-600">{errors.problem.message}</span>
        ) : null}
      </label>

      <input aria-hidden className="hidden" tabIndex={-1} {...register("company")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-700">
        <Checkbox {...register("consentAccepted")} />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <Link className="font-semibold text-primary underline" href="/privacy">
            политикой конфиденциальности
          </Link>
        </span>
      </label>
      {errors.consentAccepted?.message ? (
        <p className="mt-1 text-sm text-red-600">{errors.consentAccepted.message}</p>
      ) : null}

      {serverError ? (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{serverError}</p>
      ) : null}

      <Button className="mt-5 w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Отправляем..." : "Получить ориентир"}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Button>
    </form>
  );
}
