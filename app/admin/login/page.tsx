import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Вход в админ-панель - Авто друг",
  robots: { index: false, follow: false }
};

export default async function AdminLoginPage() {
  if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
    return (
      <Section>
        <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-black text-slate-950">Админ-панель недоступна</h1>
          <p className="mt-3 leading-7 text-slate-700">
            Это статическая версия сайта на GitHub Pages. Просмотр заявок работает
            только на VPS-версии с PostgreSQL на территории РФ.
          </p>
        </div>
      </Section>
    );
  }

  const { getAdminSession, productionAdminAvailable } = await import("@/lib/auth");
  const session = await getAdminSession();
  if (session) redirect("/admin/leads");

  return (
    <Section>
      <AdminLoginForm disabled={!productionAdminAvailable()} />
    </Section>
  );
}
