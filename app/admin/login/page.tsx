import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Section } from "@/components/ui/section";
import { getAdminSession, productionAdminAvailable } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Вход в админ-панель - Авто друг",
  robots: { index: false, follow: false }
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/leads");

  return (
    <Section>
      <AdminLoginForm disabled={!productionAdminAvailable()} />
    </Section>
  );
}
