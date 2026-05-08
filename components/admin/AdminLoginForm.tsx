"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm({ disabled = false }: { disabled?: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password })
    });
    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error || "Не удалось войти.");
      return;
    }

    router.push("/admin/leads");
    router.refresh();
  }

  return (
    <form className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft" onSubmit={submit}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-primary">
        <Lock aria-hidden className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-3xl font-black text-slate-950">Вход в админ-панель</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Доступ только для просмотра и обработки заявок.
      </p>
      {disabled ? (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          В production ADMIN_PASSWORD не задан, поэтому админ-панель недоступна.
        </p>
      ) : null}
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800">Пароль</span>
        <Input
          autoComplete="current-password"
          disabled={disabled}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </label>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <Button className="mt-5 w-full" disabled={disabled || loading} type="submit">
        {loading ? "Проверяем..." : "Войти"}
      </Button>
    </form>
  );
}
