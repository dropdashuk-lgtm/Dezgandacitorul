"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function UrgentRequestForm() {
  const router = useRouter();
  const [requestType, setRequestType] = useState<"document" | "interventie_urgenta">("interventie_urgenta");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/urgent-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestType, description }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "failed");
      }
      setDescription("");
      setStatus("idle");
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-accent/20 bg-accent/5 p-5">
      <h3 className="font-heading font-bold">Cerere urgentă</h3>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRequestType("interventie_urgenta")}
          className={`flex-1 rounded-xl border-2 px-3 py-2 text-sm font-medium ${requestType === "interventie_urgenta" ? "border-accent bg-accent text-white" : "border-black/10 bg-white"}`}
        >
          Intervenție urgentă
        </button>
        <button
          type="button"
          onClick={() => setRequestType("document")}
          className={`flex-1 rounded-xl border-2 px-3 py-2 text-sm font-medium ${requestType === "document" ? "border-accent bg-accent text-white" : "border-black/10 bg-white"}`}
        >
          Documente
        </button>
      </div>
      <textarea
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={requestType === "document" ? "Ce document ai nevoie? (ex: contract, raport intervenție)" : "Descrie situația urgentă"}
        rows={3}
        className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
      />
      {status === "error" && <p className="text-sm text-red-600">A apărut o eroare. Încearcă din nou.</p>}
      <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full justify-center">
        {status === "submitting" ? "Se trimite..." : "Trimite cererea"}
      </Button>
    </form>
  );
}
