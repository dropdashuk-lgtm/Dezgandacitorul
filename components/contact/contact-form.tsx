"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          message: form.get("message"),
        }),
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
        <p className="font-semibold text-brand">Mesajul a fost trimis. Revenim în cel mai scurt timp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" type="text" placeholder="Nume complet" required className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="phone" type="tel" placeholder="Telefon" required className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="email" type="email" placeholder="Email" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <textarea name="message" placeholder="Mesajul tău" required rows={4} className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      {status === "error" && <p className="text-sm text-red-600">A apărut o eroare. Încearcă din nou.</p>}
      <Button type="submit" disabled={status === "submitting"} className="w-full justify-center">
        {status === "submitting" ? "Se trimite..." : "Trimite mesajul"}
      </Button>
    </form>
  );
}
