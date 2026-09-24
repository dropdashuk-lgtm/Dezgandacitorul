"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const propertyTypes = ["Vie", "Livadă", "Fermă", "Seră", "Depozit agricol"];

export function AgricultureForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: (() => {
          const fd = new FormData();
          fd.append("serviceSlug", "agricultura");
          fd.append("propertyType", String(form.get("propertyType") ?? ""));
          fd.append("propertySize", String(form.get("size") ?? ""));
          fd.append("infestationLevel", "nu-stiu");
          fd.append("city", String(form.get("locality") ?? ""));
          fd.append("preferredDate", "Aleg altă dată");
          fd.append("name", String(form.get("name") ?? ""));
          fd.append("phone", String(form.get("phone") ?? ""));
          fd.append("email", String(form.get("email") ?? ""));
          fd.append("address", String(form.get("locality") ?? ""));
          fd.append("notes", String(form.get("notes") ?? ""));
          return fd;
        })(),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 text-center">
        <p className="font-semibold text-brand">Cererea a fost trimisă. Te contactăm pentru evaluare.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <select name="propertyType" required defaultValue="" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none">
        <option value="" disabled>Tip proprietate</option>
        {propertyTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input name="size" type="text" placeholder="Suprafață (ha / m²)" required className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="locality" type="text" placeholder="Localitate" required className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="name" type="text" placeholder="Nume complet" required className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="phone" type="tel" placeholder="Telefon" required className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="email" type="email" placeholder="Email" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <textarea name="notes" placeholder="Descrie problema observată" rows={3} className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      {status === "error" && <p className="text-sm text-red-600">A apărut o eroare. Încearcă din nou.</p>}
      <Button type="submit" disabled={status === "submitting"} className="w-full justify-center">
        {status === "submitting" ? "Se trimite..." : "Cere evaluare"}
      </Button>
    </form>
  );
}
