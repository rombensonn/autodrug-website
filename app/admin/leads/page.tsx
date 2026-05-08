import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { AdminLead } from "@/components/admin/LeadDetails";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Заявки - Авто друг",
  robots: { index: false, follow: false }
};

export default async function AdminLeadsPage() {
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
