import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { AdminLead } from "@/components/admin/LeadDetails";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Заявки - Авто друг",
  robots: { index: false, follow: false }
};

export default async function AdminLeadsPage() {
  if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true" || process.env.NEXT_OUTPUT === "export") {
    return (
      <Section>
        <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-black text-slate-950">Заявки недоступны</h1>
          <p className="mt-3 leading-7 text-slate-700">
            GitHub Pages показывает только статические страницы. Реальные заявки,
            статусы и удаление доступны после деплоя на VPS с базой данных в РФ.
          </p>
        </div>
      </Section>
    );
  }

  const { getAdminSession } = await import("@/lib/auth");
  const { prisma } = await import("@/lib/db");
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  const serialized: AdminLead[] = leads.map((lead) => ({
    ...lead,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString()
  }));

  return (
    <Section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-950">Заявки</h1>
          <p className="mt-2 text-slate-600">Просмотр, поиск, статусы и удаление заявок.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <Button type="submit" variant="outline">
            Выйти
          </Button>
        </form>
      </div>
      <LeadsTable csrf={session.csrf} initialLeads={serialized} />
    </Section>
  );
}
