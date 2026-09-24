"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  initial?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
  };
}

export function ProfileForm({ initial }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/cont/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          address: form.get("address"),
          city: form.get("city"),
          postalCode: form.get("postalCode"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("idle");
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" type="text" required defaultValue={initial?.name} placeholder="Nume complet" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="phone" type="tel" required defaultValue={initial?.phone} placeholder="Telefon" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <input name="address" type="text" defaultValue={initial?.address} placeholder="Adresă" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      <div className="flex gap-3">
        <input name="city" type="text" defaultValue={initial?.city} placeholder="Oraș" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
        <input name="postalCode" type="text" defaultValue={initial?.postal_code} placeholder="Cod poștal" className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
      </div>
      {status === "error" && <p className="text-sm text-red-600">A apărut o eroare. Încearcă din nou.</p>}
      <Button type="submit" disabled={status === "submitting"} className="w-full justify-center">
        {status === "submitting" ? "Se salvează..." : "Salvează profilul"}
      </Button>
    </form>
  );
}
