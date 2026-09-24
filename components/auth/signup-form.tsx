"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "check-email">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { phone } },
    });

    if (error) {
      setStatus("idle");
      setError(error.message === "User already registered" ? "Există deja un cont cu acest email." : "A apărut o eroare. Încearcă din nou.");
      return;
    }

    if (data.session) {
      await fetch("/api/cont/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      router.push("/cont");
      router.refresh();
      return;
    }

    setStatus("check-email");
  }

  if (status === "check-email") {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 text-center">
        <p className="font-semibold text-brand">Aproape gata!</p>
        <p className="mt-2 text-sm text-foreground/70">
          Ți-am trimis un email de confirmare. Confirmă adresa pentru a-ți activa contul.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        required
        placeholder="Nume complet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
      />
      <input
        type="tel"
        required
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
      />
      <input
        type="password"
        required
        minLength={6}
        placeholder="Parolă (minimum 6 caractere)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={status === "submitting"} className="w-full justify-center">
        {status === "submitting" ? "Se creează contul..." : "Creează cont"}
      </Button>
    </form>
  );
}
