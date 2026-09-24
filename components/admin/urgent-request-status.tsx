"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = [
  { value: "NOUA", label: "Nouă" },
  { value: "IN_LUCRU", label: "În lucru" },
  { value: "REZOLVATA", label: "Rezolvată" },
];

export function UrgentRequestStatus({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleChange(next: string) {
    setSaving(true);
    try {
      await fetch(`/api/admin/urgent-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-black/10 px-2 py-1.5 text-sm focus:border-brand focus:outline-none"
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
