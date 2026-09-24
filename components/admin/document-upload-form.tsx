"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const docTypes = [
  { value: "contract", label: "Contract" },
  { value: "document", label: "Document" },
  { value: "factura", label: "Factură" },
  { value: "raport", label: "Raport" },
  { value: "altul", label: "Altul" },
];

export function DocumentUploadForm({ customerId }: { customerId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("customerId", customerId);

    try {
      const res = await fetch("/api/admin/documents", { method: "POST", body: formData });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setStatus("idle");
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-black/15 p-4">
      <div className="min-w-[180px] flex-1">
        <label className="text-xs font-medium text-foreground/60">Titlu</label>
        <input name="title" type="text" required placeholder="ex: Contract servicii 2026" className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-medium text-foreground/60">Tip</label>
        <select name="docType" required defaultValue="document" className="mt-1 rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none">
          {docTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground/60">Fișier (PDF/JPG/PNG)</label>
        <input name="file" type="file" required accept="application/pdf,image/jpeg,image/png" className="mt-1 block text-sm" />
      </div>
      {status === "error" && <p className="w-full text-sm text-red-600">Eroare la încărcare. Încearcă din nou.</p>}
      <Button type="submit" size="sm" disabled={status === "submitting"}>
        {status === "submitting" ? "Se încarcă..." : "Încarcă document"}
      </Button>
    </form>
  );
}
