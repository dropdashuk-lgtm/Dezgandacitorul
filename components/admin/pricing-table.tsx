"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceRow {
  slug: string;
  name: string;
  base_price: number | null;
  price_note: string | null;
}

export function PricingTable({ services }: { services: ServiceRow[] }) {
  const [rows, setRows] = useState(services);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  function updateRow(slug: string, patch: Partial<ServiceRow>) {
    setRows((prev) => prev.map((r) => (r.slug === slug ? { ...r, ...patch } : r)));
  }

  async function handleSave(row: ServiceRow) {
    setSavingSlug(row.slug);
    setSavedSlug(null);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: row.slug,
          basePrice: row.base_price === null ? null : Number(row.base_price),
          priceNote: row.price_note ?? "",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSavedSlug(row.slug);
      setTimeout(() => setSavedSlug((s) => (s === row.slug ? null : s)), 2000);
    } finally {
      setSavingSlug(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-background text-left text-foreground/60">
          <tr>
            <th className="px-4 py-3 font-medium">Serviciu</th>
            <th className="px-4 py-3 font-medium">Preț estimativ (lei)</th>
            <th className="px-4 py-3 font-medium">Notă preț</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {rows.map((row) => (
            <tr key={row.slug}>
              <td className="px-4 py-3 font-medium">{row.name}</td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  min={0}
                  value={row.base_price ?? ""}
                  onChange={(e) => updateRow(row.slug, { base_price: e.target.value === "" ? null : Number(e.target.value) })}
                  placeholder="fără preț fix"
                  className="w-28 rounded-lg border border-black/10 px-2 py-1.5 focus:border-brand focus:outline-none"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={row.price_note ?? ""}
                  onChange={(e) => updateRow(row.slug, { price_note: e.target.value })}
                  placeholder="ex: variază în funcție de suprafață"
                  className="w-full min-w-[220px] rounded-lg border border-black/10 px-2 py-1.5 focus:border-brand focus:outline-none"
                />
              </td>
              <td className="px-4 py-3 text-right">
                <Button size="sm" variant="outline" disabled={savingSlug === row.slug} onClick={() => handleSave(row)}>
                  {savingSlug === row.slug ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : savedSlug === row.slug ? (
                    <Check className="h-4 w-4 text-brand" />
                  ) : (
                    "Salvează"
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
