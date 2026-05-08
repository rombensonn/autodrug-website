"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ServiceQuiz() {
  const pathname = usePathname();
  const router = useRouter();
  const startedAt = useMemo(() => Date.now(), []);
  const [problem, setProblem] = useState("");
  const [car, setCar] = useState("");
  const [date, setDate] = useState("");
  const [needsPartsHelp, setNeedsPartsHelp] = useState(false);
  const [phone, setPhone] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
      setError(
        "Это статическая версия сайта на GitHub Pages. Форма не отправляет персональные данные. Для записи используйте телефон или WhatsApp."
      );
      return;
    }

    if (!phone || problem.trim().length < 5 || !consentAccepted) {
      setError("Укажите телефон, опишите проблему и подтвердите согласие.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        phone,
        problem,
        carBrand: car,
        preferredDate: date,
        needsPartsHelp,
        contactMethod: "phone",
        sourcePage: pathname,
        consentAccepted,
        consentVersion: business.consentVersion,
        startedAt
      })
    });
    setLoading(false);

    if (!response.ok) {
      setError("Не удалось отправить заявку. Можно позвонить напрямую.");
      return;
    }

    router.push("/thanks");
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-950">Быстрый расчет</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Если не знаете точную причину, ответьте на несколько вопросов.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-slate-800">Что случилось?</span>
          <Textarea value={problem} onChange={(event) => setProblem(event.target.value)} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-800">Какой автомобиль?</span>
          <Input value={car} onChange={(event) => setCar(event.target.value)} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-800">Когда удобно приехать?</span>
          <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-800">Нужна помощь с запчастями?</span>
          <Select
            value={needsPartsHelp ? "yes" : "no"}
            onChange={(event) => setNeedsPartsHelp(event.target.value === "yes")}
          >
            <option value="no">Нет, пока не знаю</option>
            <option value="yes">Да, нужна помощь</option>
          </Select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-800">Телефон *</span>
          <Input inputMode="tel" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
      </div>

      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-700">
        <Checkbox
          checked={consentAccepted}
          onChange={(event) => setConsentAccepted(event.target.checked)}
        />
        <span>
          Согласен на обработку персональных данных в соответствии с{" "}
          <Link className="font-semibold text-primary underline" href="/privacy">
            политикой конфиденциальности
          </Link>
        </span>
      </label>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <Button className="mt-5 w-full" disabled={loading} onClick={submit} type="button">
        {loading ? "Отправляем..." : "Получить ориентир по стоимости"}
      </Button>
    </div>
  );
}
