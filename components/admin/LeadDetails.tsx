import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/StatusBadge";

export type AdminLead = {
  id: number;
  name: string | null;
  phone: string;
  carBrand: string | null;
  carModel: string | null;
  carYear: string | null;
  service: string | null;
  problem: string;
  preferredDate: string | null;
  preferredTime: string | null;
  contactMethod: string | null;
  needsPartsHelp: boolean;
  sourcePage: string | null;
  status: string;
  consentAccepted: boolean;
  privacyAccepted: boolean;
  consentVersion: string | null;
  createdAt: string;
  updatedAt: string;
};

export function LeadDetails({ lead }: { lead: AdminLead | null }) {
  if (!lead) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-soft">
        Выберите заявку в таблице.
      </div>
    );
  }

  const rows = [
    ["Телефон", lead.phone],
    ["Имя", lead.name || "не указано"],
    ["Автомобиль", [lead.carBrand, lead.carModel, lead.carYear].filter(Boolean).join(" ") || "не указан"],
    ["Услуга", lead.service || "не указана"],
    ["Удобно", [lead.preferredDate, lead.preferredTime].filter(Boolean).join(" ") || "не указано"],
    ["Способ связи", lead.contactMethod || "не указан"],
    ["Помощь с запчастями", lead.needsPartsHelp ? "да" : "нет"],
    ["Источник", lead.sourcePage || "не указан"],
    ["Согласие", lead.consentAccepted ? `да, версия ${lead.consentVersion || "не указана"}` : "нет"],
    ["Политика конфиденциальности", lead.privacyAccepted ? "ознакомлен" : "нет"],
    ["Создана", formatDateTime(lead.createdAt)],
    ["Обновлена", formatDateTime(lead.updatedAt)]
  ];

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Заявка #{lead.id}</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">{lead.service || "Заявка"}</h2>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      <dl className="mt-6 grid gap-3">
        {rows.map(([label, value]) => (
          <div className="rounded-md bg-slate-50 p-3" key={label}>
            <dt className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</dt>
            <dd className="mt-1 break-words text-sm font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 rounded-md bg-orange-50 p-4">
        <p className="text-xs font-bold uppercase tracking-normal text-orange-800">Проблема</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-orange-950">{lead.problem}</p>
      </div>
    </aside>
  );
}
