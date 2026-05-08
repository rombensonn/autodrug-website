import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  new: "новая",
  contacted: "связались",
  done: "готово",
  archived: "архив"
};

const styles: Record<string, string> = {
  new: "bg-orange-50 text-orange-800 border-orange-200",
  contacted: "bg-blue-50 text-blue-800 border-blue-200",
  done: "bg-green-50 text-green-800 border-green-200",
  archived: "bg-slate-100 text-slate-700 border-slate-200"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2.5 py-1 text-xs font-bold",
        styles[status] || styles.archived
      )}
    >
      {labels[status] || status}
    </span>
  );
}
