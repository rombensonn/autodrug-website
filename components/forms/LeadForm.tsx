"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { business } from "@/data/business";
import { leadInputSchema, type LeadFormInput } from "@/lib/leadSchema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormValues = LeadFormInput;

export function LeadForm({
  title = "Оставьте заявку",
  subtitle = "Опишите проблему, автомобиль и удобное время. Мы свяжемся с вами в выбранном канале связи.",
  defaultService
}: {
  title?: string;
  subtitle?: string;
  defaultService?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isSent, setIsSent] = useState(false);
  const startedAt = useMemo(() => Date.now(), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(leadInputSchema),
    defaultValues: {
      service: defaultService,
      contactMethod: "phone",
      needsPartsHelp: false,
      consentAccepted: false,
      sourcePage: pathname,
      consentVersion: business.consentVersion,
      startedAt
    }
  });

  async function onSubmit(values: FormValues) {
    setServerError("");
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...values,
        sourcePage: pathname,
        consentVersion: business.consentVersion,
        startedAt
      })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setServerError(payload?.error || "Не удалось отправить заявку. Позвоните нам напрямую.");
      return;
    }

    setIsSent(true);
    reset();
    router.push("/thanks");
  }

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6"
      id="lead-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Имя" error={errors.name?.message}>
          <Input autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Телефон *" error={errors.phone?.message}>
          <Input autoComplete="tel" inputMode="tel" type="tel" {...register("phone")} />
        </Field>
        <Field label="Марка автомобиля" error={errors.carBrand?.message}>
          <Input autoComplete="off" {...register("carBrand")} />
        </Field>
        <Field label="Модель автомобиля" error={errors.carModel?.message}>
          <Input autoComplete="off" {...register("carModel")} />
        </Field>
        <Field label="Год выпуска" error={errors.carYear?.message}>
          <Input autoComplete="off" inputMode="numeric" {...register("carYear")} />
        </Field>
        <Field label="Услуга" error={errors.service?.message}>
          <Select {...register("service")}>
            <option value="">Не знаю, нужна диагностика</option>
            {serviceCategories.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Удобная дата" error={errors.preferredDate?.message}>
          <Input type="date" {...register("preferredDate")} />
        </Field>
        <Field label="Удобное время" error={errors.preferredTime?.message}>
          <Input type="time" {...register("preferredTime")} />
        </Field>
      </div>

      <Field className="mt-4" label="Описание проблемы *" error={errors.problem?.message}>
        <Textarea
          placeholder="Например: стук в подвеске на кочках, загорелся Check Engine, нужна сезонная переобувка"
          {...register("problem")}
        />
      </Field>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Предпочтительный способ связи" error={errors.contactMethod?.message}>
          <Select {...register("contactMethod")}>
            <option value="phone">Телефон</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </Select>
        </Field>

        <label className="flex min-h-11 items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
          <Checkbox {...register("needsPartsHelp")} />
          <span>Нужна помощь с подбором запчастей</span>
        </label>
      </div>

      <input aria-hidden className="hidden" tabIndex={-1} {...register("company")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-700">
        <Checkbox {...register("consentAccepted")} />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <Link className="font-semibold text-primary underline" href="/privacy">
            политикой конфиденциальности
          </Link>
        </span>
      </label>
      {errors.consentAccepted?.message ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errors.consentAccepted.message}
        </p>
      ) : null}

      {serverError ? (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
          {serverError}
        </p>
      ) : null}
      {isSent ? (
        <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700" aria-live="polite">
          Заявка отправлена.
        </p>
      ) : null}

      <Button className="mt-5 w-full" disabled={isSubmitting} size="lg" type="submit">
        <Send aria-hidden className="h-5 w-5" />
        {isSubmitting ? "Отправляем..." : "Отправить заявку"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-red-600" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
