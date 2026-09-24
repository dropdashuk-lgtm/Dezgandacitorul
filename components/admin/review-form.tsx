"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ReviewForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: data.get("authorName"),
          rating: Number(data.get("rating")),
          comment: data.get("comment"),
          approved: true,
        }),
      });
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
        <label className="text-xs font-medium text-foreground/60">Nume client</label>
        <input name="authorName" type="text" required placeholder="ex: Andreea M." className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-medium text-foreground/60">Rating</label>
        <select name="rating" required defaultValue="5" className="mt-1 rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none">
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} stele</option>
          ))}
        </select>
      </div>
      <div className="min-w-[220px] flex-[2]">
        <label className="text-xs font-medium text-foreground/60">Text recenzie (copiat, ex. de pe Google)</label>
        <input name="comment" type="text" placeholder="Textul real al recenziei" className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none" />
      </div>
      {status === "error" && <p className="w-full text-sm text-red-600">Eroare. Încearcă din nou.</p>}
      <Button type="submit" size="sm" disabled={status === "submitting"}>
        {status === "submitting" ? "Se adaugă..." : "Adaugă recenzie"}
      </Button>
    </form>
  );
}
