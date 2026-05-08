"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { LeadDetails, type AdminLead } from "@/components/admin/LeadDetails";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/utils";

const statuses = [
  { value: "new", label: "новая" },
  { value: "contacted", label: "связались" },
  { value: "done", label: "готово" },
  { value: "archived", label: "архив" }
];

export function LeadsTable({
  initialLeads,
  csrf
}: {
  initialLeads: AdminLead[];
  csrf: string;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(initialLeads[0]?.id || null);

  const selectedLead = leads.find((lead) => lead.id === selectedId) || null;
  const filtered = useMemo(
    () =>
      leads.filter((lead) => {
        const statusOk = statusFilter === "all" || lead.status === statusFilter;
        const searchOk = !search || lead.phone.includes(search);
        return statusOk && searchOk;
      }),
    [leads, search, statusFilter]
  );

  async function updateStatus(id: number, status: string) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": csrf
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { lead: AdminLead };
    setLeads((items) => items.map((item) => (item.id === id ? payload.lead : item)));
  }

  async function deleteLead(id: number) {
    if (!window.confirm("Удалить заявку?")) return;
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "DELETE",
      headers: { "x-csrf-token": csrf }
    });
    if (!response.ok) return;
    setLeads((items) => items.filter((item) => item.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
          <Input
            aria-label="Поиск по телефону"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск по телефону"
            value={search}
          />
          <Select
            aria-label="Фильтр по статусу"
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            <option value="all">Все статусы</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-5 hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Услуга</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  className="cursor-pointer border-t border-slate-100 hover:bg-slate-50"
                  key={lead.id}
                  onClick={() => setSelectedId(lead.id)}
                >
                  <td className="px-4 py-3 font-bold">#{lead.id}</td>
                  <td className="px-4 py-3">{formatDateTime(lead.createdAt)}</td>
                  <td className="px-4 py-3 font-semibold">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.service || "не указана"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <Select
                        aria-label="Изменить статус"
                        className="min-h-9 text-sm"
                        onChange={(event) => updateStatus(lead.id, event.target.value)}
                        value={lead.status}
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </Select>
                      <Button
                        aria-label="Удалить заявку"
                        onClick={() => deleteLead(lead.id)}
                        size="icon"
                        type="button"
                        variant="destructive"
                      >
                        <Trash2 aria-hidden className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-3 md:hidden">
          {filtered.map((lead) => (
            <button
              className="rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm"
              key={lead.id}
              onClick={() => setSelectedId(lead.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-950">#{lead.id}</span>
                <StatusBadge status={lead.status} />
              </div>
              <p className="mt-2 font-semibold text-slate-900">{lead.phone}</p>
              <p className="mt-1 text-sm text-slate-600">{lead.service || "услуга не указана"}</p>
              <p className="mt-1 text-xs text-slate-500">{formatDateTime(lead.createdAt)}</p>
            </button>
          ))}
        </div>
      </div>
      <LeadDetails lead={selectedLead} />
    </div>
  );
}
